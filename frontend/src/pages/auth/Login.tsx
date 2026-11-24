import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Eye,
  EyeOff,
  TrendingUp,
  Target,
  Bot,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
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
    <div className="min-h-screen bg-[#FAFCFF] text-slate-900 flex font-sans selection:bg-[#007AFF] selection:text-white relative overflow-x-hidden">
      
      {/* ========================================================= */}
      {/* LEFT BRANDING & VALUE SHOWCASE (Desktop lg:flex) */}
      {/* ========================================================= */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#007AFF] via-[#0055D4] to-[#0A192F] text-white p-10 xl:p-14 flex-col justify-between relative overflow-hidden">
        
        {/* Soft Ambient Blur Glows & Pattern */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-sky-300/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />

        {/* Top Header: Brand Logo & Back to Home */}
        <div className="relative z-10 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg shadow-black/10 hover:scale-102 transition-all"
          >
            <img src="/logo/Logo+Text+Landscape.png" alt="Strategiku Logo" className="h-7 w-auto object-contain" />
          </Link>

          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-100 hover:text-white px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>

        {/* Middle Feature Showcase Cards */}
        <div className="relative z-10 my-auto py-8 space-y-7 max-w-lg">
          <div className="space-y-3.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/25 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-sky-200" />
              <span className="text-[11px] font-black uppercase tracking-wider text-sky-100">
                Akselerasi Bisnis UMKM Jabar
              </span>
            </div>
            <h1 className="font-display text-3xl xl:text-4xl font-black tracking-tight leading-tight text-white">
              Ubah Rekapan Transaksi Menjadi Keputusan Terarah.
            </h1>
            <p className="text-sky-100/90 text-sm leading-relaxed font-normal">
              Akses analitik kesehatan finansial otomatis, pencocokan bantuan resmi Pemprov Jawa Barat, dan asisten pendamping AI 24/7 dalam satu portal terpadu.
            </p>
          </div>

          {/* Interactive Floating Preview Widgets */}
          <div className="grid grid-cols-2 gap-3.5 pt-2">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 space-y-1.5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-sky-200 text-xs font-bold">
                  <TrendingUp className="w-3.5 h-3.5 text-sky-300" />
                  <span>BI Analytics</span>
                </div>
                <span className="text-[10px] font-black bg-emerald-400/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-400/30">
                  +18.4% ▲
                </span>
              </div>
              <p className="font-display text-xl font-black text-white">Rp 10.25M</p>
              <p className="text-[10px] text-sky-200 font-medium">Omset otomatis dari rekapan CSV kasir</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 space-y-1.5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-indigo-200 text-xs font-bold">
                  <Target className="w-3.5 h-3.5 text-indigo-300" />
                  <span>Peluang Jabar</span>
                </div>
                <span className="text-[10px] font-black bg-sky-400/20 text-sky-200 px-2 py-0.5 rounded-full border border-sky-400/30">
                  94% Cocok
                </span>
              </div>
              <p className="font-display text-base font-black text-white truncate">Sertifikasi Halal</p>
              <p className="text-[10px] text-sky-200 font-medium">SEHATI BPJPH & Diskop Jabar</p>
            </div>
          </div>

          {/* AI Advisor Mini Card */}
          <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-white/15 text-sky-200 shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>RAG AI Growth Assistant</span>
                <span className="text-[9px] font-black bg-emerald-500/30 text-emerald-200 px-1.5 py-0.2 rounded">Aktif 24/7</span>
              </p>
              <p className="text-[11px] text-sky-100 font-medium leading-relaxed mt-0.5">
                "Menu Es Kopi Susu Aren margin 68%. Buat bundling dengan pastry sore hari untuk menaikkan average order."
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Footer Info */}
        <div className="relative z-10 flex items-center justify-between text-xs text-sky-200/90 border-t border-white/15 pt-5">
          <p>© {new Date().getFullYear()} Strategiku • Ekosistem UMKM Jawa Barat</p>
          <span className="flex items-center gap-1.5 font-bold text-white text-[11px]">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Keamanan Berstandar Enterprise (256-bit SSL & RLS)</span>
          </span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* RIGHT LOGIN FORM CONTAINER */}
      {/* ========================================================= */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-5 sm:p-8 md:p-12 relative bg-gradient-to-b from-[#FAFCFF] via-[#F4F8FD] to-[#EAF2FB]">
        
        {/* Soft Background Blur */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md space-y-6 relative z-10">
          
          {/* Header Mobile / Brand Title */}
          <div className="space-y-2 text-center lg:text-left">
            <div className="flex lg:hidden items-center justify-between mb-4">
              <Link to="/" className="inline-flex items-center">
                <img src="/logo/Logo+Text+Landscape.png" alt="Strategiku Logo" className="h-8 w-auto object-contain" />
              </Link>
              <Link
                to="/"
                className="text-xs font-bold text-slate-600 hover:text-[#007AFF] flex items-center gap-1 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-2xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Beranda</span>
              </Link>
            </div>
            
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Selamat Datang Kembali
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Masuk ke portal kecerdasan bisnis & analitik usaha Anda
            </p>
          </div>

          {/* Quick Demo Mode Card */}
          <div className="bg-gradient-to-r from-sky-50 via-blue-50/80 to-indigo-50/60 p-4 rounded-2xl border border-sky-200/90 flex items-center justify-between shadow-xs">
            <div className="space-y-0.5 pr-2">
              <div className="flex items-center gap-1.5 text-xs font-black text-sky-800">
                <ShieldCheck className="w-4 h-4 text-[#007AFF]" />
                <span>Quick Demo Mode</span>
                <span className="text-[9px] font-black bg-[#007AFF]/15 text-[#007AFF] px-1.5 py-0.2 rounded-full">1-Click</span>
              </div>
              <p className="text-[11px] text-slate-600 font-medium leading-tight">
                Uji langsung platform dengan data riil Kopi Karawang Heritage
              </p>
            </div>
            <button
              onClick={handleDemoLogin}
              disabled={loading}
              className="px-4 py-2.5 rounded-xl bg-[#007AFF] hover:bg-[#0062D1] text-white font-extrabold text-xs shadow-md shadow-blue-500/25 transition-all active:scale-95 whitespace-nowrap glow-pill-blue"
            >
              Masuk Demo
            </button>
          </div>

          {/* Main Login Form Card */}
          <div className="bg-white/95 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-[0_16px_40px_rgba(0,0,0,0.05)] space-y-5">
            
            {error && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2.5 font-bold animate-in fade-in duration-200">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Akun Usaha</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@usaha.id atau demo@aphyah.id"
                    className="w-full bg-slate-50 border border-slate-200/90 rounded-2xl pl-10 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#007AFF] focus:bg-white focus:ring-4 focus:ring-sky-500/10 font-medium transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700">Password</label>
                  <span className="text-[11px] font-bold text-[#007AFF] hover:underline cursor-pointer">
                    Lupa Password?
                  </span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200/90 rounded-2xl pl-10 pr-10 py-2.5 sm:py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#007AFF] focus:bg-white focus:ring-4 focus:ring-sky-500/10 font-medium transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-2xl bg-[#007AFF] hover:bg-[#0062D1] text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 active:scale-95 glow-pill-blue"
              >
                {loading ? (
                  <span>Memverifikasi Akun...</span>
                ) : (
                  <>
                    <span>Masuk ke Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="text-center pt-3 border-t border-slate-100">
              <p className="text-xs text-slate-500 font-medium">
                Belum memiliki akun usaha?{' '}
                <Link to="/register" className="text-[#007AFF] font-extrabold hover:underline">
                  Daftar Usaha Baru Gratis
                </Link>
              </p>
            </div>
          </div>

          {/* Micro Trust Indicator */}
          <div className="text-center">
            <p className="text-[11px] text-slate-400 font-medium">
              Dilindungi enkripsi data end-to-end berstandar enterprise
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
