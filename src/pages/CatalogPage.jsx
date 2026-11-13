import React, { useState, useEffect } from 'react';
import { dataService, formatRupiah, parsePrice } from '../services/dataService';
import { useCart } from '../context/CartContext';
import { 
  Search, ShoppingBag, Plus, Minus, Info, X, Check, Filter, Sparkles, ArrowRight 
} from 'lucide-react';

export default function CatalogPage() {
  const [products, setProducts] = useState(() => dataService.getProducts());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeModalProduct, setActiveModalProduct] = useState(null);
  const [productQuantities, setProductQuantities] = useState({});

  const { addToCart, setIsCartOpen, cartCount, cartSubtotal } = useCart();

  useEffect(() => {
    const handleProductsChange = () => setProducts(dataService.getProducts());
    window.addEventListener('capsahabat_products_changed', handleProductsChange);
    return () => window.removeEventListener('capsahabat_products_changed', handleProductsChange);
  }, []);

  const categories = [
    { id: 'all', name: 'Semua Produk' },
    { id: 'rempah-botolan', name: 'Rempah Botolan & Bumbu Tabur' },
    { id: 'minuman-jsr', name: 'Minuman Kesehatan & JSR' },
    { id: 'teh-herbal', name: 'Teh Herbal & Wellness' },
    { id: 'dessert-set', name: 'Dessert Set Sehat' },
  ];

  const filteredProducts = products.filter((prod) => {
    if (prod.isAvailable === false) return false;
    const matchesCategory = selectedCategory === 'all' || prod.category === selectedCategory;
    const matchesSearch = prod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (prod.description && prod.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleQtyChange = (productId, delta) => {
    setProductQuantities((prev) => {
      const current = prev[productId] || 1;
      const next = Math.max(1, current + delta);
      return { ...prev, [productId]: next };
    });
  };

  const handleAddToCart = (product) => {
    const qty = productQuantities[product.id] || 1;
    addToCart(product, qty);
    setProductQuantities((prev) => ({ ...prev, [product.id]: 1 }));
  };

  return (
    <div className="pt-28 pb-24 bg-linen min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-turmeric/15 text-cinnamon text-xs font-black uppercase tracking-wider">
            <ShoppingBag className="w-4 h-4 text-turmeric" />
            Katalog Produk Resmi
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cinnamon">
            Katalog Rempah & Herbal Cap Sahabat
          </h1>
          <p className="text-roast-muted text-xs sm:text-base leading-relaxed">
            Pilih rempah murni botolan, bumbu racik, ramuan herbal JSR, dan teh alami berkualitas tinggi. Tentukan jumlah pesanan dan kirimkan langsung ke WhatsApp Admin kami.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-warm-sm border border-linen-dark space-y-4 md:space-y-0 md:flex md:items-center md:justify-between md:gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-roast-light absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari rempah, bumbu, JSR, atau teh..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-linen border border-linen-dark text-xs sm:text-sm text-roast placeholder:text-roast-light focus:outline-none focus:border-turmeric focus:ring-1 focus:ring-turmeric"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-roast-light hover:text-roast"
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
                    ? 'bg-cinnamon text-turmeric shadow-sm'
                    : 'bg-ivory text-roast-muted hover:bg-linen-dark hover:text-cinnamon'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

        </div>

        {/* Products Count Info & Sticky Cart Alert */}
        <div className="flex items-center justify-between text-xs text-roast-muted px-1">
          <span>Menampilkan <strong>{filteredProducts.length}</strong> produk rempah & herbal</span>
          {cartCount > 0 && (
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-1.5 text-cinnamon font-bold hover:text-turmeric transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-turmeric" />
              <span>{cartCount} item di pesanan sementara ({formatRupiah(cartSubtotal)})</span>
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const priceNum = parsePrice(product.price);
              const currentQty = productQuantities[product.id] || 1;

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-linen-dark overflow-hidden shadow-warm-sm hover:shadow-warm-md hover:border-turmeric/40 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Image & Badges */}
                    <div className="relative h-48 overflow-hidden bg-linen-dark">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
                        {product.badges?.map((badge, bIdx) => (
                          <span
                            key={bIdx}
                            className="px-2 py-0.5 rounded-full bg-cinnamon-dark/90 text-turmeric text-[10px] font-bold backdrop-blur-md border border-turmeric/30"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-4 space-y-2">
                      <span className="text-[10px] font-bold text-sage uppercase tracking-wider">
                        {product.categoryName || 'Rempah Murni'}
                      </span>
                      <h3 className="font-serif font-bold text-base text-cinnamon line-clamp-1 group-hover:text-turmeric transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs text-roast-muted line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>

                      <div className="pt-2 flex items-baseline justify-between">
                        <span className="font-serif font-bold text-base text-cinnamon">
                          {formatRupiah(priceNum)}
                        </span>
                        {product.unit && (
                          <span className="text-[11px] font-semibold text-roast-light bg-linen px-2 py-0.5 rounded-md">
                            {product.unit}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Actions: Info Modal + Qty Input + Tambah ke Pesanan */}
                  <div className="p-4 pt-0 space-y-2">
                    <button
                      onClick={() => setActiveModalProduct(product)}
                      className="w-full py-1.5 px-3 rounded-xl bg-linen hover:bg-linen-dark text-cinnamon text-[11px] font-bold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Info className="w-3.5 h-3.5 text-turmeric" />
                      Detail & Khasiat
                    </button>

                    {/* Quantity Field */}
                    <div className="flex items-center justify-between border border-linen-dark rounded-xl bg-linen p-1">
                      <button
                        onClick={() => handleQtyChange(product.id, -1)}
                        className="p-1 hover:bg-white rounded-lg text-roast transition-colors"
                        aria-label="Kurangi"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold text-cinnamon px-2">
                        {currentQty}
                      </span>
                      <button
                        onClick={() => handleQtyChange(product.id, 1)}
                        className="p-1 hover:bg-white rounded-lg text-roast transition-colors"
                        aria-label="Tambah"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Tombol Tambah ke Pesanan */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full py-2.5 px-3 rounded-xl bg-turmeric hover:bg-turmeric-hover text-cinnamon-dark text-xs font-black transition-transform hover:scale-[1.01] flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Tambah ke Pesanan
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-linen-dark space-y-3">
            <p className="font-serif font-bold text-lg text-cinnamon">Produk Tidak Ditemukan</p>
            <p className="text-xs text-roast-muted">Silakan coba kata kunci lain atau reset filter kategori.</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
              className="px-4 py-2 bg-cinnamon text-turmeric rounded-xl text-xs font-bold"
            >
              Reset Filter
            </button>
          </div>
        )}

      </div>

      {/* Floating Bottom Cart Bar (if items in cart) */}
      {cartCount > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 max-w-md w-full px-4 animate-fadeIn">
          <div className="bg-cinnamon text-linen rounded-2xl p-3 sm:p-4 shadow-2xl border border-turmeric/40 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-turmeric/20 text-turmeric flex items-center justify-center font-bold text-sm">
                {cartCount}
              </div>
              <div className="text-xs">
                <p className="text-linen/80">Pesanan Sementara:</p>
                <p className="font-serif font-bold text-sm text-turmeric">{formatRupiah(cartSubtotal)}</p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="px-4 py-2 rounded-xl bg-turmeric hover:bg-turmeric-hover text-cinnamon-dark font-black text-xs flex items-center gap-1.5 shadow-md transition-transform hover:scale-105"
            >
              <span>Lihat & Pesan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cinnamon-dark/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 border border-turmeric/40 shadow-2xl relative">
            <button
              onClick={() => setActiveModalProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-linen hover:bg-linen-dark text-roast"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex gap-4 items-center">
              <img
                src={activeModalProduct.image}
                alt={activeModalProduct.name}
                className="w-20 h-20 rounded-2xl object-cover bg-linen"
              />
              <div>
                <span className="text-[10px] font-bold text-sage uppercase">
                  {activeModalProduct.categoryName || 'Rempah Murni'}
                </span>
                <h3 className="font-serif font-bold text-lg text-cinnamon">
                  {activeModalProduct.name}
                </h3>
                <p className="font-serif font-bold text-base text-turmeric mt-1">
                  {formatRupiah(parsePrice(activeModalProduct.price))}
                  {activeModalProduct.unit && (
                    <span className="text-xs text-roast-light font-normal ml-1">
                      /{activeModalProduct.unit}
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-cinnamon">Deskripsi & Khasiat:</h4>
              <p className="text-roast-muted leading-relaxed bg-linen p-3 rounded-2xl border border-linen-dark">
                {activeModalProduct.description || 'Rempah murni pilihan kualitas terbaik dari Cap Sahabat Rempah.'}
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  handleAddToCart(activeModalProduct);
                  setActiveModalProduct(null);
                }}
                className="w-full py-3 rounded-xl bg-turmeric hover:bg-turmeric-hover text-cinnamon-dark font-black text-xs flex items-center justify-center gap-2 shadow-warm-md"
              >
                <ShoppingBag className="w-4 h-4" />
                Tambah ke Pesanan Sekarang
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

