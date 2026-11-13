import React from 'react';
import { BookOpen, ShieldCheck, ShoppingBag, Image as ImageIcon, ClipboardList, Settings, CheckCircle2 } from 'lucide-react';

export default function AdminDocs() {
  const sections = [
    {
      title: '1. Sistem Autentikasi & Pembagian Peran (Role)',
      icon: ShieldCheck,
      content: (
        <div className="space-y-3">
          <p>
            Sistem CMS Cap Sahabat dirancang dengan dua tingkatan hak akses berbasis peran (Role-Based Access Control):
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-2xl bg-linen border border-linen-dark space-y-1">
              <span className="font-bold text-cinnamon text-xs block">👤 Peran: Admin Toko</span>
              <ul className="list-disc list-inside text-roast-muted space-y-1 text-[11px]">
                <li>Menambah, mengedit, dan menghapus produk di katalog.</li>
                <li>Mengupload gambar produk dan mengatur status ketersediaan.</li>
                <li>Mengatur urutan dan konten banner promo di beranda.</li>
                <li>Melihat dan memantau daftar pesanan yang dikirimkan tamu.</li>
              </ul>
            </div>

            <div className="p-3.5 rounded-2xl bg-linen border border-turmeric/40 space-y-1">
              <span className="font-bold text-cinnamon text-xs block">👑 Peran: Super Admin</span>
              <ul className="list-disc list-inside text-roast-muted space-y-1 text-[11px]">
                <li>Memiliki seluruh hak akses yang dimiliki oleh Admin.</li>
                <li>Mengubah informasi kontak resmi perusahaan (Email, Alamat, Jam Kerja).</li>
                <li>Mengubah link sensitif (Nomor WhatsApp utama untuk checkout pesanan & WhatsApp B2B).</li>
                <li>Memperbarui link official store Tokopedia, Shopee, GrabMart, dan Google Maps.</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '2. Panduan Pengelolaan Produk (*Product CRUD*)',
      icon: ShoppingBag,
      content: (
        <div className="space-y-2">
          <p>Buka menu <strong>Kelola Produk</strong> dari sidebar navigasi:</p>
          <ol className="list-decimal list-inside space-y-1.5 pl-1">
            <li><strong>Menambah Produk:</strong> Klik tombol kuning <em>"Tambah Produk Baru"</em>. Isi nama produk, kategori, harga angka (tanpa titik), satuan (contoh: Botol 80g), dan deskripsi.</li>
            <li><strong>Upload Foto:</strong> Anda dapat mengklik tombol <em>"Upload Foto dari Komputer"</em> untuk memilih file gambar dari perangkat Anda, atau menempelkan URL gambar langsung.</li>
            <li><strong>Highlight Beranda:</strong> Centang opsi <em>"Highlight Beranda"</em> agar produk tersebut tampil di bagian etalase utama halaman depan.</li>
            <li><strong>Mengedit Produk:</strong> Klik ikon pensil pada baris produk yang ingin diubah, lakukan revisi, lalu klik <em>"Simpan Produk"</em>.</li>
            <li><strong>Menonaktifkan / Menghapus:</strong> Gunakan tombol toggle status untuk menonaktifkan stok sementara waktu, atau klik ikon tempat sampah merah untuk menghapus permanen.</li>
          </ol>
        </div>
      ),
    },
    {
      title: '3. Panduan Mengatur Banner Homepage (*Hero Banners*)',
      icon: ImageIcon,
      content: (
        <div className="space-y-2">
          <p>Buka menu <strong>Banner Homepage</strong> dari sidebar:</p>
          <ol className="list-decimal list-inside space-y-1.5 pl-1">
            <li><strong>Tambah Slide Baru:</strong> Masukkan judul utama, subjudul, teks tombol CTA (Call to Action), dan tautan tujuan (misal: <code>/katalog</code> atau <code>/partner-b2b</code>).</li>
            <li><strong>Upload Gambar Banner:</strong> Gunakan foto horizontal beresolusi tajam (disarankan rasio 16:9).</li>
            <li><strong>Mengatur Urutan Tampil:</strong> Gunakan tombol panah ke atas (↑) dan panah ke bawah (↓) untuk menentukan urutan slide banner di beranda.</li>
            <li><strong>Status Aktif:</strong> Klik tombol toggle <em>"Aktif"</em> jika ingin menyembunyikan slide tertentu tanpa menghapusnya.</li>
          </ol>
        </div>
      ),
    },
    {
      title: '4. Panduan Memantau & Menindaklanjuti Pesanan Tamu (*Orders*)',
      icon: ClipboardList,
      content: (
        <div className="space-y-2">
          <p>Buka menu <strong>Data Pesanan Tamu</strong> dari sidebar:</p>
          <ol className="list-decimal list-inside space-y-1.5 pl-1">
            <li>Setiap kali tamu mengisi form checkout di website dan menekan tombol pemesanan WhatsApp, data pesanan otomatis tersimpan di sistem ini.</li>
            <li><strong>Melihat Detail:</strong> Klik ikon mata (👁️) untuk melihat rincian barang, jumlah kuantitas, estimasi ongkos kirim, dan alamat pengiriman lengkap.</li>
            <li><strong>Menghubungi Customer:</strong> Klik tombol hijau WhatsApp pada baris pesanan untuk membuka chat langsung ke pembeli dengan format konfirmasi pesan otomatis.</li>
            <li><strong>Mengubah Status:</strong> Ubah status pesanan menjadi <em>"Dihubungi"</em> atau <em>"Selesai"</em> setelah pesanan selesai diproses.</li>
            <li><strong>Ekspor Laporan:</strong> Klik tombol <em>"Ekspor Data ke CSV"</em> untuk mengunduh rekap transaksi ke dalam format Excel / Spreadsheet.</li>
          </ol>
        </div>
      ),
    },
    {
      title: '5. Panduan Pengaturan Kontak & Link Sensitif (Super Admin)',
      icon: Settings,
      content: (
        <div className="space-y-2">
          <p>Buka menu <strong>Pengaturan Kontak & Link</strong> (Khusus Akun Super Admin):</p>
          <ol className="list-decimal list-inside space-y-1.5 pl-1">
            <li><strong>Mengganti Nomor WhatsApp Admin:</strong> Ubah kolom <em>"Nomor WhatsApp Admin"</em> jika nomor HP customer service berganti. Pastikan format diawali kode negara tanpa spasi (misal: <code>6281378781327</code>).</li>
            <li><strong>Memperbarui Link Marketplace:</strong> Masukkan URL toko resmi Tokopedia, Shopee, dan GrabMart terbaru. Tombol di header dan footer website publik akan otomatis mengarah ke link baru.</li>
            <li><strong>Simpan Pengaturan:</strong> Klik tombol <em>"Simpan Semua Perubahan Pengaturan"</em>. Perubahan berlaku secara instan di seluruh sistem.</li>
          </ol>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-turmeric/15 text-cinnamon text-xs font-bold uppercase tracking-wider mb-1">
          <BookOpen className="w-3.5 h-3.5 text-turmeric" />
          Buku Panduan CMS
        </div>
        <h1 className="font-serif text-2xl font-bold text-cinnamon">
          Dokumentasi Penggunaan CMS Cap Sahabat
        </h1>
        <p className="text-xs text-roast-muted mt-0.5">
          Panduan operasional bagi tim Admin dan Super Admin dalam mengelola website company profile dan katalog produk.
        </p>
      </div>

      {/* Accordion / Cards List */}
      <div className="space-y-4">
        {sections.map((sec, idx) => {
          const Icon = sec.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-linen-dark shadow-warm-sm space-y-3 text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-turmeric/15 text-turmeric flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <h2 className="font-serif font-bold text-base text-cinnamon">{sec.title}</h2>
              </div>

              <div className="pt-2 text-roast-muted leading-relaxed border-t border-linen-dark">
                {sec.content}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

