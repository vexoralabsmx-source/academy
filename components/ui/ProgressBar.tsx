export function ProgressBar({ value, label }: { value: number; label?: string }) {
  const safe = Math.max(0, Math.min(100, value));
  return (
    <div>
      {label ? <div className="mb-2 flex justify-between text-xs text-slate-400"><span>{label}</span><span>{safe}%</span></div> : null}
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-gradient-to-r from-cyan via-electric to-violet" style={{ width: `${safe}%` }} />
      </div>
    </div>
  );
}
