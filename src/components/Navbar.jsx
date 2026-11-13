import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { ShoppingBag, Menu, X, ExternalLink, ShieldCheck, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { dataService } from '../services/dataService';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settings, setSettings] = useState(() => dataService.getSettings());
  const location = useLocation();

  const { cartCount, setIsCartOpen } = useCart();
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleSettingsChange = () => {
      setSettings(dataService.getSettings());
    };
    window.addEventListener('capsahabat_settings_changed', handleSettingsChange);
    return () => window.removeEventListener('capsahabat_settings_changed', handleSettingsChange);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Katalog Produk', path: '/katalog' },
    { name: 'Tentang Kami', path: '/tentang-kami' },
    { name: 'Kontak', path: '/kontak' },
    { name: 'Partner B2B', path: '/partner-b2b', badge: 'Kerjasama' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav py-2.5 border-b border-turmeric/30 shadow-warm-md'
          : 'bg-cinnamon py-3.5 border-b border-turmeric/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2">
        
        {/* Brand Logo */}
        <Link to="/" className="shrink-0 flex items-center gap-2">
          <Logo className="h-10 w-10 sm:h-11 sm:w-11" textColor="text-linen" />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-1.5 rounded-xl text-xs xl:text-sm font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  isActive
                    ? 'bg-turmeric text-cinnamon-dark font-black shadow-sm'
                    : 'text-linen/90 hover:text-turmeric hover:bg-cinnamon-dark/50'
                }`}
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded-full font-extrabold uppercase leading-none ${
                      isActive ? 'bg-cinnamon text-turmeric' : 'bg-turmeric text-cinnamon-dark'
                    }`}
                  >
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Area */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Cart Trigger Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-turmeric hover:bg-turmeric-hover text-cinnamon-dark font-extrabold text-xs shadow-warm-sm transition-transform hover:scale-105"
            aria-label="Keranjang Pesanan"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Pesanan</span>
            {cartCount > 0 && (
              <span className="bg-cinnamon-dark text-turmeric text-[11px] font-black px-1.5 py-0.5 rounded-full min-w-[20px] text-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Admin / Super Admin Entry Pill */}
          <Link
            to={isAdmin ? '/admin' : '/admin/login'}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cinnamon-dark/70 hover:bg-cinnamon-dark text-linen/80 hover:text-turmeric text-xs font-semibold border border-turmeric/20 transition-colors"
            title="Panel CMS Pengelola"
          >
            {isAdmin ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-turmeric" />
                <span>CMS {user?.role === 'super_admin' ? 'Super' : 'Admin'}</span>
              </>
            ) : (
              <>
                <User className="w-3.5 h-3.5 text-turmeric" />
                <span>CMS</span>
              </>
            )}
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-linen hover:text-turmeric hover:bg-cinnamon-dark/60 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-cinnamon-dark/98 border-t border-turmeric/20 px-4 pt-3 pb-6 space-y-2 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold ${
                  isActive
                    ? 'bg-turmeric text-cinnamon-dark font-bold'
                    : 'text-linen/90 hover:text-turmeric hover:bg-cinnamon/60'
                }`}
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="text-[10px] bg-turmeric text-cinnamon-dark font-extrabold px-2 py-0.5 rounded-full uppercase">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-3 border-t border-linen/15 space-y-2">
            <Link
              to={isAdmin ? '/admin' : '/admin/login'}
              className="flex items-center justify-between px-3 py-2 rounded-xl bg-cinnamon text-xs text-linen/90 hover:text-turmeric"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-turmeric" />
                {isAdmin ? `Dashboard CMS (${user?.role})` : 'Login Admin CMS'}
              </span>
              <span className="text-[10px] text-turmeric font-bold">Akses</span>
            </Link>

            <a
              href={settings.tokopediaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#03AC0E] text-white text-xs font-bold"
            >
              <span>Tokopedia Official Store</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={settings.shopeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#EE4D2D] text-white text-xs font-bold"
            >
              <span>Shopee Official Store</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
