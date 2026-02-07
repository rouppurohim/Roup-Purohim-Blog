# Panduan Publish Artikel & Deployment Cloudflare

Blog ini saat ini menggunakan **Static Data** (`constants.tsx`). Berikut adalah cara terbaik mengelolanya sebelum Anda beralih ke Database (Cloudflare D1).

## 1. Cara Menambah Artikel Baru
Semua konten artikel tersimpan di file: `src/constants.tsx`.

### Langkah-langkah:
1.  **Siapkan Gambar**:
    -   Simpan gambar cover artikel di folder `public/`.
    -   Gunakan nama file yang rapi, misal: `cover-artikel-baru.jpg`.
    -   Optimalkan ukuran file (< 200KB).

2.  **Edit `src/constants.tsx`**:
    -   Cari variable `export const MOCK_POSTS`.
    -   Tambahkan object baru di array tersebut paling atas (agar muncul paling depan).

    ```typescript
    {
      id: 101, // Gunakan ID unik (bisa angka acak)
      title: "Judul Artikel Anda",
      slug: "judul-artikel-anda-url-friendly", // URL: website.com/judul-artikel
      excerpt: "Ringkasan pendek artikel untuk tampilan kartu...",
      content: `
      ## Ini Headings
      Tulis konten Anda di sini menggunakan format **Markdown**.
      
      * Poin 1
      * Poin 2
      `,
      category: "Market Strategy & GTM", // Pilih salah satu kategori yang ada
      lang: 'en',
      status: 'published',
      created_at: "2024-05-01",
      featured_image_url: "/cover-artikel-baru.jpg"
    },
    ```

3.  **Simpan & Cek Lokal**:
    -   Pastikan terminal menjalankan `npm run dev`.
    -   Buka `localhost:3000` untuk memastikan artikel muncul dan formating Markdown rapi.

---

## 2. Deployment ke Cloudflare (Live)
Untuk membuat website "Live" di internet, cara termudah dan gratis adalah menggunakan **Cloudflare Pages**.

### Best Practice Setup:
1.  **Push ke GitHub**:
    -   Pastikan project ini sudah di-upload ke repository GitHub.
    -   Setiap kali Anda selesai mengedit `constants.tsx` di laptop, lakukan:
        ```bash
        git add .
        git commit -m "Menambah artikel baru"
        git push origin main
        ```

2.  **Hubungkan Cloudflare Pages**:
    -   Login ke dashboard.cloudflare.com > **Pages**.
    -   Klik **Create a project** > **Connect to Git**.
    -   Pilih repository GitHub project ini.
    -   **Build Settings** (Penting!):
        -   **Framework Preset**: Vite
        -   **Build Command**: `npm run build`
        -   **Output Directory**: `dist`
    -   Klik **Save and Deploy**.

### Cara Update Selanjutnya:
Setelah setup awal selesai, Anda **TIDAK PERLU** membuka Cloudflare lagi.
Cukup lakukan langkah **Push ke GitHub** tadi. Cloudflare akan otomatis mendeteksi perubahan, mem-build ulang website, dan artikel baru akan live dalam 1-2 menit.

---

## 3. Roadmap Masa Depan (Dynamic CMS)
Jika artikel sudah mencapai puluhan atau ratusan, mengedit file coding (`constants.tsx`) akan merepotkan.
Rencana *Next Level* sesuai kode `AdminInit.tsx` Anda:
*   **Database**: Pindahkan data JSON ke Cloudflare D1 (SQLite).
*   **Backend**: Gunakan HonoJS (sudah ada draft-nya) untuk membuat API.
*   **CMS**: Buat halaman admin sederhana untuk *Input Form* agar tidak perlu menyentuh kode lagi.
