import type { AdminUserRow } from "@/lib/admin/queries";
import { AdminTable } from "./AdminTable";

export function UserTable({ users }: { users: AdminUserRow[] }) {
  return (
    <AdminTable
      headers={["Usuario", "Nivel", "XP", "Racha", "Rol"]}
      rows={users.map((user) => [user.username, user.level, user.xp, `${user.streak} días`, user.role])}
    />
  );
}
