import Link from "next/link";
import { getSite } from "@/lib/data";
import Reveal, { Float } from "@/components/Reveal";
import CertGrid from "@/components/CertGrid";
import ContactForm from "@/components/ContactForm";
export const dynamic = "force-dynamic";
const tints = ["bg-mint", "bg-peach", "bg-sky", "bg-butter", "bg-lav"];
type Entry = { id: number; title: string; org: string; place: string; period: string; details: string };
function Cards({ items, tint }: { items: Entry[]; tint: string }) {
  return (
    <div className="grid gap-4">{items.map((e, i) => (
      <Reveal key={e.id} delay={i * 0.06}>
        <article className={`${tint} rounded-[2rem] p-6`}>
          <p className="text-sm text-soft">{e.period}</p>
          <h3 className="font-display text-xl mt-1">{e.title}</h3>
          <p className="text-soft">{[e.org, e.place].filter(Boolean).join(" · ")}</p>
          {e.details && <ul className="mt-3 grid gap-1.5 list-disc pl-5 leading-relaxed">{e.details.split("\n").filter(Boolean).map((l) => <li key={l}>{l}</li>)}</ul>}
        </article>
      </Reveal>))}
    </div>
  );
}
export default async function Home() {
  const { profile: p, entries, skills, projects, certs } = await getSite();
  if (!p) return <main className="p-10">Run <code>npm run seed</code> or fill in your profile at /admin.</main>;
  const by = (k: string) => entries.filter((e) => e.kind === k);
  const all = skills.flatMap((s) => s.items);
  const stats = p.stats.map((s) => s.split("|"));
  return (
    <main className="px-4 pb-10 overflow-x-hidden">
      <nav aria-label="Main" className="sticky top-4 z-40 max-w-6xl mx-auto bg-white/90 backdrop-blur rounded-full pl-7 pr-3 py-3 flex items-center justify-between shadow-[0_8px_30px_#B9A9F033]">
        <a href="#top" className="font-display font-bold text-xl">{p.name}</a>
        <div className="hidden md:flex gap-7 font-medium">{["About", "Experience", "Skills", "Certifications", "Work", "Contact"].map((l) => <a key={l} href={`#${l.toLowerCase()}`} className="hover:underline">{l}</a>)}</div>
        <a href="#contact" className="btn">Hire me</a>
      </nav>

      <header id="top" className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center py-16 md:py-24">
        <Reveal className="grid gap-7">
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.03]">{p.headline}</h1>
          <p className="text-lg leading-relaxed text-soft max-w-xl">Hi, I'm {p.name}. {p.intro}</p>
          <div className="flex flex-wrap gap-3">
            <a href="#work" className="btn">See my work</a>
            {p.cvUrl && <a href={p.cvUrl} download className="bg-peach rounded-full px-7 py-3.5 font-semibold">Download my CV</a>}
          </div>
        </Reveal>
        <Reveal delay={0.15} className="relative h-[520px] max-w-[460px] w-full mx-auto">
          <div className="absolute right-0 top-4 w-[88%] aspect-square rounded-full bg-peach" />
          <div className="absolute left-[6%] bottom-0 w-[62%] h-[88%] rounded-t-[999px] rounded-b-[28px] bg-lav overflow-hidden">
            {p.photo && <img src={p.photo} alt={p.name} className="w-full h-full object-cover object-top" />}</div>
          {p.pills.map((t, i) => (
            <Float key={t} d={i} className={`absolute ${["right-0 top-0 bg-mint", "right-[-2%] top-[46%] bg-butter", "right-[8%] bottom-8 bg-sky"][i % 3]} px-5 py-3 rounded-full font-semibold shadow-md`}>{t}</Float>))}
        </Reveal>
      </header>

      <section aria-label="Skills" className="max-w-6xl mx-auto overflow-hidden rounded-full">
        <div className="marquee flex gap-3">{[...all, ...all].map((s, i) => <span key={i} className={`${tints[i % 5]} px-6 py-3 rounded-full font-medium whitespace-nowrap`}>{s}</span>)}</div>
      </section>

      <section id="about" className="max-w-6xl mx-auto bg-lav rounded-[3rem] p-8 md:p-14 mt-24 grid md:grid-cols-[320px_1fr] gap-10 items-center">
        <Reveal><div className="h-[400px] rounded-t-[999px] rounded-b-[32px] overflow-hidden bg-paper">{(p.photo2 || p.photo) && <img src={p.photo2 || p.photo} alt={`${p.name}, portrait`} loading="lazy" className="w-full h-full object-cover object-top" />}</div></Reveal>
        <Reveal delay={0.1} className="grid gap-5">
          <h2 className="text-4xl md:text-5xl font-bold">A little about me</h2>
          <p className="text-lg leading-relaxed max-w-2xl">{p.bio}</p>
          <div className="flex flex-wrap gap-3">{stats.map(([v, l]) => <div key={l} className="bg-white rounded-3xl px-6 py-4"><b className="font-display text-3xl">{v}</b><div className="text-soft">{l}</div></div>)}</div>
        </Reveal>
      </section>

      <section id="experience" className="max-w-6xl mx-auto mt-28 grid gap-14">
        <Reveal><h2 className="text-4xl md:text-5xl font-bold">Experience</h2></Reveal>
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-14">
          <div className="grid gap-4 content-start"><h3 className="text-2xl font-bold">Internships</h3><Cards items={by("work")} tint="bg-mint" /></div>
          <div className="grid gap-4 content-start"><h3 className="text-2xl font-bold">Leadership & activities</h3><Cards items={by("lead")} tint="bg-peach" /></div>
          <div className="grid gap-4 content-start"><h3 className="text-2xl font-bold">Awards</h3><Cards items={by("award")} tint="bg-butter" /></div>
          <div className="grid gap-4 content-start"><h3 className="text-2xl font-bold">Education</h3><Cards items={by("edu")} tint="bg-sky" /></div>
        </div>
      </section>

      <section id="skills" className="max-w-6xl mx-auto mt-28 grid gap-8">
        <Reveal><h2 className="text-4xl md:text-5xl font-bold">Code, data and AI</h2></Reveal>
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-6">
          <div className="grid sm:grid-cols-2 gap-4">{skills.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.05}><div className={`${tints[i % 5]} rounded-[2rem] p-6 h-full`}><h3 className="font-display text-xl mb-3">{s.category}</h3>
              <div className="flex flex-wrap gap-2">{s.items.map((t) => <span key={t} className="bg-white/80 rounded-full px-3 py-1 text-sm">{t}</span>)}</div></div></Reveal>))}</div>
          <Reveal className="bg-ink rounded-[2rem] p-7 grid content-center gap-5 text-lav">
            <div className="flex gap-2" aria-hidden><i className="w-3.5 h-3.5 rounded-full bg-peach" /><i className="w-3.5 h-3.5 rounded-full bg-butter" /><i className="w-3.5 h-3.5 rounded-full bg-mint" /></div>
            <pre className="font-mono text-base leading-8 whitespace-pre-wrap" aria-hidden><span className="text-[#8F88B0]"># my favorite kind of problem</span>{"\n"}question = <span className="text-butter">embed</span>(<span className="text-mint">"how can AI help?"</span>){"\n"}context = <span className="text-butter">search</span>(documents, question){"\n"}<span className="text-butter">answer</span>(question, context)</pre>
          </Reveal>
        </div>
      </section>

      <section id="certifications" className="max-w-6xl mx-auto mt-28 grid gap-8">
        <Reveal><h2 className="text-4xl md:text-5xl font-bold">Certifications & training</h2><p className="text-soft mt-2">Tap a card to see the full certificate.</p></Reveal>
        <CertGrid certs={certs} />
      </section>

      <section id="work" className="max-w-6xl mx-auto mt-28 grid gap-8">
        <Reveal><h2 className="text-4xl md:text-5xl font-bold">Recent work</h2></Reveal>
        <div className="grid md:grid-cols-2 gap-6">{projects.map((x, i) => (
          <Reveal key={x.id} delay={i * 0.08}><Link href={`/projects/${x.slug}`} className="group block bg-white rounded-[2rem] p-4 pb-7 h-full">
            <div className={`${tints[i % 5]} h-60 rounded-3xl overflow-hidden grid place-items-center`}>{x.cover ? <img src={x.cover} alt={x.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" /> : <span className="font-display text-6xl text-ink/30">{x.title.slice(0, 2)}</span>}</div>
            <h3 className="font-display text-2xl mt-4 px-3 group-hover:underline">{x.title}</h3><p className="text-soft px-3 mt-1">{x.summary}</p>
            <div className="flex flex-wrap gap-2 px-3 mt-3">{x.tech.map((t) => <span key={t} className="bg-lav rounded-full px-3 py-1 text-sm">{t}</span>)}</div></Link></Reveal>))}</div>
      </section>

      <section id="contact" className="max-w-6xl mx-auto mt-28 bg-white rounded-[3rem] p-8 md:p-14 grid md:grid-cols-2 gap-12">
        <Reveal className="grid gap-5 content-center">
          <h2 className="text-4xl md:text-6xl font-bold leading-[1.05]">Have a project in mind? Let's talk.</h2>
          <p className="text-lg text-soft">Send me a message and I'll reply by email.</p>
          <ul className="grid gap-1 font-medium">{p.email && <li><a className="underline" href={`mailto:${p.email}`}>{p.email}</a></li>}{p.phone && <li>{p.phone}</li>}{p.location && <li>{p.location}</li>}
            {p.linkedin && <li><a className="underline" href={p.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>}{p.github && <li><a className="underline" href={p.github} target="_blank" rel="noreferrer">GitHub</a></li>}</ul>
        </Reveal>
        <Reveal delay={0.1}><ContactForm /></Reveal>
      </section>
      <footer className="max-w-6xl mx-auto mt-14 flex justify-between flex-wrap gap-3 text-soft"><span>© {new Date().getFullYear()} {p.name}</span><Link href="/admin" className="hover:underline">Admin</Link></footer>
    </main>
  );
}
