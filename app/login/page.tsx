import { Suspense } from "react";
import Link from "next/link";
import { AuthForm } from "@/components/auth/AuthForm";

export default function LoginPage() {
  return (
    <section className="grid min-h-[calc(100vh-9rem)] place-items-center px-4 py-16">
      <div className="w-full">
        <Suspense fallback={null}>
          <AuthForm mode="login" />
        </Suspense>
        <p className="mt-5 text-center text-sm text-slate-400">¿No tienes cuenta? <Link className="text-cyan" href="/register">Crear cuenta</Link></p>
      </div>
    </section>
  );
}
