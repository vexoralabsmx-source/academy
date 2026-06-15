create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  full_name text,
  avatar_url text,
  bio text,
  website_url text,
  github_url text,
  linkedin_url text,
  xp integer default 0,
  level integer default 1,
  streak integer default 0,
  role text default 'student' check (role in ('student', 'admin')),
  last_activity_date date,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text,
  long_description text,
  area text,
  difficulty text,
  estimated_hours integer,
  cover_url text,
  gradient text,
  icon text,
  is_published boolean default false,
  xp_total integer default 0,
  prerequisites text[],
  objectives text[],
  final_project text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table if not exists public.modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references public.courses(id) on delete cascade,
  title text not null,
  description text,
  order_index integer default 0,
  created_at timestamp with time zone default now()
);

create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid references public.modules(id) on delete cascade,
  course_id uuid references public.courses(id) on delete cascade,
  title text not null,
  slug text not null,
  description text,
  content text,
  video_url text,
  estimated_minutes integer default 10,
  order_index integer default 0,
  is_preview boolean default false,
  is_published boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique(course_id, slug)
);

create table if not exists public.exercises (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid references public.lessons(id) on delete cascade,
  course_id uuid references public.courses(id) on delete cascade,
  type text not null,
  title text not null,
  instructions text,
  question text,
  options jsonb,
  correct_answer jsonb,
  expected_answer text,
  expected_output text,
  starter_code text,
  test_cases jsonb,
  explanation text,
  hint text,
  xp_reward integer default 10,
  difficulty text default 'Principiante',
  order_index integer default 0,
  created_at timestamp with time zone default now()
);

create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  exercise_id uuid references public.exercises(id) on delete cascade,
  course_id uuid references public.courses(id) on delete cascade,
  lesson_id uuid references public.lessons(id) on delete cascade,
  answer jsonb,
  score integer default 0,
  feedback text,
  is_correct boolean default false,
  attempts integer default 1,
  xp_awarded integer default 0,
  status text default 'graded',
  created_at timestamp with time zone default now()
);

create table if not exists public.progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  course_id uuid references public.courses(id) on delete cascade,
  lesson_id uuid references public.lessons(id) on delete cascade,
  completed boolean default false,
  completed_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  unique(user_id, lesson_id)
);

create table if not exists public.course_enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  course_id uuid references public.courses(id) on delete cascade,
  progress_percent integer default 0,
  status text default 'active',
  started_at timestamp with time zone default now(),
  completed_at timestamp with time zone,
  unique(user_id, course_id)
);

create table if not exists public.learning_paths (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text,
  difficulty text,
  estimated_hours integer,
  icon text,
  gradient text,
  is_published boolean default true,
  created_at timestamp with time zone default now()
);

create table if not exists public.learning_path_courses (
  id uuid primary key default gen_random_uuid(),
  path_id uuid references public.learning_paths(id) on delete cascade,
  course_id uuid references public.courses(id) on delete cascade,
  order_index integer default 0
);

create table if not exists public.achievements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  icon text,
  xp_reward integer default 0,
  condition_key text,
  created_at timestamp with time zone default now()
);

create table if not exists public.user_achievements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  achievement_id uuid references public.achievements(id) on delete cascade,
  unlocked_at timestamp with time zone default now(),
  unique(user_id, achievement_id)
);

create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  course_id uuid references public.courses(id) on delete cascade,
  certificate_url text,
  issued_at timestamp with time zone default now(),
  unique(user_id, course_id)
);

create table if not exists public.weekly_challenges (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  difficulty text,
  xp_reward integer default 50,
  type text,
  starts_at timestamp with time zone,
  ends_at timestamp with time zone,
  is_active boolean default true,
  created_at timestamp with time zone default now()
);

create table if not exists public.challenge_submissions (
  id uuid primary key default gen_random_uuid(),
  challenge_id uuid references public.weekly_challenges(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  submission_url text,
  submission_text text,
  score integer,
  feedback text,
  status text default 'submitted',
  created_at timestamp with time zone default now()
);

create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  lesson_id uuid references public.lessons(id) on delete cascade,
  content text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create index if not exists courses_slug_idx on public.courses(slug);
create index if not exists lessons_slug_idx on public.lessons(slug);
create index if not exists profiles_username_idx on public.profiles(username);
create index if not exists submissions_user_id_idx on public.submissions(user_id);
create index if not exists progress_user_id_idx on public.progress(user_id);
create index if not exists course_enrollments_user_id_idx on public.course_enrollments(user_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();

drop trigger if exists set_courses_updated_at on public.courses;
create trigger set_courses_updated_at before update on public.courses for each row execute function public.set_updated_at();

drop trigger if exists set_lessons_updated_at on public.lessons;
create trigger set_lessons_updated_at before update on public.lessons for each row execute function public.set_updated_at();

drop trigger if exists set_notes_updated_at on public.notes;
create trigger set_notes_updated_at before update on public.notes for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username, full_name, xp, level, streak, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    0,
    1,
    0,
    'student'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

create or replace function public.award_submission_xp()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  already_awarded boolean;
  new_xp integer;
begin
  if new.is_correct is not true or coalesce(new.xp_awarded, 0) <= 0 then
    return new;
  end if;

  select exists (
    select 1
    from public.submissions s
    where s.user_id = new.user_id
      and s.exercise_id = new.exercise_id
      and s.is_correct = true
      and s.xp_awarded > 0
      and s.id <> new.id
  ) into already_awarded;

  if already_awarded then
    new.xp_awarded = 0;
    return new;
  end if;

  update public.profiles
  set xp = xp + new.xp_awarded,
      level = floor((xp + new.xp_awarded) / 100) + 1,
      last_activity_date = current_date
  where id = new.user_id
  returning xp into new_xp;

  return new;
end;
$$;

drop trigger if exists award_submission_xp_insert on public.submissions;
create trigger award_submission_xp_insert before insert on public.submissions for each row execute function public.award_submission_xp();

drop trigger if exists award_submission_xp_update on public.submissions;
create trigger award_submission_xp_update before update of is_correct, xp_awarded on public.submissions for each row execute function public.award_submission_xp();
