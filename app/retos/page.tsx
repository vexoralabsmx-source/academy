import { PageHeader } from "@/components/layout";
import { ChallengeCard } from "@/components/labs";
import { challenges } from "@/lib/seed/data";

export default function ChallengesPage() {
  return (
    <>
      <PageHeader eyebrow="Retos" title="Retos semanales y ejercicios prácticos" description="Participa en desafíos cortos para convertir conocimiento en entregables." />
      <section className="mx-auto grid max-w-7xl gap-5 px-4 pb-20 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {challenges.map((challenge) => <ChallengeCard key={challenge.title} challenge={challenge} />)}
      </section>
    </>
  );
}
