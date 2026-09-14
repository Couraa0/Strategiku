import React, { useEffect, useState } from 'react';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import api from '../../lib/api';

export const InsightsPage: React.FC = () => {
  const [insights, setInsights] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const res: any = await api.get('/bi/insights');
        if (res.success && res.data) {
          setInsights(res.data.insights || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchInsights();
  }, []);

  return (
    <AppLayout
      title="Business Insights"
      subtitle="Analisis terkonfirmasi dari data bisnis & performa transaksi"
    >
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="sky">UNDERSTAND ENGINE</Badge>
          <span className="text-xs text-slate-500 font-medium">Analytical Business Intelligence Service</span>
        </div>
        <h2 className="text-xl font-black text-slate-900">Daftar Insight Pertumbuhan Usaha</h2>
        <p className="text-xs text-slate-600 max-w-2xl font-medium">
          Insight yang dihasilkan merupakan analisis data faktual berbasis omset, frekuensi pembelian, dan performa saluran penjualan tanpa membuat klaim yang tidak berdasar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map((insight, idx) => (
          <Card key={idx} hoverable className="space-y-4 border border-slate-200 bg-white">
            <div className="flex items-center justify-between">
              <Badge variant={idx === 0 ? 'sky' : idx === 1 ? 'indigo' : 'amber'}>
                {insight.type?.toUpperCase()}
              </Badge>
              <span className="text-xs text-slate-400 font-mono font-bold">Periode {insight.period}</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-extrabold text-slate-900">{insight.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">{insight.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-medium">
              <span className="text-slate-500">Kontribusi Nilai Metric</span>
              <span className="font-black text-sky-600 text-sm">
                {Math.round((insight.value || 0) * 100)}%
              </span>
            </div>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
};
