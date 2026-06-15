export function ActivityFeed() {
  const items = ["Completaste HTML semántico", "Ganaste 10 XP en JavaScript", "Iniciaste Data Analyst", "Subiste al nivel 8"];
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item} className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300">{item}</div>
      ))}
    </div>
  );
}
