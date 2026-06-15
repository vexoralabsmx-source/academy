import type { ReactNode } from "react";
import { Card } from "./Card";

export function Modal({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4">
      <Card className="w-full max-w-lg">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="mt-4">{children}</div>
      </Card>
    </div>
  );
}
