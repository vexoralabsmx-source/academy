"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { gradeExercise } from "@/lib/grading";
import { ensureSeedCourseSynced } from "@/lib/learning/sync";
import { findCourse } from "@/lib/seed/data";
import type { Exercise } from "@/types/exercise";

export async function submitExerciseAttempt(input: {
  exercise: Exercise;
  answer: string;
  attempts: number;
  courseSlug: string;
  lessonSlug: string;
}) {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false as const, feedback: "Debes iniciar sesion para guardar tu progreso." };
  }

  const course = findCourse(input.courseSlug);
  const lesson = course?.modules.flatMap((module) => module.lessons).find((item) => item.slug === input.lessonSlug);
  if (!course || !lesson) {
    return { ok: false as const, feedback: "No se encontro la leccion asociada al ejercicio." };
  }

  const syncResult = await ensureSeedCourseSynced(input.courseSlug, {
    lessonSlug: input.lessonSlug,
    exerciseTitle: input.exercise.title
  });
  if (!syncResult.ok) {
    return { ok: false as const, feedback: syncResult.message };
  }

  if (!syncResult.lessonId) {
    return { ok: false as const, feedback: "No se pudo resolver la leccion sincronizada." };
  }

  const adminSupabase = createAdminClient();
  const exerciseId =
    syncResult.exerciseId ??
    (
      await adminSupabase
        .from("exercises")
        .select("id")
        .eq("title", input.exercise.title)
        .eq("course_id", syncResult.courseId)
        .eq("lesson_id", syncResult.lessonId)
        .limit(1)
    ).data?.[0]?.id;

  if (!exerciseId) {
    return { ok: false as const, feedback: "No se pudo resolver el ejercicio sincronizado." };
  }

  const { data: previousCorrect } = await supabase
    .from("submissions")
    .select("id")
    .eq("user_id", user.id)
    .eq("exercise_id", exerciseId)
    .eq("is_correct", true)
    .maybeSingle();

  const result = gradeExercise(input.exercise, input.answer, input.attempts, Boolean(previousCorrect));

  const { error } = await supabase.from("submissions").insert({
    user_id: user.id,
    exercise_id: exerciseId,
    course_id: syncResult.courseId,
    lesson_id: syncResult.lessonId,
    answer: { value: input.answer },
    score: result.score,
    feedback: result.feedback,
    is_correct: result.isCorrect,
    attempts: input.attempts,
    xp_awarded: result.xpAwarded,
    status: result.status
  });

  if (error) {
    return { ok: false as const, feedback: error.message };
  }

  await ensureEnrollment(user.id, syncResult.courseId);
  await syncEnrollmentProgress(user.id, syncResult.courseId);

  revalidatePath("/dashboard");
  revalidatePath("/perfil");
  revalidatePath(`/aprender/${input.courseSlug}/${input.lessonSlug}`);

  return { ok: true as const, ...result };
}

export async function markLessonCompleted(input: { courseSlug: string; lessonSlug: string }) {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false as const, message: "Debes iniciar sesion para guardar tu progreso." };
  }

  const course = findCourse(input.courseSlug);
  const lesson = course?.modules.flatMap((module) => module.lessons).find((item) => item.slug === input.lessonSlug);
  if (!course || !lesson) {
    return { ok: false as const, message: "No se encontro la leccion." };
  }

  const syncResult = await ensureSeedCourseSynced(input.courseSlug, { lessonSlug: input.lessonSlug });
  if (!syncResult.ok) {
    return { ok: false as const, message: syncResult.message };
  }

  if (!syncResult.lessonId) {
    return { ok: false as const, message: "No se pudo resolver la leccion sincronizada." };
  }

  const { error } = await supabase.from("progress").upsert(
    {
      user_id: user.id,
      course_id: syncResult.courseId,
      lesson_id: syncResult.lessonId,
      completed: true,
      completed_at: new Date().toISOString()
    },
    { onConflict: "user_id,lesson_id" }
  );

  if (error) {
    return { ok: false as const, message: error.message };
  }

  await ensureEnrollment(user.id, syncResult.courseId);
  await syncEnrollmentProgress(user.id, syncResult.courseId);

  revalidatePath("/dashboard");
  revalidatePath("/perfil");
  revalidatePath(`/aprender/${input.courseSlug}/${input.lessonSlug}`);

  return { ok: true as const, message: "Leccion completada." };
}

async function ensureEnrollment(userId: string, courseId: string) {
  const supabase = createClient();
  const { data: existing } = await supabase
    .from("course_enrollments")
    .select("id")
    .eq("user_id", userId)
    .eq("course_id", courseId)
    .maybeSingle();

  if (!existing) {
    await supabase.from("course_enrollments").insert({
      user_id: userId,
      course_id: courseId,
      progress_percent: 0,
      status: "active"
    });
  }
}

async function syncEnrollmentProgress(userId: string, courseId: string) {
  const supabase = createClient();
  const { count: completedLessons } = await supabase
    .from("progress")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("course_id", courseId)
    .eq("completed", true);

  const { count: totalLessons } = await supabase
    .from("lessons")
    .select("id", { count: "exact", head: true })
    .eq("course_id", courseId)
    .eq("is_published", true);

  const lessonCount = totalLessons ?? 0;
  const progressPercent = lessonCount > 0 ? Math.min(100, Math.round(((completedLessons ?? 0) / lessonCount) * 100)) : 0;

  await supabase
    .from("course_enrollments")
    .update({
      progress_percent: progressPercent,
      status: progressPercent >= 100 ? "completed" : "active",
      completed_at: progressPercent >= 100 ? new Date().toISOString() : null
    })
    .eq("user_id", userId)
    .eq("course_id", courseId);
}
