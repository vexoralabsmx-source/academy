import { AdminTable, CourseForm } from "@/components/admin";
import { PageHeader } from "@/components/layout";
import { getAdminCourses } from "@/lib/admin/queries";

export default async function AdminCoursesPage() {
  const courses = await getAdminCourses();

  return (
    <>
      <PageHeader eyebrow="Admin" title="Gestión de cursos" description="Crear, editar, publicar, despublicar y revisar módulos." />
      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-20 sm:px-6 lg:grid-cols-[380px_1fr] lg:px-8">
        <CourseForm />
        <AdminTable headers={["Curso", "Área", "Dificultad", "Estado"]} rows={courses.map((course) => [course.title, course.area, course.difficulty, course.state])} />
      </section>
    </>
  );
}
