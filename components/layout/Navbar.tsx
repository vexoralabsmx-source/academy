import Link from "next/link";
import { Menu } from "lucide-react";
import { getCurrentProfile } from "@/lib/auth/session";
import { navItems } from "@/lib/constants/site";
import { VexoraLogoIcon } from "@/components/brand";
import { Button } from "@/components/ui";

export async function Navbar() {
  const profile = await getCurrentProfile();
  const isAdmin = profile?.role === "admin";

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-background/75 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <VexoraLogoIcon size="sm" className="shadow-[0_0_30px_rgba(139,92,246,0.18)]" />
          <span className="font-bold tracking-tight">Vexora Academy</span>
        </Link>
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white">
              {item.label}
            </Link>
          ))}
          {isAdmin ? (
            <Link href="/admin" className="rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white">
              Admin
            </Link>
          ) : null}
        </div>
        <div className="hidden items-center gap-3 md:flex">
          {profile ? (
            <>
              <Button href="/dashboard" variant="ghost" size="sm">Dashboard</Button>
              {isAdmin ? <Button href="/admin" variant="secondary" size="sm">Admin</Button> : null}
            </>
          ) : (
            <>
              <Button href="/login" variant="ghost" size="sm">Login</Button>
              <Button href="/register" size="sm">Empezar gratis</Button>
            </>
          )}
        </div>
        <Link href="/dashboard" className="rounded-lg border border-white/10 p-2 text-slate-300 md:hidden">
          <Menu size={20} />
        </Link>
      </nav>
    </header>
  );
}
