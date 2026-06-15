import { Card } from "@/components/ui";

export function StreakCard({ streak }: { streak: number }) {
  return (
    <Card>
      <p className="text-sm text-slate-400">Racha actual</p>
      <p className="mt-2 text-4xl font-bold text-xp">{streak} días</p>
      <p className="mt-3 text-sm text-slate-400">Buen trabajo. Siguiente nivel más cerca.</p>
    </Card>
  );
}
