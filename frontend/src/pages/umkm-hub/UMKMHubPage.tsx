import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Search,
  Building,
  MapPin,
  Tag,
  PackageCheck,
  Calendar,
  ExternalLink,
  MessageSquare,
  ChevronDown,
  Info,
  Phone,
  UserPlus,
  ArrowLeft,
} from 'lucide-react';
import api from '../../lib/api';

export interface OpportunityItem {
  id?: string;
  opportunity_id?: string;
  judul_peluang?: string;
  title?: string;
  nama_instansi?: string;
  organization_name?: string;
  lokasi?: string;
  location?: string;
  kategori?: string;
  category?: string;
  jumlah_dan_satuan?: string;
  quantity_unit?: string;
  periode?: string;
  status?: string;
  link_sumber?: string;
  source_url?: string;
  deskripsi?: string;
  description?: string;
  persyaratan?: string;
  telepon?: string;
  no_wa?: string;
  phone?: string;
}

export const UMKMHubPage: React.FC = () => {
  const navigate = useNavigate();
  const [opportunities, setOpportunities] = useState<OpportunityItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedKategori, setSelectedKategori] = useState<string>('Semua Kategori');
  const [selectedStatus, setSelectedStatus] = useState<string>('Semua Status');

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const res: any = await api.get('/opportunities');
        if (res.success && res.data && res.data.length > 0) {
          setOpportunities(res.data);
        } else if (Array.isArray(res) && res.length > 0) {
          setOpportunities(res);
        } else {
          setOpportunities(DEMO_OPPORTUNITIES);
        }
      } catch (err) {
        console.error('Error fetching opportunities:', err);
        setOpportunities(DEMO_OPPORTUNITIES);
      } finally {
        setLoading(false);
      }
    };
    fetchOpportunities();
  }, []);

  const uniqueKategoris = useMemo(() => {
    const set = new Set<string>();
    opportunities.forEach((item) => {
      const kat = item.kategori || item.category;
      if (kat) set.add(kat);
    });
    return Array.from(set);
  }, [opportunities]);

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((item) => {
      const title = item.judul_peluang || item.title || '';
      const instansi = item.nama_instansi || item.organization_name || '';
      const lokasi = item.lokasi || item.location || '';
      const kat = item.kategori || item.category || '';
      const status = item.status || 'Aktif';

      const matchQuery =
        !searchQuery.trim() ||
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        instansi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lokasi.toLowerCase().includes(searchQuery.toLowerCase());

      const matchKategori =
        selectedKategori === 'Semua Kategori' || kat === selectedKategori;
      const matchStatus =
        selectedStatus === 'Semua Status' || status === selectedStatus;

      return matchQuery && matchKategori && matchStatus;
    });
  }, [opportunities, searchQuery, selectedKategori, selectedStatus]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-sky-500 selection:text-white">
      {/* Top Header Navbar */}
      <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-xl sticky top-0 z-50 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors" aria-label="Kembali">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <button onClick={() => navigate('/')} className="hover:opacity-90 transition-opacity">
                <img src="/logo/Logo+Text+Landscape.png" alt="Strategiku Logo" className="h-10 w-auto" />
              </button>
              <span className="hidden sm:inline-block text-[10px] font-extrabold tracking-wider px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-700 border border-sky-300">
                PUBLIC UMKM HUB
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-extrabold text-xs shadow-md shadow-sky-500/25 transition-all active:scale-95"
            >
              Masuk Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Banner */}
        <div className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 p-6 md:p-8 rounded-3xl text-white shadow-xl shadow-sky-500/20 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-extrabold uppercase tracking-wider">
                KATALOG USAHA UMKM SE-JAWA BARAT
              </span>
              <span className="text-xs text-sky-100 font-medium">Terbuka untuk Publik & UMKM</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight">
              Direktori & Katalog Usaha Kemitraan UMKM Hub
            </h1>
            <p className="text-xs md:text-sm text-sky-100 mt-1 max-w-2xl font-medium leading-relaxed">
              Temukan usaha pengadaan instansi, pasokan B2B, dan kerjasama usaha yang terverifikasi di Jawa Barat.
            </p>
          </div>
        </div>

        {/* Info Banner for adding business */}
        <div className="bg-sky-50 border border-sky-200 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-sky-500/20 mt-0.5">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-black text-sky-950">Ingin Menambahkan Usaha Anda di UMKM Hub?</p>
              <p className="text-xs text-sky-700 font-medium mt-0.5 max-w-2xl leading-relaxed">
                Anda harus mendaftarkan akun usaha Anda terlebih dahulu di platform Strategiku untuk dapat mengunggah dan menampilkan informasi usaha Anda pada katalog UMKM Hub.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/register')}
            className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs shadow-md shadow-sky-600/20 transition-all active:scale-95 shrink-0 flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Daftar Disini</span>
          </button>
        </div>

        {/* Filters & Search */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari judul usaha, instansi, atau lokasi..."
              className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 text-xs font-bold rounded-xl pl-9 pr-4 py-2.5 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
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

        {/* UMKM Hub Cards 2x2 Grid */}
        {loading ? (
          <div className="p-12 text-center text-slate-400 font-mono text-xs">
            Memuat data usaha UMKM Hub...
          </div>
        ) : filteredOpportunities.length === 0 ? (
          <div className="p-12 text-center text-slate-500 font-bold text-xs bg-white rounded-3xl border border-slate-200">
            Tidak ada usaha yang cocok dengan filter Anda.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredOpportunities.map((oppItem: any) => {
              const id = oppItem.id || oppItem.opportunity_id || 'opp_demo';
              const title = oppItem.judul_peluang || oppItem.title || 'Judul Usaha';
              const instansi = oppItem.nama_instansi || oppItem.organization_name || 'Nama Instansi/Pihak';
              const lokasi = oppItem.lokasi || oppItem.location || 'Lokasi';
              const kategori = oppItem.kategori || oppItem.category || 'Kategori';
              const jumlahSatuan = oppItem.jumlah_dan_satuan || oppItem.quantity_unit || '100 Pcs';
              const periode = oppItem.periode || '2026';
              const status = oppItem.status || 'Aktif';
              const linkSumber = oppItem.link_sumber || oppItem.source_url || '#';
              const phone = oppItem.telepon || oppItem.no_wa || oppItem.phone || '6281234567890';
              const cleanPhone = phone.replace(/[^0-9]/g, '');

              const waMessage = encodeURIComponent(
                `Halo ${instansi}, saya tertarik dengan usaha "${title}" yang terdaftar di UMKM Hub Strategiku. Saya ingin berkonsultasi / mengajukan penawaran kerjasama.`
              );
              const waUrl = `https://wa.me/${cleanPhone}?text=${waMessage}`;

              return (
                <div
                  key={id}
                  className="group border border-slate-200 bg-white p-5 space-y-3.5 shadow-sm hover:shadow-lg hover:border-sky-200 transition-all duration-300 rounded-2xl flex flex-col justify-between h-full"
                >
                  {/* Tags */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded-md bg-sky-50 border border-sky-200 text-sky-700 text-[10px] font-extrabold uppercase tracking-wide flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {kategori}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase border ${
                        status === 'Aktif' || status === 'Terbuka'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      {status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-black text-slate-900 leading-snug line-clamp-2 group-hover:text-sky-700 transition-colors">
                    {title}
                  </h3>

                  {/* Info Row */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold text-slate-500">
                    <span className="flex items-center gap-1 text-slate-600">
                      <Building className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                      <span className="truncate max-w-[180px]">{instansi}</span>
                    </span>
                    <span className="text-slate-300">|</span>
                    <span className="flex items-center gap-1 text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      {lokasi}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-2.5 bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-white text-sky-600 flex items-center justify-center border border-slate-200 shrink-0">
                        <PackageCheck className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Jumlah</span>
                        <span className="text-[11px] font-black text-slate-800 truncate block">{jumlahSatuan}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-white text-indigo-600 flex items-center justify-center border border-slate-200 shrink-0">
                        <Calendar className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Periode</span>
                        <span className="text-[11px] font-black text-slate-800 truncate block">{periode}</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <a
                      href={linkSumber}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-500 hover:text-sky-700 hover:underline truncate max-w-[35%]"
                    >
                      <ExternalLink className="w-3 h-3 shrink-0" />
                      <span className="truncate">Sumber</span>
                    </a>

                    <div className="flex items-center gap-2">
                      <Link
                        to={`/umkm-hub/${id}`}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold border border-slate-200 transition-all"
                      >
                        Detail
                      </Link>
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-[11px] shadow-md shadow-emerald-500/20 transition-all active:scale-95 flex items-center gap-1"
                      >
                        <MessageSquare className="w-3 h-3" />
                        Ajukan (WA)
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

const DEMO_OPPORTUNITIES: OpportunityItem[] = [
  {
    id: 'opp_001',
    judul_peluang: 'Pengadaan Bingkisan Kopi & Suvenir UMKM Pemkab Karawang',
    nama_instansi: 'Dinas Koperasi & UMKM Kabupaten Karawang',
    lokasi: 'Kabupaten Karawang',
    kategori: 'F&B / Pengadaan',
    jumlah_dan_satuan: '500 Box Suvenir',
    periode: '1 Oktober - 15 November 2026',
    status: 'Aktif',
    telepon: '6281234567890',
    link_sumber: 'https://diskopukm.karawangkab.go.id/peluang-pengadaan-2026',
    deskripsi: 'Pengadaan paket suvenir kopi lokal Karawang untuk perayaan HUT Karawang dan event kunjungan kerja dinas.',
    persyaratan: 'Legalitas NIB & Halal terverifikasi',
  },
  {
    id: 'opp_002',
    judul_peluang: 'Pasokan Biji Kopi Roasting untuk Jaringan Cafe Bandung',
    nama_instansi: 'Kolektif Cafe Bandung Raya',
    lokasi: 'Kota Bandung',
    kategori: 'F&B / Supply Agreement',
    jumlah_dan_satuan: '250 kg / bulan',
    periode: 'November 2026 - April 2027 (6 Bulan)',
    status: 'Aktif',
    telepon: '6285712345678',
    link_sumber: 'https://bandungcafenetwork.com/supply-partner-2026',
    deskripsi: 'Pasokan biji kopi roasted bean untuk cafe di Bandung.',
  },
  {
    id: 'opp_003',
    judul_peluang: 'Display Ritel Produk Suvenir Kopi Rest Area Tol Cipularang',
    nama_instansi: 'Pengelola Rest Area KM 88 Purbaleunyi',
    lokasi: 'Kabupaten Purwakarta',
    kategori: 'Retail / Etalase Suvenir',
    jumlah_dan_satuan: '150 Box / bulan',
    periode: '1 Oktober 2026 - 31 Maret 2027',
    status: 'Aktif',
    telepon: '6281987654321',
    link_sumber: 'https://jasamarga.co.id/pojok-umkm-restarea',
    deskripsi: 'Display retail suvenir kopi lokal di Rest Area Tol.',
  },
  {
    id: 'opp_004',
    judul_peluang: 'Program Kurasi Ekspor Fashion & Batik Tulis Jawa Barat',
    nama_instansi: 'Dinas Perindustrian & Perdagangan Jabar',
    lokasi: 'Kota Cirebon',
    kategori: 'Fesyen & Kriya',
    jumlah_dan_satuan: '300 Pcs Kain Batik',
    periode: 'Oktober 2026 - Februari 2027',
    status: 'Terbuka',
    telepon: '6282111223344',
    link_sumber: 'https://disindag.jabarprov.go.id/kurasi-ekspor-batik',
    deskripsi: 'Fasilitasi kurasi produk fashion batik dan kriya Nusantara untuk pasar ekspor ke Jepang & Singapura.',
  },
  {
    id: 'opp_005',
    judul_peluang: 'Kemitraan Pasokan Snack & Keripik Pedas Minimarket Berjejaring',
    nama_instansi: 'PT Retail Pasundan Modern',
    lokasi: 'Kota Bekasi',
    kategori: 'F&B / Supply Agreement',
    jumlah_dan_satuan: '2.000 Pouch / bulan',
    periode: '1 November 2026 - 31 Oktober 2027',
    status: 'Aktif',
    telepon: '6281344556677',
    link_sumber: 'https://pasundanretail.co.id/vendor-snack',
    deskripsi: 'Penempatan produk camilan keripik pedas olahan lokal pada 120 jaringan minimarket di Jabodetabek.',
  },
  {
    id: 'opp_006',
    judul_peluang: 'Pasokan Teh Hijau & Herbal Organik Hotel Bintang 5 Bogor',
    nama_instansi: 'Puncak Resort & Convention Hotel',
    lokasi: 'Kabupaten Bogor',
    kategori: 'F&B / Pengadaan',
    jumlah_dan_satuan: '400 Pouch Artisan',
    periode: 'Desember 2026 - Mei 2027',
    status: 'Terbuka',
    telepon: '6285299887766',
    link_sumber: 'https://puncakresorthotel.com/vendor-tea',
    deskripsi: 'Pengadaan teh hijau dan olahan herbal organik petik pucuk untuk welcome drink guest hotel.',
  },
  {
    id: 'opp_007',
    judul_peluang: 'Etalase Produk Kriya & Anyaman Pandan Festival Sukabumi',
    nama_instansi: 'Pemerintah Kota Sukabumi',
    lokasi: 'Kota Sukabumi',
    kategori: 'Fesyen & Kriya',
    jumlah_dan_satuan: '500 Pcs Craft',
    periode: '15 November - 20 Desember 2026',
    status: 'Proses Seleksi',
    telepon: '6287812345678',
    link_sumber: 'https://sukabumikab.go.id/event-kriya-2026',
    deskripsi: 'Penyediaan booth etalase dan souvenir anyaman pandan alami untuk tamu mancanegara.',
  },
  {
    id: 'opp_008',
    judul_peluang: 'Pengadaan Goodie Bag & Souvenir Seminar Nasional ITB',
    nama_instansi: 'Koperasi Sivitas Akademika ITB',
    lokasi: 'Kota Bandung',
    kategori: 'Retail / Etalase Suvenir',
    jumlah_dan_satuan: '800 Pack Souvenir',
    periode: '10 November - 25 November 2026',
    status: 'Aktif',
    telepon: '6281298765432',
    link_sumber: 'https://koperasi.itb.ac.id/pengadaan-goodiebag',
    deskripsi: 'Pengadaan souvenir unik olahan lokal (drip coffee, mug kriya, notebook ramah lingkungan).',
  },
  {
    id: 'opp_009',
    judul_peluang: 'Supply Olahan Hasil Laut & Kerupuk Ikan Ekspor ASEAN',
    nama_instansi: 'PT Bahari Pasundan Export',
    lokasi: 'Kabupaten Indramayu',
    kategori: 'F&B / Supply Agreement',
    jumlah_dan_satuan: '5 Ton / bulan',
    periode: '1 Januari 2027 - 31 Desember 2027',
    status: 'Terbuka',
    telepon: '6285678901234',
    link_sumber: 'https://baharipasundan.co.id/supplier-seafood',
    deskripsi: 'Kemitraan pasokan bahan olahan laut dan kerupuk ikan kualitas ekspor tujuan Malaysia dan Thailand.',
  },
  {
    id: 'opp_010',
    judul_peluang: 'Program Pendampingan Sertifikasi Halal Gratis (SEHATI) Jabar',
    nama_instansi: 'BPJPH & Satgas Halal Jawa Barat',
    lokasi: 'Kota Bandung',
    kategori: 'Jasa & Teknologi',
    jumlah_dan_satuan: '1.000 Kuota UMKM',
    periode: 'Oktober 2026 - Desember 2026',
    status: 'Aktif',
    telepon: '6283812345678',
    link_sumber: 'https://halal.jabarprov.go.id/sehati-2026',
    deskripsi: 'Program pendampingan proses produk halal (PPH) gratis tanpa biaya untuk UMKM makanan minuman.',
  },
  {
    id: 'opp_011',
    judul_peluang: 'Pasokan Beras Organik & Rempah Olahan Restoran Garut',
    nama_instansi: 'Kolektif Restoran Heritage Garut',
    lokasi: 'Kabupaten Garut',
    kategori: 'Agro & Perkebunan',
    jumlah_dan_satuan: '1.5 Ton / bulan',
    periode: 'November 2026 - Oktober 2027',
    status: 'Aktif',
    telepon: '6289612345678',
    link_sumber: 'https://garutkuliner.id/pasokan-organik',
    deskripsi: 'Kemitraan pasokan beras organik lokal dan bumbu rempah mentah olahan untuk jaringan rumah makan.',
  },
  {
    id: 'opp_012',
    judul_peluang: 'Kemitraan Kerajinan Sepatu & Tas Kulit Cibaduyut Custom',
    nama_instansi: 'Koperasi Pengrajin Kulit Bandung',
    lokasi: 'Kota Bandung',
    kategori: 'Fesyen & Kriya',
    jumlah_dan_satuan: '600 Pasang / bulan',
    periode: '1 Desember 2026 - 30 November 2027',
    status: 'Terbuka',
    telepon: '6281223344556',
    link_sumber: 'https://cibaduyutleather.com/b2b-order',
    deskripsi: 'Pemesanan sepatu dan produk alas kaki berbahan kulit sapi garut asli dengan konstruksi Goodyear Welted.',
  },
  {
    id: 'opp_013',
    judul_peluang: 'Fasilitasi PIRT & Lab Uji Nutrisi Makanan Kemasan Tasikmalaya',
    nama_instansi: 'Dinas Kesehatan Kab. Tasikmalaya',
    lokasi: 'Kabupaten Tasikmalaya',
    kategori: 'Jasa & Teknologi',
    jumlah_dan_satuan: '200 Produk UMKM',
    periode: 'Oktober 2026 - November 2026',
    status: 'Aktif',
    telepon: '6285776655443',
    link_sumber: 'https://dinkes.tasikmalayakab.go.id/uji-pirt',
    deskripsi: 'Bantuan pengujian kadar nutrisi laboratorium dan sertifikasi izin edar P-IRT gratis.',
  },
  {
    id: 'opp_014',
    judul_peluang: 'Pengadaan Seragam Batik & Gift Box Instansi Pemerintah Cimahi',
    nama_instansi: 'Sekretariat Daerah Kota Cimahi',
    lokasi: 'Kota Cimahi',
    kategori: 'Fesyen & Kriya',
    jumlah_dan_satuan: '450 Set Seragam',
    periode: '15 Oktober - 30 November 2026',
    status: 'Proses Seleksi',
    telepon: '6281809876543',
    link_sumber: 'https://cimahikota.go.id/pengadaan-batik-2026',
    deskripsi: 'Pengadaan baju batik motif khas Cimahi untuk perlengkapan seragam pegawai dan hampers tamu.',
  },
  {
    id: 'opp_015',
    judul_peluang: 'Display Booth UMKM Inovasi Digital & Startup Kreatif Depok',
    nama_instansi: 'Depok Creative Economy Hub',
    lokasi: 'Kota Depok',
    kategori: 'Jasa & Teknologi',
    jumlah_dan_satuan: '50 Stand Booth',
    periode: '10 Desember - 15 Desember 2026',
    status: 'Terbuka',
    telepon: '6282299001122',
    link_sumber: 'https://depokcreative.id/expo-2026',
    deskripsi: 'Penyediaan booth etalase gratis untuk UMKM bidang produk inovasi digital dan aplikasi kreatif.',
  },
];
