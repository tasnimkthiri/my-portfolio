import { Resend } from "resend";
import { db } from "@/lib/db";
const hits = new Map<string, number[]>();
export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "local";
  const now = Date.now(), recent = (hits.get(ip) ?? []).filter((t) => now - t < 36e5);
  if (recent.length >= 5) return Response.json({ ok: false }, { status: 429 });
  hits.set(ip, [...recent, now]);
  const d = await req.json().catch(() => ({}));
  if (d.website) return Response.json({ ok: true });
  const name = String(d.name ?? "").trim().slice(0, 100), email = String(d.email ?? "").trim().slice(0, 150), body = String(d.body ?? "").trim().slice(0, 3000);
  if (!name || !body || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return Response.json({ ok: false }, { status: 400 });
  await db.message.create({ data: { name, email, body } });
  if (process.env.RESEND_API_KEY && process.env.CONTACT_EMAIL) {
    const { error } = await new Resend(process.env.RESEND_API_KEY).emails.send({ from: "Portfolio <onboarding@resend.dev>", to: process.env.CONTACT_EMAIL,
      replyTo: email, subject: `New portfolio message from ${name}`, text: `${name} <${email}>\n\n${body}` });
    if (error) console.error("Email failed:", error);
  }
  return Response.json({ ok: true });
}
