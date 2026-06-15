"use client";

import { useState, useTransition } from "react";
import { generateCourseAccessKey } from "@/lib/access/actions";
import type { Course } from "@/types/course";
import { Button, Card, Select, Toast } from "@/components/ui";

export function AccessKeyManager({ premiumCourses }: { premiumCourses: Course[] }) {
  const [selected, setSelected] = useState(premiumCourses[0]?.slug ?? "");
  const [message, setMessage] = useState<string | null>(null);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function onGenerate() {
    startTransition(async () => {
      const result = await generateCourseAccessKey(selected);
      setMessage(result.message);
      setGeneratedCode(result.ok ? result.code : null);
    });
  }

  return (
    <Card>
      <h2 className="text-xl font-bold">Llaves premium</h2>
      <p className="mt-2 text-sm text-slate-400">Selecciona un curso premium y genera una llave unica para venderla manualmente por WhatsApp u otro canal.</p>
      <div className="mt-5 grid gap-3">
        <Select value={selected} onChange={(event) => setSelected(event.target.value)}>
          {premiumCourses.map((course) => <option key={course.slug} value={course.slug}>{course.title}</option>)}
        </Select>
        <Button onClick={onGenerate} disabled={isPending || !selected}>{isPending ? "Generando..." : "Generar llave"}</Button>
        {generatedCode ? <div className="rounded-lg border border-violet/20 bg-violet/10 px-4 py-3 font-mono text-sm text-violet-100">{generatedCode}</div> : null}
        {message ? <Toast message={message} /> : null}
      </div>
    </Card>
  );
}
