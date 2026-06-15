import { PageHeader, SectionHeader } from "@/components/layout";
import { DataLabCard, DatasetPreview } from "@/components/labs";
import { Card } from "@/components/ui";
import { dataLabCards } from "@/lib/seed/data";

export default function DataLabPage() {
  return (
    <>
      <PageHeader eyebrow="Data Lab" title="Laboratorio de análisis de datos" description="Practica interpretación, limpieza, métricas y SQL conceptual sin ejecutar código peligroso." />
      <section className="mx-auto max-w-7xl space-y-8 px-4 pb-20 sm:px-6 lg:px-8">
        <Card><SectionHeader title="Dataset demo" description="Mini tabla para retos de ventas, productos y métricas." /><DatasetPreview /></Card>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{dataLabCards.map((item) => <DataLabCard key={item.title} item={item} />)}</div>
      </section>
    </>
  );
}
