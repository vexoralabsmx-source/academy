import Link from "next/link";
import type { Course } from "@/types/course";
import { VexoraLogoIcon } from "@/components/brand";
import { Badge, Button, Card, ProgressBar } from "@/components/ui";

export function CourseCard({ course, progress = 0 }: { course: Course; progress?: number }) {
  return (
    <Card className="group flex h-full flex-col">
      <VexoraLogoIcon size="md" className="mb-5" />
      <div className="flex flex-wrap gap-2">
        <Badge>{course.area}</Badge>
        <Badge>{course.difficulty}</Badge>
      </div>
      <Link href={`/cursos/${course.slug}`} className="mt-4 text-xl font-bold transition group-hover:text-violet-300">
        {course.title}
      </Link>
      <p className="mt-3 flex-1 text-sm leading-6 text-slate-400">{course.description}</p>
      <div className="mt-5 grid grid-cols-3 gap-3 text-xs text-slate-400">
        <span>{course.lessonsCount} lecciones</span>
        <span>{course.exercisesCount} ejercicios</span>
        <span>{course.xpTotal} XP</span>
      </div>
      <div className="mt-5">
        <ProgressBar value={progress} label={progress > 0 ? "Progreso" : undefined} />
      </div>
      <Button href={`/cursos/${course.slug}`} className="mt-5">{progress > 0 ? "Continuar" : "Empezar"}</Button>
    </Card>
  );
}
