export interface UMKMHubItem {
  id: string;
  code: string;
  title: string;
  team: string;
  company: string;
  sektor: string;
  rating: number; // e.g. 4.9, 5.0, 4.8
  reviewCount: number; // e.g. 128
  totalRevenue: string; // e.g. 'Rp 480 Juta / thn'
  monthlyRevenue: string; // e.g. 'Rp 40 Juta / bln'
  monthlyOrders: string; // e.g. '1.500+ Order'
  growthRate: string; // e.g. '+28% YoY'
  omsetRange: '< 100 Juta' | '100 - 500 Juta' | '500 Juta - 1 Miliar' | '> 1 Miliar';
  kategori: 'Profesional' | 'General' | 'Student & Innovation' | 'Koperasi & Komunitas' | 'Binaan Utama';
  kota: string;
  provinsi: string;
  short_description: string;
  tags: string[];
  avatar: string;
  full_detail: {
    snapshot: string;
    financial_highlights: string;
    competitive_advantages: string;
    value_proposition: string;
    target_market: string;
    innovation_readiness: string;
    hki_status: string;
    proposal_url?: string;
  };
}

export const UMKM_HUB_DATA: UMKMHubItem[] = [
  {
    id: 'kopi-karawang',
    code: 'UMKM-001',
    title: 'Kopi Karawang Heritage',
    team: 'Tim Kopi Sanggabuana',
    company: 'PT Kopi Karawang Nusantara',
    sektor: 'Kuliner & Perkebunan',
    rating: 4.9,
    reviewCount: 142,
    totalRevenue: 'Rp 650 Juta / thn',
    monthlyRevenue: 'Rp 54 Juta / bln',
    monthlyOrders: '2.400+ Kemasan',
    growthRate: '+32% YoY',
    omsetRange: '500 Juta - 1 Miliar',
    kategori: 'Binaan Utama',
    kota: 'Karawang',
    provinsi: 'Jawa Barat',
    short_description: 'Produsen & Roastery Kopi Robusta Karawang tersertifikasi Halal & SNI, siap kurasi pasar ekspor Asia Tenggara & Timur Tengah.',
    tags: ['Kopi Robusta', 'Halal Indonesia', 'Kurasi Ekspor', 'Horeka Supplier'],
    avatar: 'KK',
    full_detail: {
      snapshot: 'Kopi Karawang Heritage mengintegrasikan petani kopi binaan di Pegunungan Sanggabuana Karawang dengan fasilitas modern roasting bernilai tambah tinggi.',
      financial_highlights: 'Pertumbuhan omset positif 32% per tahun dengan margin bersih 28%. Telah menyuplai 120+ kedai kopi di Jabodetabek dengan kontrak pasokan rutin.',
      competitive_advantages: 'Memiliki sertifikasi Kurasi Ekspor Jabar, NIB terverifikasi, dan kemitraan pasokan langsung dengan 120+ kafe & hotel di Jabodetabek.',
      value_proposition: 'Cita rasa kopi Robusta khas Karawang dengan aroma rempah alami, kadar keasaman seimbang & konsistensi roasting profiil.',
      target_market: 'Kedai kopi specialty, jaringan Horeka (Hotel/Restoran/Cafe), dan eksportir komoditas pangan.',
      innovation_readiness: 'Kapasitas produksi mencapai 15 ton roasted bean/bulan dengan standar higienis kemasan kedap udara.',
      hki_status: 'Sertifikat Indikasi Geografis & Merek Dagang Resmi Kemenkumham RI.',
    },
  },
  {
    id: 'keripik-bandung',
    code: 'UMKM-002',
    title: 'Keripik Pedas Juara Bandung',
    team: 'Tim Mang Oded',
    company: 'CV Juara Snack Pasundan',
    sektor: 'Makanan Ringan',
    rating: 4.8,
    reviewCount: 98,
    totalRevenue: 'Rp 420 Juta / thn',
    monthlyRevenue: 'Rp 35 Juta / bln',
    monthlyOrders: '5.000+ Pouch',
    growthRate: '+24% YoY',
    omsetRange: '100 - 500 Juta',
    kategori: 'Profesional',
    kota: 'Bandung',
    provinsi: 'Jawa Barat',
    short_description: 'Pelopor olahan keripik singkong pedas rempah alami khas Bandung dengan sistem kemasan alumunium foil zipper pouch kedap udara.',
    tags: ['Snack Bandung', 'Oleh-Oleh Jabar', 'Halal MUI', 'Modern Packaging'],
    avatar: 'KP',
    full_detail: {
      snapshot: 'Mengolah singkong mentega lokal menjadi keripik renyah rasa pedas bertingkat (level 1-10) dengan racikan cabai kering asli tanpa pengawet sintesis.',
      financial_highlights: 'Arus kas sehat dengan perputaran modal 14 hari. Penjualan ritel online menyumbang 40% dari total omset tahunan.',
      competitive_advantages: 'Tingkat minyak di bawah 2% berkat teknologi vacuum frying dan spinner industri, bertahan renyah hingga 12 bulan.',
      value_proposition: 'Rasa pedas rempah gurih khas Pasundan yang otentik dan kemasan menarik berstandar retail modern.',
      target_market: 'Pusat oleh-oleh Jawa Barat, minimarket berjejaring, dan pasar ekspor komoditas makanan ringan di Malaysia & Singapura.',
      innovation_readiness: 'Sudah mengantongi P-IRT, Sertifikat Halal MUI, dan memenuhi standar BPOM MD.',
      hki_status: 'Hak Merek Dagang & Desain Kemasan Terdaftar.',
    },
  },
  {
    id: 'batik-cirebon',
    code: 'UMKM-003',
    title: 'Batik Trusmi Mahakarya',
    team: 'Sanggar Trusmi',
    company: 'PT Batik Trusmi Cirebon',
    sektor: 'Fesyen & Kriya',
    rating: 5.0,
    reviewCount: 215,
    totalRevenue: 'Rp 1.2 Miliar / thn',
    monthlyRevenue: 'Rp 100 Juta / bln',
    monthlyOrders: '450+ Kain Halus',
    growthRate: '+18% YoY',
    omsetRange: '> 1 Miliar',
    kategori: 'Profesional',
    kota: 'Cirebon',
    provinsi: 'Jawa Barat',
    short_description: 'Kerajinan Batik Tulis & Cap bermotif Mega Mendung otentik Cirebon dengan pewarnaan alami ramah lingkungan.',
    tags: ['Batik Mega Mendung', 'Eco-Dyeing', 'Heritage Jabar', 'Fashion Ekspor'],
    avatar: 'BT',
    full_detail: {
      snapshot: 'Menjaga warisan budaya Batik Cirebon dengan sentuhan pewarna alami dari kulit kayu mahoni dan daun nila untuk busana modern pria & wanita.',
      financial_highlights: 'Omset stabil di atas Rp 1 Miliar/tahun dengan rata-rata nilai transaksi (AOV) Rp 2,5 Juta per pelanggan B2B/dinas.',
      competitive_advantages: 'Menggunakan 100% pewarna alami non-kimia yang aman bagi kulit sensitif dan ramah lingkungan.',
      value_proposition: 'Setiap lembar batik memiliki cerita kebudayaan Cirebon dengan sertifikat keaslian batik tulis tangan.',
      target_market: 'Kolektor kain tradisional, dinas/instansi pemerintah, dan pecinta fesyen etnik mancanegara.',
      innovation_readiness: 'Produksi teratur 500 kain tulis halus per bulan dengan jangkauan pengiriman ke 15 negara.',
      hki_status: 'Sertifikat Batikmark Indonesia & Hak Cipta Motif Tradisional.',
    },
  },
  {
    id: 'sepatu-cibaduyut',
    code: 'UMKM-004',
    title: 'Cibaduyut Leathercraft',
    team: 'Pengrajin Cibaduyut',
    company: 'Koperasi Sepatu Kulit Bandung',
    sektor: 'Kerajinan Kulit & Fesyen',
    rating: 4.9,
    reviewCount: 176,
    totalRevenue: 'Rp 890 Juta / thn',
    monthlyRevenue: 'Rp 74 Juta / bln',
    monthlyOrders: '1.200+ Pasang',
    growthRate: '+25% YoY',
    omsetRange: '500 Juta - 1 Miliar',
    kategori: 'Koperasi & Komunitas',
    kota: 'Bandung',
    provinsi: 'Jawa Barat',
    short_description: 'Sentra produsen sepatu & alas kaki berbahan kulit sapi asli garutan dengan konstruksi Goodyear Welted tahan puluhan tahun.',
    tags: ['Sepatu Kulit', 'Goodyear Welt', 'Cibaduyut Craft', 'B2B Custom'],
    avatar: 'CL',
    full_detail: {
      snapshot: 'Konsorsium pengrajin sepatu Cibaduyut Bandung yang memproduksi sepatu formal, boots, dan sneakers kulit asli kualitas handmade tinggi.',
      financial_highlights: 'Volume pemesanan B2B instansi & seragam korporat menyumbang 65% pendapatan tahunan.',
      competitive_advantages: 'Jahitan Goodyear Welted yang dapat diganti solnya berkali-kali tanpa merusak bagian atas kulit (leather upper).',
      value_proposition: 'Sepatu kulit mewah elegan dengan harga pengrajin langsung dan layanan custom ukuran.',
      target_market: 'Eksekutif muda, komunitas penggemar boots kulit, dan pemesanan seragam dinas instansi.',
      innovation_readiness: 'Kapasitas 2.500 pasang sepatu per bulan dengan jaminan garansi sol 1 tahun.',
      hki_status: 'Hak Cipta Kontruksi Sepatu Leathercraft & Merek Koperasi.',
    },
  },
  {
    id: 'teh-pangalengan',
    code: 'UMKM-005',
    title: 'Teh Hijau Pangalengan Organik',
    team: 'Petani Teh Malabar',
    company: 'CV Teh Priangan Sejahtera',
    sektor: 'Minuman Organik',
    rating: 4.8,
    reviewCount: 84,
    totalRevenue: 'Rp 310 Juta / thn',
    monthlyRevenue: 'Rp 26 Juta / bln',
    monthlyOrders: '800+ Box Artisan',
    growthRate: '+30% YoY',
    omsetRange: '100 - 500 Juta',
    kategori: 'General',
    kota: 'Bandung',
    provinsi: 'Jawa Barat',
    short_description: 'Produsen artisan green tea & white tea petik pucuk pertama dari dataran tinggi Pangalengan dengan aroma alami kaya antioksidan.',
    tags: ['Teh Hijau Jabar', 'Organik Indonesia', 'Artisan Tea', 'Wellness Food'],
    avatar: 'TH',
    full_detail: {
      snapshot: 'Teh pilihan yang dipetik langsung dari kebun teh ketinggian 1.500 mdpl di Pangalengan Jawa Barat, diolah tanpa pestisida sintesis.',
      financial_highlights: 'Margin keuntungan kotor 45% dengan model pasokan berulang (recurring order) dari 40+ jaringan kafe & spa.',
      competitive_advantages: 'Kandungan antioksidan katekin tinggi dengan proses sangrai kayu manis tradisional khas pegunungan.',
      value_proposition: 'Teh artisan kualitas ekspor dengan cita rasa manis alami setelah diseduh (aftertaste manis).',
      target_market: 'Hotel bintang lima, kafe spa wellness, serta toko bahan organik nasional & internasional.',
      innovation_readiness: 'Sertifikasi Organik Indonesia (INOFICE) dan Izin Edar P-IRT.',
      hki_status: 'Merek Dagang & Sertifikat Uji Laboratorium Nutrisi Pangan.',
    },
  },
  {
    id: 'anyaman-rajapolah',
    code: 'UMKM-006',
    title: 'Anyaman Pandan Rajapolah',
    team: 'Sanggar Rajapolah',
    company: 'UD Rajapolah Handicraft',
    sektor: 'Kerajinan Anyaman & Decor',
    rating: 4.9,
    reviewCount: 110,
    totalRevenue: 'Rp 280 Juta / thn',
    monthlyRevenue: 'Rp 23 Juta / bln',
    monthlyOrders: '1.800+ Pcs Home Decor',
    growthRate: '+20% YoY',
    omsetRange: '100 - 500 Juta',
    kategori: 'Koperasi & Komunitas',
    kota: 'Tasikmalaya',
    provinsi: 'Jawa Barat',
    short_description: 'Kerajinan anyaman tanaman pandan & mendong khas Tasikmalaya untuk tas, tas belanja, dan dekorasi rumah bernilai estetika tinggi.',
    tags: ['Anyaman Mendong', 'Eco-Home Decor', 'Handicraft Jabar', 'Zero Waste'],
    avatar: 'AP',
    full_detail: {
      snapshot: 'Memberdayakan ratusan pengrajin wanita di Rajapolah Tasikmalaya dalam mengolah serat alam mendong & pandan menjadi perlengkapan rumah tangga ramah lingkungan.',
      financial_highlights: 'Efisiensi biaya produksi dengan penggunaan bahan baku lokal terbarukan. Permintaan ekspor meningkat 20% saban tahun.',
      competitive_advantages: 'Teknologi perlakuan alami anti-jamur membuat produk tahan di iklim lembab tanpa bau.',
      value_proposition: 'Produk kerajinan tangan bernilai seni tinggi yang menggantikan kantong plastik sekali pakai.',
      target_market: 'Pecinta dekorasi rumah ramah lingkungan, ekspor ke Eropa & Jepang.',
      innovation_readiness: 'Kapasitas ekspor 1 kontainer 20ft per dua bulan.',
      hki_status: 'Sertifikat Ekraf Tasikmalaya & Merek Dagang.',
    },
  },
];
