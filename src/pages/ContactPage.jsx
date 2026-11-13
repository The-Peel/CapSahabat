import React, { useState, useEffect } from 'react';
import { dataService } from '../services/dataService';
import storeLocationsData from '../data/storeLocations.json';
import { 
  Phone, Mail, MapPin, Clock, MessageSquare, Send, ExternalLink, ShieldAlert, Store 
} from 'lucide-react';

export default function ContactPage() {
  const [settings, setSettings] = useState(() => dataService.getSettings());
  const [messageForm, setMessageForm] = useState({
    name: '',
    phone: '',
    subject: 'Pertanyaan Produk',
    message: '',
  });

  useEffect(() => {
    const handleSettingsChange = () => setSettings(dataService.getSettings());
    window.addEventListener('capsahabat_settings_changed', handleSettingsChange);
    return () => window.removeEventListener('capsahabat_settings_changed', handleSettingsChange);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const cleanPhone = (settings.whatsappNumber || '6281378781327').replace(/[^0-9]/g, '');
    const text = `Halo Admin Cap Sahabat,
Saya: ${messageForm.name}
No HP: ${messageForm.phone}
Topik: ${messageForm.subject}
Pesan: ${messageForm.message}`;

    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="pt-28 pb-24 bg-linen min-h-screen space-y-16">
      
      {/* 1. Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-turmeric/15 text-cinnamon text-xs font-black uppercase tracking-wider">
            <Phone className="w-4 h-4 text-turmeric" />
            Layanan Pelanggan & Alamat
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cinnamon">
            Hubungi Cap Sahabat Rempah
          </h1>
          <p className="text-roast-muted text-xs sm:text-base leading-relaxed">
            Punya pertanyaan mengenai stok produk, pemesanan kustom, atau ingin mengunjungi cabang toko fisik kami di Bandung? Tim admin kami siap melayani Anda.
          </p>
        </div>
      </section>

      {/* 2. Contact Info & Quick Message Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-cinnamon text-linen rounded-3xl p-6 sm:p-8 space-y-6 shadow-warm-md border border-turmeric/30">
            <div>
              <span className="text-xs text-turmeric font-bold uppercase tracking-wider">Kontak Resmi</span>
              <h2 className="font-serif text-2xl font-bold mt-1">Informasi Perusahaan</h2>
              <p className="text-xs text-linen/80 mt-1">
                Layanan pelanggan aktif setiap hari kerja pada jam operasional toko.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/10 border border-white/10">
                <Phone className="w-5 h-5 text-turmeric shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-linen">WhatsApp Admin:</p>
                  <a
                    href={`https://wa.me/${(settings.whatsappNumber || '').replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-turmeric font-semibold hover:underline mt-0.5 block"
                  >
                    {settings.whatsappNumber || '+62 813-7878-1327'}
                  </a>
                  <p className="text-[11px] text-linen/70 mt-0.5">Respons cepat untuk pemesanan & info stok</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/10 border border-white/10">
                <Mail className="w-5 h-5 text-turmeric shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-linen">Email Resmi:</p>
                  <a
                    href={`mailto:${settings.email || 'kontak@capsahabat.com'}`}
                    className="text-turmeric font-semibold hover:underline mt-0.5 block"
                  >
                    {settings.email || 'kontak@capsahabat.com'}
                  </a>
                  <p className="text-[11px] text-linen/70 mt-0.5">Untuk korespondensi resmi & penawaran kerjasama</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/10 border border-white/10">
                <Clock className="w-5 h-5 text-turmeric shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-linen">Jam Operasional:</p>
                  <p className="text-linen/90 mt-0.5 font-medium">{settings.operationalHours}</p>
                  <p className="text-[11px] text-red-300 mt-0.5">{settings.operationalClosed}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/10 border border-white/10">
                <MapPin className="w-5 h-5 text-turmeric shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-linen">Alamat Pusat:</p>
                  <p className="text-linen/90 mt-0.5">{settings.address}</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={settings.mapsUrl || 'https://maps.google.com/?q=Pasar+Parahyangan+Kota+Baru+Parahyangan'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-turmeric text-cinnamon-dark font-black text-xs flex items-center justify-center gap-2 hover:bg-turmeric-hover transition-colors shadow-sm"
              >
                <MapPin className="w-4 h-4" />
                <span>Buka Petunjuk Arah di Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Message Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-linen-dark shadow-warm-sm space-y-5">
            <div>
              <span className="text-xs text-sage font-bold uppercase tracking-wider">Kirim Pesan</span>
              <h2 className="font-serif text-2xl font-bold text-cinnamon mt-1">
                Tinggalkan Pertanyaan Langsung
              </h2>
              <p className="text-xs sm:text-sm text-roast-muted mt-1">
                Isi form berikut dan pesan Anda akan langsung diteruskan ke WhatsApp Admin Cap Sahabat.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-roast-muted font-bold mb-1">Nama Anda *</label>
                  <input
                    type="text"
                    required
                    value={messageForm.name}
                    onChange={(e) => setMessageForm({ ...messageForm, name: e.target.value })}
                    placeholder="Nama lengkap"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-linen-dark bg-linen focus:bg-white focus:outline-none focus:border-turmeric focus:ring-1 focus:ring-turmeric text-roast"
                  />
                </div>

                <div>
                  <label className="block text-roast-muted font-bold mb-1">Nomor WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={messageForm.phone}
                    onChange={(e) => setMessageForm({ ...messageForm, phone: e.target.value })}
                    placeholder="08xxxxxxxxxx"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-linen-dark bg-linen focus:bg-white focus:outline-none focus:border-turmeric focus:ring-1 focus:ring-turmeric text-roast"
                  />
                </div>
              </div>

              <div>
                <label className="block text-roast-muted font-bold mb-1">Topik Pertanyaan</label>
                <select
                  value={messageForm.subject}
                  onChange={(e) => setMessageForm({ ...messageForm, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-linen-dark bg-linen focus:bg-white focus:outline-none focus:border-turmeric focus:ring-1 focus:ring-turmeric text-roast font-medium"
                >
                  <option value="Pertanyaan Produk & Khasiat">Pertanyaan Produk & Khasiat</option>
                  <option value="Pemesanan Partai / Grosir">Pemesanan Partai / Grosir</option>
                  <option value="Cek Ongkir & Pengiriman Luar Kota">Cek Ongkir & Pengiriman Luar Kota</option>
                  <option value="Kunjungan Toko Fisik">Kunjungan Toko Fisik</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              <div>
                <label className="block text-roast-muted font-bold mb-1">Isi Pesan *</label>
                <textarea
                  rows={4}
                  required
                  value={messageForm.message}
                  onChange={(e) => setMessageForm({ ...messageForm, message: e.target.value })}
                  placeholder="Tuliskan pertanyaan atau kebutuhan rempah Anda..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-linen-dark bg-linen focus:bg-white focus:outline-none focus:border-turmeric focus:ring-1 focus:ring-turmeric text-roast"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-turmeric hover:bg-turmeric-hover text-cinnamon-dark font-black text-xs flex items-center justify-center gap-2 shadow-warm-md transition-transform hover:scale-[1.01]"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Pesan ke WhatsApp Admin</span>
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* 3. Tiga Cabang Toko Fisik */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <span className="text-xs font-bold text-sage uppercase tracking-wider">Kunjungan Langsung</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-cinnamon">
            3 Cabang Toko Fisik Cap Sahabat di Bandung
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {storeLocationsData.map((loc) => (
            <div
              key={loc.id}
              className="bg-white rounded-3xl overflow-hidden border border-linen-dark shadow-warm-sm flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 overflow-hidden bg-linen-dark">
                  <img
                    src={loc.image}
                    alt={loc.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-cinnamon-dark/90 text-turmeric text-[10px] font-bold">
                    {loc.tag}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="font-serif font-bold text-lg text-cinnamon">{loc.name}</h3>
                  <p className="text-xs text-roast-muted leading-relaxed flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-turmeric shrink-0 mt-0.5" />
                    <span>{loc.address}</span>
                  </p>
                  <p className="text-xs text-roast-muted flex items-start gap-2">
                    <Clock className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                    <span>{loc.hours}</span>
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 space-y-2">
                <a
                  href={loc.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-xl bg-linen hover:bg-linen-dark text-cinnamon font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-turmeric" />
                  <span>Buka di Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                {loc.grabMartAvailable && (
                  <a
                    href={loc.grabMartUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-xl bg-[#00B14F] hover:bg-[#009141] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Pesan Instan via GrabMart</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Google Maps Embed (Pusat Pasar Parahyangan KBP) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-linen-dark shadow-warm-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-base text-cinnamon flex items-center gap-2">
              <MapPin className="w-5 h-5 text-turmeric" />
              Peta Lokasi Pasar Parahyangan KBP
            </h3>
            <span className="text-[11px] text-roast-muted">Kota Baru Parahyangan, Bandung Barat</span>
          </div>
          <div className="w-full h-80 rounded-2xl overflow-hidden bg-linen border border-linen-dark">
            <iframe
              title="Google Maps Cap Sahabat"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.0426543166666!2d107.4727937!3d-6.8854992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e3a2468f3a3d%3A0xe5529f7c04101e4!2sPasar%20Parahyangan!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

    </div>
  );
}

