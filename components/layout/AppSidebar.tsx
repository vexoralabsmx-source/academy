import Link from "next/link";
import { BarChart3, BookOpen, Code2, GraduationCap, Settings, Trophy, User } from "lucide-react";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/cursos", label: "Cursos", icon: BookOpen },
  { href: "/rutas", label: "Rutas", icon: GraduationCap },
  { href: "/retos", label: "Retos", icon: Trophy },
  { href: "/code-lab", label: "Code Lab", icon: Code2 },
  { href: "/perfil", label: "Perfil", icon: User },
  { href: "/settings", label: "Settings", icon: Settings }
];

export function AppSidebar() {
  return (
    <aside className="hidden min-h-[calc(100vh-4rem)] w-64 border-r border-white/10 bg-surface/40 p-4 lg:block">
      <div className="space-y-1">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white">
            <item.icon size={18} />
            {item.label}
          </Link>
        ))}
      </div>
    </aside>
  );
}
