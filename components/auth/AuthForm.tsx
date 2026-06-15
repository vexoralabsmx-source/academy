"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";
import { Button, Card, Input, Toast } from "@/components/ui";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const supabase = createClient();
      const result =
        mode === "login"
          ? await supabase.auth.signInWithPassword({ email, password })
          : await supabase.auth.signUp({ email, password });

      setLoading(false);
      if (result.error) {
        setMessage(result.error.message);
        return;
      }

      router.push(searchParams.get("next") ?? "/dashboard");
      router.refresh();
    } catch {
      setLoading(false);
      setMessage(
        "No se pudo inicializar la autenticacion. Reinicia el servidor y verifica NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY."
      );
    }
  }

  return (
    <Card className="mx-auto w-full max-w-md">
      <h1 className="text-3xl font-bold">{mode === "login" ? "Inicio de sesión" : "Crear cuenta"}</h1>
      <p className="mt-2 text-sm text-slate-400">{mode === "login" ? "Vuelve a tu dashboard de aprendizaje." : "Empieza gratis y crea tu perfil educativo."}</p>
      <form onSubmit={submit} className="mt-6 grid gap-3">
        <Input type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        <Input type="password" placeholder="Contraseña" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={6} />
        <Button disabled={loading}>{loading ? "Procesando..." : mode === "login" ? "Entrar" : "Crear cuenta gratis"}</Button>
      </form>
      {message ? <div className="mt-4"><Toast message={message} /></div> : null}
    </Card>
  );
}
