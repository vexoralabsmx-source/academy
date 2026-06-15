import { createClient } from "@/lib/supabase/server";

export type AdminOverviewData = {
  totalUsers: number;
  totalCourses: number;
  totalLessons: number;
  totalExercises: number;
  totalXpAwarded: number;
  recentActivity: string[];
};

export type AdminUserRow = {
  id: string;
  username: string;
  level: number;
  xp: number;
  streak: number;
  role: string;
};

export type AdminCourseRow = {
  title: string;
  area: string;
  difficulty: string;
  state: string;
};

export type AdminLessonRow = {
  title: string;
  courseTitle: string;
  moduleTitle: string;
  estimatedMinutes: number;
};

export type AdminExerciseRow = {
  title: string;
  courseTitle: string;
  type: string;
  xpReward: number;
};

export type AnalyticsGroup = {
  title: string;
  items: { label: string; value: number }[];
};

export async function getAdminOverviewData(): Promise<AdminOverviewData> {
  const supabase = createClient();

  const [usersRes, coursesRes, lessonsRes, exercisesRes, xpRes, progressRes, submissionsRes] = await Promise.all([
    supabase.from("profiles").select("id", { count: "exact", head: true }),
    supabase.from("courses").select("id", { count: "exact", head: true }),
    supabase.from("lessons").select("id", { count: "exact", head: true }),
    supabase.from("exercises").select("id", { count: "exact", head: true }),
    supabase.from("submissions").select("xp_awarded"),
    supabase.from("progress").select("completed_at,lessons:lesson_id(title)").eq("completed", true).order("completed_at", { ascending: false }).limit(4),
    supabase.from("submissions").select("created_at,xp_awarded,exercises:exercise_id(title)").order("created_at", { ascending: false }).limit(4)
  ]);

  const totalXpAwarded = (xpRes.data ?? []).reduce((sum, row) => sum + Number((row as { xp_awarded?: number | null }).xp_awarded ?? 0), 0);

  const progressItems = (progressRes.data ?? []).map((row) => {
    const lessonTitle = extractJoinedValue(row, "lessons", "title");
    return {
      timestamp: String((row as { completed_at?: string | null }).completed_at ?? ""),
      text: lessonTitle ? `Leccion completada: ${lessonTitle}` : "Leccion completada"
    };
  });

  const submissionItems = (submissionsRes.data ?? []).map((row) => {
    const xp = Number((row as { xp_awarded?: number | null }).xp_awarded ?? 0);
    const exerciseTitle = extractJoinedValue(row, "exercises", "title");
    return {
      timestamp: String((row as { created_at?: string | null }).created_at ?? ""),
      text: xp > 0 ? `Submission correcto en ${exerciseTitle ?? "ejercicio"} (+${xp} XP)` : `Submission enviado: ${exerciseTitle ?? "ejercicio"}`
    };
  });

  return {
    totalUsers: usersRes.count ?? 0,
    totalCourses: coursesRes.count ?? 0,
    totalLessons: lessonsRes.count ?? 0,
    totalExercises: exercisesRes.count ?? 0,
    totalXpAwarded,
    recentActivity: progressItems.concat(submissionItems).sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1)).map((item) => item.text).slice(0, 6)
  };
}

export async function getAdminUsers(): Promise<AdminUserRow[]> {
  const supabase = createClient();
  const { data } = await supabase.from("profiles").select("id,username,level,xp,streak,role").order("xp", { ascending: false });
  return (data ?? []).map((row) => ({
    id: row.id,
    username: row.username ?? "sin-username",
    level: row.level,
    xp: row.xp,
    streak: row.streak,
    role: row.role
  }));
}

export async function getAdminCourses(): Promise<AdminCourseRow[]> {
  const supabase = createClient();
  const { data } = await supabase.from("courses").select("title,area,difficulty,is_published").order("created_at", { ascending: false });
  return (data ?? []).map((row) => ({
    title: row.title,
    area: row.area ?? "General",
    difficulty: row.difficulty ?? "Principiante",
    state: row.is_published ? "Publicado" : "Borrador"
  }));
}

export async function getAdminLessons(): Promise<AdminLessonRow[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("lessons")
    .select("title,estimated_minutes,courses:course_id(title),modules:module_id(title)")
    .order("created_at", { ascending: false })
    .limit(50);

  return (data ?? []).map((row) => ({
    title: (row as { title: string }).title,
    courseTitle: extractJoinedValue(row, "courses", "title") ?? "Curso",
    moduleTitle: extractJoinedValue(row, "modules", "title") ?? "Modulo",
    estimatedMinutes: Number((row as { estimated_minutes?: number | null }).estimated_minutes ?? 0)
  }));
}

export async function getAdminExercises(): Promise<AdminExerciseRow[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("exercises")
    .select("title,type,xp_reward,courses:course_id(title)")
    .order("created_at", { ascending: false })
    .limit(50);

  return (data ?? []).map((row) => ({
    title: (row as { title: string }).title,
    courseTitle: extractJoinedValue(row, "courses", "title") ?? "Curso",
    type: (row as { type: string }).type,
    xpReward: Number((row as { xp_reward?: number | null }).xp_reward ?? 0)
  }));
}

export async function getAdminAnalytics(): Promise<AnalyticsGroup[]> {
  const supabase = createClient();

  const [courseEnrollmentsRes, failedExercisesRes, activeUsersRes] = await Promise.all([
    supabase.from("course_enrollments").select("course_id,courses:course_id(title)"),
    supabase.from("submissions").select("is_correct,exercise_id,exercises:exercise_id(title)").eq("is_correct", false),
    supabase.from("profiles").select("username,xp").order("xp", { ascending: false }).limit(3)
  ]);

  const byCourse = aggregateByJoinedTitle(courseEnrollmentsRes.data ?? [], "courses", "title");
  const byFailedExercise = aggregateByJoinedTitle(failedExercisesRes.data ?? [], "exercises", "title");
  const topXpUsers = (activeUsersRes.data ?? []).map((row) => ({
    label: row.username ?? "sin-username",
    value: Number(row.xp ?? 0)
  }));

  return [
    { title: "Cursos mas vistos", items: byCourse.slice(0, 3) },
    { title: "Ejercicios mas fallados", items: byFailedExercise.slice(0, 3) },
    { title: "Usuarios activos", items: topXpUsers.slice(0, 3) }
  ];
}

function aggregateByJoinedTitle(rows: unknown[], joinKey: string, field: string) {
  const counter = new Map<string, number>();

  for (const row of rows) {
    const label = extractJoinedValue(row, joinKey, field) ?? "Sin dato";
    counter.set(label, (counter.get(label) ?? 0) + 1);
  }

  const max = Math.max(...counter.values(), 1);

  return Array.from(counter.entries())
    .map(([label, count]) => ({ label, value: Math.round((count / max) * 100) }))
    .sort((a, b) => b.value - a.value);
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
