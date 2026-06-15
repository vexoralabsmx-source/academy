import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";
import { courses as seedCourses, findCourse } from "@/lib/seed/data";
import type { Course, Lesson, Module } from "@/types/course";
import type { Exercise } from "@/types/exercise";

type SyncResult =
  | { ok: true; courseId: string; lessonId?: string; exerciseId?: string }
  | { ok: false; message: string };
export type SyncCatalogResult =
  | { ok: true; courses: number; lessons: number; exercises: number }
  | { ok: false; message: string };

type ExistingModuleRow = {
  id: string;
  title: string;
  order_index: number | null;
};

type ExistingExerciseRow = {
  id: string;
  title: string;
  order_index: number | null;
};

export async function ensureSeedCourseSynced(
  courseSlug: string,
  options?: { lessonSlug?: string; exerciseTitle?: string }
): Promise<SyncResult> {
  const course = findCourse(courseSlug);
  if (!course) {
    return { ok: false, message: "No se encontro el curso local para sincronizarlo." };
  }

  try {
    const supabase = createAdminClient();
    const courseId = await upsertCourse(supabase, course);
    const existingModules = await getExistingModules(supabase, courseId);
    let matchedLessonId: string | undefined;
    let matchedExerciseId: string | undefined;

    for (const module of course.modules) {
      const moduleId = await upsertModule(supabase, courseId, module, existingModules);

      for (const lesson of module.lessons) {
        const lessonId = await upsertLesson(supabase, courseId, moduleId, lesson);
        if (options?.lessonSlug === lesson.slug) {
          matchedLessonId = lessonId;
        }

        const exerciseId = await syncExercises(supabase, courseId, lessonId, lesson.exercises, options?.exerciseTitle);
        if (exerciseId) {
          matchedExerciseId = exerciseId;
        }
      }
    }

    return { ok: true, courseId, lessonId: matchedLessonId, exerciseId: matchedExerciseId };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return { ok: false, message: `No se pudo sincronizar el curso con Supabase. ${message}` };
  }
}

export async function syncSeedCatalog(): Promise<SyncCatalogResult> {
  try {
    for (const course of seedCourses) {
      const result = await ensureSeedCourseSynced(course.slug);
      if (!result.ok) {
        return result;
      }
    }

    return {
      ok: true,
      courses: seedCourses.length,
      lessons: seedCourses.reduce((total, course) => total + course.modules.reduce((count, module) => count + module.lessons.length, 0), 0),
      exercises: seedCourses.reduce(
        (total, course) =>
          total +
          course.modules.reduce((moduleTotal, module) => moduleTotal + module.lessons.reduce((lessonTotal, lesson) => lessonTotal + lesson.exercises.length, 0), 0),
        0
      )
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return { ok: false, message: `No se pudo sincronizar el catalogo completo. ${message}` };
  }
}

async function upsertCourse(supabase: ReturnType<typeof createAdminClient>, course: Course) {
  const payload = {
    title: course.title,
    slug: course.slug,
    description: course.description,
    long_description: course.longDescription,
    area: course.area,
    difficulty: course.difficulty,
    estimated_hours: course.estimatedHours,
    gradient: course.gradient,
    icon: course.icon,
    is_published: course.isPublished,
    xp_total: course.xpTotal,
    prerequisites: course.prerequisites,
    objectives: course.objectives,
    final_project: course.finalProject
  };

  const { data, error } = await supabase
    .from("courses")
    .upsert(payload, { onConflict: "slug" })
    .select("id")
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? `No se pudo crear el curso ${course.slug}.`);
  }

  return data.id as string;
}

async function getExistingModules(supabase: ReturnType<typeof createAdminClient>, courseId: string) {
  const { data, error } = await supabase.from("modules").select("id,title,order_index").eq("course_id", courseId);
  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as ExistingModuleRow[];
}

