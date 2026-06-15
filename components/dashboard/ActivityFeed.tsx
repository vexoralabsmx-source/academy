export function ActivityFeed({ items }: { items: string[] }) {
  if (items.length === 0) {
    return <p className="text-sm text-slate-400">Aun no hay actividad reciente. Empieza una leccion para generar progreso real.</p>;
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item} className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300">{item}</div>
      ))}
    </div>
  );
}
