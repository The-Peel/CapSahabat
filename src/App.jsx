import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';

// Public Pages
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PartnerB2BPage from './pages/PartnerB2BPage';

// Admin CMS Pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminBanners from './pages/admin/AdminBanners';
import AdminOrders from './pages/admin/AdminOrders';
import AdminSettings from './pages/admin/AdminSettings';
import AdminDocs from './pages/admin/AdminDocs';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Global Cart Notification Toast
function CartToast() {
  const { notification } = useCart();
  if (!notification) return null;
  return (
    <div className="fixed top-20 right-6 z-50 bg-cinnamon-dark text-linen border border-turmeric/50 px-4 py-3 rounded-2xl shadow-2xl text-xs font-bold flex items-center gap-2 animate-bounce-slow">
      <span className="w-2 h-2 rounded-full bg-turmeric animate-ping" />
      <span>{notification}</span>
    </div>
  );
}

// Public Layout Wrapper
function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-linen text-roast font-sans selection:bg-turmeric selection:text-cinnamon-dark flex flex-col justify-between">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
      <CartDrawer />
      <CheckoutModal />
      <CartToast />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Public Website Routes */}
            <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
            <Route path="/katalog" element={<PublicLayout><CatalogPage /></PublicLayout>} />
            <Route path="/tentang-kami" element={<PublicLayout><AboutPage /></PublicLayout>} />
            <Route path="/kontak" element={<PublicLayout><ContactPage /></PublicLayout>} />
            <Route path="/partner-b2b" element={<PublicLayout><PartnerB2BPage /></PublicLayout>} />

            {/* Admin CMS Authentication */}
            <Route path="/admin/login" element={<AdminLoginPage />} />

            {/* Admin CMS Protected Area */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="produk" element={<AdminProducts />} />
              <Route path="banner" element={<AdminBanners />} />
              <Route path="pesanan" element={<AdminOrders />} />
              <Route path="pengaturan" element={<AdminSettings />} />
              <Route path="panduan" element={<AdminDocs />} />
            </Route>

            {/* Fallback route */}
            <Route path="*" element={<PublicLayout><HomePage /></PublicLayout>} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
