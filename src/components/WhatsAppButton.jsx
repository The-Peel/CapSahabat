import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(true);

  const phone = "6281378781327"; // Official WhatsApp number: 0813-7878-1327
  const message = encodeURIComponent("Halo Cap Sahabat Rempah, saya ingin bertanya mengenai pemesanan rempah grosir / bahan baku usaha kuliner HORECA.");
  const waUrl = `https://wa.me/${phone}?text=${message}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-2 animate-bounce-slow">
      
      {/* Tooltip Card */}
      {showTooltip && (
        <div className="bg-cinnamon-dark text-linen border border-turmeric/40 rounded-2xl p-3 shadow-warm-lg text-xs max-w-xs relative animate-fadeIn">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-1.5 right-1.5 text-linen/60 hover:text-linen p-0.5"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <p className="font-bold text-turmeric pr-4">Butuh Pasokan Grosir / B2B?</p>
          <p className="text-[11px] text-linen/80 mt-0.5 leading-snug">
            Konsultasikan kebutuhan rempah HORECA & catering Anda via WhatsApp kami!
          </p>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-xs shadow-warm-lg hover:shadow-2xl transition-all transform hover:scale-105 group border-2 border-white/20"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="hidden sm:inline">WhatsApp Grosir (0813-7878-1327)</span>
      </a>

    </div>
  );
}
