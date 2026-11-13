import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { dataService } from '../../services/dataService';
import Logo from '../../components/Logo';
import { 
  LayoutDashboard, ShoppingBag, Image as ImageIcon, ClipboardList, 
  Settings, BookOpen, LogOut, ExternalLink, Menu, X, ShieldAlert, ShieldCheck, User 
} from 'lucide-react';

export default function AdminLayout() {
  const { user, logout, isAdmin, isSuperAdmin } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orders, setOrders] = useState(() => dataService.getOrders());
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login');
    }
  }, [isAdmin, navigate]);

  useEffect(() => {
    const handleOrdersChange = () => setOrders(dataService.getOrders());
    window.addEventListener('capsahabat_orders_changed', handleOrdersChange);
    return () => window.removeEventListener('capsahabat_orders_changed', handleOrdersChange);
  }, []);

  const newOrdersCount = orders.filter((o) => o.status === 'baru').length;

  const navItems = [
    { name: 'Dashboard Ringkasan', path: '/admin', icon: LayoutDashboard },
    { name: 'Kelola Produk', path: '/admin/produk', icon: ShoppingBag },
    { name: 'Banner Homepage', path: '/admin/banner', icon: ImageIcon },
    { 
      name: 'Data Pesanan Tamu', 
      path: '/admin/pesanan', 
      icon: ClipboardList,
      badge: orders.length > 0 ? `${orders.length}` : null,
      badgeColor: 'bg-turmeric text-cinnamon-dark font-black'
    },
    { 
      name: 'Pengaturan Kontak & Link', 
      path: '/admin/pengaturan', 
      icon: Settings,
      superOnly: true,
      badge: 'Super Admin',
      badgeColor: 'bg-turmeric/20 text-cinnamon'
    },
    { name: 'Panduan CMS', path: '/admin/panduan', icon: BookOpen },
  ];

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-linen flex flex-col md:flex-row">
      
      {/* Mobile Top Navbar */}
      <div className="md:hidden bg-cinnamon text-linen p-4 flex items-center justify-between border-b border-turmeric/30 sticky top-0 z-40">
        <Link to="/" className="flex items-center gap-2">
          <Logo className="h-8 w-8" showText={false} />
          <span className="font-serif font-bold text-sm text-linen">Cap Sahabat</span>
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-lg bg-cinnamon-dark text-linen"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 h-screen w-64 bg-cinnamon-dark text-linen z-50 flex flex-col justify-between border-r border-turmeric/20 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-5 space-y-6 overflow-y-auto">
          {/* Logo & Role Badge */}
          <div className="space-y-3 pb-4 border-b border-linen/15">
            <Link to="/" className="flex items-center gap-3 p-2 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors" title="Buka Halaman Utama">
              <Logo className="h-10 w-10" showText={false} />
              <span className="font-serif font-bold text-base text-linen tracking-wide">
                Cap Sahabat
              </span>
            </Link>

            <div className="p-2.5 rounded-xl bg-cinnamon border border-turmeric/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg ${isSuperAdmin ? 'bg-turmeric text-cinnamon-dark' : 'bg-sage text-white'}`}>
                  {isSuperAdmin ? <ShieldCheck className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>
                <div className="text-[11px] leading-tight">
                  <p className="font-bold text-linen truncate max-w-[120px]">{user?.name || user?.email}</p>
                  <p className="text-[10px] text-turmeric uppercase font-mono font-bold mt-0.5">
                    {user?.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-xs font-semibold">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                    isActive
                      ? 'bg-turmeric text-cinnamon-dark font-black shadow-sm'
                      : 'text-linen/80 hover:text-turmeric hover:bg-cinnamon/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.name}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full uppercase leading-none ${item.badgeColor || 'bg-turmeric text-cinnamon-dark'}`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-linen/15 space-y-2 text-xs">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-xl bg-cinnamon hover:bg-cinnamon/80 text-linen/90 hover:text-turmeric transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-turmeric" />
              <span>Lihat Website Publik</span>
            </span>
          </Link>

          <button
            onClick={() => {
              logout();
              navigate('/admin/login');
            }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-red-300 hover:text-red-100 hover:bg-red-950/40 transition-colors"
          >
            <span className="flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              <span>Keluar (Logout)</span>
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
}

