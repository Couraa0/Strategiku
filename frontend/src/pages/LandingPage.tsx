import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Zap,
  Check,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Mail,
  ShieldCheck,
  Compass,
  LayoutDashboard,
  LogOut,
  Activity,
  Target,
  MessageSquare,
  CheckCircle2,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  MapPin,
  Phone,
  Heart,
  Pencil,
  Wrench,
  Sparkles,
  BarChart3,
  TrendingUp,
  Sliders,
  Globe2,
  Send,
  Bot,
  UserCheck,
  Building,
  Award,
  Search,
  FileText,
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
  const [activeEngineTab, setActiveEngineTab] = useState<number>(0);
  const [heroEmail, setHeroEmail] = useState<string>('');

  // Interactive RAG AI Chat Simulator State
  const [aiInputText, setAiInputText] = useState<string>('');
  const [aiMessages, setAiMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: 'Halo! Saya AI Growth Assistant Strategiku. Data Kopi Karawang Heritage Anda menunjukkan potensi kenaikan omset 24% jika memanfaatkan promo paket bundling sore hari & mendaftar Kurasi Halal SEHATI Jabar. Ada yang ingin Anda tanyakan?',
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
        aiReply = 'Berdasarkan profil usaha Anda (Sektor Kuliner/Minuman di Karawang), Anda 94% cocok untuk Sertifikasi Halal SEHATI. Langkahnya: (1) Siapkan NIB Risiko Rendah, (2) Pilih Penyelia Halal, (3) Ajukan via portal SIHALAL BPJPH. Strategiku dapat mengunduh draf dokumen siap pakai di menu Opportunity Matcher!';
      } else if (promptText.includes('margin') || promptText.includes('profit')) {
        aiReply = 'Analisis BI Engine Strategiku menemukan item "Es Kopi Susu Gula Aren" memiliki margin tertinggi (68%). Saya merekomendasikan: gabungkan item ini dengan camilan "Roti Bakar" di jam 15:00-18:00 untuk menaikkan rata-rata nilai transaksi harian sebesar Rp 35.000.';
      } else {
        aiReply = 'Program Kredit Mesra (Masyarakat Sejahtera) Bank bjb menawarkan pinjaman tanpa bunga dan tanpa agunan hingga Rp 5 Juta per anggota kelompok UMKM Jabar. Persyaratan utama adalah Surat Keterangan Usaha (SKU) atau NIB yang sudah terverifikasi di platform Strategiku.';
      }

      setAiMessages((prev) => [...prev, { sender: 'ai', text: aiReply }]);
      setIsAiThinking(false);
    }, 1000);
  };

  const handleDemoLogin = async () => {
    await login('demo@aphyah.id', 'Demo123!');
    navigate('/dashboard');
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
      contact: 'Dinas Koperasi & UMKM Kab. Karawang (0267-402123)',
      programs: ['Subsidi Sertifikasi Halal SEHATI', 'Fasilitasi Standarisasi BPOM', 'Kemitraan Rest Area Interchange Tol'],
      badge: 'Karawang Growth Hub',
      stats: '1,420 UMKM Aktif • Rp 18.4M Omset Terdaftar',
    },
    Bandung: {
      sector: 'Kuliner Creative, Fashion & Craft, Digital Agency',
      contact: 'Dinas Koperasi & UKM Kota Bandung (022-7201234)',
      programs: ['Bandung Creative Hub Export Match', 'Kurasi Fashion Jabar', 'Subsidized E-Commerce Onboarding'],
      badge: 'Bandung Creative Hub',
      stats: '3,850 UMKM Aktif • Rp 42.1M Omset Terdaftar',
    },
    Bogor: {
      sector: 'Agrobisnis Tanaman Hias, Olahan Buah, Kerajinan Kayu',
      contact: 'Dinas Perdagangan & Perindustrian Kab. Bogor (0251-8321456)',
      programs: ['Fasilitasi Uji Nutrisi PIRT', 'Bantuan Sertifikasi TKDN', 'Pasar Tani Digital Bogor'],
      badge: 'Bogor Agro Center',
      stats: '2,110 UMKM Aktif • Rp 26.8M Omset Terdaftar',
    },
    Cirebon: {
      sector: 'Batik Trusmi, Olahan Seafood, Kerajinan Kerang',
      contact: 'Dinas Koperasi & UKM Kab. Cirebon (0231-321789)',
      programs: ['Kurasi Ekspor Pasar ASEAN', 'Bantuan Kemasan Higienis', 'Kredit Mesra Bank bjb'],
      badge: 'Cirebon Maritime & Craft',
      stats: '1,890 UMKM Aktif • Rp 21.5M Omset Terdaftar',
    },
    Bekasi: {
      sector: 'Kuliner Siap Saji, Manufaktur Komponen, Jasa Logistik',
      contact: 'Dinas UMKM Kota Bekasi (021-8895123)',
      programs: ['Kemitraan Retail Modern Indomaret/Alfamart', 'Fasilitasi NIB Risiko Menengah', 'Kredit BPR Jabar'],
      badge: 'Bekasi Logistics Hub',
      stats: '2,940 UMKM Aktif • Rp 34.2M Omset Terdaftar',
    },
    Purwakarta: {
      sector: 'Kuliner Khas Sate Maranggi, Kerajinan Keramik Sayang Heulang',
      contact: 'Dinas KUKMP Kab. Purwakarta (0264-201234)',
      programs: ['Kurasi Festival Kuliner Jabar', 'Fasilitasi Hak Kekayaan Intelektual (HKI)', 'Pelatihan Digital Marketing'],
      badge: 'Purwakarta Heritage Hub',
      stats: '1,120 UMKM Aktif • Rp 14.6M Omset Terdaftar',
    },
  };

  const faqs = [
    {
      q: 'Apa itu Strategiku dan mengapa berbeda dari kasir POS biasa?',
      a: 'Strategiku (Dari Data Usaha Menjadi Arah Pertumbuhan) bukan sekadar pencatat kasir. Strategiku adalah Growth Intelligence Engine khusus UMKM Jawa Barat yang secara otomatis mengolah data CSV penjualan harian Anda menjadi grafik BI kesehatan bisnis, mencocokkan usaha Anda dengan program resmi Pemprov Jabar (ekspor, halal, dana), serta didampingi AI Consultant 24/7.',
    },
    {
      q: 'Bagaimana cara memasukkan data transaksi bisnis saya?',
      a: 'Sangat mudah! Anda tidak perlu mengganti aplikasi kasir POS yang sedang digunakan. Cukup unduh laporan CSV dari kasir/excel Anda, lalu upload ke menu Data Usaha Strategiku. Engine BI akan memvalidasi dan mengolahnya secara otomatis.',
    },
    {
      q: 'Apa saja 3 Intelligence Engines utama di Strategiku?',
      a: 'Tiga engine Strategiku adalah: (1) Business Intelligence Engine untuk analisis omset & profit margin, (2) Opportunity Matcher Engine untuk pencocokan program bantuan Jabar berbasis skor Kesesuaian %, dan (3) AI Growth Assistant berbasis RAG untuk rekomendasi bisnis dan draf proposal otomatis.',
    },
    {
      q: 'Bagaimana Strategiku menjaga kerahasiaan & keamanan data saya?',
      a: 'Seluruh data transaksi dan profil usaha Anda dilindungi dengan enkripsi PostgreSQL Supabase berstandar enterprise serta Row Level Security (RLS). Data Anda 100% milik Anda dan tidak pernah dijual/dibagikan ke pihak mana pun.',
    },
    {
      q: 'Apakah saya bisa mencoba Strategiku secara gratis?',
      a: 'Tentu! Anda bisa mendaftar akun gratis atau langsung menggunakan fitur "Try Live Demo (Kopi Karawang Heritage)" di navigasi untuk menjelajahi seluruh dashboard tanpa perlu registrasi.',
    },
    {
      q: 'Kota & Kabupaten mana saja di Jawa Barat yang sudah didukung?',
      a: 'Strategiku mendukung seluruh 27 Kabupaten dan Kota di Jawa Barat (Karawang, Bandung, Bogor, Bekasi, Cirebon, Sukabumi, Tasikmalaya, dll) lengkap dengan direktori program Dinas Koperasi & UMKM setempat.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#007AFF] selection:text-white overflow-x-hidden">
      
      {/* ------------------------------------------------------------- */}
      {/* 1. STICKY FLOATING GLASS NAVBAR (Modern Pin Header) */}
      {/* ------------------------------------------------------------- */}
      <div className="fixed top-3 left-0 right-0 z-50 px-4 flex justify-center pointer-events-none">
        <header className="pointer-events-auto bg-white/85 backdrop-blur-2xl border border-slate-200/80 shadow-xl shadow-sky-900/5 rounded-full px-4 py-2.5 flex items-center justify-between w-full max-w-6xl transition-all duration-300">
          
          {/* Logo & Brand */}
          <div className="flex items-center pr-3 border-r border-slate-200/60">
            <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
              <img src="/logo/Logo+Text+Landscape.png" alt="Strategiku Logo" className="h-8 md:h-9 w-auto drop-shadow-xs" />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 p-1 bg-slate-100/60 rounded-full border border-slate-200/50 text-xs font-extrabold text-slate-600">
            <a href="#hero" className="px-4 py-1.5 rounded-full hover:bg-white hover:text-[#007AFF] hover:shadow-xs transition-all">Home</a>
            <a href="#features" className="px-4 py-1.5 rounded-full hover:bg-white hover:text-[#007AFF] hover:shadow-xs transition-all">Features</a>
            <a href="#engines" className="px-4 py-1.5 rounded-full hover:bg-white hover:text-[#007AFF] hover:shadow-xs transition-all">3 AI Engines</a>
            <a href="#calculator" className="px-4 py-1.5 rounded-full hover:bg-white hover:text-[#007AFF] hover:shadow-xs transition-all">Kalkulator Omset</a>
            <a href="#regions" className="px-4 py-1.5 rounded-full hover:bg-white hover:text-[#007AFF] hover:shadow-xs transition-all">Jabar Hubs</a>
            <a href="#faq" className="px-4 py-1.5 rounded-full hover:bg-white hover:text-[#007AFF] hover:shadow-xs transition-all">FAQ</a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 pl-3">
            <Link
              to="/umkm-hub"
              className="hidden sm:flex px-3.5 py-2 rounded-full bg-white hover:bg-sky-50 text-[#007AFF] text-xs font-black border border-sky-100 shadow-xs transition-all active:scale-95 items-center gap-1.5"
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
                  <span className="truncate max-w-[110px] font-extrabold text-xs">{user.name || business?.name || 'User'}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 mt-3 w-60 bg-white rounded-2xl border border-slate-200 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 overflow-hidden">
                      <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50">
                        <p className="text-xs font-black text-slate-900 truncate">{user.name || 'Pemilik Usaha'}</p>
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
                  className="hidden md:flex px-3.5 py-2 rounded-full text-slate-700 hover:text-[#007AFF] hover:bg-slate-100 text-xs font-extrabold transition-all items-center gap-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#007AFF]" />
                  <span>Demo</span>
                </button>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-full bg-[#007AFF] hover:bg-[#0063D1] text-white text-xs font-extrabold shadow-md shadow-blue-500/20 active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <span>Mulai Gratis</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        </header>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. HERO SECTION (Modern Clean Cyan Gradient + Strategiku Context) */}
      {/* ------------------------------------------------------------- */}
      <section id="hero" className="relative bg-gradient-to-b from-[#D8EFFF] via-[#EDF7FF] to-slate-50 pt-28 md:pt-36 pb-20 px-6 overflow-hidden">
        
        {/* Soft Ambient Blur Glows */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#A3DCFF]/40 rounded-full blur-3xl pointer-events-none -translate-x-1/3 -translate-y-1/3" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#CDEBFF]/50 rounded-full blur-3xl pointer-events-none translate-x-1/3" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Column: Strategiku Value Proposition */}
          <div className="lg:col-span-6 space-y-7 text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center bg-white/90 backdrop-blur-md rounded-full p-1 border border-sky-200/80 shadow-xs">
              <span className="bg-[#007AFF] text-white text-[10px] md:text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Zap className="w-3 h-3" />
                STRATEGIKU
              </span>
              <span className="text-slate-700 text-xs font-bold px-3">
                Next-Gen UMKM Growth Engine Jabar
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.08]">
              Dari Data Transaksi Usaha <br />
              <span className="bg-gradient-to-r from-[#007AFF] via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Menjadi Arah Pertumbuhan Real.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium max-w-xl">
              Strategiku mengolah data penjualan harian UMKM Jawa Barat menjadi arah pertumbuhan terukur, pencocokan otomatis dengan peluang bantuan & kurasi Pemprov Jabar, serta pendampingan konsultan RAG AI 24/7.
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <Link
                to="/register"
                className="px-7 py-3.5 rounded-full bg-[#007AFF] hover:bg-[#0062CC] text-white text-xs font-extrabold shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Mulai Sekarang Gratis 🚀</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={handleDemoLogin}
                className="px-6 py-3.5 rounded-full bg-white hover:bg-slate-100 text-slate-800 text-xs font-extrabold border border-slate-200/90 shadow-xs transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <ShieldCheck className="w-4 h-4 text-[#007AFF]" />
                <span>Try Live Demo (Kopi Karawang)</span>
              </button>
            </div>

            {/* Strategiku Key Benefits Checklist */}
            <div className="space-y-2.5 pt-2 text-xs font-bold text-slate-700">
              <div className="flex items-center gap-2">
                <div className="w-4.5 h-4.5 rounded-full bg-[#007AFF] text-white flex items-center justify-center text-[10px] shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>Agregasi Transaksi CSV Fleksibel Tanpa Perlu Ganti Kasir POS</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4.5 h-4.5 rounded-full bg-[#007AFF] text-white flex items-center justify-center text-[10px] shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>3 Intelligence Engines (BI + Opportunity Matcher + RAG AI)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4.5 h-4.5 rounded-full bg-[#007AFF] text-white flex items-center justify-center text-[10px] shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>Terhubung Direktori Resmi 27 Kabupaten & Kota se-Jawa Barat</span>
              </div>
            </div>

          </div>

          {/* Right Column: Tablet Mockup Showcase */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            <div className="relative w-full max-w-xl hover:scale-[1.02] transition-transform duration-500">
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-400/30 to-blue-600/20 rounded-3xl blur-2xl transform rotate-1 scale-95" />
              <img
                src="/images/strategiku_dashboard_mockup.png"
                alt="Strategiku Business Growth Overview Dashboard Mockup"
                className="relative z-10 w-full h-auto drop-shadow-2xl rounded-2xl border border-white/80 object-cover"
                loading="eager"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. WEST JAVA UMKM ECOSYSTEM PARTNERS (Clean Social Proof) */}
      {/* ------------------------------------------------------------- */}
      <section className="py-14 px-6 border-y border-slate-200/80 bg-white">
        <div className="max-w-7xl mx-auto space-y-6 text-center">
          <p className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
            Didukung Ekosistem & Mitratama UMKM Jawa Barat
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 items-center justify-center">
            <div className="bg-[#F4F6F9] hover:bg-slate-100 transition-colors p-3.5 rounded-2xl flex items-center justify-center h-14 border border-slate-100/80">
              <span className="font-black text-slate-800 text-xs tracking-tight">Dinas Koperasi Jabar</span>
            </div>
            <div className="bg-[#F4F6F9] hover:bg-slate-100 transition-colors p-3.5 rounded-2xl flex items-center justify-center h-14 border border-slate-100/80">
              <span className="font-black text-slate-800 text-xs tracking-tight">Bank bjb (Kredit Mesra)</span>
            </div>
            <div className="bg-[#F4F6F9] hover:bg-slate-100 transition-colors p-3.5 rounded-2xl flex items-center justify-center h-14 border border-slate-100/80">
              <span className="font-black text-slate-800 text-xs tracking-tight">SEHATI Halal Jabar</span>
            </div>
            <div className="bg-[#F4F6F9] hover:bg-slate-100 transition-colors p-3.5 rounded-2xl flex items-center justify-center h-14 border border-slate-100/80">
              <span className="font-black text-slate-800 text-xs tracking-tight">Bandung Creative Hub</span>
            </div>
            <div className="bg-[#F4F6F9] hover:bg-slate-100 transition-colors p-3.5 rounded-2xl flex items-center justify-center h-14 border border-slate-100/80">
              <span className="font-black text-slate-800 text-xs tracking-tight">Karawang Agro Hub</span>
            </div>
            <div className="bg-[#F4F6F9] hover:bg-slate-100 transition-colors p-3.5 rounded-2xl flex items-center justify-center h-14 border border-slate-100/80">
              <span className="font-black text-slate-800 text-xs tracking-tight">Kemenkop UKM RI</span>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. FEATURE SECTION 1: "Turn Data into Smart Growth" (3 Minimal Cards Grid) */}
      {/* ------------------------------------------------------------- */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center bg-sky-50 rounded-full p-1 border border-sky-100">
              <span className="bg-[#007AFF] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                Fitur Utama
              </span>
              <span className="text-slate-600 text-xs font-bold px-2.5">
                Solusi Strategis UMKM
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Kecerdasan Data untuk <br />
              Pertumbuhan Usaha.
            </h2>
          </div>

          <a
            href="#engines"
            className="self-start md:self-auto bg-black hover:bg-slate-800 text-white text-xs font-black px-6 py-3 rounded-full flex items-center gap-2 transition-all active:scale-95 shadow-sm"
          >
            <span>Pelajari 3 Engines</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 3 Minimal Gray Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: BI Dashboard */}
          <div className="bg-[#F4F6F9] rounded-3xl p-6 md:p-8 flex flex-col justify-between border border-slate-100 hover:shadow-xl transition-all duration-300 space-y-8">
            <div className="space-y-3 bg-white/70 p-4 rounded-2xl border border-white/80 shadow-xs">
              <div className="bg-white p-3.5 rounded-xl shadow-xs border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Omset Kopi Karawang</p>
                  <p className="text-lg font-black text-slate-900">Rp 45.000.000</p>
                </div>
                <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">+28% ▲</span>
              </div>

              <div className="bg-white p-3.5 rounded-xl shadow-xs border border-slate-100 space-y-2">
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                  <span>Profit Margin Item Terlaris</span>
                  <span className="text-[#007AFF] font-extrabold">68%</span>
                </div>
                <div className="h-8 w-full flex items-end justify-between gap-1 pt-1">
                  <div className="w-2 h-3 bg-sky-200 rounded-full" />
                  <div className="w-2 h-5 bg-sky-300 rounded-full" />
                  <div className="w-2 h-4 bg-sky-400 rounded-full" />
                  <div className="w-2 h-7 bg-[#007AFF] rounded-full" />
                  <div className="w-2 h-5 bg-sky-400 rounded-full" />
                  <div className="w-2 h-8 bg-[#007AFF] rounded-full" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900">1. Analisis BI Otomatis</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Olah data transaksi harian CSV Anda menjadi statistik omset real-time, profit margin per produk, dan 6 indikator kesehatan bisnis secara instan.
              </p>
            </div>
          </div>

          {/* Card 2: Opportunity Matcher */}
          <div className="bg-[#F4F6F9] rounded-3xl p-6 md:p-8 flex flex-col justify-between border border-slate-100 hover:shadow-xl transition-all duration-300 space-y-8">
            <div className="bg-white p-5 rounded-2xl shadow-xs border border-slate-100 space-y-3">
              <div className="flex justify-between items-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Program Jabar Matched</p>
                <span className="text-[9px] font-extrabold text-[#007AFF] bg-sky-50 px-2 py-0.5 rounded-full">5 Bantuan Cocok</span>
              </div>
              
              <div className="p-3 bg-sky-50/80 rounded-xl border border-sky-100 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-slate-900">Subsidi Halal SEHATI</span>
                  <span className="text-[10px] font-black text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded">94% Cocok</span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium">Bantuan Sertifikasi Halal Gratis Pemprov Jabar</p>
              </div>

              <div className="p-3 bg-indigo-50/80 rounded-xl border border-indigo-100 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-slate-900">Kurasi Ekspor Kopi Jabar</span>
                  <span className="text-[10px] font-black text-indigo-600 bg-indigo-100 px-1.5 py-0.5 rounded">88% Cocok</span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium">Fasilitasi Standar Mutu Ekspor Pasar ASEAN</p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900">2. Matcher Peluang Jabar</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Sistem pintar mencocokkan profil usaha Anda dengan katalog resmi kurasi ekspor, sertifikasi halal, dan bantuan modal Pemprov Jabar berbasis skor %.
              </p>
            </div>
          </div>

          {/* Card 3: RAG AI Assistant */}
          <div className="bg-[#F4F6F9] rounded-3xl p-6 md:p-8 flex flex-col justify-between border border-slate-100 hover:shadow-xl transition-all duration-300 space-y-8">
            <div className="bg-white p-5 rounded-2xl shadow-xs border border-slate-100 space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <Bot className="w-4 h-4 text-[#007AFF]" />
                <span className="text-xs font-black text-slate-900">AI Growth Consultant</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl text-[11px] font-medium text-slate-700 leading-relaxed">
                "Rekomendasi: Tambahkan promo bundling jam 14:00 untuk menaikkan rata-rata nilai keranjang dari Rp 25.000 menjadi Rp 40.000."
              </div>
              <div className="flex items-center justify-between text-[10px] text-emerald-600 font-bold">
                <span>✓ Data Grounded RAG</span>
                <span>Aktif 24/7</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900">3. Konsultan RAG AI 24/7</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Konsultasikan langkah strategis bisnis Anda secara langsung dengan AI Assistant yang memahami data kontekstual usaha & aturan daerah Anda.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5. BENTO GRID INTERACTIVE ENGINE SWITCHER */}
      {/* ------------------------------------------------------------- */}
      <section id="engines" className="py-24 px-6 max-w-7xl mx-auto space-y-12 border-t border-slate-200/80">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center bg-sky-50 rounded-full p-1 border border-sky-100">
              <span className="bg-[#007AFF] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                Interactive Showcase
              </span>
              <span className="text-slate-600 text-xs font-bold px-2.5">
                3 Intelligence Engines
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Eksplorasi 3 Engine Cerdas Strategiku.
            </h2>
          </div>

          <p className="text-slate-500 text-xs font-semibold max-w-xs">
            Klik pada setiap tab engine di sebelah kiri untuk melihat simulasi interface live secara langsung!
          </p>
        </div>

        {/* Bento Grid Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column (Feature Selector Buttons Stack) */}
          <div className="lg:col-span-4 space-y-4 flex flex-col justify-center">
            
            {/* Tab 0: Business Intelligence Engine */}
            <div
              onClick={() => setActiveEngineTab(0)}
              className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 flex items-start gap-4 ${
                activeEngineTab === 0
                  ? 'bg-[#007AFF] text-white shadow-xl shadow-blue-500/25 scale-[1.02]'
                  : 'bg-[#F4F6F9] hover:bg-slate-100 text-slate-900'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                activeEngineTab === 0 ? 'bg-white/20 text-white' : 'bg-sky-100 text-[#007AFF]'
              }`}>
                <Activity className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-black">1. Business Intelligence Engine</h4>
                <p className={`text-xs leading-relaxed font-medium ${activeEngineTab === 0 ? 'text-sky-100' : 'text-slate-500'}`}>
                  Agregasi otomatis CSV omset, margin profit bersih, dan evaluasi 6 skor kesehatan bisnis.
                </p>
              </div>
            </div>

            {/* Tab 1: Opportunity Matcher Engine */}
            <div
              onClick={() => setActiveEngineTab(1)}
              className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 flex items-start gap-4 ${
                activeEngineTab === 1
                  ? 'bg-[#007AFF] text-white shadow-xl shadow-blue-500/25 scale-[1.02]'
                  : 'bg-[#F4F6F9] hover:bg-slate-100 text-slate-900'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                activeEngineTab === 1 ? 'bg-white/20 text-white' : 'bg-sky-100 text-[#007AFF]'
              }`}>
                <Target className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-black">2. Opportunity Matcher Engine</h4>
                <p className={`text-xs leading-relaxed font-medium ${activeEngineTab === 1 ? 'text-sky-100' : 'text-slate-500'}`}>
                  Pencocokan profil bisnis dengan direktori resmi bantuan Pemprov Jabar berbasis skor %.
                </p>
              </div>
            </div>

            {/* Tab 2: RAG AI Growth Assistant */}
            <div
              onClick={() => setActiveEngineTab(2)}
              className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 flex items-start gap-4 ${
                activeEngineTab === 2
                  ? 'bg-[#007AFF] text-white shadow-xl shadow-blue-500/25 scale-[1.02]'
                  : 'bg-[#F4F6F9] hover:bg-slate-100 text-slate-900'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                activeEngineTab === 2 ? 'bg-white/20 text-white' : 'bg-sky-100 text-[#007AFF]'
              }`}>
                <Bot className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-black">3. RAG AI Growth Assistant</h4>
                <p className={`text-xs leading-relaxed font-medium ${activeEngineTab === 2 ? 'text-sky-100' : 'text-slate-500'}`}>
                  Konsultasi 24/7 grounded berbasis data transaksi nyata & regulasi daerah Jabar.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column (Dynamic Visual Preview Container) */}
          <div className="lg:col-span-8 bg-gradient-to-br from-[#D4EEFC] via-[#E2F2FE] to-[#EFF8FF] border border-sky-200/60 rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden flex flex-col justify-between shadow-inner">
            
            {/* View State 0: BI Engine Live Preview */}
            {activeEngineTab === 0 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex justify-between items-center border-b border-sky-200/60 pb-3">
                  <div>
                    <span className="text-[10px] font-black text-[#007AFF] bg-white px-2.5 py-0.5 rounded-full uppercase">
                      Live Dashboard Simulation
                    </span>
                    <h3 className="text-xl font-black text-slate-900 mt-1">Kopi Karawang Heritage - BI Analytics</h3>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                    Skor Kesehatan: 88/100 (Sangat Sehat)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
                    <p className="text-[10px] font-bold text-slate-400">Total Omset Bulan Ini</p>
                    <p className="text-xl font-black text-slate-900">Rp 45.000.000</p>
                    <span className="text-[10px] font-bold text-emerald-600">▲ +18% vs bulan lalu</span>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
                    <p className="text-[10px] font-bold text-slate-400">Profit Margin Bersih</p>
                    <p className="text-xl font-black text-[#007AFF]">34,2%</p>
                    <span className="text-[10px] font-bold text-sky-600">Sangat Baik</span>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
                    <p className="text-[10px] font-bold text-slate-400">Total Transaksi</p>
                    <p className="text-xl font-black text-slate-900">1.280 Pesanan</p>
                    <span className="text-[10px] font-bold text-indigo-600">Avg Rp 35.150/Order</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-3">
                  <span className="text-xs font-black text-slate-900">Breakdown Penjualan Kopi Per-Kategori</span>
                  <div className="space-y-2 text-xs">
                    <div>
                      <div className="flex justify-between font-bold text-slate-700 text-[11px] mb-1">
                        <span>Specialty Espresso & Milk</span>
                        <span>54% (Rp 24,3M)</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#007AFF] w-[54%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between font-bold text-slate-700 text-[11px] mb-1">
                        <span>Pastry & Snack</span>
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
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex justify-between items-center border-b border-sky-200/60 pb-3">
                  <div>
                    <span className="text-[10px] font-black text-[#007AFF] bg-white px-2.5 py-0.5 rounded-full uppercase">
                      Live Matching Engine
                    </span>
                    <h3 className="text-xl font-black text-slate-900 mt-1">Direktori Bantuan Jabar Matched</h3>
                  </div>
                  <span className="text-xs font-bold text-[#007AFF] bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
                    5 Program Terhubung
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-slate-900">Subsidi Sertifikasi Halal SEHATI</span>
                        <span className="text-[10px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">94% Matched</span>
                      </div>
                      <p className="text-[11px] text-slate-500">Penyelenggara: BPJPH & Dinas Koperasi Kab. Karawang</p>
                    </div>
                    <button className="px-4 py-2 rounded-full bg-[#007AFF] text-white text-xs font-bold shrink-0">
                      Lihat Syarat
                    </button>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-slate-900">Program Kurasi Ekspor Kopi Jabar</span>
                        <span className="text-[10px] font-black bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">88% Matched</span>
                      </div>
                      <p className="text-[11px] text-slate-500">Penyelenggara: Dinas Indag & Bank bjb Jabar</p>
                    </div>
                    <button className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-xs font-bold shrink-0 hover:bg-slate-200">
                      Lihat Syarat
                    </button>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-slate-900">Kredit Mesra Tanpa Bunga Bank bjb</span>
                        <span className="text-[10px] font-black bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">82% Matched</span>
                      </div>
                      <p className="text-[11px] text-slate-500">Penyelenggara: Bank bjb & Pemprov Jawa Barat</p>
                    </div>
                    <button className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-xs font-bold shrink-0 hover:bg-slate-200">
                      Lihat Syarat
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* View State 2: RAG AI Growth Consultant Simulator */}
            {activeEngineTab === 2 && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="flex justify-between items-center border-b border-sky-200/60 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#007AFF] text-white flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-slate-900">AI Growth Assistant (Strategiku RAG)</h3>
                      <p className="text-[10px] text-slate-500">Kopi Karawang Heritage • Grounded Context</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                    Online 24/7
                  </span>
                </div>

                {/* Simulated Chat Messages */}
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs max-h-56 overflow-y-auto space-y-3">
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
                  <p className="text-[10px] font-extrabold text-slate-400 uppercase">Cobalah pertanyaan sampel:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {sampleAiPrompts.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendAiPrompt(prompt)}
                        className="text-[10px] font-bold bg-white hover:bg-sky-50 text-slate-700 hover:text-[#007AFF] px-3 py-1.5 rounded-full border border-slate-200 transition-all text-left truncate max-w-full"
                      >
                        💡 {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Label */}
            <div className="pt-2 border-t border-sky-200/60 flex items-center justify-between text-xs">
              <span className="font-extrabold text-slate-900">Platform Pertumbuhan Resmi UMKM Jawa Barat</span>
              <span className="font-bold text-[#007AFF]">Strategiku Engine v2.4</span>
            </div>

          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 6. INTERACTIVE GROWTH CALCULATOR SECTION */}
      {/* ------------------------------------------------------------- */}
      <section id="calculator" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-[#007AFF] via-blue-600 to-indigo-700 text-white rounded-3xl p-8 md:p-12 shadow-2xl space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-extrabold uppercase tracking-wider">
              INTERACTIVE CALCULATOR
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">
              Hitung Potensi Pertumbuhan Usaha Anda
            </h2>
            <p className="text-sky-100 text-xs md:text-sm font-medium">
              Geser slider di bawah untuk mensimulasikan estimasi pertumbuhan omset dan program bantuan Jawa Barat yang cocok.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white/10 p-6 md:p-8 rounded-3xl border border-white/20 backdrop-blur-md">
            {/* Controls */}
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-sky-100">Omset Penjualan Bulanan Saat Ini:</span>
                  <span className="text-xl font-black text-white">{formatIDR(monthlyRevenue)}</span>
                </div>
                <input
                  type="range"
                  min={5000000}
                  max={200000000}
                  step={5000000}
                  value={monthlyRevenue}
                  onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                  className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer accent-sky-300"
                />
                <div className="flex justify-between text-[10px] text-sky-200 font-medium">
                  <span>Rp 5 Juta</span>
                  <span>Rp 100 Juta</span>
                  <span>Rp 200 Juta</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-sky-100 font-medium">Estimasi Kenaikan Omset (Engine Strategy):</span>
                  <span className="font-extrabold text-emerald-300">+{Math.round(estGrowthRate * 100)}% / Periode</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sky-100 font-medium">Program Resmi Jabar Matched:</span>
                  <span className="font-extrabold text-amber-300">{matchedProgramsCount} Program Pilihan</span>
                </div>
              </div>
            </div>

            {/* Results Display */}
            <div className="bg-white text-slate-900 p-6 rounded-2xl shadow-xl space-y-6">
              <div className="border-b border-slate-100 pb-4 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Proyeksi Target Omset Baru</span>
                <span className="text-3xl font-black text-[#007AFF]">{formatIDR(estTotalRevenue)}</span>
                <span className="text-xs font-bold text-emerald-600 block">
                  ▲ Potensi Tambahan Omset: +{formatIDR(estRevenueGain)}
                </span>
              </div>

              <div className="space-y-3">
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
                    <span>Fasilitasi Kemitraan Rest Area Tol & Retail</span>
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
      <section id="regions" className="py-24 px-6 max-w-7xl mx-auto border-t border-slate-200/80 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center bg-emerald-50 rounded-full p-1 border border-emerald-100">
            <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
              Cakupan Wilayah
            </span>
            <span className="text-slate-600 text-xs font-bold px-2.5">
              27 Kabupaten & Kota Jawa Barat
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            Jawa Barat Growth Hubs
          </h2>
          <p className="text-slate-600 text-sm font-medium">
            Pilih wilayah untuk melihat sektor unggulan dan kontak Dinas Koperasi & UMKM daerah terkait.
          </p>
        </div>

        <div className="space-y-6">
          {/* Region Buttons */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {Object.keys(regionsData).map((region) => (
              <button
                key={region}
                onClick={() => setActiveRegion(region)}
                className={`px-5 py-2.5 rounded-full text-xs font-extrabold transition-all ${
                  activeRegion === region
                    ? 'bg-[#007AFF] text-white shadow-lg shadow-blue-500/25 scale-105'
                    : 'bg-[#F4F6F9] text-slate-600 hover:bg-slate-200'
                }`}
              >
                {region}
              </button>
            ))}
          </div>

          {/* Region Info Display */}
          {regionsData[activeRegion] && (
            <div className="bg-[#F4F6F9] p-8 rounded-3xl border border-slate-100 max-w-4xl mx-auto space-y-6 shadow-xs">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200/60 pb-4">
                <div>
                  <span className="px-3 py-1 rounded-full bg-sky-100 text-[#007AFF] text-[10px] font-extrabold uppercase">
                    {regionsData[activeRegion].badge}
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 mt-1">{activeRegion} Regional Hub</h3>
                  <p className="text-xs text-slate-500 font-bold mt-0.5">{regionsData[activeRegion].stats}</p>
                </div>
                <span className="text-xs font-bold text-slate-600 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                  {regionsData[activeRegion].contact}
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Sektor Unggulan Daerah</span>
                <p className="text-sm font-bold text-slate-800 bg-white p-4 rounded-2xl border border-slate-200/60">
                  {regionsData[activeRegion].sector}
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Program Bantuan Daerah Aktif</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {regionsData[activeRegion].programs.map((prog, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-white border border-slate-200/60 text-slate-800 font-bold text-xs flex items-center gap-2">
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
      <section id="faq" className="py-24 px-6 max-w-4xl mx-auto space-y-10 border-t border-slate-200/80">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center bg-amber-50 rounded-full p-1 border border-amber-100">
            <span className="bg-amber-500 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
              Pusat Bantuan
            </span>
            <span className="text-slate-600 text-xs font-bold px-2.5">
              FAQ
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            Pertanyaan Sering Diajukan
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-[#F4F6F9] rounded-2xl border border-slate-100 overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-5 text-left font-black text-sm text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-100 transition-colors"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-[#007AFF] shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed font-medium border-t border-slate-200/60 bg-white">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 9. BOTTOM BANNER */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-indigo-950 text-white p-10 md:p-14 rounded-3xl shadow-2xl relative overflow-hidden text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-extrabold uppercase tracking-wider">
              READY TO ACCELERATE YOUR UMKM?
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">
              Mulai Transformasi Data Usaha Anda Hari Ini
            </h2>
            <p className="text-slate-300 text-xs md:text-sm font-medium">
              Bergabunglah dengan ekosistem UMKM Jawa Barat dan temukan arah pertumbuhan terbaik bagi usaha Anda.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#007AFF] hover:bg-[#0062CC] text-white font-extrabold text-xs shadow-xl shadow-blue-500/30 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Daftar Sekarang Gratis</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={handleDemoLogin}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Coba Demo Account</span>
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 10. FOOTER */}
      {/* ------------------------------------------------------------- */}
      <footer className="border-t border-slate-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
            
            <div className="lg:col-span-2 space-y-6">
              <img src="/logo/Logo+Text+Landscape.png" alt="Strategiku Logo" className="h-10 w-auto" />
              <p className="text-slate-500 text-xs leading-relaxed font-medium max-w-sm">
                Strategiku (Dari Data Usaha Menjadi Arah Pertumbuhan). Next-Gen Business Growth Intelligence Platform khusus untuk UMKM di Jawa Barat.
              </p>
              <div className="flex items-center gap-3">
                <a href="#" className="w-9 h-9 rounded-full bg-[#F4F6F9] border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#007AFF] transition-all">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-[#F4F6F9] border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#007AFF] transition-all">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-[#F4F6F9] border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#007AFF] transition-all">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-[#F4F6F9] border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#007AFF] transition-all">
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Platform</h4>
              <ul className="space-y-2.5 text-xs font-semibold text-slate-500">
                <li><a href="#hero" className="hover:text-[#007AFF] transition-colors">Home</a></li>
                <li><a href="#features" className="hover:text-[#007AFF] transition-colors">Features</a></li>
                <li><a href="#engines" className="hover:text-[#007AFF] transition-colors">3 AI Engines</a></li>
                <li><Link to="/umkm-hub" className="hover:text-[#007AFF] transition-colors">UMKM Hub</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Navigasi</h4>
              <ul className="space-y-2.5 text-xs font-semibold text-slate-500">
                <li><a href="#calculator" className="hover:text-[#007AFF] transition-colors">Growth Calculator</a></li>
                <li><a href="#regions" className="hover:text-[#007AFF] transition-colors">Regional Hubs</a></li>
                <li><a href="#faq" className="hover:text-[#007AFF] transition-colors">FAQ & Bantuan</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Kontak</h4>
              <ul className="space-y-3 text-xs font-medium text-slate-500">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#007AFF] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">Gedung Sate, Lt. 1<br />Jl. Diponegoro No.22, Bandung</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#007AFF] shrink-0" />
                  <span>+62 811-2233-4455</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="border-t border-slate-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[11px] font-bold text-slate-400">© {new Date().getFullYear()} Strategiku. Hak cipta dilindungi undang-undang.</p>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-slate-400">Dibuat dengan</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
              <span className="text-[11px] font-bold text-slate-400">untuk UMKM Jawa Barat</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};
