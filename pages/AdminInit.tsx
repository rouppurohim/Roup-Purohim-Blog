
import React from 'react';

const AdminInit: React.FC = () => {
  const wranglerToml = `
name = "roup-purohim-hub"
main = "src/index.tsx"
compatibility_date = "2024-03-01"

[[d1_databases]]
binding = "DB"
database_name = "roup_authority_db"
database_id = "your-d1-id-here"

[[r2_buckets]]
binding = "BUCKET"
bucket_name = "roup-assets-v2"
  `.trim();

  const sqlSchema = `
-- Table for Bilingual Blog Posts
CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  lang TEXT DEFAULT 'en', -- 'en' or 'id'
  status TEXT DEFAULT 'draft',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  featured_image_url TEXT
);

-- Table for Case Studies
CREATE TABLE IF NOT EXISTS case_studies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_name TEXT NOT NULL,
  metric_achieved TEXT,
  description TEXT,
  year INTEGER,
  lang TEXT DEFAULT 'en'
);

-- Table for Social Proof
CREATE TABLE IF NOT EXISTS testimonials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  position TEXT,
  company TEXT,
  quote TEXT,
  avatar_url TEXT
);

-- Table for R2 Gallery
CREATE TABLE IF NOT EXISTS gallery (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  r2_url TEXT NOT NULL,
  caption TEXT,
  category TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
  `.trim();

  const honoApp = `
import { Hono } from 'hono';
import { html } from 'hono/html';
import { jsx } from 'hono/jsx';

type Bindings = {
  DB: D1Database;
  BUCKET: R2Bucket;
};

const app = new Hono<{ Bindings: Bindings }>();

// Layout Wrapper with SSR optimization
const PageLayout = ({ children, title, lang }: { children: any, title: string, lang: string }) => html\`
  <!DOCTYPE html>
  <html lang="\${lang}">
    <head>
      <meta charset="UTF-8" />
      <title>\${title} | Roup Purohim</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-[#F4F6F7] text-slate-900">
      \${children}
    </body>
  </html>
\`;

// API & Route Logic
app.get('/api/posts/:lang', async (c) => {
  const lang = c.req.param('lang');
  const { results } = await c.env.DB.prepare(
    "SELECT * FROM posts WHERE lang = ? AND status = 'published' ORDER BY created_at DESC"
  ).bind(lang).all();
  return c.json(results);
});

// Post Detail Logic
app.get('/:slug', async (c) => {
  const slug = c.req.param('slug');
  const post = await c.env.DB.prepare("SELECT * FROM posts WHERE slug = ?").bind(slug).first();
  if (!post) return c.notFound();
  
  return c.html(
    <PageLayout title={post.title as string} lang={post.lang as string}>
      <main className="max-w-3xl mx-auto py-20 px-4">
        <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
        <div className="prose lg:prose-xl">{post.content}</div>
      </main>
    </PageLayout>
  );
});

export default app;
  `.trim();

  return (
    <div className="py-20 bg-[#0f172a] text-slate-300 font-mono text-xs">
      <div className="max-w-[1000px] mx-auto px-4">
        <h1 className="text-2xl font-bold text-white mb-8 border-b border-slate-800 pb-4">Authority Hub Deployment Core</h1>
        
        <div className="grid grid-cols-1 gap-12">
          <section>
            <h2 className="text-accent font-bold mb-4 uppercase tracking-widest">1. Cloudflare Environment</h2>
            <pre className="bg-black/50 p-6 rounded-xl border border-slate-800 overflow-x-auto text-green-500">
              {wranglerToml}
            </pre>
          </section>

          <section>
            <h2 className="text-accent font-bold mb-4 uppercase tracking-widest">2. Relational Schema (Bilingual)</h2>
            <pre className="bg-black/50 p-6 rounded-xl border border-slate-800 overflow-x-auto text-blue-400">
              {sqlSchema}
            </pre>
          </section>

          <section>
            <h2 className="text-accent font-bold mb-4 uppercase tracking-widest">3. Hono Edge Controller</h2>
            <pre className="bg-black/50 p-6 rounded-xl border border-slate-800 overflow-x-auto text-yellow-500">
              {honoApp}
            </pre>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminInit;
