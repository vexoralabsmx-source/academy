import Link from "next/link";
import { navItems } from "@/lib/constants/site";

export function MobileNav() {
  return (
    <div className="flex gap-2 overflow-x-auto border-y border-white/10 bg-surface/50 px-4 py-3 lg:hidden">
      {navItems.map((item) => (
        <Link key={item.href} href={item.href} className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
          {item.label}
        </Link>
      ))}
    </div>
  );
}
