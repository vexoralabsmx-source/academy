import Link from "next/link";
import { PageHeader } from "@/components/layout";
import { Badge, Card } from "@/components/ui";
import { blogPosts } from "@/lib/seed/data";

export default function BlogPage() {
  return (
    <>
      <PageHeader eyebrow="Blog" title="Artículos educativos" description="Guías directas para aprender tecnología con práctica y foco profesional." />
      <section className="mx-auto grid max-w-7xl gap-5 px-4 pb-20 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {blogPosts.map((post) => (
          <Card key={post.slug}>
            <Badge>{post.category}</Badge>
            <Link href={`/blog/${post.slug}`} className="mt-4 block text-xl font-bold hover:text-cyan">{post.title}</Link>
            <p className="mt-3 text-sm text-slate-400">{post.excerpt}</p>
            <p className="mt-5 text-xs text-slate-500">{post.readMinutes} min - {post.date}</p>
          </Card>
        ))}
      </section>
    </>
  );
}
