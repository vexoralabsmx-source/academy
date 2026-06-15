import { notFound } from "next/navigation";
import { CourseAccessKeyForm } from "@/components/courses/CourseAccessKeyForm";
import { ExerciseRenderer } from "@/components/exercises";
import { LessonContent, LessonNavigation, LessonSidebar } from "@/components/lessons";
import { Card, ProgressBar } from "@/components/ui";
import { getCourseAccessStatus } from "@/lib/access/queries";
import { getCurrentProfile, requireAuth } from "@/lib/auth/session";
import { getDashboardData } from "@/lib/dashboard/queries";
import { ensureSeedCourseSynced } from "@/lib/learning/sync";
import { findLesson } from "@/lib/seed/data";

export default async function LearnPage({ params }: { params: { courseSlug: string; lessonSlug: string } }) {
  await requireAuth();
  await ensureSeedCourseSynced(params.courseSlug);
  const profile = await getCurrentProfile();
  const { course, lesson } = findLesson(params.courseSlug, params.lessonSlug);
  if (!course || !lesson || !profile) notFound();
  const access = await getCourseAccessStatus(course, profile);
  const dashboard = await getDashboardData(profile);
  const currentEnrollment = dashboard.activeCourses.find((item) => item.slug === course.slug);

  if (course.accessTier === "premium" && !access.unlocked) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <Card>
          <p className="text-sm font-semibold text-violet-300">Curso premium</p>
          <h1 className="mt-2 text-3xl font-bold">{course.title}</h1>
          <p className="mt-3 text-slate-400">Necesitas una llave valida para entrar a este curso. Cuando la compres por tu canal manual, ingresala aqui.</p>
          <CourseAccessKeyForm courseSlug={course.slug} />
          {!access.migrationReady ? <p className="mt-3 text-xs text-amber-300">Aplica primero la migracion SQL del sistema premium en Supabase.</p> : null}
        </Card>
      </div>
    );
  }

  return (
    <div className="flex">
      <LessonSidebar course={course} />
      <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div className="space-y-8">
          <LessonContent lesson={lesson} />
          {lesson.exercises.map((exercise) => <ExerciseRenderer key={exercise.id} exercise={exercise} courseSlug={course.slug} lessonSlug={lesson.slug} />)}
          <LessonNavigation courseSlug={course.slug} lessonSlug={lesson.slug} />
        </div>
        <aside className="space-y-4">
          <Card>
            <p className="text-sm font-semibold text-cyan">Progreso</p>
            <div className="mt-4"><ProgressBar value={currentEnrollment?.progressPercent ?? 0} label="Curso" /></div>
            <p className="mt-4 text-sm text-slate-400">Completa ejercicios para sumar XP sin duplicados.</p>
          </Card>
          <Card>
            <p className="font-semibold">Notas rápidas</p>
            <p className="mt-2 text-sm text-slate-400">Usa esta sección como base para guardar notas en Supabase.</p>
          </Card>
        </aside>
      </section>
    </div>
  );
}
