import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Building,
  MapPin,
  Tag,
  PackageCheck,
  Calendar,
  ExternalLink,
  MessageSquare,
  CheckCircle2,
  Sparkles,
  Info,
  FileText,
  ShieldCheck,
  ClipboardList,
  Phone,
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
    deskripsi: 'Pengadaan paket suvenir kopi lokal Karawang untuk perayaan HUT Karawang dan event kunjungan kerja dinas. Paket suvenir meliputi kopi arabika single origin 200g, mug keramik berlogo, dan kartu ucapan. UMKM mitra diharapkan menyediakan produk kopi berkualitas dengan kemasan premium untuk kebutuhan protokoler daerah.',
    persyaratan: 'Legalitas NIB & Halal terverifikasi, memiliki izin P-IRT, kapasitas produksi minimal 500 unit per bulan.',
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
    deskripsi: 'Pasokan biji kopi roasted bean berkualitas specialty grade untuk jaringan cafe di Bandung Raya. Mencakup varietas arabika dan robusta dengan profil roasting medium-dark. Pengiriman dilakukan setiap 2 minggu dengan sistem purchase order tetap.',
    persyaratan: 'Sertifikat Q-Grader atau pengalaman roasting minimal 2 tahun, konsistensi kualitas roasting terjamin.',
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
    deskripsi: 'Penempatan produk suvenir kopi lokal pada etalase dedicated di area rest area tol Cipularang. Produk yang dipajang meliputi drip coffee bag, cold brew bottle, dan paket gift box oleh-oleh. Pengelolaan stok dan display dilakukan oleh mitra UMKM terpilih.',
    persyaratan: 'Produk berizi P-IRT, kemasan food-grade, label informatif, mampu restock tiap 2 minggu.',
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
    deskripsi: 'Fasilitasi kurasi produk fashion batik dan kriya Nusantara untuk pasar ekspor ke Jepang & Singapura. Program ini mencakup pendampingan desain, standarisasi kualitas, dan koneksi dengan buyer internasional melalui pameran virtual.',
    persyaratan: 'Pengrajin batik tulis asli Jawa Barat, memiliki minimal 3 motif original, portfolio produk.',
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
    deskripsi: 'Penempatan produk camilan keripik pedas olahan lokal pada 120 jaringan minimarket di Jabodetabek. Produk akan mendapat slot rak dedicated dan promosi bundling bulanan.',
    persyaratan: 'P-IRT, uji laboratorium nutrisi, barcode produk, kapasitas produksi 2000+ pouch/bulan.',
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
    deskripsi: 'Pengadaan teh hijau dan olahan herbal organik petik pucuk untuk welcome drink guest hotel bintang 5. Produk harus memenuhi standar hospitality premium.',
    persyaratan: 'Sertifikat organik, kemasan sachel individual food-grade, sample test wajib.',
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
    deskripsi: 'Penyediaan booth etalase dan souvenir anyaman pandan alami untuk tamu mancanegara dalam Festival Kriya Sukabumi.',
    persyaratan: 'Pengrajin lokal Sukabumi, produk handmade asli, portfolio pameran sebelumnya.',
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
    deskripsi: 'Pengadaan souvenir unik olahan lokal (drip coffee, mug kriya, notebook ramah lingkungan) untuk goodie bag peserta seminar nasional di ITB.',
    persyaratan: 'Kemasan ramah lingkungan, bisa custom branding, pengiriman batch sekaligus.',
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
    persyaratan: 'Sertifikat HACCP, fasilitas cold storage, kapasitas 5+ ton per bulan.',
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
    deskripsi: 'Program pendampingan proses produk halal (PPH) gratis tanpa biaya untuk UMKM makanan minuman di Jawa Barat.',
    persyaratan: 'UMKM bidang F&B yang belum memiliki sertifikat halal, domisili Jawa Barat.',
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
    deskripsi: 'Kemitraan pasokan beras organik lokal dan bumbu rempah mentah olahan untuk jaringan rumah makan heritage di Garut.',
    persyaratan: 'Petani organik bersertifikat, konsistensi pasokan bulanan.',
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
    persyaratan: 'Pengrajin kulit berpengalaman, workshop Cibaduyut, portofolio produk.',
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
    deskripsi: 'Bantuan pengujian kadar nutrisi laboratorium dan sertifikasi izin edar P-IRT gratis untuk UMKM makanan kemasan.',
    persyaratan: 'UMKM makanan kemasan domisili Tasikmalaya, belum memiliki P-IRT.',
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
    deskripsi: 'Pengadaan baju batik motif khas Cimahi untuk perlengkapan seragam pegawai dan hampers tamu instansi pemerintah.',
    persyaratan: 'Konveksi batik lokal, mampu produksi batch 450+ set, sample wajib.',
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
    deskripsi: 'Penyediaan booth etalase gratis untuk UMKM bidang produk inovasi digital dan aplikasi kreatif dalam expo ekonomi kreatif Depok.',
    persyaratan: 'UMKM digital/kreatif, pitch deck produk, domisili Jabodetabek.',
  },
];

