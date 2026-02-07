// scripts/generate-sitemap.mjs
// Run this during build: node scripts/generate-sitemap.mjs

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://roup.me';

// Static routes
const STATIC_ROUTES = [
    '/',
    '/insights',
    '/resources',
    '/about',
    '/work-with-me',
    '/playbook',
];

// Mock posts - in production, import from a shared source or CMS
const MOCK_POSTS = [
    { slug: 'crackership-methodology' },
    { slug: 'retailer-psychology-101' },
    { slug: 'ai-field-audit-revolution' },
];

function generateSitemap() {
    const staticUrls = STATIC_ROUTES.map(route => `
  <url>
    <loc>${SITE_URL}/#${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('');

    const postUrls = MOCK_POSTS.map(post => `
  <url>
    <loc>${SITE_URL}/#/${post.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticUrls}
  ${postUrls}
</urlset>`;

    const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, sitemap.trim());
    console.log('✅ Sitemap generated at public/sitemap.xml');
}

generateSitemap();
