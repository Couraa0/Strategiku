import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { CheckCircle2, MapPin, Building, MessageSquare } from 'lucide-react';
import api from '../../lib/api';

export const RecommendationsPage: React.FC = () => {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res: any = await api.get('/recommendations');
        if (res.success && res.data) {
          setRecommendations(res.data.recommendations || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, []);

  return (
    <AppLayout
      title="Contextual Recommendations"
      subtitle="Hero Innovation: Matching otomatis profil UMKM dengan peluang usaha potensial"
    >
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 p-6 rounded-3xl text-white shadow-xl shadow-sky-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-extrabold uppercase tracking-wider">
              HERO INNOVATION ENGINE
            </span>
            <span className="text-xs text-sky-100 font-medium">Similarity & Contextual Ranking Pipeline</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">
            Top Growth Opportunities Recommended for You
          </h2>
          <p className="text-xs text-sky-100 mt-1 max-w-xl font-medium">
            Sistem menghitung kecocokan profil produk, lokasi Jawa Barat, kapasitas roasting bulanan, dan tujuan bisnis Anda dengan tiap signal peluang secara transparan.
          </p>
        </div>
      </div>

      {/* Recommendations Ranking List */}
      <div className="space-y-6">
        {recommendations.map((rec) => (
          <Card key={rec.recommendation_id} hoverable className="border border-slate-200 bg-white space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-sky-500 text-white flex items-center justify-center font-black text-base shadow-md shadow-sky-500/25">
                  #{rec.rank}
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">{rec.opportunity?.title}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5 font-medium">
                    <span className="flex items-center gap-1">
                      <Building className="w-3.5 h-3.5 text-slate-400" />
                      {rec.opportunity?.organization_name}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" />
                      {rec.opportunity?.location}
                    </span>
                  </p>
                </div>
              </div>

              {/* Relevance Score Pill */}
              <div className="px-4 py-2 rounded-2xl bg-sky-50 border border-sky-200 text-right shadow-2xs">
                <span className="text-[10px] uppercase tracking-wider text-sky-700 block font-extrabold">
                  Relevance Score
                </span>
                <span className="text-xl font-black text-sky-600">
                  {Math.round(rec.score * 100)}%
                </span>
              </div>
            </div>

            {/* Why Recommended Explanation Flags */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Why Recommended:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {rec.reason?.map((r: string, idx: number) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center gap-2 font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                    <span className="capitalize">{r.replace('_', ' ')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-500 font-medium">
                Kapasitas Dibutuhkan: <strong className="text-slate-900 font-bold">{rec.opportunity?.capacity_required}</strong>
              </span>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Link
                  to={`/opportunities/${rec.opportunity_id}`}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200 transition-all text-center flex-1 sm:flex-none"
                >
                  View Opportunity
                </Link>
                <Link
                  to="/assistant"
                  className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-extrabold text-xs shadow-lg shadow-sky-500/25 transition-all flex items-center justify-center gap-1.5 text-center flex-1 sm:flex-none active:scale-95"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Prepare Response</span>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
};
