"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/session";
import { syncSeedCatalog } from "@/lib/learning/sync";

export async function syncCatalogAction() {
  await requireAdmin();

  const result = await syncSeedCatalog();
  if (!result.ok) {
    return { ok: false as const, message: result.message };
  }

  revalidatePath("/admin/cursos");
  revalidatePath("/cursos");
  revalidatePath("/dashboard");
  revalidatePath("/aprender");

  return {
    ok: true as const,
    message: `Catalogo sincronizado: ${result.courses} cursos, ${result.lessons} lecciones y ${result.exercises} ejercicios.`
  };
}
