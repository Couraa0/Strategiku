import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Check,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ShieldCheck,
  Compass,
  LayoutDashboard,
  LogOut,
  Activity,
  Target,
  CheckCircle2,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  MapPin,
  Phone,
  Heart,
  Sparkles,
  Bot,
  ArrowUpRight,
  Menu,
  X,
  Award,
  BarChart3,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LandingPage: React.FC = () => {
  const { user, business, isAuthenticated, login, logout } = useAuth();
  const navigate = useNavigate();

  // Interactive States
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(45000000);
  const [activeRegion, setActiveRegion] = useState<string>('Karawang');
  const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);
  const [activeEngineTab, setActiveEngineTab] = useState<number>(0);
  const [quickBusinessInput, setQuickBusinessInput] = useState<string>('');

  // Interactive RAG AI Chat Simulator State
  const [aiInputText, setAiInputText] = useState<string>('');
  const [aiMessages, setAiMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: 'Halo! Saya AI Growth Assistant Strategiku. Berdasarkan data Kopi Karawang Heritage Anda, terdapat peluang peningkatan margin 24% dengan memanfaatkan promo bundling sore hari dan pendaftaran Subsidi Sertifikasi Halal SEHATI Jabar. Ada yang ingin Anda tanyakan?',
    },
  ]);
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);

  const sampleAiPrompts = [
    'Bagaimana cara mendaftar Subsidi Sertifikasi Halal SEHATI Jabar?',
    'Strategi tingkatkan profit margin Kopi Karawang 15% bulan ini?',
    'Apa saja syarat bantuan modal Kredit Mesra Bank bjb?',
  ];

  const handleSendAiPrompt = (promptText: string) => {
    if (!promptText.trim()) return;

    setAiMessages((prev) => [...prev, { sender: 'user', text: promptText }]);
    setAiInputText('');
    setIsAiThinking(true);

    setTimeout(() => {
      let aiReply = '';
      if (promptText.includes('Halal') || promptText.includes('SEHATI')) {
        aiReply = 'Berdasarkan profil usaha Anda (Sektor Minuman di Karawang), Anda 94% memenuhi syarat Sertifikasi Halal SEHATI. Langkah utamanya: (1) NIB Berbasis Risiko Rendah, (2) Bahan baku terbukti bebas non-halal, (3) Ajukan via portal SIHALAL BPJPH. Strategiku telah menyiapkan ringkasan berkas siap unduh di menu Opportunity Matcher!';
      } else if (promptText.includes('margin') || promptText.includes('profit')) {
        aiReply = 'Analisis BI Engine menemukan menu "Es Kopi Susu Gula Aren" memiliki margin tertinggi (68%). Kami merekomendasikan: buat paket bundling dengan pastry di rentang jam 15:00-18:00 WIB untuk menaikkan rata-rata nilai transaksi harian sebesar Rp 35.000.';
      } else {
        aiReply = 'Program Kredit Mesra (Masyarakat Sejahtera) Bank bjb menawarkan pinjaman tanpa bunga dan tanpa agunan hingga Rp 5 Juta per anggota kelompok UMKM Jabar. Persyaratan utama adalah NIB terverifikasi dan surat keterangan usaha binaan daerah.';
      }

      setAiMessages((prev) => [...prev, { sender: 'ai', text: aiReply }]);
      setIsAiThinking(false);
    }, 850);
  };

  const handleDemoLogin = async () => {
    await login('demo@aphyah.id', 'Demo123!');
    navigate('/dashboard');
  };

  const handleQuickStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickBusinessInput.trim()) {
      navigate(`/register?name=${encodeURIComponent(quickBusinessInput.trim())}`);
    } else {
      navigate('/register');
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  // Calculator Logic
  const estGrowthRate = monthlyRevenue > 50000000 ? 0.28 : 0.18;
  const estRevenueGain = Math.round(monthlyRevenue * estGrowthRate);
  const estTotalRevenue = monthlyRevenue + estRevenueGain;
  const matchedProgramsCount = monthlyRevenue > 30000000 ? 5 : 3;

  // Regional Data Mapping
  const regionsData: Record<string, { sector: string; contact: string; programs: string[]; badge: string; stats: string }> = {
    Karawang: {
      sector: 'Agro-industri, Pengolahan Kopi Specialty, Rantai Pasok Manufaktur',
      contact: 'Dinas Koperasi & UKM Kab. Karawang (0267-402123)',
      programs: ['Subsidi Sertifikasi Halal SEHATI', 'Fasilitasi Standarisasi BPOM', 'Kemitraan Rest Area Interchange Tol'],
      badge: 'Karawang Growth Hub',
      stats: '1,420 UMKM Aktif • Rp 18.4M Omset Terdaftar',
    },
    Bandung: {
      sector: 'Kuliner Kreatif, Fashion & Craft, Digital Studio & Agency',
      contact: 'Dinas Koperasi & UKM Kota Bandung (022-7201234)',
      programs: ['Bandung Creative Hub Export Match', 'Kurasi Fashion Jabar', 'Subsidized E-Commerce Onboarding'],
      badge: 'Bandung Creative Hub',
      stats: '3,850 UMKM Aktif • Rp 42.1M Omset Terdaftar',
    },
    Bogor: {
      sector: 'Agrobisnis Tanaman Hias, Olahan Buah Segar, Kerajinan Kayu',
      contact: 'Dinas Perdagangan & Perindustrian Kab. Bogor (0251-8321456)',
      programs: ['Fasilitasi Uji Nutrisi PIRT', 'Bantuan Sertifikasi TKDN', 'Pasar Tani Digital Bogor'],
      badge: 'Bogor Agro Center',
      stats: '2,110 UMKM Aktif • Rp 26.8M Omset Terdaftar',
    },
    Cirebon: {
      sector: 'Batik Trusmi Tradisional, Olahan Hasil Laut, Kerajinan Kerang',
      contact: 'Dinas Koperasi & UKM Kab. Cirebon (0231-321789)',
      programs: ['Kurasi Ekspor Pasar ASEAN', 'Bantuan Kemasan Higienis', 'Kredit Mesra Bank bjb'],
      badge: 'Cirebon Maritime & Craft',
      stats: '1,890 UMKM Aktif • Rp 21.5M Omset Terdaftar',
    },
    Bekasi: {
      sector: 'Kuliner Siap Saji, Manufaktur Komponen Ringan, Jasa Logistik',
      contact: 'Dinas UMKM Kota Bekasi (021-8895123)',
      programs: ['Kemitraan Retail Modern Jabar', 'Fasilitasi NIB Risiko Menengah', 'Kredit BPR Jabar Sejahtera'],
      badge: 'Bekasi Logistics Hub',
      stats: '2,940 UMKM Aktif • Rp 34.2M Omset Terdaftar',
    },
    Purwakarta: {
      sector: 'Kuliner Sate Maranggi, Keramik Sayang Heulang, Olahan Pangan Lokal',
      contact: 'Dinas KUKMP Kab. Purwakarta (0264-201234)',
      programs: ['Kurasi Festival Kuliner Nusantara', 'Fasilitasi Hak Kekayaan Intelektual (HKI)', 'Pelatihan Digital Marketing'],
      badge: 'Purwakarta Heritage Hub',
      stats: '1,120 UMKM Aktif • Rp 14.6M Omset Terdaftar',
    },
  };

  const faqs = [
    {
      q: 'Apa itu Strategiku dan mengapa berbeda dari kasir POS biasa?',
      a: 'Strategiku bukan sekadar aplikasi kasir pencatat transaksi. Strategiku adalah Integrated UMKM Business Growth Intelligence Platform khusus Jawa Barat yang mengolah data transaksi CSV harian Anda menjadi analitik kesehatan keuangan, mencocokkan profil usaha secara otomatis dengan program bantuan & kurasi resmi Pemprov Jabar (ekspor, halal, kredit), serta didampingi asisten AI RAG 24/7.',
    },
    {
      q: 'Apakah saya harus mengganti aplikasi kasir atau POS yang sedang digunakan?',
      a: 'Sama sekali tidak! Anda tetap dapat memakai sistem kasir mana pun (Moka, Pawoon, Majoo, Kasir Pintar, maupun rekapan Excel manual). Cukup ekspor laporan CSV transaksi penjualan harian Anda, lalu upload ke menu Data Usaha Strategiku. Engine BI akan memproses dan memvalidasinya secara instan.',
    },
    {
      q: 'Apa saja 3 Intelligence Engines utama di Strategiku?',
      a: 'Tiga engine utama Strategiku adalah: (1) Business Intelligence Engine untuk analisis omset, profit margin, dan 6 indikator kesehatan bisnis; (2) Opportunity Matcher Engine untuk pencocokan program bantuan Pemprov Jabar berbasis skor % kecocokan; dan (3) RAG AI Growth Assistant untuk konsultasi bisnis berbasis data nyata & regulasi lokal.',
    },
    {
      q: 'Bagaimana Strategiku menjamin keamanan & kerahasiaan data transaksi?',
      a: 'Seluruh data transaksi dan profil bisnis Anda dilindungi dengan standar keamanan enterprise menggunakan enkripsi end-to-end 256-bit serta Row Level Security (RLS). Data Anda adalah 100% milik Anda dan tidak pernah diperjualbelikan kepada pihak ketiga mana pun.',
    },
    {
      q: 'Bagaimana cara mencoba platform tanpa harus daftar dulu?',
      a: 'Anda dapat langsung mengklik tombol "Coba Live Demo (Kopi Karawang)" di bagian atas halaman ini. Anda akan langsung masuk ke dashboard interaktif lengkap dengan contoh data riil usaha Kopi Karawang Heritage tanpa perlu mengisi form pendaftaran.',
    },
    {
      q: 'Apakah platform ini mencakup seluruh 27 Kabupaten & Kota di Jawa Barat?',
      a: 'Ya, Strategiku dirancang khusus untuk ekosistem Jawa Barat, mencakup seluruh 27 Kabupaten dan Kota (Karawang, Bandung, Bogor, Bekasi, Cirebon, Purwakarta, Sukabumi, dsb) lengkap dengan integrasi program binaan Dinas Koperasi & UKM setempat.',
    },
  ];

  // Official Ecosystem Partner Logos Data
  const ecosystemPartners = [
    {
      id: 'diskukm',
      name: 'Dinas KUKM Jabar',
      fullName: 'Dinas Koperasi dan Usaha Kecil Provinsi Jawa Barat',
      logo: '/images/partners/dinas_kukm_jabar.svg',
    },
    {
      id: 'bjb',
      name: 'Bank bjb',
      fullName: 'Bank bjb (Kredit Mesra & Ekosistem UMKM Jawa Barat)',
      logo: '/images/partners/bank_bjb.svg',
    },
    {
      id: 'halal',
      name: 'BPJPH Halal',
      fullName: 'Badan Penyelenggara Jaminan Produk Halal (SEHATI BPJPH Kemenag RI)',
      logo: '/images/partners/halal_indonesia_bpjph.svg',
    },
    {
      id: 'bch',
      name: 'Bandung Creative Hub',
      fullName: 'Bandung Creative Hub (Disbudpar & Pemkot Bandung)',
      logo: '/images/partners/bandung_creative_hub.svg',
    },
    {
      id: 'disperindag',
      name: 'Disperindag Jabar',
      fullName: 'Dinas Perindustrian dan Perdagangan Provinsi Jawa Barat',
      logo: '/images/partners/disperindag_jabar.svg',
    },
    {
      id: 'kemenkop',
      name: 'Kemenkop UKM RI',
      fullName: 'Kementerian Koperasi dan Usaha Kecil dan Menengah Republik Indonesia',
      logo: '/images/partners/kemenkop_ukm_ri.svg',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFCFF] text-slate-900 font-sans selection:bg-[#007AFF] selection:text-white overflow-x-hidden">
      
      {/* ------------------------------------------------------------- */}
      {/* 1. FLOATING MODERN PILL NAVBAR (Sasflo / Conxera Aesthetic) */}
      {/* ------------------------------------------------------------- */}
      <div className="fixed top-3 sm:top-4 left-0 right-0 z-50 px-3 sm:px-6 flex justify-center pointer-events-none">
        <header className="pointer-events-auto bg-white/85 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-full px-4 sm:px-5 py-2.5 flex items-center justify-between w-full max-w-6xl transition-all duration-300">
          
          {/* Logo & Brand */}
          <div className="flex items-center pr-3 border-r border-slate-200/60">
            <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
              <img src="/logo/Logo+Text+Landscape.png" alt="Strategiku Logo" className="h-7 sm:h-8 w-auto object-contain" />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 p-1 bg-slate-100/70 rounded-full border border-slate-200/50 text-xs font-semibold text-slate-600">
            <a href="#hero" className="px-3.5 py-1.5 rounded-full hover:bg-white hover:text-[#007AFF] hover:shadow-xs transition-all">Home</a>
            <a href="#features" className="px-3.5 py-1.5 rounded-full hover:bg-white hover:text-[#007AFF] hover:shadow-xs transition-all">Fitur Utama</a>
            <a href="#engines" className="px-3.5 py-1.5 rounded-full hover:bg-white hover:text-[#007AFF] hover:shadow-xs transition-all">3 AI Engines</a>
            <a href="#calculator" className="px-3.5 py-1.5 rounded-full hover:bg-white hover:text-[#007AFF] hover:shadow-xs transition-all">Kalkulator Omset</a>
            <a href="#regions" className="px-3.5 py-1.5 rounded-full hover:bg-white hover:text-[#007AFF] hover:shadow-xs transition-all">Jabar Hubs</a>
            <a href="#faq" className="px-3.5 py-1.5 rounded-full hover:bg-white hover:text-[#007AFF] hover:shadow-xs transition-all">FAQ</a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 pl-2">
            <Link
              to="/umkm-hub"
              className="hidden sm:flex px-3.5 py-2 rounded-full bg-slate-100/80 hover:bg-sky-50 text-slate-700 hover:text-[#007AFF] text-xs font-bold transition-all items-center gap-1.5 border border-transparent hover:border-sky-200"
            >
              <Compass className="w-3.5 h-3.5 text-[#007AFF]" />
              <span>UMKM Hub</span>
            </Link>

            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-900 transition-all font-bold text-xs"
                >
                  <div className="w-7 h-7 rounded-full bg-[#007AFF] text-white font-extrabold flex items-center justify-center text-xs shadow-xs">
                    {(user.name || 'U').charAt(0).toUpperCase()}
                  </div>
                  <span className="truncate max-w-[100px] font-bold text-xs">{user.name || business?.name || 'User'}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 mt-3 w-60 bg-white rounded-2xl border border-slate-200 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 overflow-hidden">
                      <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50">
                        <p className="text-xs font-bold text-slate-900 truncate">{user.name || 'Pemilik Usaha'}</p>
                        <p className="text-[11px] text-slate-500 font-medium truncate">{user.email}</p>
                      </div>
                      <div className="p-1.5 space-y-1">
                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            navigate('/dashboard');
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-[#007AFF] rounded-xl transition-all flex items-center gap-2.5"
                        >
                          <LayoutDashboard className="w-4 h-4 text-[#007AFF]" />
                          <span>Dashboard Usaha</span>
                        </button>
                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            logout();
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-all flex items-center gap-2.5"
                        >
                          <LogOut className="w-4 h-4 text-rose-500" />
                          <span>Keluar</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDemoLogin}
                  className="hidden md:flex px-3.5 py-2 rounded-full text-slate-700 hover:text-[#007AFF] hover:bg-slate-100 text-xs font-bold transition-all items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#007AFF]" />
                  <span>Demo</span>
                </button>
                <Link
                  to="/register"
                  className="px-4 sm:px-5 py-2 rounded-full bg-[#007AFF] hover:bg-[#0062D1] text-white text-xs font-bold shadow-md shadow-blue-500/25 active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <span>Mulai Gratis</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="flex lg:hidden p-2 rounded-full text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileNavOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5 text-slate-900" />}
            </button>
          </div>
        </header>

        {/* Mobile Navigation Dropdown Drawer */}
        {mobileNavOpen && (
          <>
            <div
              className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-40 pointer-events-auto lg:hidden"
              onClick={() => setMobileNavOpen(false)}
            />
            <div className="fixed inset-x-4 top-20 z-50 pointer-events-auto bg-white/95 backdrop-blur-2xl border border-white/80 shadow-2xl rounded-3xl p-5 space-y-4 animate-in fade-in slide-in-from-top-3 duration-200 max-w-lg mx-auto lg:hidden">
              <div className="flex flex-col space-y-1 font-bold text-sm text-slate-700">
                <a
                  href="#hero"
                  onClick={() => setMobileNavOpen(false)}
                  className="px-4 py-2.5 rounded-xl hover:bg-sky-50 hover:text-[#007AFF] transition-all flex items-center justify-between"
                >
                  <span>Home</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
                <a
                  href="#features"
                  onClick={() => setMobileNavOpen(false)}
                  className="px-4 py-2.5 rounded-xl hover:bg-sky-50 hover:text-[#007AFF] transition-all flex items-center justify-between"
                >
                  <span>Fitur Utama</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
                <a
                  href="#engines"
                  onClick={() => setMobileNavOpen(false)}
                  className="px-4 py-2.5 rounded-xl hover:bg-sky-50 hover:text-[#007AFF] transition-all flex items-center justify-between"
                >
                  <span>3 AI Engines</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
                <a
                  href="#calculator"
                  onClick={() => setMobileNavOpen(false)}
                  className="px-4 py-2.5 rounded-xl hover:bg-sky-50 hover:text-[#007AFF] transition-all flex items-center justify-between"
                >
                  <span>Kalkulator Omset</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
                <a
                  href="#regions"
                  onClick={() => setMobileNavOpen(false)}
                  className="px-4 py-2.5 rounded-xl hover:bg-sky-50 hover:text-[#007AFF] transition-all flex items-center justify-between"
                >
                  <span>Jabar Regional Hubs</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
                <a
                  href="#faq"
                  onClick={() => setMobileNavOpen(false)}
                  className="px-4 py-2.5 rounded-xl hover:bg-sky-50 hover:text-[#007AFF] transition-all flex items-center justify-between"
                >
                  <span>FAQ & Bantuan</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
                <Link
                  to="/umkm-hub"
                  onClick={() => setMobileNavOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-sky-50 text-[#007AFF] font-bold flex items-center justify-between mt-1"
                >
                  <span className="flex items-center gap-2">
                    <Compass className="w-4 h-4" />
                    <span>Jejaring UMKM Hub</span>
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setMobileNavOpen(false);
                    handleDemoLogin();
                  }}
                  className="w-full py-3 rounded-2xl bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-[#007AFF]" />
                  <span>Coba Live Demo (Kopi Karawang)</span>
                </button>
                <Link
                  to="/register"
                  onClick={() => setMobileNavOpen(false)}
                  className="w-full py-3 rounded-2xl bg-[#007AFF] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/25 active:scale-95"
                >
                  <span>Mulai Sekarang Gratis</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. HERO SECTION (Lively, Modern & Stylish with Flanking Widgets) */}
      {/* ------------------------------------------------------------- */}
      <section id="hero" className="relative pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-[#E2F0FF]/80 via-[#F1F7FF]/90 to-[#FAFCFF]">
        
        {/* Soft Ambient Blur Glows & Dot Pattern */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] bg-dot-pattern opacity-40 pointer-events-none" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-sky-400/25 via-blue-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 -left-32 w-80 sm:w-96 h-80 sm:h-96 bg-sky-300/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -right-32 w-80 sm:w-96 h-80 sm:h-96 bg-indigo-300/25 rounded-full blur-3xl pointer-events-none" />

        {/* HERO MAIN WRAPPER WITH FLANKING CARDS */}
        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* ========================================================= */}
          {/* FLANKING FLOATING CARDS (Filling the Left & Right Empty Spaces) */}
          {/* ========================================================= */}
          
          {/* LEFT FLANKING CARD: Financial BI & AI Alert Widget */}
          <div className="hidden xl:flex flex-col gap-3.5 absolute left-0 2xl:-left-4 top-12 z-20 w-64 text-left pointer-events-none">
            {/* Card A: Real-Time BI Health */}
            <div className="bg-white/95 backdrop-blur-xl p-4 rounded-3xl border border-white/90 shadow-[0_12px_36px_rgba(14,165,233,0.12)] space-y-2.5 transition-all hover:scale-[1.02] pointer-events-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 truncate max-w-[130px]">
                    Kopi Karawang
                  </span>
                </div>
                <span className="text-[9px] font-black bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-100">
                  +8.6% ▲
                </span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Omset Bulan Ini</span>
                <span className="font-display text-xl font-black text-slate-900 tracking-tight">Rp 10.250.000</span>
              </div>

              {/* Sparkline mini bars */}
              <div className="space-y-1 pt-1 border-t border-slate-100">
                <div className="flex justify-between text-[10px] font-bold text-slate-500">
                  <span>Gross Profit</span>
                  <span className="text-[#007AFF] font-black">50.2% (Rp 5.15M)</span>
                </div>
                <div className="h-6 w-full flex items-end justify-between gap-1 pt-0.5">
                  <div className="w-full h-2.5 bg-sky-100 rounded-sm" />
                  <div className="w-full h-3.5 bg-sky-200 rounded-sm" />
                  <div className="w-full h-3 bg-sky-300 rounded-sm" />
                  <div className="w-full h-5 bg-sky-400 rounded-sm" />
                  <div className="w-full h-4.5 bg-blue-500 rounded-sm" />
                  <div className="w-full h-6 bg-[#007AFF] rounded-sm" />
                </div>
              </div>
            </div>

            {/* Card B: AI Margin Recommendation */}
            <div className="bg-gradient-to-br from-sky-50/90 to-blue-50/80 backdrop-blur-xl p-3.5 rounded-2xl border border-sky-100/90 shadow-sm space-y-1.5 text-left pointer-events-auto">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#007AFF]">
                <Bot className="w-3.5 h-3.5" />
                <span>AI Growth Insight</span>
                <span className="ml-auto text-[9px] font-black text-emerald-600">Margin 68%</span>
              </div>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                "Es Kopi Susu Aren margin tertinggi. Buat promo bundling jam 15-18 WIB (+Rp 35K/order)."
              </p>
            </div>
          </div>

          {/* RIGHT FLANKING CARD: Opportunity Matcher & Ecosystem Widget */}
          <div className="hidden xl:flex flex-col gap-3.5 absolute right-0 2xl:-right-4 top-12 z-20 w-64 text-left pointer-events-none">
            {/* Card C: Program Bantuan Jabar Matched */}
            <div className="bg-white/95 backdrop-blur-xl p-4 rounded-3xl border border-white/90 shadow-[0_12px_36px_rgba(14,165,233,0.12)] space-y-2.5 transition-all hover:scale-[1.02] pointer-events-auto">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Peluang Resmi Jabar</span>
                <span className="text-[9px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">94% Cocok</span>
              </div>

              <div className="space-y-0.5">
                <h4 className="text-xs font-black text-slate-900 leading-tight">Subsidi Sertifikasi Halal SEHATI</h4>
                <p className="text-[10px] text-slate-500">BPJPH & Diskop Kab. Karawang</p>
              </div>

              <div className="p-2 bg-emerald-50/80 rounded-xl border border-emerald-100/80 flex items-center gap-1.5 text-[10px] text-emerald-700 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>NIB Risiko Rendah Terverifikasi</span>
              </div>

              <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[10px]">
                <span className="text-slate-500 font-medium">Kredit Mesra bjb</span>
                <span className="font-extrabold text-[#007AFF]">82% Matched</span>
              </div>
            </div>

            {/* Card D: Regional Network Badge */}
            <div className="bg-gradient-to-br from-indigo-50/90 to-sky-50/80 backdrop-blur-xl p-3.5 rounded-2xl border border-indigo-100/90 shadow-sm space-y-1.5 text-left pointer-events-auto">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-indigo-700">
                <Award className="w-3.5 h-3.5" />
                <span>Ekosistem Jawa Barat</span>
              </div>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                Terkoneksi 27 Kabupaten/Kota & 1.420+ profil UMKM terkurasi dengan pendampingan RAG AI 24/7.
              </p>
            </div>
          </div>

          {/* ========================================================= */}
          {/* CENTER HERO CONTENT */}
          {/* ========================================================= */}
          <div className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-7">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 sm:px-4 py-1.5 rounded-full border border-sky-200/90 shadow-[0_2px_12px_rgba(14,165,233,0.1)]">
              <span className="flex h-2 w-2 rounded-full bg-[#007AFF] animate-ping" />
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#007AFF]">
                Platform Pertumbuhan Bisnis Terintegrasi
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-[11px] sm:text-xs font-bold text-slate-700">
                27 Kab & Kota Jawa Barat
              </span>
            </div>

            {/* Main Headline with Highlight Pill (Conxera Reference Style) */}
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12] sm:leading-[1.08]">
              <span className="inline-block bg-[#007AFF] text-white px-3 sm:px-4 py-0.5 sm:py-1 rounded-2xl shadow-lg shadow-blue-500/25 mr-1.5 sm:mr-2 -rotate-1">
                Ubah Transaksi
              </span>
              Menjadi Arah Pertumbuhan Nyata.
            </h1>

            {/* Subtitle */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-xl mx-auto px-2">
              Unggah rekapan penjualan CSV dari kasir apa pun. Strategiku mengolahnya menjadi analitik kesehatan keuangan, mencocokkan peluang kurasi & bantuan resmi Pemprov Jawa Barat, serta mendampingi bisnis Anda via AI 24/7.
            </p>

            {/* Quick-Start Input Form (Sasflo Reference Style!) */}
            <form
              onSubmit={handleQuickStart}
              className="p-1.5 pl-4 sm:pl-5 bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-full shadow-lg shadow-sky-950/5 flex items-center gap-2 max-w-lg mx-auto transition-all focus-within:border-sky-400 focus-within:ring-4 focus-within:ring-sky-500/10"
            >
              <input
                type="text"
                value={quickBusinessInput}
                onChange={(e) => setQuickBusinessInput(e.target.value)}
                placeholder="Nama usaha Anda (cth: Kopi Karawang)..."
                className="w-full bg-transparent text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none font-medium"
              />
              <button
                type="submit"
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#007AFF] hover:bg-[#0062D1] text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/25 transition-all flex items-center gap-1.5 shrink-0 active:scale-95 glow-pill-blue"
              >
                <span>Mulai Gratis</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Secondary live demo trigger */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-0.5">
              <button
                onClick={handleDemoLogin}
                className="px-5 py-2.5 rounded-full bg-white/90 hover:bg-white text-slate-800 text-xs font-bold border border-slate-200/90 shadow-2xs transition-all flex items-center gap-2 active:scale-95"
              >
                <ShieldCheck className="w-4 h-4 text-[#007AFF]" />
                <span>Coba Demo Interaktif (Kopi Karawang Heritage)</span>
              </button>
            </div>

            {/* Trust Guarantees */}
            <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-4 sm:gap-x-6 text-xs font-semibold text-slate-500 pt-1">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#007AFF] stroke-[3]" />
                Tanpa perlu kartu kredit
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#007AFF] stroke-[3]" />
                Kompatibel semua kasir POS & Excel (CSV)
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#007AFF] stroke-[3]" />
                Terhubung 27 Kab & Kota se-Jabar
              </span>
            </div>

          </div>

          {/* Key Stat Badges Row (Conxera Metric Style) */}
          <div className="pt-8 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-left">
            <div className="bg-white/85 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-slate-200/70 shadow-xs space-y-1">
              <p className="font-display text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Rp 42.1M+</p>
              <p className="text-[11px] sm:text-xs font-medium text-slate-500">Omset UMKM Terdaftar</p>
            </div>
            <div className="bg-white/85 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-slate-200/70 shadow-xs space-y-1">
              <p className="font-display text-xl sm:text-2xl font-black text-[#007AFF] tracking-tight">94% Akurasi</p>
              <p className="text-[11px] sm:text-xs font-medium text-slate-500">Matcher Peluang Jabar</p>
            </div>
            <div className="bg-white/85 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-slate-200/70 shadow-xs space-y-1">
              <p className="font-display text-xl sm:text-2xl font-black text-slate-900 tracking-tight">27 Wilayah</p>
              <p className="text-[11px] sm:text-xs font-medium text-slate-500">Kab & Kota Terkoneksi</p>
            </div>
            <div className="bg-white/85 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-slate-200/70 shadow-xs space-y-1">
              <p className="font-display text-xl sm:text-2xl font-black text-emerald-600 tracking-tight">4.9 / 5.0</p>
              <p className="text-[11px] sm:text-xs font-medium text-slate-500">Kepuasan Pelaku Usaha</p>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* HERO MONITOR SHOWCASE (Pristine, 100% Unobstructed & Drag-Locked) */}
          {/* ------------------------------------------------------------- */}
          <div className="pt-10 sm:pt-14 max-w-5xl mx-auto px-2 sm:px-6 text-center space-y-4">
            
            {/* Live Indicator Pill above Mockup */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-slate-200/80 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-black text-slate-800">Tampilan Live Dashboard</span>
              <span className="text-[11px] text-[#007AFF] font-bold">• Kopi Karawang Heritage</span>
            </div>

            {/* Apple Studio Display Image Container (Completely Unobstructed!) */}
            <div
              className="relative z-10 transition-transform duration-500 hover:scale-[1.008] select-none"
              onContextMenu={(e) => e.preventDefault()}
            >
              {/* Soft glow behind monitor */}
              <div className="absolute inset-x-8 top-16 h-72 bg-gradient-to-r from-sky-400/20 via-blue-500/20 to-indigo-500/15 blur-3xl rounded-full pointer-events-none" />

              <img
                src="/images/strategiku_studio_display.png"
                alt="Strategiku Financial Insights & Business Intelligence Dashboard"
                className="w-full h-auto drop-shadow-2xl mx-auto object-contain max-h-[580px] pointer-events-none select-none relative z-10"
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                style={{ userSelect: 'none', WebkitUserDrag: 'none' } as React.CSSProperties}
                loading="eager"
              />
            </div>

            {/* Responsive Micro-Cards Row Beneath Monitor (Clean 3-column summary) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2 max-w-4xl mx-auto text-left">
              <div className="bg-white/95 p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Kopi Karawang Heritage</span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">+8.6% ▲</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <div>
                    <p className="text-[10px] text-slate-500 font-medium">Revenue Bulan Ini</p>
                    <p className="font-display text-lg font-black text-slate-900">Rp 10.25M</p>
                  </div>
                  <span className="text-xs font-black text-[#007AFF]">Margin 50.2%</span>
                </div>
              </div>

              <div className="bg-white/95 p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Peluang Resmi Jabar</span>
                  <span className="text-[9px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">94% Cocok</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Subsidi Sertifikasi Halal SEHATI</p>
                  <p className="text-[10px] text-slate-500">Pemprov Jawa Barat & BPJPH</p>
                </div>
              </div>

              <div className="bg-white/95 p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-1.5 sm:col-span-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  <Bot className="w-4 h-4 text-[#007AFF]" />
                  <span>AI Growth Insight</span>
                </div>
                <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                  "Bundling menu Kopi Aren + Pastry sore hari untuk menaikkan nilai transaksi rata-rata Rp 35.000."
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. WEST JAVA UMKM ECOSYSTEM PARTNERS (Sasflo Logo Cloud Style) */}
      {/* ------------------------------------------------------------- */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 border-y border-slate-200/70 bg-white/75 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto space-y-6 text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">
            Didukung &amp; Terhubung dengan Ekosistem Kewirausahaan Jawa Barat
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 items-center justify-center">
            {ecosystemPartners.map((partner) => (
              <div
                key={partner.id}
                title={partner.fullName}
                className="bg-white/95 hover:bg-white transition-all duration-300 px-3.5 py-3 rounded-2xl flex items-center justify-center h-16 sm:h-20 border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_20px_rgba(0,122,255,0.12)] hover:border-sky-300 group cursor-default select-none"
              >
                <img
                  src={partner.logo}
                  alt={partner.fullName}
                  className="h-8 sm:h-10 w-auto max-w-[130px] sm:max-w-[150px] object-contain transition-transform duration-200 group-hover:scale-105"
                  loading="lazy"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. FEATURE SECTION 1: "Turn Data into Smart Growth" (Sasflo 3-Card Minimalist Grid) */}
      {/* ------------------------------------------------------------- */}
      <section id="features" className="py-20 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto space-y-12 sm:space-y-14">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-xl text-left">
            <div className="inline-flex items-center gap-1.5 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
              <Sparkles className="w-3.5 h-3.5 text-[#007AFF]" />
              <span className="text-[#007AFF] text-[11px] font-extrabold uppercase tracking-wider">
                Solusi Berbasis Data
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Dari Data Mentah Menjadi Keputusan Terarah.
            </h2>
            <p className="text-slate-600 text-sm md:text-base font-normal">
              Tiga kapabilitas inti yang dirancang khusus untuk memecahkan persoalan operasional nyata pelaku UMKM di Jawa Barat.
            </p>
          </div>

          <a
            href="#engines"
            className="self-start md:self-auto bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-3 rounded-full flex items-center gap-2 transition-all active:scale-95 shadow-sm shrink-0"
          >
            <span>Pelajari 3 Engines</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 3 Minimal Gray/White Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left">
          
          {/* Card 1: BI Dashboard */}
          <div className="card-modern p-6 sm:p-8 flex flex-col justify-between space-y-8 bg-white">
            <div className="space-y-4">
              <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Omset Kopi Karawang</span>
                  <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">+28% ▲</span>
                </div>
                <p className="font-display text-2xl font-black text-slate-900">Rp 45.000.000</p>
                
                {/* Mini Bar Chart Mockup */}
                <div className="pt-2 border-t border-slate-200/60">
                  <div className="flex justify-between text-[10px] text-slate-500 font-medium mb-1.5">
                    <span>Tren Omset Mingguan</span>
                    <span className="text-[#007AFF] font-bold">Margin 68%</span>
                  </div>
                  <div className="h-10 w-full flex items-end justify-between gap-1.5">
                    <div className="w-full h-4 bg-sky-100 rounded-md" />
                    <div className="w-full h-6 bg-sky-200 rounded-md" />
                    <div className="w-full h-5 bg-sky-300 rounded-md" />
                    <div className="w-full h-8 bg-sky-400 rounded-md" />
                    <div className="w-full h-7 bg-blue-500 rounded-md" />
                    <div className="w-full h-10 bg-[#007AFF] rounded-md shadow-xs" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-display text-xl font-black text-slate-900">1. Analisis BI Otomatis</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Cukup upload CSV transaksi tanpa ubah sistem kasir. Engine BI langsung membedah profit margin tiap produk, tren penjualan, dan 6 indikator kesehatan bisnis.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#007AFF]">
              <span>Kalkulasi Otomatis</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 2: Opportunity Matcher */}
          <div className="card-modern p-6 sm:p-8 flex flex-col justify-between space-y-8 bg-white">
            <div className="space-y-4">
              <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Program Jabar Terkurasi</span>
                  <span className="text-[10px] font-bold text-[#007AFF] bg-sky-50 px-2 py-0.5 rounded-full">5 Bantuan Cocok</span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200/70 space-y-1 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900">Subsidi Halal SEHATI</span>
                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">94% Cocok</span>
                  </div>
                  <p className="text-[10px] text-slate-500">Fasilitasi Sertifikasi Halal Gratis Pemprov Jabar</p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200/70 space-y-1 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900">Kurasi Ekspor Kopi Jabar</span>
                    <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">88% Cocok</span>
                  </div>
                  <p className="text-[10px] text-slate-500">Akselerasi Pasar Ekspor ASEAN & Middle East</p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-display text-xl font-black text-slate-900">2. Matcher Peluang Jabar</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Sistem cerdas mencocokkan profil usaha Anda dengan katalog resmi kurasi ekspor, sertifikasi halal, dan pinjaman tanpa bunga Pemprov Jabar berbasis persentase kecocokan.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#007AFF]">
              <span>Skor Kesesuaian Instan</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 3: RAG AI Assistant */}
          <div className="card-modern p-6 sm:p-8 flex flex-col justify-between space-y-8 bg-white">
            <div className="space-y-4">
              <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200/60 space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-200/60 pb-2">
                  <Bot className="w-4 h-4 text-[#007AFF]" />
                  <span className="text-xs font-black text-slate-900">RAG AI Advisor</span>
                  <span className="ml-auto text-[9px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Aktif 24/7</span>
                </div>
                <div className="p-3 bg-white rounded-xl text-[11px] font-medium text-slate-700 leading-relaxed border border-slate-200/70 shadow-2xs">
                  "Rekomendasi Strategis: Tingkatkan margin Kopi Karawang dengan paket bundling jam 15:00-18:00 WIB untuk menambah rata-rata pesanan harian sebesar Rp 35.000."
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
                  <span>✓ Grounded Data Nyata</span>
                  <span className="text-[#007AFF] font-bold">Teruji Akurat</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-display text-xl font-black text-slate-900">3. Konsultan RAG AI 24/7</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Konsultasikan keputusan harga, analisis margin kotor, hingga draf persyaratan program langsung dengan asisten AI yang memahami data spesifik bisnis Anda.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#007AFF]">
              <span>Konsultasi Tanpa Batas</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5. BENTO GRID INTERACTIVE ENGINE SHOWCASE (Conxera / Sasflo Tabbed Deep-Dive) */}
      {/* ------------------------------------------------------------- */}
      <section id="engines" className="py-20 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto space-y-10 sm:space-y-12 border-t border-slate-200/70">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-xl text-left">
            <div className="inline-flex items-center gap-1.5 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              <BarChart3 className="w-3.5 h-3.5 text-[#007AFF]" />
              <span className="text-[#007AFF] text-[11px] font-extrabold uppercase tracking-wider">
                Interactive Showcase
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Eksplorasi 3 Engine Cerdas Strategiku.
            </h2>
          </div>

          <p className="text-slate-500 text-xs font-medium max-w-xs leading-relaxed text-left">
            Pilih tab untuk melihat simulasi interface live secara langsung sesuai modul yang Anda butuhkan.
          </p>
        </div>

        {/* Bento Grid Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch text-left">
          
          {/* Left Column (Selector Buttons Stack) */}
          <div className="lg:col-span-4 space-y-3 flex flex-col justify-center">
            
            {/* Tab 0: Business Intelligence Engine */}
            <div
              onClick={() => setActiveEngineTab(0)}
              className={`p-4 sm:p-5 rounded-2xl cursor-pointer transition-all duration-300 flex items-start gap-3.5 border ${
                activeEngineTab === 0
                  ? 'bg-[#007AFF] text-white border-[#007AFF] shadow-lg shadow-blue-500/20 scale-[1.01]'
                  : 'bg-white hover:bg-slate-50 text-slate-900 border-slate-200/80 shadow-xs'
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                activeEngineTab === 0 ? 'bg-white/20 text-white' : 'bg-sky-50 text-[#007AFF]'
              }`}>
                <Activity className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-display text-sm font-bold">1. Business Intelligence Engine</h4>
                <p className={`text-xs leading-relaxed font-normal ${activeEngineTab === 0 ? 'text-sky-100' : 'text-slate-500'}`}>
                  Analisis otomatis transaksi CSV omset, margin profit, dan 6 skor kesehatan usaha.
                </p>
              </div>
            </div>

            {/* Tab 1: Opportunity Matcher Engine */}
            <div
              onClick={() => setActiveEngineTab(1)}
              className={`p-4 sm:p-5 rounded-2xl cursor-pointer transition-all duration-300 flex items-start gap-3.5 border ${
                activeEngineTab === 1
                  ? 'bg-[#007AFF] text-white border-[#007AFF] shadow-lg shadow-blue-500/20 scale-[1.01]'
                  : 'bg-white hover:bg-slate-50 text-slate-900 border-slate-200/80 shadow-xs'
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                activeEngineTab === 1 ? 'bg-white/20 text-white' : 'bg-sky-50 text-[#007AFF]'
              }`}>
                <Target className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-display text-sm font-bold">2. Opportunity Matcher Engine</h4>
                <p className={`text-xs leading-relaxed font-normal ${activeEngineTab === 1 ? 'text-sky-100' : 'text-slate-500'}`}>
                  Pencocokan profil bisnis dengan katalog resmi bantuan Pemprov Jabar berbasis skor %.
                </p>
              </div>
            </div>

            {/* Tab 2: RAG AI Growth Assistant */}
            <div
              onClick={() => setActiveEngineTab(2)}
              className={`p-4 sm:p-5 rounded-2xl cursor-pointer transition-all duration-300 flex items-start gap-3.5 border ${
                activeEngineTab === 2
                  ? 'bg-[#007AFF] text-white border-[#007AFF] shadow-lg shadow-blue-500/20 scale-[1.01]'
                  : 'bg-white hover:bg-slate-50 text-slate-900 border-slate-200/80 shadow-xs'
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                activeEngineTab === 2 ? 'bg-white/20 text-white' : 'bg-sky-50 text-[#007AFF]'
              }`}>
                <Bot className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-display text-sm font-bold">3. RAG AI Growth Assistant</h4>
                <p className={`text-xs leading-relaxed font-normal ${activeEngineTab === 2 ? 'text-sky-100' : 'text-slate-500'}`}>
                  Konsultasi 24/7 grounded berbasis data transaksi nyata & regulasi daerah Jabar.
                </p>
              </div>
            </div>

            {/* Tab 3: UMKM Hub Direktori */}
            <div
              onClick={() => setActiveEngineTab(3)}
              className={`p-4 sm:p-5 rounded-2xl cursor-pointer transition-all duration-300 flex items-start gap-3.5 border ${
                activeEngineTab === 3
                  ? 'bg-[#007AFF] text-white border-[#007AFF] shadow-lg shadow-blue-500/20 scale-[1.01]'
                  : 'bg-white hover:bg-slate-50 text-slate-900 border-slate-200/80 shadow-xs'
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                activeEngineTab === 3 ? 'bg-white/20 text-white' : 'bg-sky-50 text-[#007AFF]'
              }`}>
                <Compass className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-display text-sm font-bold">4. Jejaring UMKM Hub</h4>
                <p className={`text-xs leading-relaxed font-normal ${activeEngineTab === 3 ? 'text-sky-100' : 'text-slate-500'}`}>
                  Katalog produk terverifikasi, kolaborasi rantai pasok, dan eksposur regional.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column (Dynamic Visual Preview Container) */}
          <div className="lg:col-span-8 bg-gradient-to-br from-[#EBF5FF] via-[#F4F9FF] to-white border border-sky-200/80 rounded-3xl p-5 sm:p-8 space-y-6 relative overflow-hidden flex flex-col justify-between shadow-sm">
            
            {/* View State 0: BI Engine Live Preview */}
            {activeEngineTab === 0 && (
              <div className="space-y-5 sm:space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sky-200/60 pb-4">
                  <div>
                    <span className="text-[10px] font-bold text-[#007AFF] bg-white px-2.5 py-0.5 rounded-full uppercase border border-sky-100">
                      Live Dashboard Simulation
                    </span>
                    <h3 className="font-display text-lg sm:text-xl font-black text-slate-900 mt-1">Kopi Karawang Heritage - BI Analytics</h3>
                  </div>
                  <span className="self-start sm:self-auto text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                    Skor Kesehatan: 88/100 (Sangat Sehat)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div className="bg-white p-4 rounded-2xl border border-slate-200/70 shadow-2xs space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Total Omset Bulan Ini</p>
                    <p className="font-display text-xl font-black text-slate-900">Rp 45.000.000</p>
                    <span className="text-[10px] font-bold text-emerald-600">▲ +18% vs bulan lalu</span>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200/70 shadow-2xs space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Profit Margin Bersih</p>
                    <p className="font-display text-xl font-black text-[#007AFF]">34,2%</p>
                    <span className="text-[10px] font-bold text-sky-600">Level Optimal</span>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200/70 shadow-2xs space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Total Pesanan</p>
                    <p className="font-display text-xl font-black text-slate-900">1.280 Order</p>
                    <span className="text-[10px] font-bold text-indigo-600">Avg Rp 35.150/Order</span>
                  </div>
                </div>

                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/70 shadow-2xs space-y-3">
                  <span className="text-xs font-bold text-slate-900">Distribusi Penjualan Per-Kategori Menu</span>
                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between font-bold text-slate-700 text-[11px] mb-1">
                        <span>Specialty Coffee & Espresso</span>
                        <span>54% (Rp 24,3M)</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#007AFF] w-[54%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between font-bold text-slate-700 text-[11px] mb-1">
                        <span>Pastry & Snack Pendamping</span>
                        <span>31% (Rp 13,9M)</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[31%]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* View State 1: Opportunity Matcher Live Preview */}
            {activeEngineTab === 1 && (
              <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sky-200/60 pb-4">
                  <div>
                    <span className="text-[10px] font-bold text-[#007AFF] bg-white px-2.5 py-0.5 rounded-full uppercase border border-sky-100">
                      Live Matching Engine
                    </span>
                    <h3 className="font-display text-lg sm:text-xl font-black text-slate-900 mt-1">Direktori Bantuan Jabar Matched</h3>
                  </div>
                  <span className="self-start sm:self-auto text-xs font-bold text-[#007AFF] bg-white px-3 py-1 rounded-full border border-sky-200">
                    5 Program Terhubung
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/70 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-slate-900">Subsidi Sertifikasi Halal SEHATI</span>
                        <span className="text-[10px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">94% Matched</span>
                      </div>
                      <p className="text-[11px] text-slate-500">Penyelenggara: BPJPH & Dinas Koperasi Kab. Karawang</p>
                    </div>
                    <button className="self-start sm:self-auto px-4 py-2 rounded-full bg-[#007AFF] text-white text-xs font-bold shrink-0 shadow-xs">
                      Lihat Syarat
                    </button>
                  </div>

                  <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/70 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-slate-900">Program Kurasi Ekspor Kopi Jabar</span>
                        <span className="text-[10px] font-black bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">88% Matched</span>
                      </div>
                      <p className="text-[11px] text-slate-500">Penyelenggara: Disperindag & Bank bjb Jabar</p>
                    </div>
                    <button className="self-start sm:self-auto px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-xs font-bold shrink-0 hover:bg-slate-200">
                      Lihat Syarat
                    </button>
                  </div>

                  <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/70 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-slate-900">Kredit Mesra Tanpa Bunga Bank bjb</span>
                        <span className="text-[10px] font-black bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">82% Matched</span>
                      </div>
                      <p className="text-[11px] text-slate-500">Penyelenggara: Bank bjb & Pemprov Jawa Barat</p>
                    </div>
                    <button className="self-start sm:self-auto px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-xs font-bold shrink-0 hover:bg-slate-200">
                      Lihat Syarat
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* View State 2: RAG AI Growth Consultant Simulator */}
            {activeEngineTab === 2 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex justify-between items-center border-b border-sky-200/60 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#007AFF] text-white flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-black text-slate-900">AI Growth Assistant (Strategiku RAG)</h3>
                      <p className="text-[10px] text-slate-500">Kopi Karawang Heritage • Grounded Context</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-extrabold text-emerald-600 bg-white px-2.5 py-1 rounded-full border border-emerald-200 shadow-2xs">
                    Online 24/7
                  </span>
                </div>

                {/* Simulated Chat Messages */}
                <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/70 shadow-2xs max-h-56 overflow-y-auto space-y-3">
                  {aiMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex gap-2 text-xs ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.sender === 'ai' && (
                        <div className="w-6 h-6 rounded-full bg-[#007AFF] text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                          <Bot className="w-3 h-3" />
                        </div>
                      )}
                      <div
                        className={`p-3 rounded-2xl max-w-[85%] font-medium leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-[#007AFF] text-white rounded-br-none'
                            : 'bg-slate-100 text-slate-800 rounded-bl-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {isAiThinking && (
                    <div className="flex gap-2 text-xs items-center text-slate-400 font-bold">
                      <Bot className="w-4 h-4 text-[#007AFF] animate-spin" />
                      <span>Sedang menganalisis data bisnis Anda...</span>
                    </div>
                  )}
                </div>

                {/* Sample Prompt Chips */}
                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Cobalah pertanyaan sampel:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {sampleAiPrompts.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendAiPrompt(prompt)}
                        className="text-[10px] font-bold bg-white hover:bg-sky-50 text-slate-700 hover:text-[#007AFF] px-3 py-1.5 rounded-full border border-slate-200 transition-all text-left truncate max-w-full shadow-2xs"
                      >
                        💡 {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* View State 3: UMKM Hub Direktori Preview */}
            {activeEngineTab === 3 && (
              <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sky-200/60 pb-4">
                  <div>
                    <span className="text-[10px] font-bold text-[#007AFF] bg-white px-2.5 py-0.5 rounded-full uppercase border border-sky-100">
                      Regional Ecosystem
                    </span>
                    <h3 className="font-display text-lg sm:text-xl font-black text-slate-900 mt-1">Direktori UMKM Hub Jawa Barat</h3>
                  </div>
                  <Link
                    to="/umkm-hub"
                    className="self-start sm:self-auto text-xs font-bold text-[#007AFF] bg-white px-3 py-1 rounded-full border border-sky-200 flex items-center gap-1 shadow-2xs"
                  >
                    <span>Buka Hub Penuh</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="bg-white p-4 rounded-2xl border border-slate-200/70 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded">Kuliner • Karawang</span>
                      <span className="text-[10px] font-bold text-emerald-600">✓ Terverifikasi NIB</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">Kopi Karawang Heritage</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Spesialis biji kopi arabika & robusta lokal Karawang Selatan dengan sertifikasi halal resmi.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-slate-200/70 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">Craft • Bandung</span>
                      <span className="text-[10px] font-bold text-emerald-600">✓ Siap Ekspor</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">Atelier Kulit Cibaduyut</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Produksi sepatu dan tas kulit artisan berkualitas premium binaan Dekranasda Jawa Barat.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 bg-white rounded-2xl border border-slate-200/70 text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="font-semibold">Mencakup 1.400+ profil usaha terverifikasi dari 27 Kabupaten & Kota.</span>
                  <Link to="/umkm-hub" className="text-[#007AFF] font-bold hover:underline">
                    Jelajahi Sekarang →
                  </Link>
                </div>
              </div>
            )}

            {/* Bottom Label */}
            <div className="pt-3 border-t border-sky-200/60 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">Platform Pertumbuhan Resmi UMKM Jawa Barat</span>
              <span className="font-bold text-[#007AFF]">Strategiku Engine v2.4</span>
            </div>

          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 6. INTERACTIVE GROWTH CALCULATOR SECTION */}
      {/* ------------------------------------------------------------- */}
      <section id="calculator" className="py-16 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-[#007AFF] via-blue-600 to-indigo-700 text-white rounded-3xl p-5 sm:p-10 md:p-12 shadow-xl space-y-6 sm:space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2.5">
            <span className="px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
              INTERACTIVE CALCULATOR
            </span>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Hitung Potensi Pertumbuhan Usaha Anda
            </h2>
            <p className="text-sky-100 text-xs sm:text-sm font-normal">
              Geser slider omset bulanan di bawah untuk mensimulasikan estimasi kenaikan omset dan program bantuan Jawa Barat yang cocok.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center bg-white/10 p-4 sm:p-8 rounded-3xl border border-white/20 backdrop-blur-md text-left">
            {/* Controls */}
            <div className="space-y-5 sm:space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-sky-100">Omset Penjualan Bulanan Saat Ini:</span>
                  <span className="font-display text-xl sm:text-2xl font-black text-white">{formatIDR(monthlyRevenue)}</span>
                </div>
                <input
                  type="range"
                  min={5000000}
                  max={200000000}
                  step={5000000}
                  value={monthlyRevenue}
                  onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                  className="w-full h-3 bg-white/25 rounded-lg appearance-none cursor-pointer accent-sky-300"
                />
                <div className="flex justify-between text-[10px] text-sky-200 font-medium">
                  <span>Rp 5 Juta</span>
                  <span>Rp 100 Juta</span>
                  <span>Rp 200 Juta</span>
                </div>
              </div>

              <div className="p-3.5 sm:p-4 rounded-2xl bg-white/10 border border-white/10 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-sky-100 font-medium">Estimasi Kenaikan Omset (Engine Strategy):</span>
                  <span className="font-black text-emerald-300">+{Math.round(estGrowthRate * 100)}% / Periode</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sky-100 font-medium">Program Resmi Jabar Matched:</span>
                  <span className="font-black text-amber-300">{matchedProgramsCount} Program Pilihan</span>
                </div>
              </div>
            </div>

            {/* Results Display */}
            <div className="bg-white text-slate-900 p-5 sm:p-6 rounded-2xl shadow-xl space-y-4 sm:space-y-5">
              <div className="border-b border-slate-100 pb-4 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Proyeksi Target Omset Baru</span>
                <span className="font-display text-2xl sm:text-3xl font-black text-[#007AFF]">{formatIDR(estTotalRevenue)}</span>
                <span className="text-xs font-bold text-emerald-600 block">
                  ▲ Potensi Tambahan Omset: +{formatIDR(estRevenueGain)}
                </span>
              </div>

              <div className="space-y-2.5">
                <span className="text-xs font-bold text-slate-700 block">Program Terkait Relevan:</span>
                <div className="space-y-2 text-xs font-medium">
                  <div className="flex items-center gap-2 text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Program Kurasi Ekspor Kopi & Batik Jabar</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Subsidi Sertifikasi Halal Gratis (SEHATI)</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Fasilitasi Kemitraan Rest Area Tol & Retail Modern</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 7. JABAR REGIONAL HUBS EXPLORER */}
      {/* ------------------------------------------------------------- */}
      <section id="regions" className="py-20 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t border-slate-200/70 space-y-10 sm:space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-emerald-700 text-[11px] font-extrabold uppercase tracking-wider">
              Cakupan Wilayah
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Jawa Barat Growth Hubs
          </h2>
          <p className="text-slate-600 text-sm font-normal">
            Pilih wilayah untuk melihat sektor unggulan dan kontak Dinas Koperasi & UKM daerah terkait.
          </p>
        </div>

        <div className="space-y-6">
          {/* Region Buttons */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {Object.keys(regionsData).map((region) => (
              <button
                key={region}
                onClick={() => setActiveRegion(region)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  activeRegion === region
                    ? 'bg-[#007AFF] text-white shadow-md shadow-blue-500/25 scale-105'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80 shadow-2xs'
                }`}
              >
                {region}
              </button>
            ))}
          </div>

          {/* Region Info Display */}
          {regionsData[activeRegion] && (
            <div className="bg-white p-5 sm:p-8 rounded-3xl border border-slate-200/80 max-w-4xl mx-auto space-y-6 shadow-xs text-left">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200/60 pb-4">
                <div>
                  <span className="px-3 py-1 rounded-full bg-sky-50 text-[#007AFF] text-[10px] font-bold uppercase border border-sky-100">
                    {regionsData[activeRegion].badge}
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-black text-slate-900 mt-1.5">{activeRegion} Regional Hub</h3>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5">{regionsData[activeRegion].stats}</p>
                </div>
                <span className="text-xs font-semibold text-slate-700 bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                  {regionsData[activeRegion].contact}
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Sektor Unggulan Daerah</span>
                <p className="text-sm font-semibold text-slate-800 bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200/60">
                  {regionsData[activeRegion].sector}
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Program Bantuan Daerah Aktif</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {regionsData[activeRegion].programs.map((prog, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-[#F8FAFC] border border-slate-200/60 text-slate-800 font-bold text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#007AFF] shrink-0" />
                      <span>{prog}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 8. FAQ ACCORDION */}
      {/* ------------------------------------------------------------- */}
      <section id="faq" className="py-20 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto space-y-10 border-t border-slate-200/70">
        <div className="text-center space-y-2.5">
          <div className="inline-flex items-center gap-1.5 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
            <span className="text-amber-700 text-[11px] font-extrabold uppercase tracking-wider">
              Pusat Informasi
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Pertanyaan Sering Diajukan
          </h2>
          <p className="text-slate-500 text-sm font-normal">
            Segala hal yang perlu Anda ketahui tentang integrasi dan manfaat platform Strategiku.
          </p>
        </div>

        <div className="space-y-3.5 text-left">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs transition-all"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-[#007AFF] shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>
              {openFaq === idx && (
                <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal border-t border-slate-100 bg-[#FAFCFF]">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 9. BOTTOM CONVERSION BANNER (Modern Dark Card with Ambient Glow) */}
      {/* ------------------------------------------------------------- */}
      <section className="py-14 sm:py-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white p-7 sm:p-12 md:p-16 rounded-3xl shadow-2xl relative overflow-hidden text-center space-y-6 border border-blue-500/30">
          
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <span className="px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-sky-300 text-xs font-bold uppercase tracking-wider">
              AKSELERASI BISNIS ANDA SEKARANG
            </span>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Mulai Transformasi Data Usaha Anda Hari Ini
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm font-normal max-w-lg mx-auto leading-relaxed">
              Bergabunglah dengan ekosistem UMKM Jawa Barat dan temukan arah pertumbuhan terbaik berbasis analitik dan kecerdasan buatan.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 relative z-10">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#007AFF] hover:bg-[#0062D1] text-white font-bold text-sm shadow-xl shadow-blue-500/30 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Daftar Sekarang Gratis 🚀</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={handleDemoLogin}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Coba Demo Account</span>
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 10. MODERN CLEAN FOOTER */}
      {/* ------------------------------------------------------------- */}
      <footer className="border-t border-slate-200/80 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 sm:pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-8 mb-14 sm:mb-16 text-left">
            
            <div className="lg:col-span-2 space-y-4 sm:space-y-5">
              <img src="/logo/Logo+Text+Landscape.png" alt="Strategiku Logo" className="h-8 sm:h-9 w-auto" />
              <p className="text-slate-500 text-xs leading-relaxed font-normal max-w-sm">
                Strategiku (Dari Data Usaha Menjadi Arah Pertumbuhan). Next-Gen Integrated UMKM Business Growth Intelligence Platform khusus Jawa Barat.
              </p>
              <div className="flex items-center gap-2.5">
                <a href="#" className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200/70 flex items-center justify-center text-slate-500 hover:text-[#007AFF] hover:border-[#007AFF] transition-all">
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200/70 flex items-center justify-center text-slate-500 hover:text-[#007AFF] hover:border-[#007AFF] transition-all">
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200/70 flex items-center justify-center text-slate-500 hover:text-[#007AFF] hover:border-[#007AFF] transition-all">
                  <Twitter className="w-3.5 h-3.5" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200/70 flex items-center justify-center text-slate-500 hover:text-[#007AFF] hover:border-[#007AFF] transition-all">
                  <Youtube className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="space-y-3.5">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Platform</h4>
              <ul className="space-y-2 text-xs font-medium text-slate-500">
                <li><a href="#hero" className="hover:text-[#007AFF] transition-colors">Home</a></li>
                <li><a href="#features" className="hover:text-[#007AFF] transition-colors">Fitur Utama</a></li>
                <li><a href="#engines" className="hover:text-[#007AFF] transition-colors">3 AI Engines</a></li>
                <li><Link to="/umkm-hub" className="hover:text-[#007AFF] transition-colors">UMKM Hub</Link></li>
              </ul>
            </div>

            <div className="space-y-3.5">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Navigasi</h4>
              <ul className="space-y-2 text-xs font-medium text-slate-500">
                <li><a href="#calculator" className="hover:text-[#007AFF] transition-colors">Growth Calculator</a></li>
                <li><a href="#regions" className="hover:text-[#007AFF] transition-colors">Regional Hubs</a></li>
                <li><a href="#faq" className="hover:text-[#007AFF] transition-colors">FAQ & Bantuan</a></li>
              </ul>
            </div>

            <div className="space-y-3.5">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Kontak Jawa Barat</h4>
              <ul className="space-y-2.5 text-xs font-normal text-slate-500">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#007AFF] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">Gedung Sate, Lt. 1<br />Jl. Diponegoro No.22, Bandung</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#007AFF] shrink-0" />
                  <span>+62 811-2233-4455</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[11px] font-medium text-slate-400">© {new Date().getFullYear()} Strategiku. Hak cipta dilindungi undang-undang.</p>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-medium text-slate-400">Dibuat dengan</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span className="text-[11px] font-medium text-slate-400">untuk akselerasi UMKM Jawa Barat</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};
