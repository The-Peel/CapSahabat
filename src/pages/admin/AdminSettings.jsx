import React, { useState, useEffect } from 'react';
import { dataService } from '../../services/dataService';
import { useAuth } from '../../context/AuthContext';
import { 
  Settings, ShieldAlert, ShieldCheck, Save, CheckCircle, Phone, Mail, 
  MapPin, Clock, ExternalLink, AlertTriangle 
} from 'lucide-react';

export default function AdminSettings() {
  const { isSuperAdmin, user } = useAuth();
  const [settings, setSettings] = useState(() => dataService.getSettings());
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const handleSettingsChange = () => setSettings(dataService.getSettings());
    window.addEventListener('capsahabat_settings_changed', handleSettingsChange);
    return () => window.removeEventListener('capsahabat_settings_changed', handleSettingsChange);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
    setSaveSuccess(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!isSuperAdmin) return;

    dataService.updateSettings(settings);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  // Guard for Super Admin
  if (!isSuperAdmin) {
    return (
      <div className="bg-white rounded-3xl p-10 border border-red-200 shadow-warm-sm text-center max-w-lg mx-auto space-y-4 my-8">
        <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-cinnamon">
          Akses Khusus Super Admin
        </h2>
        <p className="text-xs text-roast-muted leading-relaxed">
          Sesuai spesifikasi sistem hak akses (Role 4.2), pengelolaan informasi kontak perusahaan dan link sensitif (WhatsApp pemesanan, email resmi, tautan marketplace) hanya dapat dilakukan oleh <strong>Super Admin</strong>.
        </p>
        <p className="text-xs text-roast-light">
          Anda saat ini terdaftar sebagai role: <span className="font-mono font-bold text-cinnamon">{user?.role}</span>.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-turmeric/15 text-cinnamon text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-turmeric" />
            Hak Akses Super Admin
          </div>
          <h1 className="font-serif text-2xl font-bold text-cinnamon">
            Pengaturan Informasi Kontak & Link Sensitif
          </h1>
          <p className="text-xs text-roast-muted mt-0.5">
            Perubahan pada nomor WhatsApp atau kontak di sini akan otomatis diterapkan pada form checkout tamu dan tombol WhatsApp di seluruh website.
          </p>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Pengaturan berhasil diperbarui dan telah diterapkan ke seluruh website!</span>
        </div>
      )}

      {/* Settings Form */}
      <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 border border-linen-dark shadow-warm-sm space-y-6 text-xs">
        
        {/* Section 1: WhatsApp Links */}
        <div className="space-y-4">
          <h3 className="font-serif font-bold text-base text-cinnamon flex items-center gap-2 pb-2 border-b border-linen-dark">
            <Phone className="w-4 h-4 text-turmeric" />
            1. Link Sensitif WhatsApp & Komunikasi
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-roast font-bold mb-1">
                Nomor WhatsApp Admin (Tujuan Checkout Tamu) *
              </label>
              <input
                type="text"
                name="whatsappNumber"
                required
                value={settings.whatsappNumber}
                onChange={handleChange}
                placeholder="6281378781327"
                className="w-full px-3.5 py-2.5 rounded-xl border border-linen-dark bg-linen focus:bg-white text-roast font-mono font-bold"
              />
              <p className="text-[10px] text-roast-light mt-1">
                Gunakan format kode negara (contoh: 6281378781327). Format pesan pesanan otomatis dikirim ke nomor ini.
              </p>
            </div>

            <div>
              <label className="block text-roast font-bold mb-1">
                Nomor WhatsApp Tim B2B / Grosir
              </label>
              <input
                type="text"
                name="whatsappB2B"
                value={settings.whatsappB2B}
                onChange={handleChange}
                placeholder="6281378781327"
                className="w-full px-3.5 py-2.5 rounded-xl border border-linen-dark bg-linen focus:bg-white text-roast font-mono font-bold"
              />
              <p className="text-[10px] text-roast-light mt-1">
                Tujuan pengajuan formulir kemitraan HORECA di halaman Partner B2B.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: General Company Info */}
        <div className="space-y-4 pt-2">
          <h3 className="font-serif font-bold text-base text-cinnamon flex items-center gap-2 pb-2 border-b border-linen-dark">
            <Mail className="w-4 h-4 text-turmeric" />
            2. Informasi Perusahaan & Operasional
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-roast font-bold mb-1">Nama Perusahaan / Brand</label>
              <input
                type="text"
                name="companyName"
                value={settings.companyName}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-linen-dark bg-linen focus:bg-white text-roast"
              />
            </div>

            <div>
              <label className="block text-roast font-bold mb-1">Email Resmi</label>
              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-linen-dark bg-linen focus:bg-white text-roast font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-roast font-bold mb-1">Slogan / Tagline</label>
            <input
              type="text"
              name="tagline"
              value={settings.tagline}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-linen-dark bg-linen focus:bg-white text-roast"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-roast font-bold mb-1">Jam Operasional</label>
              <input
                type="text"
                name="operationalHours"
                value={settings.operationalHours}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-linen-dark bg-linen focus:bg-white text-roast"
              />
            </div>

            <div>
              <label className="block text-roast font-bold mb-1">Keterangan Libur Toko</label>
              <input
                type="text"
                name="operationalClosed"
                value={settings.operationalClosed}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-linen-dark bg-linen focus:bg-white text-roast"
              />
            </div>
          </div>

          <div>
            <label className="block text-roast font-bold mb-1">Alamat Ringkas Kantor / Toko Pusat</label>
            <textarea
              rows={2}
              name="address"
              value={settings.address}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-linen-dark bg-linen focus:bg-white text-roast"
            />
          </div>
        </div>

        {/* Section 3: Marketplace & External Links */}
        <div className="space-y-4 pt-2">
          <h3 className="font-serif font-bold text-base text-cinnamon flex items-center gap-2 pb-2 border-b border-linen-dark">
            <ExternalLink className="w-4 h-4 text-turmeric" />
            3. Link Official Marketplace & Peta
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-roast font-bold mb-1">URL Tokopedia Official</label>
              <input
                type="url"
                name="tokopediaUrl"
                value={settings.tokopediaUrl}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-linen-dark bg-linen focus:bg-white text-roast font-mono text-[11px]"
              />
            </div>

            <div>
              <label className="block text-roast font-bold mb-1">URL Shopee Official</label>
              <input
                type="url"
                name="shopeeUrl"
                value={settings.shopeeUrl}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-linen-dark bg-linen focus:bg-white text-roast font-mono text-[11px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-roast font-bold mb-1">URL GrabMart Merchant</label>
              <input
                type="url"
                name="grabmartUrl"
                value={settings.grabmartUrl}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-linen-dark bg-linen focus:bg-white text-roast font-mono text-[11px]"
              />
            </div>

            <div>
              <label className="block text-roast font-bold mb-1">URL Google Maps</label>
              <input
                type="url"
                name="mapsUrl"
                value={settings.mapsUrl}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-linen-dark bg-linen focus:bg-white text-roast font-mono text-[11px]"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-linen-dark flex justify-end">
          <button
            type="submit"
            className="px-6 py-3.5 rounded-xl bg-turmeric hover:bg-turmeric-hover text-cinnamon-dark font-black text-xs flex items-center gap-2 shadow-warm-md transition-transform hover:scale-105"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Semua Perubahan Pengaturan</span>
          </button>
        </div>

      </form>

    </div>
  );
}

