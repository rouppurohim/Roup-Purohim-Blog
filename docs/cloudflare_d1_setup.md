# Cloudflare D1 & R2 Backend Setup

Panduan lengkap untuk setup backend Cloudflare D1 (Database) dan R2 (Storage), serta mengaktifkan fitur **Publish to Blog** di Admin Panel.

## Arsitektur

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────┐
│   Admin Panel   │────▶│  Hono API        │────▶│ Cloudflare  │
│   (React)       │     │  (functions/)    │     │ D1 Database │
└─────────────────┘     └──────────────────┘     └─────────────┘
                                   │
                                   └────────────▶┌─────────────┐
                                                 │ Cloudflare  │
                                                 │ R2 Storage  │
                                                 └─────────────┘
```

## File yang Dibuat

| File | Deskripsi |
|------|-----------|
| `wrangler.toml` | Konfigurasi Cloudflare Pages + D1 + R2 binding |
| `db/schema.sql` | Schema database SQLite untuk tabel posts |
| `functions/api/[[path]].ts` | API Routes menggunakan Hono framework (CRUD + Upload) |
| `pages/Admin.tsx` | Admin Panel untuk membuat artikel dan upload gambar |

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

## Langkah 3: Setup D1 Database

1. **Buat Database:**
   ```bash
   npx wrangler d1 create roup-blog-db
   ```
   *Salin `database_id` dari output yang muncul.*

2. **Inisialisasi Schema:**
   ```bash
   npx wrangler d1 execute roup-blog-db --file=db/schema.sql
   ```

## Langkah 4: Setup R2 Storage

1. **Buat Bucket:**
   ```bash
   npx wrangler r2 bucket create roup-blog-assets
   ```

## Langkah 5: Update `wrangler.toml`

Buka file `wrangler.toml` dan pastikan konfigurasi berikut ada. Ganti `database_id` dengan ID asli Anda.

```toml
name = "roup-purohim-blog"
compatibility_date = "2024-01-01"
pages_build_output_dir = "./dist"

[[d1_databases]]
binding = "DB"
database_name = "roup-blog-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" # <-- GANTI DENGAN ID ASLI

[[r2_buckets]]
binding = "BUCKET"
bucket_name = "roup-blog-assets"
```

## Langkah 6: Test Lokal

Untuk menjalankan frontend + backend (termasuk upload gambar):

```bash
# Build projek
npm run build

# Jalankan dengan Wrangler (D1 & R2 binding otomatis)
npx wrangler pages dev ./dist
```
Akses di `http://localhost:8788`.

---

## Deploy ke Cloudflare Pages

### 1. Push ke GitHub
Pastikan semua perubahan sudah di-commit dan di-push ke repository GitHub Anda.

### 2. Setup via Dashboard
1. Buka [Cloudflare Pages Dashboard](https://dash.cloudflare.com/?to=/:account/pages).
2. Connect ke Git repo jika belum.
3. Setting Build:
   - **Command**: `npm run build`
   - **Output directory**: `dist`

### 3. Konfigurasi Binding (PENTING!)
Setelah project dibuat/terdeploy, Anda **HARUS** menambahkan binding secara manual di dashboard agar database dan storage bisa diakses.

1. Buka project `roup-purohim-blog` di dashboard.
2. Pergi ke **Settings** -> **Functions**.
3. Scroll ke bagian **D1 database bindings**:
   - **Variable name**: `DB`
   - **D1 database**: Pilih `roup-blog-db`
4. Scroll ke bagian **R2 bucket bindings**:
   - **Variable name**: `BUCKET`
   - **R2 bucket**: Pilih `roup-blog-assets`
5. **Save** semua perubahan.
6. Pergi ke tab **Deployments** dan lakukan **Retry deployment** (atau push commit baru) agar binding aktif.

---

## Akses Admin
URL: `/admin`
PIN: `120Fathya`

Admin panel sekarang sudah mendukung:
- Membuat artikel baru (Text & Markdown).
- **Upload gambar langsung** (tersimpan otomatis di R2).
- Auto-generate slug dan SEO metadata.
