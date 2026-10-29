"use client";
import { useEffect, useState } from "react";
import Reveal from "./Reveal";
type C = { id: number; title: string; issuer: string; date: string; image: string; url: string };
const tints = ["bg-mint", "bg-peach", "bg-sky", "bg-butter", "bg-lav"];
export default function CertGrid({ certs }: { certs: C[] }) {
  const [open, setOpen] = useState<C | null>(null);
  useEffect(() => { const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null); window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); }, []);
  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certs.map((c, i) => (
          <Reveal key={c.id} delay={(i % 3) * 0.08}>
            <div className={`${tints[i % 5]} rounded-[2rem] p-4 h-full flex flex-col gap-4 transition-transform hover:-translate-y-1`}>
              <button onClick={() => c.image && setOpen(c)} disabled={!c.image} aria-label={`View ${c.title}`}
                className="h-48 rounded-2xl bg-white overflow-hidden grid place-items-center text-soft">
                {c.image ? <img src={c.image} alt={`Certificate: ${c.title}`} loading="lazy" className="w-full h-full object-cover object-top" /> : <span className="font-display text-5xl">{c.issuer.slice(0, 1)}</span>}
              </button>
              <div className="px-2 pb-2"><h3 className="font-display text-lg leading-snug">{c.title}</h3>
                <p className="text-soft mt-1">{c.issuer}</p><p className="text-sm text-soft">{c.date}</p>
                {c.url && <a href={c.url} target="_blank" rel="noreferrer" className="underline text-sm mt-2 inline-block">View credential</a>}</div>
            </div>
          </Reveal>
        ))}
      </div>
      {open && (
        <div role="dialog" aria-modal="true" aria-label={open.title} onClick={() => setOpen(null)} className="fixed inset-0 z-50 bg-ink/80 grid place-items-center p-4">
          <div className="max-h-full overflow-auto"><img src={open.image} alt={`Certificate: ${open.title}`} className="max-h-[88vh] rounded-2xl bg-white" />
            <button className="btn mt-3" onClick={() => setOpen(null)}>Close</button></div>
        </div>
      )}
    </>
  );
}
