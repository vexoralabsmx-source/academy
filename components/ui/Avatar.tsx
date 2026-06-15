import { cn } from "@/lib/utils/cn";

export function Avatar({ name, className }: { name: string; className?: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className={cn("flex h-11 w-11 items-center justify-center rounded-full border border-cyan/30 bg-cyan/10 text-sm font-bold text-cyan", className)}>
      {initials}
    </div>
  );
}
