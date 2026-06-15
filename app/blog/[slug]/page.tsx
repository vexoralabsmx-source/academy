import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout";
import { Card } from "@/components/ui";
import { findPost } from "@/lib/seed/data";

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = findPost(params.slug);
  if (!post) notFound();
  return (
    <>
      <PageHeader eyebrow={post.category} title={post.title} description={post.excerpt} />
      <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 lg:px-8">
        <Card>
          {post.content.split("\n").map((line, index) => {
            if (line.startsWith("# ")) return <h1 key={index} className="text-3xl font-bold">{line.replace("# ", "")}</h1>;
            if (line.startsWith("## ")) return <h2 key={index} className="mt-8 text-2xl font-bold">{line.replace("## ", "")}</h2>;
            if (!line.trim()) return <br key={index} />;
            return <p key={index} className="leading-8 text-slate-300">{line}</p>;
          })}
        </Card>
      </section>
    </>
  );
}
