import React from 'react';
import { useCart } from '../context/CartContext';
import { formatRupiah, parsePrice } from '../services/dataService';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartCount,
    cartSubtotal,
    setIsCheckoutOpen,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-cinnamon-dark/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 sm:p-6 bg-cinnamon text-linen flex items-center justify-between border-b border-turmeric/30">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-turmeric" />
              <h2 className="font-serif text-lg sm:text-xl font-bold">Pesanan Sementara</h2>
              <span className="bg-turmeric text-cinnamon-dark text-xs font-black px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-linen/80 hover:text-white hover:bg-cinnamon-dark/60"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-roast-muted space-y-4">
                <div className="w-16 h-16 rounded-full bg-linen flex items-center justify-center text-cinnamon/40">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <p className="font-bold text-cinnamon text-base">Belum Ada Produk Dipilih</p>
                  <p className="text-xs text-roast-light mt-1">
                    Silakan jelajahi katalog produk kami dan tambahkan rempah pilihan Anda.
                  </p>
                </div>
              </div>
            ) : (
              cartItems.map((item) => {
                const itemPrice = parsePrice(item.product.price);
                const itemTotal = itemPrice * item.quantity;
                return (
                  <div
                    key={item.product.id}
                    className="flex gap-3 p-3 rounded-2xl bg-linen border border-linen-dark hover:border-turmeric/40 transition-colors"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-xl object-cover bg-linen-dark shrink-0"
                    />

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-1">
                        <div>
                          <h4 className="font-serif font-bold text-xs sm:text-sm text-cinnamon line-clamp-1">
                            {item.product.name}
                          </h4>
                          <p className="text-[11px] text-turmeric font-bold mt-0.5">
                            {formatRupiah(itemPrice)}
                            {item.product.unit && (
                              <span className="text-[10px] text-roast-light font-normal ml-1">
                                /{item.product.unit}
                              </span>
                            )}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-roast-light hover:text-red-600 p-1"
                          title="Hapus"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Quantity Modifier */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-linen-dark rounded-lg bg-white overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 hover:bg-linen text-roast"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-bold text-cinnamon min-w-[24px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 hover:bg-linen text-roast"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-serif font-bold text-xs text-cinnamon">
                          {formatRupiah(itemTotal)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Subtotal & Action */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-6 bg-linen border-t border-linen-dark space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-roast-muted">
                  <span>Jumlah Item ({cartCount} pcs)</span>
                  <span>{formatRupiah(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between items-baseline text-sm font-bold text-cinnamon pt-2 border-t border-linen-dark">
                  <span>Estimasi Subtotal</span>
                  <span className="font-serif text-lg text-cinnamon">{formatRupiah(cartSubtotal)}</span>
                </div>
                <p className="text-[11px] text-roast-light italic">
                  *Ongkos kirim akan dihitung pada langkah formulir pembeli selanjutnya.
                </p>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-turmeric hover:bg-turmeric-hover text-cinnamon-dark font-black text-sm flex items-center justify-center gap-2 shadow-warm-md transition-transform hover:scale-[1.01]"
                >
                  <span>Lanjut Isi Data Pembeli</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={clearCart}
                  className="w-full py-2 text-center text-xs text-roast-light hover:text-red-600 transition-colors"
                >
                  Kosongkan Pesanan
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

