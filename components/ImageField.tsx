"use client";
import { useState } from "react";
export default function ImageField({ name, label, multiple = false, file = false, initial = "" }: { name: string; label: string; multiple?: boolean; file?: boolean; initial?: string }) {
  const [urls, setUrls] = useState<string[]>(initial.split("\n").filter(Boolean));
  const [busy, setBusy] = useState(false);
  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setBusy(true);
    for (const f of Array.from(e.target.files ?? [])) {
      const fd = new FormData(); fd.append("file", f);
      const r = await fetch("/api/upload", { method: "POST", body: fd });
      if (r.ok) { const { url } = await r.json(); setUrls((u) => (multiple ? [...u, url] : [url])); } else alert("Upload failed (image or PDF, max 15 MB).");
    }
    setBusy(false);
  }
  return (
    <div className="grid gap-2"><span className="font-medium">{label}</span>
      <input type="file" aria-label={label} accept={file ? "application/pdf,image/*" : "image/*"} multiple={multiple} onChange={onChange} />
      <input type="hidden" name={name} value={urls.join("\n")} />
      {busy && <p className="text-sm text-soft">Uploading…</p>}
      <div className="flex gap-2 flex-wrap">{urls.map((u) => (
        <span key={u} className="relative">{/\.pdf$/i.test(u) ? <a className="underline" href={u} target="_blank">PDF file</a> : <img src={u} alt="" className="h-16 rounded-lg" />}
          <button type="button" aria-label="Remove" onClick={() => setUrls(urls.filter((x) => x !== u))} className="absolute -top-2 -right-2 bg-ink text-white rounded-full w-5 h-5 text-xs">×</button></span>))}</div>
    </div>
  );
}
