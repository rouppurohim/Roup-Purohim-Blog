# Cloudflare D1 Backend Setup

Panduan lengkap untuk setup backend Cloudflare D1 dan mengaktifkan fitur **Publish to Blog** di Admin Panel.

## Arsitektur

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────┐
│   Admin Panel   │────▶│  Hono API        │────▶│ Cloudflare  │
│   (React)       │     │  (functions/)    │     │ D1 Database │
└─────────────────┘     └──────────────────┘     └─────────────┘
```

## File yang Dibuat

| File | Deskripsi |
|------|-----------|
| `wrangler.toml` | Konfigurasi Cloudflare Pages + D1 binding |
| `db/schema.sql` | Schema database SQLite untuk tabel posts |
| `functions/api/[[path]].ts` | API Routes menggunakan Hono framework |
| `hooks/usePosts.ts` | React hooks untuk fetch data dari API |

---

## Langkah 1: Install Wrangler CLI

```bash
npm install wrangler --save-dev --legacy-peer-deps
```

## Langkah 2: Login ke Cloudflare

```bash
npx wrangler login
```

Browser akan terbuka untuk autentikasi. Ikuti instruksi di layar.

## Langkah 3: Buat Database D1

```bash
npx wrangler d1 create roup-blog-db
```

**Output yang dihasilkan:**

```
✅ Successfully created DB 'roup-blog-db' in region APAC
Created your new D1 database.

[[d1_databases]]
binding = "DB"
database_name = "roup-blog-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"   <-- COPY INI
```

## Langkah 4: Update `wrangler.toml`

Buka file `wrangler.toml` dan ganti `PLACEHOLDER_DATABASE_ID` dengan `database_id` dari output di atas:

```toml
name = "roup-purohim-blog"
compatibility_date = "2024-01-01"
pages_build_output_dir = "./dist"

[[d1_databases]]
binding = "DB"
database_name = "roup-blog-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"  # <-- GANTI INI
```

## Langkah 5: Jalankan Schema SQL

```bash
npx wrangler d1 execute roup-blog-db --file=db/schema.sql
```

Perintah ini akan membuat tabel `posts` dengan semua kolom yang diperlukan.

## Langkah 6: Test Lokal dengan Wrangler

```bash
# Build dulu
npm run build

# Jalankan Wrangler Pages dev server
npx wrangler pages dev ./dist
```

Server akan berjalan di `http://localhost:8788`.

---

## API Endpoints

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/posts` | Ambil semua artikel published |
| GET | `/api/posts/:slug` | Ambil artikel berdasarkan slug |
| POST | `/api/posts` | Buat artikel baru (Admin) |
| PUT | `/api/posts/:id` | Update artikel |
| DELETE | `/api/posts/:id` | Hapus artikel |

### Contoh Request POST

```json
{
  "title": "Judul Artikel",
  "slug": "judul-artikel",
  "excerpt": "Ringkasan singkat...",
  "content": "Isi artikel dalam Markdown...",
  "category": "Market Strategy & GTM",
  "featured_image_url": "/gambar.jpg",
  "meta_title": "SEO Title",
  "meta_description": "SEO Description",
  "focus_keyword": "keyword utama",
  "tags": ["tag1", "tag2"],
  "json_ld": { "@type": "Article", ... }
}
```

---

## Deploy ke Cloudflare Pages

### Via Dashboard

1. Push kode ke GitHub
2. Buka [Cloudflare Pages Dashboard](https://dash.cloudflare.com/?to=/:account/pages)
3. Klik **Create a project** → **Connect to Git**
4. Pilih repository
5. Setting build:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
6. Klik **Save and Deploy**

### Via CLI

```bash
npx wrangler pages deploy ./dist
```

---

## Binding D1 di Production

Setelah deploy pertama kali:

1. Buka Cloudflare Pages Dashboard
2. Pilih project `roup-purohim-blog`
3. Pergi ke **Settings** → **Functions** → **D1 database bindings**
4. Klik **Add binding**
   - Variable name: `DB`
   - D1 database: `roup-blog-db`
5. **Save**
6. Re-deploy agar binding aktif

---

## Troubleshooting

### Error: "D1_ERROR: no such table: posts"
Solusi: Jalankan ulang schema SQL
```bash
npx wrangler d1 execute roup-blog-db --file=db/schema.sql
```

### Error: "Cannot find module 'hono'"
Ini normal saat development dengan Vite. Hono hanya dijalankan di Cloudflare Workers runtime.

### API tidak merespons di localhost
Pastikan menggunakan `wrangler pages dev` bukan `npm run dev` untuk test API.

---

## Catatan Penting

> ⚠️ **Development vs Production**
> 
> - `npm run dev` → Frontend saja (mock data)
> - `npx wrangler pages dev ./dist` → Frontend + API (D1 database)

Untuk development sehari-hari, gunakan `npm run dev`. Gunakan `wrangler pages dev` hanya saat testing API atau sebelum deploy.
