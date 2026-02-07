# Mengamankan Halaman Admin dengan Cloudflare Zero Trust

Panduan ini akan membantu Anda mengunci halaman `/admin` sehingga hanya email yang diizinkan (email Anda) yang bisa mengaksesnya. Ini adalah standar keamanan enterprise (Zero Trust).

## Kenapa Zero Trust?
- **Tanpa Password:** Login menggunakan Kode OTP ke Email Anda.
- **Tanpa IP Whitelist:** Bisa login dari mana saja (HP/Laptop) asal punya akses email.
- **Gratis:** Cloudflare memberikan kuota gratis hingga 50 user.

---

## Langkah 1: Setup Cloudflare Zero Trust

1.  Login ke **Dashboard Cloudflare** (dash.cloudflare.com).
2.  Di menu sebelah kiri, klik **Zero Trust**.
3.  Pilih **Access** -> **Applications**.
4.  Klik **Add an Application**.
5.  Pilih **Self-hosted**.

## Langkah 2: Konfigurasi Aplikasi

Isi form dengan detail berikut:

-   **Application name:** `Admin Blog`
-   **Session Duration:** `24 hours` (atau sesuai keinginan)
-   **Application domain:**
    -   Subdomain: `admin` (jika blog Anda ada di www.domain.com/admin, tapi karena ini path, lihat bawah)
    -   Domain: `tulis-domain-anda.com`
    -   Path: `admin` (ini yang penting! Kita hanya kunci `/admin`)

Klik **Next**.

## Langkah 3: Atur Kebijakan Akses (Policy)

Bagian ini menentukan SIAPA yang boleh masuk.

-   **Policy name:** `Allow Owner`
-   **Action:** `Allow`
-   **Session duration:** `Same as application`

**Configure rules:**
-   **Include:**
    -   Selector: **Emails**
    -   Value: `email.anda@gmail.com` (Ganti dengan email pribadi Anda)

Klik **Next**.

## Langkah 4: Setup Authentication (Login Method)

1.  Di tab **Authentication**, pastikan **One-time PIN** aktif (biasanya default).
2.  Ini artinya Cloudflare akan mengirimkan kode 6 digit ke email Anda setiap kali ingin login.
3.  Klik **Add application**.

---

## Selesai! 🎉

Sekarang coba buka `https://domain-anda.com/admin`.
Anda akan dihadang oleh layar login Cloudflare.
1.  Masukkan email Anda.
2.  Cek inbox, ambil kode PIN.
3.  Masukkan kode -> Masuk ke Dashboard Admin.

Hacker tidak akan bisa melihat halaman login admin sama sekali tanpa akses email Anda.

---

### Catatan Tambahan:
-   Pastikan domain blog Anda sudah terhubung ke Cloudflare (DNS di-manage Cloudflare).
-   Jika masih menggunakan `*.pages.dev`, Anda bisa tetap menggunakan Access dengan mengatur policy pada custom domain `rouppurohim.pages.dev` (path: `admin`).
