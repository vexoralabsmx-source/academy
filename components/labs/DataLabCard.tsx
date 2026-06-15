import type { LabCard } from "@/types/course";
import { VexoraLogoIcon } from "@/components/brand";
import { Badge, Button, Card } from "@/components/ui";

export function DataLabCard({ item }: { item: LabCard }) {
  return (
    <Card>
      <VexoraLogoIcon size="sm" className="mb-4" />
      <Badge>{item.difficulty}</Badge>
      <h3 className="mt-4 text-xl font-bold">{item.title}</h3>
      <p className="mt-2 text-sm text-slate-400">{item.description}</p>
      <pre className="mt-4 rounded-lg border border-white/10 bg-black/30 p-3 text-xs text-cyan">{item.prompt}</pre>
      <Button className="mt-4" variant="secondary">Resolver +{item.xp} XP</Button>
    </Card>
  );
}
