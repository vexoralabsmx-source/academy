import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout";
import { Badge, Button, Card } from "@/components/ui";
import { findPath } from "@/lib/seed/data";

export default function PathDetailPage({ params }: { params: { slug: string } }) {
  const path = findPath(params.slug);
  if (!path) notFound();
  return (
    <>
      <PageHeader eyebrow="Ruta" title={path.title} description={path.description} />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-20 sm:px-6 lg:grid-cols-[1fr_340px] lg:px-8">
        <Card>
          <h2 className="text-2xl font-bold">Cursos incluidos</h2>
          <div className="mt-6 space-y-3">
            {path.courses.map((course, index) => (
              <div key={course} className="flex items-center gap-4 rounded-lg border border-white/10 bg-white/[0.03] p-4">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-cyan/10 text-sm font-bold text-cyan">{index + 1}</span>
                <span>{course}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <div className="flex gap-2"><Badge>{path.difficulty}</Badge><Badge>{path.estimatedHours}h</Badge></div>
          <p className="mt-5 text-sm text-slate-400">{path.exerciseCount} ejercicios prácticos y proyectos integrados.</p>
          <Button href="/dashboard" className="mt-5">Iniciar ruta</Button>
        </Card>
      </section>
    </>
  );
}
