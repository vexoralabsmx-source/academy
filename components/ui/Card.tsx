import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export function Card({ className, children, ...props }: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div className={cn("glass rounded-xl p-6 transition duration-200 hover:border-cyan/25 hover:bg-white/[0.065]", className)} {...props}>
      {children}
    </div>
  );
}
