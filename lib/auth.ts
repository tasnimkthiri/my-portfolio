import { SignJWT, jwtVerify } from "jose";
import { cookies, headers } from "next/headers";
import { timingSafeEqual } from "node:crypto";
const key = () => new TextEncoder().encode(process.env.AUTH_SECRET || "dev-secret-change-me");
const tries = new Map<string, { n: number; t: number }>();
export async function login(pw: string) {
  const ip = (await headers()).get("x-forwarded-for") ?? "local";
  const r = tries.get(ip);
  if (r && Date.now() - r.t < 9e5 && r.n >= 8) return false;
  const a = Buffer.from(pw), b = Buffer.from(process.env.ADMIN_PASSWORD || "");
  const ok = a.length === b.length && b.length > 0 && timingSafeEqual(a, b);
  if (!ok) { tries.set(ip, { n: (r && Date.now() - r.t < 9e5 ? r.n : 0) + 1, t: r?.t ?? Date.now() }); return false; }
  const t = await new SignJWT({}).setProtectedHeader({ alg: "HS256" }).setExpirationTime("7d").sign(key());
  (await cookies()).set("s", t, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/" });
  return true;
}
export async function logout() { (await cookies()).delete("s"); }
export async function isAdmin() {
  const t = (await cookies()).get("s")?.value;
  if (!t) return false;
  try { await jwtVerify(t, key()); return true; } catch { return false; }
}
