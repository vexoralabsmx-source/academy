import { AdminStats, AnalyticsCards } from "@/components/admin";
import { PageHeader, SectionHeader } from "@/components/layout";
import { Card } from "@/components/ui";
import { getAdminAnalytics, getAdminOverviewData } from "@/lib/admin/queries";

export default async function AdminPage() {
  const overview = await getAdminOverviewData();
  const analytics = await getAdminAnalytics();

  return (
    <>
      <PageHeader eyebrow="Admin" title="Panel administrativo" description="Overview de usuarios, cursos, lecciones, ejercicios, submissions y XP." />
      <section className="mx-auto max-w-7xl space-y-8 px-4 pb-20 sm:px-6 lg:px-8">
        <AdminStats overview={overview} />
        <Card>
          <SectionHeader title="Actividad reciente" />
          <div className="space-y-3">
            {overview.recentActivity.length > 0 ? overview.recentActivity.map((item) => (
              <div key={item} className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300">{item}</div>
            )) : <p className="text-sm text-slate-400">Aun no hay actividad reciente.</p>}
          </div>
        </Card>
        <AnalyticsCards groups={analytics} />
      </section>
    </>
  );
}
