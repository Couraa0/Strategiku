import React, { useState } from 'react';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Building2, Save, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../lib/api';

export const BusinessProfilePage: React.FC = () => {
  const { business, updateUserBusiness } = useAuth();
  const [formData, setFormData] = useState({
    name: business?.name || 'Kopi Karawang Heritage',
    type: business?.type || 'F&B / Pengolahan Kopi Specialty',
    description: business?.description || 'Produsen kopi lokal specialty dan olahan turunan kopi asli Karawang, Jawa Barat.',
    province: business?.province || 'Jawa Barat',
    city_regency: business?.city_regency || 'Karawang',
    district: business?.district || 'Karawang Barat',
    phone: business?.phone || '081234567890',
    email: business?.email || 'info@kopikarawang.id',
    website: business?.website || 'https://kopikarawang.id',
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res: any = await api.put('/business', formData);
      if (res.success) {
        updateUserBusiness(formData);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AppLayout title="Business Profile" subtitle="Pengelolaan data identitas & profil usaha UMKM">
      <div className="max-w-4xl mx-auto space-y-6">
        {saved && (
          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-sky-800 text-xs flex items-center gap-2 font-extrabold shadow-xs">
            <ShieldCheck className="w-5 h-5 text-sky-600" />
            <span>Profil bisnis berhasil diperbarui & tersinkronisasi.</span>
          </div>
        )}

        <Card className="space-y-6 border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-sky-500" />
              <span>Informasi Utama Usaha</span>
            </h3>
            <Badge variant="sky">SHARED CONTEXT</Badge>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Usaha UMKM</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Sektor / Jenis Usaha</label>
                <input
                  type="text"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kabupaten / Kota</label>
                <input
                  type="text"
                  value={formData.city_regency}
                  onChange={(e) => setFormData({ ...formData, city_regency: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kecamatan</label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi Ringkas Usaha</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
              />
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-extrabold text-xs shadow-lg shadow-sky-500/25 transition-all flex items-center gap-2 active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Perubahan</span>
              </button>
            </div>
          </form>
        </Card>
      </div>
    </AppLayout>
  );
};
