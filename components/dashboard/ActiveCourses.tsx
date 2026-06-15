import { CourseCard } from "@/components/courses";
import { courses } from "@/lib/seed/data";
import { EmptyState } from "@/components/ui";
import type { ActiveCourseItem } from "@/lib/dashboard/queries";

export function ActiveCourses({ items }: { items: ActiveCourseItem[] }) {
  if (items.length === 0) {
    return (
      <EmptyState
        title="Aun no tienes cursos activos"
        description="Explora el catalogo y comienza una ruta para que tu progreso aparezca aqui."
        href="/cursos"
        action="Explorar cursos"
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((item) => {
        const seeded = courses.find((course) => course.slug === item.slug);
        if (!seeded) return null;
        return <CourseCard key={item.slug} course={seeded} progress={item.progressPercent} />;
      })}
    </div>
  );
}
