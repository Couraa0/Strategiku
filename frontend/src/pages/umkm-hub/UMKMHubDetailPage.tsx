import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  MapPin,
  CheckCircle2,
  Download,
  ShieldCheck,
  Calendar,
  Sparkles,
  ChevronRight,
  Users,
  Star,
  DollarSign,
  TrendingUp,
  CreditCard,
  ShoppingBag,
} from 'lucide-react';
import { UMKM_HUB_DATA, UMKMHubItem } from '../../data/umkmHubData';

export const UMKMHubDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [downloading, setDownloading] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);

  // Find UMKM item by ID
  const item = UMKM_HUB_DATA.find((u) => u.id === id) || UMKM_HUB_DATA[0];

  // Get 3 similar UMKM items
  const similarItems = UMKM_HUB_DATA.filter((u) => u.id !== item.id).slice(0, 3);

  const handleDownloadProposal = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert(`Proposal Lengkap untuk ${item.title} (${item.code}) berhasil diunduh.`);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-sky-500 selection:text-white">
      {/* Top Navbar */}
      <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-xl sticky top-0 z-50 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <button onClick={() => navigate('/umkm-hub')} className="hover:opacity-90 transition-opacity">
            <img src="/logo/Logo+Text+Landscape.png" alt="Strategiku Logo" className="h-10 w-auto" />
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/umkm-hub')}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-600 text-xs font-bold border border-slate-200 transition-all flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Katalog</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* White-and-Blue Hero Header */}
        <div className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 text-white p-8 md:p-12 rounded-3xl space-y-4 shadow-xl shadow-sky-500/20 relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-sky-100 font-medium flex-wrap">
            <Link to="/" className="hover:underline">Beranda</Link>
            <span>/</span>
            <Link to="/umkm-hub" className="hover:underline">UMKM Hub</Link>
            <span>/</span>
            <span className="text-sky-200">{item.sektor}</span>
            <span>/</span>
            <span className="text-white font-bold">{item.title}</span>
          </div>

          {/* Badges with Rating */}
          <div className="flex items-center gap-2 flex-wrap pt-2">
            <span className="px-3 py-1 rounded-full bg-white/20 border border-white/30 text-xs font-extrabold text-white">
              {item.sektor}
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-900 text-xs font-black flex items-center gap-1 shadow-md">
              <Star className="w-4 h-4 fill-slate-900 text-slate-900" />
              <span>{item.rating} / 5.0</span>
              <span className="text-slate-700 font-bold">({item.reviewCount} ulasan)</span>
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white/15 text-xs font-mono font-bold text-sky-100 border border-white/20">
              {item.code}
            </span>
          </div>

          {/* Title & Subtitle */}
          <div className="space-y-1 pt-2">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight">{item.title}</h1>
            <p className="text-sm md:text-base text-sky-100 font-semibold">
              oleh Tim <span className="text-white font-bold">{item.team}</span> • {item.company}
            </p>
          </div>

          {/* Location & Category */}
          <div className="flex items-center gap-4 text-xs md:text-sm text-sky-100 pt-2 font-medium">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-sky-200" />
              <span>{item.kota}, {item.provinsi}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-amber-300" />
              <span>Kategori: {item.kategori}</span>
            </span>
          </div>
        </div>

        {/* 2/3 Content + 1/3 Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Innovation & Business Snapshot Card */}
            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div>
                <h3 className="text-lg font-black text-slate-900">Snapshot Usaha & Produk</h3>
                <p className="text-xs text-slate-500 font-medium">Ringkasan profil usaha dalam poin-poin utama</p>
              </div>
              <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium pt-2 border-t border-slate-100">
                {item.full_detail.snapshot}
              </p>
            </div>

            {/* Financial Performance Highlights Card (Replaces Problem Statement!) */}
            <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-sky-50 p-7 rounded-3xl border-2 border-emerald-300 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-800 font-black text-lg">
                  <DollarSign className="w-6 h-6 text-emerald-600 shrink-0" />
                  <span>Kinerja Finansial & Omset Usaha</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-200 text-emerald-800 text-xs font-black flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{item.growthRate}</span>
                </span>
              </div>

              {/* 3 Metric Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-2xs space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">OMSET TAHUNAN</span>
                  <span className="text-base font-black text-emerald-700">{item.totalRevenue}</span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-2xs space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">RATA-RATA BULANAN</span>
                  <span className="text-base font-black text-slate-800">{item.monthlyRevenue}</span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-2xs space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">VOLUME TRANSAKSI</span>
                  <span className="text-base font-black text-sky-700">{item.monthlyOrders}</span>
                </div>
              </div>

              <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium pt-2 border-t border-emerald-200/80">
                {item.full_detail.financial_highlights}
              </p>
            </div>

            {/* Competitive Advantages (Green Accent Card) */}
            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-black text-base">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Keunggulan Kompetitif Usaha</span>
              </div>
              <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium pt-2 border-t border-slate-100">
                {item.full_detail.competitive_advantages}
              </p>
            </div>

            {/* Value Proposition & Target Market */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Value Proposition</span>
                </div>
                <p className="text-xs text-slate-800 font-medium leading-relaxed">
                  {item.full_detail.value_proposition}
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span>Target Pasar</span>
                </div>
                <p className="text-xs text-slate-800 font-medium leading-relaxed">
                  {item.full_detail.target_market}
                </p>
              </div>
            </div>

            {/* Innovation Readiness */}
            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div>
                <h3 className="text-base font-black text-slate-900">Kesiapan Operasional & Produksi</h3>
                <p className="text-xs text-slate-500 font-medium">Tingkat kapasitas pasokan produk</p>
              </div>
              <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium pt-2 border-t border-slate-100">
                {item.full_detail.innovation_readiness}
              </p>
            </div>
          </div>

          {/* Right Column Sidebar (1/3 width) */}
          <div className="space-y-6">
            {/* Download CTA Card */}
            <div className="bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 text-white p-6 rounded-3xl space-y-4 shadow-xl shadow-sky-500/20">
              <div className="space-y-1">
                <h3 className="text-base font-black">Proposal Investasi & Kemitraan</h3>
                <p className="text-xs text-sky-100 font-medium leading-relaxed">
                  Unduh ringkasan proposal kemitraan usaha lengkap untuk kerja sama pasokan grosir atau investasi.
                </p>
              </div>

              <button
                onClick={handleDownloadProposal}
                disabled={downloading}
                className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-sky-50 text-sky-700 font-black text-xs shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>{downloading ? 'Mengunduh PDF...' : 'Download Proposal PDF'}</span>
              </button>
            </div>

            {/* Schedule Pitching Card */}
            <div className="bg-white border border-slate-200 p-6 rounded-3xl text-slate-900 space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-sky-600">
                <Calendar className="w-4 h-4 text-sky-500" />
                <span>Hubungi Pemilik Usaha</span>
              </div>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Jadwalkan diskusi kemitraan B2B langsung dengan pemilik UMKM {item.title}.
              </p>
              <button
                onClick={() => setShowDemoModal(true)}
                className="w-full py-3 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold border border-sky-200 transition-all"
              >
                Kirim Pesan Kemitraan
              </button>
            </div>

            {/* Details Table Card */}
            <div className="bg-white border border-slate-200 p-6 rounded-3xl text-slate-900 space-y-4 shadow-sm">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-sky-600">
                Detail Usaha & Legalitas
              </h4>

              <div className="space-y-3 text-xs divide-y divide-slate-100">
                <div className="flex justify-between pt-1">
                  <span className="text-slate-500">KODE REGISTRASI</span>
                  <span className="font-mono font-bold text-slate-800">{item.code}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-500">NAMA TIM / PEMILIK</span>
                  <span className="font-bold text-slate-800">{item.team}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-500">BADAN HUKUM / PT</span>
                  <span className="font-bold text-sky-600">{item.company}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-500">KOTA / PROVINSI</span>
                  <span className="font-medium text-slate-700">{item.kota}, {item.provinsi}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-500">KATEGORI BINAAN</span>
                  <span className="font-bold text-emerald-600">{item.kategori}</span>
                </div>
              </div>
            </div>

            {/* Tags Card */}
            <div className="bg-white border border-slate-200 p-6 rounded-3xl text-slate-900 space-y-3 shadow-sm">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-sky-600">
                Kategori Produk
              </h4>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-sky-50 border border-sky-200 text-xs font-semibold text-sky-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* HKI Badge */}
            <div className="bg-emerald-50 border border-emerald-300 p-6 rounded-3xl text-emerald-900 space-y-2 shadow-xs">
              <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Status Legalitas & HKI</span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-relaxed font-medium">
                {item.full_detail.hki_status}
              </p>
            </div>
          </div>
        </div>

        {/* Similar UMKM Grid */}
        <div className="space-y-4 pt-6 border-t border-slate-200">
          <h3 className="text-xl font-black text-slate-900 tracking-tight">
            USAHA UMKM SERUPA DI JAWA BARAT
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarItems.map((sim) => (
              <div
                key={sim.id}
                onClick={() => navigate(`/umkm-hub/${sim.id}`)}
                className="bg-white hover:bg-sky-50/40 border border-slate-200 hover:border-sky-400 rounded-3xl p-5 text-slate-900 flex flex-col justify-between shadow-md hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-sky-100 border border-sky-300 text-[10px] font-extrabold text-sky-700">
                      {sim.sektor}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-[10px] font-black text-amber-700 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                      <span>{sim.rating}</span>
                    </span>
                  </div>

                  <h4 className="text-lg font-black text-slate-900 group-hover:text-sky-600 transition-colors leading-tight">
                    {sim.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {sim.short_description}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold text-slate-700 truncate">{sim.kota}, {sim.provinsi}</span>
                  <ChevronRight className="w-4 h-4 text-sky-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-black text-slate-900">Kirim Pesan Kemitraan</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Pesan permintaan kemitraan dengan usaha <span className="font-bold text-sky-600">{item.title}</span> telah dikirim ke kontak pengelola.
            </p>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowDemoModal(false)}
                className="px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-white font-extrabold text-xs rounded-xl shadow-md"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
