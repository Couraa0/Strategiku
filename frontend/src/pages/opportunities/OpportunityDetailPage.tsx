import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { ArrowLeft, Building, MapPin, Calendar, ExternalLink, MessageSquare, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import api from '../../lib/api';

export const OpportunityDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [opp, setOpp] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

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
      <AppLayout title="Opportunity Detail">
        <div className="text-center py-12 text-slate-400">Memuat detail peluang...</div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Opportunity Detail" subtitle={opp.title}>
      <Link
        to="/opportunities"
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Katalog Peluang</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="space-y-6 border border-slate-800">
            <div className="flex items-center justify-between">
              <Badge variant="indigo">{opp.opportunity_type}</Badge>
              <span className="text-xs text-slate-400 font-mono">Status: <span className="text-emerald-400 font-bold">{opp.status}</span></span>
            </div>

            <div>
              <h1 className="text-2xl font-extrabold text-slate-100">{opp.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-2">
                <span className="flex items-center gap-1">
                  <Building className="w-4 h-4 text-slate-500" />
                  {opp.organization_name}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-rose-400" />
                  {opp.location}
                </span>
                <span className="flex items-center gap-1 font-mono">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  {opp.source_date}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Deskripsi Peluang</h4>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-4 rounded-2xl border border-slate-800">
                {opp.description}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Persyaratan Mitra UMKM</h4>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-4 rounded-2xl border border-slate-800">
                {opp.requirement}
              </p>
            </div>

            {/* Why This Opportunity Box */}
            <div className="p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 space-y-3">
              <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Why this opportunity?</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                  <span>Kategori <strong className="text-slate-100">{opp.category}</strong> sangat presisi dengan lini produk Kopi Karawang.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                  <span>Lokasi di <strong className="text-slate-100">{opp.location}</strong> terjangkau oleh armada logistik lokal.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                  <span>Kapasitas <strong className="text-emerald-400">{opp.capacity_required}</strong> aman di bawah batas maksimal sangrai bulanan (600kg).</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>

        {/* Sidebar Provenance & Action */}
        <div className="space-y-6">
          <Card className="space-y-4 border border-slate-800">
            <h3 className="text-sm font-bold text-slate-100 border-b border-slate-800 pb-2">
              Provenance Data Peluang
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Jenis Data Source</span>
                <span className="font-bold text-emerald-400">{opp.source}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Source URL</span>
                {opp.source_url ? (
                  <a
                    href={opp.source_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-400 hover:underline flex items-center gap-1 font-mono text-[11px] truncate"
                  >
                    <span>{opp.source_url}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-slate-400">Public Signal</span>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-2">
              <Link
                to="/assistant"
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Siapkan Penawaran via AI Assistant</span>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};
