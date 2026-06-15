import { AccessKeyManager } from "@/components/admin/AccessKeyManager";
import { AdminTable, CatalogSyncButton, CourseForm } from "@/components/admin";
import { PageHeader } from "@/components/layout";
import { getAdminCourses } from "@/lib/admin/queries";
import { courses as seedCourses } from "@/lib/seed/data";

export default async function AdminCoursesPage() {
  const courses = await getAdminCourses();
  const premiumCourses = seedCourses.filter((course) => course.accessTier === "premium");

  return (
    <>
      <PageHeader eyebrow="Admin" title="Gestión de cursos" description="Crear, editar, publicar, despublicar y revisar módulos." />
      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-20 sm:px-6 lg:grid-cols-[380px_1fr] lg:px-8">
        <div className="space-y-6">
          <CourseForm />
          <CatalogSyncButton />
          <AccessKeyManager premiumCourses={premiumCourses} />
        </div>
        <AdminTable headers={["Curso", "Área", "Dificultad", "Estado"]} rows={courses.map((course) => [course.title, course.area, course.difficulty, course.state])} />
      </section>
    </>
  );
}
