import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/types/user";

export async function getRankingProfiles() {
  const supabase = createClient();
  const { data } = await supabase
    .from("profiles")
    .select("id,username,full_name,level,xp,streak,role")
    .order("xp", { ascending: false })
    .limit(100);

  return (data ?? []).map((row) => ({
    id: row.id,
    username: row.username ?? "sin-username",
    fullName: row.full_name ?? row.username ?? "Builder",
    level: row.level,
    xp: row.xp,
    streak: row.streak,
    role: row.role
  }));
}

export function getUserRank(list: { id: string }[], currentProfile: Profile | null) {
  if (!currentProfile) return null;
  const index = list.findIndex((item) => item.id === currentProfile.id);
  return index >= 0 ? index + 1 : null;
}
