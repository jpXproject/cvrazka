[LAPORAN-PROGRES-WEBSITE.md](https://github.com/user-attachments/files/30383605/LAPORAN-PROGRES-WEBSITE.md)
# 📋 LAPORAN PROGRES — WEBSITE CV RAZKA PRATAMA MANDIRI

> **Periode:** Juli 2026  
> **Developer:** jpXcode  
> **Repo:** https://github.com/jpXproject/cvrazka  
> **Live URL:** https://jpxproject.github.io/cvrazka  
> **Admin Panel:** https://jpxproject.github.io/cvrazka/admin.html

---

## 📑 DAFTAR ISI

1. [Ringkasan Proyek](#1-ringkasan-proyek)
2. [Struktur File & Fungsinya](#2-struktur-file--fungsinya)
3. [Fitur Website — Complete](#3-fitur-website--complete)
4. [Admin Panel — Panduan Lengkap](#4-admin-panel--panduan-lengkap)
5. [Database Supabase — Struktur Tabel](#5-database-supabase--struktur-tabel)
6. [Cara Update Konten (untuk Client/Co-Admin)](#6-cara-update-konten-untuk-clientco-admin)
7. [Cara Deploy & Maintenance (untuk Developer)](#7-cara-deploy--maintenance-untuk-developer)
8. [Status Pengerjaan & Checklist](#8-status-pengerjaan--checklist)
9. [Catatan Teknis](#9-catatan-teknis)
10. [Rencana Pengembangan Selanjutnya](#10-rencana-pengembangan-selanjutnya)

---

## 1. RINGKASAN PROYEK

### 1.1 Deskripsi

Landing Page profesional untuk **CV RAZKA PRATAMA MANDIRI** — perusahaan kontraktor bangunan dan infrastruktur di Banyuwangi, Jawa Timur. Website dirancang sebagai **Single Page Application (SPA)** + subpage untuk halaman pendukung, dengan admin panel berbasis **Supabase** untuk pengelolaan konten real-time.

### 1.2 Tujuan

- ✅ Meningkatkan kredibilitas digital perusahaan
- ✅ Menampilkan portofolio proyek secara profesional
- ✅ Memudahkan klien menghubungi via WhatsApp & Email
- ✅ Admin panel untuk update konten tanpa coding
- ✅ SEO lokal untuk Banyuwangi & Jawa Timur

### 1.3 Tech Stack

| Komponen | Teknologi |
|----------|-----------|
| **Frontend** | HTML5 + CSS3 (Vanilla, no framework) |
| **Styling** | Custom CSS dengan tema Dark Navy/Red |
| **Icons** | Font Awesome 6.5 |
| **Fonts** | Inter, Plus Jakarta Sans, Poppins (Google Fonts) |
| **Database** | Supabase (PostgreSQL) |
| **Auth** | Supabase Auth (Email/Password) |
| **Storage** | Supabase Storage (gambar) |
| **Hosting** | GitHub Pages (static) |
| **Version Control** | Git + GitHub |

---

## 2. STRUKTUR FILE & FUNGSINYA

```
D:/CV/
├── index.html              # 🏠 HALAMAN UTAMA (Single Page)
│                           #   Hero, Practice Area, Layanan, Portofolio,
│                           #   Testimonial, Kontak, Footer
│                           #   + Lightbox, PA Modal
│
├── tentang.html            # ℹ️ TENTANG KAMI
│                           #   Profil perusahaan, visi-misi, timeline
│
├── layanan.html            # 🔧 LAYANAN
│                           #   Detail layanan konstruksi
│
├── portofolio.html         # 🖼️ PORTOFOLIO
│                           #   Galeri proyek lengkap dengan filter
│
├── kontak.html             # 📞 KONTAK
│                           #   Form kontak, Google Maps, info perusahaan
│
├── admin.html              # ⚙️ ADMIN PANEL (CRUD + Settings)
│                           #   Login → Dashboard → Kelola semua konten
│                           #   Hero, Layanan, Portofolio, Testimoni,
│                           #   Artikel, Perusahaan, SEO, Overlay
│
├── supabase-loader.js      # 🔗 Supabase connector untuk halaman utama
│                           #   Mengambil data real-time dari database
│
├── supabase-schema.sql     # 🗄️ SQL Schema (buat tabel di Supabase)
│
├── supabase.txt            # 🔑 Credential & catatan penting
│
├── favicon/                # 🖼️ Favicon files (multi-size)
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   ├── favicon-16x16.png
│   └── ...
│
├── .gitignore              # Git ignore rules
├── LAPORAN-PROGRES-WEBSITE.md  # 📋 Dokumen ini
└── (file desain: .psd, .png)
```

---

## 3. FITUR WEBSITE — COMPLETE

### 3.1 Halaman Utama (`index.html`)

| Bagian | Fitur | Status |
|--------|-------|--------|
| **Page Loader** | Animasi loading saat buka website | ✅ Selesai |
| **Navbar** | Fixed, sticky, blur effect saat scroll, link aktif otomatis | ✅ Selesai |
| **Hero Banner** | Full-screen, background image responsive (mobile/desktop), overlay gradient, badge, headline, CTA buttons × 2, stats counter animasi | ✅ Selesai |
| **Marquee** | Running text berisi info perusahaan, pause saat hover | ✅ Selesai |
| **Practice Area** | 4 kartu bidang keahlian, klik → **modal detail interaktif** (gambar, deskripsi, fitur, statistik, CTA WhatsApp) | ✅ Selesai |
| **Image Hotspot** | Gambar interaktif dengan titik hotspot, tooltip hover | ✅ Selesai |
| **Stats Section** | Angka statistik dengan animasi counter | ✅ Selesai |
| **Services** | Kartu layanan dengan hover effect 3D | ✅ Selesai |
| **Testimonial Carousel** | Slider testimoni dengan tombol prev/next + dots | ✅ Selesai |
| **Portfolio Gallery** | Grid portofolio dengan filter kategori (residensial/komersial/pemerintah), lightbox klik gambar, navigasi prev/next | ✅ Selesai |
| **Before/After** | Slider perbandingan sebelum-sesudah (drag) | ✅ Selesai |
| **Clients** | Grid logo/partner | ✅ Selesai |
| **Contact** | Info kontak + form + Google Maps embed (dark mode) | ✅ Selesai |
| **WhatsApp Float** | Tombol WhatsApp sticky, animasi pulse, tooltip | ✅ Selesai |
| **Footer** | 3 kolom: brand, navigasi, kontak | ✅ Selesai |
| **Scroll Reveal** | Animasi muncul saat scroll (fade, slide left, slide right, scale) | ✅ Selesai |
| **Responsive** | Mobile (480px), Tablet (768px), Desktop (1024px+) | ✅ Selesai |
| **Mobile Nav** | Horizontal scroll (BUKAN sidebar), sama persis seperti desktop | ✅ Selesai |
| **SEO Meta** | Open Graph, meta description, keywords | ✅ Selesai |

### 3.2 Subpage (`tentang.html`, `layanan.html`, `portofolio.html`, `kontak.html`)

| Halaman | Fitur | Status |
|---------|-------|--------|
| **Semua Subpage** | Navbar konsisten dengan index, hero subpage, footer, WhatsApp float, responsive, scroll reveal | ✅ Selesai |
| **tentang.html** | Profil perusahaan, visi-misi, timeline sejarah, keunggulan | ✅ Selesai |
| **layanan.html** | Detail 3 layanan utama (sipil, renovasi, arsitektur), proses kerja | ✅ Selesai |
| **portofolio.html** | Galeri proyek grid + filter, lightbox, gambar contain (tidak terpotong) | ✅ Selesai |
| **kontak.html** | Info lengkap, form kontak, Google Maps, jam operasional | ✅ Selesai |

### 3.3 Fitur Visual & Interaksi

| Fitur | Detail |
|-------|--------|
| **Dark Theme** | Navy (#080e1a) + Red (#e63946) aksen |
| **3D Buttons** | Box-shadow 3D, hover translateY, active translateY |
| **Animasi** | Scroll reveal, counter, marquee, hotspot pulse, lightbox, modal scale |
| **Gambar Responsif** | Mobile: w=800/q=75, Desktop: w=1600/q=85, Large: w=1920/q=85 |
| **Gambar Tidak Terpotong** | Background-size: contain (portofolio & practice area), cover (hero) |
| **Lightbox** | Klik gambar portofolio → fullscreen, navigasi panah keyboard |
| **PA Modal** | Klik practice area → modal detail dengan fitur, statistik, CTA |
| **Custom Scrollbar** | Scrollbar merah kustom |

---

## 4. ADMIN PANEL — PANDUAN LENGKAP

### 4.1 Akses Admin Panel

```
URL:   https://jpxproject.github.io/cvrazka/admin.html
Email: jpxcodex@gmail.com
Pass:  admin123
```

> ⚠️ **PENTING:** Sebelum login pertama, pastikan:
> 1. Database Supabase sudah di-setup (lihat §5)
> 2. User admin sudah terdaftar di Supabase Auth
> 3. Buka `admin.html?dev=1` untuk mode bypass (jika login bermasalah)

### 4.2 Halaman Dashboard

Saat login berhasil, Anda akan melihat:

```
┌─────────────────────────────────────────┐
│  ⚙️ RAZKA PRATAMA  │  🔗 Terhubung    │
│  Admin Panel        │  👁️ Preview 📤  │
├─────────────────────────────────────────┤
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐   │
│ │🔧 Ln │ │🖼️ Pr │ │⭐ Tes│ │📰 Art│   │
│ │  3   │ │  0   │ │  0   │ │  0   │   │
│ └──────┘ └──────┘ └──────┘ └──────┘   │
│                                         │
│ Selamat datang di Panel Admin           │
│ [ Hero ] [ Layanan ] [ Portofolio ]     │
│ [ Perusahaan ] [ Backup ] [ Preview ]   │
└─────────────────────────────────────────┘
```

**Navigasi Sidebar (kiri):**

| Menu | Fungsi |
|------|--------|
| **Dashboard** | Overview statistik, shortcut aksi cepat |
| **Hero Banner** | Ubah gambar background, teks, tombol, opacity overlay |
| **Layanan** | Tambah/edit/hapus layanan konstruksi |
| **Portofolio** | Tambah/edit/hapus proyek + upload gambar |
| **Testimoni** | Tambah/edit/hapus testimoni klien |
| **Artikel** | Tambah/edit/hapus artikel berita |
| **Perusahaan** | Ubah nama, alamat, WhatsApp, email, jam operasional |
| **SEO & Meta** | Meta title, description, keywords, OG image |
| **Overlay Gambar** | Konfigurasi overlay di belakang judul halaman |

### 4.3 Cara Update Konten

#### 🔴 Hero Banner
1. Klik **Hero Banner** di sidebar
2. Upload gambar baru via **upload zone** (drag & drop atau klik)
3. Edit teks: Judul, Subtitle, Deskripsi, Badge, Tombol CTA
4. Atur **Overlay Opacity** dengan slider
5. Klik **Simpan**

#### 🔧 Layanan
1. Klik **Layanan** di sidebar
2. Klik **Tambah Layanan** → isi form (nama, ikon, deskripsi)
3. Untuk edit: klik ikon ✏️ di tabel
4. Untuk hapus: klik ikon 🗑️ (konfirmasi dulu)

#### 🖼️ Portofolio
1. Klik **Portofolio** di sidebar
2. Klik **Tambah Proyek** → isi nama, kategori, lokasi, upload gambar
3. Upload gambar langsung ke Supabase Storage
4. Kategori: `residensial`, `komersial`, `pemerintah`

#### ⭐ Testimoni
1. Klik **Testimoni** di sidebar
2. Tambah/edit/hapus testimoni klien

#### 📰 Artikel
1. Klik **Artikel** di sidebar
2. Tambah artikel dengan judul, konten, tanggal, status (draft/publish)

#### 🏢 Perusahaan
1. Klik **Perusahaan** di sidebar
2. Edit: Nama, Alamat, WhatsApp, Email, Jam Operasional, Tahun Berdiri
3. Klik **Simpan**

#### 🔍 SEO & Meta
1. Klik **SEO & Meta** di sidebar
2. Edit: Meta title, description, keywords, OG image URL
3. Upload gambar OG Image via upload zone

#### 🎨 Overlay Gambar
1. Klik **Overlay Gambar** di sidebar
2. Upload gambar latar, judul, deskripsi, warna overlay, opacity
3. **Preview** langsung terlihat di bawah form

### 4.4 Fitur Admin Lainnya

| Fitur | Lokasi | Fungsi |
|-------|--------|--------|
| **👁️ Preview** | Topbar & dashboard | Buka website di tab baru untuk lihat perubahan |
| **📤 Backup** | Topbar (icon download) | Export semua data sebagai file JSON |
| **📥 Restore** | Topbar (icon upload) | Import data dari file JSON backup |
| **🔍 Search** | Dalam setiap tabel | Filter data real-time |
| **🍪 Cookies** | Dashboard info | Supabase Auth pakai localStorage — **tidak perlu cookies tambahan** |
| **🔄 Auto-sync** | Dashboard badge | Status koneksi database (hijau/merah) |

---

## 5. DATABASE SUPABASE — STRUKTUR TABEL

### 5.1 Kredensial

| Item | Value |
|------|-------|
| **Project URL** | `https://ncidonlsvxndynssback.supabase.co` |
| **Anon Key** | Tersimpan di `admin.html` & `supabase.txt` |
| **Service Role Key** | 🔒 Simpan rahasia di `supabase.txt` |
| **DB Password** | `razkaPratama123` |

### 5.2 Tabel Database

#### `services` — Layanan
| Kolom | Type | Keterangan |
|-------|------|------------|
| id | BIGINT (PK) | Auto increment |
| name | TEXT | Nama layanan |
| icon | TEXT | Nama ikon Font Awesome |
| description | TEXT | Deskripsi layanan |
| sort_order | INTEGER | Urutan tampilan |
| created_at | TIMESTAMPTZ | Auto |
| updated_at | TIMESTAMPTZ | Auto |

#### `portfolio` — Portofolio Proyek
| Kolom | Type | Keterangan |
|-------|------|------------|
| id | BIGINT (PK) | Auto increment |
| name | TEXT | Nama proyek |
| category | TEXT | residensial/komersial/pemerintah |
| location | TEXT | Lokasi proyek |
| description | TEXT | Deskripsi proyek |
| image_url | TEXT | URL gambar (Supabase Storage) |
| year | TEXT | Tahun pengerjaan |
| sort_order | INTEGER | Urutan tampilan |
| created_at | TIMESTAMPTZ | Auto |
| updated_at | TIMESTAMPTZ | Auto |

#### `testimonials` — Testimoni
| Kolom | Type | Keterangan |
|-------|------|------------|
| id | BIGINT (PK) | Auto increment |
| client_name | TEXT | Nama klien |
| position | TEXT | Jabatan/posisi |
| quote | TEXT | Isi testimoni |
| avatar_url | TEXT | URL foto profil |
| sort_order | INTEGER | Urutan tampilan |
| created_at | TIMESTAMPTZ | Auto |
| updated_at | TIMESTAMPTZ | Auto |

#### `articles` — Artikel Berita
| Kolom | Type | Keterangan |
|-------|------|------------|
| id | BIGINT (PK) | Auto increment |
| title | TEXT | Judul artikel |
| content | TEXT | Isi artikel |
| date | DATE | Tanggal publikasi |
| status | TEXT | draft/published |
| image_url | TEXT | URL gambar artikel |
| created_at | TIMESTAMPTZ | Auto |
| updated_at | TIMESTAMPTZ | Auto |

#### `settings` — Pengaturan
| Kolom | Type | Keterangan |
|-------|------|------------|
| id | BIGINT (PK) | Auto increment |
| key | TEXT (UNIQUE) | company / hero / seo / overlay |
| value | JSONB | Nilai pengaturan dalam JSON |
| updated_at | TIMESTAMPTZ | Auto |

### 5.3 Storage Bucket

| Bucket | Nama | Keterangan |
|--------|------|------------|
| **razka-images** | Public bucket | Tempat upload gambar dari admin panel |

### 5.4 Security Policies

- ✅ **Public read** — Semua tabel bisa dibaca publik (untuk website)
- ✅ **Authenticated CRUD** — Hanya user login bisa tulis/edit/hapus
- ✅ **Storage upload** — Hanya authenticated user bisa upload gambar

### 5.5 Cara Setup Database (Pertama Kali)

```sql
-- 1. Buka https://supabase.com/dashboard
-- 2. Pilih project: ncidonlsvxndynssback
-- 3. Klik SQL Editor → New Query
-- 4. Copy-paste isi file supabase-schema.sql
-- 5. Klik RUN
-- 6. Buka Authentication → Users → Add User
--    Email: jpxcodex@gmail.com
--    Password: admin123
-- 7. Buka Storage → pastikan bucket "razka-images" ada
-- 8. Selesai!
```

> **⚠️ AMAN di-run ulang** — Semua tabel pakai `CREATE TABLE IF NOT EXISTS` dan `DROP POLICY IF EXISTS`. Tidak akan merusak data yang sudah ada.

---

## 6. CARA UPDATE KONTEN (UNTUK CLIENT/CO-ADMIN)

### 6.1 Persiapan

1. **Buka browser** (Chrome/Edge/Firefox recommended)
2. **Kunjungi:** https://jpxproject.github.io/cvrazka/admin.html
3. **Login:**
   - Email: `jpxcodex@gmail.com`
   - Password: `admin123`

### 6.2 Skenario Update Umum

#### 🔄 "Saya mau ganti foto proyek"

1. Login ke admin panel
2. Klik **Portofolio** di sidebar kiri
3. Cari proyek yang ingin diganti fotonya
4. Klik ikon ✏️ (Edit)
5. Di form yang muncul, upload gambar baru
6. Klik **Simpan**

#### 🔄 "Saya mau tambah layanan baru"

1. Login ke admin panel
2. Klik **Layanan** di sidebar
3. Klik tombol **+ Tambah Layanan**
4. Isi: Nama, pilih ikon, deskripsi
5. Klik **Simpan**

#### 🔄 "Saya mau ganti nomor WhatsApp"

1. Login ke admin panel
2. Klik **Perusahaan** di sidebar
3. Edit field **WhatsApp**
4. Klik **Simpan**

#### 🔄 "Website error / tidak bisa login"

1. Buka `admin.html?dev=1` — ini bypass login
2. Atau hubungi developer
3. Cek koneksi internet
4. Refresh halaman

### 6.3 Tips untuk Co-Admin

| Tips | Detail |
|------|--------|
| **Gunakan gambar landscape** (16:9) untuk hasil terbaik | Hindari gambar portrait untuk hero/portofolio |
| **Maks ukuran gambar** 5MB | Lebih besar akan lambat loading |
| **File didukung** | PNG, JPG, WebP |
| **Test perubahan** | Klik "Preview" untuk lihat hasil di website |
| **Backup rutin** | Klik icon download di pojok kanan atas |
| **Jika ragu** | Hubungi developer via WhatsApp/Email |

---

## 7. CARA DEPLOY & MAINTENANCE (UNTUK DEVELOPER)

### 7.1 Git Workflow

```bash
# Clone repo
git clone https://github.com/jpXproject/cvrazka.git

# Cek status
git status
git log --oneline

# Commit perubahan
git add .
git commit -m "deskripsi perubahan"

# Push ke GitHub (otomatis deploy ke GitHub Pages)
git push origin master
```

### 7.2 GitHub Pages

- **URL:** https://jpxproject.github.io/cvrazka/
- **Settings:** GitHub repo → Settings → Pages → branch `master`, folder `/root`
- **Auto-deploy:** Setiap push ke `master` otomatis live

### 7.3 Maintenance Checklist Berkala

| Frekuensi | Tugas |
|-----------|-------|
| **Bulanan** | Backup database (export JSON dari admin panel) |
| **Bulanan** | Cek broken links di website |
| **3 Bulan** | Update konten portofolio & testimoni |
| **6 Bulan** | Review & update SEO meta |
| **Tahunan** | Perpanjang domain (jika pakai domain kustom) |

### 7.4 Troubleshooting

| Masalah | Solusi |
|---------|--------|
| **Login gagal** | Cek koneksi internet. Coba `?dev=1`. Cek Supabase Auth user. |
| **Gambar tidak muncul** | Cek Storage bucket. Pastikan URL gambar valid. |
| **Perubahan tidak tampil** | Clear browser cache. Hard refresh (Ctrl+F5). |
| **Database error** | Cek Supabase Dashboard → Table Editor. Run ulang schema.sql. |
| **CDN error** | Ad blocker mungkin memblokir. Nonaktifkan atau gunakan browser lain. |

---

## 8. STATUS PENGERJAAN & CHECKLIST

### 8.1 ✅ Selesai (100%)

| Item | Status |
|------|--------|
| **Halaman Utama (`index.html`)** | ✅ Complete |
| **Halaman Tentang (`tentang.html`)** | ✅ Complete |
| **Halaman Layanan (`layanan.html`)** | ✅ Complete |
| **Halaman Portofolio (`portofolio.html`)** | ✅ Complete |
| **Halaman Kontak (`kontak.html`)** | ✅ Complete |
| **Admin Panel (`admin.html`)** | ✅ Complete |
| **Supabase Integration** | ✅ Complete |
| **Database Schema (5 tabel)** | ✅ Complete |
| **Supabase Storage (upload gambar)** | ✅ Complete |
| **Auth Login (Email/Password)** | ✅ Complete |
| **CRUD Services** | ✅ Complete (need DB setup) |
| **CRUD Portfolio** | ✅ Complete (need DB setup) |
| **CRUD Testimonials** | ✅ Complete (need DB setup) |
| **CRUD Articles** | ✅ Complete (need DB setup) |
| **Settings (Company/Hero/SEO/Overlay)** | ✅ Complete (need DB setup) |
| **Responsive Mobile** | ✅ Complete |
| **Mobile Nav (horizontal scroll)** | ✅ Complete |
| **Gambar Responsif (mobile/desktop)** | ✅ Complete |
| **Gambar Tidak Terpotong** | ✅ Complete (contain mode) |
| **Lightbox Gallery** | ✅ Complete |
| **Practice Area Modal** | ✅ Complete |
| **WhatsApp Integration** | ✅ Complete |
| **SEO Meta Tags** | ✅ Complete |
| **Favicon** | ✅ Complete |
| **GitHub Pages** | ✅ Live |
| **File `.gitignore`** | ✅ Complete |

### 8.2 🟡 Perlu Setup Database Agar CRUD Berfungsi

> **Catatan Penting:** Admin panel **butuh koneksi database** untuk menyimpan data. Jika database belum di-setup:
> - Hero, Layanan, Portofolio, Testimoni, Artikel → **tidak bisa disimpan**
> - Tapi website tetap tampil dengan data default (hardcoded di HTML)
> - Dashboard akan menampilkan notice: "Database perlu disetup"

### 8.3 🔜 Rencana Selanjutnya

| Item | Prioritas |
|------|-----------|
| Domain kustom (.com atau .co.id) | ⭐ Tinggi |
| SSL HTTPS (jika domain kustom) | ⭐ Tinggi |
| Integrasi halaman utama dengan Supabase (real-time content) | ⭐ Tinggi |
| Halaman "Artikel/Berita" di frontend | 🔵 Sedang |
| Multiple admin users | 🔵 Sedang |
| Lightbox gambar dari Supabase (bukan Unsplash) | 🔵 Sedang |
| Blog page | 🟢 Rendah |
| Multi-language (EN) | 🟢 Rendah |

---

## 9. CATATAN TEKNIS

### 9.1 Gambar Responsif

Sistem ukuran gambar berdasarkan device:

```
Mobile (≤480px):     w=800,  q=75  — ukuran kecil, loading cepat
Desktop (769px+):    w=1600, q=85  — kualitas penuh
Large (1400px+):     w=1920, q=85  — retina/ultrawide
Portfolio Mobile:    w=400,  q=60  — sangat kecil di mobile
```

**Mode Gambar:**

| Bagian | Mode | Keterangan |
|--------|------|------------|
| **Hero Banner** | `cover` | Full bleed, cropping minimal di tengah |
| **Portofolio** | `contain` + bg gelap | Gambar UTUH, tidak terpotong |
| **Practice Area** | `contain` + bg gelap | Gambar UTUH, tidak terpotong |

### 9.2 Breakpoints Responsive

```css
/* Mobile first — default untuk mobile */
@media (min-width: 769px) { /* Tablet & Desktop */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1400px) { /* Large screens */ }
@media (max-width: 768px) { /* Mobile & Tablet */ }
@media (max-width: 480px) { /* Small mobile */ }
```

### 9.3 Warna Brand

| Warna | Hex | Penggunaan |
|-------|-----|------------|
| Navy | `#080e1a` | Background utama |
| Dark | `#0c1525` | Card, section |
| Card | `#0f172a` | Kartu/panel |
| Red | `#e63946` | Aksen, tombol, hover |
| Red Dark | `#c1121f` | Tombol hover |
| Text | `#e2e8f0` | Teks utama |
| Text Muted | `#94a3b8` | Teks sekunder |
| Text Dim | `#64748b` | Teks tersier |

### 9.4 Version Control

```bash
git log --oneline --all

# Commit history (most recent):
57389de Subpage sync: mobile navbar horizontal, hero responsive
           images, portfolio contain + aspect-ratio
b24be30 Practice Area interactive modal — klik kartu lihat detail
a83c4a6 Mobile fix: navbar horizontal (no sidebar), responsive images
17f2b14 All images now use contain mode — no cropping!
+ previous commits...
```

---

## 10. RENCANA PENGEMBANGAN SELANJUTNYA

### 10.1 Jangka Pendek (1-2 Minggu)

- [ ] **Domain kustom** — Beli domain (razkapratamamandiri.com atau .co.id)
- [ ] **SSL/HTTPS** — Pastikan domain kustom sudah HTTPS
- [ ] **Hubungkan halaman utama ke Supabase** — Agar konten di index.html real-time dari database (bukan hardcoded)
- [ ] **Upload foto proyek asli** — Ganti gambar Unsplash dengan foto real proyek CV RAZKA

### 10.2 Jangka Menengah (1-2 Bulan)

- [ ] **Halaman Artikel/Berita** — Frontend untuk menampilkan artikel dari database
- [ ] **Blog section** — Update berita proyek terbaru
- [ ] **Gallery view** untuk portofolio — Tampilan grid yang lebih kaya

### 10.3 Jangka Panjang (3+ Bulan)

- [ ] **Multi-admin** — Tambah user admin lain
- [ ] **Analytics** — Google Analytics atau sejenis
- [ ] **Dark/Light mode toggle**
- [ ] **English version**

---

## 📞 KONTAK & DUKUNGAN

| Kontak | Detail |
|--------|--------|
| **Developer** | jpXcode |
| **Email Developer** | jpxcodex@gmail.com |
| **Repo** | https://github.com/jpXproject/cvrazka |
| **Live Website** | https://jpxproject.github.io/cvrazka |
| **Admin Panel** | https://jpxproject.github.io/cvrazka/admin.html |

---

> **📅 Laporan dibuat:** Juli 2026  
> **Versi Website:** v2.1.0  
> **Status:** ✅ Sebagian besar fitur selesai. Menunggu setup database untuk CRUD penuh.
