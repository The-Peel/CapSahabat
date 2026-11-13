import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dataService, formatRupiah, parsePrice } from '../services/dataService';
import { useCart } from '../context/CartContext';
import { 
  ShoppingBag, ArrowRight, Sparkles, ShieldCheck, Award, HeartPulse, 
  Utensils, Users, ChevronLeft, ChevronRight, Plus, Minus, Check, Clock 
} from 'lucide-react';
import DapurRempah from '../components/DapurRempah';
import MoodWellness from '../components/MoodWellness';
import StoreLocations from '../components/StoreLocations';

export default function HomePage() {
  const [banners, setBanners] = useState(() => dataService.getBanners());
  const [products, setProducts] = useState(() => dataService.getProducts());
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [productQuantities, setProductQuantities] = useState({});
  const { addToCart } = useCart();

  useEffect(() => {
    const handleBannerChange = () => setBanners(dataService.getBanners());
    const handleProductChange = () => setProducts(dataService.getProducts());

    window.addEventListener('capsahabat_banners_changed', handleBannerChange);
    window.addEventListener('capsahabat_products_changed', handleProductChange);

    return () => {
      window.removeEventListener('capsahabat_banners_changed', handleBannerChange);
      window.removeEventListener('capsahabat_products_changed', handleProductChange);
    };
  }, []);

  // Filter active banners
  const activeBanners = banners.filter((b) => b.isActive !== false);

  // Auto-slide banners every 6 seconds if multiple active
  useEffect(() => {
    if (activeBanners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % activeBanners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [activeBanners.length]);

  const activeBanner = activeBanners[currentBannerIndex] || activeBanners[0] || {
    title: 'Kehangatan Rempah Murni & Herbal Premium Nusantara',
    subtitle: 'Pilihan rempah murni dan herbal alami terbaik di Bandung untuk keluarga dan usaha kuliner.',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1400&q=80',
    tag: 'Official Cap Sahabat',
    ctaText: 'Lihat Katalog Produk',
    ctaLink: '/katalog',
    secondaryCtaText: 'Kemitraan B2B',
    secondaryCtaLink: '/partner-b2b',
  };

  // Featured products (up to 4 products)
  const featuredProducts = products.filter((p) => p.isFeatured || p.badges?.includes('Best Seller')).slice(0, 4);
  const displayProducts = featuredProducts.length > 0 ? featuredProducts : products.slice(0, 4);

  const handleQtyChange = (productId, delta) => {
    setProductQuantities((prev) => {
      const current = prev[productId] || 1;
      const next = Math.max(1, current + delta);
      return { ...prev, [productId]: next };
    });
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      
      {/* 1. HERO BANNER UTAMA (Dynamic Slider) */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-[#142A1E] text-linen overflow-hidden">
        {/* Background Image with Deep Herbal Green Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={activeBanner.image}
            alt={activeBanner.title}
            className="w-full h-full object-cover object-center opacity-25 scale-105 transition-all duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#142A1E] via-[#1E3F2D]/95 to-[#142A1E]/90" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6 text-left">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-turmeric/20 border border-turmeric/40 text-turmeric text-xs font-bold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{activeBanner.tag || 'Cap Sahabat Rempah'}</span>
            </div>

            {/* Banner Title */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] text-linen">
              {activeBanner.title}
            </h1>

            {/* Banner Subtitle */}
            <p className="text-sm sm:text-lg text-linen/90 font-light leading-relaxed max-w-2xl">
              {activeBanner.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to={activeBanner.ctaLink || '/katalog'}
                className="px-6 py-3.5 rounded-xl bg-turmeric hover:bg-turmeric-hover text-cinnamon-dark font-black text-sm shadow-warm-lg shadow-turmeric/20 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{activeBanner.ctaText || 'Pesan ke Admin'}</span>
              </Link>

              {activeBanner.secondaryCtaText && (
                <Link
                  to={activeBanner.secondaryCtaLink || '/partner-b2b'}
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-linen font-bold text-sm border border-linen/20 backdrop-blur-sm transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <Users className="w-4 h-4 text-turmeric" />
                  <span>{activeBanner.secondaryCtaText}</span>
                </Link>
              )}
            </div>

            {/* Slider Dots / Controls */}
            {activeBanners.length > 1 && (
              <div className="pt-6 flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {activeBanners.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentBannerIndex(idx)}
                      className={`h-2 rounded-full transition-all ${
                        currentBannerIndex === idx
                          ? 'w-8 bg-turmeric'
                          : 'w-2 bg-linen/40 hover:bg-linen/70'
                      }`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-linen/60 font-mono ml-2">
                  {currentBannerIndex + 1} / {activeBanners.length}
                </span>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* 2. RINGKASAN TENTANG PERUSAHAAN (About Summary) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-linen-dark shadow-warm-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-turmeric/15 text-cinnamon text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-turmeric" />
              Tentang Cap Sahabat Rempah
            </div>
            
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-cinnamon">
              Menjaga Tradisi Keaslian Rasa Nusantara Sejak di Bandung
            </h2>
            
            <p className="text-xs sm:text-sm text-roast-muted leading-relaxed">
              <strong>Cap Sahabat Rempah (Toko Sahabat Rempah)</strong> berdedikasi menghadirkan rempah-rempah pilihan kualitas Grade A yang diproses secara higienis tanpa campuran bahan kimia maupun pengawet. Kami melayani kebutuhan eceran dapur keluarga serta pasokan rutin partai besar untuk restoran, katering, dan pelaku usaha kuliner (B2B).
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-2xl bg-linen border border-linen-dark">
                <p className="font-serif font-bold text-lg text-cinnamon">100%</p>
                <p className="text-[11px] text-roast-muted">Rempah Murni Alami</p>
              </div>
              <div className="p-3 rounded-2xl bg-linen border border-linen-dark">
                <p className="font-serif font-bold text-lg text-cinnamon">Grade A</p>
                <p className="text-[11px] text-roast-muted">Standar Restoran HORECA</p>
              </div>
              <div className="p-3 rounded-2xl bg-linen border border-linen-dark col-span-2 sm:col-span-1">
                <p className="font-serif font-bold text-lg text-cinnamon">3 Cabang</p>
                <p className="text-[11px] text-roast-muted">Toko Fisik di Bandung</p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/tentang-kami"
                className="inline-flex items-center gap-2 text-xs font-bold text-cinnamon hover:text-turmeric transition-colors"
              >
                <span>Baca Profil & Visi Misi Selengkapnya</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-warm-md">
              <img
                src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80"
                alt="Rempah Murni Cap Sahabat"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cinnamon-dark/80 via-transparent to-transparent flex items-end p-5">
                <p className="text-xs text-linen font-medium">
                  "Menghadirkan kehangatan cita rasa murni di setiap masakan Anda."
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. HIGHLIGHT PRODUK (Featured Products with Direct Cart Adding) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-turmeric/15 text-cinnamon text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-turmeric" />
              Produk Pilihan
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-cinnamon">
              Highlight Rempah & Herbal Unggulan
            </h2>
            <p className="text-xs sm:text-sm text-roast-muted mt-1">
              Produk terlaris pilihan keluarga dan mitra usaha kuliner kami.
            </p>
          </div>

          <Link
            to="/katalog"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cinnamon text-turmeric hover:bg-cinnamon-dark text-xs font-bold self-start md:self-auto transition-colors"
          >
            <span>Buka Semua Katalog ({products.length} Produk)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => {
            const priceNum = parsePrice(product.price);
            const currentQty = productQuantities[product.id] || 1;

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-linen-dark overflow-hidden shadow-warm-sm hover:shadow-warm-md hover:border-turmeric/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-44 overflow-hidden bg-linen-dark">
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

                  <div className="p-4 space-y-2">
                    <span className="text-[10px] font-bold text-sage uppercase tracking-wider">
                      {product.categoryName || 'Rempah Cap Sahabat'}
                    </span>
                    <h3 className="font-serif font-bold text-sm text-cinnamon line-clamp-1 group-hover:text-turmeric transition-colors">
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

                {/* Bottom Action: Quantity + Add to Cart */}
                <div className="p-4 pt-0 space-y-2">
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

                  <button
                    onClick={() => {
                      addToCart(product, currentQty);
                      setProductQuantities((prev) => ({ ...prev, [product.id]: 1 }));
                    }}
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
      </section>

      {/* 4. SEKSI CTA DUA JALUR (Katalog & Partner B2B) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Ke Katalog Produk (Aksen Coklat Rempah Sekunder) */}
          <div className="rounded-3xl p-8 bg-gradient-to-br from-brown via-brown to-brown-dark text-linen space-y-4 border border-turmeric/30 flex flex-col justify-between shadow-warm-md">
            <div className="space-y-3">
              <span className="px-3 py-1 rounded-full bg-turmeric/20 text-turmeric text-xs font-bold uppercase tracking-wider">
                Retail & Dapur Rumah Tangga
              </span>
              <h3 className="font-serif text-2xl font-bold text-linen">
                Jelajahi Katalog Lengkap Rempah
              </h3>
              <p className="text-xs sm:text-sm text-linen/85 leading-relaxed">
                Pilih ratusan rempah botolan murni, bumbu tabur ala bistro, minuman JSR, hingga paket dessert sehat dengan pemesanan praktis via WhatsApp tanpa ribet login.
              </p>
            </div>
            <div className="pt-4">
              <Link
                to="/katalog"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-turmeric text-cinnamon-dark font-black text-xs shadow-warm-md hover:bg-turmeric-hover transition-transform hover:scale-[1.02]"
              >
                <span>Buka Katalog Produk</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: Ke Partner B2B */}
          <div className="rounded-3xl p-8 bg-gradient-to-br from-sage-dark to-[#25392B] text-linen space-y-4 border border-sage/40 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="px-3 py-1 rounded-full bg-sage/30 text-sage-light text-xs font-bold uppercase tracking-wider">
                Bisnis Kuliner & Grosir (B2B)
              </span>
              <h3 className="font-serif text-2xl font-bold text-linen">
                Kemitraan Suplai HORECA & Reseller
              </h3>
              <p className="text-xs sm:text-sm text-linen/85 leading-relaxed">
                Dapatkan harga grosir khusus, kepastian pasokan rempah Grade A yang stabil, dan fasilitas faktur resmi untuk restoran, kafe, katering, dan hotel Anda.
              </p>
            </div>
            <div className="pt-4">
              <Link
                to="/partner-b2b"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-linen text-cinnamon font-black text-xs shadow-warm-md hover:bg-white transition-transform hover:scale-[1.02]"
              >
                <span>Halaman Kemitraan B2B</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 5. INTERACTIVE FITUR TAMBAHAN (Dapur Rempah & Mood Wellness) */}
      <DapurRempah />
      <MoodWellness />

      {/* 6. LOKASI TOKO FISIK */}
      <StoreLocations />

    </div>
  );
}

