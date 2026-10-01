import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Receipt,
  Users,
  ShoppingBag,
  Target,
  Lightbulb,
  ChevronRight,
  Calendar,
  Layers,
  CreditCard,
  Banknote,
  CircleDollarSign,
  CheckCircle2,
  AlertTriangle,
  Info,
  Sparkles,
  Phone,
  MapPin,
  Star,
  UserPlus,
  UserCheck,
  UserX,
  Clock,
  Percent,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { AppLayout } from '../../components/layout/AppLayout';
import { Badge } from '../../components/common/Badge';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import api from '../../lib/api';

// ─── Demo Data ───────────────────────────────────────────
const MONTHLY_REVENUE = [
  { month: 'Mei', revenue: 6200000, expenses: 3800000, profit: 2400000 },
  { month: 'Jun', revenue: 7100000, expenses: 4200000, profit: 2900000 },
  { month: 'Jul', revenue: 7850000, expenses: 4500000, profit: 3350000 },
  { month: 'Agt', revenue: 8400000, expenses: 4100000, profit: 4300000 },
  { month: 'Sep', revenue: 9435000, expenses: 4800000, profit: 4635000 },
  { month: 'Okt', revenue: 10250000, expenses: 5100000, profit: 5150000 },
];

const WEEKLY_TRANSACTIONS = [
  { week: 'W1 Sep', orders: 18, avgValue: 285000 },
  { week: 'W2 Sep', orders: 22, avgValue: 310000 },
  { week: 'W3 Sep', orders: 25, avgValue: 295000 },
  { week: 'W4 Sep', orders: 28, avgValue: 340000 },
  { week: 'W1 Okt', orders: 31, avgValue: 325000 },
  { week: 'W2 Okt', orders: 35, avgValue: 360000 },
];

const EXPENSE_BREAKDOWN = [
  { name: 'Bahan Baku', value: 2100000, color: '#0ea5e9' },
  { name: 'Kemasan', value: 850000, color: '#6366f1' },
  { name: 'Tenaga Kerja', value: 1200000, color: '#f59e0b' },
  { name: 'Logistik', value: 520000, color: '#10b981' },
  { name: 'Marketing', value: 280000, color: '#ef4444' },
  { name: 'Operasional', value: 150000, color: '#8b5cf6' },
];

const CUSTOMER_GROWTH = [
  { month: 'Mei', newCustomers: 3, totalCustomers: 8, retention: 75 },
  { month: 'Jun', newCustomers: 2, totalCustomers: 10, retention: 80 },
  { month: 'Jul', newCustomers: 4, totalCustomers: 12, retention: 83 },
  { month: 'Agt', newCustomers: 1, totalCustomers: 13, retention: 85 },
  { month: 'Sep', newCustomers: 3, totalCustomers: 14, retention: 86 },
  { month: 'Okt', newCustomers: 4, totalCustomers: 17, retention: 88 },
];

const PRODUCT_MIX = [
  { product: 'Arabica 200g', revenue: 3200000, units: 160, margin: 42 },
  { product: 'Robusta 250g', revenue: 2800000, units: 200, margin: 38 },
  { product: 'Drip Coffee', revenue: 1950000, units: 390, margin: 55 },
  { product: 'Gift Box Set', revenue: 1500000, units: 50, margin: 48 },
  { product: 'Cold Brew 1L', revenue: 800000, units: 80, margin: 35 },
];

const RADAR_DATA = [
  { metric: 'Revenue Growth', value: 85, fullMark: 100 },
  { metric: 'Profit Margin', value: 50, fullMark: 100 },
  { metric: 'Customer Ret.', value: 88, fullMark: 100 },
  { metric: 'Product Quality', value: 92, fullMark: 100 },
  { metric: 'Market Reach', value: 65, fullMark: 100 },
  { metric: 'Operational Eff.', value: 72, fullMark: 100 },
];

const CASHFLOW_DATA = [
  { month: 'Mei', inflow: 6200000, outflow: -3800000, net: 2400000 },
  { month: 'Jun', inflow: 7100000, outflow: -4200000, net: 2900000 },
  { month: 'Jul', inflow: 7850000, outflow: -4500000, net: 3350000 },
  { month: 'Agt', inflow: 8400000, outflow: -4100000, net: 4300000 },
  { month: 'Sep', inflow: 9435000, outflow: -4800000, net: 4635000 },
  { month: 'Okt', inflow: 10250000, outflow: -5100000, net: 5150000 },
];

