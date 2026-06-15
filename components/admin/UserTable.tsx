import { leaderboard } from "@/lib/seed/data";
import { AdminTable } from "./AdminTable";

export function UserTable() {
  return (
    <AdminTable
      headers={["Usuario", "Nivel", "XP", "Racha", "Rol"]}
      rows={leaderboard.map((user) => [user.username, user.level, user.xp, `${user.streak} días`, user.role])}
    />
  );
}
