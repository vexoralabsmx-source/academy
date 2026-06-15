"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function updateCurrentProfile(input: {
  username: string;
  bio: string;
  avatarUrl: string;
  websiteUrl: string;
  githubUrl: string;
  linkedinUrl: string;
}) {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false as const, message: "Debes iniciar sesion para actualizar tu perfil." };
  }

  const payload = {
    username: input.username.trim() || null,
    bio: input.bio.trim() || null,
    avatar_url: input.avatarUrl.trim() || null,
    website_url: input.websiteUrl.trim() || null,
    github_url: input.githubUrl.trim() || null,
    linkedin_url: input.linkedinUrl.trim() || null
  };

  const { error } = await supabase.from("profiles").update(payload).eq("id", user.id);
  if (error) {
    return { ok: false as const, message: error.message };
  }

  revalidatePath("/perfil");
  revalidatePath("/settings");
  revalidatePath("/dashboard");

  return { ok: true as const, message: "Perfil actualizado." };
}
