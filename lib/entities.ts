export type F = { n: string; l: string; t: "text" | "area" | "tags" | "num" | "img" | "imgs" | "file" | "sel"; o?: string[] };
export type Ent = { model: string; label: string; f: F[]; title: (r: any) => string; single?: boolean };
export const E: Record<string, Ent> = {
  profile: { model: "profile", label: "Profile", single: true, title: (r) => r.name, f: [
    { n: "name", l: "Full name", t: "text" }, { n: "role", l: "Role / title", t: "text" }, { n: "headline", l: "Hero headline", t: "text" },
    { n: "intro", l: "Hero intro", t: "area" }, { n: "bio", l: "About me", t: "area" }, { n: "pills", l: "Floating pills (comma separated)", t: "tags" },
    { n: "stats", l: "Stats, one per line as value|label", t: "tags" }, { n: "photo", l: "Main photo", t: "img" }, { n: "photo2", l: "Second photo", t: "img" },
    { n: "cvUrl", l: "CV (PDF)", t: "file" }, { n: "email", l: "Email", t: "text" }, { n: "phone", l: "Phone", t: "text" },
    { n: "location", l: "Location", t: "text" }, { n: "linkedin", l: "LinkedIn URL", t: "text" }, { n: "github", l: "GitHub URL", t: "text" }] },
  project: { model: "project", label: "Projects", title: (r) => r.title, f: [
    { n: "title", l: "Title", t: "text" }, { n: "summary", l: "Short summary", t: "text" }, { n: "details", l: "Full details", t: "area" },
    { n: "tech", l: "Technologies (comma separated)", t: "tags" }, { n: "liveUrl", l: "Live URL", t: "text" }, { n: "repoUrl", l: "Repository URL", t: "text" },
    { n: "cover", l: "Cover photo", t: "img" }, { n: "images", l: "Gallery photos", t: "imgs" }, { n: "order", l: "Order (0 = first)", t: "num" }] },
  certification: { model: "certification", label: "Certifications", title: (r) => r.title, f: [
    { n: "title", l: "Title", t: "text" }, { n: "issuer", l: "Issuer", t: "text" }, { n: "date", l: "Date", t: "text" },
    { n: "image", l: "Certificate image", t: "img" }, { n: "url", l: "Credential link", t: "text" }, { n: "order", l: "Order (0 = first)", t: "num" }] },
  entry: { model: "entry", label: "Experience & more", title: (r) => `${r.kind}: ${r.title}`, f: [
    { n: "kind", l: "Type", t: "sel", o: ["work", "lead", "edu", "award"] }, { n: "title", l: "Title", t: "text" }, { n: "org", l: "Organisation", t: "text" },
    { n: "place", l: "Place", t: "text" }, { n: "period", l: "Period", t: "text" }, { n: "details", l: "Details (one point per line)", t: "area" }, { n: "order", l: "Order", t: "num" }] },
  skill: { model: "skill", label: "Skills", title: (r) => r.category, f: [
    { n: "category", l: "Category", t: "text" }, { n: "items", l: "Skills (comma separated)", t: "tags" }, { n: "order", l: "Order", t: "num" }] },
};
