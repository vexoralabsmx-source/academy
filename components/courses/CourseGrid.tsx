import type { Course } from "@/types/course";
import { CourseCard } from "./CourseCard";

export function CourseGrid({ courses }: { courses: Course[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course, index) => (
        <CourseCard key={course.slug} course={course} progress={index % 4 === 0 ? 35 : 0} />
      ))}
    </div>
  );
}
