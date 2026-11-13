import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { ExternalLink, Heart, MapPin, Clock, ShieldCheck, Phone, Mail } from 'lucide-react';
import { dataService } from '../services/dataService';

export default function Footer() {
  const [settings, setSettings] = useState(() => dataService.getSettings());

  useEffect(() => {
    const handleSettingsChange = () => {
      setSettings(dataService.getSettings());
    };
    window.addEventListener('capsahabat_settings_changed', handleSettingsChange);
    return () => window.removeEventListener('capsahabat_settings_changed', handleSettingsChange);
  }, []);

  return (
    <footer className="bg-cinnamon-dark text-linen/80 pt-16 pb-8 border-t border-turmeric/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-linen/10">
          
          {/* Col 1: Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <Link to="/">
              <Logo className="h-12 w-12" textColor="text-linen" />
            </Link>
            <p className="text-xs text-linen/75 leading-relaxed max-w-sm">
              <strong>{settings.companyName}</strong> — {settings.tagline}. Penyedia rempah murni botolan, bumbu racik istimewa, teh herbal kesehatan, dan pasokan HORECA terpercaya di Bandung.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-turmeric font-semibold">
              <ShieldCheck className="w-4 h-4 text-turmeric shrink-0" />
              <span>100% Rempah Murni • Tanpa Pengawet • Mutu Terjamin</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-sm text-turmeric uppercase tracking-wider">
              Menu Navigasi
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-turmeric transition-colors">Beranda</Link></li>
              <li><Link to="/katalog" className="hover:text-turmeric transition-colors">Katalog Produk</Link></li>
              <li><Link to="/tentang-kami" className="hover:text-turmeric transition-colors">Tentang Kami</Link></li>
              <li><Link to="/kontak" className="hover:text-turmeric transition-colors">Kontak Kami</Link></li>
              <li><Link to="/partner-b2b" className="hover:text-turmeric transition-colors">Kemitraan Partner B2B</Link></li>
              <li><Link to="/admin/login" className="hover:text-turmeric text-turmeric/70 transition-colors">Login Admin CMS</Link></li>
            </ul>
          </div>

          {/* Col 3: Contact & Hours */}
          <div className="md:col-span-5 space-y-3">
            <h4 className="font-serif font-bold text-sm text-turmeric uppercase tracking-wider">
              Kontak & Toko Resmi
            </h4>
            
            <div className="space-y-2 text-xs text-linen/80">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-turmeric shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-turmeric shrink-0" />
                <span>WhatsApp: {settings.whatsappNumber}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-turmeric shrink-0" />
                <span>Email: {settings.email}</span>
              </p>
            </div>

            <div className="pt-3 grid grid-cols-2 gap-2 text-xs">
              <a
                href={settings.tokopediaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 border border-linen/10 hover:border-[#03AC0E] flex items-center justify-between transition-colors group"
              >
                <span className="font-semibold text-white">Tokopedia</span>
                <ExternalLink className="w-3 h-3 text-turmeric" />
              </a>

              <a
                href={settings.shopeeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 border border-linen/10 hover:border-[#EE4D2D] flex items-center justify-between transition-colors group"
              >
                <span className="font-semibold text-white">Shopee</span>
                <ExternalLink className="w-3 h-3 text-turmeric" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-linen/60 gap-4">
          <p>© {new Date().getFullYear()} {settings.companyName}. Hak Cipta Dilindungi.</p>
          <p className="flex items-center gap-1">
            Dibuat dengan <Heart className="w-3.5 h-3.5 text-red-500 fill-current" /> untuk kehangatan rasa rempah di Indonesia.
          </p>
        </div>

      </div>
    </footer>
  );
}
