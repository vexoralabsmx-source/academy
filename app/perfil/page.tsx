import { AppSidebar, PageHeader, SectionHeader } from "@/components/layout";
import { ProfileSettingsForm } from "@/components/account/ProfileSettingsForm";
import { AchievementGrid, ActivityFeed, LevelProgress } from "@/components/dashboard";
import { Avatar, Badge, Card } from "@/components/ui";
import { getDashboardData } from "@/lib/dashboard/queries";
import { getCurrentProfile, requireAuth } from "@/lib/auth/session";

export default async function ProfilePage() {
  await requireAuth();
  const profile = await getCurrentProfile();
  if (!profile) return null;
  const dashboard = await getDashboardData(profile);

  return (
    <div className="flex">
      <AppSidebar />
      <div className="w-full">
        <PageHeader eyebrow="Perfil" title={profile.full_name ?? profile.username ?? "Builder"} description={profile.bio ?? "Completa tu perfil para mostrar mejor tu avance."} />
        <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-20 sm:px-6 lg:grid-cols-[360px_1fr] lg:px-8">
          <Card>
            <Avatar name={profile.full_name ?? profile.username ?? "Builder"} className="h-20 w-20 text-xl" />
            <h2 className="mt-5 text-2xl font-bold">@{profile.username ?? "usuario"}</h2>
            <div className="mt-4 flex gap-2"><Badge>Nivel {profile.level}</Badge><Badge>{profile.xp} XP</Badge><Badge>{profile.streak} días</Badge></div>
            <div className="mt-5"><LevelProgress xp={profile.xp} /></div>
          </Card>
          <div className="space-y-6">
            <Card>
              <SectionHeader title="Editar perfil" />
              <ProfileSettingsForm profile={profile} />
            </Card>
            <Card><SectionHeader title="Logros" /><AchievementGrid achievements={dashboard.achievements} /></Card>
            <Card><SectionHeader title="Actividad" /><ActivityFeed items={dashboard.activity} /></Card>
          </div>
        </section>
      </div>
    </div>
  );
}
