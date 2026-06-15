import Link from "next/link";
import type { Course } from "@/types/course";

export function ModuleAccordion({ course }: { course: Course }) {
  return (
    <div className="space-y-3">
      {course.modules.map((module) => (
        <details key={module.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-4" open>
          <summary className="cursor-pointer font-semibold">{module.title}</summary>
          <div className="mt-3 space-y-2">
            {module.lessons.map((lesson) => (
              <Link key={lesson.id} href={`/aprender/${course.slug}/${lesson.slug}`} className="block rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-cyan">
                {lesson.title}
              </Link>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
