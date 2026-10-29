import "./globals.css";
export const metadata = { title: "Tasnim Kthiri | AI & Software", description: "Portfolio of Tasnim Kthiri: Business Information Systems student, AI and software development.", openGraph: { title: "Tasnim Kthiri | Portfolio", type: "website" } };
export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;700&family=Figtree:wght@400;500;600&display=swap" />
      </head>
      <body>{children}</body>
    </html>
  );
}