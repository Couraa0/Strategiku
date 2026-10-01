import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card } from '../../components/common/Card';
import {
  CheckCircle2,
  MapPin,
  Building,
  MessageSquare,
  ExternalLink,
  Calendar,
  Sparkles,
  PackageCheck,
  Tag,
  Trophy,
  Search,
  Filter,
  ChevronDown,
} from 'lucide-react';
import api from '../../lib/api';

export interface OpportunityDetail {
  opportunity_id: string;
  title: string;               // 2. Judul peluang
  organization_name: string;   // 3. Nama instansi/pihak
  location: string;            // 4. Lokasi
  category: string;            // 5. Kategori
  match_score?: number;        // 6. Skor relevansi
  match_reasons?: string[];    // 7. Alasan rekomendasi
  quantity_unit?: string;      // 8. Jumlah dan satuan
  periode?: string;            // 9. Periode
  status?: string;             // 10. Status
  source_url?: string;         // 11. Link sumber
  ranking?: number;
  description?: string;
}

export interface CardUMKMData {
  recommendation_id: string;
  rank: number;                // 1. Ranking
  opportunity: OpportunityDetail;
  score: number;
  reason: string[];
}

export const RecommendationsPage: React.FC = () => {
  const [recommendations, setRecommendations] = useState<CardUMKMData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedKategori, setSelectedKategori] = useState<string>('Semua Kategori');
  const [selectedStatus, setSelectedStatus] = useState<string>('Semua Status');

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res: any = await api.get('/recommendations');
        if (res.success && res.data) {
          setRecommendations(res.data.recommendations || []);
        } else {
          setRecommendations(DEMO_CARD_DATA);
        }
      } catch (err) {
        console.error('Error fetching recommendations:', err);
        setRecommendations(DEMO_CARD_DATA);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, []);

  const uniqueKategoris = useMemo(() => {
    const set = new Set<string>();
    recommendations.forEach((rec) => {
      if (rec.opportunity?.category) set.add(rec.opportunity.category);
    });
    return Array.from(set);
  }, [recommendations]);

  const filteredRecommendations = useMemo(() => {
    return recommendations.filter((rec) => {
      const opp: any = rec.opportunity || {};
      const title = (opp.title || '').toLowerCase();
      const instansi = (opp.organization_name || '').toLowerCase();
      const lokasi = (opp.location || '').toLowerCase();
      const query = searchQuery.toLowerCase().trim();

      const matchQuery =
        !query || title.includes(query) || instansi.includes(query) || lokasi.includes(query);
      const matchKategori =
        selectedKategori === 'Semua Kategori' || opp.category === selectedKategori;
      const matchStatus =
        selectedStatus === 'Semua Status' || opp.status === selectedStatus;

      return matchQuery && matchKategori && matchStatus;
    });
  }, [recommendations, searchQuery, selectedKategori, selectedStatus]);

  return (
    <AppLayout
      title="Rekomendasi Peluang UMKM"
      subtitle="Pencocokan otomatis profil usaha UMKM dengan peluang kemitraan & pengadaan"
    >
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 p-6 md:p-8 rounded-3xl text-white shadow-xl shadow-sky-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-extrabold uppercase tracking-wider">
              MATCHING ENGINE
            </span>
            <span className="text-xs text-sky-100 font-medium">Relevance & Contextual Ranking</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">
            Daftar Card Rekomendasi Peluang UMKM
          </h2>
          <p className="text-xs text-sky-100 mt-1 max-w-xl font-medium">
            Kartu di bawah menampilkan 11 data utama peluang usaha yang dicocokkan langsung dengan profil usaha dan katalog produk Anda.
          </p>
        </div>
      </div>

      {/* Filter Options Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul peluang, instansi, atau lokasi..."
            className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 text-xs font-bold rounded-xl pl-9 pr-4 py-2.5 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Category Filter */}
          <div className="relative w-full md:w-48">
            <select
              value={selectedKategori}
              onChange={(e) => setSelectedKategori(e.target.value)}
              className="w-full bg-slate-50 text-slate-800 font-bold text-xs pl-3 pr-8 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 appearance-none cursor-pointer truncate"
            >
              <option value="Semua Kategori">Semua Kategori</option>
              {uniqueKategoris.map((kat) => (
                <option key={kat} value={kat}>
                  {kat}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Status Filter */}
          <div className="relative w-full md:w-40">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-slate-50 text-slate-800 font-bold text-xs pl-3 pr-8 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 appearance-none cursor-pointer truncate"
            >
              <option value="Semua Status">Semua Status</option>
              <option value="Aktif">Aktif</option>
              <option value="Terbuka">Terbuka</option>
              <option value="Proses Seleksi">Proses Seleksi</option>
              <option value="Ditutup">Ditutup</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Recommendations Cards List */}
      <div className="space-y-6">
        {loading ? (
          <div className="p-12 text-center text-slate-400 font-mono text-xs">
            Memuat data card UMKM...
          </div>
        ) : filteredRecommendations.length === 0 ? (
          <div className="p-12 text-center text-slate-500 font-bold text-xs bg-white rounded-3xl border border-slate-200">
            Tidak ada rekomendasi yang sesuai dengan filter pencarian Anda.
          </div>
        ) : (
          filteredRecommendations.map((rec) => {
            const opp: OpportunityDetail = rec.opportunity || {
              opportunity_id: 'opp_demo',
              title: 'Judul Peluang Usaha',
              organization_name: 'Instansi Terkait',
              location: 'Jawa Barat',
              category: 'Umum',
            };
            const rankNumber = rec.rank || opp.ranking || 1;
            const title = opp.title || 'Judul Peluang Usaha';
            const instansi = opp.organization_name || 'Nama Instansi';
            const lokasi = opp.location || 'Lokasi';
            const kategori = opp.category || 'Kategori';
            const skor = Math.round((rec.score || opp.match_score || 0.9) * 100);
            const alasan = rec.reason || opp.match_reasons || ['Kategori & Lokasi Sesuai'];
            const jumlahSatuan = opp.quantity_unit || '100 Pcs';
            const periode = opp.periode || '2026';
            const status = opp.status || 'Aktif';
            const linkSumber = opp.source_url || '#';

            return (
              <Card
                key={rec.recommendation_id || opp.opportunity_id}
                hoverable
                className="border border-slate-200 bg-white p-6 space-y-5 shadow-sm hover:shadow-md transition-all rounded-3xl"
              >
                {/* 1. Header Row: Ranking, Judul, Instansi, Lokasi, Status & Skor Relevansi */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div className="flex items-start gap-4">
                    {/* 1. Ranking Badge */}
                    <div className="flex flex-col items-center justify-center shrink-0">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center font-black text-lg shadow-md shadow-sky-500/25">
                        #{rankNumber}
                      </div>
                      <span className="text-[9px] font-extrabold text-slate-400 mt-1 tracking-wider uppercase">
                        RANKING
                      </span>
                    </div>

                    <div className="space-y-1">
                      {/* 5. Kategori & 10. Status Badge */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-md bg-sky-100 border border-sky-200 text-sky-800 text-[10px] font-extrabold uppercase tracking-wide flex items-center gap-1">
                          <Tag className="w-3 h-3 text-sky-600" />
                          <span>{kategori}</span>
                        </span>

                        <span
                          className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase border ${
                            status === 'Aktif' || status === 'Terbuka'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}
                        >
                          STATUS: {status}
                        </span>
                      </div>

                      {/* 2. Judul Peluang */}
                      <h3 className="text-xl font-black text-slate-900 leading-tight">
                        {title}
                      </h3>

                      {/* 3. Nama Instansi & 4. Lokasi */}
                      <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 pt-0.5">
                        <span className="flex items-center gap-1.5 text-slate-700">
                          <Building className="w-4 h-4 text-sky-500" />
                          <span>{instansi}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5 text-slate-700">
                          <MapPin className="w-4 h-4 text-rose-500" />
                          <span>{lokasi}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 6. Skor Relevansi Pill */}
                  <div className="px-5 py-2.5 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-200 text-right shrink-0 shadow-2xs self-start md:self-auto">
                    <span className="text-[10px] uppercase tracking-wider text-sky-800 block font-extrabold flex items-center gap-1 justify-end">
                      <Sparkles className="w-3 h-3 text-sky-500" />
                      <span>Skor Relevansi</span>
                    </span>
                    <span className="text-2xl font-black text-sky-600">
                      {skor}%
                    </span>
                  </div>
                </div>

                {/* Grid Details: Jumlah dan Satuan & Periode */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white text-sky-600 flex items-center justify-center border border-slate-200 shrink-0">
                      <PackageCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Jumlah dan Satuan
                      </span>
                      <span className="text-xs font-black text-slate-900">
                        {jumlahSatuan}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white text-indigo-600 flex items-center justify-center border border-slate-200 shrink-0">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Periode Pelaksanaan
                      </span>
                      <span className="text-xs font-black text-slate-900">
                        {periode}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Alasan Rekomendasi */}
                <div className="space-y-2">
                  <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5 text-amber-500" />
                    <span>Alasan Rekomendasi:</span>
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {alasan.map((r: string, idx: number) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-sky-50/70 border border-sky-200/80 text-xs text-slate-800 flex items-center gap-2 font-medium shadow-2xs"
                      >
                        <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                        <span>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer: Link Sumber & Action Buttons */}
                <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                  {/* Link Sumber */}
                  <a
                    href={linkSumber}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-700 hover:underline"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Link Sumber: {linkSumber}</span>
                  </a>

                  <div className="flex items-center gap-2.5 w-full sm:w-auto">
                    <Link
                      to={`/opportunities/${opp.opportunity_id || 'opp_001'}`}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200 transition-all text-center flex-1 sm:flex-none"
                    >
                      Detail Peluang
                    </Link>
                    <Link
                      to="/assistant"
                      className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-extrabold text-xs shadow-lg shadow-sky-500/25 transition-all flex items-center justify-center gap-1.5 text-center flex-1 sm:flex-none active:scale-95"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Ajukan Penawaran</span>
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </AppLayout>
  );
};

// Fallback Demo Data for Card UMKM
const DEMO_CARD_DATA: CardUMKMData[] = [
  {
    recommendation_id: 'rec_001',
    rank: 1,
    score: 0.95,
    reason: [
      'Kategori produk kopi specialty sesuai',
      'Lokasi Kabupaten Karawang tepat sasaran',
      'Legalitas NIB & Halal terverifikasi',
      'Kapasitas produksi 600kg/bln mencukupi',
    ],
    opportunity: {
      opportunity_id: 'opp_001',
      title: 'Pengadaan Bingkisan Kopi & Suvenir UMKM Pemkab Karawang',
      organization_name: 'Dinas Koperasi & UMKM Kabupaten Karawang',
      location: 'Kabupaten Karawang',
      category: 'F&B / Pengadaan',
      match_score: 0.95,
      match_reasons: [
        'Kategori produk kopi specialty sesuai',
        'Lokasi Kabupaten Karawang tepat sasaran',
        'Legalitas NIB & Halal terverifikasi',
      ],
      quantity_unit: '500 Box Suvenir',
      periode: '1 Oktober - 15 November 2026',
      status: 'Aktif',
      source_url: 'https://diskopukm.karawangkab.go.id/peluang-pengadaan-2026',
    },
  },
  {
    recommendation_id: 'rec_002',
    rank: 2,
    score: 0.89,
    reason: [
      'Produk roasted bean siap pasokan B2B',
      'Pengalaman pasokan cafe terbukti',
      'Wilayah kemitraan Jawa Barat',
    ],
    opportunity: {
      opportunity_id: 'opp_002',
      title: 'Pasokan Biji Kopi Roasting untuk Jaringan Cafe Bandung',
      organization_name: 'Kolektif Cafe Bandung Raya',
      location: 'Kota Bandung',
      category: 'F&B / Supply Agreement',
      match_score: 0.89,
      match_reasons: [
        'Produk roasted bean siap pasokan B2B',
        'Pengalaman pasokan cafe terbukti',
      ],
      quantity_unit: '250 kg / bulan',
      periode: 'November 2026 - April 2027 (6 Bulan)',
      status: 'Aktif',
      source_url: 'https://bandungcafenetwork.com/supply-partner-2026',
    },
  },
  {
    recommendation_id: 'rec_003',
    rank: 3,
    score: 0.82,
    reason: [
      'Katalog produk Drip Bag & Cold Brew sesuai standar ritel',
      'Kemasan produk berizin P-IRT',
    ],
    opportunity: {
      opportunity_id: 'opp_003',
      title: 'Display Ritel Produk Suvenir Kopi Rest Area Tol Cipularang',
      organization_name: 'Pengelola Rest Area KM 88 Purbaleunyi',
      location: 'Kabupaten Purwakarta',
      category: 'Retail / Etalase Suvenir',
      match_score: 0.82,
      match_reasons: [
        'Katalog produk Drip Bag & Cold Brew sesuai standar ritel',
      ],
      quantity_unit: '150 Box / bulan',
      periode: '1 Oktober 2026 - 31 Maret 2027',
      status: 'Aktif',
      source_url: 'https://jasamarga.co.id/pojok-umkm-restarea',
    },
  },
];
