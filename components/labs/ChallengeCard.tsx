import type { Challenge } from "@/types/course";
import { VexoraLogoIcon } from "@/components/brand";
import { Badge, Button, Card } from "@/components/ui";

export function ChallengeCard({ challenge }: { challenge: Challenge }) {
  return (
    <Card>
      <VexoraLogoIcon size="sm" className="mb-4" />
      <div className="flex flex-wrap gap-2"><Badge>{challenge.type}</Badge><Badge>{challenge.difficulty}</Badge></div>
      <h3 className="mt-4 text-xl font-bold">{challenge.title}</h3>
      <p className="mt-2 text-sm text-slate-400">{challenge.description}</p>
      <div className="mt-5 flex items-center justify-between">
        <span className="text-sm font-semibold text-xp">+{challenge.xp} XP</span>
        <Button variant="secondary">Participar</Button>
      </div>
    </Card>
  );
}
