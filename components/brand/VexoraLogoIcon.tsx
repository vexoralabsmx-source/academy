import Image from "next/image";
import { cn } from "@/lib/utils/cn";

const containerSizes = {
  sm: "h-10 w-10 rounded-[12px]",
  md: "h-12 w-12 rounded-[14px]",
  lg: "h-16 w-16 rounded-[16px]"
} as const;

const imageSizes = {
  sm: 20,
  md: 28,
  lg: 36
} as const;

export function VexoraLogoIcon({
  size = "md",
  className,
  withContainer = true
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
  withContainer?: boolean;
}) {
  const img = (
    <Image
      src="/vexora-logo.png"
      alt="Vexora Labs"
      width={imageSizes[size]}
      height={imageSizes[size]}
      className={cn("object-contain", size === "lg" ? "h-9 w-9" : size === "md" ? "h-7 w-7" : "h-5 w-5", className)}
      priority={size === "lg"}
    />
  );

  if (!withContainer) return img;

  return (
    <div
      className={cn(
        "flex items-center justify-center border border-white/10 bg-white/[0.045] shadow-[0_0_24px_rgba(139,92,246,0.12)] backdrop-blur-md transition duration-200 hover:border-violet/35 hover:shadow-[0_0_28px_rgba(139,92,246,0.18)]",
        containerSizes[size],
        className
      )}
    >
      {img}
    </div>
  );
}