async function upsertModule(
  supabase: ReturnType<typeof createAdminClient>,
  courseId: string,
  module: Module,
  existingModules: ExistingModuleRow[]
) {
  const existing = existingModules.find((row) => row.order_index === module.orderIndex || row.title === module.title);
  const payload = {
    course_id: courseId,
    title: module.title,
    description: module.description,
    order_index: module.orderIndex
  };

  if (existing) {
    const { error } = await supabase.from("modules").update(payload).eq("id", existing.id);
    if (error) {
      throw new Error(error.message);
    }

    existing.title = module.title;
    existing.order_index = module.orderIndex;
    return existing.id;
  }

  const { data, error } = await supabase.from("modules").insert(payload).select("id").single();
  if (error || !data) {
    throw new Error(error?.message ?? `No se pudo crear el modulo ${module.title}.`);
  }

  existingModules.push({
    id: data.id as string,
    title: module.title,
    order_index: module.orderIndex
  });

  return data.id as string;
}

async function upsertLesson(
  supabase: ReturnType<typeof createAdminClient>,
  courseId: string,
  moduleId: string,
  lesson: Lesson
) {
  const payload = {
    module_id: moduleId,
    course_id: courseId,
    title: lesson.title,
    slug: lesson.slug,
    description: lesson.description,
    content: lesson.content,
    estimated_minutes: lesson.estimatedMinutes,
    order_index: lesson.orderIndex,
    is_preview: lesson.isPreview,
    is_published: true
  };

  const { data, error } = await supabase
    .from("lessons")
    .upsert(payload, { onConflict: "course_id,slug" })
    .select("id")
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? `No se pudo crear la leccion ${lesson.slug}.`);
  }

  return data.id as string;
}

async function syncExercises(
  supabase: ReturnType<typeof createAdminClient>,
  courseId: string,
  lessonId: string,
  exercises: Exercise[],
  matchedTitle?: string
) {
  const { data, error } = await supabase
    .from("exercises")
    .select("id,title,order_index")
    .eq("course_id", courseId)
    .eq("lesson_id", lessonId);

  if (error) {
    throw new Error(error.message);
  }

  const existingRows = (data ?? []) as ExistingExerciseRow[];
  let matchedExerciseId: string | undefined;

  for (const [index, exercise] of exercises.entries()) {
    const existing = existingRows.find((row) => row.order_index === index || row.title === exercise.title);
    const payload = buildExercisePayload(courseId, lessonId, exercise, index);

    if (existing) {
      const { error: updateError } = await supabase.from("exercises").update(payload).eq("id", existing.id);
      if (updateError) {
        throw new Error(updateError.message);
      }
      if (matchedTitle && exercise.title === matchedTitle) {
        matchedExerciseId = existing.id;
      }
      continue;
    }

    const { data: inserted, error: insertError } = await supabase.from("exercises").insert(payload).select("id").single();
    if (insertError || !inserted) {
      throw new Error(insertError?.message ?? `No se pudo crear el ejercicio ${exercise.title}.`);
    }

    if (matchedTitle && exercise.title === matchedTitle) {
      matchedExerciseId = inserted.id as string;
    }
  }

  return matchedExerciseId;
}

function buildExercisePayload(courseId: string, lessonId: string, exercise: Exercise, orderIndex: number) {
  return {
    lesson_id: lessonId,
    course_id: courseId,
    type: exercise.type,
    title: exercise.title,
    instructions: exercise.instructions,
    question: exercise.question,
    options: exercise.options ?? null,
    correct_answer: exercise.correctAnswer ?? null,
    expected_answer: serializeExpectedAnswer(exercise.expectedAnswer),
    expected_output: exercise.expectedOutput ?? null,
    starter_code: exercise.starterCode ?? null,
    explanation: exercise.explanation,
    hint: exercise.hint,
    xp_reward: exercise.xpReward,
    difficulty: exercise.difficulty,
    order_index: orderIndex
  };
}

function serializeExpectedAnswer(expectedAnswer: Exercise["expectedAnswer"]) {
  if (!expectedAnswer) return null;
  return Array.isArray(expectedAnswer) ? expectedAnswer.join(" || ") : expectedAnswer;
}
