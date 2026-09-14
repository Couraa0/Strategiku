import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle2, Building, Target, Zap, Package, ShieldCheck } from 'lucide-react';
import api from '../../lib/api';
import { useAuth } from '../../context/AuthContext';

export const BusinessOnboarding: React.FC = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { business, updateUserBusiness } = useAuth();
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    name: business?.name || 'Kopi Karawang Heritage',
    type: 'F&B / Pengolahan Kopi Specialty',
    description: 'Produsen kopi lokal specialty dan olahan turunan kopi asli Karawang, Jawa Barat.',
    province: 'Jawa Barat',
    city_regency: 'Karawang',
    district: 'Karawang Barat',
    employee_count: 8,
    years_operating: 4,
    phone: '081234567890',
    email: 'info@kopikarawang.id',
    website: 'https://kopikarawang.id',
    target_market: 'Retail Coffee Lovers, Cafe Local, Corporate Gifts',
    business_goal_context: 'Meningkatkan penjualan B2B grosir dan memperluas distribusi cafe di wilayah Karawang dan Bandung.',
    sales_channels: 'Offline Store, E-Commerce, Cafe Wholesale',
    b2b_experience: 'Pernah memasok 3 cafe lokal dan bingkisan korporat instansi Pemkab.',
    capacity_description: 'Kapasitas sangrai (roasting) hingga 600 kg per bulan.',
    digital_maturity: 'Medium',
    goal_type: 'Perluasan Pasar B2B',
    goal_priority: 'HIGH',
    goal_period: '2026',
    capability_type: 'Kapasitas Roasting',
    capacity_value: 600,
    capacity_unit: 'kg/bulan',
    product_name: 'Kopi Arabika Specialty Karawang 250g',
    product_category: 'Biji & Bubuk Kopi',
    product_price: 65000,
  });

  const handleNext = () => {
    if (step < 6) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      await api.put('/business', {
        name: formData.name,
        type: formData.type,
        description: formData.description,
        city_regency: formData.city_regency,
        district: formData.district,
        employee_count: Number(formData.employee_count),
        years_operating: Number(formData.years_operating),
      });

      await api.put('/business/profile', {
        target_market: formData.target_market,
        business_goal_context: formData.business_goal_context,
        sales_channels: formData.sales_channels,
        b2b_experience: formData.b2b_experience,
        capacity_description: formData.capacity_description,
        digital_maturity: formData.digital_maturity,
      });

      updateUserBusiness({ name: formData.name, type: formData.type });
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const stepsList = [
    { num: 1, title: 'Informasi Usaha', icon: <Building className="w-4 h-4" /> },
    { num: 2, title: 'Profil & Saluran', icon: <Target className="w-4 h-4" /> },
    { num: 3, title: 'Tujuan Bisnis', icon: <Zap className="w-4 h-4" /> },
    { num: 4, title: 'Kapasitas Usaha', icon: <Zap className="w-4 h-4" /> },
    { num: 5, title: 'Katalog Produk', icon: <Package className="w-4 h-4" /> },
    { num: 6, title: 'Selesai', icon: <CheckCircle2 className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center justify-center p-6 relative font-sans">
      <div className="w-full max-w-3xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100 border border-sky-300 text-sky-700 text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            <span>Business Onboarding Wizard</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Setup Profil Bisnis UMKM Anda</h1>
          <p className="text-xs text-slate-500 font-medium">Lengkapi data usaha untuk mengaktifkan AI Contextual Recommendation Engine</p>
        </div>

        {/* Step Progress Indicators */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between overflow-x-auto">
          {stepsList.map((s) => (
            <div
              key={s.num}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap text-xs font-bold ${
                step === s.num
                  ? 'bg-sky-50 text-sky-700 border border-sky-300'
                  : step > s.num
                  ? 'text-sky-600'
                  : 'text-slate-400'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                  step === s.num
                    ? 'bg-sky-500 text-white'
                    : step > s.num
                    ? 'bg-sky-100 text-sky-700'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {step > s.num ? '✓' : s.num}
              </div>
              <span className="hidden sm:inline">{s.title}</span>
            </div>
          ))}
        </div>

        {/* Wizard Form Card */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-2">
                STEP 1: Informasi Usaha Dasar
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nama Usaha</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Jenis Sektor Usaha</label>
                  <input
                    type="text"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kabupaten / Kota (Jawa Barat)</label>
                  <input
                    type="text"
                    value={formData.city_regency}
                    onChange={(e) => setFormData({ ...formData, city_regency: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kecamatan</label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-2">
                STEP 2: Target Pasar & Profil Penjualan
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Pasar Utama</label>
                  <input
                    type="text"
                    value={formData.target_market}
                    onChange={(e) => setFormData({ ...formData, target_market: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Saluran Penjualan (Comma Separated)</label>
                  <input
                    type="text"
                    value={formData.sales_channels}
                    onChange={(e) => setFormData({ ...formData, sales_channels: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Pengalaman B2B & Pasokan</label>
                  <textarea
                    rows={2}
                    value={formData.b2b_experience}
                    onChange={(e) => setFormData({ ...formData, b2b_experience: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-2">
                STEP 3: Tujuan Pertumbuhan Bisnis
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tujuan Utama (Goal Type)</label>
                  <input
                    type="text"
                    value={formData.goal_type}
                    onChange={(e) => setFormData({ ...formData, goal_type: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Periode</label>
                  <input
                    type="text"
                    value={formData.goal_period}
                    onChange={(e) => setFormData({ ...formData, goal_period: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-2">
                STEP 4: Kapasitas Produksi Usaha
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi Kapasitas Produksi</label>
                  <textarea
                    rows={3}
                    value={formData.capacity_description}
                    onChange={(e) => setFormData({ ...formData, capacity_description: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5 */}
          {step === 5 && (
            <div className="space-y-4">
              <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-2">
                STEP 5: Produk Utama Usaha
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nama Produk Utama</label>
                  <input
                    type="text"
                    value={formData.product_name}
                    onChange={(e) => setFormData({ ...formData, product_name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Harga Ritel (Rp)</label>
                  <input
                    type="number"
                    value={formData.product_price}
                    onChange={(e) => setFormData({ ...formData, product_price: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 6 */}
          {step === 6 && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center mx-auto border border-sky-300">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-slate-900">Setup Profil Bisnis Selesai!</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto font-medium">
                Profil usaha Anda telah berhasil dikonfigurasi. Anda sekarang siap masuk ke Dashboard untuk melihat Business Intelligence & Rekomendasi Peluang Usaha.
              </p>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-4">
            <button
              onClick={handlePrev}
              disabled={step === 1 || loading}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                step === 1 ? 'opacity-30 cursor-not-allowed text-slate-400' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>

            {step < 6 ? (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-extrabold text-xs shadow-lg shadow-sky-500/25 transition-all flex items-center gap-1.5 active:scale-95"
              >
                <span>Berikutnya</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleComplete}
                disabled={loading}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white font-extrabold text-xs shadow-xl shadow-sky-500/25 transition-all flex items-center gap-2 active:scale-95"
              >
                <span>Masuk ke Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
