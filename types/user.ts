export type Role = "student" | "admin";

export type Profile = {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  website_url: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  xp: number;
  level: number;
  streak: number;
  role: Role;
  last_activity_date: string | null;
  created_at: string;
  updated_at: string;
};
