import React from 'react';

export default function Logo({ className = "h-11 w-11", showText = true, textColor = "text-linen", variant = "default" }) {
  // Use official uploaded logo graphic image
  const logoSrc = variant === 'dark' || textColor.includes('roast') || textColor.includes('cinnamon-dark')
    ? "/logo-official.png"
    : "/logo-official-gold.png";

  return (
    <div className="flex items-center gap-3 group cursor-pointer">
      {/* Official Uploaded Logo Emblem */}
      <div className={`relative flex items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105 overflow-hidden ${
        variant === 'raw'
          ? 'bg-white p-0.5'
          : 'bg-cinnamon border-2 border-turmeric p-1 shadow-warm-sm'
      } ${className}`}>
        
        <img
          src={logoSrc}
          alt="Logo Official Cap Sahabat Rempah"
          className="w-full h-full object-contain"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/logo-official.jpg";
          }}
        />

      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-serif text-lg font-bold tracking-wide leading-tight ${textColor}`}>
            CAP SAHABAT
          </span>
          <span className="text-[10px] tracking-widest uppercase font-semibold text-turmeric">
            Rempah & Herbal
          </span>
        </div>
      )}
    </div>
  );
}
