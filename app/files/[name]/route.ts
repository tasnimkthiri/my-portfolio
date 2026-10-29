import { readFile } from "node:fs/promises";
import path from "node:path";
const T: Record<string, string> = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp", gif: "image/gif", pdf: "application/pdf" };
export async function GET(_: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  if (!/^[a-f0-9]{16}\.(jpg|jpeg|png|webp|gif|pdf)$/.test(name)) return new Response("Not found", { status: 404 });
  try {
    const buf = await readFile(path.join(process.env.UPLOAD_DIR || path.join(process.cwd(), "uploads"), name));
    return new Response(buf, { headers: { "Content-Type": T[name.split(".")[1]], "Cache-Control": "public, max-age=31536000, immutable" } });
  } catch { return new Response("Not found", { status: 404 }); }
}
