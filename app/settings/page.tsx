import { AppSidebar, PageHeader } from "@/components/layout";
import { ProfileSettingsForm } from "@/components/account/ProfileSettingsForm";
import { Card } from "@/components/ui";
import { getCurrentProfile, requireAuth } from "@/lib/auth/session";

export default async function SettingsPage() {
  await requireAuth();
  const profile = await getCurrentProfile();
  if (!profile) return null;

  return (
    <div className="flex">
      <AppSidebar />
      <div className="w-full">
        <PageHeader eyebrow="Configuración" title="Ajustes de cuenta" description="Gestiona perfil, enlaces, privacidad y preferencias." />
        <section className="mx-auto grid max-w-4xl gap-6 px-4 pb-20 sm:px-6 lg:px-8">
          <Card>
            <h2 className="text-xl font-bold">Perfil</h2>
            <div className="mt-5"><ProfileSettingsForm profile={profile} /></div>
          </Card>
          <Card>
            <h2 className="text-xl font-bold">Preferencias</h2>
            <p className="mt-3 text-sm text-slate-400">Tema dark fijo por ahora. Notificaciones y privacidad de perfil quedan preparadas para Supabase.</p>
          </Card>
        </section>
      </div>
    </div>
  );
}
