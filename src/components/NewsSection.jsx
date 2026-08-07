import React, { useState } from 'react';
import newsData from '../data/news.json';
import { Newspaper, Calendar, Search, ArrowRight, ExternalLink, MapPin, MessageCircle, X, Sparkles, Tag, CheckCircle2 } from 'lucide-react';

export default function NewsSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNewsModal, setSelectedNewsModal] = useState(null);

  const fallbackImg = "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80";

  const categories = [
    { id: 'all', name: 'Semua Kabar' },
    { id: 'pembukaan-toko', name: 'Pembukaan Toko' },
    { id: 'produk-baru', name: 'Produk Baru' },
    { id: 'herbal-jsr', name: 'Kabar Herbal JSR' },
    { id: 'program-b2b', name: 'Program B2B' },
  ];

  const filteredNews = newsData.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.quickDescription.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="kabar-berita" className="py-20 bg-linen relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-turmeric/15 text-cinnamon text-xs font-extrabold uppercase tracking-wider">
            <Newspaper className="w-4 h-4 text-turmeric" />
            Kabar & Berita Resmi
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cinnamon">
            Berita Terbaru Cap Sahabat Rempah
          </h2>
          <p className="text-roast-muted text-sm sm:text-base">
            Ikuti perkembangan pembukaan cabang toko baru, peluncuran produk rempah & bumbu tabur terkini, serta informasi pasokan grosir HORECA di Bandung.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-warm-sm border border-linen-dark mb-10 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between md:gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-roast-light absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari berita: Sukaraja, Cajun, Qust Al Hindi, HORECA..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-linen border border-linen-dark text-sm text-roast placeholder:text-roast-light focus:outline-none focus:border-turmeric focus:ring-1 focus:ring-turmeric"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-roast-light hover:text-roast"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-cinnamon text-turmeric shadow-sm'
                    : 'bg-ivory text-roast-muted hover:bg-linen-dark hover:text-cinnamon'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

        </div>

        {/* News Cards Grid */}
        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((news) => (
              <article
                key={news.id}
                className="bg-white rounded-3xl border border-linen-dark overflow-hidden shadow-warm-sm hover:shadow-warm-md hover:border-turmeric/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* News Image Header */}
                  <div className="relative h-52 overflow-hidden bg-linen-dark">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = fallbackImg;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cinnamon-dark/80 via-transparent to-transparent"></div>
                    
                    {/* Badge & Date Tag */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold shadow-sm ${news.badgeColor}`}>
                        {news.badge}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-linen/90 font-medium">
                      <span className="flex items-center gap-1 bg-cinnamon-dark/80 px-2.5 py-0.5 rounded-md backdrop-blur-md">
                        <Calendar className="w-3 h-3 text-turmeric" />
                        {news.date}
                      </span>
                      <span className="bg-sage/80 px-2.5 py-0.5 rounded-md text-linen backdrop-blur-md">
                        {news.categoryName}
                      </span>
                    </div>
                  </div>

                  {/* News Card Content */}
                  <div className="p-6 space-y-3">
                    {/* Title */}
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-cinnamon leading-snug group-hover:text-turmeric-hover transition-colors">
                      {news.title}
                    </h3>

                    {/* Summary Highlight */}
                    <div className="p-3 rounded-xl bg-ivory border-l-4 border-turmeric text-xs font-semibold text-cinnamon leading-relaxed">
                      💡 <strong>Summary:</strong> {news.summary}
                    </div>

                    {/* Quick Description */}
                    <p className="text-xs text-roast-muted leading-relaxed line-clamp-3">
                      {news.quickDescription}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => setSelectedNewsModal(news)}
                    className="w-full py-3 px-4 rounded-xl bg-cinnamon hover:bg-cinnamon-dark text-turmeric text-xs font-bold transition-all flex items-center justify-center gap-2 group-hover:shadow-md"
                  >
                    <span>Baca Selengkapnya & Detail</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </article>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-linen-dark space-y-3">
            <p className="font-serif font-bold text-lg text-cinnamon">Kabar tidak ditemukan</p>
            <p className="text-xs text-roast-muted">Tidak ada berita yang cocok dengan pencarian Anda.</p>
            <button
              onClick={() => { setSearchTerm(''); setActiveCategory('all'); }}
              className="px-4 py-2 bg-cinnamon text-turmeric rounded-xl text-xs font-bold"
            >
              Reset Filter
            </button>
          </div>
        )}

      </div>

      {/* Full News Detail Modal */}
      {selectedNewsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cinnamon-dark/85 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 border border-turmeric/40 shadow-2xl relative">
            
            <button
              onClick={() => setSelectedNewsModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-linen hover:bg-linen-dark text-roast z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image & Header */}
            <div className="relative rounded-2xl overflow-hidden h-60 sm:h-72">
              <img
                src={selectedNewsModal.image}
                alt={selectedNewsModal.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = fallbackImg;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cinnamon-dark via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-linen">
                <span className={`px-3 py-1 rounded-full text-xs font-extrabold inline-block mb-2 ${selectedNewsModal.badgeColor}`}>
                  {selectedNewsModal.badge} • {selectedNewsModal.categoryName}
                </span>
                <p className="text-xs text-linen/80 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-turmeric" />
                  {selectedNewsModal.date}
                </p>
              </div>
            </div>

            {/* Content Body */}
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-cinnamon leading-tight">
                {selectedNewsModal.title}
              </h3>

              <div className="p-4 rounded-2xl bg-ivory border-l-4 border-turmeric text-sm font-bold text-cinnamon">
                📌 <strong>Rangkuman Berita:</strong> {selectedNewsModal.summary}
              </div>

              <div className="text-xs sm:text-sm text-roast leading-relaxed space-y-3">
                <p className="font-medium text-roast-muted">{selectedNewsModal.quickDescription}</p>
                <p className="pt-2 border-t border-linen-dark">{selectedNewsModal.fullContent}</p>
              </div>
            </div>

            {/* Action Buttons based on news type */}
            <div className="pt-4 border-t border-linen-dark space-y-2">
              <p className="text-xs text-roast-muted font-semibold">Aksi Cepat Berita Ini:</p>
              
              {selectedNewsModal.actionType === 'location' && (
                <a
                  href={selectedNewsModal.targetUrl}
                  onClick={() => setSelectedNewsModal(null)}
                  className="w-full py-3 px-4 rounded-xl bg-turmeric hover:bg-turmeric-hover text-cinnamon-dark font-extrabold text-xs flex items-center justify-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  Lihat Lokasi Toko di Halaman Ini
                </a>
              )}

              {selectedNewsModal.actionType === 'marketplace' && (
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={selectedNewsModal.tokopediaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-xl bg-[#03AC0E] hover:bg-[#028A0B] text-white text-xs font-bold text-center flex items-center justify-center gap-2"
                  >
                    Beli di Tokopedia
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={selectedNewsModal.shopeeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-xl bg-[#EE4D2D] hover:bg-[#D03E21] text-white text-xs font-bold text-center flex items-center justify-center gap-2"
                  >
                    Beli di Shopee
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              {selectedNewsModal.actionType === 'whatsapp' && (
                <a
                  href={selectedNewsModal.targetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-xs flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Hubungi Tim Sales B2B via WhatsApp
                </a>
              )}
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
