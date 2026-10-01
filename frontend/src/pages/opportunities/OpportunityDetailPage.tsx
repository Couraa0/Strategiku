import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { ArrowLeft, Building, MapPin, Calendar, ExternalLink, MessageSquare, CheckCircle2, Sparkles } from 'lucide-react';
import api from '../../lib/api';

export const OpportunityDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [opp, setOpp] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res: any = await api.get(`/opportunities/${id}`);
        if (res.success && res.data) {
          setOpp(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading || !opp) {
    return (
      <AppLayout title="Detail Peluang">
        <div className="text-center py-12 text-slate-500 font-mono text-xs">Memuat detail peluang...</div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Detail Peluang" subtitle={opp.judul_peluang || opp.title}>
      <Link
        to="/recommendations"
        className="inline-flex items-center gap-1.5 text-xs text-sky-600 hover:text-sky-700 transition-colors mb-4 font-bold"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Rekomendasi</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="space-y-6 border border-slate-200 bg-white shadow-sm rounded-3xl">
            <div className="flex items-center justify-between">
              <Badge variant="indigo">{opp.kategori || opp.category || 'Umum'}</Badge>
              <span className="text-xs text-slate-500 font-bold">Status: <span className="text-emerald-600 font-black uppercase">{opp.status || 'Aktif'}</span></span>
            </div>

            <div>
              <h1 className="text-2xl font-black text-slate-900 leading-tight">{opp.judul_peluang || opp.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600 mt-3">
                <span className="flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-sky-500" />
                  {opp.nama_instansi || opp.organization_name}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-rose-500" />
                  {opp.lokasi || opp.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-indigo-500" />
                  {opp.periode || opp.source_date || '2026'}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Deskripsi Peluang</h4>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100 font-medium">
                {opp.deskripsi || opp.description || 'Tidak ada deskripsi spesifik.'}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Persyaratan Mitra UMKM</h4>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100 font-medium">
                {opp.persyaratan || opp.requirement || 'Tidak ada persyaratan khusus.'}
              </p>
            </div>

            {/* Why This Opportunity Box */}
            <div className="p-5 rounded-2xl bg-sky-50 border border-sky-100 space-y-3">
              <h4 className="text-xs font-extrabold text-sky-800 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-sky-500" />
                <span>Mengapa Peluang Ini Relevan?</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>Kategori <strong className="text-slate-900">{opp.kategori || opp.category}</strong> sangat presisi dengan lini produk usaha Anda.</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>Lokasi di <strong className="text-slate-900">{opp.lokasi || opp.location}</strong> terjangkau oleh armada logistik lokal.</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>Kuantitas <strong className="text-slate-900">{opp.jumlah_dan_satuan || opp.capacity_required}</strong> masih dalam batas kapasitas produksi Anda.</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>

        {/* Sidebar Provenance & Action */}
        <div className="space-y-6">
          <Card className="space-y-4 border border-slate-200 bg-white shadow-sm rounded-3xl">
            <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-3">
              Informasi Sumber Data
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider mb-1">Penyelenggara</span>
                <span className="font-bold text-slate-800">{opp.nama_instansi || opp.source || 'Instansi Terkait'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider mb-1">Link Sumber</span>
                {opp.link_sumber || opp.source_url ? (
                  <a
                    href={opp.link_sumber || opp.source_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sky-600 hover:text-sky-700 hover:underline flex items-center gap-1.5 font-bold truncate bg-sky-50 p-2 rounded-lg border border-sky-100"
                  >
                    <span className="truncate">{opp.link_sumber || opp.source_url}</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>
                ) : (
                  <span className="text-slate-500 font-medium">Data Publik Terverifikasi</span>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2">
              <Link
                to="/assistant"
                className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-extrabold text-xs shadow-lg shadow-sky-500/25 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Siapkan Penawaran via AI</span>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};
