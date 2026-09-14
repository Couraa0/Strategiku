import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { MapPin, Building, Calendar, ExternalLink, Filter, Sparkles } from 'lucide-react';
import api from '../../lib/api';

export const OpportunityCenterPage: React.FC = () => {
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');

  const fetchOpportunities = async () => {
    setLoading(true);
    try {
      const res: any = await api.get('/opportunities', {
        params: { category, location, type },
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
  }, [category, location, type]);

  const getSourceBadge = (source: string) => {
    if (source === 'Verified Opportunity') {
      return <Badge variant="sky">Verified Opportunity</Badge>;
    }
    if (source === 'Public Business Opportunity Signal') {
      return <Badge variant="amber">Public Signal</Badge>;
    }
    return <Badge variant="slate">Curated Prototype</Badge>;
  };

  return (
    <AppLayout
      title="Opportunity Center"
      subtitle='UX Storytelling: "Peluang apa yang relevan dengan kondisi bisnis saya?"'
    >
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 p-6 rounded-3xl text-white shadow-xl shadow-sky-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-extrabold uppercase tracking-wider">
              DISCOVER ENGINE
            </span>
            <span className="text-xs text-sky-100 font-medium">Provenance-Verified Opportunity Signals</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">Katalog Peluang Usaha Jawa Barat</h2>
          <p className="text-xs text-sky-100 mt-1 max-w-xl font-medium">
            Peluang pengadaan korporat, kemitraan cafe, dan kuota pasokan yang dikumpulkan dengan transparansi provenance data.
          </p>
        </div>
        <Link
          to="/recommendations"
          className="px-4 py-2.5 rounded-xl bg-white text-sky-700 hover:bg-sky-50 text-xs font-black shadow-lg transition-all flex items-center gap-2 whitespace-nowrap active:scale-95"
        >
          <Sparkles className="w-4 h-4 text-sky-600" />
          <span>Lihat Skor Rekomendasi %</span>
        </Link>
      </div>

      {/* Filter Toolbar */}
      <Card className="flex flex-wrap items-center gap-4 bg-white border border-slate-200">
        <div className="flex items-center gap-2 text-xs font-extrabold text-slate-800">
          <Filter className="w-4 h-4 text-sky-500" />
          <span>Filter Peluang:</span>
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium focus:outline-none focus:border-sky-500"
        >
          <option value="">Semua Kategori (Kopi, F&B, Suvenir)</option>
          <option value="F&B / Kopi">F&B / Kopi</option>
          <option value="F&B / Retail suvenir">Retail Suvenir</option>
          <option value="F&B / Distributor">Distributor</option>
        </select>

        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium focus:outline-none focus:border-sky-500"
        >
          <option value="">Semua Lokasi (Kab/Kota Jabar)</option>
          <option value="Kabupaten Karawang">Karawang</option>
          <option value="Kota Bandung">Kota Bandung</option>
          <option value="Kabupaten Purwakarta">Purwakarta</option>
          <option value="Kota Bekasi">Bekasi</option>
        </select>
      </Card>

      {/* Opportunity Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {opportunities.map((opp) => (
          <Card key={opp.opportunity_id} hoverable className="space-y-4 border border-slate-200 bg-white flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                {getSourceBadge(opp.source)}
                <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono font-medium">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  {opp.source_date}
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

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs font-medium">
                <div className="flex items-center justify-between text-slate-500">
                  <span>Lokasi Target:</span>
                  <span className="font-bold text-slate-900 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-rose-500" />
                    {opp.location}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <span>Kapasitas Dibutuhkan:</span>
                  <span className="font-extrabold text-sky-600">{opp.capacity_required}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-medium">Status: <span className="text-sky-600 font-extrabold">{opp.status}</span></span>
              <Link
                to={`/opportunities/${opp.opportunity_id}`}
                className="px-3.5 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold text-xs border border-sky-200 transition-all flex items-center gap-1"
              >
                <span>Lihat Detail Peluang</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
};
