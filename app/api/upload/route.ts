import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { isAdmin } from "@/lib/auth";
const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(process.cwd(), "uploads");
const OK = ["jpg", "jpeg", "png", "webp", "gif", "pdf"];
export async function POST(req: Request) {
  if (!(await isAdmin())) return new Response("Unauthorized", { status: 401 });
  const f = (await req.formData()).get("file");
  if (!(f instanceof File) || f.size > 15e6) return new Response("Bad file", { status: 400 });
  const ext = f.name.split(".").pop()?.toLowerCase() ?? "";
  if (!OK.includes(ext)) return new Response("Type not allowed", { status: 400 });
  const name = `${randomBytes(8).toString("hex")}.${ext}`;
  await mkdir(UPLOAD_DIR, { recursive: true });
  await writeFile(path.join(UPLOAD_DIR, name), Buffer.from(await f.arrayBuffer()));
  return Response.json({ url: `/files/${name}` });
}
