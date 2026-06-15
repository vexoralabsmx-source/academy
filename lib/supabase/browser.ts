"use client";

import { createBrowserClient } from "@supabase/ssr";

export function getSupabaseBrowserEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return { url, anonKey };
}

export function createClient() {
  const { url, anonKey } = getSupabaseBrowserEnv();

  if (!url || !anonKey) {
    const missing = [
      !url ? "NEXT_PUBLIC_SUPABASE_URL" : null,
      !anonKey ? "NEXT_PUBLIC_SUPABASE_ANON_KEY" : null
    ].filter(Boolean).join(", ");

    throw new Error(`Faltan variables publicas de Supabase: ${missing}. Reinicia el servidor despues de actualizar .env.local.`);
  }

  return createBrowserClient(url, anonKey);
}
