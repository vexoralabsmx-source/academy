export function SectionHeader({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <div className="mb-8 max-w-3xl">
      {eyebrow ? <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan">{eyebrow}</p> : null}
      <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {description ? <p className="mt-3 text-slate-400">{description}</p> : null}
    </div>
  );
}
