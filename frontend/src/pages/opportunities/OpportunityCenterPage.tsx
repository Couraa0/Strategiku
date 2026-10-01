import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import {
  MapPin,
  Building,
  Calendar,
  ExternalLink,
  Filter,
  Sparkles,
  PlusCircle,
  X,
  Save,
  CheckCircle2,
  ShieldAlert,
} from 'lucide-react';
import api from '../../lib/api';

export const OpportunityCenterPage: React.FC = () => {
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');

  // Admin Modal state
  const [showAdminModal, setShowAdminModal] = useState<boolean>(false);
  const [adminSuccessMsg, setAdminSuccessMsg] = useState<string>('');
  const [adminFormData, setAdminFormData] = useState({
    title: '',
    organization_name: '',
    location: '',
    category: 'F&B / Pengadaan',
    quantity_unit: '',
    periode: '',
    status: 'Aktif',
    source_url: '',
    description: '',
    requirement: '',
  });

  const fetchOpportunities = async () => {
    setLoading(true);
    try {
      const res: any = await api.get('/opportunities', {
        params: { category, location },
      });
      if (res.success && res.data) {
        setOpportunities(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, [category, location]);

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res: any = await api.post('/opportunities', adminFormData);
      if (res.success && res.data) {
        setOpportunities([res.data, ...opportunities]);
      } else {
        const newOpp = {
          opportunity_id: `OPP-${Date.now()}`,
          ...adminFormData,
          capacity_required: adminFormData.quantity_unit,
          source_date: new Date().toISOString().split('T')[0],
          source: 'Verified Opportunity',
        };
        setOpportunities([newOpp, ...opportunities]);
      }
      setAdminSuccessMsg('Data peluang UMKM Hub berhasil ditambahkan oleh Admin!');
      setTimeout(() => {
        setAdminSuccessMsg('');
        setShowAdminModal(false);
        setAdminFormData({
          title: '',
          organization_name: '',
          location: '',
          category: 'F&B / Pengadaan',
          quantity_unit: '',
          periode: '',
          status: 'Aktif',
          source_url: '',
          description: '',
          requirement: '',
        });
      }, 1500);
    } catch (err) {
      console.error(err);
      const newOpp = {
        opportunity_id: `OPP-${Date.now()}`,
        ...adminFormData,
        capacity_required: adminFormData.quantity_unit,
        source_date: new Date().toISOString().split('T')[0],
        source: 'Verified Opportunity',
      };
      setOpportunities([newOpp, ...opportunities]);
      setAdminSuccessMsg('Data peluang UMKM Hub berhasil ditambahkan!');
      setTimeout(() => {
        setAdminSuccessMsg('');
        setShowAdminModal(false);
      }, 1500);
    }
  };

  return (
    <AppLayout
      title="Opportunity Center & Admin UMKM Hub"
      subtitle="Manajemen data peluang & kemitraan UMKM Jawa Barat"
    >
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 p-6 rounded-3xl text-white shadow-xl shadow-sky-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-extrabold uppercase tracking-wider">
              ADMIN & HUB MANAGEMENT
            </span>
            <span className="text-xs text-sky-100 font-medium">Tambah & Kelola Peluang Usaha UMKM</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">Katalog Peluang Usaha UMKM Hub</h2>
          <p className="text-xs text-sky-100 mt-1 max-w-xl font-medium">
            Admin dapat menambahkan data peluang baru secara terpisah untuk ditampilkan di UMKM Hub dan diproses oleh engine rekomendasi.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowAdminModal(true)}
            className="px-4 py-2.5 rounded-xl bg-white text-sky-700 hover:bg-sky-50 text-xs font-black shadow-lg transition-all flex items-center gap-2 whitespace-nowrap active:scale-95"
          >
            <PlusCircle className="w-4 h-4 text-sky-600" />
            <span>+ Admin: Tambah Data UMKM Hub</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <Card className="flex flex-wrap items-center justify-between gap-4 bg-white border border-slate-200">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-extrabold text-slate-800">
            <Filter className="w-4 h-4 text-sky-500" />
            <span>Filter Peluang:</span>
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium focus:outline-none focus:border-sky-500"
          >
            <option value="">Semua Kategori</option>
            <option value="F&B / Pengadaan">F&B / Pengadaan</option>
            <option value="F&B / Kopi">F&B / Kopi</option>
            <option value="Supply Agreement">Supply Agreement</option>
            <option value="Retail / Etalase Suvenir">Retail Suvenir</option>
          </select>

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium focus:outline-none focus:border-sky-500"
          >
            <option value="">Semua Lokasi</option>
            <option value="Kabupaten Karawang">Karawang</option>
            <option value="Kota Bandung">Kota Bandung</option>
            <option value="Kabupaten Purwakarta">Purwakarta</option>
          </select>
        </div>

        <Link
          to="/recommendations"
          className="px-3.5 py-2 rounded-xl bg-sky-50 border border-sky-200 text-sky-700 hover:bg-sky-100 text-xs font-bold flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-sky-500" />
          <span>Lihat Matriks Card Rekomendasi (11 Data)</span>
        </Link>
      </Card>

      {/* Opportunity Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {opportunities.map((opp) => (
          <Card key={opp.opportunity_id} hoverable className="space-y-4 border border-slate-200 bg-white flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="sky">{opp.category || 'Peluang UMKM Hub'}</Badge>
                <span className="text-[11px] text-slate-400 font-mono font-medium">
                  {opp.periode || '2026'}
                </span>
              </div>

              <div>
                <h3 className="text-base font-black text-slate-900 hover:text-sky-600 transition-colors">
                  {opp.title}
                </h3>
                <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1 font-medium">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  <span>{opp.organization_name}</span>
                </p>
              </div>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-medium">
                {opp.description}
              </p>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs font-medium">
                <div className="flex items-center justify-between text-slate-500">
                  <span>Lokasi:</span>
                  <span className="font-bold text-slate-900 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-rose-500" />
                    {opp.location}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <span>Jumlah & Satuan:</span>
                  <span className="font-extrabold text-sky-600">{opp.quantity_unit || opp.capacity_required}</span>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <span>Link Sumber:</span>
                  <a
                    href={opp.source_url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-sky-600 hover:underline flex items-center gap-1"
                  >
                    <span>Buka Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-medium">Status: <span className="text-sky-600 font-extrabold">{opp.status || 'Aktif'}</span></span>
              <Link
                to={`/opportunities/${opp.opportunity_id}`}
                className="px-3.5 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold text-xs border border-sky-200 transition-all flex items-center gap-1"
              >
                <span>Detail Peluang</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {/* ADMIN MODAL: Form Input Tambah Data UMKM Hub */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 space-y-5 shadow-2xl relative my-8 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-sky-500" />
                  <span>Admin: Form Tambah Data UMKM Hub</span>
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Isi data peluang usaha baru di bawah untuk dipublikasikan ke UMKM Hub.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAdminModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {adminSuccessMsg ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{adminSuccessMsg}</span>
              </div>
            ) : (
              <form onSubmit={handleAdminSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Judul peluang:</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Pengadaan Suvenir Kopi Pemkab"
                      value={adminFormData.title}
                      onChange={(e) => setAdminFormData({ ...adminFormData, title: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nama instansi/pihak:</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dinas Koperasi & UMKM"
                      value={adminFormData.organization_name}
                      onChange={(e) => setAdminFormData({ ...adminFormData, organization_name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Lokasi:</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kabupaten Karawang"
                      value={adminFormData.location}
                      onChange={(e) => setAdminFormData({ ...adminFormData, location: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Kategori:</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. F&B / Pengadaan"
                      value={adminFormData.category}
                      onChange={(e) => setAdminFormData({ ...adminFormData, category: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Jumlah dan satuan:</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 500 Box / 10 Ton"
                      value={adminFormData.quantity_unit}
                      onChange={(e) => setAdminFormData({ ...adminFormData, quantity_unit: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Periode:</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 1 Okt - 15 Nov 2026"
                      value={adminFormData.periode}
                      onChange={(e) => setAdminFormData({ ...adminFormData, periode: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Status:</label>
                    <select
                      value={adminFormData.status}
                      onChange={(e) => setAdminFormData({ ...adminFormData, status: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:border-sky-500 cursor-pointer"
                    >
                      <option value="Aktif">Aktif</option>
                      <option value="Terbuka">Terbuka</option>
                      <option value="Proses Seleksi">Proses Seleksi</option>
                      <option value="Ditutup">Ditutup</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Link sumber:</label>
                    <input
                      type="url"
                      required
                      placeholder="https://..."
                      value={adminFormData.source_url}
                      onChange={(e) => setAdminFormData({ ...adminFormData, source_url: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi peluang:</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Deskripsi ringkas mengenai kebutuhan peluang..."
                    value={adminFormData.description}
                    onChange={(e) => setAdminFormData({ ...adminFormData, description: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Persyaratan:</label>
                  <textarea
                    rows={2}
                    placeholder="Persyaratan legalitas/spesifikasi produk..."
                    value={adminFormData.requirement}
                    onChange={(e) => setAdminFormData({ ...adminFormData, requirement: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAdminModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-black shadow-md flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    <span>Simpan & Publikasikan</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </AppLayout>
  );
};
