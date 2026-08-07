import React, { useState } from 'react';
import recipesData from '../data/recipes.json';
import { Utensils, Clock, Users, ShoppingBag, CheckCircle, ExternalLink, Sparkles, ChefHat } from 'lucide-react';

export default function DapurRempah() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedRecipe, setSelectedRecipe] = useState(recipesData[0]);

  const categories = [
    { id: 'all', name: 'Semua Resep' },
    { id: 'nusantara', name: 'Masakan Nusantara' },
    { id: 'fusion', name: 'Western / Fusion' },
    { id: 'herbal', name: 'Minuman & JSR' },
  ];

  const filteredRecipes = activeCategory === 'all'
    ? recipesData
    : recipesData.filter(r => r.category === activeCategory);

  return (
    <section id="dapur-rempah" className="py-20 bg-linen relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-turmeric/15 text-cinnamon text-xs font-extrabold uppercase tracking-wider">
            <ChefHat className="w-4 h-4 text-turmeric" />
            Fitur Interaktif 1
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cinnamon">
            Dapur Rempah & Recipe Matcher
          </h2>
          <p className="text-roast-muted text-sm sm:text-base">
            Pilih menu masakan favorit Anda di bawah ini untuk melihat daftar racikan rempah murni Cap Sahabat yang digunakan beserta panduan takarannya.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-cinnamon text-turmeric shadow-md'
                  : 'bg-ivory text-roast-muted hover:bg-linen-dark hover:text-cinnamon'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Recipe Grid Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {filteredRecipes.map((recipe) => {
            const isSelected = selectedRecipe.id === recipe.id;
            return (
              <button
                key={recipe.id}
                onClick={() => setSelectedRecipe(recipe)}
                className={`p-3 rounded-2xl text-left transition-all border text-xs flex flex-col justify-between ${
                  isSelected
                    ? 'bg-cinnamon text-linen border-turmeric ring-2 ring-turmeric/50 shadow-warm-md transform scale-[1.02]'
                    : 'bg-white text-roast border-linen-dark hover:border-turmeric/40 hover:bg-ivory/50'
                }`}
              >
                <div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mb-1.5 ${
                    isSelected ? 'bg-turmeric text-cinnamon-dark' : 'bg-cinnamon/10 text-cinnamon'
                  }`}>
                    {recipe.categoryName}
                  </span>
                  <p className="font-serif font-bold text-xs sm:text-sm line-clamp-2 leading-snug">
                    {recipe.title}
                  </p>
                </div>
                <div className={`mt-3 pt-2 border-t text-[10px] flex items-center justify-between ${
                  isSelected ? 'border-linen/20 text-turmeric' : 'border-linen-dark text-roast-light'
                }`}>
                  <span>{recipe.prepTime}</span>
                  <span className="font-semibold">{recipe.spicesUsed.length} Rempah</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Recipe Detail Card Showcase */}
        {selectedRecipe && (
          <div className="bg-white rounded-3xl border border-turmeric/30 p-6 sm:p-8 shadow-warm-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
            
            {/* Dish Image */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-md group">
              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.title}
                className="w-full h-72 lg:h-96 object-cover transform transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cinnamon-dark/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-linen">
                <span className="px-2.5 py-1 rounded-md bg-turmeric text-cinnamon-dark text-[10px] font-bold uppercase mb-1 inline-block">
                  {selectedRecipe.categoryName}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold leading-tight">
                  {selectedRecipe.title}
                </h3>
                <p className="text-xs text-linen/90 font-light mt-1 italic">
                  "{selectedRecipe.tagline}"
                </p>
              </div>
            </div>

            {/* Recipe Content & Spice Checklist */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-4 text-xs text-roast-muted">
                  <span className="flex items-center gap-1.5 bg-ivory px-3 py-1 rounded-full font-medium">
                    <Clock className="w-3.5 h-3.5 text-turmeric" />
                    Waktu Masak: {selectedRecipe.prepTime}
                  </span>
                  <span className="flex items-center gap-1.5 bg-ivory px-3 py-1 rounded-full font-medium">
                    <Users className="w-3.5 h-3.5 text-sage" />
                    Porsi: {selectedRecipe.servings}
                  </span>
                </div>

                <p className="text-sm text-roast leading-relaxed">
                  {selectedRecipe.description}
                </p>
              </div>

              {/* Required Spices Checklist */}
              <div className="bg-linen rounded-2xl p-4 sm:p-5 border border-linen-dark space-y-3">
                <h4 className="font-serif font-bold text-cinnamon text-sm sm:text-base flex items-center justify-between">
                  <span>Daftar Rempah Cap Sahabat yang Digunakan:</span>
                  <span className="text-xs font-sans text-sage font-semibold bg-sage/15 px-2.5 py-0.5 rounded-full">
                    100% Rempah Murni
                  </span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedRecipe.spicesUsed.map((spice, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-linen-dark text-xs">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-turmeric shrink-0" />
                        <span className="font-semibold text-roast">{spice.name}</span>
                      </div>
                      <span className="font-bold text-cinnamon bg-ivory px-2 py-0.5 rounded-md text-[11px]">
                        {spice.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Marketplace Direct Buy Buttons */}
              <div className="space-y-2 pt-2">
                <p className="text-xs text-roast-muted font-medium">
                  Beli racikan rempah murni untuk resep ini langsung di official store kami:
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={selectedRecipe.tokopediaBundleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[200px] px-5 py-3 rounded-xl bg-[#03AC0E] hover:bg-[#028A0B] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-transform hover:scale-[1.02]"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Beli Paket di Tokopedia
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={selectedRecipe.shopeeBundleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[200px] px-5 py-3 rounded-xl bg-[#EE4D2D] hover:bg-[#D03E21] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-transform hover:scale-[1.02]"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Beli Paket di Shopee
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
