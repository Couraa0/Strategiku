import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  TrendingUp,
  Target,
  MessageSquare,
  ArrowRight,
  Database,
  Zap,
  CheckCircle2,
  ShieldCheck,
  Globe2,
  Flame,
  Star,
  Award,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Github,
  Mail,
  Phone,
  MapPin,
  Calculator,
  Sliders,
  Cpu,
  Layers,
  Code2,
  Building2,
  ArrowUpRight,
  User,
  LayoutDashboard,
  LogOut,
  ChevronRight,
  Activity,
  Compass,
  Heart,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LandingPage: React.FC = () => {
  const { user, business, isAuthenticated, login, logout } = useAuth();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(45000000);
  const [activeRegion, setActiveRegion] = useState<string>('Karawang');
  const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);

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
  const regionsData: Record<string, { sector: string; contact: string; programs: string[]; badge: string }> = {
    Karawang: {
      sector: 'Agro-industri, Pengolahan Kopi Specialty, Rantai Pasok Manufaktur',
      contact: 'Dinas Koperasi & UMKM Kab. Karawang (0267-402123)',
      programs: ['Subsidi Sertifikasi Halal SEHATI', 'Fasilitasi Standarisasi BPOM', 'Kemitraan Rest Area Interchange'],
      badge: 'Karawang Growth Hub',
    },
    Bandung: {
      sector: 'Kuliner Creative, Fashion & Craft, Digital Agency',
      contact: 'Dinas Koperasi & UKM Kota Bandung (022-7201234)',
      programs: ['Bandung Creative Hub Export Match', 'Kurasi Fashion Jabar', 'Subsidized E-Commerce Onboarding'],
      badge: 'Bandung Creative Hub',
    },
    Bogor: {
      sector: 'Agrobisnis Tanaman Hias, Olahan Buah, Kerajinan Kayu',
      contact: 'Dinas Perdagangan & Perindustrian Kab. Bogor (0251-8321456)',
      programs: ['Fasilitasi Uji Nutrisi PIRT', 'Bantuan Sertifikasi TKDN', 'Pasar Tani Digital Bogor'],
      badge: 'Bogor Agro Center',
    },
    Cirebon: {
      sector: 'Batik Trusmi, Olahan Seafood, Kerajinan Kerang',
      contact: 'Dinas Koperasi & UKM Kab. Cirebon (0231-321789)',
      programs: ['Kurasi Ekspor Pasar ASEAN', 'Bantuan Kemasan Higienis', 'Kredit Mesra Bank bjb'],
      badge: 'Cirebon Maritime & Craft',
    },
    Bekasi: {
      sector: 'Kuliner Siap Saji, Manufaktur Komponen, Jasa Logistik',
      contact: 'Dinas UMKM Kota Bekasi (021-8895123)',
      programs: ['Kemitraan Retail Modern Indomaret/Alfamart', 'Fasilitasi NIB Risiko Menengah', 'Kredit BPR Jabar'],
      badge: 'Bekasi Logistics Hub',
    },
    Purwakarta: {
      sector: 'Kuliner Khas Sate Maranggi, Kerajinan Keramik Sayang Heulang',
      contact: 'Dinas KUKMP Kab. Purwakarta (0264-201234)',
      programs: ['Kurasi Festival Kuliner Jabar', 'Fasilitasi Hak Kekayaan Intelektual (HKI)', 'Pelatihan Digital Marketing'],
      badge: 'Purwakarta Heritage Hub',
    },
  };

  const faqs = [
    {
      q: 'Apa itu Strategiku dan untuk siapa platform ini dirancang?',
      a: 'Strategiku (Dari Data Usaha Menjadi Arah Pertumbuhan) adalah Next-Gen Business Growth Intelligence Platform khusus untuk UMKM di Jawa Barat. Platform ini bukan sekadar kasir POS, melainkan engine cerdas yang mengolah data transaksi harian & profil usaha menjadi arah pertumbuhan terukur, pencocokan peluang Jabar (ekspor, halal, pembiayaan), serta pendampingan AI RAG 24/7.',
    },
    {
      q: 'Bagaimana cara Strategiku menjaga keamanan data bisnis saya?',
      a: 'Seluruh data transaksi dan profil usaha disimpan secara terenkripsi menggunakan infrastruktur PostgreSQL Supabase dengan perizinan berbasis Row Level Security (RLS). Data usaha Anda aman dan tidak akan pernah dibagikan ke pihak ketiga tanpa izin.',
    },
    {
      q: 'Apa saja 3 Intelligence Engines yang ada di Strategiku?',
      a: 'Tiga mesin cerdas Strategiku meliputi: (1) Business Intelligence Engine untuk agregasi omset & tren produk, (2) Opportunity Matcher Engine untuk pencocokan program kurasi & bantuan Jawa Barat berbasis skor %, dan (3) AI Growth Assistant berbasis RAG yang memberikan rekomendasi konkret berdasarkan data usaha Anda.',
    },
    {
      q: 'Apakah saya bisa mencoba Strategiku secara gratis?',
      a: 'Ya! Anda dapat langsung mendaftar secara gratis atau mencoba akun demo "Kopi Karawang Heritage" dengan mengklik tombol "Try Live Demo" di navigasi tanpa perlu melakukan pendaftaran terlebih dahulu.',
    },
    {
      q: 'Bagaimana cara memasukkan data penjualan harian ke dalam platform?',
      a: 'Anda dapat mengunggah file CSV transaksi penjualan melalui menu Data Usaha. Platform secara otomatis memvalidasi per-baris data dan menyinkronkannya ke BI Dashboard dan Recommendation Engine.',
    },
    {
      q: 'Apakah platform ini mendukung seluruh kota & kabupaten di Jawa Barat?',
      a: 'Tentu. Strategiku mencakup seluruh 27 Kabupaten/Kota di Jawa Barat (Bandung, Karawang, Bekasi, Bogor, Cirebon, Sukabumi, Tasikmalaya, dll) dengan basis data peluang yang disesuaikan dengan fokus program Dinas Koperasi & UMKM daerah setempat.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-sky-500 selection:text-white overflow-x-hidden">
      {/* Top Floating Navbar (Modern Gen-Z Pill) */}
      <div className="fixed top-4 left-0 right-0 z-50 px-4 flex justify-center pointer-events-none">
        <header className="pointer-events-auto bg-white/70 backdrop-blur-2xl border border-white/50 shadow-2xl shadow-sky-900/5 rounded-full px-3 py-2.5 flex items-center justify-between w-full max-w-6xl transition-all duration-300">
          <div className="flex items-center pr-4 border-r border-slate-200/50">
            <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
              <img src="/logo/Logo+Text+Landscape.png" alt="Strategiku Logo" className="h-8 md:h-10 w-auto drop-shadow-sm" />
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-1 p-1 bg-slate-100/50 rounded-full border border-slate-200/50" aria-label="Main Navigation">
            <a href="#concept" className="px-5 py-2 text-[11px] font-extrabold text-slate-600 hover:text-sky-700 hover:bg-white rounded-full transition-all shadow-sm shadow-transparent hover:shadow-black/5">Platform Journey</a>
            <a href="#calculator" className="px-5 py-2 text-[11px] font-extrabold text-slate-600 hover:text-sky-700 hover:bg-white rounded-full transition-all shadow-sm shadow-transparent hover:shadow-black/5">Calculator</a>
            <a href="#engines" className="px-5 py-2 text-[11px] font-extrabold text-slate-600 hover:text-sky-700 hover:bg-white rounded-full transition-all shadow-sm shadow-transparent hover:shadow-black/5">AI Engines</a>
            <a href="#regions" className="px-5 py-2 text-[11px] font-extrabold text-slate-600 hover:text-sky-700 hover:bg-white rounded-full transition-all shadow-sm shadow-transparent hover:shadow-black/5">Jabar Hubs</a>
            <a href="#faq" className="px-5 py-2 text-[11px] font-extrabold text-slate-600 hover:text-sky-700 hover:bg-white rounded-full transition-all shadow-sm shadow-transparent hover:shadow-black/5">FAQ</a>
          </nav>

          <div className="flex items-center gap-2 pl-4">
            <Link
              to="/umkm-hub"
              className="hidden md:flex px-4 py-2.5 rounded-full bg-white hover:bg-sky-50 text-sky-700 text-[11px] font-black border border-sky-100 shadow-sm transition-all active:scale-95 items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5 text-sky-500" />
              <span>UMKM Hub</span>
            </Link>

            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-sky-50 hover:bg-sky-100/80 text-sky-900 border border-sky-200 transition-all font-bold text-xs shadow-sm"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-sky-500 via-blue-600 to-indigo-600 text-white font-black flex items-center justify-center text-xs shadow-sm">
                    {(user.name || 'U').charAt(0).toUpperCase()}
                  </div>
                  <span className="truncate max-w-[130px] font-extrabold text-[11px] pr-1">{user.name || business?.name || 'Pemilik Usaha'}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-sky-600 transition-transform duration-200 mr-2 ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 mt-3 w-64 bg-white/90 backdrop-blur-xl rounded-3xl border border-slate-200/80 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-4 duration-200 overflow-hidden">
                      <div className="px-5 py-3 border-b border-slate-100/80 bg-slate-50/50">
                        <p className="text-[13px] font-black text-slate-900 truncate">{user.name || 'Pemilik Usaha'}</p>
                        <p className="text-[11px] text-slate-500 font-medium truncate">{user.email}</p>
                      </div>

                      <div className="p-2 space-y-1">
                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            navigate('/dashboard');
                          }}
                          className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-700 rounded-2xl transition-all flex items-center gap-3"
                        >
                          <div className="p-1.5 rounded-lg bg-sky-100/50 text-sky-600"><LayoutDashboard className="w-3.5 h-3.5" /></div>
                          <span>Kembali ke Dashboard</span>
                        </button>

                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            logout();
                          }}
                          className="w-full text-left px-4 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-2xl transition-all flex items-center gap-3"
                        >
                          <div className="p-1.5 rounded-lg bg-rose-100/50 text-rose-600"><LogOut className="w-3.5 h-3.5" /></div>
                          <span>Logout / Keluar</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-blue-500 text-white text-[11px] font-extrabold shadow-lg shadow-sky-500/30 transition-all flex items-center gap-1.5 active:scale-95"
              >
                <span>Mulai Sekarang</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </header>
      </div>

      {/* Hero Section Wrapper with Grid Background */}
      <div className="relative w-full overflow-hidden">
        {/* Modern Gen-Z Grid Background */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-slate-50 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        {/* Hero Section */}
        <section className="relative pt-36 md:pt-48 pb-20 px-6 max-w-7xl mx-auto text-center" aria-label="Hero Introduction">
          {/* Ambient Glow Effects */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-sky-400/20 via-blue-500/10 to-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Gen-Z Glowing Tech Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100/90 border border-sky-300 text-sky-700 text-xs font-extrabold mb-8 shadow-xs animate-pulse">
          <Zap className="w-4 h-4 text-sky-500" />
          <span>NEXT-GEN UMKM GROWTH ENGINE JAWA BARAT</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight mb-6">
          From Business Data to <br />
          <span className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">Business Growth</span>
        </h1>

        <p className="text-slate-600 text-base md:text-xl max-w-3xl mx-auto leading-relaxed mb-10 font-medium">
          Strategiku mengolah data penjualan harian menjadi arah pertumbuhan bisnis terukur, menghubungkan usaha Anda dengan peluang kurasi ekspor & pembiayaan di Jawa Barat, serta mendampingi aksi cepat via RAG AI Consultant.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            to="/register"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-sky-500 hover:bg-sky-400 text-white font-extrabold text-sm shadow-xl shadow-sky-500/30 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <span>Launch Growth Engine 🚀</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            onClick={handleDemoLogin}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-sky-50 text-slate-800 font-bold text-sm border border-slate-200 hover:border-sky-300 shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <ShieldCheck className="w-4 h-4 text-sky-500" />
            <span>Try Live Demo (Kopi Karawang)</span>
          </button>
        </div>

        {/* Tech Showcase Mockup Image */}
        <div className="relative max-w-5xl mx-auto mb-16 rounded-3xl p-3 bg-white/70 backdrop-blur-md border border-slate-200 shadow-2xl shadow-sky-500/10">
          <img
            src="/images/genz_hero.png"
            alt="Strategiku Next-Gen Tech Savvy Business Growth Intelligence Dashboard Showcase"
            className="w-full h-auto rounded-2xl shadow-lg border border-slate-200 object-cover max-h-[520px]"
            loading="eager"
          />
        </div>

        {/* Highlight Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
            <span className="text-2xl md:text-3xl font-black text-sky-600">27</span>
            <span className="text-xs text-slate-500 font-bold block uppercase tracking-wider">Kab/Kota Jabar</span>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
            <span className="text-2xl md:text-3xl font-black text-indigo-600">3x</span>
            <span className="text-xs text-slate-500 font-bold block uppercase tracking-wider">Intelligence Engines</span>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
            <span className="text-2xl md:text-3xl font-black text-emerald-600">92%</span>
            <span className="text-xs text-slate-500 font-bold block uppercase tracking-wider">Akurasi Rekomendasi</span>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
            <span className="text-2xl md:text-3xl font-black text-amber-500">24/7</span>
            <span className="text-xs text-slate-500 font-bold block uppercase tracking-wider">RAG AI Assistant</span>
          </div>
        </div>
      </section>
      </div>

      {/* Concept & Platform Journey */}
      <section id="concept" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-200/80">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-extrabold uppercase tracking-wider">
            PLATFORM JOURNEY
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            Bagaimana Strategiku Mendorong Bisnis Anda
          </h2>
          <p className="text-slate-600 text-sm md:text-base font-medium">
            Empat langkah sistematis mengubah data penjualan pasif menjadi aksi nyata eksekusi pertumbuhan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:shadow-xl hover:border-sky-300 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-black text-lg border border-sky-100 shadow-xs">
              01
            </div>
            <h3 className="text-lg font-black text-slate-900">Input Data Transaksi</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Upload file CSV penjualan harian Anda secara fleksibel tanpa memerlukan pergantian sistem POS kasir yang rumit.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:shadow-xl hover:border-indigo-300 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-lg border border-indigo-100 shadow-xs">
              02
            </div>
            <h3 className="text-lg font-black text-slate-900">Analisis BI Dashboard</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Lihat grafik performa omset, margin profit, tren produk paling lari, dan skor kesehatan usaha secara real-time.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:shadow-xl hover:border-emerald-300 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-lg border border-emerald-100 shadow-xs">
              03
            </div>
            <h3 className="text-lg font-black text-slate-900">Matching Peluang Jabar</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Sistem mencocokkan profil usaha Anda dengan program pemerintah Jabar (kurasi ekspor, sertifikasi halal, pembiayaan) berbasis skor %.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:shadow-xl hover:border-amber-300 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-black text-lg border border-amber-100 shadow-xs">
              04
            </div>
            <h3 className="text-lg font-black text-slate-900">Eksekusi via AI Consultant</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Konsultasi langsung dengan RAG AI Assistant 24/7 untuk langkah teknis pembuatan dokumen, SOP, dan strategi pemasaran.
            </p>
          </div>
        </div>
      </section>

      {/* Growth Calculator Section */}
      <section id="calculator" className="py-20 px-6 max-w-7xl mx-auto bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 text-white rounded-3xl shadow-2xl shadow-sky-500/20 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-extrabold uppercase tracking-wider">
            INTERACTIVE CALCULATOR
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">
            Hitung Potensi Pertumbuhan Usaha Anda
          </h2>
          <p className="text-sky-100 text-xs md:text-sm font-medium">
            Geser slider untuk melihat estimasi tambahan omset dan program bantuan Jawa Barat yang cocok.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white/10 p-6 md:p-8 rounded-3xl border border-white/20 backdrop-blur-md">
          {/* Controls */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-sky-100">Estimasi Omset Saat Ini (Bulan):</span>
                <span className="text-lg font-black text-white">{formatIDR(monthlyRevenue)}</span>
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
                <span className="text-sky-100 font-medium">Estimasi Tingkat Pertumbuhan:</span>
                <span className="font-extrabold text-emerald-300">+{Math.round(estGrowthRate * 100)}% / Periode</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sky-100 font-medium">Potensi Program Jabar Matched:</span>
                <span className="font-extrabold text-amber-300">{matchedProgramsCount} Program Resmi</span>
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="bg-white text-slate-900 p-6 rounded-2xl shadow-xl space-y-6">
            <div className="border-b border-slate-100 pb-4 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Proyeksi Omset Baru</span>
              <span className="text-3xl font-black text-sky-600">{formatIDR(estTotalRevenue)}</span>
              <span className="text-xs font-bold text-emerald-600 block">
                ▲ Tambahan Omset: +{formatIDR(estRevenueGain)}
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
      </section>

      {/* 3 Intelligence Engines Section */}
      <section id="engines" className="py-20 px-6 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-extrabold uppercase tracking-wider">
            CORE ARCHITECTURE
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            3 Intelligence Engines Strategiku
          </h2>
          <p className="text-slate-600 text-sm md:text-base font-medium">
            Tiga pilar kecerdasan buatan dan analitik data yang bekerja selaras memajukan usaha Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 hover:shadow-2xl hover:border-sky-300 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-lg shadow-sky-500/30">
              <Activity className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-slate-900">1. Business Intelligence Engine</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Agregasi otomatis data harian penjualan, visualisasi margin laba bersih, tren omset bulanan, dan evaluasi 6 indikator kesehatan bisnis.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-500" />
                <span>Profit Margin & Expense Breakdown</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-500" />
                <span>Analisis Product Mix & Retensi Pelanggan</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 hover:shadow-2xl hover:border-indigo-300 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30">
              <Target className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-slate-900">2. Opportunity Matcher Engine</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Pencocokan profil bisnis dengan direktori peluang daerah Jawa Barat (kurasi ekspor, halal, etalase suvenir, bantuan pembiayaan) berbasis skor kesesuaian %.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                <span>Matching Skor Kesesuaian %</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                <span>Direct Contact Penyelenggara & WA</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 hover:shadow-2xl hover:border-emerald-300 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <MessageSquare className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-slate-900">3. RAG AI Assistant</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Asisten konsultan AI berbasis Retrieval-Augmented Generation (RAG) 24/7 yang menjawab pertanyaan strategis berdasarkan konteks nyata data usaha Anda.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Rekomendasi Grounded dari Data</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Pendampingan Pembuatan Proposal</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Jabar Growth Hubs */}
      <section id="regions" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-200/80 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase tracking-wider">
            REGIONAL COVERAGE
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            Jawa Barat Growth Hubs
          </h2>
          <p className="text-slate-600 text-sm md:text-base font-medium">
            Pilih wilayah untuk melihat fokus sektor unggulan dan kontak Dinas Koperasi & UMKM daerah terkait.
          </p>
        </div>

        <div className="space-y-6">
          {/* Region Tabs */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {Object.keys(regionsData).map((region) => (
              <button
                key={region}
                onClick={() => setActiveRegion(region)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all ${
                  activeRegion === region
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25 scale-105'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-sky-300'
                }`}
              >
                {region}
              </button>
            ))}
          </div>

          {/* Region Info Display */}
          {regionsData[activeRegion] && (
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg max-w-4xl mx-auto space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-[10px] font-extrabold uppercase tracking-wider">
                    {regionsData[activeRegion].badge}
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 mt-1">{activeRegion} Regional Hub</h3>
                </div>
                <span className="text-xs font-bold text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {regionsData[activeRegion].contact}
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Sektor Unggulan Daerah</span>
                <p className="text-sm font-bold text-slate-800 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  {regionsData[activeRegion].sector}
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Program Bantuan Daerah Aktif</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {regionsData[activeRegion].programs.map((prog, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-sky-50 border border-sky-100 text-sky-900 font-bold text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                      <span>{prog}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6 max-w-4xl mx-auto space-y-10 border-t border-slate-200/80">
        <div className="text-center space-y-3">
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-extrabold uppercase tracking-wider">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            Pertanyaan Sering Diajukan
          </h2>
          <p className="text-slate-600 text-sm font-medium">
            Segala hal yang perlu Anda ketahui mengenai platform Strategiku.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-all"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-5 text-left font-black text-sm text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-sky-500 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed font-medium border-t border-slate-100 bg-slate-50/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-indigo-950 text-white p-10 md:p-14 rounded-3xl shadow-2xl relative overflow-hidden text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-extrabold uppercase tracking-wider">
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
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-sky-500 hover:bg-sky-400 text-white font-extrabold text-sm shadow-xl shadow-sky-500/30 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Daftar Sekarang Gratis</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={handleDemoLogin}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Coba Demo Account</span>
            </button>
          </div>
        </div>
      </section>

      {/* Modern Informative Footer */}
      <footer className="border-t border-slate-200/80 bg-white relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
            <div className="lg:col-span-2 space-y-6">
              <img src="/logo/Logo+Text+Landscape.png" alt="Strategiku Logo" className="h-12 w-auto" />
              <p className="text-slate-500 text-xs md:text-sm max-w-sm leading-relaxed font-medium">
                Strategiku (Dari Data Usaha Menjadi Arah Pertumbuhan). Next-Gen Business Growth Intelligence Platform khusus untuk UMKM di Jawa Barat, dilengkapi 3 Intelligence Engines modern.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-sky-50 hover:text-sky-500 hover:border-sky-200 transition-all shadow-sm">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-indigo-50 hover:text-indigo-500 hover:border-indigo-200 transition-all shadow-sm">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-700 hover:border-slate-300 transition-all shadow-sm">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-500 hover:border-rose-200 transition-all shadow-sm">
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="space-y-5">
              <h4 className="text-sm font-black text-slate-900 tracking-wide">Platform</h4>
              <ul className="space-y-3 text-xs font-semibold text-slate-500">
                <li><a href="#concept" className="hover:text-sky-600 transition-colors flex items-center gap-1.5"><ArrowRight className="w-3 h-3 text-sky-400" /> Platform Journey</a></li>
                <li><a href="#engines" className="hover:text-sky-600 transition-colors flex items-center gap-1.5"><ArrowRight className="w-3 h-3 text-sky-400" /> Intelligence Engines</a></li>
                <li><Link to="/umkm-hub" className="hover:text-sky-600 transition-colors flex items-center gap-1.5"><ArrowRight className="w-3 h-3 text-sky-400" /> UMKM Hub</Link></li>
                <li><a href="#calculator" className="hover:text-sky-600 transition-colors flex items-center gap-1.5"><ArrowRight className="w-3 h-3 text-sky-400" /> Growth Calculator</a></li>
              </ul>
            </div>

            <div className="space-y-5">
              <h4 className="text-sm font-black text-slate-900 tracking-wide">Dukungan</h4>
              <ul className="space-y-3 text-xs font-semibold text-slate-500">
                <li><a href="#regions" className="hover:text-sky-600 transition-colors flex items-center gap-1.5"><ArrowRight className="w-3 h-3 text-sky-400" /> Jabar Regional Hubs</a></li>
                <li><a href="#faq" className="hover:text-sky-600 transition-colors flex items-center gap-1.5"><ArrowRight className="w-3 h-3 text-sky-400" /> FAQ & Bantuan</a></li>
                <li><a href="#" className="hover:text-sky-600 transition-colors flex items-center gap-1.5"><ArrowRight className="w-3 h-3 text-sky-400" /> Panduan Pengguna</a></li>
                <li><a href="#" className="hover:text-sky-600 transition-colors flex items-center gap-1.5"><ArrowRight className="w-3 h-3 text-sky-400" /> Kebijakan Privasi</a></li>
              </ul>
            </div>

            <div className="space-y-5">
              <h4 className="text-sm font-black text-slate-900 tracking-wide">Hubungi Kami</h4>
              <ul className="space-y-4 text-xs font-medium text-slate-500">
                <li className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-sky-50 text-sky-600 shrink-0"><MapPin className="w-3.5 h-3.5" /></div>
                  <span className="leading-relaxed">Gedung Sate, Lt. 1<br />Jl. Diponegoro No.22<br />Bandung, Jawa Barat</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 shrink-0"><Phone className="w-3.5 h-3.5" /></div>
                  <span>+62 811-2233-4455</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 shrink-0"><Mail className="w-3.5 h-3.5" /></div>
                  <span>halo@strategiku.id</span>
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
