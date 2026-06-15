import { AnalyticsCards } from "@/components/admin";
import { PageHeader } from "@/components/layout";
import { getAdminAnalytics } from "@/lib/admin/queries";

export default async function AdminAnalyticsPage() {
  const groups = await getAdminAnalytics();
  return (
    <>
      <PageHeader eyebrow="Admin" title="Analytics de plataforma" description="Cursos más vistos, ejercicios más fallados, usuarios activos y retención básica." />
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8"><AnalyticsCards groups={groups} /></section>
    </>
  );
}
