import { VexoraLogoIcon } from "@/components/brand";
import { Card } from "@/components/ui";

const achievements = ["Primera lección", "Racha 7 días", "Builder activo", "Primer proyecto", "SQL iniciado", "AI Lab"];

export function AchievementGrid() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {achievements.map((achievement) => (
        <Card key={achievement} className="p-4">
          <VexoraLogoIcon size="sm" className="mb-3" />
          <p className="font-semibold">{achievement}</p>
          <p className="mt-1 text-xs text-slate-500">Nuevo logro desbloqueado.</p>
        </Card>
      ))}
    </div>
  );
}
