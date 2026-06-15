import { notFound } from "next/navigation";
import { Badge, Button, Card } from "@/components/ui";
import { LessonList, ModuleAccordion } from "@/components/courses";
import { PageHeader } from "@/components/layout";
import { findCourse } from "@/lib/seed/data";

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = findCourse(params.slug);
  if (!course) notFound();
  const firstLesson = course.modules[0]?.lessons[0];

  return (
    <>
      <PageHeader eyebrow={course.area} title={course.title} description={course.longDescription} />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-20 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        <div className="space-y-8">
          <Card>
            <div className="flex flex-wrap gap-2"><Badge>{course.difficulty}</Badge><Badge>{course.estimatedHours} horas</Badge><Badge>{course.xpTotal} XP</Badge></div>
            <h2 className="mt-5 text-2xl font-bold">Objetivos</h2>
            <ul className="mt-4 grid gap-2 text-sm text-slate-300">{course.objectives.map((item) => <li key={item}>- {item}</li>)}</ul>
          </Card>
          <Card>
            <h2 className="text-2xl font-bold">Lecciones</h2>
            <div className="mt-5"><LessonList course={course} /></div>
          </Card>
        </div>
        <div className="space-y-5">
          <Card>
            <p className="text-sm text-slate-400">Proyecto final</p>
            <h3 className="mt-2 text-xl font-bold">{course.finalProject}</h3>
            <Button href={firstLesson ? `/aprender/${course.slug}/${firstLesson.slug}` : "/cursos"} className="mt-5">Empezar curso</Button>
          </Card>
          <ModuleAccordion course={course} />
        </div>
      </section>
    </>
  );
}
