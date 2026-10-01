import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  DollarSign,
  Receipt,
  Users,
  Package,
  ArrowUpRight,
  UploadCloud,
  ChevronRight,
  Target,
  Lightbulb,
  PlusCircle,
  X,
  CheckCircle2,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import api from '../../lib/api';

export const Dashboard: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Modal State for Adding UMKM Hub Data
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string>('');

  const [formData, setFormData] = useState({
    judul_peluang: '',
    nama_instansi: '',
    lokasi: '',
    kategori: 'F&B / Pengadaan',
    jumlah_dan_satuan: '',
    periode: '',
    status: 'Aktif',
    link_sumber: '',
    deskripsi: '',
    persyaratan: '',
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res: any = await api.get('/bi/dashboard');
        if (res.success && res.data) {
          setData(res.data);
        }
      } catch (err) {
        console.error('Failed to load BI dashboard:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const handleCreateOpportunity = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res: any = await api.post('/opportunities', formData);
      if (res.success) {
        setSuccessMsg('Data UMKM Hub berhasil ditambahkan!');
        setTimeout(() => {
          setShowAddModal(false);
          setSuccessMsg('');
          setFormData({
            judul_peluang: '',
            nama_instansi: '',
            lokasi: '',
            kategori: 'F&B / Pengadaan',
            jumlah_dan_satuan: '',
            periode: '',
            status: 'Aktif',
            link_sumber: '',
            deskripsi: '',
            persyaratan: '',
          });
        }, 1500);
      }
    } catch (err) {
      console.error('Failed to add UMKM Hub data:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  if (loading) {
    return (
      <AppLayout title="Business Dashboard" subtitle="Menganalisis performa bisnis & indikator pertumbuhan">
        <LoadingSkeleton rows={5} />
      </AppLayout>
    );
  }

  const kpi = data?.kpi || {
    total_revenue: 9435000,
    total_transactions: 28,
    total_customers: 14,
    active_products: 4,
  };

  const trends = data?.trends || [];
  const productPerf = data?.product_performance || [];
  const insights = data?.insights || [];

  return (
    <AppLayout
      title="Business Growth Overview"
      subtitle='UX Storytelling: "Apa yang sedang terjadi pada bisnis saya?"'
    >
      {/* Storytelling Header Banner */}
      <div className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 p-6 rounded-3xl text-white shadow-xl shadow-sky-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-extrabold uppercase tracking-wider">
              UNDERSTAND ENGINE
            </span>
            <span className="text-xs text-sky-100 font-medium">Business Intelligence</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">
            Performa Usaha Kopi Karawang Heritage
          </h2>
          <p className="text-xs text-sky-100 mt-1 max-w-xl font-medium">
            Ringkasan omset penjualan, tren aktivitas transaksi, serta analisis performa produk dalam kurun waktu 30 hari terakhir.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/umkm-hub-input"
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-black shadow-lg transition-all flex items-center gap-2 active:scale-95"
          >
            <PlusCircle className="w-4 h-4 text-white" />
            <span>UMKM Hub</span>
          </Link>
          <Link
            to="/business-data"
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/30 transition-all flex items-center gap-2"
          >
            <UploadCloud className="w-4 h-4 text-sky-200" />
            <span>Upload Data Baru</span>
          </Link>
          <Link
            to="/recommendations"
            className="px-4 py-2.5 rounded-xl bg-white text-sky-700 hover:bg-sky-50 text-xs font-black shadow-lg transition-all flex items-center gap-1.5 active:scale-95"
          >
            <Target className="w-4 h-4 text-sky-600" />
            <span>Lihat Rekomendasi</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card hoverable className="border-l-4 border-l-sky-500 bg-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Total Revenue</span>
            <div className="p-2 rounded-xl bg-sky-100 text-sky-600">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{formatIDR(kpi.total_revenue)}</div>
          <div className="text-[11px] text-sky-600 flex items-center gap-1 mt-2 font-bold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+18% dibanding bulan lalu</span>
          </div>
        </Card>

        <Card hoverable className="border-l-4 border-l-blue-500 bg-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Total Transaksi</span>
            <div className="p-2 rounded-xl bg-blue-100 text-blue-600">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{kpi.total_transactions} <span className="text-xs text-slate-400 font-normal">order</span></div>
          <div className="text-[11px] text-slate-500 font-medium mt-2">Termasuk Ritel & B2B Direct</div>
        </Card>

        <Card hoverable className="border-l-4 border-l-indigo-500 bg-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Pelanggan Aktif</span>
            <div className="p-2 rounded-xl bg-indigo-100 text-indigo-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{kpi.total_customers} <span className="text-xs text-slate-400 font-normal">mitra/ritel</span></div>
          <div className="text-[11px] text-indigo-600 mt-2 font-bold">3 Cafe Wholesale Terdaftar</div>
        </Card>

        <Card hoverable className="border-l-4 border-l-teal-500 bg-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Produk Aktif</span>
            <div className="p-2 rounded-xl bg-teal-100 text-teal-600">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{kpi.active_products} <span className="text-xs text-slate-400 font-normal">SKU</span></div>
          <div className="text-[11px] text-teal-600 mt-2 font-bold">Katalog Siap Diorder</div>
        </Card>
      </div>

      {/* Visual Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trend Area Chart */}
        <Card className="lg:col-span-2 space-y-4 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-sky-500" />
                <span>Tren Pertumbuhan Omset (Monthly Revenue)</span>
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">Grafik omset usaha 6 bulan terakhir</p>
            </div>
            <Badge variant="sky">Analytical Engine</Badge>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trends}>
                <defs>
                  <linearGradient id="revenueGradSky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="period" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} tickFormatter={(val) => `Rp ${(val / 1000000).toFixed(1)}M`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', fontSize: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  formatter={(val: any) => [formatIDR(Number(val)), 'Omset']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#revenueGradSky)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Product Performance Bar Chart */}
        <Card className="space-y-4 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-slate-900">Performa Produk Utama</h3>
              <p className="text-[11px] text-slate-500 font-medium">Kontribusi penjualan berdasarkan SKU</p>
            </div>
            <Badge variant="indigo">SKU Mix</Badge>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productPerf} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" stroke="#64748b" fontSize={10} hide />
                <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={10} width={100} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', fontSize: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  formatter={(val: any) => [formatIDR(Number(val)), 'Total Omset']}
                />
                <Bar dataKey="revenue" fill="#6366f1" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Actionable BI Insight Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>Actionable Business Insights</span>
          </h3>
          <Link to="/insights" className="text-xs font-bold text-sky-600 hover:underline flex items-center gap-1">
            <span>Lihat Semua Insight</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {insights.map((insight: any, idx: number) => (
            <Card key={idx} hoverable className="border border-slate-200 bg-white flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant={idx === 0 ? 'sky' : idx === 1 ? 'indigo' : 'amber'}>
                    {insight.type?.toUpperCase()}
                  </Badge>
                  <span className="text-[10px] text-slate-400 font-mono font-bold">{insight.period}</span>
                </div>
                <h4 className="font-extrabold text-xs text-slate-900 leading-snug">{insight.title}</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed font-medium">{insight.description}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-medium">Metrik Kontribusi</span>
                <span className="font-black text-sky-600">{Math.round((insight.value || 0) * 100)}%</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* MODAL: Tambah Data UMKM Hub */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-5 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-black text-slate-900">Tambah Data UMKM Hub</h3>
                <p className="text-xs text-slate-500 font-medium">
                  Isi formulir 11 data utama peluang kemitraan UMKM Hub
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {successMsg && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleCreateOpportunity} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Judul Peluang *</label>
                  <input
                    type="text"
                    required
                    value={formData.judul_peluang}
                    onChange={(e) => setFormData({ ...formData, judul_peluang: e.target.value })}
                    placeholder="e.g. Pengadaan Suvenir Kopi Pemkab"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold text-slate-900 focus:ring-2 focus:ring-sky-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nama Instansi/Pihak *</label>
                  <input
                    type="text"
                    required
                    value={formData.nama_instansi}
                    onChange={(e) => setFormData({ ...formData, nama_instansi: e.target.value })}
                    placeholder="e.g. Diskop UMKM Karawang"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold text-slate-900 focus:ring-2 focus:ring-sky-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Lokasi *</label>
                  <input
                    type="text"
                    required
                    value={formData.lokasi}
                    onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                    placeholder="e.g. Kabupaten Karawang"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold text-slate-900 focus:ring-2 focus:ring-sky-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori *</label>
                  <select
                    value={formData.kategori}
                    onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold text-slate-900 focus:ring-2 focus:ring-sky-400 focus:outline-none"
                  >
                    <option value="F&B / Pengadaan">F&B / Pengadaan</option>
                    <option value="F&B / Supply Agreement">F&B / Supply Agreement</option>
                    <option value="Retail / Etalase Suvenir">Retail / Etalase Suvenir</option>
                    <option value="Fesyen & Kriya">Fesyen & Kriya</option>
                    <option value="Jasa & Teknologi">Jasa & Teknologi</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Jumlah dan Satuan *</label>
                  <input
                    type="text"
                    required
                    value={formData.jumlah_dan_satuan}
                    onChange={(e) => setFormData({ ...formData, jumlah_dan_satuan: e.target.value })}
                    placeholder="e.g. 500 Box / 250 kg"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold text-slate-900 focus:ring-2 focus:ring-sky-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Periode Pelaksanaan *</label>
                  <input
                    type="text"
                    required
                    value={formData.periode}
                    onChange={(e) => setFormData({ ...formData, periode: e.target.value })}
                    placeholder="e.g. Oktober - November 2026"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold text-slate-900 focus:ring-2 focus:ring-sky-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Status Peluang *</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold text-slate-900 focus:ring-2 focus:ring-sky-400 focus:outline-none"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Terbuka">Terbuka</option>
                    <option value="Proses Seleksi">Proses Seleksi</option>
                    <option value="Ditutup">Ditutup</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Link Sumber Web *</label>
                  <input
                    type="url"
                    required
                    value={formData.link_sumber}
                    onChange={(e) => setFormData({ ...formData, link_sumber: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold text-slate-900 focus:ring-2 focus:ring-sky-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Deskripsi Ringkas *</label>
                <textarea
                  required
                  rows={2}
                  value={formData.deskripsi}
                  onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                  placeholder="Penjelasan ringkas mengenai kebutuhan peluang usaha..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold text-slate-900 focus:ring-2 focus:ring-sky-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Persyaratan Kemitraan</label>
                <textarea
                  rows={2}
                  value={formData.persyaratan}
                  onChange={(e) => setFormData({ ...formData, persyaratan: e.target.value })}
                  placeholder="Kriteria UMKM (NIB, Halal, minimal omset, dll)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold text-slate-900 focus:ring-2 focus:ring-sky-400 focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold shadow-lg shadow-emerald-500/25 transition-all active:scale-95 disabled:opacity-50"
                >
                  {submitting ? 'Menyimpan...' : 'Simpan Data UMKM Hub'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppLayout>
  );
};
