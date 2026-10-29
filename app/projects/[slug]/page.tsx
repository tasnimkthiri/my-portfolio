import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
export const dynamic = "force-dynamic";
export default async function Project({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await db.project.findUnique({ where: { slug } });
  if (!p) notFound();
  return (
    <main className="max-w-4xl mx-auto px-5 py-14">
      <Link href="/#work" className="underline">Back to projects</Link>
      <h1 className="text-5xl font-bold mt-6">{p.title}</h1>
      <p className="text-xl text-soft mt-3">{p.summary}</p>
      <div className="flex flex-wrap gap-2 mt-5">{p.tech.map((t) => <span key={t} className="bg-mint rounded-full px-4 py-1.5 text-sm">{t}</span>)}</div>
      {p.cover && <img src={p.cover} alt={p.title} className="w-full rounded-3xl mt-8" />}
      <p className="mt-8 whitespace-pre-line leading-relaxed text-lg max-w-prose">{p.details}</p>
      <div className="flex gap-4 mt-6">{p.liveUrl && <a className="btn" href={p.liveUrl} target="_blank" rel="noreferrer">Visit site</a>}{p.repoUrl && <a className="underline self-center" href={p.repoUrl} target="_blank" rel="noreferrer">Source code</a>}</div>
      <div className="grid sm:grid-cols-2 gap-4 mt-10">{p.images.map((u) => <img key={u} src={u} alt="" loading="lazy" className="rounded-2xl w-full" />)}</div>
    </main>
  );
}
