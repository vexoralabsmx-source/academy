import { PageHeader } from "@/components/layout";
import { AILabCard } from "@/components/labs";
import { aiLabCards } from "@/lib/seed/data";

export default function AILabPage() {
  return (
    <>
      <PageHeader eyebrow="AI Lab" title="Laboratorio de inteligencia artificial aplicada" description="Practica prompts, evaluación, flujos inteligentes, automatización y límites de uso responsable." />
      <section className="mx-auto grid max-w-7xl gap-5 px-4 pb-20 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {aiLabCards.map((item) => <AILabCard key={item.title} item={item} />)}
      </section>
    </>
  );
}
