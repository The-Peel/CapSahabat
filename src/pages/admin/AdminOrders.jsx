import React, { useState, useEffect } from 'react';
import { dataService, formatRupiah } from '../../services/dataService';
import { 
  ClipboardList, Search, Filter, ExternalLink, Eye, Phone, MapPin, 
  Calendar, CheckCircle, Clock, Trash2, X, Download 
} from 'lucide-react';

export default function AdminOrders() {
  const [orders, setOrders] = useState(() => dataService.getOrders());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeModalOrder, setActiveModalOrder] = useState(null);

  useEffect(() => {
    const handleOrdersChange = () => setOrders(dataService.getOrders());
    window.addEventListener('capsahabat_orders_changed', handleOrdersChange);
    return () => window.removeEventListener('capsahabat_orders_changed', handleOrdersChange);
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      order.orderCode?.toLowerCase().includes(term) ||
      order.customerName?.toLowerCase().includes(term) ||
      order.customerPhone?.toLowerCase().includes(term) ||
      order.customerAddress?.toLowerCase().includes(term);
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = (orderId, newStatus) => {
    dataService.updateOrderStatus(orderId, newStatus);
  };

  const handleDeleteOrder = (orderId) => {
    if (confirm('Hapus riwayat pesanan ini?')) {
      dataService.deleteOrder(orderId);
      if (activeModalOrder?.id === orderId) {
        setActiveModalOrder(null);
      }
    }
  };

  const exportToCSV = () => {
    if (orders.length === 0) return;
    const headers = ['Kode Order', 'Tanggal', 'Nama Pembeli', 'No HP', 'Alamat', 'Kurir', 'Ongkir', 'Subtotal', 'Total', 'Status'];
    const rows = orders.map((o) => [
      `"${o.orderCode}"`,
      `"${new Date(o.createdAt).toLocaleString('id-ID')}"`,
      `"${o.customerName}"`,
      `"${o.customerPhone}"`,
      `"${o.customerAddress.replace(/"/g, '""')}"`,
      `"${o.courierName}"`,
      o.shippingCost,
      o.subtotal,
      o.totalAmount,
      `"${o.status}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `pesanan_capsahabat_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-cinnamon">
            Data Pesanan Tamu (*Guest Leads*)
          </h1>
          <p className="text-xs text-roast-muted mt-0.5">
            Daftar pesanan yang dikirimkan tamu melalui form checkout WhatsApp.
          </p>
        </div>

        <button
          onClick={exportToCSV}
          disabled={orders.length === 0}
          className="px-4 py-2.5 rounded-xl bg-linen hover:bg-linen-dark border border-linen-dark text-cinnamon font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors self-start sm:self-auto disabled:opacity-40"
        >
          <Download className="w-4 h-4 text-turmeric" />
          <span>Ekspor Data ke CSV</span>
        </button>
      </div>

      {/* Filter & Search */}
      <div className="bg-white rounded-2xl p-4 border border-linen-dark shadow-warm-sm flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-roast-light absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari kode order, nama pembeli, nomor HP, atau alamat..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-linen border border-linen-dark text-xs text-roast focus:outline-none focus:border-turmeric focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {[
            { id: 'all', label: 'Semua' },
            { id: 'baru', label: 'Baru' },
            { id: 'dihubungi', label: 'Dihubungi' },
            { id: 'selesai', label: 'Selesai' },
            { id: 'dibatalkan', label: 'Batal' },
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => setStatusFilter(s.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                statusFilter === s.id
                  ? 'bg-cinnamon text-turmeric'
                  : 'bg-linen text-roast-muted hover:bg-linen-dark'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-linen-dark shadow-warm-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-linen text-roast-muted uppercase font-bold border-b border-linen-dark">
              <tr>
                <th className="py-3.5 px-4">Kode Order</th>
                <th className="py-3.5 px-4">Tanggal</th>
                <th className="py-3.5 px-4">Nama Pembeli</th>
                <th className="py-3.5 px-4">No WhatsApp</th>
                <th className="py-3.5 px-4">Produk Dipesan</th>
                <th className="py-3.5 px-4">Total</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-linen-dark">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-roast-muted">
                    Tidak ada data pesanan yang sesuai filter.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const cleanPhone = (order.customerPhone || '').replace(/[^0-9]/g, '');
                  const waFollowUpUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                    `Halo ${order.customerName}, kami dari Admin Cap Sahabat Rempah menindaklanjuti pesanan Anda (${order.orderCode}) sebesar ${formatRupiah(
                      order.totalAmount
                    )}. Apakah ada informasi tambahan yang ingin kami bantu?`
                  )}`;

                  return (
                    <tr key={order.id} className="hover:bg-linen/40 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-cinnamon">
                        {order.orderCode}
                      </td>
                      <td className="py-3 px-4 text-roast-muted whitespace-nowrap">
                        {new Date(order.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="py-3 px-4 font-bold text-roast">
                        {order.customerName}
                      </td>
                      <td className="py-3 px-4 font-mono text-cinnamon">
                        {order.customerPhone}
                      </td>
                      <td className="py-3 px-4 text-roast-muted max-w-xs">
                        <p className="line-clamp-1">
                          {order.items?.map((it) => `${it.quantity}x ${it.name}`).join(', ')}
                        </p>
                      </td>
                      <td className="py-3 px-4 font-serif font-bold text-cinnamon whitespace-nowrap">
                        {formatRupiah(order.totalAmount)}
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border-0 focus:ring-1 focus:ring-turmeric cursor-pointer ${
                            order.status === 'baru'
                              ? 'bg-amber-100 text-amber-800'
                              : order.status === 'selesai'
                              ? 'bg-emerald-100 text-emerald-800'
                              : order.status === 'dihubungi'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <option value="baru">Baru</option>
                          <option value="dihubungi">Dihubungi</option>
                          <option value="selesai">Selesai</option>
                          <option value="dibatalkan">Dibatalkan</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          onClick={() => setActiveModalOrder(order)}
                          className="p-1.5 rounded-lg text-cinnamon hover:bg-turmeric/20 transition-colors"
                          title="Lihat Detail Lengkap"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <a
                          href={waFollowUpUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 p-1.5 rounded-lg bg-[#25D366] text-white hover:bg-[#20BA5A] transition-colors"
                          title="Hubungi Pembeli di WhatsApp"
                        >
                          <Phone className="w-3.5 h-3.5 fill-current" />
                        </a>

                        <button
                          onClick={() => handleDeleteOrder(order.id)}
                          className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                          title="Hapus Pesanan"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAIL MODAL PESANAN */}
      {activeModalOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-cinnamon-dark/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-turmeric/30 my-8">
            <div className="p-5 bg-cinnamon text-linen flex items-center justify-between border-b border-turmeric/30">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-turmeric bg-cinnamon-dark/60 px-2 py-0.5 rounded-md">
                  Rincian Pesanan Guest
                </span>
                <h3 className="font-serif font-bold text-lg mt-1">{activeModalOrder.orderCode}</h3>
              </div>
              <button
                onClick={() => setActiveModalOrder(null)}
                className="p-1 rounded-lg text-linen/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs max-h-[80vh] overflow-y-auto">
              
              {/* Buyer Info */}
              <div className="p-4 rounded-2xl bg-linen border border-linen-dark space-y-2">
                <p className="font-bold text-cinnamon text-sm">{activeModalOrder.customerName}</p>
                <p className="flex items-center gap-2 text-roast">
                  <Phone className="w-3.5 h-3.5 text-turmeric" />
                  <span>{activeModalOrder.customerPhone}</span>
                </p>
                <p className="flex items-start gap-2 text-roast-muted">
                  <MapPin className="w-3.5 h-3.5 text-turmeric shrink-0 mt-0.5" />
                  <span>{activeModalOrder.customerAddress}</span>
                </p>
                <p className="flex items-center gap-2 text-roast-light text-[11px] pt-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(activeModalOrder.createdAt).toLocaleString('id-ID')}</span>
                </p>
              </div>

              {/* Items Breakdown */}
              <div className="space-y-2">
                <h4 className="font-bold text-cinnamon">Daftar Produk yang Dipesan:</h4>
                <div className="divide-y divide-linen-dark border border-linen-dark rounded-2xl overflow-hidden bg-white">
                  {activeModalOrder.items?.map((item, idx) => (
                    <div key={idx} className="p-3 flex justify-between items-center text-xs">
                      <div>
                        <p className="font-bold text-cinnamon">{item.name}</p>
                        <p className="text-[11px] text-roast-light">
                          {item.quantity} x {formatRupiah(item.price)}
                        </p>
                      </div>
                      <span className="font-serif font-bold text-cinnamon">
                        {formatRupiah(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Calculation Summary */}
              <div className="p-4 rounded-2xl bg-linen border border-linen-dark space-y-1.5">
                <div className="flex justify-between text-roast-muted">
                  <span>Subtotal Produk</span>
                  <span>{formatRupiah(activeModalOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between text-roast-muted">
                  <span>Estimasi Ongkir ({activeModalOrder.courierName})</span>
                  <span>{formatRupiah(activeModalOrder.shippingCost)}</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-linen-dark font-bold text-cinnamon text-sm">
                  <span>Estimasi Total</span>
                  <span className="font-serif text-lg text-cinnamon">
                    {formatRupiah(activeModalOrder.totalAmount)}
                  </span>
                </div>
              </div>

              {/* Follow-up CTA */}
              <div className="pt-2 space-y-2">
                <a
                  href={`https://wa.me/${(activeModalOrder.customerPhone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Halo ${activeModalOrder.customerName}, kami dari Admin Cap Sahabat Rempah menindaklanjuti pesanan Anda [${activeModalOrder.orderCode}]...`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
                >
                  <Phone className="w-4 h-4 fill-current" />
                  <span>Hubungi Pembeli Langsung di WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setActiveModalOrder(null)}
                  className="w-full py-2 text-center text-xs font-bold text-roast-muted hover:text-cinnamon"
                >
                  Tutup Rincian
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

