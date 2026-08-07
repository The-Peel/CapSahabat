import React, { useState } from 'react';
import productsData from '../data/products.json';
import { Search, ShoppingBag, ExternalLink, Sparkles, Filter, Info, X, Check } from 'lucide-react';

export default function ProductCatalog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeModalProduct, setActiveModalProduct] = useState(null);

  const categories = [
    { id: 'all', name: 'Semua Produk' },
    { id: 'rempah-botolan', name: 'Rempah Botolan & Bumbu Tabur' },
    { id: 'minuman-jsr', name: 'Minuman Kesehatan & JSR' },
    { id: 'teh-herbal', name: 'Teh Herbal & Wellness' },
    { id: 'dessert-set', name: 'Dessert Set Sehat' },
  ];

  const filteredProducts = productsData.filter((prod) => {
    const matchesCategory = selectedCategory === 'all' || prod.category === selectedCategory;
    const matchesSearch = prod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          prod.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="katalog" className="py-20 bg-linen relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-turmeric/15 text-cinnamon text-xs font-extrabold uppercase tracking-wider">
            <ShoppingBag className="w-4 h-4 text-turmeric" />
            Katalog Digital Resmi
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cinnamon">
            Katalog Rempah & Herbal Cap Sahabat
          </h2>
          <p className="text-roast-muted text-sm sm:text-base">
            Temukan aneka pilihan rempah murni botolan, bumbu tabur ala bistro, ekstrak JSR, teh herbal premium, dan dessert set sehat dengan kualitas terbaik.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-warm-sm border border-linen-dark mb-10 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between md:gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-roast-light absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari rempah, Cajun, Qust Al Hindi, Teh Chamomile..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-linen border border-linen-dark text-sm text-roast placeholder:text-roast-light focus:outline-none focus:border-turmeric focus:ring-1 focus:ring-turmeric"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-roast-light hover:text-roast"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-cinnamon text-turmeric'
                    : 'bg-ivory text-roast-muted hover:bg-linen-dark hover:text-cinnamon'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

        </div>

        {/* Products Count Info */}
        <div className="mb-6 flex items-center justify-between text-xs text-roast-muted">
          <span>Menampilkan <strong>{filteredProducts.length}</strong> produk rempah & herbal</span>
          {searchTerm && <span>Hasil pencarian: "{searchTerm}"</span>}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-linen-dark overflow-hidden shadow-warm-sm hover:shadow-warm-md hover:border-turmeric/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Thumbnail Image */}
                  <div className="relative h-48 overflow-hidden bg-linen-dark">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
                      {product.badges.map((badge, bIdx) => (
                        <span
                          key={bIdx}
                          className="px-2 py-0.5 rounded-full bg-cinnamon-dark/90 text-turmeric text-[10px] font-bold backdrop-blur-md border border-turmeric/30"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-4 space-y-2">
                    <span className="text-[10px] font-bold text-sage uppercase tracking-wider">
                      {product.categoryName}
                    </span>
                    <h3 className="font-serif font-bold text-base text-cinnamon line-clamp-1 group-hover:text-turmeric-hover transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-roast-muted line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="pt-2 flex items-baseline justify-between">
                      <span className="font-serif font-bold text-base text-cinnamon">
                        {product.price}
                      </span>
                      <span className="text-[11px] font-semibold text-roast-light bg-linen px-2 py-0.5 rounded-md">
                        {product.unit}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="p-4 pt-0 space-y-2">
                  <button
                    onClick={() => setActiveModalProduct(product)}
                    className="w-full py-2 px-3 rounded-xl bg-ivory hover:bg-linen-dark text-cinnamon text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Info className="w-3.5 h-3.5 text-turmeric" />
                    Detail & Cara Pakai
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={product.tokopediaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-2.5 rounded-xl bg-[#03AC0E] hover:bg-[#028A0B] text-white text-[11px] font-bold flex items-center justify-center gap-1 transition-transform hover:scale-[1.02]"
                    >
                      Tokopedia
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href={product.shopeeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-2.5 rounded-xl bg-[#EE4D2D] hover:bg-[#D03E21] text-white text-[11px] font-bold flex items-center justify-center gap-1 transition-transform hover:scale-[1.02]"
                    >
                      Shopee
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-linen-dark space-y-3">
            <p className="font-serif font-bold text-lg text-cinnamon">Produk tidak ditemukan</p>
            <p className="text-xs text-roast-muted">Coba gunakan kata kunci pencarian lain atau pilih kategori Semua Produk.</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
              className="px-4 py-2 bg-cinnamon text-turmeric rounded-xl text-xs font-bold"
            >
              Reset Filter
            </button>
          </div>
        )}

      </div>

      {/* Product Detail Modal */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cinnamon-dark/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 border border-turmeric/40 shadow-2xl relative">
            
            <button
              onClick={() => setActiveModalProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-linen hover:bg-linen-dark text-roast"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              <img
                src={activeModalProduct.image}
                alt={activeModalProduct.name}
                className="w-20 h-20 rounded-2xl object-cover border border-linen-dark shadow-sm"
              />
              <div>
                <span className="text-[10px] font-bold text-sage uppercase">
                  {activeModalProduct.categoryName}
                </span>
                <h3 className="font-serif font-bold text-xl text-cinnamon leading-tight">
                  {activeModalProduct.name}
                </h3>
                <p className="text-sm font-bold text-turmeric-hover mt-1">
                  {activeModalProduct.price} <span className="text-xs font-normal text-roast-muted">/ {activeModalProduct.unit}</span>
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-roast leading-relaxed bg-linen p-4 rounded-2xl border border-linen-dark">
              <p className="font-semibold text-cinnamon">Deskripsi & Keunggulan Produk:</p>
              <p>{activeModalProduct.description}</p>
              
              <div className="pt-2 border-t border-linen-dark flex items-center gap-2 text-sage font-bold">
                <Check className="w-4 h-4" />
                <span>100% Rempah & Alami Kualitas Grade A Super</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-roast-muted font-medium">Beli produk ini langsung di Official Store Cap Sahabat Rempah:</p>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={activeModalProduct.tokopediaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-[#03AC0E] hover:bg-[#028A0B] text-white text-xs font-bold text-center flex items-center justify-center gap-2"
                >
                  Beli di Tokopedia
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={activeModalProduct.shopeeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-[#EE4D2D] hover:bg-[#D03E21] text-white text-xs font-bold text-center flex items-center justify-center gap-2"
                >
                  Beli di Shopee
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
