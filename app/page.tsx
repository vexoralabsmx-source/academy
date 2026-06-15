import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { VexoraLogoIcon } from "@/components/brand";
import { areas, learningPaths, projects } from "@/lib/seed/data";
import { siteConfig } from "@/lib/constants/site";
import { Badge, Button, Card, StatCard } from "@/components/ui";
import { SectionHeader } from "@/components/layout";

const metrics = ["12+ rutas", "150+ ejercicios", "40+ proyectos", "Feedback inmediato", "XP y progreso"];
const benefits = ["Calificación automática", "Progreso guardado", "Rachas", "XP y niveles", "Logros", "Rutas personalizadas", "Dashboard personal", "Retos semanales", "Certificados", "Proyectos reales"];
const audiences = ["Estudiantes", "Emprendedores", "Creadores digitales", "Futuros programadores", "Diseñadores UI/UX", "Analistas de datos", "Freelancers", "Personas que quieren trabajar en tecnología"];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute left-10 top-24 h-72 w-72 rounded-full bg-violet/20 blur-3xl" />
        <div className="absolute right-10 top-10 h-80 w-80 rounded-full bg-fuchsia-900/20 blur-3xl" />
        <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
          <div className="soft-appear">
            <Badge className="border-violet/25 bg-violet/10 text-violet-200"><Sparkles size={14} className="mr-2" /> Centro de entrenamiento tecnologico</Badge>
            <h1 className="mt-6 max-w-5xl text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
              <span className="text-gradient">{siteConfig.tagline}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Vexora Academy es una plataforma de aprendizaje práctico para dominar desarrollo web, programación, datos, inteligencia artificial, automatización, UI/UX y tecnología aplicada.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/register" size="lg">Empezar gratis <ArrowRight size={18} className="ml-2" /></Button>
              <Button href="/cursos" variant="secondary" size="lg">Explorar cursos</Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {metrics.map((metric) => <Badge key={metric}>{metric}</Badge>)}
            </div>
          </div>
          <div className="relative soft-appear">
            <Card className="float-slow p-5">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <VexoraLogoIcon size="sm" />
                  <div><p className="text-xs text-slate-500">Dashboard preview</p><p className="font-bold">Builder progress</p></div>
                </div>
                <Badge className="border-violet/25 bg-violet/10 text-violet-200">Nivel 8</Badge>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <StatCard label="XP" value="780" />
                <StatCard label="Racha" value="14d" />
                <StatCard label="Cursos" value="6" />
              </div>
              <pre className="code-scroll mt-5 overflow-auto rounded-xl border border-violet/20 bg-black/45 p-4 text-sm text-violet-200">{`const builder = {
  focus: "proyectos reales",
  feedback: "inmediato",
  nextLevel: true
};`}</pre>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Rutas" title="Aprende por rutas" description="Elige una dirección clara y avanza con cursos, ejercicios, XP y proyectos." />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {learningPaths.map((path) => (
            <Card key={path.slug}>
              <VexoraLogoIcon size="md" className="mb-5" />
              <div className="flex gap-2"><Badge>{path.difficulty}</Badge><Badge>{path.estimatedHours}h</Badge><Badge>{path.courses.length} cursos</Badge></div>
              <h3 className="mt-4 text-xl font-bold">{path.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{path.description}</p>
              <p className="mt-4 text-sm text-slate-500">{path.exerciseCount} ejercicios</p>
              <Button href={`/rutas/${path.slug}`} variant="secondary" className="mt-5">Ver ruta</Button>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-surface/45 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Sistema" title="Cómo funciona" description="Aprende con un flujo directo, medible y orientado a construir." />
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            {["Elige una ruta", "Aprende con lecciones claras", "Resuelve ejercicios", "Recibe calificación", "Gana XP", "Construye proyectos reales"].map((step, index) => (
              <Card key={step} className="p-5">
                <p className="text-3xl font-black text-violet-200">0{index + 1}</p>
                <p className="mt-3 text-sm font-semibold">{step}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Áreas" title="Domina habilidades que sí se usan" />
        <div className="flex flex-wrap gap-3">{areas.map((area) => <Badge key={area}>{area}</Badge>)}</div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <SectionHeader eyebrow="Inteligente" title="Plataforma inteligente" description="Tu progreso siempre visible, con feedback y motivación sin tono infantil." />
          <div className="grid gap-3 sm:grid-cols-2">{benefits.map((benefit) => <div key={benefit} className="flex items-center gap-3 text-sm text-slate-300"><CheckCircle2 className="text-violet-300" size={18} />{benefit}</div>)}</div>
        </div>
        <Card>
          <SectionHeader title="Para quién es" />
          <div className="grid gap-3 sm:grid-cols-2">{audiences.map((item) => <div key={item} className="rounded-lg border border-white/10 bg-white/[0.03] p-3 text-sm">{item}</div>)}</div>
        </Card>
      </section>

      <section className="bg-surface/45 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Proyectos" title="No solo veas teoría. Construye." description="Ejemplos de entregables que la plataforma prepara para crear." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{projects.map((project) => <Card key={project} className="p-4 text-sm font-semibold">{project}</Card>)}</div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h2 className="text-4xl font-black tracking-tight sm:text-5xl">Empieza hoy a construir habilidades que sí sirven.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-400">Aprende, practica y crea proyectos reales desde una sola plataforma.</p>
        <Button href="/register" size="lg" className="mt-8">Crear cuenta gratis</Button>
      </section>
    </>
  );
}
