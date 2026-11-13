import React, { useState, useEffect } from 'react';
import { dataService, formatRupiah, parsePrice } from '../../services/dataService';
import { 
  ShoppingBag, Plus, Search, Edit2, Trash2, Upload, Eye, Check, X, 
  Sparkles, AlertTriangle, ArrowUpDown, Filter 
} from 'lucide-react';

export default function AdminProducts() {
  const [products, setProducts] = useState(() => dataService.getProducts());
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Form State
  const initialForm = {
    name: '',
    category: 'rempah-botolan',
    categoryName: 'Rempah Botolan & Bumbu Tabur',
    price: '',
    unit: 'Botol 80g',
    description: '',
    image: '',
    isFeatured: false,
    isAvailable: true,
    badgesInput: 'Rempah Murni',
  };
  const [formData, setFormData] = useState(initialForm);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    const handleProductsChange = () => setProducts(dataService.getProducts());
    window.addEventListener('capsahabat_products_changed', handleProductsChange);
    return () => window.removeEventListener('capsahabat_products_changed', handleProductsChange);
  }, []);

  const categories = [
    { id: 'all', name: 'Semua Kategori' },
    { id: 'rempah-botolan', name: 'Rempah Botolan & Bumbu Tabur' },
    { id: 'minuman-jsr', name: 'Minuman Kesehatan & JSR' },
    { id: 'teh-herbal', name: 'Teh Herbal & Wellness' },
    { id: 'dessert-set', name: 'Dessert Set Sehat' },
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormData(initialForm);
    setImagePreview('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category || 'rempah-botolan',
      categoryName: product.categoryName || 'Rempah Botolan & Bumbu Tabur',
      price: product.price,
      unit: product.unit || '',
      description: product.description || '',
      image: product.image || '',
      isFeatured: !!product.isFeatured,
      isAvailable: product.isAvailable !== false,
      badgesInput: (product.badges || []).join(', '),
    });
    setImagePreview(product.image || '');
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

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const badges = formData.badgesInput
      .split(',')
      .map((b) => b.trim())
      .filter((b) => b.length > 0);

    const payload = {
      name: formData.name.trim(),
      category: formData.category,
      categoryName: categories.find((c) => c.id === formData.category)?.name || 'Rempah Cap Sahabat',
      price: parsePrice(formData.price),
      unit: formData.unit.trim(),
      description: formData.description.trim(),
      image: formData.image || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80',
      isFeatured: formData.isFeatured,
      isAvailable: formData.isAvailable,
      badges: badges.length > 0 ? badges : ['Rempah Murni'],
    };

    if (editingProduct) {
      dataService.updateProduct(editingProduct.id, payload);
    } else {
      dataService.addProduct(payload);
    }

    setIsModalOpen(false);
  };

  const handleDeleteProduct = (id) => {
    dataService.deleteProduct(id);
    setDeleteConfirmId(null);
  };

  const handleToggleAvailability = (product) => {
    dataService.updateProduct(product.id, {
      isAvailable: !product.isAvailable,
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-cinnamon">
            Kelola Katalog Produk
          </h1>
          <p className="text-xs text-roast-muted mt-0.5">
            Tambah, edit, hapus, upload foto produk, dan atur ketersediaan stok.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2.5 rounded-xl bg-turmeric hover:bg-turmeric-hover text-cinnamon-dark font-black text-xs flex items-center gap-1.5 shadow-sm transition-transform hover:scale-105 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Produk Baru</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-linen-dark shadow-warm-sm flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-roast-light absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama produk atau deskripsi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-linen border border-linen-dark text-xs text-roast focus:outline-none focus:border-turmeric focus:bg-white"
          />
        </div>

        <div className="w-full md:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full md:w-64 px-3 py-2 rounded-xl bg-linen border border-linen-dark text-xs text-roast focus:outline-none focus:border-turmeric"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-linen-dark shadow-warm-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-linen text-roast-muted uppercase font-bold border-b border-linen-dark">
              <tr>
                <th className="py-3 px-4">Foto</th>
                <th className="py-3 px-4">Nama Produk</th>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4">Harga / Satuan</th>
                <th className="py-3 px-4">Highlight</th>
                <th className="py-3 px-4">Status Stok</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-linen-dark">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-roast-muted">
                    Tidak ada produk ditemukan.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-linen/40 transition-colors">
                    {/* Image */}
                    <td className="py-3 px-4">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-12 h-12 rounded-xl object-cover bg-linen-dark border border-linen-dark"
                      />
                    </td>

                    {/* Name & Desc */}
                    <td className="py-3 px-4 max-w-xs">
                      <p className="font-serif font-bold text-sm text-cinnamon line-clamp-1">{p.name}</p>
                      <p className="text-[11px] text-roast-muted line-clamp-1 mt-0.5">{p.description}</p>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4">
                      <span className="text-[10px] font-bold text-sage bg-sage/10 px-2 py-0.5 rounded-md">
                        {p.categoryName || p.category}
                      </span>
                    </td>

                    {/* Price & Unit */}
                    <td className="py-3 px-4">
                      <p className="font-serif font-bold text-sm text-cinnamon">
                        {formatRupiah(p.price)}
                      </p>
                      <p className="text-[10px] text-roast-light">{p.unit}</p>
                    </td>

                    {/* Featured */}
                    <td className="py-3 px-4">
                      {p.isFeatured ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-turmeric bg-turmeric/10 px-2 py-0.5 rounded-full">
                          <Sparkles className="w-3 h-3" />
                          Beranda
                        </span>
                      ) : (
                        <span className="text-[10px] text-roast-light">-</span>
                      )}
                    </td>

                    {/* Availability Toggle */}
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleToggleAvailability(p)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors ${
                          p.isAvailable !== false
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {p.isAvailable !== false ? 'Aktif' : 'Non-aktif'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right space-x-1">
                      <button
                        onClick={() => handleOpenEditModal(p)}
                        className="p-1.5 rounded-lg text-cinnamon hover:bg-turmeric/20 transition-colors"
                        title="Edit Produk"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(p.id)}
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                        title="Hapus Produk"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: Tambah / Edit Produk */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-cinnamon-dark/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-turmeric/30 my-8">
            <div className="p-5 bg-cinnamon text-linen flex items-center justify-between border-b border-turmeric/30">
              <h3 className="font-serif font-bold text-lg">
                {editingProduct ? 'Edit Produk Cap Sahabat' : 'Tambah Produk Baru'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-linen/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 space-y-4 text-xs max-h-[80vh] overflow-y-auto">
              <div>
                <label className="block text-roast font-bold mb-1">Nama Produk *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Contoh: Kayu Manis Utuh Grade A"
                  className="w-full px-3.5 py-2 rounded-xl border border-linen-dark bg-linen focus:bg-white focus:outline-none focus:border-turmeric text-roast"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-roast font-bold mb-1">Kategori</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-linen-dark bg-linen focus:bg-white focus:outline-none focus:border-turmeric text-roast"
                  >
                    {categories.filter((c) => c.id !== 'all').map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-roast font-bold mb-1">Satuan / Kemasan</label>
                  <input
                    type="text"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    placeholder="Botol 80g / Pouch 100g"
                    className="w-full px-3.5 py-2 rounded-xl border border-linen-dark bg-linen focus:bg-white focus:outline-none focus:border-turmeric text-roast"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-roast font-bold mb-1">Harga (Angka) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="Contoh: 14000"
                    className="w-full px-3.5 py-2 rounded-xl border border-linen-dark bg-linen focus:bg-white focus:outline-none focus:border-turmeric text-roast font-mono"
                  />
                  {formData.price && (
                    <p className="text-[10px] text-turmeric font-bold mt-1">
                      Preview: {formatRupiah(formData.price)}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-roast font-bold mb-1">Label Badges</label>
                  <input
                    type="text"
                    value={formData.badgesInput}
                    onChange={(e) => setFormData({ ...formData, badgesInput: e.target.value })}
                    placeholder="Best Seller, 100% Organik"
                    className="w-full px-3.5 py-2 rounded-xl border border-linen-dark bg-linen focus:bg-white focus:outline-none focus:border-turmeric text-roast"
                  />
                  <p className="text-[10px] text-roast-light mt-0.5">Pisahkan dengan koma</p>
                </div>
              </div>

              <div>
                <label className="block text-roast font-bold mb-1">Deskripsi Produk</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Karakteristik aroma, saran penggunaan memasak, atau khasiat herbal..."
                  className="w-full px-3.5 py-2 rounded-xl border border-linen-dark bg-linen focus:bg-white focus:outline-none focus:border-turmeric text-roast"
                />
              </div>

              {/* Upload Foto Produk */}
              <div className="space-y-2 border-t border-linen-dark pt-3">
                <label className="block text-roast font-bold">Foto Produk</label>
                
                <div className="flex gap-4 items-center">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-20 h-20 rounded-2xl object-cover bg-linen border border-turmeric/40 shrink-0"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-2xl bg-linen border border-dashed border-roast-light/40 flex items-center justify-center text-roast-light shrink-0">
                      <ShoppingBag className="w-6 h-6" />
                    </div>
                  )}

                  <div className="flex-1 space-y-2">
                    <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-linen hover:bg-linen-dark border border-linen-dark font-bold text-cinnamon cursor-pointer transition-colors text-xs">
                      <Upload className="w-3.5 h-3.5 text-turmeric" />
                      <span>Upload Foto dari Komputer</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileUpload}
                        className="hidden"
                      />
                    </label>

                    <div>
                      <p className="text-[10px] text-roast-light mb-1">Atau masukkan URL gambar:</p>
                      <input
                        type="url"
                        value={formData.image}
                        onChange={(e) => {
                          setFormData({ ...formData, image: e.target.value });
                          setImagePreview(e.target.value);
                        }}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full px-3 py-1.5 rounded-xl border border-linen-dark bg-linen focus:bg-white text-[11px] text-roast"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-linen-dark">
                <label className="flex items-center gap-2 cursor-pointer p-2 rounded-xl bg-linen hover:bg-linen-dark/50">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="rounded text-turmeric focus:ring-turmeric w-4 h-4"
                  />
                  <span className="font-bold text-roast">Highlight Beranda</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer p-2 rounded-xl bg-linen hover:bg-linen-dark/50">
                  <input
                    type="checkbox"
                    checked={formData.isAvailable}
                    onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                    className="rounded text-turmeric focus:ring-turmeric w-4 h-4"
                  />
                  <span className="font-bold text-roast">Stok Tersedia</span>
                </label>
              </div>

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
                  Simpan Produk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-cinnamon-dark/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl border border-red-200 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-cinnamon">Hapus Produk Ini?</h4>
              <p className="text-xs text-roast-muted mt-1">
                Produk akan dihapus permanen dari katalog dan tidak akan tampil lagi bagi pengunjung website.
              </p>
            </div>
            <div className="flex gap-2 pt-2 text-xs">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="w-1/2 py-2.5 rounded-xl border border-linen-dark bg-white font-bold text-roast"
              >
                Batal
              </button>
              <button
                onClick={() => handleDeleteProduct(deleteConfirmId)}
                className="w-1/2 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold shadow-sm"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

