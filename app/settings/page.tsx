import { AppSidebar, PageHeader } from "@/components/layout";
import { Button, Card, Input, Textarea } from "@/components/ui";

export default function SettingsPage() {
  return (
    <div className="flex">
      <AppSidebar />
      <div className="w-full">
        <PageHeader eyebrow="Configuración" title="Ajustes de cuenta" description="Gestiona perfil, enlaces, privacidad y preferencias." />
        <section className="mx-auto grid max-w-4xl gap-6 px-4 pb-20 sm:px-6 lg:px-8">
          <Card>
            <h2 className="text-xl font-bold">Perfil</h2>
            <div className="mt-5 grid gap-3">
              <Input placeholder="Username" />
              <Textarea placeholder="Bio" />
              <Input placeholder="Avatar URL" />
              <Input placeholder="Website" />
              <Input placeholder="GitHub" />
              <Input placeholder="LinkedIn" />
              <Button>Guardar cambios</Button>
            </div>
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
