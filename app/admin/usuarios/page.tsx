import { UserTable } from "@/components/admin";
import { PageHeader } from "@/components/layout";
import { Card } from "@/components/ui";

export default function AdminUsersPage() {
  return (
    <>
      <PageHeader eyebrow="Admin" title="Gestión de usuarios" description="Ver perfiles, cambiar role y revisar progreso." />
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <Card><UserTable /></Card>
      </section>
    </>
  );
}
