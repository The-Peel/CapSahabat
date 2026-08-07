import React from 'react';
import storeLocationsData from '../data/storeLocations.json';
import { MapPin, Clock, ExternalLink, Navigation, Phone, ShoppingBag, Store, ShieldAlert } from 'lucide-react';

export default function StoreLocations() {
  return (
    <section id="lokasi-toko" className="py-20 bg-cinnamon text-linen relative overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-turmeric/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sage/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-turmeric/20 text-turmeric text-xs font-extrabold uppercase tracking-wider border border-turmeric/30">
            <Store className="w-4 h-4 text-turmeric" />
            Kunjungan Fisik & Instant Delivery
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-linen">
            Lokasi Toko Fisik Cap Sahabat Rempah
          </h2>
          <p className="text-linen/80 text-sm sm:text-base">
            Kunjungi langsung 3 cabang toko kami di Bandung untuk berbelanja rempah segar murni secara grosir maupun retail, atau pesan instan melalui GrabMart.
          </p>
        </div>

        {/* Operational Schedule Notification Banner */}
        <div className="bg-cinnamon-dark/90 border border-turmeric/40 rounded-2xl p-4 sm:p-5 mb-12 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 shadow-warm-md">
          <div className="flex items-center gap-3 text-left">
            <div className="p-3 rounded-xl bg-turmeric/20 text-turmeric border border-turmeric/30 shrink-0">
              <Clock className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-linen">Jam Operasional Toko Fisik:</h3>
              <p className="text-xs text-linen/90 font-light mt-0.5">
                <strong className="text-turmeric font-semibold">Senin – Sabtu: 08.00 – 16.30 WIB</strong> (Batas waktu pengiriman & penutupan order pkl 15.00 WIB).
              </p>
            </div>
          </div>

          <div className="px-3 py-1.5 rounded-full bg-red-950/60 border border-red-500/40 text-red-200 text-xs font-semibold shrink-0">
            🚫 Minggu & Tanggal Merah: Libur
          </div>
        </div>

        {/* 3 Store Location Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {storeLocationsData.map((loc) => (
            <div
              key={loc.id}
              className="bg-cinnamon-dark/80 rounded-3xl border border-turmeric/30 overflow-hidden shadow-warm-lg flex flex-col justify-between group hover:border-turmeric transition-all duration-300"
            >
              <div>
                {/* Store Header Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={loc.image}
                    alt={loc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cinnamon-dark via-cinnamon-dark/40 to-transparent"></div>
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-sage text-linen text-[11px] font-bold shadow-sm">
                    {loc.tag}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4">
                  <h3 className="font-serif font-bold text-xl text-linen leading-snug">
                    {loc.name}
                  </h3>

                  <div className="space-y-2.5 text-xs text-linen/85">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-turmeric shrink-0 mt-0.5" />
                      <p className="leading-relaxed">{loc.address}</p>
                    </div>

                    <div className="flex items-center gap-2.5 pt-1">
                      <Clock className="w-4 h-4 text-sage-light shrink-0" />
                      <span>{loc.hours}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 space-y-2.5">
                <a
                  href={loc.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-turmeric hover:bg-turmeric-hover text-cinnamon-dark font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition-transform hover:scale-[1.02]"
                >
                  <Navigation className="w-4 h-4" />
                  Buka di Google Maps
                </a>

                {loc.grabMartAvailable && (
                  <a
                    href={loc.grabMartUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-[#00B14F] hover:bg-[#009141] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Pesan Instan via GrabMart
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
