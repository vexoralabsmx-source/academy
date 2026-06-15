"use client";

import { useState, useTransition } from "react";
import { syncCatalogAction } from "@/lib/admin/actions";
import { Button, Card, Toast } from "@/components/ui";

export function CatalogSyncButton() {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function onSync() {
    startTransition(async () => {
      const result = await syncCatalogAction();
      setMessage(result.message);
    });
  }

  return (
    <Card>
      <h2 className="text-xl font-bold">Sincronizar catalogo</h2>
      <p className="mt-2 text-sm text-slate-400">
        Fuerza la carga de todos los cursos, modulos, lecciones y ejercicios desde el seed local hacia Supabase.
      </p>
      <div className="mt-5 space-y-3">
        <Button onClick={onSync} disabled={isPending}>
          {isPending ? "Sincronizando..." : "Sincronizar todo"}
        </Button>
        {message ? <Toast message={message} /> : null}
      </div>
    </Card>
  );
}
