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
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LandingPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(45000000);
  const [activeRegion, setActiveRegion] = useState<string>('Karawang');

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
      q: 'Apa itu APH YAH dan untuk siapa platform ini dirancang?',
      a: 'APH YAH (Dari Data Usaha Menjadi Arah Pertumbuhan) adalah Next-Gen Business Growth Intelligence Platform khusus untuk UMKM di Jawa Barat. Platform ini bukan kasir atau POS biasa, melainkan engine cerdas yang mengolah data transaksi harian & profil usaha menjadi arah pertumbuhan terukur, pencocokan peluang Jabar (ekspor, halal, pembiayaan), serta pendampingan AI RAG 24/7.',
    },
    {
      q: 'Bagaimana cara APH YAH menjaga keamanan data bisnis saya?',
      a: 'Seluruh data transaksi dan profil usaha disimpan secara terenkripsi menggunakan infrastruktur PostgreSQL Supabase dengan perizinan berbasis Row Level Security (RLS). Data usaha Anda tidak akan pernah dijual atau dibagikan ke pihak ketiga tanpa izin.',
    },
    {
      q: 'Apa saja 3 Intelligence Engines yang ada di APH YAH?',
      a: 'Tiga mesin cerdas APH YAH meliputi: (1) Business Intelligence Engine untuk agregasi omset & tren produk, (2) Opportunity Matcher Engine untuk pencocokan program kurasi & bantuan Jawa Barat berbasis skor %, dan (3) AI Growth Assistant berbasis RAG yang memberikan jawaban grounded dari dokumen resmi usaha.',
    },
    {
      q: 'Apakah saya bisa mencoba APH YAH secara gratis?',
      a: 'Ya! Anda dapat langsung mendaftar secara gratis atau mencoba akun demo "Kopi Karawang Heritage" dengan mengklik tombol "Demo Account" di navigasi atas tanpa perlu melakukan pendaftaran terlebih dahulu.',
    },
    {
      q: 'Bagaimana cara memasukkan data penjualan harian ke dalam platform?',
      a: 'Anda dapat mengunggah file CSV transaksi penjualan melalui menu Data Usaha. Platform secara otomatis memvalidasi per-baris data dan menyinkronkannya ke BI Dashboard dan Recommendation Engine.',
    },
    {
      q: 'Apakah platform ini mendukung seluruh kota & kabupaten di Jawa Barat?',
      a: 'Tentu. APH YAH mencakup seluruh 27 Kabupaten/Kota di Jawa Barat (Bandung, Karawang, Bekasi, Bogor, Cirebon, Sukabumi, Tasikmalaya, dll) dengan basis data peluang yang disesuaikan dengan fokus program Dinas Koperasi & UMKM daerah setempat.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-sky-500 selection:text-white overflow-x-hidden">
      {/* Top Floating Header Navbar */}
      <header className="border-b border-slate-200/80 bg-white/85 backdrop-blur-xl sticky top-0 z-50 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/25 animate-pulse-glow">
              <Sparkles className="w-6 h-6 text-white font-bold" />
            </div>
            <div>
              <span className="font-black text-2xl tracking-tight text-slate-900 flex items-center gap-2">
                APH YAH
                <span className="text-[10px] font-extrabold tracking-widest px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-700 border border-sky-300">
                  NEXT-GEN TECH
                </span>
              </span>
              <p className="text-[11px] text-sky-600 font-semibold">UMKM Business Growth Intelligence</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600" aria-label="Main Navigation">
            <a href="#concept" className="hover:text-sky-600 transition-colors">Platform Journey</a>
            <a href="#calculator" className="hover:text-sky-600 transition-colors">Growth Calculator</a>
            <a href="#engines" className="hover:text-sky-600 transition-colors">3 Intelligence Engines</a>
            <a href="#regions" className="hover:text-sky-600 transition-colors">Jabar Hubs</a>
            <a href="#faq" className="hover:text-sky-600 transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDemoLogin}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-600 text-xs font-bold border border-slate-200 hover:border-sky-300 transition-all shadow-2xs active:scale-95"
            >
              Demo Account
            </button>
            <Link
              to="/login"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs font-bold shadow-md shadow-sky-500/25 transition-all flex items-center gap-1.5 active:scale-95"
            >
              <span>Mulai Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-6 max-w-7xl mx-auto text-center" aria-label="Hero Introduction">
        {/* Gen-Z Glowing Tech Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 border border-sky-300 text-sky-700 text-xs font-extrabold mb-8 shadow-xs animate-float">
          <Zap className="w-4 h-4 text-sky-500 animate-bounce" />
          <span>NEXT-GEN UMKM GROWTH ENGINE JAWA BARAT</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight mb-6">
          From Business Data to <br />
          <span className="gradient-text-hero">Business Growth</span>
        </h1>

        <p className="text-slate-600 text-base md:text-xl max-w-3xl mx-auto leading-relaxed mb-10 font-medium">
          APH YAH mengolah data penjualan harian menjadi arah pertumbuhan bisnis terukur, menghubungkan usaha Anda dengan peluang kurasi ekspor & pembiayaan di Jawa Barat, serta mendampingi aksi cepat via RAG AI Consultant.
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

        {/* Tech-Savvy Hero Image Showcase */}
        <div className="relative max-w-5xl mx-auto mb-16 rounded-3xl p-3 bg-white/60 border border-slate-200 shadow-2xl shadow-sky-500/10">
          <img
            src="/images/genz_hero.png"
            alt="APH YAH Next-Gen Tech Savvy Business Growth Intelligence Dashboard Showcase"
            className="w-full h-auto rounded-2xl shadow-lg border border-slate-200 object-cover max-h-[520px]"
            loading="eager"
          />
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-full border border-sky-200 shadow-xl flex items-center gap-4 text-xs font-bold text-slate-800">
            <span className="flex items-center gap-1.5 text-sky-600">
              <Cpu className="w-4 h-4 text-sky-500" /> Powered by RAG AI Architecture
            </span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1.5 text-indigo-600">
              <Award className="w-4 h-4 text-indigo-500" /> Supabase PostgreSQL Connected
            </span>
          </div>
        </div>

        {/* Core Value Journey Flow Banner */}
        <div id="concept" className="glass-panel rounded-3xl p-8 border border-slate-200/90 shadow-xl max-w-5xl mx-auto bg-white/90">
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs uppercase tracking-widest font-extrabold text-sky-600 flex items-center gap-2">
              <Globe2 className="w-4 h-4" /> CORE JOURNEY PLATFORM
            </p>
            <span className="text-[11px] px-3 py-1 rounded-full bg-sky-50 text-sky-700 font-bold border border-sky-200">
              5-Step Closed Loop
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-sky-300 transition-all text-center">
              <Database className="w-7 h-7 text-sky-500 mx-auto mb-2" />
              <div className="font-extrabold text-xs text-slate-800">1. DATA</div>
              <div className="text-[10px] text-slate-500 font-medium">CSV & Profiles</div>
            </div>
            <div className="hidden md:block text-slate-300 font-extrabold text-lg">→</div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all text-center">
              <TrendingUp className="w-7 h-7 text-blue-500 mx-auto mb-2" />
              <div className="font-extrabold text-xs text-slate-800">2. INSIGHT</div>
              <div className="text-[10px] text-slate-500 font-medium">BI Intelligence</div>
            </div>
            <div className="hidden md:block text-slate-300 font-extrabold text-lg">→</div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-all text-center">
              <Target className="w-7 h-7 text-indigo-500 mx-auto mb-2" />
              <div className="font-extrabold text-xs text-slate-800">3. OPPORTUNITY</div>
              <div className="text-[10px] text-slate-500 font-medium">Matcher Engine</div>
            </div>
            <div className="hidden md:block text-slate-300 font-extrabold text-lg">→</div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-teal-300 transition-all text-center">
              <MessageSquare className="w-7 h-7 text-teal-500 mx-auto mb-2" />
              <div className="font-extrabold text-xs text-slate-800">4. ACTION</div>
              <div className="text-[10px] text-slate-500 font-medium">RAG Assistant</div>
            </div>
            <div className="hidden md:block text-slate-300 font-extrabold text-lg">→</div>
            <div className="p-4 rounded-2xl bg-sky-500 text-white border border-sky-400 text-center col-span-2 md:col-span-1 shadow-md shadow-sky-500/25">
              <Zap className="w-7 h-7 text-amber-300 mx-auto mb-2 animate-bounce" />
              <div className="font-extrabold text-xs">5. GROWTH</div>
              <div className="text-[10px] text-sky-100 font-medium">Scalable UMKM</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Growth Estimator Calculator */}
      <section id="calculator" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-200/80" aria-label="Interactive Growth Estimator Calculator">
        <div className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 rounded-3xl p-8 lg:p-12 text-white shadow-2xl shadow-sky-500/20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-extrabold uppercase tracking-wider">
              <Calculator className="w-4 h-4 text-sky-200" />
              <span>INTERACTIVE GROWTH ESTIMATOR</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight leading-tight">
              Hitung Estimasi Potensi Pertumbuhan Omset Usaha Anda
            </h2>
            <p className="text-sky-100 text-sm leading-relaxed font-medium">
              Geser slider omset bulanan usaha Anda saat ini untuk mensimulasikan kenaikan omset dan jumlah program bantuan terkurasi yang dapat dicocokkan oleh APH YAH.
            </p>

            {/* Slider Component */}
            <div className="space-y-3 pt-2 bg-white/10 p-6 rounded-2xl border border-white/20">
              <div className="flex items-center justify-between text-xs font-extrabold">
                <span className="text-sky-100">Omset Bulanan Saat Ini:</span>
                <span className="text-lg text-white font-black">{formatIDR(monthlyRevenue)}</span>
              </div>
              <input
                type="range"
                min={5000000}
                max={150000000}
                step={5000000}
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                className="w-full h-3 bg-white/30 rounded-lg appearance-none cursor-pointer accent-sky-300"
              />
              <div className="flex justify-between text-[10px] text-sky-200 font-bold">
                <span>Rp 5 Juta</span>
                <span>Rp 75 Juta</span>
                <span>Rp 150 Juta</span>
              </div>
            </div>
          </div>

          {/* Calculator Results Card */}
          <div className="bg-white text-slate-900 p-8 rounded-3xl border border-white/30 shadow-2xl space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[10px] font-black uppercase tracking-wider text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                PROYEKSI HASIL INTELLIGENCE
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-2">Estimasi Performa 6 Bulan</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200">
                <span className="text-xs text-slate-500 font-bold block mb-1">Kenaikan Omset Est.</span>
                <span className="text-2xl font-black text-sky-600">+{Math.round(estGrowthRate * 100)}%</span>
                <span className="text-[10px] text-sky-700 font-medium block mt-1">+{formatIDR(estRevenueGain)} / bln</span>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200">
                <span className="text-xs text-slate-500 font-bold block mb-1">Potensi Omset Baru</span>
                <span className="text-2xl font-black text-indigo-600">{formatIDR(estTotalRevenue)}</span>
                <span className="text-[10px] text-indigo-700 font-medium block mt-1">Proyeksi target bulanan</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-medium">
              <span className="text-slate-600">Peluang Jabar Cocok:</span>
              <span className="font-black text-slate-900 bg-white px-3 py-1 rounded-full border border-slate-200 text-sky-600">
                {matchedProgramsCount} Program Teridentifikasi
              </span>
            </div>

            <button
              onClick={handleDemoLogin}
              className="w-full py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-extrabold text-xs shadow-lg shadow-sky-500/25 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Uji Proyeksi Ini di Demo Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 3 Intelligence Engines Showcase */}
      <section id="engines" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-200/80" aria-label="3 Intelligence Engines Architecture">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            ENGINE ARCHITECTURE
          </span>
          <h2 className="text-3xl font-black text-slate-900 mt-3 mb-4 tracking-tight">
            3 Modular Intelligence Engines
          </h2>
          <p className="text-slate-600 text-sm font-medium">
            Tiga mesin cerdas yang mengolah data usaha secara terpadu untuk percepatan skala bisnis UMKM Jawa Barat.
          </p>
        </div>

        {/* RAG Tech Visual Graphics */}
        <div className="mb-12 max-w-4xl mx-auto rounded-3xl p-3 bg-white border border-slate-200 shadow-xl overflow-hidden">
          <img
            src="/images/ai_rag_tech.png"
            alt="AI Growth Assistant scanning knowledge documents using RAG Architecture"
            className="w-full h-auto rounded-2xl object-cover max-h-[380px]"
            loading="lazy"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Engine 1 */}
          <div className="card-genz p-8 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 border border-sky-300 flex items-center justify-center text-sky-600 font-black text-xl mb-6 shadow-xs">
              1
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-sky-600 mb-1">UNDERSTAND DATA</div>
            <h3 className="text-xl font-black text-slate-900 mb-3">Business Intelligence</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-6 font-medium">
              Menjawab <span className="text-sky-700 font-bold">"Bagaimana kondisi riil penjualan usaha saya?"</span> dengan analisis otomatis omset, tren transaksi, dan produk favorit.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-500" />
                <span>KPI Revenue Real-time</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-500" />
                <span>Visualisasi Grafik Interactive</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-500" />
                <span>Insight Cards Produk Unggulan</span>
              </li>
            </ul>
          </div>

          {/* Engine 2 */}
          <div className="card-genz p-8 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 border border-blue-300 flex items-center justify-center text-blue-600 font-black text-xl mb-6 shadow-xs">
              2
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">DISCOVER OPPORTUNITIES</div>
            <h3 className="text-xl font-black text-slate-900 mb-3">Opportunity Matcher</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-6 font-medium">
              Menjawab <span className="text-blue-700 font-bold">"Peluang apa di Jawa Barat yang cocok dengan bisnis saya?"</span> menggunakan scoring kontekstual 0-100%.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500" />
                <span>Skor Match Relevansi %</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500" />
                <span>Program Kurasi & Halal Jabar</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500" />
                <span>Penjelasan Provenansi "Why Match"</span>
              </li>
            </ul>
          </div>

          {/* Engine 3 */}
          <div className="card-genz p-8 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 border border-indigo-300 flex items-center justify-center text-indigo-600 font-black text-xl mb-6 shadow-xs">
              3
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">TAKE CONCRETE ACTION</div>
            <h3 className="text-xl font-black text-slate-900 mb-3">AI Growth Assistant</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-6 font-medium">
              Menjawab <span className="text-indigo-700 font-bold">"Bagaimana langkah konkret mendaftar peluang?"</span> dengan konsul berbasis RAG Knowledge Base.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                <span>Grounded RAG tanpa Halusinasi</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                <span>Attribusi Dokumen Sumber (Sources)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                <span>Pendampingan 24/7 Responsif</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Interactive West Java Regional Explorer */}
      <section id="regions" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-200/80" aria-label="Interactive West Java Regional Explorer">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            REGIONAL COVERAGE
          </span>
          <h2 className="text-3xl font-black text-slate-900 mt-3 mb-4 tracking-tight">
            Jawa Barat SME Regional Hubs
          </h2>
          <p className="text-slate-600 text-sm font-medium">
            Pilih Kabupaten/Kota di Jawa Barat untuk melihat sektor prioritas & program bantuan terintegrasi.
          </p>
        </div>

        {/* Region Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {Object.keys(regionsData).map((r) => (
            <button
              key={r}
              onClick={() => setActiveRegion(r)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-xs ${
                activeRegion === r
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25 scale-105'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-sky-300 hover:bg-sky-50'
              }`}
            >
              📍 {r}
            </button>
          ))}
        </div>

        {/* Active Region Detail Card */}
        {regionsData[activeRegion] && (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                  {regionsData[activeRegion].badge}
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">Fokus Usaha {activeRegion}</h3>
              </div>
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">{regionsData[activeRegion].contact}</span>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sektor Prioritas Daerah:</span>
              <p className="text-sm font-extrabold text-slate-800 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                {regionsData[activeRegion].sector}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Program & Bantuan Aktif:</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {regionsData[activeRegion].programs.map((p, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 text-xs font-bold text-sky-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Featured Case Study / SME Growth Showcase */}
      <section id="preview" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-200/80" aria-label="SME Growth Showcase Case Study">
        <div className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 rounded-3xl p-8 lg:p-12 text-white shadow-2xl shadow-sky-500/20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-extrabold uppercase tracking-wider">
              SUCCESS STORY UMKM JABAR
            </span>
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight leading-tight">
              Kopi Karawang Heritage: Dari Usaha Lokal Ke Pasar Ekspor
            </h2>
            <p className="text-sky-100 text-sm leading-relaxed font-medium">
              Dengan mengunggah data transaksi ke APH YAH, Kopi Karawang mendapatkan wawasan bahwa varian Robusta Karawang memiliki margin tertinggi. Platform lalu secara otomatis mencocokkan usaha dengan <strong className="text-white">Program Kurasi Ekspor Disindag Jabar (92% Match)</strong> dan mendampingi proses pendaftaran melalui AI Assistant.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white/10 border border-white/20">
                <div className="text-2xl font-black">+18%</div>
                <div className="text-xs text-sky-100">Pertumbuhan Omset Bulanan</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 border border-white/20">
                <div className="text-2xl font-black">92% Match</div>
                <div className="text-xs text-sky-100">Kurasi Ekspor Disindag</div>
              </div>
            </div>
            <button
              onClick={handleDemoLogin}
              className="px-6 py-3.5 rounded-xl bg-white text-sky-700 font-extrabold text-xs shadow-lg hover:bg-sky-50 transition-all flex items-center gap-2 active:scale-95"
            >
              <span>Jelajahi Demo Kopi Karawang</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="rounded-2xl p-2 bg-white/20 border border-white/30 overflow-hidden shadow-xl">
            <img
              src="/images/umkm_growth.png"
              alt="West Java SME Coffee Roaster Analyzing Business Growth Metrics with APH YAH Platform"
              className="w-full h-auto rounded-xl object-cover max-h-[380px]"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Interactive FAQ Accordion Section */}
      <section id="faq" className="py-20 px-6 max-w-4xl mx-auto border-t border-slate-200/80" aria-label="Frequently Asked Questions">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-bold mb-3 border border-sky-300">
            <HelpCircle className="w-4 h-4 text-sky-500" />
            <span>PERTANYAAN UMUM</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Frequently Asked Questions</h2>
          <p className="text-slate-600 text-sm font-medium mt-2">Segala sesuatu yang perlu Anda ketahui tentang APH YAH Platform.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-all"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full p-5 text-left flex items-center justify-between font-extrabold text-sm text-slate-900 hover:text-sky-600 transition-colors focus:outline-none"
              >
                <span>{faq.q}</span>
                {openFaq === index ? (
                  <ChevronUp className="w-5 h-5 text-sky-500 shrink-0 ml-4" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 shrink-0 ml-4" />
                )}
              </button>
              {openFaq === index && (
                <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed font-medium border-t border-slate-100 bg-slate-50/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Rich Footer with Social Media & Contact */}
      <footer className="border-t border-slate-200/80 bg-white pt-16 pb-12 px-6" role="contentinfo">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-black text-xl text-slate-900 tracking-tight">APH YAH</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Integrated UMKM Business Growth Intelligence Platform khusus Jawa Barat. Mengubah data transaksi menjadi arah pertumbuhan terukur.
            </p>
            <div className="flex items-center gap-3 pt-2 text-slate-500">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-slate-100 hover:bg-sky-50 hover:text-sky-600 transition-colors" title="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-slate-100 hover:bg-sky-50 hover:text-sky-600 transition-colors" title="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-slate-100 hover:bg-sky-50 hover:text-sky-600 transition-colors" title="Twitter / X">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-slate-100 hover:bg-sky-50 hover:text-sky-600 transition-colors" title="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="https://github.com/Couraa0/Skripsi" target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-slate-100 hover:bg-sky-50 hover:text-sky-600 transition-colors" title="GitHub Repository">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav Links Col */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">Platform Navigation</h3>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li><a href="#concept" className="hover:text-sky-600 transition-colors">Core Journey Flow</a></li>
              <li><a href="#calculator" className="hover:text-sky-600 transition-colors">Growth Estimator</a></li>
              <li><a href="#engines" className="hover:text-sky-600 transition-colors">3 Intelligence Engines</a></li>
              <li><a href="#regions" className="hover:text-sky-600 transition-colors">Jabar Regional Hubs</a></li>
              <li><a href="#faq" className="hover:text-sky-600 transition-colors">Pertanyaan Umum (FAQ)</a></li>
            </ul>
          </div>

          {/* Regional Hubs Col */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">Jawa Barat SME Hubs</h3>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-sky-500" /> Kabupaten Karawang (Agro-Kopi)</li>
              <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-sky-500" /> Kota Bandung (Kuliner & Fashion)</li>
              <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-sky-500" /> Kabupaten Bogor (Craft & Manufaktur)</li>
              <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-sky-500" /> Kota Cirebon (Batik & Olahan Laut)</li>
              <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-sky-500" /> Kabupaten Purwakarta (Kuliner Khas)</li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">Kontak & Dukungan</h3>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-500 shrink-0" />
                <a href="mailto:Muhammadrakhasyamputra@gmail.com" className="hover:text-sky-600 transition-colors">Muhammadrakhasyamputra@gmail.com</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-500 shrink-0" />
                <a href="https://wa.me/6287871310560" target="_blank" rel="noopener noreferrer" className="hover:text-sky-600 transition-colors">+62 878-7131-0560</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                <span>Jl. HS.Ronggo Waluyo, Puseurjaya, Telukjambe Timur, Karawang, Jawa Barat 41361</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
          <p>© 2026 APH YAH Platform — Integrated UMKM Business Growth Intelligence. All rights reserved.</p>
          <p className="font-bold text-sky-600">"Dari Data Usaha Menjadi Arah Pertumbuhan"</p>
        </div>
      </footer>
    </div>
  );
};
