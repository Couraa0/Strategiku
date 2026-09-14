import bcrypt from 'bcryptjs';

export interface MockUser {
  user_id: string;
  name: string;
  email: string;
  password_hash: string;
  role: string;
  created_at: string;
}

export interface MockBusiness {
  business_id: string;
  name: string;
  type: string;
  description: string;
  province: string;
  city_regency: string;
  district: string;
  employee_count: number;
  years_operating: number;
  phone: string;
  email: string;
  website: string;
  created_at: string;
}

export interface MockProduct {
  product_id: string;
  business_id: string;
  product_name: string;
  category: string;
  description: string;
  price: number;
  unit: string;
  capacity: number;
  is_active: boolean;
}

export interface MockTransaction {
  transaction_id: string;
  business_id: string;
  customer_name: string;
  customer_type: string;
  transaction_date: string;
  channel: string;
  total_amount: number;
  items: {
    product_name: string;
    quantity: number;
    unit_price: number;
    subtotal: number;
  }[];
}

export interface MockOpportunity {
  opportunity_id: string;
  title: string;
  organization_name: string;
  opportunity_type: string;
  category: string;
  description: string;
  location: string;
  requirement: string;
  capacity_required: string;
  source: string;
  source_url: string;
  source_date: string;
  status: string;
}

export interface MockRecommendation {
  recommendation_id: string;
  business_id: string;
  opportunity_id: string;
  score: number;
  rank: number;
  reason: string[];
}

export interface MockKnowledgeDocument {
  document_id: string;
  business_id: string;
  document_type: string;
  title: string;
  content: string;
  source: string;
  version: string;
  created_at: string;
}

export interface MockAssistantMessage {
  role: string;
  content: string;
  sources?: string[];
  timestamp: string;
}

const DEMO_PASSWORD_HASH = bcrypt.hashSync('Demo123!', 10);

