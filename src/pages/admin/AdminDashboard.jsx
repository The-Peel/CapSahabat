import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dataService, formatRupiah } from '../../services/dataService';
import { useAuth } from '../../context/AuthContext';
import { 
  ShoppingBag, ClipboardList, Image as ImageIcon, DollarSign, 
  ArrowRight, Plus, ExternalLink, Clock, CheckCircle2, AlertCircle 
} from 'lucide-react';

export default function AdminDashboard() {
  const [products, setProducts] = useState(() => dataService.getProducts());
  const [orders, setOrders] = useState(() => dataService.getOrders());
  const [banners, setBanners] = useState(() => dataService.getBanners());
  const { user, isSuperAdmin } = useAuth();

  useEffect(() => {
    const handleProductsChange = () => setProducts(dataService.getProducts());
    const handleOrdersChange = () => setOrders(dataService.getOrders());
    const handleBannersChange = () => setBanners(dataService.getBanners());

    window.addEventListener('capsahabat_products_changed', handleProductsChange);
    window.addEventListener('capsahabat_orders_changed', handleOrdersChange);
    window.addEventListener('capsahabat_banners_changed', handleBannersChange);

    return () => {
      window.removeEventListener('capsahabat_products_changed', handleProductsChange);
      window.removeEventListener('capsahabat_orders_changed', handleOrdersChange);
      window.removeEventListener('capsahabat_banners_changed', handleBannersChange);
    };
  }, []);

  const newOrders = orders.filter((o) => o.status === 'baru');
  const totalRevenue = orders.reduce((acc, o) => acc + (o.totalAmount || 0), 0);
  const activeBanners = banners.filter((b) => b.isActive !== false);

  const stats = [
    {
      title: 'Total Produk Aktif',
      value: products.filter((p) => p.isAvailable !== false).length,
      subtitle: `${products.length} total terdaftar`,
      icon: ShoppingBag,
      color: 'bg-amber-100 text-amber-800 border-amber-200',
      link: '/admin/produk',
    },
    {
      title: 'Pesanan Masuk',
      value: orders.length,
      subtitle: `${orders.length} pesanan tercatat`,
      icon: ClipboardList,
      color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      link: '/admin/pesanan',
    },
    {
      title: 'Estimasi Nilai Pesanan',
      value: formatRupiah(totalRevenue),
      subtitle: 'Akumulasi pesanan guest',
      icon: DollarSign,
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      link: '/admin/pesanan',
    },
    {
      title: 'Banner Homepage',
      value: `${activeBanners.length} / ${banners.length}`,
      subtitle: 'Slide aktif saat ini',
      icon: ImageIcon,
      color: 'bg-purple-100 text-purple-800 border-purple-200',
      link: '/admin/banner',
    },
  ];

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-cinnamon via-cinnamon to-cinnamon-dark text-linen rounded-3xl p-6 sm:p-8 shadow-warm-md border border-turmeric/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs text-turmeric font-bold uppercase tracking-wider">
            Selamat Datang di Panel CMS
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold mt-1">
            Halo, {user?.name || user?.email}!
          </h1>
          <p className="text-xs sm:text-sm text-linen/80 mt-1 max-w-xl">
            Anda masuk dengan hak akses <strong>{user?.role === 'super_admin' ? 'Super Admin' : 'Admin'}</strong>. Kelola produk, atur banner promo beranda, dan pantau pesanan tamu dari halaman ini.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            to="/admin/produk"
            className="px-4 py-2.5 rounded-xl bg-turmeric text-cinnamon-dark font-black text-xs hover:bg-turmeric-hover transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Produk</span>
          </Link>
          <Link
            to="/admin/pesanan"
            className="px-4 py-2.5 rounded-xl bg-white/10 text-linen font-bold text-xs hover:bg-white/20 transition-colors flex items-center gap-1.5 border border-white/20"
          >
            <ClipboardList className="w-3.5 h-3.5" />
            <span>Lihat Pesanan ({orders.length})</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <Link
              key={idx}
              to={s.link}
              className="bg-white rounded-3xl p-5 border border-linen-dark shadow-warm-sm hover:border-turmeric/40 transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-roast-muted">{s.title}</span>
                <div className={`p-2 rounded-xl border ${s.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="pt-4">
                <p className="font-serif font-bold text-2xl text-cinnamon">{s.value}</p>
                <p className="text-[11px] text-roast-light mt-0.5">{s.subtitle}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Orders Overview */}
      <div className="bg-white rounded-3xl p-6 border border-linen-dark shadow-warm-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif font-bold text-lg text-cinnamon">
              Pesanan Masuk Terbaru dari Tamu
            </h2>
            <p className="text-xs text-roast-muted">
              Daftar guest yang telah mengirimkan formulir pesanan ke WhatsApp Admin.
            </p>
          </div>
          <Link
            to="/admin/pesanan"
            className="text-xs font-bold text-cinnamon hover:text-turmeric flex items-center gap-1"
          >
            <span>Lihat Semua ({orders.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="p-8 text-center text-roast-muted text-xs">
            Belum ada pesanan guest yang masuk.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-linen text-roast-muted uppercase font-bold border-b border-linen-dark">
                <tr>
                  <th className="py-3 px-3">Kode Order</th>
                  <th className="py-3 px-3">Tanggal</th>
                  <th className="py-3 px-3">Nama Pembeli</th>
                  <th className="py-3 px-3">No HP / WhatsApp</th>
                  <th className="py-3 px-3">Item Pesanan</th>
                  <th className="py-3 px-3">Total</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-linen-dark">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-linen/50 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-cinnamon">
                      {order.orderCode}
                    </td>
                    <td className="py-3 px-3 text-roast-muted">
                      {new Date(order.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="py-3 px-3 font-bold text-roast">
                      {order.customerName}
                    </td>
                    <td className="py-3 px-3 font-mono">
                      {order.customerPhone}
                    </td>
                    <td className="py-3 px-3 text-roast-muted">
                      {order.items?.length || 0} macam produk
                    </td>
                    <td className="py-3 px-3 font-serif font-bold text-cinnamon">
                      {formatRupiah(order.totalAmount)}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          order.status === 'baru'
                            ? 'bg-amber-100 text-amber-800'
                            : order.status === 'selesai'
                            ? 'bg-emerald-100 text-emerald-800'
                            : order.status === 'dihubungi'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <a
                        href={`https://wa.me/${order.customerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                          `Halo ${order.customerName}, kami dari Admin Cap Sahabat Rempah menindaklanjuti pesanan Anda [${order.orderCode}]...`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#25D366] text-white font-bold text-[11px] hover:bg-[#20BA5A]"
                        title="Chat di WhatsApp"
                      >
                        <span>Chat WA</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}

