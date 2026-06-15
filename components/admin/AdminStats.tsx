import { VexoraLogoIcon } from "@/components/brand";
import type { AdminOverviewData } from "@/lib/admin/queries";

function AdminStat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="glass rounded-xl p-5">
      <VexoraLogoIcon size="sm" className="mb-4" />
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-bold text-white">{value}</p>
    </div>
  );
}

export function AdminStats({ overview }: { overview: AdminOverviewData }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <AdminStat label="Usuarios" value={overview.totalUsers} />
      <AdminStat label="Cursos publicados" value={overview.totalCourses} />
      <AdminStat label="Lecciones" value={overview.totalLessons} />
      <AdminStat label="Ejercicios" value={overview.totalExercises} />
      <AdminStat label="XP entregado" value={overview.totalXpAwarded} />
    </div>
  );
}
