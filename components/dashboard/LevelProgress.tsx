import { ProgressBar } from "@/components/ui";

export function LevelProgress({ xp }: { xp: number }) {
  const progress = xp % 100;
  return <ProgressBar value={progress} label={`${progress}/100 XP al siguiente nivel`} />;
}
