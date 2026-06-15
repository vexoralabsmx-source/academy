import { PageHeader } from "@/components/layout";
import { VexoraLogoIcon } from "@/components/brand";
import { Badge, Button, Card } from "@/components/ui";
import { learningPaths } from "@/lib/seed/data";

export default function PathsPage() {
  return (
    <>
      <PageHeader eyebrow="Rutas" title="Rutas de aprendizaje" description="Planes completos para convertir práctica diaria en progreso visible." />
      <section className="mx-auto grid max-w-7xl gap-5 px-4 pb-20 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {learningPaths.map((path) => (
          <Card key={path.slug}>
            <VexoraLogoIcon size="md" />
            <h2 className="mt-5 text-2xl font-bold">{path.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">{path.description}</p>
            <div className="mt-4 flex gap-2"><Badge>{path.difficulty}</Badge><Badge>{path.estimatedHours}h</Badge><Badge>{path.exerciseCount} ejercicios</Badge></div>
            <Button href={`/rutas/${path.slug}`} className="mt-5" variant="secondary">Ver ruta</Button>
          </Card>
        ))}
      </section>
    </>
  );
}