const DAILY_REVENUE_SPARK = [
  { day: '1', val: 320000 }, { day: '2', val: 410000 }, { day: '3', val: 380000 },
  { day: '4', val: 520000 }, { day: '5', val: 290000 }, { day: '6', val: 680000 },
  { day: '7', val: 450000 }, { day: '8', val: 390000 }, { day: '9', val: 710000 },
  { day: '10', val: 560000 }, { day: '11', val: 480000 }, { day: '12', val: 620000 },
  { day: '13', val: 530000 }, { day: '14', val: 750000 },
];

// Revenue Tab Specific Data
const REVENUE_BY_CHANNEL = [
  { channel: 'Toko Fisik', revenue: 4200000, color: '#0ea5e9' },
  { channel: 'Online (Shopee/Tokped)', revenue: 2800000, color: '#6366f1' },
  { channel: 'B2B / Wholesale', revenue: 2100000, color: '#10b981' },
  { channel: 'Event / Bazaar', revenue: 1150000, color: '#f59e0b' },
];

const DAILY_REVENUE_DETAIL = [
  { day: 'Sen', online: 180000, offline: 250000, b2b: 120000 },
  { day: 'Sel', online: 210000, offline: 220000, b2b: 80000 },
  { day: 'Rab', online: 190000, offline: 300000, b2b: 150000 },
  { day: 'Kam', online: 250000, offline: 280000, b2b: 200000 },
  { day: 'Jum', online: 320000, offline: 350000, b2b: 180000 },
  { day: 'Sab', online: 450000, offline: 520000, b2b: 100000 },
  { day: 'Min', online: 380000, offline: 480000, b2b: 50000 },
];

// Expenses Tab Specific Data
const MONTHLY_EXPENSES = [
  { month: 'Mei', bahanBaku: 1800000, kemasan: 650000, tenagaKerja: 950000, logistik: 300000, marketing: 100000 },
  { month: 'Jun', bahanBaku: 1900000, kemasan: 700000, tenagaKerja: 1000000, logistik: 380000, marketing: 220000 },
  { month: 'Jul', bahanBaku: 2000000, kemasan: 750000, tenagaKerja: 1050000, logistik: 420000, marketing: 280000 },
  { month: 'Agt', bahanBaku: 1850000, kemasan: 700000, tenagaKerja: 1000000, logistik: 350000, marketing: 200000 },
  { month: 'Sep', bahanBaku: 2050000, kemasan: 800000, tenagaKerja: 1100000, logistik: 480000, marketing: 370000 },
  { month: 'Okt', bahanBaku: 2100000, kemasan: 850000, tenagaKerja: 1200000, logistik: 520000, marketing: 430000 },
];

const EXPENSE_VS_REVENUE = [
  { month: 'Mei', revenue: 6200000, expenses: 3800000, ratio: 61 },
  { month: 'Jun', revenue: 7100000, expenses: 4200000, ratio: 59 },
  { month: 'Jul', revenue: 7850000, expenses: 4500000, ratio: 57 },
  { month: 'Agt', revenue: 8400000, expenses: 4100000, ratio: 49 },
  { month: 'Sep', revenue: 9435000, expenses: 4800000, ratio: 51 },
  { month: 'Okt', revenue: 10250000, expenses: 5100000, ratio: 50 },
];

// Customer Tab Specific Data
const CUSTOMER_LIST = [
  { name: 'Cafe Kopi Nusantara', type: 'B2B', city: 'Karawang', orders: 12, revenue: 3600000, lastOrder: '28 Sep 2026', status: 'active' },
  { name: 'Toko Oleh-oleh Sunda', type: 'Retail', city: 'Bandung', orders: 8, revenue: 1200000, lastOrder: '25 Sep 2026', status: 'active' },
  { name: 'Hotel Grand Karawang', type: 'B2B', city: 'Karawang', orders: 6, revenue: 2400000, lastOrder: '20 Sep 2026', status: 'active' },
  { name: 'Marketplace Premium', type: 'Online', city: 'Jakarta', orders: 45, revenue: 4500000, lastOrder: '01 Okt 2026', status: 'active' },
  { name: 'Restoran Padang Jaya', type: 'B2B', city: 'Bekasi', orders: 4, revenue: 800000, lastOrder: '15 Agt 2026', status: 'inactive' },
  { name: 'Coffee Corner Depok', type: 'B2B', city: 'Depok', orders: 3, revenue: 600000, lastOrder: '10 Jul 2026', status: 'churned' },
];

