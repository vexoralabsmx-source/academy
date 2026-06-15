import type { Course } from "@/types/course";
import { ModuleAccordion } from "@/components/courses";

export function LessonSidebar({ course }: { course: Course }) {
  return (
    <aside className="hidden w-80 shrink-0 border-r border-white/10 bg-surface/40 p-4 xl:block">
      <p className="mb-4 text-sm font-semibold text-cyan">{course.title}</p>
      <ModuleAccordion course={course} />
    </aside>
  );
}
