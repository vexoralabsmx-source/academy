"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/session";
import { courses } from "@/lib/seed/data";

export async function redeemCourseAccessKey(input: { courseSlug: string; code: string }) {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false as const, message: "Debes iniciar sesion para desbloquear un curso premium." };
  }

  const cleanCode = input.code.trim().toUpperCase();
  if (!cleanCode) {
    return { ok: false as const, message: "Ingresa una llave valida." };
  }

  const { data: keyRow, error: keyError } = await supabase
    .from("course_access_keys")
    .select("id,course_slug,is_active,max_redemptions,redemption_count,expires_at")
    .eq("code", cleanCode)
    .eq("course_slug", input.courseSlug)
    .maybeSingle();

  if (keyError) {
    return { ok: false as const, message: "Falta aplicar la migracion SQL del sistema premium en Supabase." };
  }

  if (!keyRow || !keyRow.is_active) {
    return { ok: false as const, message: "La llave no existe o ya no esta activa." };
  }

  if (keyRow.expires_at && new Date(keyRow.expires_at) < new Date()) {
    return { ok: false as const, message: "La llave ya expiro." };
  }

  if ((keyRow.redemption_count ?? 0) >= (keyRow.max_redemptions ?? 1)) {
    return { ok: false as const, message: "La llave ya alcanzo su limite de usos." };
  }

  const { error: accessError } = await supabase.from("user_course_access").upsert(
    {
      user_id: user.id,
      course_slug: input.courseSlug,
      access_key_id: keyRow.id,
      granted_at: new Date().toISOString()
    },
    { onConflict: "user_id,course_slug" }
  );

  if (accessError) {
    return { ok: false as const, message: accessError.message };
  }

  await supabase
    .from("course_access_keys")
    .update({ redemption_count: (keyRow.redemption_count ?? 0) + 1 })
    .eq("id", keyRow.id);

  revalidatePath(`/cursos/${input.courseSlug}`);
  revalidatePath(`/aprender/${input.courseSlug}`);

  return { ok: true as const, message: "Curso desbloqueado. Ya puedes entrar." };
}

export async function generateCourseAccessKey(courseSlug: string) {
  await requireAdmin();
  const supabase = createClient();
  const course = courses.find((item) => item.slug === courseSlug);

  if (!course) {
    return { ok: false as const, message: "Curso no encontrado." };
  }

  const code = buildAccessCode(course.slug);
  const { error } = await supabase.from("course_access_keys").insert({
    course_slug: course.slug,
    code,
    is_active: true,
    max_redemptions: 1,
    redemption_count: 0
  });

  if (error) {
    return { ok: false as const, message: "No se pudo generar la llave. Verifica la migracion premium en Supabase." };
  }

  revalidatePath("/admin/cursos");
  return { ok: true as const, code, message: `Llave generada para ${course.title}.` };
}

function buildAccessCode(courseSlug: string) {
  const prefix = courseSlug.replace(/[^a-z0-9]/g, "").slice(0, 6).toUpperCase();
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `VXA-${prefix}-${random}`;
}
