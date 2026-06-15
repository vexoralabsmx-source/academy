alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.modules enable row level security;
alter table public.lessons enable row level security;
alter table public.exercises enable row level security;
alter table public.submissions enable row level security;
alter table public.progress enable row level security;
alter table public.course_enrollments enable row level security;
alter table public.learning_paths enable row level security;
alter table public.learning_path_courses enable row level security;
alter table public.achievements enable row level security;
alter table public.user_achievements enable row level security;
alter table public.certificates enable row level security;
alter table public.weekly_challenges enable row level security;
alter table public.challenge_submissions enable row level security;
alter table public.notes enable row level security;

create or replace function public.is_admin(user_id uuid default auth.uid())
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select exists(select 1 from public.profiles where id = user_id and role = 'admin');
$$;

drop policy if exists "published courses are readable" on public.courses;
create policy "published courses are readable" on public.courses for select using (is_published = true or public.is_admin());

drop policy if exists "published modules are readable" on public.modules;
create policy "published modules are readable" on public.modules for select using (
  exists(select 1 from public.courses where courses.id = modules.course_id and courses.is_published = true) or public.is_admin()
);

drop policy if exists "published lessons are readable" on public.lessons;
create policy "published lessons are readable" on public.lessons for select using (
  is_published = true and exists(select 1 from public.courses where courses.id = lessons.course_id and courses.is_published = true) or public.is_admin()
);

drop policy if exists "published exercises are readable" on public.exercises;
create policy "published exercises are readable" on public.exercises for select using (
  exists(select 1 from public.courses where courses.id = exercises.course_id and courses.is_published = true) or public.is_admin()
);

drop policy if exists "users read own profile" on public.profiles;
create policy "users read own profile" on public.profiles for select using (auth.uid() = id or public.is_admin());

drop policy if exists "users update own profile" on public.profiles;
create policy "users update own profile" on public.profiles for update using (auth.uid() = id or public.is_admin()) with check (auth.uid() = id or public.is_admin());

drop policy if exists "users read own progress" on public.progress;
create policy "users read own progress" on public.progress for select using (auth.uid() = user_id or public.is_admin());

drop policy if exists "users insert own progress" on public.progress;
create policy "users insert own progress" on public.progress for insert with check (auth.uid() = user_id or public.is_admin());

drop policy if exists "users update own progress" on public.progress;
create policy "users update own progress" on public.progress for update using (auth.uid() = user_id or public.is_admin()) with check (auth.uid() = user_id or public.is_admin());

drop policy if exists "users read own submissions" on public.submissions;
create policy "users read own submissions" on public.submissions for select using (auth.uid() = user_id or public.is_admin());

drop policy if exists "users insert own submissions" on public.submissions;
create policy "users insert own submissions" on public.submissions for insert with check (auth.uid() = user_id or public.is_admin());

drop policy if exists "users read own enrollments" on public.course_enrollments;
create policy "users read own enrollments" on public.course_enrollments for select using (auth.uid() = user_id or public.is_admin());

drop policy if exists "users manage own enrollments" on public.course_enrollments;
create policy "users manage own enrollments" on public.course_enrollments for all using (auth.uid() = user_id or public.is_admin()) with check (auth.uid() = user_id or public.is_admin());

drop policy if exists "published paths are readable" on public.learning_paths;
create policy "published paths are readable" on public.learning_paths for select using (is_published = true or public.is_admin());

drop policy if exists "path courses readable" on public.learning_path_courses;
create policy "path courses readable" on public.learning_path_courses for select using (true);

drop policy if exists "achievements readable" on public.achievements;
create policy "achievements readable" on public.achievements for select using (true);

drop policy if exists "users read own achievements" on public.user_achievements;
create policy "users read own achievements" on public.user_achievements for select using (auth.uid() = user_id or public.is_admin());

drop policy if exists "users read own certificates" on public.certificates;
create policy "users read own certificates" on public.certificates for select using (auth.uid() = user_id or public.is_admin());

drop policy if exists "active challenges readable" on public.weekly_challenges;
create policy "active challenges readable" on public.weekly_challenges for select using (is_active = true or public.is_admin());

drop policy if exists "users manage own challenge submissions" on public.challenge_submissions;
create policy "users manage own challenge submissions" on public.challenge_submissions for all using (auth.uid() = user_id or public.is_admin()) with check (auth.uid() = user_id or public.is_admin());

drop policy if exists "users manage own notes" on public.notes;
create policy "users manage own notes" on public.notes for all using (auth.uid() = user_id or public.is_admin()) with check (auth.uid() = user_id or public.is_admin());

create policy "admin manage profiles" on public.profiles for all using (public.is_admin()) with check (public.is_admin());
create policy "admin manage courses" on public.courses for all using (public.is_admin()) with check (public.is_admin());
create policy "admin manage modules" on public.modules for all using (public.is_admin()) with check (public.is_admin());
create policy "admin manage lessons" on public.lessons for all using (public.is_admin()) with check (public.is_admin());
create policy "admin manage exercises" on public.exercises for all using (public.is_admin()) with check (public.is_admin());
create policy "admin manage submissions" on public.submissions for all using (public.is_admin()) with check (public.is_admin());
create policy "admin manage paths" on public.learning_paths for all using (public.is_admin()) with check (public.is_admin());
