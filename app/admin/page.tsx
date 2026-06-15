import { AdminStats, AnalyticsCards } from "@/components/admin";
import { PageHeader, SectionHeader } from "@/components/layout";
import { Card } from "@/components/ui";

export default function AdminPage() {
  return (
    <>
      <PageHeader eyebrow="Admin" title="Panel administrativo" description="Overview de usuarios, cursos, lecciones, ejercicios, submissions y XP." />
      <section className="mx-auto max-w-7xl space-y-8 px-4 pb-20 sm:px-6 lg:px-8">
        <AdminStats />
        <Card><SectionHeader title="Actividad reciente" /><p className="text-sm text-slate-400">Usuarios activos, cursos iniciados, ejercicios enviados y certificados generados.</p></Card>
        <AnalyticsCards />
      </section>
    </>
  );
}
