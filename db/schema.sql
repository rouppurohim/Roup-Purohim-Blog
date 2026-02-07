-- Cloudflare D1 Schema for Roup Purohim Blog
-- Run: npx wrangler d1 execute roup-blog-db --file=db/schema.sql

CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    lang TEXT DEFAULT 'en',
    status TEXT DEFAULT 'published',
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    featured_image_url TEXT,
    
    -- SEO Fields
    meta_title TEXT,
    meta_description TEXT,
    focus_keyword TEXT,
    tags TEXT, -- JSON array as string
    json_ld TEXT -- JSON object as string
);

-- Index for faster slug lookups
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
