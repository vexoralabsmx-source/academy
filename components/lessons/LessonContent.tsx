import type { Lesson } from "@/types/course";
import { Card } from "@/components/ui";

function renderLine(line: string, index: number) {
  if (line.startsWith("## ")) return <h2 key={index} className="mt-8 text-2xl font-bold">{line.replace("## ", "")}</h2>;
  if (line.startsWith("- ")) return <li key={index} className="ml-5 list-disc text-slate-300">{line.replace("- ", "")}</li>;
  if (line.startsWith("```")) return null;
  if (!line.trim()) return <br key={index} />;
  return <p key={index} className="leading-8 text-slate-300">{line}</p>;
}

export function LessonContent({ lesson }: { lesson: Lesson }) {
  const hasCode = lesson.content.includes("```");
  const [beforeCode, codePart = ""] = lesson.content.split("```ts");
  const [code = "", afterCode = ""] = codePart.split("```");

  return (
    <article className="space-y-6">
      <div>
        <p className="text-sm text-cyan">{lesson.estimatedMinutes} min</p>
        <h1 className="mt-2 text-4xl font-bold">{lesson.title}</h1>
        <p className="mt-3 text-slate-400">{lesson.description}</p>
      </div>
      <Card className="prose prose-invert max-w-none">
        {beforeCode.split("\n").map(renderLine)}
        {hasCode ? (
          <pre className="code-scroll my-6 overflow-auto rounded-xl border border-cyan/20 bg-black/45 p-4 text-sm text-cyan">
            <code>{code.trim()}</code>
          </pre>
        ) : null}
        {afterCode.split("\n").map((line, index) => renderLine(line, index + 100))}
      </Card>
    </article>
  );
}
