import { VexoraLogoIcon } from "@/components/brand";
import { Button, Card, ProgressBar } from "@/components/ui";

export function ContinueLearningCard({
  title,
  description,
  href,
  progress
}: {
  title: string;
  description: string;
  href: string;
  progress: number;
}) {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <VexoraLogoIcon size="sm" />
        <p className="text-sm font-semibold text-violet-300">Continúa donde lo dejaste</p>
      </div>
      <h3 className="mt-2 text-2xl font-bold">{title}</h3>
      <p className="mt-3 text-sm text-slate-400">{description}</p>
      <div className="mt-5"><ProgressBar value={progress} label="Curso en progreso" /></div>
      <Button href={href} className="mt-5">Continuar aprendiendo</Button>
    </Card>
  );
}
