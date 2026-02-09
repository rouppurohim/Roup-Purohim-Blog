# Panduan Deployment ke Cloudflare Pages

Berikut adalah langkah-langkah untuk men-deploy website **Roup Purohim Blog** ke Cloudflare Pages. Cloudflare Pages adalah hosting gratis dan cepat yang sangat cocok untuk project React/Vite seperti ini.

## Tahap 1: Persiapan Git (Di Terminal VS Code)

Sebelum deploy, kita harus memastikan semua perubahan terbaru sudah tersimpan di GitHub.

1.  **Buka Terminal** di VS Code (Ctrl+`).
2.  Jalankan perintah berikut satu per satu:

```bash
# 1. Cek status file yang berubah
git status

# 2. Masukkan semua perubahan ke staging area
git add .

# 3. Simpan perubahan dengan pesan commit
git commit -m "Final content update: Home, Playbook, About, and Footer"

# 4. Push ke repository GitHub Anda
git push origin main
```

> **Note:** Pastikan tidak ada error saat `git push`. Jika sukses, lanjut ke Tahap 2.

---

## Tahap 2: Setup di Cloudflare Pages

1.  **Login** ke Dashboard Cloudflare: [https://dash.cloudflare.com/](https://dash.cloudflare.com/)
2.  Di menu sebelah kiri, pilih **Workers & Pages**.
3.  Klik tombol biru **Create application**.
4.  Pilih tab **Pages** -> Klik **Connect to Git**.
5.  Pilih **GitHub** dan login jika diminta.
6.  Pilih Repository project ini (misal: `roup-purohim-blog` atau nama repo Anda).
7.  Klik **Begin setup**.

---

## Tahap 3: Konfigurasi Build (PENTING!)

Di halaman "Set up builds and deployments", isi konfigurasi berikut:

*   **Project name:** (Bebas, misal: `roup-purohim`)
*   **Production branch:** `main`
*   **Framework preset:** Pilih **Vite** (Karena kita pakai Vite).
    *   *Jika tidak ada pilihan Vite, isi manual:*
    *   **Build command:** `npm run build`
    *   **Build output directory:** `dist`
*   **Environment variables:** (Kosongkan saja untuk saat ini, kecuali Anda punya env var khusus).

Klik **Save and Deploy**.

---

## Tahap 4: Menunggu Deployment

1.  Cloudflare akan mulai memproses:
    *   Initializing build environment...
    *   Cloning repository...
    *   Building application...
    *   Deploying to Cloudflare global network...
2.  Tunggu hingga muncul status **Success! Your site is deployed!**
3.  Klik link yang diberikan (biasanya `https://[project-name].pages.dev`).

---

## Tahap 5: Custom Domain (Opsional)

Jika Anda sudah punya domain sendiri (misal: `roup.me`):

1.  Buka tab **Custom domains** di dashboard project Pages Anda.
2.  Klik **Set up a custom domain**.
3.  Masukkan nama domain Anda.
4.  Ikuti instruksi untuk update DNS record di penyedia domain Anda (biasanya menamambahkan CNAME record).

---

**Selamat! Website Anda sudah live dan bisa diakses seluruh dunia dengan performa tinggi.** 🚀
