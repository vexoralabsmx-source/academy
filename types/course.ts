import type { Exercise } from "./exercise";

export type Difficulty = "Principiante" | "Intermedio" | "Avanzado";

export type Course = {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  area: string;
  difficulty: Difficulty;
  estimatedHours: number;
  gradient: string;
  icon: string;
  xpTotal: number;
  prerequisites: string[];
  objectives: string[];
  finalProject: string;
  modules: Module[];
  lessonsCount: number;
  exercisesCount: number;
  isPublished: boolean;
};

export type Module = {
  id: string;
  title: string;
  description: string;
  orderIndex: number;
  lessons: Lesson[];
};

export type Lesson = {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  estimatedMinutes: number;
  orderIndex: number;
  isPreview: boolean;
  exercises: Exercise[];
};

export type LearningPath = {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: Difficulty;
  estimatedHours: number;
  icon: string;
  gradient: string;
  courses: string[];
  exerciseCount: number;
};

export type BlogPost = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  readMinutes: number;
  date: string;
};

export type Challenge = {
  title: string;
  description: string;
  difficulty: Difficulty;
  xp: number;
  type: string;
  status: string;
  deadline?: string;
};

export type LabCard = {
  title: string;
  description: string;
  prompt: string;
  difficulty: Difficulty;
  xp: number;
};

export type UserProfile = {
  id: string;
  username: string;
  fullName: string;
  avatarUrl?: string;
  bio: string;
  xp: number;
  level: number;
  streak: number;
  role: "student" | "admin";
};
