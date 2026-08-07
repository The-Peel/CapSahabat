import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { ShoppingBag, Menu, X, ExternalLink } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', href: '#hero' },
    { name: 'Dapur Rempah', href: '#dapur-rempah', badge: 'Resep' },
    { name: 'Mood Teh & Herbal', href: '#mood-wellness', badge: 'JSR' },
    { name: 'Berita & Updates', href: '#kabar-berita', badge: 'Terbaru' },
    { name: 'Lokasi Toko', href: '#lokasi-toko' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'glass-nav py-2.5 border-b border-turmeric/30 shadow-warm-md' 
        : 'bg-cinnamon py-3 border-b border-turmeric/20'
    }`}>
      <div className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between flex-nowrap gap-2">
        
        {/* Brand Logo (Shrink-0 to prevent squeezes) */}
        <a href="#hero" className="shrink-0">
          <Logo className="h-10 w-10 sm:h-11 sm:w-11" textColor="text-linen" />
        </a>

        {/* Desktop Nav Links (Single line nowrap, responsive font & padding) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 flex-nowrap">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-2.5 py-1.5 rounded-lg text-xs xl:text-sm font-medium text-linen/90 hover:text-turmeric hover:bg-cinnamon-dark/50 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <span>{link.name}</span>
              {link.badge && (
                <span className="text-[9px] xl:text-[10px] bg-turmeric text-cinnamon-dark font-extrabold px-1.5 py-0.5 rounded-full uppercase leading-none">
                  {link.badge}
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* Marketplace Direct Action Buttons (Single line nowrap) */}
        <div className="hidden lg:flex items-center space-x-1.5 shrink-0 flex-nowrap">
          <a
            href="https://www.tokopedia.com/capsahabat"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#03AC0E] hover:bg-[#028A0B] text-white transition-transform hover:scale-105 shadow-sm whitespace-nowrap"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
            Tokopedia
            <ExternalLink className="w-3 h-3" />
          </a>

          <a
            href="https://shopee.co.id/capsahabatrempah"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#EE4D2D] hover:bg-[#D03E21] text-white transition-transform hover:scale-105 shadow-sm whitespace-nowrap"
          >
            Shopee
            <ExternalLink className="w-3 h-3" />
          </a>

          <a
            href="https://mart.grab.com/id/id/merchant/toko-sahabat-rempah-pasar-parahyangan-kbp/6-C6MULULARUDFGE"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#00B14F] hover:bg-[#009141] text-white transition-transform hover:scale-105 shadow-sm whitespace-nowrap"
          >
            GrabMart
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-linen hover:text-turmeric hover:bg-cinnamon-dark/60 focus:outline-none shrink-0"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-cinnamon-dark/95 border-b border-turmeric/30 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-lg text-sm font-medium text-linen hover:text-turmeric hover:bg-cinnamon/60 flex items-center justify-between"
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="text-[10px] bg-turmeric text-cinnamon-dark font-bold px-2 py-0.5 rounded-full">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-turmeric/20 flex flex-col space-y-2">
            <span className="text-xs text-turmeric font-semibold uppercase tracking-wider px-2">
              Official Marketplace Stores:
            </span>
            <div className="grid grid-cols-3 gap-2">
              <a
                href="https://www.tokopedia.com/capsahabat"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 p-2 rounded-lg bg-[#03AC0E] text-white text-xs font-bold"
              >
                Tokopedia
              </a>
              <a
                href="https://shopee.co.id/capsahabatrempah"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 p-2 rounded-lg bg-[#EE4D2D] text-white text-xs font-bold"
              >
                Shopee
              </a>
              <a
                href="https://mart.grab.com/id/id/merchant/toko-sahabat-rempah-pasar-parahyangan-kbp/6-C6MULULARUDFGE"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 p-2 rounded-lg bg-[#00B14F] text-white text-xs font-bold"
              >
                GrabMart
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
