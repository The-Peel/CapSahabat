import initialProducts from '../data/products.json';

// Utility helper to clean price string to number
export const parsePrice = (priceVal) => {
  if (typeof priceVal === 'number') return priceVal;
  if (!priceVal) return 0;
  const cleaned = priceVal.toString().replace(/[^0-9]/g, '');
  return parseInt(cleaned, 10) || 0;
};

// Utility helper to format number to Rupiah string
export const formatRupiah = (num) => {
  const n = typeof num === 'number' ? num : parsePrice(num);
  return 'Rp ' + n.toLocaleString('id-ID');
};

// Storage Keys
const KEYS = {
  PRODUCTS: 'capsahabat_products',
  BANNERS: 'capsahabat_banners',
  ORDERS: 'capsahabat_orders',
  SETTINGS: 'capsahabat_settings',
  USERS: 'capsahabat_users',
  ACTIVE_USER: 'capsahabat_active_user',
};

// Initial Default Banners (Lush Green Herbal Spices Theme)
const DEFAULT_BANNERS = [
  {
    id: 'b1',
    title: 'Kehangatan Rempah Murni & Herbal Premium',
    subtitle: 'Rempah pilihan mutu Grade A tanpa bahan pengawet. Tersedia untuk kebutuhan bumbu dapur keluarga hingga pasokan grosir HORECA kuliner.',
    image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=1400&q=80',
    tag: 'Official Cap Sahabat',
    ctaText: 'Pesan Sekarang',
    ctaLink: '/katalog',
    secondaryCtaText: 'Kerjasama B2B',
    secondaryCtaLink: '/partner-b2b',
    isActive: true,
    orderIndex: 1,
  },
  {
    id: 'b2',
    title: 'Koleksi Minuman Herbal JSR & Teh Alami',
    subtitle: 'Kebugaran holistik Nusantara dari Jahe Merah, Kunyit Murni, hingga Qust Al Hindi kualitas impor super.',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1400&q=80',
    tag: 'Sehat Alami',
    ctaText: 'Lihat Produk JSR',
    ctaLink: '/katalog',
    secondaryCtaText: 'Tentang Kami',
    secondaryCtaLink: '/tentang-kami',
    isActive: true,
    orderIndex: 2,
  },
  {
    id: 'b3',
    title: 'Solusi Pasokan Rempah B2B & Katering Bandung',
    subtitle: 'Kemitraan pasokan bahan baku rutin untuk restoran, cafe, hotel, dan usaha kuliner dengan harga grosir kompetitif.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1400&q=80',
    tag: 'Kemitraan HORECA',
    ctaText: 'Diskusi Kemitraan B2B',
    ctaLink: '/partner-b2b',
    secondaryCtaText: 'Hubungi Kami',
    secondaryCtaLink: '/kontak',
    isActive: true,
    orderIndex: 3,
  }
];

// Initial Company Settings
const DEFAULT_SETTINGS = {
  whatsappNumber: '6281378781327',
  whatsappB2B: '6281378781327',
  email: 'kontak@capsahabat.com',
  companyName: 'Cap Sahabat Rempah',
  tagline: 'Kehangatan Rempah Murni & Herbal Premium Nusantara',
  address: 'Pasar Parahyangan KBP & Jl. Belakang Pasar No. 28B, Bandung',
  operationalHours: 'Senin – Sabtu: 08.00 – 16.30 WIB (Batas Order 15.00 WIB)',
  operationalClosed: 'Minggu & Tanggal Merah: Libur',
  mapsUrl: 'https://maps.google.com/?q=Pasar+Parahyangan+Kota+Baru+Parahyangan',
  tokopediaUrl: 'https://www.tokopedia.com/capsahabat',
  shopeeUrl: 'https://shopee.co.id/capsahabatrempah',
  grabmartUrl: 'https://mart.grab.com/id/id/merchant/toko-sahabat-rempah-pasar-parahyangan-kbp/6-C6MULULARUDFGE',
  instagramUrl: 'https://instagram.com/capsahabatrempah',
};

