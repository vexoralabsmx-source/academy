import { courses } from "@/lib/seed/data";
import { VexoraLogoIcon } from "@/components/brand";

function AdminStat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="glass rounded-xl p-5">
      <VexoraLogoIcon size="sm" className="mb-4" />
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-bold text-white">{value}</p>
    </div>
  );
}

export function AdminStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <AdminStat label="Usuarios" value="1,284" />
      <AdminStat label="Cursos publicados" value={courses.length} />
      <AdminStat label="Lecciones" value="172" />
      <AdminStat label="Ejercicios" value="348" />
      <AdminStat label="XP entregado" value="92k" />
    </div>
  );
}
