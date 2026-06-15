import { courses } from "@/lib/seed/data";
import { CourseCard } from "@/components/courses";

export function ActiveCourses() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {courses.slice(0, 3).map((course, index) => <CourseCard key={course.slug} course={course} progress={[72, 42, 18][index]} />)}
    </div>
  );
}
