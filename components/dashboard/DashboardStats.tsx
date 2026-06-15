import { StatCard } from "@/components/ui";

export function DashboardStats({
  level,
  xp,
  streak,
  solvedExercises
}: {
  level: number;
  xp: number;
  streak: number;
  solvedExercises: number;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Nivel" value={level} detail="Cada 100 XP subes un nivel" />
      <StatCard label="XP total" value={xp} detail="Progreso acumulado" />
      <StatCard label="Racha" value={`${streak} días`} detail="Actividad continua" />
      <StatCard label="Ejercicios" value={solvedExercises} detail="Resueltos correctamente" />
    </div>
  );
}
