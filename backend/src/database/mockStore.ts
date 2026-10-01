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

export interface MockProductItem {
  id: string;
  nama_produk: string;
  kategori: string;
  harga: number;
  kapasitas: string;
  satuan_penjualan: string;
  area_layanan: string;
}

export interface MockBusinessProfile {
  id: string;
  user_id: string;
  
  // Section 1: Identitas UMKM
  nama_usaha: string;
  nama_pemilik: string;
  kabupaten_kota: string;
  alamat_usaha: string;
  tahun_mulai_usaha: number;
  deskripsi_usaha: string;

  // Section 2: Kategori & Kemampuan Usaha
  bidang_usaha: string;
  kategori: string;
  target_pasar: string;
  kapasitas: string;
  area_layanan: string;

  // Section 3: Pengalaman & Kesiapan Kemitraan
  pengalaman_b2b: string;
  pengalaman_pesanan_besar: string;
  legalitas_usaha: string;
  kesediaan_memenuhi_pesanan_besar: 'Ya' | 'Tidak' | 'Dengan Syarat';
  persyaratan_kemampuan_khusus: string;

  // Section 4: Preferensi Kemitraan
  jenis_peluang_diminati: string;
  wilayah_peluang_diinginkan: string;
  minimal_pesanan: string;
  maksimal_pesanan: string;
  deskripsi_kerjasama: string;

  // Section 5: Katalog Produk / Jasa
  products: MockProductItem[];

  // Legacy compatibility fields
  target_market?: string;
  business_goal_context?: string;
  sales_channels?: string[];
  b2b_experience?: string;
  capacity_description?: string;
  digital_maturity?: string;
}

export interface MockOpportunity {
  opportunity_id: string;
  ranking?: number;
  title: string;
  organization_name: string;
  location: string;
  category: string;
  match_score?: number;
  match_reasons?: string[];
  quantity_unit: string; // Jumlah dan satuan
  periode: string;       // Periode
  status: 'Aktif' | 'Terbuka' | 'Ditutup' | 'Proses Seleksi'; // Status
  source_url: string;    // Link sumber
  description: string;
  requirement?: string;
  created_at?: string;
}

export interface MockRecommendation {
  recommendation_id: string;
  business_id: string;
  opportunity_id: string;
  ranking: number;
  skor_relevansi: number;
  alasan_rekomendasi: string[];
}

const DEMO_PASSWORD_HASH = bcrypt.hashSync('Demo123!', 10);

