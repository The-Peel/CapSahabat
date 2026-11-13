import React, { useState, useEffect } from 'react';
import { dataService } from '../../services/dataService';
import { 
  Image as ImageIcon, Plus, Edit2, Trash2, ArrowUp, ArrowDown, Upload, 
  Eye, Check, X, Sparkles, ExternalLink 
} from 'lucide-react';

export default function AdminBanners() {
  const [banners, setBanners] = useState(() => dataService.getBanners());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);

  const initialForm = {
    title: '',
    subtitle: '',
    tag: 'Official Cap Sahabat',
    image: '',
    ctaText: 'Pesan Sekarang',
    ctaLink: '/katalog',
    secondaryCtaText: 'Kerjasama B2B',
    secondaryCtaLink: '/partner-b2b',
    isActive: true,
  };
  const [formData, setFormData] = useState(initialForm);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    const handleBannersChange = () => setBanners(dataService.getBanners());
    window.addEventListener('capsahabat_banners_changed', handleBannersChange);
    return () => window.removeEventListener('capsahabat_banners_changed', handleBannersChange);
  }, []);

  const handleOpenAddModal = () => {
    setEditingBanner(null);
    setFormData(initialForm);
    setImagePreview('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (banner) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title,
      subtitle: banner.subtitle || '',
      tag: banner.tag || 'Promo Sahabat',
      image: banner.image || '',
      ctaText: banner.ctaText || 'Lihat Katalog',
      ctaLink: banner.ctaLink || '/katalog',
      secondaryCtaText: banner.secondaryCtaText || '',
      secondaryCtaLink: banner.secondaryCtaLink || '',
      isActive: banner.isActive !== false,
    });
    setImagePreview(banner.image || '');
    setIsModalOpen(true);
  };

  const handleImageFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveBanner = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const payload = {
      title: formData.title.trim(),
      subtitle: formData.subtitle.trim(),
      tag: formData.tag.trim(),
      image: formData.image || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1400&q=80',
      ctaText: formData.ctaText.trim(),
      ctaLink: formData.ctaLink.trim(),
      secondaryCtaText: formData.secondaryCtaText.trim(),
      secondaryCtaLink: formData.secondaryCtaLink.trim(),
      isActive: formData.isActive,
    };

    if (editingBanner) {
      dataService.updateBanner(editingBanner.id, payload);
    } else {
      dataService.addBanner(payload);
    }

    setIsModalOpen(false);
  };

  const handleDeleteBanner = (id) => {
    if (confirm('Yakin ingin menghapus banner ini?')) {
      dataService.deleteBanner(id);
    }
  };

  const handleToggleActive = (banner) => {
    dataService.updateBanner(banner.id, {
      isActive: !banner.isActive,
    });
  };

  const handleMoveOrder = (index, direction) => {
    const newBanners = [...banners];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newBanners.length) return;

    const temp = newBanners[index];
    newBanners[index] = newBanners[targetIndex];
    newBanners[targetIndex] = temp;

    // re-assign orderIndex
    newBanners.forEach((b, idx) => {
      b.orderIndex = idx + 1;
    });

    dataService.saveBanners(newBanners);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-cinnamon">
            Kelola Banner Homepage
          </h1>
          <p className="text-xs text-roast-muted mt-0.5">
            Atur slide banner utama di halaman beranda, judul promo, tombol CTA, dan gambar display.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2.5 rounded-xl bg-turmeric hover:bg-turmeric-hover text-cinnamon-dark font-black text-xs flex items-center gap-1.5 shadow-sm transition-transform hover:scale-105 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Banner Baru</span>
        </button>
      </div>

      {/* Banner Cards List */}
      <div className="space-y-4">
        {banners.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-linen-dark text-roast-muted text-xs">
            Belum ada banner terdaftar. Klik tombol Tambah Banner Baru di atas.
          </div>
        ) : (
          banners.map((banner, idx) => (
            <div
              key={banner.id}
              className={`bg-white rounded-3xl border overflow-hidden shadow-warm-sm transition-all grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 sm:p-5 ${
                banner.isActive !== false ? 'border-linen-dark' : 'border-gray-200 opacity-60 bg-gray-50'
              }`}
            >
              {/* Order index & move buttons */}
              <div className="md:col-span-1 flex md:flex-col items-center justify-center gap-1">
                <button
                  disabled={idx === 0}
                  onClick={() => handleMoveOrder(idx, -1)}
                  className="p-1 rounded-lg text-roast-light hover:bg-linen disabled:opacity-30"
                  title="Pindah ke Atas"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <span className="font-mono font-bold text-xs text-cinnamon px-2">
                  #{idx + 1}
                </span>
                <button
                  disabled={idx === banners.length - 1}
                  onClick={() => handleMoveOrder(idx, 1)}
                  className="p-1 rounded-lg text-roast-light hover:bg-linen disabled:opacity-30"
                  title="Pindah ke Bawah"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>

              {/* Banner Thumbnail */}
              <div className="md:col-span-3 rounded-2xl overflow-hidden aspect-[16/9] bg-linen-dark relative border border-linen-dark">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-cinnamon-dark/90 text-turmeric text-[10px] font-bold">
                  {banner.tag || 'Slide Promo'}
                </div>
              </div>

              {/* Banner Details */}
              <div className="md:col-span-5 space-y-1.5 text-xs">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif font-bold text-base text-cinnamon line-clamp-1">
                    {banner.title}
                  </h3>
                </div>
                <p className="text-roast-muted line-clamp-2 leading-relaxed">
                  {banner.subtitle}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="px-2 py-0.5 rounded-md bg-linen border border-linen-dark text-[10px] font-bold text-cinnamon">
                    CTA: {banner.ctaText} ({banner.ctaLink})
                  </span>
                  {banner.secondaryCtaText && (
                    <span className="px-2 py-0.5 rounded-md bg-linen border border-linen-dark text-[10px] font-bold text-roast-muted">
                      CTA 2: {banner.secondaryCtaText}
                    </span>
                  )}
                </div>
              </div>

              {/* Status & Actions */}
              <div className="md:col-span-3 flex items-center justify-end gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-linen-dark">
                <button
                  onClick={() => handleToggleActive(banner)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                    banner.isActive !== false
                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {banner.isActive !== false ? 'Aktif' : 'Non-aktif'}
                </button>

                <button
                  onClick={() => handleOpenEditModal(banner)}
                  className="p-2 rounded-xl text-cinnamon hover:bg-turmeric/20 transition-colors"
                  title="Edit Banner"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleDeleteBanner(banner.id)}
                  className="p-2 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
                  title="Hapus Banner"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))
        )}
      </div>

      {/* MODAL: Tambah / Edit Banner */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-cinnamon-dark/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-turmeric/30 my-8">
            <div className="p-5 bg-cinnamon text-linen flex items-center justify-between border-b border-turmeric/30">
              <h3 className="font-serif font-bold text-lg">
                {editingBanner ? 'Edit Banner Homepage' : 'Tambah Banner Promo Baru'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-linen/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBanner} className="p-6 space-y-4 text-xs max-h-[80vh] overflow-y-auto">
              <div>
                <label className="block text-roast font-bold mb-1">Judul Utama Banner *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Contoh: Kehangatan Rempah Murni Nusantara"
                  className="w-full px-3.5 py-2 rounded-xl border border-linen-dark bg-linen focus:bg-white focus:outline-none focus:border-turmeric text-roast"
                />
              </div>

              <div>
                <label className="block text-roast font-bold mb-1">Label Tag</label>
                <input
                  type="text"
                  value={formData.tag}
                  onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                  placeholder="Official Cap Sahabat / Promo Spesial"
                  className="w-full px-3.5 py-2 rounded-xl border border-linen-dark bg-linen focus:bg-white focus:outline-none focus:border-turmeric text-roast"
                />
              </div>

              <div>
                <label className="block text-roast font-bold mb-1">Subjudul / Deskripsi Pendek</label>
                <textarea
                  rows={2}
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Penjelasan singkat nilai produk atau penawaran promo..."
                  className="w-full px-3.5 py-2 rounded-xl border border-linen-dark bg-linen focus:bg-white focus:outline-none focus:border-turmeric text-roast"
                />
              </div>

              {/* Image Input */}
              <div className="space-y-2 border-t border-linen-dark pt-3">
                <label className="block text-roast font-bold">Gambar Banner</label>
                
                <div className="flex gap-4 items-center">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-24 h-16 rounded-xl object-cover bg-linen border border-turmeric/40 shrink-0"
                    />
                  ) : (
                    <div className="w-24 h-16 rounded-xl bg-linen border border-dashed border-roast-light/40 flex items-center justify-center text-roast-light shrink-0">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                  )}

                  <div className="flex-1 space-y-2">
                    <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-linen hover:bg-linen-dark border border-linen-dark font-bold text-cinnamon cursor-pointer transition-colors text-xs">
                      <Upload className="w-3.5 h-3.5 text-turmeric" />
                      <span>Upload Banner dari Komputer</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileUpload}
                        className="hidden"
                      />
                    </label>

                    <div>
                      <input
                        type="url"
                        value={formData.image}
                        onChange={(e) => {
                          setFormData({ ...formData, image: e.target.value });
                          setImagePreview(e.target.value);
                        }}
                        placeholder="Atau masukkan URL gambar https://..."
                        className="w-full px-3 py-1.5 rounded-xl border border-linen-dark bg-linen focus:bg-white text-[11px] text-roast"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-linen-dark">
                <div>
                  <label className="block text-roast font-bold mb-1">Teks Tombol Utama</label>
                  <input
                    type="text"
                    value={formData.ctaText}
                    onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                    placeholder="Pesan Sekarang"
                    className="w-full px-3 py-2 rounded-xl border border-linen-dark bg-linen text-roast"
                  />
                </div>
                <div>
                  <label className="block text-roast font-bold mb-1">Link Tujuan Utama</label>
                  <input
                    type="text"
                    value={formData.ctaLink}
                    onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                    placeholder="/katalog"
                    className="w-full px-3 py-2 rounded-xl border border-linen-dark bg-linen text-roast"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-roast font-bold mb-1">Teks Tombol Kedua (Opsional)</label>
                  <input
                    type="text"
                    value={formData.secondaryCtaText}
                    onChange={(e) => setFormData({ ...formData, secondaryCtaText: e.target.value })}
                    placeholder="Kerjasama B2B"
                    className="w-full px-3 py-2 rounded-xl border border-linen-dark bg-linen text-roast"
                  />
                </div>
                <div>
                  <label className="block text-roast font-bold mb-1">Link Tujuan Kedua</label>
                  <input
                    type="text"
                    value={formData.secondaryCtaLink}
                    onChange={(e) => setFormData({ ...formData, secondaryCtaLink: e.target.value })}
                    placeholder="/partner-b2b"
                    className="w-full px-3 py-2 rounded-xl border border-linen-dark bg-linen text-roast"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer p-2 rounded-xl bg-linen hover:bg-linen-dark/50">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="rounded text-turmeric focus:ring-turmeric w-4 h-4"
                />
                <span className="font-bold text-roast">Tampilkan Banner Ini di Beranda</span>
              </label>

              <div className="pt-3 border-t border-linen-dark flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-linen-dark bg-white font-bold text-roast-muted hover:bg-linen"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-turmeric hover:bg-turmeric-hover text-cinnamon-dark font-black shadow-sm"
                >
                  Simpan Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