const CUSTOMER_SEGMENTS = [
  { name: 'B2B Wholesale', value: 7, color: '#0ea5e9' },
  { name: 'Retail / Toko', value: 4, color: '#6366f1' },
  { name: 'Online Marketplace', value: 3, color: '#10b981' },
  { name: 'Event / Bazaar', value: 3, color: '#f59e0b' },
];

// ─── Helpers ─────────────────────────────────────────────
const formatIDR = (val: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);

const formatShort = (val: number) => {
  if (Math.abs(val) >= 1000000) return `Rp ${(val / 1000000).toFixed(1)}M`;
  if (Math.abs(val) >= 1000) return `Rp ${(val / 1000).toFixed(0)}K`;
  return `Rp ${val}`;
};

const tooltipStyle = {
  backgroundColor: '#0f172a',
  borderColor: '#334155',
  borderRadius: '12px',
  fontSize: '11px',
  color: '#e2e8f0',
  boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)',
  padding: '10px 14px',
};

// ─── Main Component ─────────────────────────────────────
export const InsightsPage: React.FC = () => {
  const [apiInsights, setApiInsights] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'revenue' | 'expenses' | 'customers'>('overview');

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const res: any = await api.get('/bi/insights');
        if (res.success && res.data) {
          setApiInsights(res.data.insights || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchInsights();
  }, []);

  const totalExpenses = useMemo(() => EXPENSE_BREAKDOWN.reduce((s, e) => s + e.value, 0), []);

  if (loading) {
    return (
      <AppLayout title="Business Insights" subtitle="Menganalisis performa bisnis & indikator pertumbuhan">
        <LoadingSkeleton rows={6} />
      </AppLayout>
    );
  }

  // ─── Tab-specific renderers ───────────────────────────

  const renderOverviewTab = () => (
    <>
      {/* KPI Summary Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Revenue" value="Rp 49.2M" change="+18.4% dari periode lalu" positive icon={DollarSign} iconBg="bg-sky-50" iconColor="text-sky-600" sparkData={DAILY_REVENUE_SPARK} />
        <KPICard title="Net Profit" value="Rp 22.7M" change="+24.1% margin improvement" positive icon={Banknote} iconBg="bg-emerald-50" iconColor="text-emerald-600" progressValue={46} progressLabel="Profit Margin: 46.2%" />
        <KPICard title="Transaksi" value="159 orders" change="+12 orders dari bulan lalu" positive icon={Receipt} iconBg="bg-indigo-50" iconColor="text-indigo-600" extraLabel="Avg Order Value:" extraValue="Rp 309K" />
        <KPICard title="Pelanggan Aktif" value="17 mitra" change="Retention Rate: 88%" positive icon={Users} iconBg="bg-amber-50" iconColor="text-amber-600" progressValue={88} />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <ChartHeader icon={Activity} iconColor="text-sky-500" title="Revenue vs Profit Trend" subtitle="Perbandingan pendapatan & laba bersih 6 bulan terakhir" badge="Monthly" />
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={MONTHLY_REVENUE}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.25} /><stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} /></linearGradient>
                  <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.25} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} fontWeight={600} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickFormatter={(v) => formatShort(v)} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} formatter={(val: any, name: string) => [formatIDR(Number(val)), name === 'revenue' ? 'Revenue' : name === 'profit' ? 'Profit' : 'Expenses']} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px', fontWeight: 700, paddingTop: '8px' }} />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#0ea5e9" strokeWidth={3} fill="url(#revGrad)" dot={{ r: 4, fill: '#0ea5e9', stroke: '#fff', strokeWidth: 2 }} />
                <Area type="monotone" dataKey="profit" name="Profit" stroke="#10b981" strokeWidth={2} fill="url(#profitGrad)" dot={{ r: 3, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }} />
                <Bar dataKey="expenses" name="Expenses" fill="#f1f5f9" radius={[4, 4, 0, 0]} barSize={20} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Radar */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <ChartHeader icon={Sparkles} iconColor="text-amber-500" title="Skor Kesehatan Bisnis" subtitle="Multidimensional health score" />
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={RADAR_DATA} cx="50%" cy="50%" outerRadius="70%">
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="metric" stroke="#64748b" fontSize={9} fontWeight={600} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} fontSize={9} stroke="#cbd5e1" />
                <Radar name="Score" dataKey="value" stroke="#6366f1" strokeWidth={2} fill="#6366f1" fillOpacity={0.15} dot={{ r: 3, fill: '#6366f1', stroke: '#fff', strokeWidth: 1 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center">
            <span className="text-2xl font-black text-indigo-600">75.3</span>
            <span className="text-[10px] text-slate-400 font-bold ml-1">/ 100</span>
            <p className="text-[10px] text-slate-500 font-medium mt-0.5">Overall Business Health Score</p>
          </div>
        </div>
      </div>

      {/* Insight Cards */}
      <div className="space-y-4">
        <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          Actionable Business Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InsightCard type="REVENUE" icon={TrendingUp} color="emerald" title="Revenue Trend Positif" desc="Omset meningkat konsisten 8-12% per bulan selama 6 bulan terakhir." metric="+18.4%" metricLabel="Growth Rate" />
          <InsightCard type="COST" icon={AlertTriangle} color="amber" title="Biaya Bahan Baku Naik" desc="Pengeluaran bahan baku meningkat 15%. Pertimbangkan negosiasi ulang harga supplier." metric="+15%" metricLabel="Cost Increase" />
          <InsightCard type="CUSTOMER" icon={Info} color="sky" title="Retensi Pelanggan Tinggi" desc="Retention rate 88% menunjukkan loyalitas sangat baik." metric="88%" metricLabel="Retention" />
        </div>
      </div>
    </>
  );

  const renderRevenueTab = () => (
    <>
      {/* Revenue KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Revenue Bulan Ini" value="Rp 10.25M" change="+8.6% dari bulan lalu" positive icon={DollarSign} iconBg="bg-sky-50" iconColor="text-sky-600" />
        <KPICard title="Gross Profit" value="Rp 5.15M" change="Margin 50.2%" positive icon={Banknote} iconBg="bg-emerald-50" iconColor="text-emerald-600" progressValue={50} />
        <KPICard title="Best Channel" value="Toko Fisik" change="Rp 4.2M (41%)" positive icon={ShoppingBag} iconBg="bg-indigo-50" iconColor="text-indigo-600" />
        <KPICard title="Avg Order Value" value="Rp 360K" change="+10.8% dari bulan lalu" positive icon={Receipt} iconBg="bg-amber-50" iconColor="text-amber-600" />
      </div>

      {/* Revenue Trend + Channel Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <ChartHeader icon={TrendingUp} iconColor="text-sky-500" title="Tren Revenue Bulanan" subtitle="Revenue, Expenses & Profit 6 bulan terakhir" badge="Monthly" />
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={MONTHLY_REVENUE}>
                <defs>
                  <linearGradient id="revGrad2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} /><stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} fontWeight={600} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickFormatter={(v) => formatShort(v)} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} formatter={(val: any) => [formatIDR(Number(val))]} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px', fontWeight: 700, paddingTop: '8px' }} />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#0ea5e9" strokeWidth={3} fill="url(#revGrad2)" dot={{ r: 4, fill: '#0ea5e9', stroke: '#fff', strokeWidth: 2 }} />
                <Line type="monotone" dataKey="profit" name="Profit" stroke="#10b981" strokeWidth={2} dot={{ r: 3, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }} />
                <Bar dataKey="expenses" name="Expenses" fill="#fee2e2" radius={[4, 4, 0, 0]} barSize={18} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue by Channel Donut */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <ChartHeader icon={PieChartIcon} iconColor="text-indigo-500" title="Revenue per Channel" subtitle="Distribusi pendapatan" />
          <div className="h-52 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={REVENUE_BY_CHANNEL} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="revenue" stroke="none">
                  {REVENUE_BY_CHANNEL.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} formatter={(val: any) => [formatIDR(Number(val)), 'Revenue']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center"><span className="text-lg font-black text-slate-900">Rp 10.2M</span><span className="text-[9px] text-slate-400 font-bold block">TOTAL</span></div>
            </div>
          </div>
          <div className="space-y-1.5">
            {REVENUE_BY_CHANNEL.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-[11px]">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-slate-600 font-medium truncate flex-1">{item.channel}</span>
                <span className="text-slate-900 font-bold">{formatShort(item.revenue)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Daily Revenue by Channel */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <ChartHeader icon={BarChart3} iconColor="text-sky-500" title="Revenue Harian per Channel" subtitle="Distribusi pendapatan per hari dalam seminggu" badge="Daily" />
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={DAILY_REVENUE_DETAIL}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} fontWeight={600} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={10} tickFormatter={(v) => formatShort(v)} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} formatter={(val: any) => [formatIDR(Number(val))]} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px', fontWeight: 700, paddingTop: '8px' }} />
              <Bar dataKey="offline" name="Offline" fill="#0ea5e9" radius={[4, 4, 0, 0]} stackId="a" />
              <Bar dataKey="online" name="Online" fill="#6366f1" radius={[0, 0, 0, 0]} stackId="a" />
              <Bar dataKey="b2b" name="B2B" fill="#10b981" radius={[4, 4, 0, 0]} stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Product Mix */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <ChartHeader icon={ShoppingBag} iconColor="text-rose-500" title="Performa Produk (Top 5 SKU)" subtitle="Revenue & margin per produk" />
        <div className="space-y-3">
          {PRODUCT_MIX.map((prod, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-black flex items-center justify-center shrink-0">{idx + 1}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between"><span className="text-xs font-bold text-slate-800 truncate">{prod.product}</span><span className="text-xs font-black text-slate-900 shrink-0 ml-2">{formatShort(prod.revenue)}</span></div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-sky-400 to-indigo-500" style={{ width: `${(prod.revenue / PRODUCT_MIX[0].revenue) * 100}%` }} /></div>
                  <span className="text-[10px] font-bold text-emerald-600 shrink-0">{prod.margin}%</span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">{prod.units} units sold</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const renderExpensesTab = () => (
    <>
      {/* Expense KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Pengeluaran" value="Rp 26.5M" change="+12.3% dari periode lalu" positive={false} icon={CreditCard} iconBg="bg-rose-50" iconColor="text-rose-600" />
        <KPICard title="Bahan Baku" value="Rp 11.7M" change="41.1% dari total" positive={false} icon={ShoppingBag} iconBg="bg-sky-50" iconColor="text-sky-600" progressValue={41} />
        <KPICard title="Cost-to-Revenue" value="50.0%" change="Turun 3.2% (baik)" positive icon={Percent} iconBg="bg-emerald-50" iconColor="text-emerald-600" />
        <KPICard title="Biaya Marketing" value="Rp 1.6M" change="6.0% dari total" positive icon={Target} iconBg="bg-amber-50" iconColor="text-amber-600" />
      </div>

      {/* Expense Trend + Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <ChartHeader icon={BarChart3} iconColor="text-rose-500" title="Tren Pengeluaran Bulanan" subtitle="Breakdown per kategori biaya 6 bulan" badge="Monthly" />
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MONTHLY_EXPENSES}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} fontWeight={600} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickFormatter={(v) => formatShort(v)} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} formatter={(val: any) => [formatIDR(Number(val))]} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px', fontWeight: 700, paddingTop: '8px' }} />
                <Bar dataKey="bahanBaku" name="Bahan Baku" fill="#0ea5e9" stackId="exp" radius={[0, 0, 0, 0]} />
                <Bar dataKey="kemasan" name="Kemasan" fill="#6366f1" stackId="exp" />
                <Bar dataKey="tenagaKerja" name="Tenaga Kerja" fill="#f59e0b" stackId="exp" />
                <Bar dataKey="logistik" name="Logistik" fill="#10b981" stackId="exp" />
                <Bar dataKey="marketing" name="Marketing" fill="#ef4444" stackId="exp" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expense Donut */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <ChartHeader icon={PieChartIcon} iconColor="text-indigo-500" title="Komposisi Pengeluaran" subtitle="Breakdown biaya bulan ini" />
          <div className="h-52 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={EXPENSE_BREAKDOWN} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value" stroke="none">
                  {EXPENSE_BREAKDOWN.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} formatter={(val: any) => [formatIDR(Number(val)), 'Biaya']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center"><span className="text-lg font-black text-slate-900">Rp 5.1M</span><span className="text-[9px] text-slate-400 font-bold block">TOTAL</span></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
            {EXPENSE_BREAKDOWN.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-[11px]">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-slate-600 font-medium truncate">{item.name}</span>
                <span className="ml-auto text-slate-900 font-bold">{Math.round((item.value / totalExpenses) * 100)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cost-to-Revenue Ratio */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <ChartHeader icon={Activity} iconColor="text-teal-500" title="Cost-to-Revenue Ratio" subtitle="Rasio pengeluaran terhadap pendapatan bulanan" badge="Trend" />
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={EXPENSE_VS_REVENUE}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} fontWeight={600} tickLine={false} axisLine={false} />
              <YAxis yAxisId="left" stroke="#94a3b8" fontSize={10} tickFormatter={(v) => formatShort(v)} tickLine={false} axisLine={false} />
              <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" fontSize={10} tickFormatter={(v) => `${v}%`} tickLine={false} axisLine={false} domain={[0, 100]} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px', fontWeight: 700, paddingTop: '8px' }} />
              <Bar yAxisId="left" dataKey="revenue" name="Revenue" fill="#dbeafe" radius={[4, 4, 0, 0]} barSize={20} />
              <Bar yAxisId="left" dataKey="expenses" name="Expenses" fill="#fecaca" radius={[4, 4, 0, 0]} barSize={20} />
              <Line yAxisId="right" type="monotone" dataKey="ratio" name="Ratio %" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 4, fill: '#ef4444', stroke: '#fff', strokeWidth: 2 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );

  const renderCustomersTab = () => (
    <>
      {/* Customer KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Pelanggan" value="17 mitra" change="+4 baru bulan ini" positive icon={Users} iconBg="bg-sky-50" iconColor="text-sky-600" />
        <KPICard title="Retention Rate" value="88%" change="+2% dari bulan lalu" positive icon={UserCheck} iconBg="bg-emerald-50" iconColor="text-emerald-600" progressValue={88} />
        <KPICard title="New Customers" value="4 baru" change="Oktober 2026" positive icon={UserPlus} iconBg="bg-indigo-50" iconColor="text-indigo-600" />
        <KPICard title="Churn Rate" value="5.9%" change="1 pelanggan inactive" positive={false} icon={UserX} iconBg="bg-rose-50" iconColor="text-rose-600" />
      </div>

      {/* Customer Growth + Segments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <ChartHeader icon={Users} iconColor="text-emerald-500" title="Pertumbuhan & Retensi Pelanggan" subtitle="Total pelanggan & retention rate bulanan" badge="Growth" />
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={CUSTOMER_GROWTH}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} fontWeight={600} tickLine={false} axisLine={false} />
                <YAxis yAxisId="left" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} domain={[0, 100]} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px', fontWeight: 700, paddingTop: '8px' }} />
                <Bar yAxisId="left" dataKey="newCustomers" name="New" fill="#34d399" radius={[6, 6, 0, 0]} barSize={18} />
                <Line yAxisId="left" type="monotone" dataKey="totalCustomers" name="Total" stroke="#0ea5e9" strokeWidth={2.5} dot={{ r: 4, fill: '#0ea5e9', stroke: '#fff', strokeWidth: 2 }} />
                <Line yAxisId="right" type="monotone" dataKey="retention" name="Retention %" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3, fill: '#f59e0b' }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Customer Segments */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <ChartHeader icon={PieChartIcon} iconColor="text-indigo-500" title="Segmen Pelanggan" subtitle="Distribusi tipe mitra" />
          <div className="h-48 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={CUSTOMER_SEGMENTS} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value" stroke="none">
                  {CUSTOMER_SEGMENTS.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} formatter={(val: any) => [`${val} mitra`]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center"><span className="text-lg font-black text-slate-900">17</span><span className="text-[9px] text-slate-400 font-bold block">MITRA</span></div>
            </div>
          </div>
          <div className="space-y-1.5">
            {CUSTOMER_SEGMENTS.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-[11px]">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-slate-600 font-medium flex-1">{item.name}</span>
                <span className="text-slate-900 font-bold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customer List Table */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <ChartHeader icon={Users} iconColor="text-sky-500" title="Daftar Pelanggan Utama" subtitle="Status & performa per mitra" />
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold">
                <th className="text-left py-3 pr-4">Nama Pelanggan</th>
                <th className="text-left py-3 pr-4">Tipe</th>
                <th className="text-left py-3 pr-4">Kota</th>
                <th className="text-right py-3 pr-4">Orders</th>
                <th className="text-right py-3 pr-4">Revenue</th>
                <th className="text-left py-3 pr-4">Last Order</th>
                <th className="text-center py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {CUSTOMER_LIST.map((cust, idx) => (
                <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-3 pr-4 font-bold text-slate-800">{cust.name}</td>
                  <td className="py-3 pr-4"><span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${cust.type === 'B2B' ? 'bg-sky-50 text-sky-700' : cust.type === 'Online' ? 'bg-indigo-50 text-indigo-700' : 'bg-amber-50 text-amber-700'}`}>{cust.type}</span></td>
                  <td className="py-3 pr-4 text-slate-600 font-medium">{cust.city}</td>
                  <td className="py-3 pr-4 text-right font-bold text-slate-800">{cust.orders}</td>
                  <td className="py-3 pr-4 text-right font-black text-slate-900">{formatShort(cust.revenue)}</td>
                  <td className="py-3 pr-4 text-slate-500 font-medium flex items-center gap-1"><Clock className="w-3 h-3" />{cust.lastOrder}</td>
                  <td className="py-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${cust.status === 'active' ? 'bg-emerald-50 text-emerald-700' : cust.status === 'inactive' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'}`}>
                      {cust.status === 'active' ? 'Aktif' : cust.status === 'inactive' ? 'Tidak Aktif' : 'Churn'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  return (
    <AppLayout title="Financial Insights & Analytics" subtitle="Dashboard keuangan profesional untuk memantau performa bisnis secara real-time">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 md:p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-[10px] font-extrabold uppercase tracking-wider border border-sky-500/30">FINANCIAL ANALYTICS ENGINE</span>
              <span className="text-xs text-slate-400 font-medium">Powered by Strategiku BI</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Business Financial Dashboard</h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xl font-medium leading-relaxed">Analisis komprehensif omset, arus kas, pengeluaran, dan pertumbuhan pelanggan usaha Kopi Karawang Heritage.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-slate-700 text-slate-300 text-[11px] font-bold border border-slate-600 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />Mei – Okt 2026</span>
            <Link to="/recommendations" className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold shadow-lg shadow-sky-500/25 transition-all active:scale-95 flex items-center gap-1.5"><Target className="w-3.5 h-3.5" />Rekomendasi AI</Link>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs overflow-x-auto">
        {([
          { key: 'overview', label: 'Overview', icon: Layers },
          { key: 'revenue', label: 'Revenue & Profit', icon: TrendingUp },
          { key: 'expenses', label: 'Expenses', icon: CreditCard },
          { key: 'customers', label: 'Customers', icon: Users },
        ] as const).map((tab) => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${activeTab === tab.key ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}>
            <tab.icon className="w-3.5 h-3.5" />{tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverviewTab()}
      {activeTab === 'revenue' && renderRevenueTab()}
      {activeTab === 'expenses' && renderExpensesTab()}
      {activeTab === 'customers' && renderCustomersTab()}

      {/* Quick Actions Footer */}
      <div className="bg-gradient-to-r from-slate-100 via-sky-50 to-indigo-50 p-5 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-sky-100 text-sky-600"><Target className="w-5 h-5" /></div>
          <div>
            <h4 className="text-sm font-black text-slate-900">Ingin tahu langkah selanjutnya?</h4>
            <p className="text-[11px] text-slate-500 font-medium">Dapatkan rekomendasi berbasis AI untuk meningkatkan performa bisnis Anda</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/recommendations" className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-black shadow-lg shadow-sky-500/25 transition-all active:scale-95 flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" />Lihat Rekomendasi AI</Link>
          <Link to="/business-data" className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold border border-slate-200 transition-all flex items-center gap-1.5"><Wallet className="w-3.5 h-3.5" />Upload Data Baru</Link>
        </div>
      </div>
    </AppLayout>
  );
};

// ─── Reusable Sub-Components ─────────────────────────────

interface KPICardProps {
  title: string; value: string; change: string; positive: boolean;
  icon: React.ElementType; iconBg: string; iconColor: string;
  sparkData?: { day: string; val: number }[];
  progressValue?: number; progressLabel?: string;
  extraLabel?: string; extraValue?: string;
}
const KPICard: React.FC<KPICardProps> = ({ title, value, change, positive, icon: Icon, iconBg, iconColor, sparkData, progressValue, progressLabel, extraLabel, extraValue }) => (
  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2.5 relative overflow-hidden group hover:shadow-md transition-all">
    <div className="flex items-center justify-between">
      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{title}</span>
      <div className={`p-1.5 rounded-lg ${iconBg} ${iconColor}`}><Icon className="w-3.5 h-3.5" /></div>
    </div>
    <div className="text-xl font-black text-slate-900">{value}</div>
    <div className={`flex items-center gap-1 text-[11px] font-bold ${positive ? 'text-emerald-600' : 'text-rose-600'}`}>
      {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
      <span>{change}</span>
    </div>
    {sparkData && (
      <div className="h-10 -mx-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={sparkData}>
            <defs><linearGradient id={`spark_${title}`} x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} /><stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} /></linearGradient></defs>
            <Area type="monotone" dataKey="val" stroke="#0ea5e9" strokeWidth={2} fill={`url(#spark_${title})`} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    )}
    {progressValue !== undefined && (
      <>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden"><div className={`h-full rounded-full ${positive ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' : 'bg-gradient-to-r from-rose-400 to-rose-600'}`} style={{ width: `${progressValue}%` }} /></div>
        {progressLabel && <span className="text-[10px] text-slate-400 font-bold">{progressLabel}</span>}
      </>
    )}
    {extraLabel && <div className="flex items-center gap-1"><span className="text-[10px] text-slate-400 font-bold">{extraLabel}</span><span className="text-[10px] text-indigo-600 font-black">{extraValue}</span></div>}
  </div>
);

interface ChartHeaderProps {
  icon: React.ElementType; iconColor: string; title: string; subtitle: string; badge?: string;
}
const ChartHeader: React.FC<ChartHeaderProps> = ({ icon: Icon, iconColor, title, subtitle, badge }) => (
  <div className="flex items-center justify-between">
    <div>
      <h3 className="text-sm font-black text-slate-900 flex items-center gap-2"><Icon className={`w-4 h-4 ${iconColor}`} />{title}</h3>
      <p className="text-[11px] text-slate-500 font-medium">{subtitle}</p>
    </div>
    {badge && <Badge variant="sky">{badge}</Badge>}
  </div>
);

interface InsightCardProps {
  type: string; icon: React.ElementType; color: 'emerald' | 'amber' | 'sky';
  title: string; desc: string; metric: string; metricLabel: string;
}
const InsightCard: React.FC<InsightCardProps> = ({ type, icon: Icon, color, title, desc, metric, metricLabel }) => {
  const colors = {
    emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-600', icon: 'text-emerald-500' },
    amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-600', icon: 'text-amber-500' },
    sky: { bg: 'bg-sky-50', border: 'border-sky-200', text: 'text-sky-600', icon: 'text-sky-500' },
  }[color];
  return (
    <div className={`p-5 rounded-2xl border ${colors.border} ${colors.bg} space-y-3 hover:shadow-md transition-all`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2"><div className={`p-1.5 rounded-lg bg-white ${colors.icon}`}><Icon className="w-3.5 h-3.5" /></div><span className="text-[10px] font-black uppercase tracking-wider text-slate-600">{type}</span></div>
        <span className={`text-sm font-black ${colors.text}`}>{metric}</span>
      </div>
      <h4 className="text-xs font-black text-slate-900">{title}</h4>
      <p className="text-[11px] text-slate-600 leading-relaxed font-medium">{desc}</p>
      <div className="pt-2 border-t border-white/50 flex items-center justify-between text-[10px]"><span className="text-slate-500 font-bold">{metricLabel}</span><CheckCircle2 className="w-3.5 h-3.5 text-slate-400" /></div>
    </div>
  );
};
