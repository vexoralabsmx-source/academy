import type { ReactNode } from "react";

export function Dropdown({ label, children }: { label: string; children: ReactNode }) {
  return (
    <details className="relative">
      <summary className="cursor-pointer rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm">{label}</summary>
      <div className="absolute right-0 z-20 mt-2 min-w-48 rounded-lg border border-white/10 bg-surface p-2 shadow-2xl">{children}</div>
    </details>
  );
}
