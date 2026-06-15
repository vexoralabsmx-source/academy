import { AdminTable, ExerciseForm } from "@/components/admin";
import { PageHeader } from "@/components/layout";
import { getAdminExercises } from "@/lib/admin/queries";

export default async function AdminExercisesPage() {
  const exercises = await getAdminExercises();
  return (
    <>
      <PageHeader eyebrow="Admin" title="Gestión de ejercicios" description="Crear ejercicios, editar respuestas, revisar tasa de acierto y submissions." />
      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-20 sm:px-6 lg:grid-cols-[380px_1fr] lg:px-8">
        <ExerciseForm />
        <AdminTable headers={["Ejercicio", "Curso", "Tipo", "XP"]} rows={exercises.map((exercise) => [exercise.title, exercise.courseTitle, exercise.type, `${exercise.xpReward} XP`])} />
      </section>
    </>
  );
}
