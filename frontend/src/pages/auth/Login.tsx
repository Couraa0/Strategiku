import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Eye,
  EyeOff,
  TrendingUp,
  Target,
  CheckCircle2,
  Building2,
  Zap,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Gagal masuk. Periksa kembali email & password Anda.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await login('demo@aphyah.id', 'Demo123!');
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Gagal masuk demo account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans overflow-hidden">
      {/* Left Side Branding Showcase (Hidden on Mobile, Visible on LG screens) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 text-white p-12 flex-col justify-between relative overflow-hidden">
        {/* Ambient Decorative Blurs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-900/30 rounded-full blur-3xl pointer-events-none" />

        {/* Top Brand Header */}
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6 text-white font-bold" />
            </div>
            <div>
              <span className="font-black text-2xl tracking-tight flex items-center gap-2">
                APH YAH
                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/20 border border-white/30">
                  WEST JAVA
                </span>
              </span>
              <p className="text-xs text-sky-100 font-medium">UMKM Business Growth Intelligence Platform</p>
            </div>
          </Link>
        </div>

        {/* Middle Feature Hero Showcase Cards */}
        <div className="relative z-10 my-auto space-y-6">
          <div className="space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-white/15 border border-white/20 text-xs font-bold uppercase tracking-wider text-sky-100">
              "Dari Data Usaha Menjadi Arah Pertumbuhan"
            </span>
            <h1 className="text-4xl font-black tracking-tight leading-tight">
              Akselerasi Skala Bisnis UMKM Anda dengan Kecerdasan Terintegrasi
            </h1>
            <p className="text-sky-100 text-sm leading-relaxed font-medium max-w-lg">
              Kelola data transaksi harian, dapatkan wawasan otomatis BI Engine, dan hubungkan usaha Anda dengan peluang kurasi ekspor & pembiayaan di Jawa Barat.
            </p>
          </div>

          {/* Floating Metric Badges */}
          <div className="grid grid-cols-2 gap-4 max-w-md pt-2">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-1">
              <div className="flex items-center gap-2 text-sky-200 text-xs font-bold">
                <TrendingUp className="w-4 h-4" />
                <span>BI Analytics</span>
              </div>
              <p className="text-xl font-black">+18% Revenue</p>
              <p className="text-[10px] text-sky-100 font-medium">Analisis tren & omset otomatis</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-1">
              <div className="flex items-center gap-2 text-indigo-200 text-xs font-bold">
                <Target className="w-4 h-4" />
                <span>Opportunity Match</span>
              </div>
              <p className="text-xl font-black">92% Match</p>
              <p className="text-[10px] text-sky-100 font-medium">Peluang kurasi Jabar terverifikasi</p>
            </div>
          </div>
        </div>

        {/* Bottom Footer Info */}
        <div className="relative z-10 flex items-center justify-between text-xs text-sky-200 border-t border-white/20 pt-6">
          <p>© 2026 APH YAH Platform.</p>
          <span className="flex items-center gap-1 font-bold text-white">
            <ShieldCheck className="w-4 h-4 text-emerald-300" /> PostgreSQL Supabase Secured
          </span>
        </div>
      </div>

      {/* Right Side Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative">
        <div className="w-full max-w-md space-y-6">
          {/* Header Mobile / Brand Title */}
          <div className="space-y-2">
            <Link to="/" className="inline-flex lg:hidden items-center gap-2.5 group mb-3">
              <div className="w-10 h-10 rounded-2xl bg-sky-500 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5 font-bold" />
              </div>
              <span className="font-black text-2xl tracking-tight text-slate-900">APH YAH</span>
            </Link>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Selamat Datang Kembali</h2>
            <p className="text-xs text-slate-500 font-semibold">Masuk ke portal kecerdasan bisnis usaha Anda</p>
          </div>

          {/* Quick Demo Mode Banner */}
          <div className="bg-gradient-to-r from-sky-50 to-blue-50 p-4 rounded-2xl border border-sky-200 flex items-center justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-black text-sky-700 mb-0.5">
                <ShieldCheck className="w-4 h-4 text-sky-500" />
                <span>Quick Demo Mode</span>
              </div>
              <p className="text-[11px] text-slate-600 font-medium">Uji langsung dengan akun Kopi Karawang</p>
            </div>
            <button
              onClick={handleDemoLogin}
              disabled={loading}
              className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-extrabold text-xs shadow-md shadow-sky-500/25 transition-all active:scale-95 whitespace-nowrap"
            >
              Masuk Demo
            </button>
          </div>

          {/* Login Form Card */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-5">
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 font-bold">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Usaha</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="demo@aphyah.id"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 font-medium"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700">Password</label>
                  <span className="text-[11px] font-semibold text-sky-600 hover:underline cursor-pointer">Lupa Password?</span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-extrabold text-xs shadow-lg shadow-sky-500/25 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                {loading ? (
                  <span>Memproses...</span>
                ) : (
                  <>
                    <span>Masuk ke Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="text-center pt-2 border-t border-slate-100">
              <p className="text-xs text-slate-500 font-medium">
                Belum memiliki akun usaha?{' '}
                <Link to="/register" className="text-sky-600 font-black hover:underline">
                  Daftar Usaha Baru
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
