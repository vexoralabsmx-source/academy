import { VexoraLogoIcon } from "@/components/brand";
import { Button } from "./Button";
import { Card } from "./Card";

export function EmptyState({ title, description, href, action }: { title: string; description: string; href?: string; action?: string }) {
  return (
    <Card className="text-center">
      <div className="mb-4 flex justify-center"><VexoraLogoIcon size="md" /></div>
      <p className="text-lg font-semibold">{title}</p>
      <p className="mx-auto mt-2 max-w-xl text-sm text-slate-400">{description}</p>
      {href && action ? <Button href={href} className="mt-5">{action}</Button> : null}
    </Card>
  );
}
