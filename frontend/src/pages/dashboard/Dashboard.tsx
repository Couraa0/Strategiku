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
  Award,
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
        <div className="flex items-center gap-3">
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
            <span>Lihat Peluang Usaha</span>
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
    </AppLayout>
  );
};
