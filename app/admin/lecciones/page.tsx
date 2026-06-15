import { AdminTable, LessonForm } from "@/components/admin";
import { PageHeader } from "@/components/layout";
import { courses } from "@/lib/seed/data";

export default function AdminLessonsPage() {
  const lessons = courses.flatMap((course) => course.modules.flatMap((module) => module.lessons.map((lesson) => [lesson.title, course.title, module.title, lesson.estimatedMinutes])));
  return (
    <>
      <PageHeader eyebrow="Admin" title="Gestión de lecciones" description="Crear, editar contenido, ordenar lecciones y asignar a módulos." />
      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-20 sm:px-6 lg:grid-cols-[380px_1fr] lg:px-8">
        <LessonForm />
        <AdminTable headers={["Lección", "Curso", "Módulo", "Minutos"]} rows={lessons.slice(0, 12)} />
      </section>
    </>
  );
}
