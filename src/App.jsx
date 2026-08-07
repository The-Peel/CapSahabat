import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DapurRempah from './components/DapurRempah';
import MoodWellness from './components/MoodWellness';
import NewsSection from './components/NewsSection';
import StoreLocations from './components/StoreLocations';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
  return (
    <div className="min-h-screen bg-linen text-roast font-sans selection:bg-turmeric selection:text-cinnamon-dark">
      <Navbar />
      <main>
        <Hero />
        <DapurRempah />
        <MoodWellness />
        <NewsSection />
        <StoreLocations />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
