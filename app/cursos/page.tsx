import { CourseFilters, CourseGrid } from "@/components/courses";
import { PageHeader } from "@/components/layout";
import { courses } from "@/lib/seed/data";

export default function CoursesPage() {
  return (
    <>
      <PageHeader eyebrow="Catálogo" title="Cursos prácticos para builders digitales" description="Filtra por área, dificultad y objetivo. Cada curso combina teoría directa, ejercicios y proyectos." />
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <CourseFilters />
        <div className="mt-8"><CourseGrid courses={courses} /></div>
      </section>
    </>
  );
}
