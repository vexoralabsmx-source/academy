import { StatCard } from "@/components/ui";
import type { UserProfile } from "@/types/course";

export function DashboardStats({ user }: { user: UserProfile }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Nivel" value={user.level} detail="Cada 100 XP subes un nivel" />
      <StatCard label="XP total" value={user.xp} detail="Progreso acumulado" />
      <StatCard label="Racha" value={`${user.streak} días`} detail="Actividad continua" />
      <StatCard label="Ejercicios" value="87" detail="Resueltos correctamente" />
    </div>
  );
}
