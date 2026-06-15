"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { gradeExercise } from "@/lib/grading";
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

  const resolved = await resolveCourseAndLesson(input.courseSlug, input.lessonSlug);
  if (!resolved) {
    return { ok: false as const, feedback: "La leccion no esta sincronizada con Supabase todavia." };
  }

  const { data: exerciseRow } = await supabase
    .from("exercises")
    .select("id")
    .eq("title", input.exercise.title)
    .eq("course_id", resolved.courseId)
    .eq("lesson_id", resolved.lessonId)
    .single();

  if (!exerciseRow) {
    return { ok: false as const, feedback: "El ejercicio no existe en la base de datos todavia." };
  }

  const { data: previousCorrect } = await supabase
    .from("submissions")
    .select("id")
    .eq("user_id", user.id)
    .eq("exercise_id", exerciseRow.id)
    .eq("is_correct", true)
    .maybeSingle();

  const result = gradeExercise(input.exercise, input.answer, input.attempts, Boolean(previousCorrect));

  const { error } = await supabase.from("submissions").insert({
    user_id: user.id,
    exercise_id: exerciseRow.id,
    course_id: resolved.courseId,
    lesson_id: resolved.lessonId,
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

  await ensureEnrollment(user.id, resolved.courseId);
  await syncEnrollmentProgress(user.id, resolved.courseId);

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

  const resolved = await resolveCourseAndLesson(input.courseSlug, input.lessonSlug);
  if (!resolved) {
    return { ok: false as const, message: "La leccion no esta sincronizada con Supabase todavia." };
  }

  const { error } = await supabase.from("progress").upsert(
    {
      user_id: user.id,
      course_id: resolved.courseId,
      lesson_id: resolved.lessonId,
      completed: true,
      completed_at: new Date().toISOString()
    },
    { onConflict: "user_id,lesson_id" }
  );

  if (error) {
    return { ok: false as const, message: error.message };
  }

  await ensureEnrollment(user.id, resolved.courseId);
  await syncEnrollmentProgress(user.id, resolved.courseId);

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

async function resolveCourseAndLesson(courseSlug: string, lessonSlug: string) {
  const supabase = createClient();
  const { data: courseRow } = await supabase.from("courses").select("id").eq("slug", courseSlug).single();
  if (!courseRow) return null;

  const { data: lessonRow } = await supabase
    .from("lessons")
    .select("id")
    .eq("course_id", courseRow.id)
    .eq("slug", lessonSlug)
    .single();

  if (!lessonRow) return null;

  return { courseId: courseRow.id, lessonId: lessonRow.id };
}
