# 📖 Dokumentasi Penggunaan Content Management System (CMS)
## Brand: Cap Sahabat Rempah (Toko Sahabat Rempah)

---

## 1. Pendahuluan & Ringkasan Sistem
Website **Cap Sahabat Rempah** dikembangkan sebagai *Company Profile & Product Catalog* interaktif yang memfasilitasi penelusuran produk rempah murni Nusantara, pemesanan awal tamu (*guest pre-order*) via WhatsApp terstandarisasi, serta pengajuan kemitraan B2B HORECA.

Untuk memudahkan operasional tanpa bergantung pada developer, disediakan **Admin CMS Panel** mandiri yang memungkinkan tim internal mengelola produk, foto, banner beranda, memantau pesanan tamu, serta mengonfigurasi nomor WhatsApp admin tujuan.

---

## 2. Sistem Hak Akses & Akun Pengelola (Role-Based Access Control)

Panel CMS memisahkan wewenang menjadi 2 tingkatan peran:

| Fitur / Hak Akses | Admin Toko (`admin`) | Super Admin (`super_admin`) |
| :--- | :---: | :---: |
| Akses Dashboard Ringkasan Statistik | ✅ | ✅ |
| Tambah, Edit, Hapus Produk & Upload Foto | ✅ | ✅ |
| Kelola Slide Banner Promo Homepage | ✅ | ✅ |
| Melihat & Memantau Data Pesanan Tamu | ✅ | ✅ |
| Menghubungi Customer via WhatsApp Langsung | ✅ | ✅ |
| Ekspor Rekap Pesanan ke CSV / Excel | ✅ | ✅ |
| **Kelola Kontak Resmi Perusahaan (Alamat, Email)** | ❌ | ✅ |
| **Kelola Link Sensitif (Nomor WhatsApp Checkout, Marketplace)** | ❌ | ✅ |

### Akun Pengujian (Demo Credentials):
Pada halaman login `/admin/login`, telah disediakan tombol **Akses Cepat Pengujian (Demo)** atau Anda dapat login secara manual:
* **Super Admin:**
  - Email: `superadmin@capsahabat.com`
  - Password: `admin123`
* **Admin Toko:**
  - Email: `admin@capsahabat.com`
  - Password: `admin123`

---

## 3. Panduan Pengelolaan Produk (*Product Management*)

### A. Menambah Produk Baru
1. Masuk ke menu **Kelola Produk** pada sidebar navigasi.
2. Klik tombol kuning **"Tambah Produk Baru"** di sudut kanan atas.
3. Lengkapi formulir produk:
   - **Nama Produk:** Contoh *"Kayu Manis Utuh Grade A"*.
   - **Kategori:** Pilih salah satu dari kategori yang tersedia (Rempah Botolan, Minuman JSR, Teh Herbal, Dessert Set).
   - **Satuan / Kemasan:** Contoh *"Botol 80g"* atau *"Pouch 100g"*.
   - **Harga:** Masukkan nominal angka tanpa titik atau koma (contoh: `14000`). Sistem otomatis menampilkan pratinjau format Rupiah.
   - **Deskripsi:** Tuliskan keunggulan aroma, saran penggunaan dapur, atau khasiat kesehatan.
   - **Foto Produk:**
     - Klik **"Upload Foto dari Komputer"** untuk memilih berkas foto dari penyimpanan perangkat (sistem mendukung preview langsung).
     - Atau tempelkan tautan URL gambar online.
   - **Opsi Tambahan:** Centang *"Highlight Beranda"* jika ingin produk tampil di etalase halaman depan, dan pastikan *"Stok Tersedia"* aktif.
4. Klik **"Simpan Produk"**. Produk akan langsung tampil pada halaman `/katalog` dan beranda publik.

### B. Mengedit & Menghapus Produk
* **Edit:** Klik ikon pensil (✏️) pada baris produk yang ingin diperbarui, ubah data yang diinginkan, lalu klik *"Simpan Produk"*.
* **Status Stok:** Klik badge status *"Aktif / Non-aktif"* untuk mengubah status ketersediaan barang secara cepat tanpa menghapus data.
* **Hapus:** Klik ikon tempat sampah merah (🗑️), konfirmasi penghapusan pada dialog yang muncul.

---

## 4. Panduan Mengatur Banner Homepage (*Hero Banners*)
Slide banner di beranda berfungsi sebagai media promosi visual utama.

