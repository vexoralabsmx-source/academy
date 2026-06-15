import { notFound } from "next/navigation";
import { getCurrentProfile } from "@/lib/auth/session";
import { getCourseAccessStatus } from "@/lib/access/queries";
import { CourseAccessKeyForm } from "@/components/courses/CourseAccessKeyForm";
import { Badge, Button, Card } from "@/components/ui";
import { LessonList, ModuleAccordion } from "@/components/courses";
import { PageHeader } from "@/components/layout";
import { findCourse } from "@/lib/seed/data";
import { ensureSeedCourseSynced } from "@/lib/learning/sync";

export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = findCourse(params.slug);
  if (!course) notFound();
  await ensureSeedCourseSynced(params.slug);
  const profile = await getCurrentProfile();
  const access = await getCourseAccessStatus(course, profile);
  const firstLesson = course.modules[0]?.lessons[0];

  return (
    <>
      <PageHeader eyebrow={course.area} title={course.title} description={course.longDescription} />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-20 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        <div className="space-y-8">
          <Card>
            <div className="flex flex-wrap gap-2"><Badge>{course.difficulty}</Badge><Badge>{course.estimatedHours} horas</Badge><Badge>{course.xpTotal} XP</Badge><Badge className={course.accessTier === "premium" ? "border-violet/25 bg-violet/10 text-violet-200" : "border-emerald-500/25 bg-emerald-500/10 text-emerald-300"}>{course.accessTier === "premium" ? "Premium" : "Gratis"}</Badge></div>
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
            {course.accessTier === "free" || access.unlocked ? (
              <Button href={firstLesson ? `/aprender/${course.slug}/${firstLesson.slug}` : "/cursos"} className="mt-5">Empezar curso</Button>
            ) : (
              <>
                <p className="mt-4 text-sm text-slate-400">Este curso requiere una llave premium. Comprala por tu canal manual y desbloquealo aqui.</p>
                <CourseAccessKeyForm courseSlug={course.slug} />
                {!access.migrationReady ? <p className="mt-3 text-xs text-amber-300">Aplica primero la migracion SQL del sistema premium en Supabase.</p> : null}
              </>
            )}
          </Card>
          <ModuleAccordion course={course} />
        </div>
      </section>
    </>
  );
}
