import { createClient } from "@/lib/supabase/server";
import { courses as seedCourses, findCourse } from "@/lib/seed/data";
import type { Profile } from "@/types/user";

export type ActiveCourseItem = {
  title: string;
  slug: string;
  area: string;
  difficulty: string;
  progressPercent: number;
  lessonsCount: number;
  exercisesCount: number;
  xpTotal: number;
};

export type RecommendedLessonItem = {
  title: string;
  href: string;
};

export type AchievementItem = {
  title: string;
  description: string;
};

export type ContinueLesson = {
  title: string;
  description: string;
  href: string;
  progress: number;
};

export type DashboardData = {
  profile: Profile;
  solvedExercises: number;
  completedLessons: number;
  activeCourses: ActiveCourseItem[];
  achievements: AchievementItem[];
  activity: string[];
  recommendedLessons: RecommendedLessonItem[];
  continueLesson: ContinueLesson | null;
};

type EnrollmentRow = {
  progress_percent: number | null;
  status: string | null;
  courses: {
    title: string | null;
    slug: string | null;
    area: string | null;
    difficulty: string | null;
    xp_total: number | null;
  } | null;
};

export async function getDashboardData(profile: Profile): Promise<DashboardData> {
  const supabase = createClient();

  const [enrollmentsRes, completedLessonsRes, solvedExercisesRes, achievementsRes, progressFeedRes, submissionsFeedRes] = await Promise.all([
    supabase
      .from("course_enrollments")
      .select("progress_percent,status,courses:course_id(title,slug,area,difficulty,xp_total)")
      .eq("user_id", profile.id)
      .order("started_at", { ascending: false }),
    supabase.from("progress").select("id", { count: "exact", head: true }).eq("user_id", profile.id).eq("completed", true),
    supabase.from("submissions").select("id", { count: "exact", head: true }).eq("user_id", profile.id).eq("is_correct", true),
    supabase
      .from("user_achievements")
      .select("unlocked_at,achievements:achievement_id(title,description)")
      .eq("user_id", profile.id)
      .order("unlocked_at", { ascending: false })
      .limit(6),
    supabase
      .from("progress")
      .select("completed_at,lessons:lesson_id(title),courses:course_id(title)")
      .eq("user_id", profile.id)
      .eq("completed", true)
      .order("completed_at", { ascending: false })
      .limit(4),
    supabase
      .from("submissions")
      .select("created_at,is_correct,xp_awarded,exercises:exercise_id(title),courses:course_id(title)")
      .eq("user_id", profile.id)
      .order("created_at", { ascending: false })
      .limit(4)
  ]);

  const enrollmentRows = (enrollmentsRes.data ?? []) as unknown as EnrollmentRow[];
  const activeCourses = enrollmentRows.map((row) => {
    const slug = row.courses?.slug ?? "";
    const seeded = slug ? findCourse(slug) : undefined;

    return {
      title: row.courses?.title ?? seeded?.title ?? "Curso",
      slug,
      area: row.courses?.area ?? seeded?.area ?? "General",
      difficulty: row.courses?.difficulty ?? seeded?.difficulty ?? "Principiante",
      progressPercent: row.progress_percent ?? 0,
      lessonsCount: seeded?.lessonsCount ?? 0,
      exercisesCount: seeded?.exercisesCount ?? 0,
      xpTotal: row.courses?.xp_total ?? seeded?.xpTotal ?? 0
    };
  });

  const continueLesson = buildContinueLesson(activeCourses);
  const recommendedLessons = buildRecommendedLessons(activeCourses);

  const achievements = (achievementsRes.data ?? [])
    .map((row) => {
      const achievement = Array.isArray((row as { achievements?: unknown }).achievements)
        ? (row as { achievements: { title?: string; description?: string }[] }).achievements[0]
        : (row as { achievements?: { title?: string; description?: string } }).achievements;

      if (!achievement?.title) return null;
      return {
        title: achievement.title,
        description: achievement.description ?? "Nuevo logro desbloqueado."
      };
    })
    .filter(Boolean) as AchievementItem[];

  const progressItems = (progressFeedRes.data ?? []).map((row) => {
    const lessonTitle = extractJoinedValue(row, "lessons", "title");
    return {
      timestamp: String((row as { completed_at?: string | null }).completed_at ?? ""),
      text: lessonTitle ? `Completaste ${lessonTitle}` : "Completaste una leccion"
    };
  });

  const submissionItems = (submissionsFeedRes.data ?? []).map((row) => {
    const xpAwarded = Number((row as { xp_awarded?: number | null }).xp_awarded ?? 0);
    const courseTitle = extractJoinedValue(row, "courses", "title");
    const exerciseTitle = extractJoinedValue(row, "exercises", "title");
    return {
      timestamp: String((row as { created_at?: string | null }).created_at ?? ""),
      text:
        xpAwarded > 0
          ? `Ganaste ${xpAwarded} XP en ${courseTitle ?? exerciseTitle ?? "un ejercicio"}`
          : `Enviaste ${exerciseTitle ?? "un ejercicio"}`
    };
  });

  const activity = progressItems
    .concat(submissionItems)
    .sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))
    .map((item) => item.text)
    .slice(0, 6);

  return {
    profile,
    solvedExercises: solvedExercisesRes.count ?? 0,
    completedLessons: completedLessonsRes.count ?? 0,
    activeCourses,
    achievements,
    activity,
    recommendedLessons,
    continueLesson
  };
}

function buildContinueLesson(activeCourses: ActiveCourseItem[]): ContinueLesson | null {
  const course = activeCourses.find((item) => item.slug) ?? null;
  if (!course) return null;

  const seeded = findCourse(course.slug);
  if (!seeded) {
    return {
      title: course.title,
      description: "Continua tu progreso real en este curso.",
      href: `/cursos/${course.slug}`,
      progress: course.progressPercent
    };
  }

  const flatLessons = seeded.modules.flatMap((module) => module.lessons);
  const lessonIndex = Math.min(flatLessons.length - 1, Math.floor((course.progressPercent / 100) * flatLessons.length));
  const lesson = flatLessons[Math.max(0, lessonIndex)];

  return {
    title: `${seeded.title}: ${lesson.title}`,
    description: "Siguiente leccion recomendada segun tu progreso actual.",
    href: `/aprender/${seeded.slug}/${lesson.slug}`,
    progress: course.progressPercent
  };
}

function buildRecommendedLessons(activeCourses: ActiveCourseItem[]): RecommendedLessonItem[] {
  const seededMatches = activeCourses
    .map((item) => (item.slug ? findCourse(item.slug) : undefined))
    .filter(Boolean)
    .slice(0, 3);

  if (seededMatches.length > 0) {
    return seededMatches.map((course) => {
      const lesson = course!.modules[0]?.lessons[0];
      return {
        title: lesson?.title ?? course!.title,
        href: lesson ? `/aprender/${course!.slug}/${lesson.slug}` : `/cursos/${course!.slug}`
      };
    });
  }

  return seedCourses.slice(0, 3).map((course) => ({
    title: course.modules[0]?.lessons[0]?.title ?? course.title,
    href: course.modules[0]?.lessons[0] ? `/aprender/${course.slug}/${course.modules[0].lessons[0].slug}` : `/cursos/${course.slug}`
  }));
}

function extractJoinedValue(row: unknown, key: string, field: string) {
  const joined = (row as Record<string, unknown>)[key];
  if (!joined) return null;
  if (Array.isArray(joined)) {
    const first = joined[0] as Record<string, string> | undefined;
    return first?.[field] ?? null;
  }
  return (joined as Record<string, string>)[field] ?? null;
}
