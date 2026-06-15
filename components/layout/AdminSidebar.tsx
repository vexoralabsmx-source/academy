import Link from "next/link";
import { Activity, BookOpen, Dumbbell, FileText, LayoutDashboard, Users } from "lucide-react";

const items = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/cursos", label: "Cursos", icon: BookOpen },
  { href: "/admin/lecciones", label: "Lecciones", icon: FileText },
  { href: "/admin/ejercicios", label: "Ejercicios", icon: Dumbbell },
  { href: "/admin/usuarios", label: "Usuarios", icon: Users },
  { href: "/admin/analytics", label: "Analytics", icon: Activity }
];

export function AdminSidebar() {
  return (
    <aside className="hidden min-h-[calc(100vh-4rem)] w-64 border-r border-white/10 bg-surface/50 p-4 lg:block">
      <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-[0.25em] text-cyan">Admin</p>
      {items.map((item) => (
        <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white">
          <item.icon size={18} />
          {item.label}
        </Link>
      ))}
    </aside>
  );
}