export const mockStore = {
  users: [
    {
      user_id: 'USR001',
      name: 'Budi Santoso',
      email: 'demo@aphyah.id',
      password_hash: DEMO_PASSWORD_HASH,
      role: 'OWNER',
      created_at: new Date('2025-01-01').toISOString(),
    },
  ] as MockUser[],

  businesses: [
    {
      business_id: 'UMKM001',
      name: 'Kopi Karawang',
      type: 'F&B / Pengolahan Kopi',
      description: 'Produsen kopi lokal specialty dan olahan turunan kopi asli Karawang, Jawa Barat.',
      province: 'Jawa Barat',
      city_regency: 'Kabupaten Karawang',
      district: 'Karawang Barat',
      employee_count: 8,
      years_operating: 4,
      phone: '081234567890',
      email: 'info@kopikarawang.id',
      website: 'https://kopikarawang.id',
      created_at: new Date('2025-01-01').toISOString(),
    },
  ] as MockBusiness[],

  business_profile: {
    profile_id: 'PRF001',
    business_id: 'UMKM001',
    target_market: 'Retail Coffee Lovers, Cafe Local, Corporate Gifts',
    business_goal_context: 'Meningkatkan penjualan B2B grosir dan memperluas distribusi cafe di wilayah Karawang dan Bandung.',
    sales_channels: ['Offline Store', 'E-Commerce', 'Cafe Wholesale', 'Social Media'],
    b2b_experience: 'Pernah memasok 3 cafe lokal dan bingkisan korporat instansi Pemkab.',
    capacity_description: 'Kapasitas sangrai (roasting) hingga 600 kg per bulan, kemasan pouch alumunium foil valve.',
    digital_maturity: 'Medium',
  },

  business_goals: [
    { goal_id: 'G001', business_id: 'UMKM001', goal_type: 'Perluasan Pasar B2B', priority: 'HIGH', target_period: 'Q3-Q4 2026' },
    { goal_id: 'G002', business_id: 'UMKM001', goal_type: 'Peningkatan Revenue 30%', priority: 'HIGH', target_period: '2026' },
  ],

  business_capabilities: [
    { capability_id: 'CAP001', business_id: 'UMKM001', capability_type: 'Kapasitas Roasting', description: 'Mesin roasting otomatis 10kg/batch', capacity_value: 600, unit: 'kg/bulan' },
    { capability_id: 'CAP002', business_id: 'UMKM001', capability_type: 'Pengemasan Hygiene', description: 'Sealer otomatis & nitrogen flush', capacity_value: 2000, unit: 'pouch/bulan' },
  ],

  products: [
    {
      product_id: 'PROD001',
      business_id: 'UMKM001',
      product_name: 'Kopi Arabika Specialty Karawang 250g',
      category: 'Biji & Bubuk Kopi',
      description: 'Biji kopi Arabika kualitas premium dengan note asam buah-buahan dan hint cokelat.',
      price: 65000,
      unit: 'pouch',
      capacity: 300,
      is_active: true,
    },
    {
      product_id: 'PROD002',
      business_id: 'UMKM001',
      product_name: 'Kopi Robusta Blend Karawang 250g',
      category: 'Biji & Bubuk Kopi',
      description: 'Kopi Robusta kaya rasa dengan body mantap dan aroma karamel yang kuat.',
      price: 45000,
      unit: 'pouch',
      capacity: 500,
      is_active: true,
    },
    {
      product_id: 'PROD003',
      business_id: 'UMKM001',
      product_name: 'Cold Brew Bottled Signature 250ml',
      category: 'Siap Minum',
      description: 'Seduhan dingin 16 jam tanpa gula tambahan, segar dan rendah asam.',
      price: 25000,
      unit: 'botol',
      capacity: 400,
      is_active: true,
    },
    {
      product_id: 'PROD004',
      business_id: 'UMKM001',
      product_name: 'Drip Bag Coffee Box (Isi 5 Sachet)',
      category: 'Kopi Praktis',
      description: 'Kopi kemasan drip praktis tinggal tuang air panas, pas untuk kantor & travel.',
      price: 35000,
      unit: 'box',
      capacity: 250,
      is_active: true,
    },
  ] as MockProduct[],

  transactions: [
    {
      transaction_id: 'TRX-2026-001',
      business_id: 'UMKM001',
      customer_name: 'Cafe Kopi Kita',
      customer_type: 'Cafe Wholesale',
      transaction_date: '2026-02-14T10:30:00Z',
      channel: 'B2B Direct',
      total_amount: 1950000,
      items: [
        { product_name: 'Kopi Arabika Specialty Karawang 250g', quantity: 20, unit_price: 65000, subtotal: 1300000 },
        { product_name: 'Kopi Robusta Blend Karawang 250g', quantity: 14, unit_price: 45000, subtotal: 630000 },
      ],
    },
    {
      transaction_id: 'TRX-2026-002',
      business_id: 'UMKM001',
      customer_name: 'Dewi Lestari',
      customer_type: 'Retail',
      transaction_date: '2026-02-15T14:15:00Z',
      channel: 'Offline Store',
      total_amount: 140000,
      items: [
        { product_name: 'Kopi Arabika Specialty Karawang 250g', quantity: 1, unit_price: 65000, subtotal: 65000 },
        { product_name: 'Drip Bag Coffee Box (Isi 5 Sachet)', quantity: 1, unit_price: 35000, subtotal: 35000 },
        { product_name: 'Cold Brew Bottled Signature 250ml', quantity: 1, unit_price: 25000, subtotal: 25000 },
      ],
    },
    {
      transaction_id: 'TRX-2026-003',
      business_id: 'UMKM001',
      customer_name: 'PT Mitra Sukses Mandiri',
      customer_type: 'Corporate',
      transaction_date: '2026-02-18T09:00:00Z',
      channel: 'B2B Direct',
      total_amount: 3500000,
      items: [
        { product_name: 'Drip Bag Coffee Box (Isi 5 Sachet)', quantity: 100, unit_price: 35000, subtotal: 3500000 },
      ],
    },
    {
      transaction_id: 'TRX-2026-004',
      business_id: 'UMKM001',
      customer_name: 'Reseller Bandung',
      customer_type: 'Reseller',
      transaction_date: '2026-02-22T16:45:00Z',
      channel: 'E-Commerce',
      total_amount: 2250000,
      items: [
        { product_name: 'Kopi Robusta Blend Karawang 250g', quantity: 50, unit_price: 45000, subtotal: 2250000 },
      ],
    },
    {
      transaction_id: 'TRX-2026-005',
      business_id: 'UMKM001',
      customer_name: 'Cafe Sejahtera',
      customer_type: 'Cafe Wholesale',
      transaction_date: '2026-03-01T11:20:00Z',
      channel: 'B2B Direct',
      total_amount: 3250000,
      items: [
        { product_name: 'Kopi Arabika Specialty Karawang 250g', quantity: 50, unit_price: 65000, subtotal: 3250000 },
      ],
    },
    {
      transaction_id: 'TRX-2026-006',
      business_id: 'UMKM001',
      customer_name: 'Ahmad Faisal',
      customer_type: 'Retail',
      transaction_date: '2026-03-05T13:10:00Z',
      channel: 'Social Media',
      total_amount: 195000,
      items: [
        { product_name: 'Kopi Arabika Specialty Karawang 250g', quantity: 3, unit_price: 65000, subtotal: 195000 },
      ],
    },
  ] as MockTransaction[],

  opportunities: [
    {
      opportunity_id: 'OPP-2026-001',
      title: 'Pengadaan Bingkisan Kopi & Suvenir UMKM Lokal Pemkab Karawang',
      organization_name: 'Dinas Koperasi & UMKM Kabupaten Karawang',
      opportunity_type: 'Procurement / Bingkisan Korporat',
      category: 'F&B / Kopi',
      description: 'Pengadaan paket kemasan kopi suvenir khas Karawang untuk acara kunjungan kerja dan event daerah.',
      location: 'Kabupaten Karawang',
      requirement: 'Produk kopi olahan lokal Karawang dengan sertifikasi Halal dan P-IRT. Kemasan eksklusif.',
      capacity_required: '200 - 500 paket / pesanan',
      source: 'Verified Opportunity',
      source_url: 'https://diskopukm.karawangkab.go.id/peluang-pengadaan-2026',
      source_date: '2026-02-10',
      status: 'Active',
    },
    {
      opportunity_id: 'OPP-2026-002',
      title: 'Kemitraan Pasokan Biji Kopi untuk Jaringan Cafe Bandung',
      organization_name: 'Kolektif Cafe Bandung Raya',
      opportunity_type: 'Cafe Supply Agreement',
      category: 'F&B / Kopi',
      description: 'Kemitraan pasokan biji kopi Arabika & Robusta roasting konsisten per bulan untuk 5 cabang cafe lokal.',
      location: 'Kota Bandung',
      requirement: 'Konsistensi kuantitas 150-300kg/bulan, profil sangrai Medium-to-Dark, sampel uji rasa (cupping).',
      capacity_required: '250 kg / bulan',
      source: 'Verified Opportunity',
      source_url: 'https://bandungcafenetwork.com/supply-partner-2026',
      source_date: '2026-02-15',
      status: 'Active',
    },
    {
      opportunity_id: 'OPP-2026-003',
      title: 'Program Display Produk UMKM Unggulan Rest Area Tol Cipularang',
      organization_name: 'Pengelola Rest Area KM 88 Tol Purbaleunyi',
      opportunity_type: 'Retail Partnership',
      category: 'F&B / Retail suvenir',
      description: 'Kesempatan menempatkan produk kopi siap minum dan drip bag pada etalase Pojok UMKM Rest Area.',
      location: 'Kabupaten Purwakarta',
      requirement: 'Produk dalam kemasan ritel berdaya simpan >3 bulan, kemasan tahan banting.',
      capacity_required: '100 pcs / minggu',
      source: 'Public Business Opportunity Signal',
      source_url: 'https://jasamarga.co.id/pojok-umkm-restarea',
      source_date: '2026-01-28',
      status: 'Active',
    },
    {
      opportunity_id: 'OPP-2026-004',
      title: 'Distributor Produk Olahan Kopi Jawa Barat untuk Pasar Jabodetabek',
      organization_name: 'PT Nusantara Food Distrindo',
      opportunity_type: 'Distributor Agreement',
      category: 'F&B / Distributor',
      description: 'Mencari produsen UMKM kopi siap minum / drip bag untuk didistribusikan ke supermarket lokal Bekasi & Jakarta.',
      location: 'Kota Bekasi',
      requirement: 'Minimal izin edar P-IRT & Halal, sanggup memenuhi pesanan bertahap dengan masa simpan produk jelas.',
      capacity_required: '500 box / bulan',
      source: 'Curated Prototype Opportunity',
      source_url: 'https://nusantaradistrindo.co.id/partnership',
      source_date: '2026-02-01',
      status: 'Active',
    },
    {
      opportunity_id: 'OPP-2026-005',
      title: 'Pasokan Kopi Drip Bag untuk Hampers Perusahaan BUMN',
      organization_name: 'PT Telkom Indonesia (Witel Karawang)',
      opportunity_type: 'Corporate Gift',
      category: 'F&B / Kopi',
      description: 'Pengadaan hampers suvenir akhir semester untuk pelanggan prioritas dan tamu instansi.',
      location: 'Kabupaten Karawang',
      requirement: 'Paket box eksklusif isi drip bag coffee + mug khas lokal.',
      capacity_required: '150 box',
      source: 'Verified Opportunity',
      source_url: 'https://telkom.co.id/procurement-local',
      source_date: '2026-03-01',
      status: 'Active',
    },
  ] as MockOpportunity[],

  recommendations: [
    {
      recommendation_id: 'REC-001',
      business_id: 'UMKM001',
      opportunity_id: 'OPP-2026-001',
      score: 0.94,
      rank: 1,
      reason: ['Keselarasan Kategori (F&B / Kopi)', 'Lokasi Sangat Sesuai (Karawang)', 'Kapasitas Produksi Mencukupi (Roasting 600kg/bln)', 'Sertifikasi Halal & P-IRT Sesuai'],
    },
    {
      recommendation_id: 'REC-002',
      business_id: 'UMKM001',
      opportunity_id: 'OPP-2026-002',
      score: 0.88,
      rank: 2,
      reason: ['Keselarasan Produk (Kopi Arabika & Robusta)', 'Wilayah Jawa Barat (Bandung)', 'Pengalaman B2B Cafe'],
    },
    {
      recommendation_id: 'REC-003',
      business_id: 'UMKM001',
      opportunity_id: 'OPP-2026-005',
      score: 0.85,
      rank: 3,
      reason: ['Keselarasan Lokasi (Karawang)', 'Produk Drip Bag Coffee Sesuai Target', 'Kapasitas Sangat Mencukupi'],
    },
    {
      recommendation_id: 'REC-004',
      business_id: 'UMKM001',
      opportunity_id: 'OPP-2026-003',
      score: 0.78,
      rank: 4,
      reason: ['Kategori Suvenir & Retail', 'Daya Simpan Kemasan Sesuai'],
    },
  ] as MockRecommendation[],

  knowledge_documents: [
    {
      document_id: 'KNOW-001',
      business_id: 'UMKM001',
      document_type: 'Catalog & Pricing',
      title: 'Katalog Produk & Daftar Harga Resmi Kopi Karawang',
      content: `Daftar Produk Resmi Kopi Karawang (Update 2026):
1. Kopi Arabika Specialty Karawang 250g - Harga Ritel: Rp 65.000 / pouch (Grosir >20 pouch: Rp 55.000). Biji kopi pilihan dari perkebunan Karawang Selatan dengan flavor note buah & asam segar.
2. Kopi Robusta Blend Karawang 250g - Harga Ritel: Rp 45.000 / pouch (Grosir >20 pouch: Rp 38.000). Aroma karamel kuat dan body pekat.
3. Cold Brew Bottled Signature 250ml - Harga Ritel: Rp 25.000 / botol. Minuman kopi seduh dingin tanpa pengawet.
4. Drip Bag Coffee Box (Isi 5 Sachet) - Harga Ritel: Rp 35.000 / box (Grosir >50 box: Rp 28.000). Solusi seduh kopi praktis.`,
      source: 'Internal Document',
      version: '2.1',
      created_at: '2026-01-10T00:00:00Z',
    },
    {
      document_id: 'KNOW-002',
      business_id: 'UMKM001',
      document_type: 'FAQ & Syarat Pemesanan',
      title: 'FAQ Pemesanan Grosir & Kemitraan Cafe',
      content: `Pertanyaan Umum (FAQ) & Kebijakan Bisnis Kopi Karawang:
- Berapa minimal order untuk pembelian grosir B2B? Minimal order grosir adalah 10 pouch atau 20 box Drip Bag.
- Apakah menyediakan custom branding/logo perusahaan untuk hampers? Ya, kami menerima pesanan hampers korporat dengan custom logo/stiker instansi dengan pesanan minimal 50 paket.
- Berapa lama ketahanan produk? Biji/bubuk kopi dalam pouch valve bertahan hingga 12 bulan. Cold Brew botol bertahan 14 hari di kulkas pendingin. Drip bag coffee bertahan 9 bulan.
- Apakah produk sudah bersertifikat resmi? Seluruh produk Kopi Karawang sudah memiliki izin P-IRT No. 210321501099-26 dan Sertifikasi Halal Indonesia.`,
      source: 'Sales Policy',
      version: '1.0',
      created_at: '2026-01-15T00:00:00Z',
    },
    {
      document_id: 'KNOW-003',
      business_id: 'UMKM001',
      document_type: 'Jam Operasional & Pengiriman',
      title: 'Jam Operasional Toko & Kebijakan Pengiriman',
      content: `Jam Operasional & Kontak Resmi:
- Rumah Sangrai & Galeri Kopi Karawang buka Senin - Sabtu pukul 08.00 - 20.00 WIB (Hari Minggu Libur).
- Alamat: Jl. Raya Karawang Barat No. 45, Kabupaten Karawang, Jawa Barat.
- Layanan pengiriman grosir menggunakan Kurir Ekspedisi Cargo (Indah Cargo, JNE Trucking) untuk area Jawa Barat & Jabodetabek. Pengiriman lokal Karawang dapat menggunakan pengiriman sameday.`,
      source: 'Operations Manual',
      version: '1.0',
      created_at: '2026-01-20T00:00:00Z',
    },
  ] as MockKnowledgeDocument[],

  assistant_history: [
    {
      role: 'assistant',
      content: 'Halo! Saya AI Business Growth Assistant untuk Kopi Karawang. Ada yang bisa saya bantu terkait produk, penawaran harga grosir, atau persiapan pengajuan opportunity bisnis?',
      timestamp: new Date().toISOString(),
    },
  ] as MockAssistantMessage[],
};
