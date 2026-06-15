import { AdminTable, ExerciseForm } from "@/components/admin";
import { PageHeader } from "@/components/layout";
import { courses } from "@/lib/seed/data";

export default function AdminExercisesPage() {
  const exercises = courses.flatMap((course) => course.modules.flatMap((module) => module.lessons.flatMap((lesson) => lesson.exercises.map((exercise) => [exercise.title, course.title, exercise.type, `${exercise.xpReward} XP`]))));
  return (
    <>
      <PageHeader eyebrow="Admin" title="Gestión de ejercicios" description="Crear ejercicios, editar respuestas, revisar tasa de acierto y submissions." />
      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-20 sm:px-6 lg:grid-cols-[380px_1fr] lg:px-8">
        <ExerciseForm />
        <AdminTable headers={["Ejercicio", "Curso", "Tipo", "XP"]} rows={exercises.slice(0, 12)} />
      </section>
    </>
  );
}
