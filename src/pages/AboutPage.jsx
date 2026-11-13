import React from 'react';
import { ShieldCheck, Heart, Award, Sparkles, CheckCircle2, Users, Compass, Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  const brandValues = [
    {
      title: 'Authentic & Murni',
      desc: 'Kami menjaga kemurnian 100% rempah Nusantara tanpa bahan pengawet, pemutih, atau penguat rasa sintetis.',
      icon: ShieldCheck,
      color: 'bg-turmeric/10 text-turmeric border-turmeric/30',
    },
    {
      title: 'Kualitas Premium Grade A',
      desc: 'Setiap butir rempah dan herba diseleksi ketat dari hasil tani terbaik lokal maupun impor untuk aroma dan khasiat optimal.',
      icon: Award,
      color: 'bg-sage/10 text-sage border-sage/30',
    },
    {
      title: 'Hangat & Terpercaya',
      desc: 'Menghadirkan kehangatan tradisi rasa di setiap rumah, melayani pelanggan dengan integritas dan persahabatan yang tulus.',
      icon: Heart,
      color: 'bg-red-500/10 text-red-600 border-red-500/30',
    },
    {
      title: 'Dukungan Komunitas & B2B',
      desc: 'Bermitra erat dengan petani lokal dan mendukung ribuan pelaku usaha kuliner di Bandung dan sekitarnya.',
      icon: Users,
      color: 'bg-cinnamon/10 text-cinnamon border-cinnamon/30',
    },
  ];

  const productAdvantages = [
    'Rempah 100% Alami & Bebas Zat Kimia Berbahaya.',
    'Diproses dengan standar higienitas tinggi dan kemasan botol/pouch kedap udara.',
    'Kaya minyak atsiri alami sehingga aroma masakan lebih tajam dan sedap.',
    'Cocok untuk masakan rumah, diet sehat JSR, minuman kebugaran, hingga HORECA.',
    'Harga grosir langsung tangan pertama yang bersaing.',
    'Tersedia layanan pesan cepat via WhatsApp dan pengiriman instant di Bandung.',
  ];

  return (
    <div className="pt-28 pb-24 bg-linen min-h-screen space-y-16 sm:space-y-24">
      
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-cinnamon via-cinnamon to-cinnamon-dark text-linen rounded-3xl p-8 sm:p-14 shadow-warm-lg relative overflow-hidden border border-turmeric/30">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-turmeric/20 text-turmeric text-xs font-bold uppercase tracking-wider">
              <Sprout className="w-3.5 h-3.5" />
              Tentang Cap Sahabat Rempah
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
              Menghidupkan Tradisi Rempah Murni Nusantara
            </h1>
            <p className="text-sm sm:text-base text-linen/85 leading-relaxed font-light">
              Cap Sahabat Rempah (Toko Sahabat Rempah) berdiri dari komitmen untuk melestarikan kekayaan rempah murni Indonesia. Berpusat di Kota Bandung, kami hadir mendampingi resep lezat keluarga hingga dapur profesional.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Profil Perusahaan */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold text-sage uppercase tracking-wider">Profil Perusahaan</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-cinnamon">
              Dedikasi Sepenuh Hati untuk Keaslian Rasa & Kebugaran
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-roast-muted leading-relaxed">
              <p>
                Bermula dari toko rempah tradisional di kawasan Pasar Baru Bandung (Jl. Belakang Pasar No. 28B), Cap Sahabat terus berkembang menjadi pusat rujukan bumbu dapur murni, racikan resep bistro modern, serta rempah kebugaran JSR (Jurus Sehat Rasulullah).
              </p>
              <p>
                Kini dengan kehadiran cabang modern di <strong>Pasar Parahyangan Kota Baru Parahyangan (KBP)</strong> dan <strong>Sukaraja Bandung</strong>, kami menghadirkan pengalaman belanja rempah yang bersih, terstandarisasi, dan terpercaya bagi generasi modern.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden shadow-warm-md border border-linen-dark aspect-[16/10] bg-linen-dark">
              <img
                src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80"
                alt="Rempah Nusantara"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 3. Visi & Misi */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Visi */}
          <div className="p-8 rounded-3xl bg-white border border-linen-dark shadow-warm-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-turmeric/15 text-turmeric flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-cinnamon">Visi Kami</h3>
            <p className="text-xs sm:text-sm text-roast-muted leading-relaxed">
              Menjadi jenama rempah dan herbal Nusantara paling tepercaya dan terdepan di Indonesia yang menginspirasi gaya hidup sehat alami serta memperkuat cita rasa kuliner nasional hingga kancah dunia.
            </p>
          </div>

          {/* Misi */}
          <div className="p-8 rounded-3xl bg-white border border-linen-dark shadow-warm-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-sage/15 text-sage flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-cinnamon">Misi Kami</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-roast-muted">
              <li className="flex items-start gap-2">
                <span className="text-turmeric font-bold">•</span>
                <span>Menyediakan rempah alami Grade A dengan proses seleksi higienis tanpa bahan kimia.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-turmeric font-bold">•</span>
                <span>Membantu keluarga Indonesia mengakses rempah sehat dan herbal murni dengan harga adil.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-turmeric font-bold">•</span>
                <span>Menjadi mitra andalan bagi industri HORECA dalam memastikan kestabilan mutu bumbu dapur.</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* 4. Nilai Brand (Brand Values) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-sage uppercase tracking-wider">Prinsip Kami</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-cinnamon">
            Nilai-Nilai Inti Brand Cap Sahabat
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {brandValues.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-linen-dark shadow-warm-sm space-y-3"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${val.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="font-serif font-bold text-base text-cinnamon">{val.title}</h4>
                <p className="text-xs text-roast-muted leading-relaxed">{val.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Keunggulan Produk (Aksen Coklat Rempah Sekunder) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-brown via-brown to-brown-dark rounded-3xl p-8 sm:p-12 text-linen shadow-warm-md border border-turmeric/30">
          <div className="max-w-3xl space-y-4 mb-8">
            <span className="text-xs font-bold text-turmeric uppercase tracking-wider">Kualitas Terbaik</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-linen">
              Mengapa Memilih Produk Cap Sahabat?
            </h2>
            <p className="text-xs sm:text-sm text-linen/85 leading-relaxed font-light">
              Kami tidak berkompromi dalam mutu. Berikut adalah standar mutu yang membedakan kami dari produk rempah curah di pasaran:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {productAdvantages.map((adv, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm"
              >
                <CheckCircle2 className="w-5 h-5 text-turmeric shrink-0" />
                <span className="text-xs sm:text-sm text-linen font-medium">{adv}</span>
              </div>
            ))}
          </div>

          <div className="pt-8 flex flex-wrap gap-4">
            <Link
              to="/katalog"
              className="px-6 py-3 rounded-xl bg-turmeric text-cinnamon-dark font-black text-xs hover:bg-turmeric-hover transition-transform hover:scale-105"
            >
              Lihat Katalog Produk
            </Link>
            <Link
              to="/partner-b2b"
              className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-linen font-bold text-xs hover:bg-white/20 transition-colors"
            >
              Konsultasi Kerjasama B2B
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

