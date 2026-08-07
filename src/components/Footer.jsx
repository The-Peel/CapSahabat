import React from 'react';
import Logo from './Logo';
import { ExternalLink, Heart, MapPin, Clock, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-cinnamon-dark text-linen/80 pt-16 pb-8 border-t border-turmeric/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-linen/10">
          
          {/* Col 1: Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <Logo className="h-12 w-12" textColor="text-linen" />
            <p className="text-xs text-linen/75 leading-relaxed max-w-sm">
              <strong>Cap Sahabat Rempah (Toko Sahabat Rempah)</strong> — Penyedia rempah-rempah murni pilihan, bumbu tabur ala resto, ramuan kesehatan JSR, dan teh herbal premium di Bandung.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-turmeric font-semibold">
              <ShieldCheck className="w-4 h-4 text-turmeric" />
              <span>100% Rempah Murni • Tanpa Pengawet • Mutu Terjamin</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-sm text-turmeric uppercase tracking-wider">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#hero" className="hover:text-turmeric transition-colors">Beranda</a></li>
              <li><a href="#dapur-rempah" className="hover:text-turmeric transition-colors">Dapur Rempah (Resep)</a></li>
              <li><a href="#mood-wellness" className="hover:text-turmeric transition-colors">Mood Teh & Wellness (JSR)</a></li>
              <li><a href="#kabar-berita" className="hover:text-turmeric transition-colors">Berita & Updates Terbaru</a></li>
              <li><a href="#lokasi-toko" className="hover:text-turmeric transition-colors">Lokasi Toko Fisik</a></li>
            </ul>
          </div>

          {/* Col 3: Toko Resmi Marketplace */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-serif font-bold text-sm text-turmeric uppercase tracking-wider">
              Beli Online di Official Store
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href="https://www.tokopedia.com/capsahabat"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 border border-linen/10 hover:border-[#03AC0E] flex items-center justify-between transition-colors group"
              >
                <span className="font-semibold text-white">Tokopedia Official</span>
                <span className="text-turmeric group-hover:underline flex items-center gap-1">
                  capsahabat <ExternalLink className="w-3 h-3" />
                </span>
              </a>

              <a
                href="https://shopee.co.id/capsahabatrempah"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 border border-linen/10 hover:border-[#EE4D2D] flex items-center justify-between transition-colors group"
              >
                <span className="font-semibold text-white">Shopee Official</span>
                <span className="text-turmeric group-hover:underline flex items-center gap-1">
                  capsahabatrempah <ExternalLink className="w-3 h-3" />
                </span>
              </a>

              <a
                href="https://mart.grab.com/id/id/merchant/toko-sahabat-rempah-pasar-parahyangan-kbp/6-C6MULULARUDFGE"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 border border-linen/10 hover:border-[#00B14F] flex items-center justify-between transition-colors group"
              >
                <span className="font-semibold text-white">GrabMart Instan</span>
                <span className="text-turmeric group-hover:underline flex items-center gap-1">
                  KBP Bandung <ExternalLink className="w-3 h-3" />
                </span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-linen/60 gap-4">
          <p>© {new Date().getFullYear()} Cap Sahabat Rempah (Toko Sahabat Rempah). Hak Cipta Dilindungi.</p>
          <p className="flex items-center gap-1">
            Dibuat dengan <Heart className="w-3.5 h-3.5 text-red-500 fill-current" /> untuk kehangatan rasa di Bandung, Indonesia.
          </p>
        </div>

      </div>
    </footer>
  );
}