export const UMKMHubDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [opp, setOpp] = useState<OpportunityItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res: any = await api.get(`/opportunities/${id}`);
        if (res.success && res.data) {
          setOpp(res.data);
        } else {
          // Fallback to demo data
          const found = DEMO_OPPORTUNITIES.find((o) => o.id === id);
          setOpp(found || DEMO_OPPORTUNITIES[0]);
        }
      } catch (err) {
        console.error(err);
        const found = DEMO_OPPORTUNITIES.find((o) => o.id === id);
        setOpp(found || DEMO_OPPORTUNITIES[0]);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-400 font-mono text-xs">
        Memuat detail usaha UMKM Hub...
      </div>
    );
  }

  if (!opp) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500 font-bold text-sm">
        Usaha tidak ditemukan.
      </div>
    );
  }

  // Resolve fields (support both Indonesian & English field names)
  const title = opp.judul_peluang || opp.title || 'Judul Usaha';
  const instansi = opp.nama_instansi || opp.organization_name || 'Nama Instansi / Usaha';
  const lokasi = opp.lokasi || opp.location || 'Lokasi';
  const kategori = opp.kategori || opp.category || 'Kategori';
  const jumlahSatuan = opp.jumlah_dan_satuan || opp.quantity_unit || '—';
  const periode = opp.periode || '2026';
  const status = opp.status || 'Aktif';
  const linkSumber = opp.link_sumber || opp.source_url || '#';
  const deskripsi = opp.deskripsi || opp.description || 'Tidak ada deskripsi tersedia untuk usaha ini.';
  const persyaratan = opp.persyaratan || 'Tidak ada persyaratan khusus yang tercantum.';
  const phone = opp.telepon || opp.no_wa || opp.phone || '6281234567890';
  const cleanPhone = phone.replace(/[^0-9]/g, '');

  const waMessage = encodeURIComponent(
    `Halo ${instansi}, saya tertarik dengan usaha "${title}" yang terdaftar di UMKM Hub Strategiku. Saya ingin berkonsultasi / mengajukan penawaran kerjasama.`
  );
  const waUrl = `https://wa.me/${cleanPhone}?text=${waMessage}`;

  // Get 3 related opportunities (same kategori or random)
  const relatedOpps = DEMO_OPPORTUNITIES
    .filter((o) => o.id !== (opp.id || opp.opportunity_id) && o.kategori === kategori)
    .slice(0, 3);
  const finalRelated = relatedOpps.length >= 3
    ? relatedOpps
    : DEMO_OPPORTUNITIES.filter((o) => o.id !== (opp.id || opp.opportunity_id)).slice(0, 3);

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
              <span>Kembali ke Katalog Usaha</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 text-white p-8 md:p-10 rounded-3xl space-y-4 shadow-xl shadow-sky-500/20 relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          {/* Breadcrumb */}
          <div className="relative flex items-center gap-2 text-xs text-sky-100 font-medium flex-wrap">
            <Link to="/" className="hover:underline">Beranda</Link>
            <span>/</span>
            <Link to="/umkm-hub" className="hover:underline">UMKM Hub</Link>
            <span>/</span>
            <span className="text-white font-bold truncate max-w-xs">{title}</span>
          </div>

          {/* Tags */}
          <div className="relative flex items-center gap-2 flex-wrap pt-1">
            <span className="px-3 py-1 rounded-full bg-white/20 border border-white/30 text-xs font-extrabold text-white flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {kategori}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-black border ${
                status === 'Aktif' || status === 'Terbuka'
                  ? 'bg-emerald-400/90 text-emerald-950 border-emerald-300'
                  : 'bg-amber-400/90 text-amber-950 border-amber-300'
              }`}
            >
              STATUS: {status}
            </span>
          </div>

          {/* Title */}
          <h1 className="relative text-2xl md:text-4xl font-black tracking-tight leading-tight">
            {title}
          </h1>

          {/* Instansi & Lokasi & Telepon */}
          <div className="relative flex flex-wrap items-center gap-4 text-xs md:text-sm text-sky-100 font-medium">
            <span className="flex items-center gap-1.5">
              <Building className="w-4 h-4 text-sky-200" />
              {instansi}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-sky-200" />
              {lokasi}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-sky-200" />
              +{phone}
            </span>
          </div>
        </div>

        {/* 2/3 Content + 1/3 Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Detail Info Grid */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Info className="w-4 h-4 text-sky-500" />
                Informasi Detail Usaha
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-white text-sky-600 flex items-center justify-center border border-slate-200 shrink-0 shadow-xs">
                    <PackageCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Jumlah dan Satuan</span>
                    <span className="text-sm font-black text-slate-900">{jumlahSatuan}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-white text-indigo-600 flex items-center justify-center border border-slate-200 shrink-0 shadow-xs">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Periode Pelaksanaan</span>
                    <span className="text-sm font-black text-slate-900">{periode}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-white text-emerald-600 flex items-center justify-center border border-slate-200 shrink-0 shadow-xs">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Penyelenggara / Usaha</span>
                    <span className="text-sm font-black text-slate-900">{instansi}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-white text-rose-500 flex items-center justify-center border border-slate-200 shrink-0 shadow-xs">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Lokasi</span>
                    <span className="text-sm font-black text-slate-900">{lokasi}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Deskripsi */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-500" />
                Deskripsi Usaha
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed font-medium bg-slate-50 p-5 rounded-2xl border border-slate-100">
                {deskripsi}
              </p>
            </div>

            {/* Persyaratan */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-amber-500" />
                Persyaratan Kemitraan UMKM
              </h3>
              <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200 space-y-2">
                {persyaratan.split(',').map((req, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{req.trim()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Why This Opportunity */}
            <div className="p-6 rounded-3xl bg-sky-50 border border-sky-200 space-y-3">
              <h3 className="text-base font-black text-sky-800 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-500" />
                Mengapa Usaha Ini Menarik?
              </h3>
              <ul className="space-y-2.5">
                <li className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>Kategori <strong className="text-slate-900">{kategori}</strong> sangat relevan dengan kebutuhan pasar lokal.</span>
                </li>
                <li className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>Lokasi di <strong className="text-slate-900">{lokasi}</strong> terjangkau oleh armada logistik lokal.</span>
                </li>
                <li className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>Kuantitas <strong className="text-slate-900">{jumlahSatuan}</strong> sesuai kapasitas produksi UMKM skala menengah.</span>
                </li>
                <li className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>Periode pelaksanaan <strong className="text-slate-900">{periode}</strong> memberikan waktu persiapan yang cukup.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column Sidebar (1/3 width) */}
          <div className="space-y-6">
            {/* Source Info Card */}
            <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-4">
              <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-3">
                Informasi Sumber Data
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider mb-1">Penyelenggara / Usaha</span>
                  <span className="font-bold text-slate-800">{instansi}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider mb-1">Kategori Usaha</span>
                  <span className="font-bold text-sky-600">{kategori}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider mb-1">No. Telepon / WA Contact</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" />
                    +{phone}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider mb-1">Link Sumber</span>
                  {linkSumber !== '#' ? (
                    <a
                      href={linkSumber}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sky-600 hover:text-sky-700 hover:underline flex items-center gap-1.5 font-bold truncate bg-sky-50 p-2.5 rounded-xl border border-sky-100"
                    >
                      <span className="truncate">{linkSumber}</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    </a>
                  ) : (
                    <span className="text-slate-500 font-medium">Data Publik Terverifikasi</span>
                  )}
                </div>
              </div>
            </div>

            {/* Status & Quick Info */}
            <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-4">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-sky-600">
                Detail Status & Periode
              </h4>
              <div className="space-y-3 text-xs divide-y divide-slate-100">
                <div className="flex justify-between pt-1">
                  <span className="text-slate-500">STATUS</span>
                  <span className={`font-black uppercase ${
                    status === 'Aktif' || status === 'Terbuka' ? 'text-emerald-600' : 'text-amber-600'
                  }`}>{status}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-500">KATEGORI</span>
                  <span className="font-bold text-slate-800">{kategori}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-500">JUMLAH</span>
                  <span className="font-bold text-slate-800">{jumlahSatuan}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-500">PERIODE</span>
                  <span className="font-medium text-slate-700">{periode}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-500">LOKASI</span>
                  <span className="font-medium text-slate-700">{lokasi}</span>
                </div>
              </div>
            </div>

            {/* Verified Badge */}
            <div className="bg-emerald-50 border border-emerald-300 p-5 rounded-3xl text-emerald-900 space-y-2 shadow-xs">
              <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Status Verifikasi Data</span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-relaxed font-medium">
                Data usaha ini dikurasi dan diverifikasi oleh tim Strategiku berdasarkan sumber resmi instansi terkait.
              </p>
            </div>

            {/* Direct WhatsApp Contact CTA */}
            <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-sky-700 text-white p-6 rounded-3xl space-y-4 shadow-xl shadow-emerald-500/20">
              <div className="space-y-1">
                <h3 className="text-base font-black flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-emerald-200" />
                  Tertarik dengan Usaha Ini?
                </h3>
                <p className="text-xs text-emerald-100 font-medium leading-relaxed">
                  Hubungi WhatsApp business owner / penyelenggara usaha ini secara langsung untuk berkonsultasi atau mengajukan penawaran kerjasama.
                </p>
              </div>

              <div className="bg-emerald-800/40 p-3 rounded-2xl border border-white/10 text-xs flex items-center justify-between">
                <span className="text-emerald-100 font-medium">No. WA Owner:</span>
                <span className="font-mono font-bold text-white">+{phone}</span>
              </div>

              <a
                href={waUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-800 font-black text-xs shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Hubungi WA Business Owner</span>
              </a>
            </div>
          </div>
        </div>

        {/* Related Opportunities */}
        <div className="space-y-4 pt-6 border-t border-slate-200">
          <h3 className="text-xl font-black text-slate-900 tracking-tight">
            USAHA SERUPA LAINNYA
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {finalRelated.map((rel) => {
              const relTitle = rel.judul_peluang || rel.title || 'Judul Usaha';
              const relKat = rel.kategori || rel.category || 'Kategori';
              const relLokasi = rel.lokasi || rel.location || 'Lokasi';
              const relStatus = rel.status || 'Aktif';
              const relDeskripsi = rel.deskripsi || rel.description || '';

              return (
                <div
                  key={rel.id}
                  onClick={() => navigate(`/umkm-hub/${rel.id}`)}
                  className="bg-white hover:bg-sky-50/40 border border-slate-200 hover:border-sky-400 rounded-2xl p-5 text-slate-900 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-md bg-sky-50 border border-sky-200 text-[10px] font-extrabold text-sky-700 flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        {relKat}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase border ${
                          relStatus === 'Aktif' || relStatus === 'Terbuka'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {relStatus}
                      </span>
                    </div>

                    <h4 className="text-sm font-black text-slate-900 group-hover:text-sky-600 transition-colors leading-snug line-clamp-2">
                      {relTitle}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed font-medium">
                      {relDeskripsi}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-bold text-slate-600 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-rose-400" />
                      {relLokasi}
                    </span>
                    <span className="text-sky-600 font-bold group-hover:underline">Lihat Detail →</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};
