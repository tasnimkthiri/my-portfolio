# Tasnim Kthiri, portfolio (Next.js 15 + PostgreSQL + Admin)

Public site with animations, certifications, projects and a contact form (saved in the database and emailed to you).
Everything is editable at `/admin`: profile, photos, CV, projects, certifications, experience, skills, messages.

## 1. Run it locally with Docker
1. Install Docker Desktop. Copy `.env.example` to `.env` and fill it in (POSTGRES_PASSWORD, ADMIN_PASSWORD, AUTH_SECRET, RESEND_API_KEY, CONTACT_EMAIL).
2. `docker compose up -d --build`
3. Open http://localhost:3000 (site) and http://localhost:3000/admin (log in with ADMIN_PASSWORD).
First start creates the tables and loads your CV, certificates and photo automatically.
Logs: `docker compose logs -f app`. Stop: `docker compose down` (data is kept in volumes).

## 2. Send it to GitHub
1. Create an empty repository on github.com (do not add a README there).
2. In the project folder:
```
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USER/portfolio.git
git push -u origin main
```
Never commit `.env` (already in `.gitignore`). The workflow in `.github/workflows/ci.yml` checks every push.

## 3. Deploy on a VPS (Ubuntu 22.04/24.04)
1. Buy a small VPS (2 GB RAM) and a domain. Point the domain's A record to the VPS IP.
2. Connect: `ssh root@YOUR_IP`, then install Docker: `curl -fsSL https://get.docker.com | sh`
3. `git clone https://github.com/YOUR_USER/portfolio.git && cd portfolio`
4. `cp .env.example .env && nano .env` (set DOMAIN=yourdomain.com and strong passwords)
5. `docker compose --profile prod up -d --build` (Caddy gets a free HTTPS certificate automatically).
6. Update the site later: `git pull && docker compose --profile prod up -d --build`
7. Backup the database: `docker compose exec db pg_dump -U portfolio portfolio > backup.sql`
Content you add in /admin (including uploaded photos) lives in Docker volumes, so updates never erase it.

## 4. Contact email (Resend)
Create a free account at resend.com, make an API key, put it in RESEND_API_KEY and your inbox in CONTACT_EMAIL.
Without a verified domain, Resend only delivers to the email you signed up with. To send from your own domain, verify it in Resend. Test with the form on your site; messages also appear in /admin > Messages.

## Alternative: Vercel + Neon
Works for the site and database, but uploads are written to disk, which Vercel does not keep. Use the VPS route, or ask to switch uploads to cloud storage.

## Security notes
Change ADMIN_PASSWORD and AUTH_SECRET before going live. Rate limiting on login and contact is in memory (resets on restart).
