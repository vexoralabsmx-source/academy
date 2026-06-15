import Link from "next/link";
import { VexoraLogoIcon } from "@/components/brand";
import type { RecommendedLessonItem } from "@/lib/dashboard/queries";

export function RecommendedLessons({ lessons }: { lessons: RecommendedLessonItem[] }) {
  return (
    <div className="space-y-2">
      {lessons.map((lesson) => (
        <Link key={lesson.href} href={lesson.href} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm hover:border-violet/30 hover:text-violet-200">
          <VexoraLogoIcon size="sm" />
          {lesson.title}
        </Link>
      ))}
    </div>
  );
}
