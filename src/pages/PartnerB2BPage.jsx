import React, { useState, useEffect } from 'react';
import { dataService } from '../services/dataService';
import { 
  Building2, UtensilsCrossed, Truck, ShieldCheck, FileText, Send, CheckCircle2, 
  Sparkles, ArrowRight, Phone, MessageSquare 
} from 'lucide-react';

export default function PartnerB2BPage() {
  const [settings, setSettings] = useState(() => dataService.getSettings());
  const [b2bForm, setB2bForm] = useState({
    picName: '',
    businessName: '',
    businessType: 'Restoran / Rumah Makan',
    city: 'Bandung',
    phone: '',
    estimatedVolume: '10 - 50 kg / bulan',
    notes: '',
  });

  useEffect(() => {
    const handleSettingsChange = () => setSettings(dataService.getSettings());
    window.addEventListener('capsahabat_settings_changed', handleSettingsChange);
    return () => window.removeEventListener('capsahabat_settings_changed', handleSettingsChange);
  }, []);

  const handleB2bSubmit = (e) => {
    e.preventDefault();
    const cleanPhone = (settings.whatsappB2B || settings.whatsappNumber || '6281378781327').replace(/[^0-9]/g, '');
    const text = `Halo Admin B2B Cap Sahabat, saya ingin mengajukan diskusi kemitraan usaha:
Nama PIC: ${b2bForm.picName}
Nama Usaha: ${b2bForm.businessName}
Bidang: ${b2bForm.businessType}
Kota: ${b2bForm.city}
No WhatsApp: ${b2bForm.phone}
Estimasi Volume: ${b2bForm.estimatedVolume}
Kebutuhan / Catatan: ${b2bForm.notes || '-'}`;

    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  };

  const partnerBenefits = [
    {
      title: 'Harga Grosir Kompetitif',
      desc: 'Tiering harga grosir tangan pertama dengan margin menarik untuk menekan food cost usaha kuliner Anda.',
      icon: Building2,
    },
    {
      title: 'Konsistensi Mutu Grade A',
      desc: 'Bebas cemas akan fluktuasi rasa. Kami menjamin suplai rempah dengan aroma, kekeringan, dan kebersihan yang konsisten.',
      icon: ShieldCheck,
    },
    {
      title: 'Kemasan Bulk Higienis',
      desc: 'Tersedia opsi kemasan bulk 500g, 1kg, 5kg, hingga karungan 25kg dengan sealing kedap udara higienis.',
      icon: UtensilsCrossed,
    },
    {
      title: 'Pengiriman Terjadwal',
      desc: 'Dukungan suplai berkala tepat waktu untuk wilayah Bandung & sekitarnya, serta kargo ekspedisi ke seluruh Indonesia.',
      icon: Truck,
    },
    {
      title: 'Faktur & Invoice Resmi',
      desc: 'Dokumentasi pembelian transparan dan rapi untuk kebutuhan administrasi pembukuan dan akuntansi bisnis Anda.',
      icon: FileText,
    },
    {
      title: 'Dukungan Sampel Gratis',
      desc: 'Konsultasi dan sampel produk rempah untuk chef/R&D sebelum melakukan pemesanan dalam partai besar.',
      icon: Sparkles,
    },
  ];

  return (
    <div className="pt-28 pb-24 bg-linen min-h-screen space-y-16 sm:space-y-24">
      
      {/* 1. Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#25392B] via-sage-dark to-cinnamon-dark text-linen rounded-3xl p-8 sm:p-14 shadow-warm-lg relative overflow-hidden border border-sage/40">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sage/30 text-sage-light text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              Kemitraan Bisnis & Grosir B2B
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
              Mitra Pasokan Rempah Andal untuk Bisnis Kuliner Anda
            </h1>
            <p className="text-sm sm:text-base text-linen/90 leading-relaxed font-light">
              Tingkatkan standar kelezatan menu restoran, katering, atau usaha herbal Anda dengan rempah murni berkualitas tinggi langsung dari produsen terpercaya di Bandung.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Benefit Kerjasama B2B */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-sage uppercase tracking-wider">Keunggulan Mitra</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-cinnamon">
            Mengapa Ratusan Pelaku Kuliner Memilih Cap Sahabat?
          </h2>
          <p className="text-xs sm:text-sm text-roast-muted">
            Solusi pasokan bahan baku rempah yang stabil, bersih, dan hemat biaya.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {partnerBenefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-linen-dark shadow-warm-sm space-y-3 hover:border-turmeric/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-sage/10 text-sage border border-sage/30 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-base text-cinnamon">{item.title}</h3>
                <p className="text-xs text-roast-muted leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Form Diskusi Kemitraan B2B */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-linen-dark shadow-warm-md overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Info Side (Aksen Coklat Rempah Sekunder) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-brown via-brown to-brown-dark text-linen p-8 sm:p-10 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs text-turmeric font-bold uppercase tracking-wider">Form Pengajuan B2B</span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
                Mulai Kemitraan Rempah Hari Ini
              </h3>
              <p className="text-xs sm:text-sm text-linen/85 leading-relaxed font-light">
                Isi data usaha Anda. Tim spesialis B2B kami akan segera meninjau kebutuhan pasokan dan mengirimkan penawaran harga grosir khusus.
              </p>

              <div className="space-y-3 pt-4 text-xs">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-turmeric" />
                  <span>Katalog lengkap dengan lebih dari 80+ jenis rempah</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-turmeric" />
                  <span>Kemasan bulk food grade kedap udara</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-turmeric" />
                  <span>Bisa request sampel untuk tes resep menu</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 border border-white/10 text-xs space-y-1">
              <p className="font-bold text-turmeric">Hubungi Langsung Admin B2B:</p>
              <p className="text-linen">{settings.whatsappB2B || settings.whatsappNumber || '+62 813-7878-1327'}</p>
              <p className="text-[11px] text-linen/70">Senin - Sabtu (08.00 - 16.30 WIB)</p>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7 p-8 sm:p-10">
            <form onSubmit={handleB2bSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-roast-muted font-bold mb-1">Nama PIC / Kontak *</label>
                  <input
                    type="text"
                    required
                    value={b2bForm.picName}
                    onChange={(e) => setB2bForm({ ...b2bForm, picName: e.target.value })}
                    placeholder="Contoh: Chef Rendy"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-linen-dark bg-linen focus:bg-white focus:outline-none focus:border-turmeric focus:ring-1 focus:ring-turmeric text-roast"
                  />
                </div>

                <div>
                  <label className="block text-roast-muted font-bold mb-1">Nama Usaha / Brand *</label>
                  <input
                    type="text"
                    required
                    value={b2bForm.businessName}
                    onChange={(e) => setB2bForm({ ...b2bForm, businessName: e.target.value })}
                    placeholder="Contoh: Resto Sedap Rasa"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-linen-dark bg-linen focus:bg-white focus:outline-none focus:border-turmeric focus:ring-1 focus:ring-turmeric text-roast"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-roast-muted font-bold mb-1">Bidang Usaha</label>
                  <select
                    value={b2bForm.businessType}
                    onChange={(e) => setB2bForm({ ...b2bForm, businessType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-linen-dark bg-linen focus:bg-white focus:outline-none focus:border-turmeric focus:ring-1 focus:ring-turmeric text-roast font-medium"
                  >
                    <option value="Restoran / Rumah Makan">Restoran / Rumah Makan</option>
                    <option value="Katering & Wedding Organizer">Katering & Wedding Organizer</option>
                    <option value="Cafe & Bistro">Cafe & Bistro</option>
                    <option value="Hotel & Penginapan">Hotel & Penginapan</option>
                    <option value="UMKM Olahan Makanan">UMKM Olahan Makanan</option>
                    <option value="Reseller / Toko Herbal">Reseller / Toko Herbal</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-roast-muted font-bold mb-1">Kota / Lokasi Usaha *</label>
                  <input
                    type="text"
                    required
                    value={b2bForm.city}
                    onChange={(e) => setB2bForm({ ...b2bForm, city: e.target.value })}
                    placeholder="Contoh: Kota Bandung"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-linen-dark bg-linen focus:bg-white focus:outline-none focus:border-turmeric focus:ring-1 focus:ring-turmeric text-roast"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-roast-muted font-bold mb-1">Nomor WhatsApp Aktif *</label>
                  <input
                    type="tel"
                    required
                    value={b2bForm.phone}
                    onChange={(e) => setB2bForm({ ...b2bForm, phone: e.target.value })}
                    placeholder="08xxxxxxxxxx"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-linen-dark bg-linen focus:bg-white focus:outline-none focus:border-turmeric focus:ring-1 focus:ring-turmeric text-roast"
                  />
                </div>

                <div>
                  <label className="block text-roast-muted font-bold mb-1">Estimasi Kebutuhan Rutin</label>
                  <select
                    value={b2bForm.estimatedVolume}
                    onChange={(e) => setB2bForm({ ...b2bForm, estimatedVolume: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-linen-dark bg-linen focus:bg-white focus:outline-none focus:border-turmeric focus:ring-1 focus:ring-turmeric text-roast font-medium"
                  >
                    <option value="< 10 kg / bulan">&lt; 10 kg / bulan</option>
                    <option value="10 - 50 kg / bulan">10 - 50 kg / bulan</option>
                    <option value="50 - 200 kg / bulan">50 - 200 kg / bulan</option>
                    <option value="> 200 kg / bulan">&gt; 200 kg / bulan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-roast-muted font-bold mb-1">Kebutuhan Rempah Khusus / Catatan</label>
                <textarea
                  rows={3}
                  value={b2bForm.notes}
                  onChange={(e) => setB2bForm({ ...b2bForm, notes: e.target.value })}
                  placeholder="Sebutkan jenis rempah yang sering dibutuhkan (misal: Lada Hitam, Kayu Manis, Cengkeh, Bumbu Cajun, dll.)..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-linen-dark bg-linen focus:bg-white focus:outline-none focus:border-turmeric focus:ring-1 focus:ring-turmeric text-roast"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-turmeric hover:bg-turmeric-hover text-cinnamon-dark font-black text-xs flex items-center justify-center gap-2 shadow-warm-md transition-transform hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Pengajuan Kerjasama ke WhatsApp Admin B2B</span>
                </button>
              </div>
            </form>
          </div>

        </div>
      </section>

    </div>
  );
}

