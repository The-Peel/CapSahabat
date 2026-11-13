import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { dataService, formatRupiah, parsePrice } from '../services/dataService';
import { X, Send, Truck, User, Phone, MapPin, CheckCircle, ExternalLink, ArrowLeft } from 'lucide-react';

const COURIER_OPTIONS = [
  { id: 'jne', name: 'JNE Reguler', cost: 14000, eta: '1-2 Hari' },
  { id: 'jnt', name: 'J&T Express', cost: 15000, eta: '1-2 Hari' },
  { id: 'sicepat', name: 'SiCepat REG', cost: 14500, eta: '1-2 Hari' },
  { id: 'paxel', name: 'Paxel Next Day (Cold/Safe)', cost: 20000, eta: 'Besok Sampai' },
  { id: 'instant', name: 'Grab/Gojek Instant (Khusus Bandung)', cost: 25000, eta: '2-4 Jam' },
  { id: 'pickup', name: 'Ambil Sendiri di Toko (KBP / Dulatip)', cost: 0, eta: 'Jam Operasional' },
];

export default function CheckoutModal() {
  const {
    cartItems,
    cartSubtotal,
    isCheckoutOpen,
    setIsCheckoutOpen,
    clearCart,
  } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'Bandung',
  });

  const [selectedCourier, setSelectedCourier] = useState(COURIER_OPTIONS[0]);
  const [customCourierName, setCustomCourierName] = useState('');
  const [customShippingCost, setCustomShippingCost] = useState(14000);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isCheckoutOpen) return null;

  const shippingCost = selectedCourier.id === 'custom' 
    ? parsePrice(customShippingCost) 
    : selectedCourier.cost;

  const totalAmount = cartSubtotal + shippingCost;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMsg('');
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg('Nama pembeli wajib diisi.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg('Nomor WhatsApp / HP wajib diisi.');
      return;
    }
    if (!formData.address.trim()) {
      setErrorMsg('Alamat pengiriman lengkap wajib diisi.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Prepare items payload for database
      const orderItems = cartItems.map((item) => {
        const itemPrice = parsePrice(item.product.price);
        return {
          id: item.product.id,
          name: item.product.name,
          price: itemPrice,
          quantity: item.quantity,
          subtotal: itemPrice * item.quantity,
        };
      });

      const courierName = selectedCourier.id === 'custom' && customCourierName
        ? customCourierName
        : selectedCourier.name;

      // 2. Save order to DataService (Database/LocalStorage)
      const savedOrder = dataService.addOrder({
        customerName: formData.name.trim(),
        customerPhone: formData.phone.trim(),
        customerAddress: formData.address.trim(),
        courierName,
        shippingCost,
        subtotal: cartSubtotal,
        totalAmount,
        items: orderItems,
      });

      // 3. Build WhatsApp Formatted Message according to exact client requirement:
      /*
        Halo admin Cap Sahabat, ini form pesanan saya
        Nama:
        No HP:
        Alamat:
        Pesanan:
        1 x Kayu Manis Utuh Rp14.000
        2 x Merica Rp38.000
        Estimasi Ongkir JNE Rp28.000
        Estimasi Total Rp80.000
      */
      const itemLines = orderItems
        .map((item) => `${item.quantity} x ${item.name} ${formatRupiah(item.price * item.quantity)}`)
        .join('\n');

      const courierShortName = courierName.split(' ')[0] || courierName;
      const waMessageText = `Halo admin Cap Sahabat, ini form pesanan saya
Nama: ${formData.name.trim()}
No HP: ${formData.phone.trim()}
Alamat: ${formData.address.trim()}
Pesanan:
${itemLines}
Estimasi Ongkir ${courierShortName} ${formatRupiah(shippingCost)}
Estimasi Total ${formatRupiah(totalAmount)}`;

      // 4. Retrieve admin WhatsApp number from dynamic settings
      const settings = dataService.getSettings();
      const adminWhatsApp = settings.whatsappNumber || '6281378781327';
      const cleanPhone = adminWhatsApp.replace(/[^0-9]/g, '');
      const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(waMessageText)}`;

      // 5. Open WhatsApp
      window.open(waUrl, '_blank');

      // 6. Set submitted order & clear cart
      setSubmittedOrder({
        ...savedOrder,
        waUrl,
        waMessageText,
      });
      clearCart();
    } catch (err) {
      console.error('Gagal memproses pesanan:', err);
      setErrorMsg('Terjadi kesalahan saat memproses pesanan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setSubmittedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-cinnamon-dark/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-turmeric/30 animate-fadeIn my-8">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-cinnamon text-linen flex items-center justify-between border-b border-turmeric/30">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-turmeric bg-cinnamon-dark/60 px-2 py-0.5 rounded-md">
              Step 2 & 3: Checkout Tanpa Login
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold mt-1">
              {submittedOrder ? 'Pesanan Siap Dikirim!' : 'Isi Data Pembeli & Pesan'}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-linen/70 hover:text-white hover:bg-cinnamon-dark/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submittedOrder ? (
          /* Success Screen */
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-bold text-cinnamon">
                Terima Kasih, {submittedOrder.customerName}!
              </h3>
              <p className="text-xs sm:text-sm text-roast-muted max-w-md mx-auto">
                Form pesanan Anda telah tersimpan di sistem kami dengan kode:
              </p>
              <div className="inline-block px-4 py-1.5 rounded-full bg-linen border border-turmeric/40 font-mono font-bold text-sm text-cinnamon">
                {submittedOrder.orderCode}
              </div>
            </div>

            <div className="bg-linen rounded-2xl p-4 text-left border border-linen-dark space-y-2 text-xs">
              <p className="font-bold text-cinnamon">Ringkasan Format WhatsApp:</p>
              <pre className="font-sans whitespace-pre-wrap text-roast bg-white p-3 rounded-xl border border-linen-dark text-[11px] leading-relaxed max-h-48 overflow-y-auto">
                {submittedOrder.waMessageText}
              </pre>
            </div>

            <div className="space-y-3 pt-2">
              <a
                href={submittedOrder.waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-warm-md transition-transform hover:scale-[1.01]"
              >
                <Send className="w-4 h-4 fill-current" />
                <span>Buka Ulang WhatsApp Admin</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={handleClose}
                className="w-full py-2.5 text-center text-xs font-bold text-roast-muted hover:text-cinnamon"
              >
                Kembali ke Website
              </button>
            </div>
          </div>
        ) : (
          /* Form Input Screen */
          <form onSubmit={handleSubmitOrder} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                ⚠️ {errorMsg}
              </div>
            )}

            {/* Buyer Details */}
            <div className="space-y-3">
              <h4 className="font-serif font-bold text-sm text-cinnamon flex items-center gap-1.5">
                <User className="w-4 h-4 text-turmeric" />
                Informasi Penerima
              </h4>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-roast-muted font-bold mb-1">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-linen-dark bg-linen focus:bg-white focus:outline-none focus:border-turmeric focus:ring-1 focus:ring-turmeric text-roast"
                    required
                  />
                </div>

                <div>
                  <label className="block text-roast-muted font-bold mb-1">
                    Nomor WhatsApp / HP Aktif <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Contoh: 081234567890"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-linen-dark bg-linen focus:bg-white focus:outline-none focus:border-turmeric focus:ring-1 focus:ring-turmeric text-roast"
                    required
                  />
                </div>

                <div>
                  <label className="block text-roast-muted font-bold mb-1">
                    Alamat Lengkap Pengiriman <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan, kecamatan, kota & kode pos..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-linen-dark bg-linen focus:bg-white focus:outline-none focus:border-turmeric focus:ring-1 focus:ring-turmeric text-roast"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Courier & Shipping Estimate */}
            <div className="space-y-3 pt-2 border-t border-linen-dark">
              <h4 className="font-serif font-bold text-sm text-cinnamon flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-turmeric" />
                Pilihan Kurir & Estimasi Ongkir
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {COURIER_OPTIONS.map((courier) => {
                  const isSelected = selectedCourier.id === courier.id;
                  return (
                    <button
                      type="button"
                      key={courier.id}
                      onClick={() => setSelectedCourier(courier)}
                      className={`p-3 rounded-xl border text-left flex justify-between items-center transition-all ${
                        isSelected
                          ? 'border-turmeric bg-turmeric/10 font-bold text-cinnamon shadow-sm'
                          : 'border-linen-dark bg-white hover:bg-linen text-roast'
                      }`}
                    >
                      <div>
                        <p className="text-xs">{courier.name}</p>
                        <p className="text-[10px] text-roast-light font-normal">{courier.eta}</p>
                      </div>
                      <span className="font-serif font-bold text-xs text-cinnamon">
                        {courier.cost === 0 ? 'Gratis' : formatRupiah(courier.cost)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Order Summary Calculation */}
            <div className="p-4 rounded-2xl bg-linen border border-linen-dark space-y-2 text-xs">
              <div className="flex justify-between text-roast-muted">
                <span>Subtotal ({cartItems.length} jenis produk)</span>
                <span>{formatRupiah(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-roast-muted">
                <span>Estimasi Ongkir ({selectedCourier.name})</span>
                <span>{formatRupiah(shippingCost)}</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-linen-dark font-bold text-cinnamon text-sm">
                <span>Estimasi Total</span>
                <span className="font-serif text-lg text-cinnamon">{formatRupiah(totalAmount)}</span>
              </div>
            </div>

            {/* Note & Submit Button */}
            <div className="space-y-3 pt-2">
              <p className="text-[11px] text-roast-muted italic text-center">
                *Setelah tombol ditekan, WhatsApp Anda akan otomatis terbuka dengan format pesanan yang siap dikirimkan ke Admin Cap Sahabat.
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl bg-turmeric hover:bg-turmeric-hover text-cinnamon-dark font-black text-sm flex items-center justify-center gap-2 shadow-warm-md transition-transform hover:scale-[1.01] disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Menyimpan Pesanan...' : 'Pesan ke Admin (Kirim WhatsApp)'}</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}

