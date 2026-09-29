import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Star,
  Users,
  MapPin,
  ChevronRight,
  Sparkles,
  Filter,
  TrendingUp,
  Folder,
  DollarSign,
  ChevronDown,
} from 'lucide-react';
import { UMKM_HUB_DATA, UMKMHubItem } from '../../data/umkmHubData';

export const UMKMHubPage: React.FC = () => {
  const navigate = useNavigate();

  // Filter States
  const [selectedRating, setSelectedRating] = useState<string>('Semua Rating');
  const [selectedSektor, setSelectedSektor] = useState<string>('Semua Sektor');
  const [selectedKategori, setSelectedKategori] = useState<string>('Semua Kategori');
  const [selectedKota, setSelectedKota] = useState<string>('Semua Kota');
  const [selectedOmset, setSelectedOmset] = useState<string>('Semua Omset');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Dynamic Unique Filter Options
  const uniqueSektors = useMemo(() => Array.from(new Set(UMKM_HUB_DATA.map((u) => u.sektor))), []);
  const uniqueKategoris = useMemo(() => Array.from(new Set(UMKM_HUB_DATA.map((u) => u.kategori))), []);
  const uniqueKotas = useMemo(() => Array.from(new Set(UMKM_HUB_DATA.map((u) => u.kota))), []);

  // Filter Logic
  const filteredData = useMemo(() => {
    return UMKM_HUB_DATA.filter((item) => {
      let matchRating = true;
      if (selectedRating === '4.9+') matchRating = item.rating >= 4.9;
      if (selectedRating === '4.8+') matchRating = item.rating >= 4.8;
      if (selectedRating === '5.0') matchRating = item.rating === 5.0;

      const matchSektor = selectedSektor === 'Semua Sektor' || item.sektor === selectedSektor;
      const matchKategori = selectedKategori === 'Semua Kategori' || item.kategori === selectedKategori;
      const matchKota = selectedKota === 'Semua Kota' || item.kota === selectedKota;
      const matchOmset = selectedOmset === 'Semua Omset' || item.omsetRange === selectedOmset;
      const matchQuery =
        !searchQuery.trim() ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.short_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.totalRevenue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchRating && matchSektor && matchKategori && matchKota && matchOmset && matchQuery;
    });
  }, [selectedRating, selectedSektor, selectedKategori, selectedKota, selectedOmset, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-sky-500 selection:text-white">
      {/* Top Header Navbar */}
      <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-xl sticky top-0 z-50 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/')} className="hover:opacity-90 transition-opacity">
              <img src="/logo/Logo+Text+Landscape.png" alt="Strategiku Logo" className="h-10 w-auto" />
            </button>
            <span className="hidden sm:inline-block text-[10px] font-extrabold tracking-wider px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-700 border border-sky-300">
              PUBLIC UMKM HUB
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-600 text-xs font-bold border border-slate-200 transition-all"
            >
              Masuk Dashboard
            </button>
            <button
              onClick={() => navigate('/register')}
              className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-extrabold text-xs shadow-md shadow-sky-500/25 transition-all active:scale-95"
            >
              Daftar Usaha UMKM
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Top Control & Banner (White & Blue Gradient Header) */}
        <div className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 p-6 md:p-8 rounded-3xl text-white shadow-xl shadow-sky-500/20 space-y-6 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-3 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-extrabold uppercase tracking-wider">
                  KATALOG UMKM SE-JAWA BARAT
                </span>
                <span className="text-xs text-sky-100 font-medium">Terbuka untuk Publik & Investor</span>
              </div>
              <h1 className="text-2xl md:text-4xl font-black tracking-tight">
                Direktori Produk, Omset & Performa Finansial UMKM
              </h1>
              <p className="text-xs md:text-sm text-sky-100 mt-1 max-w-2xl font-medium leading-relaxed">
                Temukan profil usaha UMKM Jawa Barat lengkap dengan ulasan rating, indikator omset tahunan, pertumbuhan penjualan, dan kesiapan kemitraan B2B.
              </p>
            </div>
          </div>

          {/* Styled Custom Filter Dropdowns Grid */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
            {/* 1. Rating Filter Dropdown */}
            <div className="relative group">
              <Star className="w-4 h-4 text-amber-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="w-full bg-white text-slate-800 font-black text-xs pl-10 pr-9 py-3 rounded-2xl border-2 border-white/80 hover:border-sky-300 shadow-md shadow-sky-900/10 focus:outline-none focus:ring-4 focus:ring-sky-300/40 transition-all appearance-none cursor-pointer truncate"
              >
                <option value="Semua Rating">Semua Rating ⭐️</option>
                <option value="4.9+">Rating 4.9+ Stars</option>
                <option value="4.8+">Rating 4.8+ Stars</option>
                <option value="5.0">Rating 5.0 (Sempurna)</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
            </div>

            {/* 2. Sektor Filter Dropdown */}
            <div className="relative group">
              <Folder className="w-4 h-4 text-sky-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
              <select
                value={selectedSektor}
                onChange={(e) => setSelectedSektor(e.target.value)}
                className="w-full bg-white text-slate-800 font-black text-xs pl-10 pr-9 py-3 rounded-2xl border-2 border-white/80 hover:border-sky-300 shadow-md shadow-sky-900/10 focus:outline-none focus:ring-4 focus:ring-sky-300/40 transition-all appearance-none cursor-pointer truncate"
              >
                <option value="Semua Sektor">Semua Sektor Industri</option>
                {uniqueSektors.map((sektor) => (
                  <option key={sektor} value={sektor}>{sektor}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
            </div>

            {/* 3. Kategori Filter Dropdown */}
            <div className="relative group">
              <Users className="w-4 h-4 text-indigo-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
              <select
                value={selectedKategori}
                onChange={(e) => setSelectedKategori(e.target.value)}
                className="w-full bg-white text-slate-800 font-black text-xs pl-10 pr-9 py-3 rounded-2xl border-2 border-white/80 hover:border-sky-300 shadow-md shadow-sky-900/10 focus:outline-none focus:ring-4 focus:ring-sky-300/40 transition-all appearance-none cursor-pointer truncate"
              >
                <option value="Semua Kategori">Semua Kategori Binaan</option>
                {uniqueKategoris.map((kat) => (
                  <option key={kat} value={kat}>{kat}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
            </div>

            {/* 4. Kota Filter Dropdown */}
            <div className="relative group">
              <MapPin className="w-4 h-4 text-rose-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
              <select
                value={selectedKota}
                onChange={(e) => setSelectedKota(e.target.value)}
                className="w-full bg-white text-slate-800 font-black text-xs pl-10 pr-9 py-3 rounded-2xl border-2 border-white/80 hover:border-sky-300 shadow-md shadow-sky-900/10 focus:outline-none focus:ring-4 focus:ring-sky-300/40 transition-all appearance-none cursor-pointer truncate"
              >
                <option value="Semua Kota">Semua Kota / Wilayah</option>
                {uniqueKotas.map((kota) => (
                  <option key={kota} value={kota}>{kota}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
            </div>

            {/* 5. Financial / Omset Range Dropdown (Replaces Problem Statement!) */}
            <div className="relative group">
              <DollarSign className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
              <select
                value={selectedOmset}
                onChange={(e) => setSelectedOmset(e.target.value)}
                className="w-full bg-white text-slate-800 font-black text-xs pl-10 pr-9 py-3 rounded-2xl border-2 border-white/80 hover:border-sky-300 shadow-md shadow-sky-900/10 focus:outline-none focus:ring-4 focus:ring-sky-300/40 transition-all appearance-none cursor-pointer truncate"
              >
                <option value="Semua Omset">Semua Skala Omset</option>
                <option value="100 - 500 Juta">Rp 100M - 500M / thn</option>
                <option value="500 Juta - 1 Miliar">Rp 500M - 1 Miliar / thn</option>
                <option value="> 1 Miliar">&gt; Rp 1 Miliar / thn</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
            </div>
          </div>

          {/* Search Input Box */}
          <div className="relative z-10 pt-1">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari berdasarkan nama usaha, produk, kota, omset, atau kata kunci..."
                className="w-full bg-white text-slate-900 placeholder-slate-400 text-xs md:text-sm font-bold rounded-2xl pl-5 pr-12 py-3.5 shadow-xl border-2 border-white/80 focus:outline-none focus:ring-4 focus:ring-sky-300/50"
              />
              <Search className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Dynamic Count Banner */}
        <div className="flex items-center justify-between px-2">
          <p className="text-sm font-bold text-slate-700">
            Menampilkan <span className="text-sky-600 font-black text-base">{filteredData.length}</span> usaha UMKM terverifikasi
          </p>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Terintegrasi Financial BI Jawa Barat</span>
          </div>
        </div>

        {/* UMKM Cards Grid (No Problem Statement, Featuring Financial Metrics!) */}
        {filteredData.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center space-y-3 border border-slate-200 shadow-sm">
            <Filter className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-extrabold text-slate-800">Tidak ada UMKM yang cocok</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Coba sesuaikan kata kunci pencarian atau ubah filter di bagian atas.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/umkm-hub/${item.id}`)}
                className="bg-white hover:bg-sky-50/40 border border-slate-200 hover:border-sky-400/80 rounded-3xl p-6 text-slate-900 flex flex-col justify-between shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group relative"
              >
                <div className="space-y-4">
                  {/* Top Badges (Sektor & Star Rating) */}
                  <div className="flex items-center justify-between gap-1 flex-wrap">
                    <span className="px-3 py-1 rounded-full bg-sky-100 border border-sky-300 text-[10px] font-black text-sky-700 truncate max-w-[160px]">
                      {item.sektor}
                    </span>

                    <span className="px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-[10px] font-black text-amber-700 flex items-center gap-1 shadow-2xs">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      <span>{item.rating}</span>
                      <span className="text-slate-400 font-normal">({item.reviewCount})</span>
                    </span>
                  </div>

                  {/* Avatar & Code */}
                  <div className="flex items-center gap-3 pt-1">
                    <div className="w-10 h-10 rounded-2xl bg-sky-500 text-white flex items-center justify-center font-black text-sm shadow-md shrink-0">
                      {item.avatar}
                    </div>
                    <div>
                      <span className="text-[11px] font-mono font-bold text-slate-400 block">
                        {item.code}
                      </span>
                      <span className="text-xs font-bold text-sky-600">
                        📍 {item.kota}, {item.provinsi}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5">
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-sky-600 transition-colors leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium line-clamp-3">
                      {item.short_description}
                    </p>
                  </div>

                  {/* Financial & Revenue Highlights Badge (Replaces Problem Statement!) */}
                  <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                        TOTAL REVENUE (OMSET)
                      </span>
                      <span className="font-black text-slate-900 text-xs">
                        {item.totalRevenue}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-200/80 text-[10px] font-black text-emerald-800 flex items-center gap-0.5">
                        <TrendingUp className="w-3 h-3 text-emerald-700" />
                        <span>{item.growthRate}</span>
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-sky-50 border border-sky-200 text-[10px] font-bold text-sky-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold text-slate-700 truncate">{item.company}</span>
                  <span className="text-sky-600 font-extrabold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Detail Usaha</span>
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
