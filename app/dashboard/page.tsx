import { AppSidebar, PageHeader, SectionHeader } from "@/components/layout";
import { AchievementGrid, ActiveCourses, ActivityFeed, ContinueLearningCard, DashboardStats, LevelProgress, RecommendedLessons, StreakCard } from "@/components/dashboard";
import { Card } from "@/components/ui";
import { demoUser } from "@/lib/seed/data";

export default function DashboardPage() {
  return (
    <div className="flex">
      <AppSidebar />
      <div className="w-full">
        <PageHeader eyebrow="Dashboard" title={`Hola, ${demoUser.fullName}`} description="Tu progreso siempre visible. Continúa aprendiendo, gana XP y construye proyectos reales." />
        <section className="mx-auto max-w-7xl space-y-8 px-4 pb-20 sm:px-6 lg:px-8">
          <DashboardStats user={demoUser} />
          <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
            <ContinueLearningCard />
            <StreakCard streak={demoUser.streak} />
          </div>
          <Card><SectionHeader title="Progreso al siguiente nivel" /><LevelProgress xp={demoUser.xp} /></Card>
          <div><SectionHeader title="Cursos en progreso" /><ActiveCourses /></div>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card><SectionHeader title="Logros recientes" /><AchievementGrid /></Card>
            <Card><SectionHeader title="Actividad reciente" /><ActivityFeed /></Card>
          </div>
          <Card><SectionHeader title="Retos recomendados" /><RecommendedLessons /></Card>
        </section>
      </div>
    </div>
  );
}
