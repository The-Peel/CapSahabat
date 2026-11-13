import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../components/Logo';
import { ShieldCheck, Lock, Mail, ArrowRight, ArrowLeft, KeyRound, UserCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    const res = login(email, password);
    setIsLoading(false);

    if (res.success) {
      navigate('/admin');
    } else {
      setErrorMsg(res.message || 'Login gagal. Periksa kembali email dan password.');
    }
  };

  const handleQuickLogin = (roleType) => {
    if (roleType === 'super_admin') {
      setEmail('superadmin@capsahabat.com');
      setPassword('admin123');
      const res = login('superadmin@capsahabat.com', 'admin123');
      if (res.success) navigate('/admin');
    } else {
      setEmail('admin@capsahabat.com');
      setPassword('admin123');
      const res = login('admin@capsahabat.com', 'admin123');
      if (res.success) navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-cinnamon flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-turmeric/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-sage/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-turmeric/30 relative z-10 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <Logo className="h-14 w-14" textColor="text-cinnamon" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-cinnamon">
            Admin CMS Cap Sahabat
          </h1>
          <p className="text-xs text-roast-muted">
            Panel Kontrol Pengelolaan Produk, Banner, & Pesanan Tamu
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold text-center">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block text-roast font-bold mb-1">Email Pengelola</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-roast-light absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="superadmin@capsahabat.com"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-linen-dark bg-linen focus:bg-white focus:outline-none focus:border-turmeric focus:ring-1 focus:ring-turmeric text-roast"
              />
            </div>
          </div>

          <div>
            <label className="block text-roast font-bold mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-roast-light absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-linen-dark bg-linen focus:bg-white focus:outline-none focus:border-turmeric focus:ring-1 focus:ring-turmeric text-roast"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-turmeric hover:bg-turmeric-hover text-cinnamon-dark font-black text-xs flex items-center justify-center gap-2 shadow-warm-md transition-transform hover:scale-[1.01]"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{isLoading ? 'Memverifikasi...' : 'Masuk ke Panel CMS'}</span>
          </button>
        </form>

        {/* Quick Demo Access Buttons for Evaluators/Lecturers */}
        <div className="pt-4 border-t border-linen-dark space-y-2">
          <p className="text-[11px] font-bold text-center text-roast-muted">
            Akses Cepat Pengujian (Demo):
          </p>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('super_admin')}
              className="p-2 rounded-xl bg-linen hover:bg-turmeric/20 border border-turmeric/40 text-cinnamon font-bold text-[11px] flex flex-col items-center justify-center text-center transition-colors"
            >
              <UserCheck className="w-4 h-4 text-turmeric mb-0.5" />
              <span>Super Admin</span>
              <span className="text-[9px] text-roast-light font-normal">Semua Hak Akses</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              className="p-2 rounded-xl bg-linen hover:bg-brown/15 border border-brown/40 text-brown font-bold text-[11px] flex flex-col items-center justify-center text-center transition-colors"
            >
              <KeyRound className="w-4 h-4 text-brown mb-0.5" />
              <span>Admin Produk</span>
              <span className="text-[9px] text-roast-light font-normal">Katalog & Banner</span>
            </button>
          </div>
        </div>

        <div className="text-center pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-roast-muted hover:text-cinnamon font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Halaman Utama</span>
          </Link>
        </div>

      </div>
    </div>
  );
}

