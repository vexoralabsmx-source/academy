import Link from "next/link";
import { getCurrentProfile } from "@/lib/auth/session";
import { navItems, siteConfig } from "@/lib/constants/site";

export async function Footer() {
  const profile = await getCurrentProfile();
  const links = navItems.concat(profile?.role === "admin" ? [{ href: "/admin", label: "Admin" }] : []).concat(profile ? [{ href: "/settings", label: "Settings" }] : []);

  return (
    <footer className="border-t border-white/10 bg-surface/60">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr] lg:px-8">
        <div>
          <p className="text-lg font-bold">{siteConfig.name}</p>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">{siteConfig.description}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm text-slate-400 sm:grid-cols-3">
          {links.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-violet-200">{item.label}</Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
