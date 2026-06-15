import { createClient } from "@/lib/supabase/server";
import type { Course } from "@/types/course";
import type { Profile } from "@/types/user";

export async function getCourseAccessStatus(course: Course, profile: Profile | null) {
  if (course.accessTier === "free") {
    return { canAccess: true, unlocked: true, migrationReady: true };
  }

  if (!profile) {
    return { canAccess: false, unlocked: false, migrationReady: true };
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_course_access")
    .select("id")
    .eq("user_id", profile.id)
    .eq("course_slug", course.slug)
    .maybeSingle();

  if (error) {
    return { canAccess: true, unlocked: false, migrationReady: false };
  }

  return { canAccess: Boolean(data), unlocked: Boolean(data), migrationReady: true };
}
