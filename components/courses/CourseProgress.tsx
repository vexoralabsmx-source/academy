import { ProgressBar } from "@/components/ui";

export function CourseProgress({ value }: { value: number }) {
  return <ProgressBar value={value} label="Progreso del curso" />;
}
