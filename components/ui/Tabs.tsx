import type { ReactNode } from "react";

export function Tabs({ tabs }: { tabs: { label: string; content: ReactNode }[] }) {
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <span key={tab.label} className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
            {tab.label}
          </span>
        ))}
      </div>
      <div className="mt-5">{tabs[0]?.content}</div>
    </div>
  );
}
