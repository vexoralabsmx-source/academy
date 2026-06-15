export type ExerciseType =
  | "multiple_choice"
  | "multiple_select"
  | "text_answer"
  | "code_exact"
  | "fill_blank"
  | "ordering"
  | "checklist"
  | "data_question"
  | "sql_concept"
  | "project_submission";

export type Exercise = {
  id: string;
  type: ExerciseType;
  title: string;
  instructions: string;
  question: string;
  options?: string[];
  correctAnswer?: string | string[];
  expectedAnswer?: string | string[];
  expectedOutput?: string;
  starterCode?: string;
  explanation: string;
  hint: string;
  xpReward: number;
  difficulty: "Principiante" | "Intermedio" | "Avanzado";
};

export type GradeResult = {
  isCorrect: boolean;
  score: number;
  feedback: string;
  xpAwarded: number;
  status: "graded" | "pending_review";
};
