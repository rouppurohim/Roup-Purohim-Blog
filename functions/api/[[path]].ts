import { Hono } from 'hono';
import { cors } from 'hono/cors';

type Bindings = {
    DB: D1Database;
    BUCKET: R2Bucket;
};

const app = new Hono<{ Bindings: Bindings }>().basePath('/api');

// Enable CORS for development
app.use('*', cors());

// GET /api/posts - List all published posts
app.get('/posts', async (c) => {
    try {
        const { results } = await c.env.DB.prepare(
            `SELECT id, title, slug, excerpt, category, lang, status, created_at, featured_image_url, 
              meta_title, meta_description, focus_keyword, tags, json_ld
       FROM posts 
       WHERE status = 'published' 
       ORDER BY created_at DESC`
        ).all();

        // Parse JSON fields
        const posts = results.map((post: any) => ({
            ...post,
            tags: post.tags ? JSON.parse(post.tags) : [],
            json_ld: post.json_ld ? JSON.parse(post.json_ld) : null,
            seo: {
                meta_title: post.meta_title,
                meta_description: post.meta_description,
                focus_keyword: post.focus_keyword,
                tags: post.tags ? JSON.parse(post.tags) : [],
                json_ld: post.json_ld ? JSON.parse(post.json_ld) : null
            }
        }));

        return c.json({ success: true, data: posts });
    } catch (error: any) {
        return c.json({ success: false, error: error.message }, 500);
    }
});

// GET /api/posts/:slug - Get single post by slug
app.get('/posts/:slug', async (c) => {
    try {
        const slug = c.req.param('slug');
        const post: any = await c.env.DB.prepare(
            `SELECT * FROM posts WHERE slug = ?`
        ).bind(slug).first();

        if (!post) {
            return c.json({ success: false, error: 'Post not found' }, 404);
        }

        // Parse JSON fields
        post.tags = post.tags ? JSON.parse(post.tags) : [];
        post.json_ld = post.json_ld ? JSON.parse(post.json_ld) : null;
        post.seo = {
            meta_title: post.meta_title,
            meta_description: post.meta_description,
            focus_keyword: post.focus_keyword,
            tags: post.tags,
            json_ld: post.json_ld
        };

        return c.json({ success: true, data: post });
    } catch (error: any) {
        return c.json({ success: false, error: error.message }, 500);
    }
});

// POST /api/posts - Create new post
app.post('/posts', async (c) => {
    try {
        const body = await c.req.json();
        const {
            title, slug, excerpt, content, category, lang, status,
            featured_image_url, meta_title, meta_description, focus_keyword, tags, json_ld
        } = body;

        // Validate required fields
        if (!title || !slug || !content || !category) {
            return c.json({ success: false, error: 'Missing required fields' }, 400);
        }

        const result = await c.env.DB.prepare(
            `INSERT INTO posts (title, slug, excerpt, content, category, lang, status, featured_image_url, meta_title, meta_description, focus_keyword, tags, json_ld)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        ).bind(
            title,
            slug,
            excerpt || '',
            content,
            category,
            lang || 'en',
            status || 'published',
            featured_image_url || '',
            meta_title || title,
            meta_description || excerpt || '',
            focus_keyword || '',
            JSON.stringify(tags || []),
            JSON.stringify(json_ld || {})
        ).run();

        return c.json({ success: true, message: 'Post created successfully', id: result.meta.last_row_id });
    } catch (error: any) {
        if (error.message.includes('UNIQUE constraint failed')) {
            return c.json({ success: false, error: 'Slug already exists' }, 400);
        }
        return c.json({ success: false, error: error.message }, 500);
    }
});

// PUT /api/posts/:id - Update post
app.put('/posts/:id', async (c) => {
    try {
        const id = c.req.param('id');
        const body = await c.req.json();
        const {
            title, slug, excerpt, content, category, lang, status,
            featured_image_url, meta_title, meta_description, focus_keyword, tags, json_ld
        } = body;

        await c.env.DB.prepare(
            `UPDATE posts SET 
        title = ?, slug = ?, excerpt = ?, content = ?, category = ?, lang = ?, status = ?,
        featured_image_url = ?, meta_title = ?, meta_description = ?, focus_keyword = ?, 
        tags = ?, json_ld = ?, updated_at = datetime('now')
       WHERE id = ?`
        ).bind(
            title, slug, excerpt, content, category, lang, status,
            featured_image_url, meta_title, meta_description, focus_keyword,
            JSON.stringify(tags || []), JSON.stringify(json_ld || {}), id
        ).run();

        return c.json({ success: true, message: 'Post updated successfully' });
    } catch (error: any) {
        return c.json({ success: false, error: error.message }, 500);
    }
});

// POST /api/upload - Upload image to R2
app.post('/upload', async (c) => {
    try {
        const body = await c.req.parseBody();
        const file = body['file'];

        if (!(file instanceof File)) {
            return c.json({ success: false, error: 'No file uploaded' }, 400);
        }

        const fileName = `${Date.now()}-${file.name}`;
        await c.env.BUCKET.put(fileName, file);

        // Assuming R2 bucket is public or served via custom domain
        // For dev/preview, we might need a specific domain. 
        // Using a placeholder domain or relative path if served via this same worker (which handles /api/* only right now).
        // Best practice: Use a public bucket domain or another route to serve.
        const imageUrl = `/cdn-cgi/imagedelivery/${fileName}`; // Placeholder pattern or specific R2 public URL
        // Actually, for simple R2 public access usually it's https://pub-<id>.r2.dev/<key> or custom domain.
        // Let's return the key for now, or a constructed URL if user provides configured domain.
        // For this setup, we'll return a relative path assuming we might set up a proxy or just the key.
        
        return c.json({ 
            success: true, 
            message: 'Image uploaded successfully', 
            url: fileName, // Client should know base URL or we configure it
            key: fileName 
        });
    } catch (error: any) {
        return c.json({ success: false, error: error.message }, 500);
    }
});

// DELETE /api/posts/:id - Delete post
app.delete('/posts/:id', async (c) => {
    try {
        const id = c.req.param('id');
        await c.env.DB.prepare(`DELETE FROM posts WHERE id = ?`).bind(id).run();
        return c.json({ success: true, message: 'Post deleted successfully' });
    } catch (error: any) {
        return c.json({ success: false, error: error.message }, 500);
    }
});

// Cloudflare Pages Functions handler
export const onRequest = app.fetch;
