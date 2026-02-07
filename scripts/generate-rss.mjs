// scripts/generate-rss.mjs
// Run this during build: node scripts/generate-rss.mjs

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://roup.me';
const SITE_TITLE = 'Roup Purohim | Crackership Strategist';
const SITE_DESCRIPTION = 'Strategic insights on agrochemical demand creation, GTM architecture, and channel mastery.';

// Mock posts - in production, import from a shared source or CMS
const MOCK_POSTS = [
    {
        id: 1,
        slug: 'crackership-methodology',
        title: 'The Crackership Methodology',
        excerpt: 'Transforming agronomists into demand creation engines through strategic commercial literacy.',
        category: 'Market Strategy & GTM',
        created_at: '2025-01-15',
    },
    {
        id: 2,
        slug: 'retailer-psychology-101',
        title: 'Retailer Psychology 101',
        excerpt: 'Understanding the kiosk owner mindset and converting passive stockists into active partners.',
        category: 'Demand Creation Strategy',
        created_at: '2025-01-10',
    },
    {
        id: 3,
        slug: 'ai-field-audit-revolution',
        title: 'The AI Field Audit Revolution',
        excerpt: 'How GPT-powered tools are transforming agronomist productivity and demo validation.',
        category: 'AI-Driven Agribusiness',
        created_at: '2025-01-05',
    },
];

function generateRSS() {
    const items = MOCK_POSTS.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE_URL}/#/${post.slug}</link>
      <description><![CDATA[${post.excerpt}]]></description>
      <category>${post.category}</category>
      <pubDate>${new Date(post.created_at).toUTCString()}</pubDate>
      <guid>${SITE_URL}/#/${post.slug}</guid>
    </item>
  `).join('');

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_TITLE}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

    const outputPath = path.join(__dirname, '..', 'public', 'rss.xml');
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, rss.trim());
    console.log('✅ RSS feed generated at public/rss.xml');
}

generateRSS();
