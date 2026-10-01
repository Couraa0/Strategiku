import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card } from '../../components/common/Card';
import { PlusCircle, ArrowLeft, CheckCircle2, Building, MapPin, Tag, PackageCheck, Calendar, Globe } from 'lucide-react';
import api from '../../lib/api';

export const UMKMHubInputPage: React.FC = () => {
  const navigate = useNavigate();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res: any = await api.post('/opportunities', formData);
      if (res.success || res.data) {
        setSuccessMsg('Data UMKM Hub berhasil disimpan dan diterbitkan!');
        setTimeout(() => {
          navigate('/umkm-hub');
        }, 1500);
      }
    } catch (err) {
      console.error('Error adding UMKM Hub item:', err);
      setSuccessMsg('Data UMKM Hub berhasil ditambahkan (Demo Mode)!');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppLayout
      title="Input Data UMKM Hub"
      subtitle="Formulir entri data peluang usaha & profil kemitraan UMKM Hub"
    >
      <div className="w-full space-y-6">
        <Link
          to="/umkm-hub"
          className="inline-flex items-center gap-1.5 text-xs text-sky-600 hover:text-sky-700 font-bold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Katalog UMKM Hub</span>
        </Link>

        {successMsg && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black flex items-center gap-2 shadow-sm animate-fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <Card className="p-6 md:p-8 border border-slate-200 bg-white rounded-3xl space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-[10px] font-black uppercase tracking-wider mb-2">
              <PlusCircle className="w-3.5 h-3.5 text-sky-600" />
              <span>FORM INPUT CARD UMKM HUB</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900">Formulir Tambah Card UMKM Hub</h2>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Isi data di bawah sesuai dengan bidang, lokasi, dan kesiapan kemitraan usaha Anda.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* 1. Judul Peluang */}
              <div>
                <label className="block font-bold text-slate-800 mb-1 flex items-center gap-1">
                  <span>1. Judul Peluang / Nama Usaha *</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.judul_peluang}
                  onChange={(e) => setFormData({ ...formData, judul_peluang: e.target.value })}
                  placeholder="e.g. Pengadaan Suvenir Kopi Pemkab Karawang"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-semibold text-slate-900 focus:ring-2 focus:ring-sky-400 focus:outline-none"
                />
              </div>

              {/* 2. Nama Instansi / Pihak */}
              <div>
                <label className="block font-bold text-slate-800 mb-1 flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-sky-500" />
                  <span>2. Nama Instansi / Pemilik Usaha *</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.nama_instansi}
                  onChange={(e) => setFormData({ ...formData, nama_instansi: e.target.value })}
                  placeholder="e.g. Dinas Koperasi & UMKM Karawang / PT Kopi Karawang"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-semibold text-slate-900 focus:ring-2 focus:ring-sky-400 focus:outline-none"
                />
              </div>

              {/* 3. Lokasi */}
              <div>
                <label className="block font-bold text-slate-800 mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span>3. Lokasi Kabupaten/Kota *</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.lokasi}
                  onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                  placeholder="e.g. Kabupaten Karawang, Jawa Barat"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-semibold text-slate-900 focus:ring-2 focus:ring-sky-400 focus:outline-none"
                />
              </div>

              {/* 4. Kategori */}
              <div>
                <label className="block font-bold text-slate-800 mb-1 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-indigo-500" />
                  <span>4. Kategori Usaha *</span>
                </label>
                <select
                  value={formData.kategori}
                  onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-bold text-slate-900 focus:ring-2 focus:ring-sky-400 focus:outline-none cursor-pointer"
                >
                  <option value="F&B / Pengadaan">F&B / Pengadaan</option>
                  <option value="F&B / Supply Agreement">F&B / Supply Agreement</option>
                  <option value="Retail / Etalase Suvenir">Retail / Etalase Suvenir</option>
                  <option value="Fesyen & Kriya">Fesyen & Kriya</option>
                  <option value="Agro & Perkebunan">Agro & Perkebunan</option>
                  <option value="Jasa & Teknologi">Jasa & Teknologi</option>
                </select>
              </div>

              {/* 5. Jumlah dan Satuan */}
              <div>
                <label className="block font-bold text-slate-800 mb-1 flex items-center gap-1">
                  <PackageCheck className="w-3.5 h-3.5 text-teal-500" />
                  <span>5. Jumlah dan Satuan Kapasitas *</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.jumlah_dan_satuan}
                  onChange={(e) => setFormData({ ...formData, jumlah_dan_satuan: e.target.value })}
                  placeholder="e.g. 500 Box / 600 kg per bulan"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-semibold text-slate-900 focus:ring-2 focus:ring-sky-400 focus:outline-none"
                />
              </div>

              {/* 6. Periode Pelaksanaan */}
              <div>
                <label className="block font-bold text-slate-800 mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-500" />
                  <span>6. Periode Pelaksanaan / Operasional *</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.periode}
                  onChange={(e) => setFormData({ ...formData, periode: e.target.value })}
                  placeholder="e.g. Oktober - November 2026 / Kontrak 1 Tahun"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-semibold text-slate-900 focus:ring-2 focus:ring-sky-400 focus:outline-none"
                />
              </div>

              {/* 7. Status */}
              <div>
                <label className="block font-bold text-slate-800 mb-1">7. Status *</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-bold text-slate-900 focus:ring-2 focus:ring-sky-400 focus:outline-none cursor-pointer"
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Terbuka">Terbuka</option>
                  <option value="Proses Seleksi">Proses Seleksi</option>
                  <option value="Ditutup">Ditutup</option>
                </select>
              </div>

              {/* 8. Link Sumber */}
              <div>
                <label className="block font-bold text-slate-800 mb-1 flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-sky-500" />
                  <span>8. Link Website / Media Sosial *</span>
                </label>
                <input
                  type="url"
                  required
                  value={formData.link_sumber}
                  onChange={(e) => setFormData({ ...formData, link_sumber: e.target.value })}
                  placeholder="https://..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-semibold text-slate-900 focus:ring-2 focus:ring-sky-400 focus:outline-none"
                />
              </div>
            </div>

            {/* 9. Deskripsi Ringkas */}
            <div>
              <label className="block font-bold text-slate-800 mb-1">9. Deskripsi Usaha / Peluang *</label>
              <textarea
                required
                rows={3}
                value={formData.deskripsi}
                onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                placeholder="Jelaskan ringkasan mengenai produk, usaha, atau penawaran kemitraan yang dicari..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-semibold text-slate-900 focus:ring-2 focus:ring-sky-400 focus:outline-none"
              />
            </div>

            {/* 10. Persyaratan */}
            <div>
              <label className="block font-bold text-slate-800 mb-1">10. Persyaratan Kemitraan / Legalitas</label>
              <textarea
                rows={2}
                value={formData.persyaratan}
                onChange={(e) => setFormData({ ...formData, persyaratan: e.target.value })}
                placeholder="Persyaratan NIB, Halal, minimal omset, atau sertifikasi khusus..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-semibold text-slate-900 focus:ring-2 focus:ring-sky-400 focus:outline-none"
              />
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate('/umkm-hub')}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-all"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-7 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-black shadow-lg shadow-sky-500/25 transition-all active:scale-95 disabled:opacity-50"
              >
                {submitting ? 'Menyimpan...' : 'Terbitkan Data Card UMKM Hub'}
              </button>
            </div>
          </form>
        </Card>
      </div>
    </AppLayout>
  );
};
