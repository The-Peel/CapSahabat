import React from 'react';
import { Sparkles, Utensils, HeartPulse, ShoppingCart, MapPin, Clock, ShieldCheck, Award, ArrowRight } from 'lucide-react';
import Logo from './Logo';

export default function Hero() {
  return (
    <section id="hero" className="relative pt-28 pb-20 md:pt-36 md:pb-28 bg-gradient-to-b from-cinnamon via-cinnamon-dark to-[#14261B] text-linen overflow-hidden">
      
      {/* Background Decorative Pattern & Glow */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D49A37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-turmeric/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-sage/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text Content & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Operational Banner Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-turmeric/15 border border-turmeric/40 text-turmeric text-xs font-semibold backdrop-blur-md">
              <Clock className="w-3.5 h-3.5 text-turmeric animate-pulse" />
              <span>Senin – Sabtu: 08.00 – 16.30 WIB (Batas Order 15.00 WIB)</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] text-linen">
              Kehangatan <span className="text-transparent bg-clip-text bg-gradient-to-r from-turmeric via-turmeric-gold to-amber-200">Rempah Murni</span> & Herbal Premium Nusantara
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-linen/85 max-w-2xl font-light leading-relaxed">
              Pilihan terpercaya di Bandung untuk racikan masakan rumah tangga, pasokan bahan baku usaha kuliner/HORECA, hingga ramuan kesehatan holistik JSR & Teh Herbal alami.
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <a
                href="#dapur-rempah"
                className="px-6 py-3.5 rounded-xl bg-turmeric hover:bg-turmeric-hover text-cinnamon-dark font-extrabold text-sm shadow-warm-lg shadow-turmeric/20 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Utensils className="w-4 h-4" />
                Cari Resep & Rempah
              </a>

              <a
                href="#mood-wellness"
                className="px-6 py-3.5 rounded-xl bg-sage/80 hover:bg-sage text-linen font-bold text-sm border border-sage/60 backdrop-blur-sm transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <HeartPulse className="w-4 h-4" />
                Mood Teh & JSR
              </a>

              <a
                href="https://www.tokopedia.com/capsahabat"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-linen font-semibold text-sm border border-linen/20 backdrop-blur-sm transition-colors flex items-center gap-2"
              >
                Tokopedia Official
                <ArrowRight className="w-4 h-4 text-turmeric" />
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-linen/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-turmeric/10 border border-turmeric/30 text-turmeric">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-linen">100% Murni</p>
                  <p className="text-[10px] text-linen/70">Tanpa Pengawet</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-sage/20 border border-sage/40 text-sage-light">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-linen">Grade A Super</p>
                  <p className="text-[10px] text-linen/70">Lokal & Impor</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-turmeric/10 border border-turmeric/30 text-turmeric">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-linen">3 Cabang Store</p>
                  <p className="text-[10px] text-linen/70">Bandung & KBP</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-sage/20 border border-sage/40 text-sage-light">
                  <ShoppingCart className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-linen">Retail & Grosir</p>
                  <p className="text-[10px] text-linen/70">Supply HORECA</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Main Showcase Frame */}
            <div className="relative w-full max-w-md bg-gradient-to-b from-cinnamon-light/60 to-cinnamon-dark/80 p-6 rounded-3xl border border-turmeric/30 shadow-2xl backdrop-blur-md">
              
              {/* Emblem Logo Banner Header */}
              <div className="flex items-center justify-between pb-4 border-b border-turmeric/20">
                <Logo className="h-12 w-12" textColor="text-linen" />
                <span className="px-3 py-1 rounded-full bg-sage text-linen text-[11px] font-bold tracking-wide">
                  Toko Resmi Bandung
                </span>
              </div>

              {/* Product Visual Image Showcase */}
              <div className="my-5 relative rounded-2xl overflow-hidden group shadow-lg border border-linen/10">
                <img
                  src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80"
                  alt="Cap Sahabat Rempah Produk"
                  className="w-full h-56 object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cinnamon-dark via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 p-3 bg-cinnamon-dark/90 rounded-xl backdrop-blur-md border border-turmeric/40 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-turmeric">Koleksi Terfavorit</p>
                    <p className="text-sm font-serif text-linen font-semibold">Cajun & Qust Al Hindi</p>
                  </div>
                  <span className="px-2.5 py-1 bg-turmeric text-cinnamon-dark text-[10px] font-extrabold rounded-lg uppercase">
                    Ready Stock
                  </span>
                </div>
              </div>

              {/* Dual Store Quick Direct Route */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <a
                  href="https://www.tokopedia.com/capsahabat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-[#03AC0E]/20 border border-[#03AC0E]/40 text-white font-medium hover:bg-[#03AC0E]/30 transition-colors flex items-center justify-between"
                >
                  <span>Tokopedia</span>
                  <span className="font-bold text-turmeric">capsahabat</span>
                </a>
                <a
                  href="https://shopee.co.id/capsahabatrempah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-[#EE4D2D]/20 border border-[#EE4D2D]/40 text-white font-medium hover:bg-[#EE4D2D]/30 transition-colors flex items-center justify-between"
                >
                  <span>Shopee</span>
                  <span className="font-bold text-turmeric">capsahabat</span>
                </a>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
