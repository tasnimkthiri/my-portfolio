"use client";
import { useState } from "react";
export default function ContactForm() {
  const [s, setS] = useState<"idle" | "sending" | "ok" | "err">("idle");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setS("sending"); const form = e.currentTarget;
    const r = await fetch("/api/contact", { method: "POST", body: JSON.stringify(Object.fromEntries(new FormData(form))) });
    setS(r.ok ? "ok" : "err"); if (r.ok) form.reset();
  }
  return (
    <form onSubmit={submit} className="grid gap-4">
      <label className="grid gap-1 font-medium">Your name<input name="name" required maxLength={100} /></label>
      <label className="grid gap-1 font-medium">Your email<input name="email" type="email" required maxLength={150} /></label>
      <label className="grid gap-1 font-medium">Your message<textarea name="body" rows={5} required maxLength={3000} /></label>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <button className="btn" disabled={s === "sending"}>{s === "sending" ? "Sending…" : "Send message"}</button>
      <p role="status" aria-live="polite">{s === "ok" && "Thank you! Your message was sent."}{s === "err" && "Something went wrong. Please try again or email me directly."}</p>
    </form>
  );
}
