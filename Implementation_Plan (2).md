# 🚀 Implementation Plan Website: Cap Sahabat Rempah

---

## 📋 Ringkasan Proyek

Website ini dirancang sebagai **Digital Catalog & Interactive Experience Hub** untuk bisnis **Cap Sahabat Rempah (Toko Sahabat Rempah)** di Bandung. Website tidak memproses pembayaran langsung (non-e-commerce checkout), melainkan mengarahkan transaksi ke toko resmi di **Tokopedia**, **Shopee**, **GrabMart**, serta mengarahkan kunjungan fisik ke lokasi toko di **Pasar Parahyangan KBP** dan **Jl. Belakang Pasar / Dulatip Bandung**.

---

## 🛠️ Phase 1: Tech Stack & Architecture Selection

* **Frontend Framework:** Next.js (React) atau HTML5/Tailwind CSS Static Site.  
  * *Alasan:* Sangat cepat dimuat, ramah SEO (Search Engine Optimization), ramah perangkat seluler (mobile-first design), dan mudah di-host secara gratis/hemat biaya di Vercel, Netlify, atau GitHub Pages.  
* **Styling & UI Library:** Tailwind CSS \+ Lucide Icons \+ Google Fonts (Playfair Display & Plus Jakarta Sans).  
* **Interaktivitas Client-Side:** Vanilla JavaScript / React State untuk filter resep masakan & penyeleksi mood teh herbal tanpa memerlukan server/database berbayar.  
* **Hosting & Domain Custom:** Vercel / Netlify dengan custom domain (contoh: `capsahabat.com` atau `sahabatrempah.id`).

---

## 🎨 Phase 2: Design & Asset Preparation

1. **Logo Optimization & Brand Assets:**  
   - Gunakan logo emblem lingkaran Cap Sahabat Rempah (vektor SVG & PNG transparan).  
   - Penyiapan favicon dan meta image untuk Social Media Share Preview (OpenGraph).  
2. **Katalog Produk & Foto:**  
   - Foto produk botol rempah murni, kemasan pouch JSR, teh herbal, dan set peach gum.  
   - Penyusunan data produk dalam format JSON ringan (`products.json`).  
3. **Penyusunan Data Resep & Wellness Mood:**  
   - Pemetaan resep masakan favorit Nusantara (Rendang, Sop Buntut, Soto Ayam, Marinasi Cajun, dll.) dengan daftar rempah Cap Sahabat.  
   - Pemetaan efek teh herbal & ramuan JSR berdasarkan manfaat kesehatan (Relaxation, Immunity, Digest, Warming).

---

## 💻 Phase 3: Development Steps

### Step 3.1: Core Layout & Navigation

* Implementasi Responsive Header dengan Logo, Link Navigasi, dan Tombol Cepat Tokopedia / Shopee.  
* Implementasi Hero Section dengan headline khas, slogan kehangatan rempah, dan CTA utama.

### Step 3.2: Fitur Interaktif "Dapur Rempah" (Recipe Matcher)

* Membangun komponen UI pencari resep interaktif.  
* Pengunjung memilih menu $\\rightarrow$ UI secara otomatis memunculkan bahan rempah yang dibutuhkan \+ tombol direct link pembelian paket rempah di Tokopedia/Shopee.

### Step 3.3: Fitur Interaktif "Mood Teh & Wellness" (Calming & Health Selector)

* Membangun tab mood selector (Sleep & Relax, Immunity Boost, Detox & Digest).  
* Menampilkan pilihan teh herbal, wedang jahe, dan peach gum yang sesuai dengan deskripsi singkat manfaatnya.

### Step 3.4: Lokasi Toko & Peta Interaktif

* Integrasi kartu lokasi toko fisik:  
  - **Pasar Parahyangan KBP (Bandung Barat)**  
  - **Jl. Belakang Pasar No. 28B / Dulatip (Kota Bandung)**  
* Tombol aksi langsung: "Petunjuk Arah Google Maps" & "Pesan via GrabMart".

---

## 📈 Phase 4: Conversion & Traffic Routing Strategy

1. **Direct Marketplace Links dengan UTM Parameter:**  
   - Setiap tombol produk atau resep menggunakan URL khusus (contoh: `https://www.tokopedia.com/capsahabat?utm_source=website&utm_medium=recipe_card`).  
2. **WhatsApp Floating Business Button:**  
   - Tombol melayang WhatsApp di pojok kanan bawah untuk pertanyaan pesanan Grosir / B2B Horeca / Catering.  
3. **Local SEO Optimization:**  
   - Penerapan `Schema.org LocalBusiness` JSON-LD markup untuk meningkatkan peringkat di Google Search & Google Maps lokal Bandung & Kotabaru Parahyangan.

---

## 📅 Timeline Pelaksanaan (4 Minggu)

| Minggu | Fokus Kegiatan | Output |
| :---- | :---- | :---- |
| **Minggu 1** | Wireframing, pengumpulan foto produk, & pembuatan struktur JSON data resep. | Visual Layout & Clean Assets |
| **Minggu 2** | Slicing UI (HTML/Tailwind), Header, Hero, & Katalog Produk. | Prototype Halaman Utama |
| **Minggu 3** | Pengembangan Fitur Interaktif (Resep Matcher & Mood Teh) \+ Integrasi Link Marketplace. | Web Interaktif Berfungsi Penuh |
| **Minggu 4** | Testing Mobile, SEO Setup, Integrasi Domain, & Launching. | Website Live & Siap Promosi |

