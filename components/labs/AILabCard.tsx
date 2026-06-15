import type { LabCard } from "@/types/course";
import { VexoraLogoIcon } from "@/components/brand";
import { Badge, Button, Card } from "@/components/ui";

export function AILabCard({ item }: { item: LabCard }) {
  return (
    <Card>
      <VexoraLogoIcon size="sm" className="mb-4" />
      <Badge>{item.difficulty}</Badge>
      <h3 className="mt-4 text-xl font-bold">{item.title}</h3>
      <p className="mt-2 text-sm text-slate-400">{item.description}</p>
      <p className="mt-4 rounded-lg border border-violet/20 bg-violet/10 p-3 text-sm text-violet-100">{item.prompt}</p>
      <Button className="mt-4" variant="secondary">Practicar +{item.xp} XP</Button>
    </Card>
  );
}
