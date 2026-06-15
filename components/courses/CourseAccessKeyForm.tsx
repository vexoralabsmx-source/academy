"use client";

import { useState, useTransition } from "react";
import { redeemCourseAccessKey } from "@/lib/access/actions";
import { Button, Input, Toast } from "@/components/ui";

export function CourseAccessKeyForm({ courseSlug }: { courseSlug: string }) {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startTransition(async () => {
      const result = await redeemCourseAccessKey({ courseSlug, code });
      setMessage(result.message);
    });
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 grid gap-3">
      <Input value={code} onChange={(event) => setCode(event.target.value.toUpperCase())} placeholder="Ingresa tu llave premium" />
      <Button disabled={isPending || !code.trim()}>{isPending ? "Validando..." : "Desbloquear curso"}</Button>
      {message ? <Toast message={message} /> : null}
    </form>
  );
}
