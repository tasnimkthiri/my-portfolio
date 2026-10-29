import { db } from "./db";
const o = [{ order: "asc" as const }, { id: "asc" as const }];
export async function getSite() {
  const [profile, entries, skills, projects, certs] = await Promise.all([
    db.profile.findUnique({ where: { id: 1 } }), db.entry.findMany({ orderBy: o }), db.skill.findMany({ orderBy: o }),
    db.project.findMany({ orderBy: o }), db.certification.findMany({ orderBy: o })]);
  return { profile, entries, skills, projects, certs };
}
