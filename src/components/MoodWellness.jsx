import React, { useState } from 'react';
import wellnessMoodsData from '../data/wellnessMoods.json';
import { HeartPulse, Moon, Shield, Coffee, Flame, Check, ExternalLink, Sparkles } from 'lucide-react';

export default function MoodWellness() {
  const [selectedMood, setSelectedMood] = useState(wellnessMoodsData[0]);

  const moodIcons = {
    sleep: Moon,
    immunity: Shield,
    detox: Coffee,
    warming: Flame,
  };

  return (
    <section id="mood-wellness" className="py-20 bg-ivory/60 relative overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-sage/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sage/15 text-sage-dark text-xs font-extrabold uppercase tracking-wider">
            <HeartPulse className="w-4 h-4 text-sage" />
            Fitur Interaktif 2
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cinnamon">
            Mood Teh & Wellness Selector
          </h2>
          <p className="text-roast-muted text-sm sm:text-base">
            Temukan racikan teh herbal alami, ramuan JSR (Jurus Sehat Rasulullah), dan dessert sehat yang pas dengan suasana hati & kebutuhan stamina tubuh Anda hari ini.
          </p>
        </div>

        {/* Mood Selector Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12">
          {wellnessMoodsData.map((mood) => {
            const Icon = moodIcons[mood.moodKey] || HeartPulse;
            const isSelected = selectedMood.id === mood.id;

            return (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood)}
                className={`p-4 sm:p-5 rounded-2xl text-left transition-all border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-cinnamon text-linen border-turmeric shadow-warm-lg ring-2 ring-turmeric/40 transform -translate-y-1'
                    : 'bg-white text-roast border-linen-dark hover:border-sage/40 hover:bg-linen/50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl ${
                    isSelected ? 'bg-turmeric text-cinnamon-dark' : 'bg-sage/10 text-sage'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {isSelected && (
                    <span className="text-[10px] bg-sage text-linen font-bold px-2 py-0.5 rounded-full">
                      Dipilih
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-serif font-bold text-sm sm:text-base mb-1">
                    {mood.title}
                  </h3>
                  <p className={`text-xs ${isSelected ? 'text-linen/80' : 'text-roast-muted'}`}>
                    {mood.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Mood Detail Showcase */}
        {selectedMood && (
          <div className="bg-white rounded-3xl border border-sage/20 p-6 sm:p-8 shadow-warm-md space-y-8 animate-fadeIn">
            
            <div className="max-w-2xl space-y-2 border-b border-linen-dark pb-6">
              <span className="text-xs font-bold text-sage uppercase tracking-widest">
                Rekomendasi Spesial Herbal
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cinnamon">
                {selectedMood.title}
              </h3>
              <p className="text-roast-muted text-sm sm:text-base leading-relaxed">
                {selectedMood.description}
              </p>
            </div>

            {/* Recommended Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedMood.recommendedProducts.map((prod, idx) => (
                <div
                  key={idx}
                  className="bg-linen/60 rounded-2xl p-5 border border-linen-dark hover:border-turmeric/40 transition-colors flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-serif font-bold text-lg text-cinnamon">
                        {prod.name}
                      </h4>
                      <span className="px-2.5 py-1 rounded-full bg-sage/15 text-sage-dark text-[11px] font-bold shrink-0">
                        100% Organik
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-start gap-2 text-roast">
                        <Check className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                        <span><strong className="text-cinnamon font-semibold">Manfaat Utama:</strong> {prod.benefits}</span>
                      </div>

                      <div className="p-3 rounded-xl bg-white border border-linen-dark text-roast-muted italic">
                        <strong className="text-turmeric font-semibold not-italic block mb-0.5">💡 Cara Penyeduhan:</strong>
                        "{prod.brewingTip}"
                      </div>
                    </div>
                  </div>

                  {/* Marketplace Purchase Links */}
                  <div className="pt-2 border-t border-linen-dark grid grid-cols-2 gap-2">
                    <a
                      href={prod.tokopediaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-[#03AC0E] hover:bg-[#028A0B] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      Tokopedia
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href={prod.shopeeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-[#EE4D2D] hover:bg-[#D03E21] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      Shopee
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
