import { VexoraLogoIcon } from "@/components/brand";
import { Card } from "@/components/ui";
import type { AchievementItem } from "@/lib/dashboard/queries";

export function AchievementGrid({ achievements }: { achievements: AchievementItem[] }) {
  if (achievements.length === 0) {
    return <p className="text-sm text-slate-400">Aun no desbloqueas logros. Completa lecciones y ejercicios para empezar.</p>;
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {achievements.map((achievement) => (
        <Card key={achievement.title} className="p-4">
          <VexoraLogoIcon size="sm" className="mb-3" />
          <p className="font-semibold">{achievement.title}</p>
          <p className="mt-1 text-xs text-slate-500">{achievement.description}</p>
        </Card>
      ))}
    </div>
  );
}
