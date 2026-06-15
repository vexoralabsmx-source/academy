import { AdminTable, LessonForm } from "@/components/admin";
import { PageHeader } from "@/components/layout";
import { getAdminLessons } from "@/lib/admin/queries";

export default async function AdminLessonsPage() {
  const lessons = await getAdminLessons();
  return (
    <>
      <PageHeader eyebrow="Admin" title="Gestión de lecciones" description="Crear, editar contenido, ordenar lecciones y asignar a módulos." />
      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-20 sm:px-6 lg:grid-cols-[380px_1fr] lg:px-8">
        <LessonForm />
        <AdminTable headers={["Lección", "Curso", "Módulo", "Minutos"]} rows={lessons.map((lesson) => [lesson.title, lesson.courseTitle, lesson.moduleTitle, lesson.estimatedMinutes])} />
      </section>
    </>
  );
}
