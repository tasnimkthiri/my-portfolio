"use server";
import { db } from "@/lib/db";
import { login, logout, isAdmin } from "@/lib/auth";
import { E } from "@/lib/entities";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
const need = async () => { if (!(await isAdmin())) redirect("/admin/login"); };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const model = (e: string) => (db as any)[E[e].model];
const slugify = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
export async function loginAction(fd: FormData) { if (await login(String(fd.get("pw")))) redirect("/admin"); redirect("/admin/login?e=1"); }
export async function logoutAction() { await logout(); redirect("/admin/login"); }
export async function saveAction(fd: FormData) {
  await need();
  const e = String(fd.get("entity")); if (!E[e]) return;
  const d: Record<string, unknown> = {};
  for (const f of E[e].f) {
    const v = String(fd.get(f.n) ?? "").trim();
    d[f.n] = f.t === "tags" ? v.split(/[\n,]/).map((s) => s.trim()).filter(Boolean) : f.t === "imgs" ? v.split("\n").map((s) => s.trim()).filter(Boolean) : f.t === "num" ? Number(v || 0) : v;
  }
  const id = Number(fd.get("id") || 0);
  if (E[e].single) await model(e).upsert({ where: { id: 1 }, update: d, create: { id: 1, ...d } });
  else if (id) { if (e === "project") d.slug = slugify(String(d.title)) || `p-${id}`; await model(e).update({ where: { id }, data: d }); }
  else { if (e === "project") { const b = slugify(String(d.title)) || "project"; d.slug = (await db.project.findUnique({ where: { slug: b } })) ? `${b}-${Date.now().toString(36)}` : b; } await model(e).create({ data: d }); }
  revalidatePath("/"); redirect(`/admin?tab=${e}&saved=1`);
}
export async function deleteAction(fd: FormData) {
  await need();
  const e = String(fd.get("entity")); const id = Number(fd.get("id"));
  if (e === "message") await db.message.delete({ where: { id } }); else if (E[e] && !E[e].single) await model(e).delete({ where: { id } });
  revalidatePath("/"); redirect(`/admin?tab=${e}`);
}
