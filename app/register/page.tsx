import { Suspense } from "react";
import Link from "next/link";
import { AuthForm } from "@/components/auth/AuthForm";

export default function RegisterPage() {
  return (
    <section className="grid min-h-[calc(100vh-9rem)] place-items-center px-4 py-16">
      <div className="w-full">
        <Suspense fallback={null}>
          <AuthForm mode="register" />
        </Suspense>
        <p className="mt-5 text-center text-sm text-slate-400">¿Ya tienes cuenta? <Link className="text-cyan" href="/login">Inicia sesión</Link></p>
      </div>
    </section>
  );
}
