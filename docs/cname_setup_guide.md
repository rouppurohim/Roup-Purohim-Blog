# Panduan Setting DNS untuk Domain `roup.me`

Untuk menghubungkan domain **roup.me** ke website Anda (`roupme.pages.dev`), ikuti langkah spesifik berikut.

## Langkah 1: Tambahkan Domain di Cloudflare Pages
1.  Buka Dashboard Cloudflare Pages > Project `roupme`.
2.  Masuk ke tab **Custom domains**.
3.  Klik **Set up a custom domain**.
4.  Masukkan `roup.me` dan klik **Continue**.
5.  Cloudflare akan memberikan instruksi DNS record yang harus Anda tambahkan di tempat Anda membeli domain.

## Langkah 2: Konfigurasi DNS (Di Registrar Domain Anda)

Karena `roup.me` adalah **Root Domain** (tanpa www), setting-nya sedikit berbeda tergantung fitur penyedia domain Anda.

### Opsi A: Jika Penyedia Domain Mendukung CNAME/ALIAS untuk Root (@) - (Recommended)
Cari fitur bernama `CNAME Flattening`, `ALIAS Record`, atau `ANAME`.
1.  **Type:** `CNAME` (atau `ALIAS` / `ANAME`)
2.  **Name/Host:** `@` (atau kosong)
3.  **Target/Value:** `roupme.pages.dev`
4.  **Simpan.**

### Opsi B: Jika Penyedia Domain HANYA Mendukung Subdomain (WWW)
Jika Anda tidak bisa membuat CNAME untuk `@`:
1.  Buat **CNAME Record** untuk `www`:
    *   **Type:** `CNAME`
    *   **Name/Host:** `www`
    *   **Target/Value:** `roupme.pages.dev`
2.  Gunakan fitur **URL Forwarding / Redirection** di panel domain Anda:
    *   **Source:** `roup.me` (tanpa www)
    *   **Destination:** `https://www.roup.me`
    *   **Type:** Permanent (301)

### Opsi C: Pindah DNS ke Cloudflare (Paling Stabil)
Cara paling mudah dan gratis adalah menggunakan Nameserver Cloudflare.
1.  Di Cloudflare Dashboard, tambah site `roup.me` (bukan di Pages, tapi di menu utama "Add Site").
2.  Pilih plan **Free**.
3.  Cloudflare akan memberi 2 Nameserver (contoh: `bob.ns.cloudflare.com` & `lola.ns.cloudflare.com`).
4.  Masuk ke panel domain Anda, cari menu **Nameservers**.
5.  Ganti Nameserver lama dengan Nameserver dari Cloudflare.
6.  Tunggu propagasi. Setelah aktif, Cloudflare otomatis mengatur DNS record `roup.me` ke `roupme.pages.dev`.

## Verifikasi
Setelah setting selesai, tunggu 1x24 jam (biasanya lebih cepat). Status di dashboard Custom Domains akan berubah menjadi **Active** (Hijau).
