"use client";

import { useTransition, useState } from "react";
import type { Exercise } from "@/types/exercise";
import { submitExerciseAttempt } from "@/lib/learning/actions";
import { Button, Card, Textarea, Toast } from "@/components/ui";

export function ExerciseRenderer({
  exercise,
  courseSlug,
  lessonSlug
}: {
  exercise: Exercise;
  courseSlug: string;
  lessonSlug: string;
}) {
  const [answer, setAnswer] = useState("");
  const [attempts, setAttempts] = useState(1);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function submit() {
    startTransition(async () => {
      const result = await submitExerciseAttempt({ exercise, answer, attempts, courseSlug, lessonSlug });
      setFeedback(result.feedback);
      setAttempts((current) => current + 1);
    });
  }

  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-cyan">Ejercicio</p>
          <h3 className="mt-1 text-xl font-bold">{exercise.title}</h3>
        </div>
        <span className="rounded-full bg-xp/10 px-3 py-1 text-sm font-semibold text-xp">+{exercise.xpReward} XP</span>
      </div>
      <p className="mt-4 text-slate-300">{exercise.question}</p>
      {exercise.options ? (
        <div className="mt-4 grid gap-2">
          {exercise.options.map((option) => (
            <button key={option} onClick={() => setAnswer(option)} className={`rounded-lg border px-4 py-3 text-left text-sm transition ${answer === option ? "border-cyan bg-cyan/10 text-cyan" : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-cyan/30"}`}>
              {option}
            </button>
          ))}
        </div>
      ) : (
        <Textarea value={answer} onChange={(event) => setAnswer(event.target.value)} className="mt-4" placeholder="Escribe tu respuesta..." />
      )}
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Button onClick={submit} disabled={isPending || !answer.trim()}>{isPending ? "Guardando..." : "Calificar"}</Button>
        <p className="text-sm text-slate-500">{exercise.hint}</p>
      </div>
      {feedback ? <div className="mt-4"><Toast message={feedback} /></div> : null}
    </Card>
  );
}

export const MultipleChoiceExercise = ExerciseRenderer;
export const MultipleSelectExercise = ExerciseRenderer;
export const TextAnswerExercise = ExerciseRenderer;
export const CodeExactExercise = ExerciseRenderer;
export const FillBlankExercise = ExerciseRenderer;
export const OrderingExercise = ExerciseRenderer;
export const ChecklistExercise = ExerciseRenderer;

export function ExerciseFeedback({ message }: { message: string }) {
  return <Toast message={message} />;
}

export function XPToast({ xp }: { xp: number }) {
  return <Toast message={`Correcto. Sumaste ${xp} XP.`} />;
}
