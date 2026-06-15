import { AppSidebar, PageHeader } from "@/components/layout";
import { Badge, Card } from "@/components/ui";
import { demoUser } from "@/lib/seed/data";

export default function CertificatesPage() {
  return (
    <div className="flex">
      <AppSidebar />
      <div className="w-full">
        <PageHeader eyebrow="Certificados" title="Certificados del usuario" description="Cuando completes 100% de un curso, se genera un certificado visual." />
        <section className="mx-auto grid max-w-5xl gap-5 px-4 pb-20 sm:px-6 lg:px-8">
          <Card className="relative overflow-hidden p-10">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-cyan/20 blur-3xl" />
            <Badge>Certificado demo</Badge>
            <h2 className="mt-6 text-4xl font-black">Vexora Academy</h2>
            <p className="mt-4 text-slate-400">Certifica que {demoUser.fullName} completó el curso HTML desde cero.</p>
            <p className="mt-8 text-sm text-slate-500">ID: VXA-HTML-2026-DEMO</p>
          </Card>
        </section>
      </div>
    </div>
  );
}