export const mockStore = {
  users: [
    {
      user_id: 'USR001',
      name: 'Budi Santoso',
      email: 'demo@aphyah.id',
      password_hash: DEMO_PASSWORD_HASH,
      role: 'UMKM_OWNER',
      created_at: new Date('2025-01-01').toISOString(),
    },
    {
      user_id: 'USR002',
      name: 'Admin Strategiku',
      email: 'admin@aphyah.id',
      password_hash: DEMO_PASSWORD_HASH,
      role: 'ADMIN',
      created_at: new Date('2025-01-01').toISOString(),
    }
  ] as MockUser[],

  businesses: [
    {
      business_id: 'UMKM001',
      name: 'Kopi Karawang Heritage',
      type: 'Pengolahan Makanan & Minuman',
      description: 'Produsen kopi specialty olahan lokal Karawang berkualitas tinggi.',
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
    id: 'PRF001',
    user_id: 'USR001',
    // Section 1: Identitas UMKM
    nama_usaha: 'Kopi Karawang Heritage',
    nama_pemilik: 'Budi Santoso',
    kabupaten_kota: 'Kabupaten Karawang',
    alamat_usaha: 'Jl. Interchange Karawang Barat No. 45, Karawang',
    tahun_mulai_usaha: 2021,
    deskripsi_usaha: 'Produsen kopi specialty olahan lokal Karawang berkualitas tinggi dengan roasting konsisten.',

    // Section 2: Kategori & Kemampuan Usaha
    bidang_usaha: 'Pengolahan Makanan & Minuman',
    kategori: 'Kopi & Minuman Olahan',
    target_pasar: 'Cafe, Hotel, Retail Suvenir, dan Korporat',
    kapasitas: '600 kg / bulan',
    area_layanan: 'Jawa Barat & Jabodetabek',

    // Section 3: Pengalaman & Kesiapan Kemitraan
    pengalaman_b2b: 'Memasok 15 cafe lokal di Karawang & Bandung serta 3 dinas Pemkab.',
    pengalaman_pesanan_besar: 'Memenuhi pesanan hampers 1.000 box Telkom Indonesia.',
    legalitas_usaha: 'NIB, PIRT No. 210321501099-26, Halal MUI, Hak Merek (HKI)',
    kesediaan_memenuhi_pesanan_besar: 'Ya',
    persyaratan_kemampuan_khusus: 'Sertifikasi Roaster Teruji, Laboratorium Cupping Mandiri',

    // Section 4: Preferensi Kemitraan
    jenis_peluang_diminati: 'Pasokan B2B, Pengadaan Korporat, Reseller Grosir',
    wilayah_peluang_diinginkan: 'Jawa Barat, DKI Jakarta, Banten',
    minimal_pesanan: '50 Pouch / 10kg',
    maksimal_pesanan: '2.000 Pouch / 500kg',
    deskripsi_kerjasama: 'Kerjasama pasokan berkala jangka panjang 6-12 bulan dengan penetapan harga grosir khusus.',

    // Section 5: Katalog Produk / Jasa
    products: [
      {
        id: 'prod_001',
        nama_produk: 'Kopi Arabika Specialty Karawang 250g',
        kategori: 'Biji & Bubuk Kopi',
        harga: 65000,
        kapasitas: '300 kg / bulan',
        satuan_penjualan: 'pouch',
        area_layanan: 'Nasional',
      },
      {
        id: 'prod_002',
        nama_produk: 'Kopi Robusta Blend Karawang 250g',
        kategori: 'Biji & Bubuk Kopi',
        harga: 45000,
        kapasitas: '500 kg / bulan',
        satuan_penjualan: 'pouch',
        area_layanan: 'Nasional',
      },
      {
        id: 'prod_003',
        nama_produk: 'Cold Brew Bottled Signature 250ml',
        kategori: 'Minuman Siap Minum',
        harga: 25000,
        kapasitas: '400 botol / bulan',
        satuan_penjualan: 'botol',
        area_layanan: 'Jabodetabek & Karawang',
      },
      {
        id: 'prod_004',
        nama_produk: 'Drip Bag Coffee Box (Isi 5 Sachet)',
        kategori: 'Kopi Praktis',
        harga: 35000,
        kapasitas: '250 box / bulan',
        satuan_penjualan: 'box',
        area_layanan: 'Nasional',
      },
    ],

    // Legacy fields for backward compatibility
    target_market: 'Cafe, Hotel, Retail Suvenir, dan Korporat',
    business_goal_context: 'Meningkatkan penjualan B2B grosir dan memperluas distribusi cafe.',
    sales_channels: ['Offline Store', 'E-Commerce', 'Cafe Wholesale', 'Social Media'],
    b2b_experience: 'Memasok 15 cafe lokal di Karawang & Bandung.',
    capacity_description: '600 kg / bulan',
    digital_maturity: 'Medium',
  } as MockBusinessProfile,

  business_goals: [
    { goal_id: 'G001', business_id: 'UMKM001', goal_type: 'Perluasan Pasar B2B', priority: 'HIGH', target_period: 'Q3-Q4 2026' },
  ],

  business_capabilities: [
    { capability_id: 'CAP001', business_id: 'UMKM001', capability_type: 'Kapasitas Roasting', description: 'Mesin roasting otomatis 10kg/batch', capacity_value: 600, unit: 'kg/bulan' },
  ],

  products: [
    {
      product_id: 'PROD001',
      business_id: 'UMKM001',
      product_name: 'Kopi Arabika Specialty Karawang 250g',
      category: 'Biji & Bubuk Kopi',
      description: 'Biji kopi Arabika kualitas premium.',
      price: 65000,
      unit: 'pouch',
      capacity: 300,
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
      ],
    },
  ] as MockTransaction[],

  opportunities: [
    {
      opportunity_id: 'opp_001',
      ranking: 1,
      title: 'Pengadaan Bingkisan Kopi & Suvenir UMKM Pemkab Karawang',
      organization_name: 'Dinas Koperasi & UMKM Kabupaten Karawang',
      location: 'Kabupaten Karawang',
      category: 'F&B / Pengadaan',
      match_score: 0.95,
      match_reasons: [
        'Kategori produk kopi specialty sesuai',
        'Lokasi Kabupaten Karawang tepat sasaran',
        'Legalitas NIB & Halal terverifikasi',
        'Kapasitas produksi 600kg/bln mencukupi'
      ],
      quantity_unit: '500 Box Suvenir',
      periode: '1 Oktober - 15 November 2026',
      status: 'Aktif',
      source_url: 'https://diskopukm.karawangkab.go.id/peluang-pengadaan-2026',
      description: 'Pengadaan paket suvenir kopi lokal Karawang untuk perayaan HUT Karawang dan event kunjungan kerja dinas.',
      requirement: 'Legalitas NIB & Halal terverifikasi, kemasan kotak eksklusif berlogo instansi.',
    },
    {
      opportunity_id: 'opp_002',
      ranking: 2,
      title: 'Pasokan Biji Kopi Roasting untuk Jaringan Cafe Bandung',
      organization_name: 'Kolektif Cafe Bandung Raya',
      location: 'Kota Bandung',
      category: 'F&B / Supply Agreement',
      match_score: 0.89,
      match_reasons: [
        'Produk roasted bean siap pasokan B2B',
        'Pengalaman pasokan cafe terbukti',
        'Wilayah kemitraan Jawa Barat'
      ],
      quantity_unit: '250 kg / bulan',
      periode: 'November 2026 - April 2027 (6 Bulan)',
      status: 'Aktif',
      source_url: 'https://bandungcafenetwork.com/supply-partner-2026',
      description: 'Kemitraan pasokan biji kopi Arabika & Robusta roasted bean tingkat Medium-to-Dark untuk 8 outlet cafe.',
      requirement: 'Sampel tes uji rasa (cupping score >80), konsistensi pasokan bulanan.',
    },
    {
      opportunity_id: 'opp_003',
      ranking: 3,
      title: 'Display Ritel Produk Suvenir Kopi Rest Area Tol Cipularang',
      organization_name: 'Pengelola Rest Area KM 88 Purbaleunyi',
      location: 'Kabupaten Purwakarta',
      category: 'Retail / Etalase Suvenir',
      match_score: 0.82,
      match_reasons: [
        'Katalog produk Drip Bag & Cold Brew sesuai standar ritel',
        'Kemasan produk berizin P-IRT'
      ],
      quantity_unit: '150 Box / bulan',
      periode: '1 Oktober 2026 - 31 Maret 2027',
      status: 'Aktif',
      source_url: 'https://jasamarga.co.id/pojok-umkm-restarea',
      description: 'Fasilitas etalase ritel untuk produk olahan kopi praktis (Drip bag & Cold Brew) di pojok UMKM Jabar.',
      requirement: 'Daya simpan produk >6 bulan, kemasan eye-catching dan tahan banting.',
    },
    {
      opportunity_id: 'opp_004',
      ranking: 4,
      title: 'Program Kurasi Ekspor Fashion & Batik Tulis Jawa Barat',
      organization_name: 'Dinas Perindustrian & Perdagangan Jabar',
      location: 'Kota Cirebon',
      category: 'Fesyen & Kriya',
      match_score: 0.88,
      match_reasons: [
        'Pengalaman pembuatan busana etnik tradisional',
        'Sertifikasi HKI Terdaftar'
      ],
      quantity_unit: '300 Pcs Kain Batik',
      periode: 'Oktober 2026 - Februari 2027',
      status: 'Terbuka',
      source_url: 'https://disindag.jabarprov.go.id/kurasi-ekspor-batik',
      description: 'Fasilitasi kurasi produk fashion batik dan kriya Nusantara untuk pasar ekspor ke Jepang & Singapura.',
      requirement: 'Penggunaan pewarna ramah lingkungan (eco-dye), kapasitas minimal 100 kain/bulan.',
    },
    {
      opportunity_id: 'opp_005',
      ranking: 5,
      title: 'Kemitraan Pasokan Snack & Keripik Pedas Minimarket Berjejaring',
      organization_name: 'PT Retail Pasundan Modern',
      location: 'Kota Bekasi',
      category: 'F&B / Supply Agreement',
      match_score: 0.86,
      match_reasons: [
        'Sertifikat Halal & P-IRT Lengkap',
        'Daya simpan produk >12 bulan'
      ],
      quantity_unit: '2.000 Pouch / bulan',
      periode: '1 November 2026 - 31 Oktober 2027',
      status: 'Aktif',
      source_url: 'https://pasundanretail.co.id/vendor-snack',
      description: 'Penempatan produk camilan keripik pedas olahan lokal pada 120 jaringan minimarket di Jabodetabek.',
      requirement: 'Kemasan foil zipper kedap udara, izin edar P-IRT dan Halal MUI terverifikasi.',
    },
    {
      opportunity_id: 'opp_006',
      ranking: 6,
      title: 'Pasokan Teh Hijau & Herbal Organik Hotel Bintang 5 Bogor',
      organization_name: 'Puncak Resort & Convention Hotel',
      location: 'Kabupaten Bogor',
      category: 'F&B / Pengadaan',
      match_score: 0.84,
      match_reasons: [
        'Bahan baku organik terverifikasi',
        'Kemasan pouch artisan premium'
      ],
      quantity_unit: '400 Pouch Artisan',
      periode: 'Desember 2026 - Mei 2027',
      status: 'Terbuka',
      source_url: 'https://puncakresorthotel.com/vendor-tea',
      description: 'Pengadaan teh hijau dan olahan herbal organik petik pucuk untuk welcome drink guest hotel.',
      requirement: 'Sertifikasi Organik Indonesia (INOFICE) dan standar higienis F&B hotel.',
    },
    {
      opportunity_id: 'opp_007',
      ranking: 7,
      title: 'Etalase Produk Kriya & Anyaman Pandan Festival Sukabumi',
      organization_name: 'Pemerintah Kota Sukabumi',
      location: 'Kota Sukabumi',
      category: 'Fesyen & Kriya',
      match_score: 0.81,
      match_reasons: [
        'Kriya ramah lingkungan (zero-waste)',
        'Kemitraan komunitas pengrajin'
      ],
      quantity_unit: '500 Pcs Craft',
      periode: '15 November - 20 Desember 2026',
      status: 'Proses Seleksi',
      source_url: 'https://sukabumikab.go.id/event-kriya-2026',
      description: 'Penyediaan booth etalase dan souvenir anyaman pandan alami untuk tamu mancanegara.',
      requirement: 'Produk buatan tangan asli, finishing bebas bahan kimia beracun.',
    },
    {
      opportunity_id: 'opp_008',
      ranking: 8,
      title: 'Pengadaan Goodie Bag & Souvenir Seminar Nasional ITB',
      organization_name: 'Koperasi Sivitas Akademika ITB',
      location: 'Kota Bandung',
      category: 'Retail / Etalase Suvenir',
      match_score: 0.85,
      match_reasons: [
        'Desain produk inovatif & ramah lingkungan',
        'Lokasi Bandung sangat dekat'
      ],
      quantity_unit: '800 Pack Souvenir',
      periode: '10 November - 25 November 2026',
      status: 'Aktif',
      source_url: 'https://koperasi.itb.ac.id/pengadaan-goodiebag',
      description: 'Pengadaan souvenir unik olahan lokal (drip coffee, mug kriya, notebook ramah lingkungan).',
      requirement: 'Selesai pengerjaan maksimal 14 hari sebelum hari pelaksanaan acara.',
    },
    {
      opportunity_id: 'opp_009',
      ranking: 9,
      title: 'Supply Olahan Hasil Laut & Kerupuk Ikan Ekspor ASEAN',
      organization_name: 'PT Bahari Pasundan Export',
      location: 'Kabupaten Indramayu',
      category: 'F&B / Supply Agreement',
      match_score: 0.83,
      match_reasons: [
        'Uji laboratorium BPOM lolos',
        'Kapasitas produksi besar'
      ],
      quantity_unit: '5 Ton / bulan',
      periode: '1 Januari 2027 - 31 Desember 2027',
      status: 'Terbuka',
      source_url: 'https://baharipasundan.co.id/supplier-seafood',
      description: 'Kemitraan pasokan bahan olahan laut dan kerupuk ikan kualitas ekspor tujuan Malaysia dan Thailand.',
      requirement: 'Standar HACCP dan BPOM MD, kadar air <3%.',
    },
    {
      opportunity_id: 'opp_010',
      ranking: 10,
      title: 'Program Pendampingan Sertifikasi Halal Gratis (SEHATI) Jabar',
      organization_name: 'BPJPH & Satgas Halal Jawa Barat',
      location: 'Kota Bandung',
      category: 'Jasa & Teknologi',
      match_score: 0.90,
      match_reasons: [
        'UMKM F&B belum bersertifikat Halal resmi',
        'Memenuhi syarat Self-Declare'
      ],
      quantity_unit: '1.000 Kuota UMKM',
      periode: 'Oktober 2026 - Desember 2026',
      status: 'Aktif',
      source_url: 'https://halal.jabarprov.go.id/sehati-2026',
      description: 'Program pendampingan proses produk halal (PPH) gratis tanpa biaya untuk UMKM makanan minuman.',
      requirement: 'Memiliki NIB berbasis risiko dan produk bebas bahan haram/syubhat.',
    }
  ] as MockOpportunity[],

  knowledge_documents: [
    {
      document_id: 'KNOW-001',
      business_id: 'UMKM001',
      document_type: 'Catalog & Pricing',
      title: 'Katalog Produk & Daftar Harga Resmi Kopi Karawang',
      content: 'Daftar Produk Resmi Kopi Karawang Update 2026',
      source: 'Internal Document',
      version: '2.1',
      created_at: '2026-01-10T00:00:00Z',
    },
  ] as MockKnowledgeDocument[],

  assistant_history: [
    {
      role: 'assistant',
      content: 'Halo! Saya AI Business Growth Assistant untuk Kopi Karawang.',
      timestamp: new Date().toISOString(),
    },
  ] as MockAssistantMessage[],
};
