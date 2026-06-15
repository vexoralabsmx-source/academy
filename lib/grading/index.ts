import type { Exercise, GradeResult } from "@/types/exercise";

export function normalizeAnswer(value: unknown) {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/\s+/g, " ");
}

export function gradeMultipleChoice(selectedOption: string, correctAnswer: string) {
  return normalizeAnswer(selectedOption) === normalizeAnswer(correctAnswer);
}

export function gradeMultipleSelect(selectedOptions: string[], correctAnswers: string[]) {
  const selected = selectedOptions.map(normalizeAnswer).sort();
  const correct = correctAnswers.map(normalizeAnswer).sort();
  return selected.length === correct.length && selected.every((value, index) => value === correct[index]);
}

export function gradeTextAnswer(answer: string, expectedAnswer: string | string[]) {
  const validAnswers = Array.isArray(expectedAnswer) ? expectedAnswer : [expectedAnswer];
  const normalized = normalizeAnswer(answer);
  return validAnswers.some((expected) => {
    const valid = normalizeAnswer(expected);
    return normalized === valid || normalized.includes(valid);
  });
}

export function gradeCodeExact(answer: string, expectedAnswer: string) {
  // Para ejecución real de código se requiere sandbox seguro aislado. Esta versión usa validación simple.
  return normalizeAnswer(answer) === normalizeAnswer(expectedAnswer);
}

export function gradeFillBlank(answer: string[], expectedAnswer: string[]) {
  return answer.length === expectedAnswer.length && answer.every((value, index) => normalizeAnswer(value) === normalizeAnswer(expectedAnswer[index]));
}

export function gradeOrdering(answer: string[], expectedAnswer: string[]) {
  return answer.length === expectedAnswer.length && answer.every((value, index) => value === expectedAnswer[index]);
}

export function gradeChecklist() {
  return { isCorrect: false, score: 0, status: "pending_review" as const };
}

export function calculateLevel(xp: number) {
  return Math.floor(xp / 100) + 1;
}

export function calculateXP({ score, xpReward, alreadyCompleted }: { score: number; xpReward: number; alreadyCompleted: boolean }) {
  if (alreadyCompleted) return 0;
  return Math.round((score / 100) * xpReward);
}

export function gradeExercise(exercise: Exercise, answer: unknown, attempts = 1, alreadyCompleted = false): GradeResult {
  if (exercise.type === "checklist" || exercise.type === "project_submission") {
    return {
      isCorrect: false,
      score: 0,
      feedback: "Entrega guardada para revisión. Buen trabajo documentando tu avance.",
      xpAwarded: 0,
      status: "pending_review"
    };
  }

  let isCorrect = false;
  if (exercise.type === "multiple_choice") {
    isCorrect = gradeMultipleChoice(String(answer), String(exercise.correctAnswer));
  } else if (exercise.type === "multiple_select") {
    isCorrect = gradeMultipleSelect(answer as string[], exercise.correctAnswer as string[]);
  } else if (exercise.type === "text_answer" || exercise.type === "data_question" || exercise.type === "sql_concept") {
    isCorrect = gradeTextAnswer(String(answer), exercise.expectedAnswer ?? exercise.correctAnswer ?? "");
  } else if (exercise.type === "code_exact") {
    isCorrect = gradeCodeExact(String(answer), String(exercise.expectedAnswer ?? exercise.expectedOutput ?? ""));
  } else if (exercise.type === "fill_blank") {
    isCorrect = gradeFillBlank(answer as string[], exercise.correctAnswer as string[]);
  } else if (exercise.type === "ordering") {
    isCorrect = gradeOrdering(answer as string[], exercise.correctAnswer as string[]);
  }

  const score = isCorrect ? (attempts === 1 ? 100 : attempts === 2 ? 80 : 60) : 0;
  const xpAwarded = isCorrect ? calculateXP({ score, xpReward: exercise.xpReward, alreadyCompleted }) : 0;

  return {
    isCorrect,
    score,
    xpAwarded,
    status: "graded",
    feedback: isCorrect ? `Correcto. Sumaste ${xpAwarded} XP.` : `Casi. Revisa la pista: ${exercise.hint}`
  };
}
