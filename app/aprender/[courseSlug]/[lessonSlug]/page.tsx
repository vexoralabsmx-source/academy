import { notFound } from "next/navigation";
import { ExerciseRenderer } from "@/components/exercises";
import { LessonContent, LessonNavigation, LessonSidebar } from "@/components/lessons";
import { Card, ProgressBar } from "@/components/ui";
import { findLesson } from "@/lib/seed/data";

export default function LearnPage({ params }: { params: { courseSlug: string; lessonSlug: string } }) {
  const { course, lesson } = findLesson(params.courseSlug, params.lessonSlug);
  if (!course || !lesson) notFound();

  return (
    <div className="flex">
      <LessonSidebar course={course} />
      <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div className="space-y-8">
          <LessonContent lesson={lesson} />
          {lesson.exercises.map((exercise) => <ExerciseRenderer key={exercise.id} exercise={exercise} />)}
          <LessonNavigation courseSlug={course.slug} />
        </div>
        <aside className="space-y-4">
          <Card>
            <p className="text-sm font-semibold text-cyan">Progreso</p>
            <div className="mt-4"><ProgressBar value={48} label="Curso" /></div>
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
