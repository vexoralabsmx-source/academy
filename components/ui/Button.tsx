import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type Props = {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  href?: string;
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>;

export function Button({ variant = "primary", size = "md", href, children, className, ...props }: Props) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-lg border font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-violet/30 disabled:cursor-not-allowed disabled:opacity-60",
    variant === "primary" && "border-violet/35 bg-violet/90 text-white shadow-[0_0_32px_rgba(139,92,246,0.18)] hover:border-violet/50 hover:bg-violet/80",
    variant === "secondary" && "border-white/10 bg-white/[0.05] text-white hover:border-violet/30 hover:bg-white/[0.08]",
    variant === "ghost" && "border-transparent bg-transparent text-slate-300 hover:bg-white/8 hover:text-white",
    variant === "danger" && "border-danger/40 bg-danger/15 text-red-100 hover:bg-danger/25",
    size === "sm" && "h-9 px-3 text-sm",
    size === "md" && "h-11 px-5 text-sm",
    size === "lg" && "h-12 px-6 text-base",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
