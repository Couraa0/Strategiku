import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Mail,
  Lock,
  User as UserIcon,
  Building2,
  ArrowRight,
  AlertCircle,
  Eye,
  EyeOff,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  Target,
  Bot,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Register: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialBusinessName = searchParams.get('name') || '';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState(initialBusinessName);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (initialBusinessName && !businessName) {
      setBusinessName(initialBusinessName);
    }
  }, [initialBusinessName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await register(name, email, password, businessName);
      navigate('/onboarding');
    } catch (err: any) {
      setError(err.message || 'Registrasi gagal. Periksa kembali data Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFCFF] text-slate-900 flex font-sans selection:bg-[#007AFF] selection:text-white relative overflow-x-hidden">
      
      {/* ========================================================= */}
      {/* LEFT VALUE PROPOSITION PANEL (Desktop lg:flex) */}
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

        {/* Middle Value Proposition Checklist */}
        <div className="relative z-10 my-auto py-8 space-y-7 max-w-lg">
          <div className="space-y-3.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/25 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-sky-200" />
              <span className="text-[11px] font-black uppercase tracking-wider text-sky-100">
                Akses Gratis Selamanya
              </span>
            </div>
            <h1 className="font-display text-3xl xl:text-4xl font-black tracking-tight leading-tight text-white">
              Tingkatkan Skala & Profit Usaha UMKM Anda.
            </h1>
            <p className="text-sky-100/90 text-sm leading-relaxed font-normal">
              Bergabunglah dengan pelaku usaha di 27 Kabupaten/Kota Jawa Barat yang mengakselerasi pertumbuhan bisnis berbasis data riil dan regulasi resmi.
            </p>
          </div>

          {/* 3 Core Value Cards */}
          <div className="space-y-3 pt-1">
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-sky-400/20 text-sky-200 flex items-center justify-center shrink-0 border border-sky-400/30">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white leading-tight">Otomatisasi Analitik Kesehatan Finansial</p>
                <p className="text-[11px] text-sky-200 font-medium leading-tight mt-0.5">
                  Unggah CSV kasir (Moka, Majoo, Pawoon, Excel) langsung jadi wawasan laba & omset.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-400/20 text-indigo-200 flex items-center justify-center shrink-0 border border-indigo-400/30">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white leading-tight">Pencocokan Skor % Peluang Pemprov Jabar</p>
                <p className="text-[11px] text-sky-200 font-medium leading-tight mt-0.5">
                  Kurasi otomatis program Subsidi Halal SEHATI, Kredit Mesra bjb, dan kurasi ekspor daerah.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-400/20 text-emerald-200 flex items-center justify-center shrink-0 border border-emerald-400/30">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white leading-tight">Pendampingan AI RAG Berbasis Regulasi 24/7</p>
                <p className="text-[11px] text-sky-200 font-medium leading-tight mt-0.5">
                  Konsultasi taktik harga, bundling produk, dan strategi ekspansi kapan pun dibutuhkan.
                </p>
              </div>
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
      {/* RIGHT REGISTRATION FORM CONTAINER */}
      {/* ========================================================= */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-5 sm:p-8 md:p-12 relative bg-gradient-to-b from-[#FAFCFF] via-[#F4F8FD] to-[#EAF2FB] overflow-y-auto">
        
        {/* Soft Background Blur */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md space-y-6 relative z-10 my-auto py-6">
          
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
              Daftar Akun Usaha Baru
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Mulai gratis dalam 1 menit tanpa perlu kartu kredit
            </p>
          </div>

          {/* Main Registration Form Card */}
          <div className="bg-white/95 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-[0_16px_40px_rgba(0,0,0,0.05)] space-y-5">
            
            {error && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2.5 font-bold animate-in fade-in duration-200">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Nama Pemilik / Pengelola</label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="cth: Budi Santoso"
                    className="w-full bg-slate-50 border border-slate-200/90 rounded-2xl pl-10 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#007AFF] focus:bg-white focus:ring-4 focus:ring-sky-500/10 font-medium transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Nama Usaha UMKM</label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="cth: Kopi Karawang Heritage / Batik Cirebon"
                    className="w-full bg-slate-50 border border-slate-200/90 rounded-2xl pl-10 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#007AFF] focus:bg-white focus:ring-4 focus:ring-sky-500/10 font-medium transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Kontak Usaha</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="kontak@kopikarawang.id"
                    className="w-full bg-slate-50 border border-slate-200/90 rounded-2xl pl-10 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#007AFF] focus:bg-white focus:ring-4 focus:ring-sky-500/10 font-medium transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Password Keamanan</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimal 6 karakter"
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
                  <span>Mendaftarkan Usaha...</span>
                ) : (
                  <>
                    <span>Lanjut ke Onboarding Usaha</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="text-center pt-3 border-t border-slate-100">
              <p className="text-xs text-slate-500 font-medium">
                Sudah memiliki akun?{' '}
                <Link to="/login" className="text-[#007AFF] font-extrabold hover:underline">
                  Masuk di sini
                </Link>
              </p>
            </div>
          </div>

          {/* Micro Trust Indicator */}
          <div className="text-center">
            <p className="text-[11px] text-slate-400 font-medium">
              Data usaha 100% milik Anda dan dilindungi standar keamanan enterprise
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