1. Buka menu **Banner Homepage** pada sidebar.
2. **Tambah Banner Baru:**
   - Klik tombol **"Tambah Banner Baru"**.
   - Masukkan **Judul Utama**, **Subjudul**, serta label **Tag**.
   - Masukkan teks dan tautan tombol aksi (Call to Action), contoh:
     - Tombol 1: Teks *"Pesan Sekarang"*, Link `"/katalog"`
     - Tombol 2: Teks *"Kerjasama B2B"*, Link `"/partner-b2b"`
   - Unggah gambar horizontal (disarankan rasio 16:9 beresolusi tinggi).
3. **Mengatur Urutan Slide:** Gunakan tombol panah ke atas (↑) atau panah ke bawah (↓) untuk memindahkan prioritas slide.
4. **Nonaktifkan Slide:** Klik badge status *"Aktif"* untuk menyembunyikan sementara slide tanpa menghapusnya.

---

## 5. Panduan Memantau & Menindaklanjuti Pesanan Tamu (*Guest Leads*)

Website menyediakan alur pemesanan tamu 3 langkah tanpa perlu login:
1. Tamu memilih produk dan menentukan jumlah kuantitas ke keranjang sementara.
2. Tamu mengisi Nama, Nomor WhatsApp, Alamat, dan Pilihan Jasa Kurir/Estimasi Ongkos Kirim.
3. Tamu menekan tombol **"Pesan ke Admin"** yang otomatis:
   - Menyimpan seluruh data transaksi ke database/CMS.
   - Membuka aplikasi WhatsApp tamu dengan format pesan terstandarisasi yang siap dikirimkan.

### Cara Menindaklanjuti di CMS:
1. Buka menu **Data Pesanan Tamu** dari sidebar.
2. Setiap pesanan baru ditandai dengan badge kuning **"Baru"**.
3. Klik ikon mata (👁️) untuk melihat detail lengkap: alamat jalan, rincian produk, kuantitas, ongkir, dan total transaksi.
4. Klik tombol hijau **"Chat WA"** untuk langsung menghubungi pembeli melalui WhatsApp resmi toko dengan pesan konfirmasi otomatis.
5. Ubah status pesanan pada dropdown menjadi:
   - `baru`: Pesanan baru masuk dari website.
   - `dihubungi`: Admin telah mengonfirmasi ongkir dan total pembayaran ke pembeli.
   - `selesai`: Transaksi telah lunas dan paket telah dikirim.
   - `dibatalkan`: Pembeli membatalkan pesanan.
6. **Ekspor Laporan:** Klik tombol **"Ekspor Data ke CSV"** untuk mengunduh rekap transaksi ke dalam format Excel / Spreadsheet.

---

## 6. Panduan Pengaturan Kontak & Link Sensitif (Khusus Super Admin)

Menu **Pengaturan Kontak & Link** diproteksi khusus untuk akun dengan peran **Super Admin**:

1. **Nomor WhatsApp Admin (Tujuan Checkout Tamu):**
   - Kolom ini menentukan nomor WhatsApp penerima form pemesanan tamu dari keranjang.
   - Masukkan format nomor diawali kode negara tanpa spasi atau tanda tambah (contoh: `6281378781327`).
2. **Nomor WhatsApp B2B:**
   - Menentukan nomor WhatsApp tujuan pengajuan kerjasama HORECA/reseller dari form `/partner-b2b`.
3. **Email Resmi & Jam Operasional:**
   - Mengubah tampilan email dan jam kerja di bagian header, footer, dan halaman `/kontak`.
4. **Link Toko Marketplace Resmi:**
   - Memperbarui tautan toko official di Tokopedia, Shopee, GrabMart, dan Google Maps.
5. Klik **"Simpan Semua Perubahan Pengaturan"**. Seluruh tombol dan link di website publik akan otomatis diperbarui secara seketika.

---

## 7. Panduan Deployment Publik (Online Hosting)

Aplikasi telah dibangun menggunakan arsitektur modern (React 19 + Vite 6 + Tailwind CSS) yang siap di-deploy secara gratis ke **Vercel** atau **Netlify**:

### A. Deploy ke Vercel (Rekomendasi):
1. Unggah kode ke repositori GitHub:
   ```bash
   git add .
   git commit -m "feat: complete website and CMS for Cap Sahabat"
   git push origin main
   ```
2. Buka [vercel.com](https://vercel.com) dan hubungkan akun GitHub Anda.
3. Pilih repositori `CapSahabat`, biarkan build command otomatis terdeteksi (`npm run build`), output directory `dist`.
4. Klik **Deploy**. Website publik dan Panel CMS akan langsung aktif dan memiliki tautan HTTPS publik yang dapat diakses dari mana saja.

---

*Cap Sahabat Rempah — Kehangatan Rempah Murni & Herbal Premium Nusantara.*

