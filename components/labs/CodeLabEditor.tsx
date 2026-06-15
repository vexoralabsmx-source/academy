"use client";

import { useState } from "react";
import { VexoraLogoIcon } from "@/components/brand";
import { Button, Card, Select, Textarea, Toast } from "@/components/ui";

export function CodeLabEditor() {
  const [message, setMessage] = useState<string | null>(null);
  return (
    <Card>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <VexoraLogoIcon size="md" />
          <div>
          <p className="text-sm font-semibold text-violet-300">Editor seguro inicial</p>
          <h2 className="text-2xl font-bold">Code Lab</h2>
          </div>
        </div>
        <Select className="sm:w-48"><option>JavaScript</option><option>TypeScript</option><option>HTML</option><option>CSS</option><option>SQL</option><option>Python</option></Select>
      </div>
      <Textarea className="mt-5 min-h-72 font-mono" defaultValue={'const mensaje = "Aprende construyendo";\nconsole.log(mensaje);'} />
      <p className="mt-3 text-xs text-slate-500">Para ejecución real de código se requiere sandbox seguro aislado. Esta versión usa validación simple.</p>
      <Button className="mt-5" onClick={() => setMessage("Validación simple completada. Buen trabajo. Siguiente nivel más cerca.")}>Validar</Button>
      {message ? <div className="mt-4"><Toast message={message} /></div> : null}
    </Card>
  );
}
