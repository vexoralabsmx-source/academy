import { AppSidebar, PageHeader, SectionHeader } from "@/components/layout";
import { AchievementGrid, ActivityFeed, LevelProgress } from "@/components/dashboard";
import { Avatar, Badge, Card, Input, Textarea } from "@/components/ui";
import { demoUser } from "@/lib/seed/data";

export default function ProfilePage() {
  return (
    <div className="flex">
      <AppSidebar />
      <div className="w-full">
        <PageHeader eyebrow="Perfil" title={demoUser.fullName} description={demoUser.bio} />
        <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-20 sm:px-6 lg:grid-cols-[360px_1fr] lg:px-8">
          <Card>
            <Avatar name={demoUser.fullName} className="h-20 w-20 text-xl" />
            <h2 className="mt-5 text-2xl font-bold">@{demoUser.username}</h2>
            <div className="mt-4 flex gap-2"><Badge>Nivel {demoUser.level}</Badge><Badge>{demoUser.xp} XP</Badge><Badge>{demoUser.streak} días</Badge></div>
            <div className="mt-5"><LevelProgress xp={demoUser.xp} /></div>
          </Card>
          <div className="space-y-6">
            <Card>
              <SectionHeader title="Editar perfil" />
              <div className="grid gap-3">
                <Input defaultValue={demoUser.username} placeholder="Username" />
                <Textarea defaultValue={demoUser.bio} placeholder="Bio" />
                <Input placeholder="GitHub" />
                <Input placeholder="Portfolio" />
                <Input placeholder="LinkedIn" />
              </div>
            </Card>
            <Card><SectionHeader title="Logros" /><AchievementGrid /></Card>
            <Card><SectionHeader title="Actividad" /><ActivityFeed /></Card>
          </div>
        </section>
      </div>
    </div>
  );
}
