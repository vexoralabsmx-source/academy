import { PageHeader } from "@/components/layout";
import { Avatar, Badge, Card } from "@/components/ui";
import { getCurrentProfile } from "@/lib/auth/session";
import { getRankingProfiles, getUserRank } from "@/lib/ranking/queries";

export default async function RankingPage() {
  const profile = await getCurrentProfile();
  const leaderboard = await getRankingProfiles();
  const currentRank = getUserRank(leaderboard, profile);

  return (
    <>
      <PageHeader eyebrow="Ranking" title="Top builders por XP" description="Compara progreso semanal, mensual y total por ruta." />
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-wrap gap-2"><Badge>Total</Badge><Badge>Semanal</Badge><Badge>Mensual</Badge><Badge>Filtrar por ruta</Badge>{currentRank ? <Badge>Tu posicion: #{currentRank}</Badge> : null}</div>
        <Card className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="text-slate-400"><tr>{["#", "Usuario", "Nivel", "XP", "Racha"].map((h) => <th key={h} className="px-4 py-3">{h}</th>)}</tr></thead>
            <tbody>
              {leaderboard.map((user, index) => (
                <tr key={user.id} className="border-t border-white/10">
                  <td className="px-4 py-4 text-cyan">{index + 1}</td>
                  <td className="px-4 py-4"><div className="flex items-center gap-3"><Avatar name={user.fullName} />{user.username}</div></td>
                  <td className="px-4 py-4">{user.level}</td>
                  <td className="px-4 py-4">{user.xp}</td>
                  <td className="px-4 py-4">{user.streak} días</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </section>
    </>
  );
}
