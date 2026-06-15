import { Badge } from "@/components/ui";

export function PageHeader({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-8 pt-12 sm:px-6 lg:px-8">
      {eyebrow ? <Badge>{eyebrow}</Badge> : null}
      <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
      {description ? <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-400">{description}</p> : null}
    </section>
  );
}
