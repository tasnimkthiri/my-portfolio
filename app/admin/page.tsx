import Link from "next/link";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { isAdmin } from "@/lib/auth";
import { E } from "@/lib/entities";
import ImageField from "@/components/ImageField";
import { saveAction, deleteAction, logoutAction } from "./actions";
export const dynamic = "force-dynamic";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Row = Record<string, any>;
export default async function Admin({ searchParams }: { searchParams: Promise<{ tab?: string; edit?: string; saved?: string }> }) {
  if (!(await isAdmin())) redirect("/admin/login");
  const { tab = "overview", edit, saved } = await searchParams;
  const tabs = ["overview", ...Object.keys(E), "message"];
  const unread = await db.message.count();
  const cfg = E[tab];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rows: Row[] = cfg ? (cfg.single ? [await db.profile.findUnique({ where: { id: 1 } })].filter(Boolean) as Row[] : await (db as any)[cfg.model].findMany({ orderBy: { id: "asc" } })) : [];
  const cur = cfg?.single ? rows[0] : rows.find((r) => r.id === Number(edit));
  const msgs = tab === "message" || tab === "overview" ? await db.message.findMany({ orderBy: { createdAt: "desc" } }) : [];
  const counts = await Promise.all([db.project.count(), db.certification.count(), db.entry.count(), db.skill.count()]);
  return (
    <main className="max-w-5xl mx-auto px-5 py-8 grid gap-6">
      <header className="flex flex-wrap justify-between items-center gap-3"><h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex gap-3 items-center"><Link href="/" className="underline">View site</Link><form action={logoutAction}><button className="btn">Log out</button></form></div></header>
      <nav aria-label="Admin sections" className="flex flex-wrap gap-2">{tabs.map((t) => (
        <Link key={t} href={`/admin?tab=${t}`} className={`rounded-full px-5 py-2 font-medium ${t === tab ? "bg-ink text-white" : "bg-white"}`}>{t === "overview" ? "Overview" : t === "message" ? `Messages (${unread})` : E[t].label}</Link>))}</nav>
      {saved && <p role="status" className="bg-mint rounded-2xl px-5 py-3">Saved. Your site is updated.</p>}

      {tab === "overview" && <>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{[["Projects", counts[0]], ["Certifications", counts[1]], ["Experience items", counts[2]], ["Skill groups", counts[3]]].map(([l, n], i) => (
          <div key={l as string} className={`${["bg-mint", "bg-peach", "bg-sky", "bg-butter"][i]} rounded-3xl p-5`}><b className="font-display text-4xl">{n}</b><div>{l}</div></div>))}</div>
        <section className="bg-white rounded-3xl p-6"><h2 className="text-xl font-bold mb-3">Latest messages</h2>
          {msgs.length === 0 ? <p className="text-soft">No messages yet.</p> : msgs.slice(0, 5).map((m) => <p key={m.id} className="border-b border-ink/10 py-2"><b>{m.name}</b> <span className="text-soft">{m.email}</span><br />{m.body.slice(0, 120)}</p>)}</section></>}

      {cfg && <section className="grid gap-6">
        <form action={saveAction} key={`${tab}-${cur?.id ?? "new"}`} className="bg-white rounded-3xl p-6 grid gap-4">
          <h2 className="text-xl font-bold">{cfg.single ? "Edit profile" : cur ? `Edit: ${cfg.title(cur)}` : `Add to ${cfg.label}`}</h2>
          <input type="hidden" name="entity" value={tab} /><input type="hidden" name="id" value={cur?.id ?? ""} />
          {cfg.f.map((f) => {
            const v = cur?.[f.n];
            if (f.t === "img" || f.t === "file" || f.t === "imgs") return <ImageField key={f.n} name={f.n} label={f.l} multiple={f.t === "imgs"} file={f.t === "file"} initial={Array.isArray(v) ? v.join("\n") : v ?? ""} />;
            return <label key={f.n} className="grid gap-1 font-medium">{f.l}
              {f.t === "area" ? <textarea name={f.n} rows={5} defaultValue={v ?? ""} /> : f.t === "sel" ? <select name={f.n} defaultValue={v ?? f.o?.[0]}>{f.o?.map((o) => <option key={o}>{o}</option>)}</select>
                : <input name={f.n} type={f.t === "num" ? "number" : "text"} defaultValue={f.t === "tags" ? (v ?? []).join(f.n === "stats" ? "\n" : ", ") : v ?? (f.t === "num" ? 0 : "")} />}</label>;
          })}
          <button className="btn w-fit">{cur ? "Save changes" : "Add"}</button>
        </form>
        {!cfg.single && <ul className="bg-white rounded-3xl p-6 grid gap-1">{rows.length === 0 && <li className="text-soft">Nothing here yet.</li>}{rows.map((r) => (
          <li key={r.id} className="flex justify-between gap-3 border-b border-ink/10 py-2"><span>{cfg.title(r)}</span>
            <span className="flex gap-4"><Link className="underline" href={`/admin?tab=${tab}&edit=${r.id}`}>Edit</Link>
              <form action={deleteAction}><input type="hidden" name="entity" value={tab} /><input type="hidden" name="id" value={r.id} /><button className="text-red-700 underline">Delete</button></form></span></li>))}</ul>}
      </section>}

      {tab === "message" && <section className="grid gap-3">{msgs.length === 0 && <p className="text-soft">No messages yet.</p>}{msgs.map((m) => (
        <article key={m.id} className="bg-white rounded-3xl p-5"><div className="flex justify-between gap-3"><b>{m.name} <a className="font-normal underline" href={`mailto:${m.email}?subject=Re: your message`}>{m.email}</a></b>
          <form action={deleteAction}><input type="hidden" name="entity" value="message" /><input type="hidden" name="id" value={m.id} /><button className="text-red-700 underline">Delete</button></form></div>
          <p className="mt-2 whitespace-pre-line">{m.body}</p><p className="text-sm text-soft mt-2">{m.createdAt.toLocaleString()}</p></article>))}</section>}
    </main>
  );
}
