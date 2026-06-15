import { Button } from "@/components/ui";

export function LessonNavigation({ courseSlug }: { courseSlug: string }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between">
      <Button variant="secondary">Marcar como completado</Button>
      <Button href={`/cursos/${courseSlug}`}>Siguiente lección</Button>
    </div>
  );
}
