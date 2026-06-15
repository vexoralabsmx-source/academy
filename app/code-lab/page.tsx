import { PageHeader } from "@/components/layout";
import { CodeLabEditor } from "@/components/labs";

export default function CodeLabPage() {
  return (
    <>
      <PageHeader eyebrow="Code Lab" title="Retos de código con validación simple" description="Editor premium inicial para HTML, CSS, JavaScript, TypeScript, SQL y Python visual." />
      <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8"><CodeLabEditor /></section>
    </>
  );
}
