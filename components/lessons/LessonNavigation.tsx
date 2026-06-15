"use client";

import { useTransition, useState } from "react";
import { markLessonCompleted } from "@/lib/learning/actions";
import { Button, Toast } from "@/components/ui";

export function LessonNavigation({ courseSlug, lessonSlug }: { courseSlug: string; lessonSlug: string }) {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function onComplete() {
    startTransition(async () => {
      const result = await markLessonCompleted({ courseSlug, lessonSlug });
      setMessage(result.message);
    });
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between">
        <Button variant="secondary" onClick={onComplete} disabled={isPending}>{isPending ? "Guardando..." : "Marcar como completado"}</Button>
        <Button href={`/cursos/${courseSlug}`}>Siguiente lección</Button>
      </div>
      {message ? <Toast message={message} /> : null}
    </div>
  );
}
