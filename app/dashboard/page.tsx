import { AppSidebar, PageHeader, SectionHeader } from "@/components/layout";
import { AchievementGrid, ActiveCourses, ActivityFeed, ContinueLearningCard, DashboardStats, LevelProgress, RecommendedLessons, StreakCard } from "@/components/dashboard";
import { Card } from "@/components/ui";
import { getDashboardData } from "@/lib/dashboard/queries";
import { getCurrentProfile, requireAuth } from "@/lib/auth/session";

export default async function DashboardPage() {
  await requireAuth();
  const profile = await getCurrentProfile();
  if (!profile) return null;
  const dashboard = await getDashboardData(profile);

  return (
    <div className="flex">
      <AppSidebar />
      <div className="w-full">
        <PageHeader eyebrow="Dashboard" title={`Hola, ${profile.full_name ?? profile.username ?? "Builder"}`} description="Tu progreso siempre visible. Continúa aprendiendo, gana XP y construye proyectos reales." />
        <section className="mx-auto max-w-7xl space-y-8 px-4 pb-20 sm:px-6 lg:px-8">
          <DashboardStats level={profile.level} xp={profile.xp} streak={profile.streak} solvedExercises={dashboard.solvedExercises} />
          <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
            <ContinueLearningCard
              title={dashboard.continueLesson?.title ?? "Todavia no tienes progreso"}
              description={dashboard.continueLesson?.description ?? "Explora un curso para empezar a registrar progreso real por usuario."}
              href={dashboard.continueLesson?.href ?? "/cursos"}
              progress={dashboard.continueLesson?.progress ?? 0}
            />
            <StreakCard streak={profile.streak} />
          </div>
          <Card><SectionHeader title="Progreso al siguiente nivel" /><LevelProgress xp={profile.xp} /></Card>
          <div><SectionHeader title="Cursos en progreso" /><ActiveCourses items={dashboard.activeCourses} /></div>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card><SectionHeader title="Logros recientes" /><AchievementGrid achievements={dashboard.achievements} /></Card>
            <Card><SectionHeader title="Actividad reciente" /><ActivityFeed items={dashboard.activity} /></Card>
          </div>
          <Card><SectionHeader title="Retos recomendados" /><RecommendedLessons lessons={dashboard.recommendedLessons} /></Card>
        </section>
      </div>
    </div>
  );
}