// Initial Sample Orders
const DEFAULT_ORDERS = [
  {
    id: 'ord-1001',
    orderCode: 'CS-20261110-01',
    customerName: 'Budi Santoso',
    customerPhone: '081234567890',
    customerAddress: 'Jl. Surya Sumantri No. 45, Sukajadi, Kota Bandung, Jawa Barat 40164',
    courierName: 'JNE Reguler',
    shippingCost: 12000,
    subtotal: 52000,
    totalAmount: 64000,
    items: [
      { id: 'p1', name: 'Cajun Seasoning Premium', price: 28000, quantity: 1, subtotal: 28000 },
      { id: 'p4', name: 'Lada Hitam Kasar (Coarse Black Pepper)', price: 24000, quantity: 1, subtotal: 24000 }
    ],
    status: 'selesai',
    createdAt: '2026-11-10T09:30:00.000Z'
  },
  {
    id: 'ord-1002',
    orderCode: 'CS-20261112-02',
    customerName: 'Siti Rahmawati',
    customerPhone: '085712345678',
    customerAddress: 'Komp. Bumi Parahyangan Kencana Blok C2 No. 12, Padalarang, Bandung Barat',
    courierName: 'Paxel Next Day',
    shippingCost: 18000,
    subtotal: 97000,
    totalAmount: 115000,
    items: [
      { id: 'p5', name: 'Jahe Merah Gula Aren Murni JSR', price: 32000, quantity: 1, subtotal: 32000 },
      { id: 'p3', name: 'Peach Gum Dessert Set Complete', price: 65000, quantity: 1, subtotal: 65000 }
    ],
    status: 'dihubungi',
    createdAt: '2026-11-12T14:15:00.000Z'
  }
];

// Initial Admin Users
const DEFAULT_USERS = [
  {
    id: 'usr-1',
    name: 'Super Admin Cap Sahabat',
    email: 'superadmin@capsahabat.com',
    password: 'admin123',
    role: 'super_admin'
  },
  {
    id: 'usr-2',
    name: 'Admin Toko & Produk',
    email: 'admin@capsahabat.com',
    password: 'admin123',
    role: 'admin'
  }
];

// Data Service Singleton
class DataService {
  constructor() {
    this.initData();
  }

  initData() {
    // 1. Initialize Products
    if (!localStorage.getItem(KEYS.PRODUCTS)) {
      const sanitized = initialProducts.map((p, idx) => ({
        id: p.id || `prod-${Date.now()}-${idx}`,
        name: p.name,
        price: parsePrice(p.price),
        unit: p.unit || 'Kemasan',
        description: p.description || '',
        image: p.image || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80',
        category: p.category || 'rempah-botolan',
        categoryName: p.categoryName || 'Rempah Botolan',
        isFeatured: idx < 4,
        isAvailable: true,
        badges: p.badges || ['Rempah Murni'],
        createdAt: new Date().toISOString()
      }));
      localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(sanitized));
    }

    // 2. Initialize Banners (Refresh if still using legacy brown photo)
    const savedBanners = localStorage.getItem(KEYS.BANNERS);
    if (!savedBanners || savedBanners.includes('photo-1596040033229-a9821ebd058d')) {
      localStorage.setItem(KEYS.BANNERS, JSON.stringify(DEFAULT_BANNERS));
    }

    // 3. Initialize Orders
    if (!localStorage.getItem(KEYS.ORDERS)) {
      localStorage.setItem(KEYS.ORDERS, JSON.stringify(DEFAULT_ORDERS));
    }

    // 4. Initialize Settings
    if (!localStorage.getItem(KEYS.SETTINGS)) {
      localStorage.setItem(KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
    }

    // 5. Initialize Users
    if (!localStorage.getItem(KEYS.USERS)) {
      localStorage.setItem(KEYS.USERS, JSON.stringify(DEFAULT_USERS));
    }
  }

  // Trigger custom event so components can update in real-time
  notify(eventName) {
    window.dispatchEvent(new CustomEvent(eventName));
  }

