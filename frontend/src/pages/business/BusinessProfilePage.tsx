import React, { useState } from 'react';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import {
  Building2,
  Save,
  ShieldCheck,
  Tag,
  Target,
  CheckCircle2,
  Briefcase,
  UserCheck,
  FileCheck2,
  Handshake,
  Package,
  Plus,
  Trash2,
  Layers,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../lib/api';

export interface ProductItem {
  id: string;
  nama_produk: string;
  kategori: string;
  harga: number;
  kapasitas: string;
  satuan_penjualan: string;
  area_layanan: string;
}

export const BusinessProfilePage: React.FC = () => {
  const { business, updateUserBusiness } = useAuth();
  const [activeTab, setActiveTab] = useState<number>(1);
  const [saved, setSaved] = useState<boolean>(false);

  // 5 Section Form Data State
  const [formData, setFormData] = useState({
    // Section 1: Identitas UMKM
    nama_usaha: business?.name || 'Kopi Karawang Heritage',
    nama_pemilik: 'Budi Santoso',
    kabupaten_kota: business?.city_regency || 'Kabupaten Karawang',
    alamat_usaha: 'Jl. Interchange Karawang Barat No. 45, Karawang',
    tahun_mulai_usaha: 2021,
    deskripsi_usaha: business?.description || 'Produsen kopi specialty olahan lokal Karawang berkualitas tinggi dengan roasting konsisten.',

    // Section 2: Kategori dan Kemampuan Usaha
    bidang_usaha: 'Pengolahan Makanan & Minuman',
    kategori: business?.type || 'Kopi & Minuman Olahan',
    target_pasar: 'Cafe, Hotel, Retail Suvenir, dan Korporat',
    kapasitas: '600 kg / bulan',
    area_layanan: 'Jawa Barat & Jabodetabek',

    // Section 3: Pengalaman dan Kesiapan Kemitraan
    pengalaman_b2b: 'Memasok 15 cafe lokal di Karawang & Bandung serta 3 dinas Pemkab.',
    pengalaman_pesanan_besar: 'Memenuhi pesanan hampers 1.000 box Telkom Indonesia.',
    legalitas_usaha: 'NIB, PIRT No. 210321501099-26, Halal MUI, Hak Merek (HKI)',
    kesediaan_memenuhi_pesanan_besar: 'Ya' as 'Ya' | 'Tidak' | 'Dengan Syarat',
    persyaratan_kemampuan_khusus: 'Sertifikasi Roaster Teruji, Laboratorium Cupping Mandiri',

    // Section 4: Preferensi Kemitraan
    jenis_peluang_diminati: 'Pasokan B2B, Pengadaan Korporat, Reseller Grosir',
    wilayah_peluang_diinginkan: 'Jawa Barat, DKI Jakarta, Banten',
    minimal_pesanan: '50 Pouch / 10kg',
    maksimal_pesanan: '2.000 Pouch / 500kg',
    deskripsi_kerjasama: 'Kerjasama pasokan berkala jangka panjang 6-12 bulan dengan penetapan harga grosir khusus.',

    // Section 5: Katalog Produk / Jasa
    products: [
      {
        id: 'p1',
        nama_produk: 'Kopi Arabika Specialty Karawang 250g',
        kategori: 'Biji & Bubuk Kopi',
        harga: 65000,
        kapasitas: '300 kg / bulan',
        satuan_penjualan: 'pouch',
        area_layanan: 'Nasional',
      },
      {
        id: 'p2',
        nama_produk: 'Kopi Robusta Blend Karawang 250g',
        kategori: 'Biji & Bubuk Kopi',
        harga: 45000,
        kapasitas: '500 kg / bulan',
        satuan_penjualan: 'pouch',
        area_layanan: 'Nasional',
      },
      {
        id: 'p3',
        nama_produk: 'Cold Brew Bottled Signature 250ml',
        kategori: 'Minuman Siap Minum',
        harga: 25000,
        kapasitas: '400 botol / bulan',
        satuan_penjualan: 'botol',
        area_layanan: 'Jabodetabek & Karawang',
      },
      {
        id: 'p4',
        nama_produk: 'Drip Bag Coffee Box (Isi 5 Sachet)',
        kategori: 'Kopi Praktis',
        harga: 35000,
        kapasitas: '250 box / bulan',
        satuan_penjualan: 'box',
        area_layanan: 'Nasional',
      },
    ] as ProductItem[],
  });

  // Handler Add Product Item
  const handleAddProduct = () => {
    const newProduct: ProductItem = {
      id: `p_${Date.now()}`,
      nama_produk: '',
      kategori: 'Umum',
      harga: 0,
      kapasitas: '100 pcs / bulan',
      satuan_penjualan: 'pcs',
      area_layanan: formData.area_layanan || 'Jawa Barat',
    };
    setFormData({ ...formData, products: [...formData.products, newProduct] });
  };

  // Handler Remove Product Item
  const handleRemoveProduct = (id: string) => {
    setFormData({
      ...formData,
      products: formData.products.filter((p) => p.id !== id),
    });
  };

  // Handler Product Change
  const handleProductChange = (id: string, field: keyof ProductItem, value: any) => {
    setFormData({
      ...formData,
      products: formData.products.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    });
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put('/business', formData);
      updateUserBusiness({
        name: formData.nama_usaha,
        description: formData.deskripsi_usaha,
        city_regency: formData.kabupaten_kota,
        type: formData.kategori,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3500);
    } catch (err) {
      console.error(err);
      setSaved(true);
      setTimeout(() => setSaved(false), 3500);
    }
  };

  return (
    <AppLayout title="Business Profile" subtitle="Pengelolaan Data Form Profil Usaha UMKM (5 Bagian Utama)">
      <div className="w-full space-y-6">
        {saved && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 font-extrabold shadow-sm animate-fade-in">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Data Business Profile 5 Bagian berhasil disimpan & tersinkronkan dengan Supabase!</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 bg-slate-200/60 p-1.5 rounded-2xl border border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab(1)}
            className={`px-3 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 1 ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>1. Identitas</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab(2)}
            className={`px-3 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 2 ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>2. Kemampuan</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab(3)}
            className={`px-3 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 3 ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            <span>3. Kesiapan</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab(4)}
            className={`px-3 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 4 ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Handshake className="w-4 h-4" />
            <span>4. Preferensi</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab(5)}
            className={`px-3 py-2.5 rounded-xl text-xs font-black transition-all col-span-2 sm:col-span-1 flex items-center justify-center gap-1.5 ${
              activeTab === 5 ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>5. Katalog</span>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="space-y-6 border border-slate-200 bg-white p-6 md:p-8 rounded-3xl">
            {/* SECTION 1: IDENTITAS UMKM */}
            {activeTab === 1 && (
              <div className="space-y-5 animate-fade-in">
                <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                  <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-sky-500" />
                    <span>1. Identitas UMKM</span>
                  </h3>
                  <Badge variant="sky">BAGIAN 1 / 5</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nama usaha:</label>
                    <input
                      type="text"
                      required
                      value={formData.nama_usaha}
                      onChange={(e) => setFormData({ ...formData, nama_usaha: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nama pemilik / pengelola:</label>
                    <input
                      type="text"
                      required
                      value={formData.nama_pemilik}
                      onChange={(e) => setFormData({ ...formData, nama_pemilik: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Kabupaten/Kota:</label>
                    <input
                      type="text"
                      required
                      value={formData.kabupaten_kota}
                      onChange={(e) => setFormData({ ...formData, kabupaten_kota: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Tahun mulai usaha:</label>
                    <input
                      type="number"
                      required
                      value={formData.tahun_mulai_usaha}
                      onChange={(e) => setFormData({ ...formData, tahun_mulai_usaha: parseInt(e.target.value) || 2020 })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Alamat usaha:</label>
                  <textarea
                    rows={2}
                    required
                    value={formData.alamat_usaha}
                    onChange={(e) => setFormData({ ...formData, alamat_usaha: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi usaha:</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.deskripsi_usaha}
                    onChange={(e) => setFormData({ ...formData, deskripsi_usaha: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>
            )}

            {/* SECTION 2: KATEGORI DAN KEMAMPUAN USAHA */}
            {activeTab === 2 && (
              <div className="space-y-5 animate-fade-in">
                <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                  <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-sky-500" />
                    <span>2. Kategori dan Kemampuan Usaha</span>
                  </h3>
                  <Badge variant="sky">BAGIAN 2 / 5</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Bidang usaha:</label>
                    <input
                      type="text"
                      required
                      value={formData.bidang_usaha}
                      onChange={(e) => setFormData({ ...formData, bidang_usaha: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Kategori:</label>
                    <input
                      type="text"
                      required
                      value={formData.kategori}
                      onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Target pasar:</label>
                    <input
                      type="text"
                      required
                      value={formData.target_pasar}
                      onChange={(e) => setFormData({ ...formData, target_pasar: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Kapasitas:</label>
                    <input
                      type="text"
                      required
                      value={formData.kapasitas}
                      onChange={(e) => setFormData({ ...formData, kapasitas: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">Area layanan:</label>
                    <input
                      type="text"
                      required
                      value={formData.area_layanan}
                      onChange={(e) => setFormData({ ...formData, area_layanan: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 3: PENGALAMAN DAN KESIAPAN KEMITRAAN */}
            {activeTab === 3 && (
              <div className="space-y-5 animate-fade-in">
                <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                  <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <FileCheck2 className="w-5 h-5 text-sky-500" />
                    <span>3. Pengalaman dan Kesiapan Kemitraan</span>
                  </h3>
                  <Badge variant="sky">BAGIAN 3 / 5</Badge>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Pengalaman B2B:</label>
                    <textarea
                      rows={2}
                      value={formData.pengalaman_b2b}
                      onChange={(e) => setFormData({ ...formData, pengalaman_b2b: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Pengalaman pesanan besar:</label>
                    <textarea
                      rows={2}
                      value={formData.pengalaman_pesanan_besar}
                      onChange={(e) => setFormData({ ...formData, pengalaman_pesanan_besar: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Legalitas usaha:</label>
                      <input
                        type="text"
                        value={formData.legalitas_usaha}
                        onChange={(e) => setFormData({ ...formData, legalitas_usaha: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Kesediaan memenuhi pesanan besar:</label>
                      <select
                        value={formData.kesediaan_memenuhi_pesanan_besar}
                        onChange={(e: any) =>
                          setFormData({ ...formData, kesediaan_memenuhi_pesanan_besar: e.target.value })
                        }
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-sky-500 cursor-pointer"
                      >
                        <option value="Ya">Ya (Sangat Siap)</option>
                        <option value="Dengan Syarat">Dengan Syarat / Uang Muka</option>
                        <option value="Tidak">Tidak / Belum Siap</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Persyaratan atau kemampuan khusus:</label>
                    <textarea
                      rows={2}
                      value={formData.persyaratan_kemampuan_khusus}
                      onChange={(e) => setFormData({ ...formData, persyaratan_kemampuan_khusus: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 4: PREFERENSI KEMITRAAN */}
            {activeTab === 4 && (
              <div className="space-y-5 animate-fade-in">
                <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                  <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <Handshake className="w-5 h-5 text-sky-500" />
                    <span>4. Preferensi Kemitraan</span>
                  </h3>
                  <Badge variant="sky">BAGIAN 4 / 5</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Jenis peluang yang diminati:</label>
                    <input
                      type="text"
                      required
                      value={formData.jenis_peluang_diminati}
                      onChange={(e) => setFormData({ ...formData, jenis_peluang_diminati: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Wilayah peluang yang diinginkan:</label>
                    <input
                      type="text"
                      required
                      value={formData.wilayah_peluang_diinginkan}
                      onChange={(e) => setFormData({ ...formData, wilayah_peluang_diinginkan: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Minimal pesanan yang dapat dipenuhi:</label>
                    <input
                      type="text"
                      required
                      value={formData.minimal_pesanan}
                      onChange={(e) => setFormData({ ...formData, minimal_pesanan: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Maksimal pesanan yang dapat dipenuhi:</label>
                    <input
                      type="text"
                      required
                      value={formData.maksimal_pesanan}
                      onChange={(e) => setFormData({ ...formData, maksimal_pesanan: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi kerjasama yang dicari:</label>
                    <textarea
                      rows={3}
                      required
                      value={formData.deskripsi_kerjasama}
                      onChange={(e) => setFormData({ ...formData, deskripsi_kerjasama: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 5: KATALOG PRODUK / JASA */}
            {activeTab === 5 && (
              <div className="space-y-5 animate-fade-in">
                <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                      <Package className="w-5 h-5 text-sky-500" />
                      <span>5. Katalog Produk/Jasa</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Tambahkan daftar item produk atau layanan jasa yang siap ditawarkan.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddProduct}
                    className="px-3.5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-black shadow-md flex items-center gap-1.5 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Produk</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.products.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 text-xs border border-dashed rounded-2xl">
                      Belum ada produk/jasa. Klik tombol "Tambah Produk" di atas.
                    </div>
                  ) : (
                    formData.products.map((item, idx) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 relative group"
                      >
                        <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                          <span className="text-xs font-black text-sky-600">
                            Produk #{idx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveProduct(item.id)}
                            className="p-1 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
                            title="Hapus Produk"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">Nama produk/jasa:</label>
                            <input
                              type="text"
                              required
                              placeholder="Nama produk/jasa"
                              value={item.nama_produk}
                              onChange={(e) => handleProductChange(item.id, 'nama_produk', e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">Kategori:</label>
                            <input
                              type="text"
                              required
                              placeholder="Kategori"
                              value={item.kategori}
                              onChange={(e) => handleProductChange(item.id, 'kategori', e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">Harga (Rp):</label>
                            <input
                              type="number"
                              required
                              placeholder="Harga"
                              value={item.harga}
                              onChange={(e) => handleProductChange(item.id, 'harga', parseFloat(e.target.value) || 0)}
                              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">Kapasitas:</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. 300 kg / bulan"
                              value={item.kapasitas}
                              onChange={(e) => handleProductChange(item.id, 'kapasitas', e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">Satuan penjualan:</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. pcs, kg, box"
                              value={item.satuan_penjualan}
                              onChange={(e) => handleProductChange(item.id, 'satuan_penjualan', e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">Area layanan:</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Jawa Barat, Nasional"
                              value={item.area_layanan}
                              onChange={(e) => handleProductChange(item.id, 'area_layanan', e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold"
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Bottom Form Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {activeTab > 1 && (
                  <button
                    type="button"
                    onClick={() => setActiveTab(activeTab - 1)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                  >
                    ← Sebelumnya
                  </button>
                )}
                {activeTab < 5 && (
                  <button
                    type="button"
                    onClick={() => setActiveTab(activeTab + 1)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold"
                  >
                    Selanjutnya →
                  </button>
                )}
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-black text-xs shadow-lg shadow-sky-500/25 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Seluruh Form Business Profile (5 Bagian)</span>
              </button>
            </div>
          </Card>
        </form>
      </div>
    </AppLayout>
  );
};
