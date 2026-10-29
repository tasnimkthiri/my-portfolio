import { PrismaClient } from "@prisma/client";
import fs from "node:fs";
const db = new PrismaClient();
if (await db.profile.count()) { console.log("Already seeded."); process.exit(0); }
const cv = fs.existsSync("public/seed/cv.pdf") ? "/seed/cv.pdf" : "/seed/cv.docx";
await db.profile.create({ data: { id: 1, name: "Tasnim Kthiri", role: "Business Information Systems student",
  headline: "I build smart software and AI that feels calm, clear and a little joyful.",
  intro: "Business Information Systems student at FSEG Sfax with experience in mobile development and RAG-based AI systems. Founder and President of ARSII FSEGS.",
  bio: "I'm a Business Information Systems student at FSEG Sfax, passionate about artificial intelligence, software development and business intelligence. I founded the ARSII student branch at FSEG Sfax, where I organise workshops, hackathons and certification programs, and I now co-supervise the club. This summer I built a mobile app with Flutter and Node.js, and an internal RAG solution with Python and PostgreSQL.",
  photo: "/seed/photo.jpg", photo2: "/seed/photo.jpg", cvUrl: cv, email: "tasnimkthiri16@gmail.com", phone: "+216 97 633 754", location: "Sfax, Tunisia",
  linkedin: "https://linkedin.com/in/tasnim-kthiri", github: "https://github.com/tasnimkthiri",
  pills: ["Artificial intelligence", "RAG systems", "Flutter and Node.js"], stats: ["3|Internships", "2|Podium finishes", "12|Certifications"] } });
const E = (kind, rows) => rows.map((r, i) => ({ kind, order: i, ...r }));
await db.entry.createMany({ data: [
 ...E("work", [
  { title: "Mobile Development Intern", org: "ARSII Sfax", place: "Sfax, Tunisia", period: "Summer 2026", details: "Developed the ARSII Sfax mobile application using Flutter, Node.js/Express and PostgreSQL.\nImplemented role-based features: task management, news, events, messaging and notifications." },
  { title: "AI & Software Development Intern", org: "ZEN Group", place: "Sfax, Tunisia", period: "Summer 2026", details: "Developed an internal AI solution based on Retrieval-Augmented Generation (RAG) using Python and PostgreSQL.\nWorked in Scrum sprints under the guidance of a company mentor." },
  { title: "IT Intern", org: "Protected Consulting", place: "Tunis, Tunisia", period: "July 1 – August 1, 2025", details: "Supported day-to-day IT department tasks and applied programming and database knowledge." }]),
 ...E("lead", [
  { title: "Co-Supervisor", org: "ARSII FSEGS", place: "FSEG Sfax", period: "2026 – Present", details: "ARSII Student Branch, 2026/2027 term." },
  { title: "Founder & President", org: "ARSII FSEGS, AI & Innovation Student Club", place: "FSEG Sfax", period: "2024 – 2026", details: "Founded the student branch at FSEG Sfax and led workshops, training sessions and certifications.\nOrganised Career Expo 2026 with IEEE FSEGS, University Expo 2026 and ARSII Days 2026.\nOrganised two NVIDIA certifications (Deep Learning, Data Science), the AI Night Challenge and a Generative AI with Diffusion Models training." },
  { title: "Active Member", org: "Microsoft Tech Club (MTC) FSEGS", place: "FSEG Sfax", period: "2024 – 2025", details: "" },
  { title: "HR Member", org: "Meta Mind Technology (MMT) Club", place: "FSEG Sfax", period: "2024 – 2025", details: "" }]),
 ...E("edu", [
  { title: "Bachelor's Degree in Business Information Systems", org: "FSEG Sfax", place: "University of Sfax", period: "2024 – Present", details: "First year completed with mention Bien." },
  { title: "Baccalauréat", org: "Tunisia", place: "", period: "2024", details: "" }]),
 ...E("award", [
  { title: "2nd Place, AI Night Challenge 5th Edition", org: "ARSII Sfax App", period: "2026", details: "" },
  { title: "2nd Place, ARSII Days Hackathon", org: "Blockchain Track", period: "2025", details: "" }]) ] });
await db.skill.createMany({ data: [
 { category: "Mobile & Web", items: ["Flutter", "Dart", "React", "Node.js", "Express", "Spring Boot", "PHP", "Laravel", "HTML", "CSS", "JavaScript"] },
 { category: "Programming", items: ["Python", "Java", "C", "SQL", "C#"] },
 { category: "AI & RAG systems", items: ["RAG", "LLM integration", "MCP", "Embeddings", "Semantic search", "Document chunking", "OCR", "Prompt engineering", "Generative AI", "Deep learning"] },
 { category: "Databases & BI", items: ["PostgreSQL", "MySQL", "pgvector", "Business Intelligence", "Excel"] },
 { category: "Tools & methods", items: ["FastAPI", "Git & GitHub", "Docker", "Scrum", "Agile", "ClickUp", "Notion", "Trello", "UML"] },
 { category: "Soft skills", items: ["Leadership", "Event organisation", "Team management", "Public speaking", "Problem solving"] }].map((s, i) => ({ ...s, order: i })) });
await db.project.createMany({ data: [
 { slug: "arsii-sfax-mobile-app", title: "ARSII Sfax mobile app", summary: "Role-based mobile app for the ARSII Sfax community. 2nd place at AI Night Challenge.", details: "A cross-platform mobile application built with Flutter, with a Node.js/Express API and a PostgreSQL database.\n\nFeatures: task management, news, events, messaging and notifications, with different permissions per role.", tech: ["Flutter", "Node.js", "Express", "PostgreSQL"], order: 0 },
 { slug: "internal-rag-assistant", title: "Internal RAG assistant", summary: "AI assistant that answers questions from a company's own documents.", details: "Internal solution developed at ZEN Group using Retrieval-Augmented Generation: documents are chunked, embedded and searched semantically, then passed to a language model to produce grounded answers.\n\nBuilt with Python and PostgreSQL during Scrum sprints.", tech: ["Python", "RAG", "PostgreSQL", "pgvector"], order: 1 }] });
const C = [["GenAI in Action", "GOMYCODE", "July 2026", "genai"], ["Certificate of Appreciation: President", "ARSII FSEGS Club", "2025 – 2026", "president"], ["Fundamentals of Deep Learning", "NVIDIA", "Feb 2026", "nvidia"], ["Fundamentals of Data Science", "NVIDIA", "2026", ""], ["Track A: Big Data, GenAI and RAG in Finance", "ARSII Days 2026", "2026", ""], ["Guinness World Record: startup creation challenge", "University of Sfax", "April 2026", ""], ["Introduction to Business Intelligence", "IEEE FSEGS Student Branch", "Jan 2026", "bi"], ["Digital Marketing Training", "MMT", "Dec 2025", "dm"], ["MagicaCode 12h Ideathon", "Microsoft Tech Club FSEGS", "Dec 2025", "magica"], ["Generative AI with Diffusion Models", "ARSII FSEGS", "Nov 2025", "diffusion"], ["HR Department Member", "MetaMind Technology Club", "2024 – 2025", "mmt_hr"], ["HTML, CSS & GitHub", "Microsoft Tech Club FSEGS", "2024", "html"]];
await db.certification.createMany({ data: C.map(([title, issuer, date, img], i) => ({ title, issuer, date, image: img ? `/seed/${img}.jpg` : "", order: i })) });
console.log("Seeded.");