  // --- PRODUCTS ---
  getProducts() {
    try {
      const data = localStorage.getItem(KEYS.PRODUCTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  getProductById(id) {
    return this.getProducts().find((p) => p.id === id) || null;
  }

  saveProducts(products) {
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
    this.notify('capsahabat_products_changed');
  }

  addProduct(productData) {
    const products = this.getProducts();
    const newProduct = {
      id: `p-${Date.now()}`,
      name: productData.name || 'Produk Baru',
      price: parsePrice(productData.price),
      unit: productData.unit || '1 pcs',
      description: productData.description || '',
      image: productData.image || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80',
      category: productData.category || 'rempah-botolan',
      categoryName: productData.categoryName || 'Rempah Botolan & Bumbu Tabur',
      isFeatured: !!productData.isFeatured,
      isAvailable: productData.isAvailable !== false,
      badges: productData.badges || ['Rempah Murni'],
      createdAt: new Date().toISOString(),
    };
    products.unshift(newProduct);
    this.saveProducts(products);
    return newProduct;
  }

  updateProduct(id, updatedFields) {
    const products = this.getProducts();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return null;

    products[index] = {
      ...products[index],
      ...updatedFields,
      price: parsePrice(updatedFields.price !== undefined ? updatedFields.price : products[index].price),
      updatedAt: new Date().toISOString(),
    };
    this.saveProducts(products);
    return products[index];
  }

  deleteProduct(id) {
    const products = this.getProducts().filter((p) => p.id !== id);
    this.saveProducts(products);
    return true;
  }

  // --- BANNERS ---
  getBanners() {
    try {
      const data = localStorage.getItem(KEYS.BANNERS);
      const banners = data ? JSON.parse(data) : [];
      return banners.sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));
    } catch {
      return [];
    }
  }

  saveBanners(banners) {
    localStorage.setItem(KEYS.BANNERS, JSON.stringify(banners));
    this.notify('capsahabat_banners_changed');
  }

  addBanner(bannerData) {
    const banners = this.getBanners();
    const newBanner = {
      id: `b-${Date.now()}`,
      title: bannerData.title || 'Banner Baru',
      subtitle: bannerData.subtitle || '',
      image: bannerData.image || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1400&q=80',
      tag: bannerData.tag || 'Promo Sahabat',
      ctaText: bannerData.ctaText || 'Lihat Katalog',
      ctaLink: bannerData.ctaLink || '/katalog',
      secondaryCtaText: bannerData.secondaryCtaText || '',
      secondaryCtaLink: bannerData.secondaryCtaLink || '',
      isActive: bannerData.isActive !== false,
      orderIndex: banners.length + 1,
      createdAt: new Date().toISOString(),
    };
    banners.push(newBanner);
    this.saveBanners(banners);
    return newBanner;
  }

  updateBanner(id, updatedFields) {
    const banners = this.getBanners();
    const index = banners.findIndex((b) => b.id === id);
    if (index === -1) return null;

    banners[index] = {
      ...banners[index],
      ...updatedFields,
      updatedAt: new Date().toISOString(),
    };
    this.saveBanners(banners);
    return banners[index];
  }

  deleteBanner(id) {
    const banners = this.getBanners().filter((b) => b.id !== id);
    this.saveBanners(banners);
    return true;
  }

  // --- ORDERS ---
  getOrders() {
    try {
      const data = localStorage.getItem(KEYS.ORDERS);
      const orders = data ? JSON.parse(data) : [];
      return orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } catch {
      return [];
    }
  }

  saveOrders(orders) {
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
    this.notify('capsahabat_orders_changed');
  }

  addOrder(orderData) {
    const orders = this.getOrders();
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const orderCode = `CS-${dateStr}-${randomSuffix}`;

    const newOrder = {
      id: `ord-${Date.now()}`,
      orderCode,
      customerName: orderData.customerName || 'Tamu',
      customerPhone: orderData.customerPhone || '',
      customerAddress: orderData.customerAddress || '',
      courierName: orderData.courierName || 'JNE Reguler',
      shippingCost: parsePrice(orderData.shippingCost || 0),
      subtotal: parsePrice(orderData.subtotal || 0),
      totalAmount: parsePrice(orderData.totalAmount || 0),
      items: orderData.items || [],
      status: 'baru', // 'baru', 'dihubungi', 'selesai', 'dibatalkan'
      createdAt: new Date().toISOString(),
    };

    orders.unshift(newOrder);
    this.saveOrders(orders);
    return newOrder;
  }

  updateOrderStatus(id, newStatus) {
    const orders = this.getOrders();
    const index = orders.findIndex((o) => o.id === id);
    if (index === -1) return null;

    orders[index].status = newStatus;
    orders[index].updatedAt = new Date().toISOString();
    this.saveOrders(orders);
    return orders[index];
  }

  deleteOrder(id) {
    const orders = this.getOrders().filter((o) => o.id !== id);
    this.saveOrders(orders);
    return true;
  }

  // --- SETTINGS ---
  getSettings() {
    try {
      const data = localStorage.getItem(KEYS.SETTINGS);
      return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  }

  updateSettings(updatedFields) {
    const current = this.getSettings();
    const nextSettings = { ...current, ...updatedFields };
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(nextSettings));
    this.notify('capsahabat_settings_changed');
    return nextSettings;
  }

  // --- USERS & AUTH ---
  getUsers() {
    try {
      const data = localStorage.getItem(KEYS.USERS);
      return data ? JSON.parse(data) : DEFAULT_USERS;
    } catch {
      return DEFAULT_USERS;
    }
  }

  authenticate(email, password) {
    const users = this.getUsers();
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase().trim() && u.password === password
    );
    if (user) {
      const sessionUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role, // 'admin' or 'super_admin'
        token: `mock-token-${Date.now()}`
      };
      localStorage.setItem(KEYS.ACTIVE_USER, JSON.stringify(sessionUser));
      this.notify('capsahabat_auth_changed');
      return sessionUser;
    }
    return null;
  }

  getActiveUser() {
    try {
      const data = localStorage.getItem(KEYS.ACTIVE_USER);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  logout() {
    localStorage.removeItem(KEYS.ACTIVE_USER);
    this.notify('capsahabat_auth_changed');
  }
}

export const dataService = new DataService();

