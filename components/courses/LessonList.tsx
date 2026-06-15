import Link from "next/link";
import type { Course } from "@/types/course";

export function LessonList({ course }: { course: Course }) {
  return (
    <div className="space-y-2">
      {course.modules.flatMap((module) => module.lessons).map((lesson, index) => (
        <Link key={lesson.id} href={`/aprender/${course.slug}/${lesson.slug}`} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm hover:border-cyan/30">
          <span>{index + 1}. {lesson.title}</span>
          <span className="text-slate-500">{lesson.estimatedMinutes} min</span>
        </Link>
      ))}
    </div>
  );
}
