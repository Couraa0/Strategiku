import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Mail,
  Lock,
  User as UserIcon,
  Building,
  ArrowRight,
  AlertCircle,
  Eye,
  EyeOff,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  Target,
  MessageSquare,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans overflow-hidden">
      {/* Left Side Branding Showcase (Visible on LG screens) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 text-white p-12 flex-col justify-between relative overflow-hidden">
        {/* Decorative Ambient Blurs */}
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

        {/* Middle Value Proposition Checklist */}
        <div className="relative z-10 my-auto space-y-6">
          <div className="space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-white/15 border border-white/20 text-xs font-bold uppercase tracking-wider text-sky-100">
              Pendaftaran Gratis UMKM Jawa Barat
            </span>
            <h1 className="text-4xl font-black tracking-tight leading-tight">
              Mulai Langkah Pertama Menuju Usaha Berdaya Saing Tinggi
            </h1>
            <p className="text-sky-100 text-sm leading-relaxed font-medium max-w-lg">
              Bergabunglah dengan ratusan UMKM di Jawa Barat yang memanfaatkan kecerdasan analitis data transaksi dan pencocokan peluang strategis.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/10 border border-white/20 text-xs text-sky-100 font-medium">
              <CheckCircle2 className="w-5 h-5 text-sky-200 shrink-0" />
              <span>Otomatisasi Analisis Omset & Tren Produk Terlaris</span>
            </div>
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/10 border border-white/20 text-xs text-sky-100 font-medium">
              <CheckCircle2 className="w-5 h-5 text-indigo-200 shrink-0" />
              <span>Pencocokan Skor % Peluang Ekspor & Sertifikasi Halal Jabar</span>
            </div>
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/10 border border-white/20 text-xs text-sky-100 font-medium">
              <CheckCircle2 className="w-5 h-5 text-teal-200 shrink-0" />
              <span>Asisten Pendamping AI RAG Berbasis Knowledge Base 24/7</span>
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

      {/* Right Side Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative overflow-y-auto">
        <div className="w-full max-w-md space-y-6 my-auto">
          {/* Header Title */}
          <div className="space-y-2">
            <Link to="/" className="inline-flex lg:hidden items-center gap-2.5 group mb-3">
              <div className="w-10 h-10 rounded-2xl bg-sky-500 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5 font-bold" />
              </div>
              <span className="font-black text-2xl tracking-tight text-slate-900">APH YAH</span>
            </Link>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Daftar Akun Usaha Baru</h2>
            <p className="text-xs text-slate-500 font-semibold">Transformasikan data penjualan Anda menjadi arah pertumbuhan</p>
          </div>

          {/* Form Card */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-5">
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 font-bold">
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
                    placeholder="Ahmad Fauzi"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Nama Usaha UMKM</label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Kopi Karawang / Keripik Bandung"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 font-medium"
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
                    placeholder="kontak@usahamumu.id"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Password Security</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimal 6 karakter"
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
                  <span>Mendaftarkan...</span>
                ) : (
                  <>
                    <span>Lanjut ke Onboarding Usaha</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="text-center pt-2 border-t border-slate-100">
              <p className="text-xs text-slate-500 font-medium">
                Sudah memiliki akun?{' '}
                <Link to="/login" className="text-sky-600 font-black hover:underline">
                  Masuk di sini
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
