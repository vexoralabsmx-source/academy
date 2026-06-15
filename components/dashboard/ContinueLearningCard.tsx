import { VexoraLogoIcon } from "@/components/brand";
import { Button, Card, ProgressBar } from "@/components/ui";

export function ContinueLearningCard() {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <VexoraLogoIcon size="sm" />
        <p className="text-sm font-semibold text-violet-300">Continúa donde lo dejaste</p>
      </div>
      <h3 className="mt-2 text-2xl font-bold">JavaScript práctico: Funciones</h3>
      <p className="mt-3 text-sm text-slate-400">Siguiente lección recomendada para mantener tu racha y avanzar hacia el proyecto de lista de tareas.</p>
      <div className="mt-5"><ProgressBar value={62} label="Curso en progreso" /></div>
      <Button href="/aprender/javascript-practico/funciones" className="mt-5">Continuar aprendiendo</Button>
    </Card>
  );
}
