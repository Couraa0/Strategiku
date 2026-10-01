-- ============================================================================
-- STRATEGIKU PLATFORM - FINAL SUPABASE POSTGRESQL DATABASE SCHEMA
-- Clean Drop, Full Table Creation, RLS Policies & Complete Seed Data
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. CLEANUP EXISTING DATABASE OBJECTS (EXECUTE RESET)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS umkm_recommendations CASCADE;
DROP TABLE IF EXISTS umkm_hub_opportunities CASCADE;
DROP TABLE IF EXISTS business_transactions CASCADE;
DROP TABLE IF EXISTS business_insights CASCADE;
DROP TABLE IF EXISTS business_products CASCADE;
DROP TABLE IF EXISTS business_profiles CASCADE;
DROP TABLE IF EXISTS users CASCADE;

DROP TYPE IF EXISTS "UserRole" CASCADE;
DROP TYPE IF EXISTS "OpportunityStatus" CASCADE;
DROP TYPE IF EXISTS "YesNoSyarat" CASCADE;

-- ----------------------------------------------------------------------------
-- 2. ENABLE REQUIRED EXTENSIONS
-- ----------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ----------------------------------------------------------------------------
-- 3. ENUM DEFINITIONS
-- ----------------------------------------------------------------------------
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'UMKM_OWNER');
CREATE TYPE "OpportunityStatus" AS ENUM ('Aktif', 'Terbuka', 'Ditutup', 'Proses Seleksi');
CREATE TYPE "YesNoSyarat" AS ENUM ('Ya', 'Tidak', 'Dengan Syarat');

-- ----------------------------------------------------------------------------
-- 4. USERS TABLE (Auth & Multi-Role Access)
-- ----------------------------------------------------------------------------
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role "UserRole" NOT NULL DEFAULT 'UMKM_OWNER',
    phone VARCHAR(50),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 5. BUSINESS PROFILES TABLE (5 Main Sections of UMKM Business Profile)
-- ----------------------------------------------------------------------------
CREATE TABLE business_profiles (
    id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    user_id VARCHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- 1. Identitas UMKM
    nama_usaha VARCHAR(255) NOT NULL,
    nama_pemilik VARCHAR(255) NOT NULL,
    kabupaten_kota VARCHAR(100) NOT NULL,
    alamat_usaha TEXT NOT NULL,
    tahun_mulai_usaha INT NOT NULL DEFAULT 2020,
    deskripsi_usaha TEXT NOT NULL,
    
    -- 2. Kategori dan Kemampuan Usaha
    bidang_usaha VARCHAR(100) NOT NULL,
    kategori VARCHAR(100) NOT NULL,
    target_pasar VARCHAR(255) NOT NULL,
    kapasitas VARCHAR(100) NOT NULL,
    area_layanan VARCHAR(255) NOT NULL,
    
    -- 3. Pengalaman dan Kesiapan Kemitraan
    pengalaman_b2b TEXT,
    pengalaman_pesanan_besar TEXT,
    legalitas_usaha TEXT, -- NIB, PIRT, Halal, PT/CV, HKI
    kesediaan_memenuhi_pesanan_besar "YesNoSyarat" NOT NULL DEFAULT 'Ya',
    persyaratan_kemampuan_khusus TEXT,
    
    -- 4. Preferensi Kemitraan
    jenis_peluang_diminati TEXT NOT NULL,
    wilayah_peluang_diinginkan TEXT NOT NULL,
    minimal_pesanan VARCHAR(100) NOT NULL,
    maksimal_pesanan VARCHAR(100) NOT NULL,
    deskripsi_kerjasama TEXT NOT NULL,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 6. BUSINESS PRODUCTS TABLE (Section 5: Katalog Produk/Jasa)
-- ----------------------------------------------------------------------------
CREATE TABLE business_products (
    id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    profile_id VARCHAR(36) NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
    
    nama_produk VARCHAR(255) NOT NULL,
    kategori VARCHAR(100) NOT NULL,
    harga DOUBLE PRECISION NOT NULL DEFAULT 0,
    kapasitas VARCHAR(100) NOT NULL,
    satuan_penjualan VARCHAR(50) NOT NULL DEFAULT 'pcs',
    area_layanan VARCHAR(255) NOT NULL,
    
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 7. UMKM HUB OPPORTUNITIES TABLE (11 Data Fields for Opportunities Directory)
-- ----------------------------------------------------------------------------
CREATE TABLE umkm_hub_opportunities (
    id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    created_by VARCHAR(36) REFERENCES users(id) ON DELETE SET NULL,
    
    judul_peluang VARCHAR(255) NOT NULL,          -- 2. Judul Peluang
    nama_instansi VARCHAR(255) NOT NULL,          -- 3. Nama Instansi/Pihak
    lokasi VARCHAR(100) NOT NULL,                 -- 4. Lokasi
    kategori VARCHAR(100) NOT NULL,               -- 5. Kategori
    jumlah_dan_satuan VARCHAR(100) NOT NULL,    -- 8. Jumlah dan Satuan
    periode VARCHAR(100) NOT NULL,              -- 9. Periode
    status "OpportunityStatus" NOT NULL DEFAULT 'Aktif', -- 10. Status
    link_sumber VARCHAR(500) NOT NULL,            -- 11. Link Sumber
    deskripsi TEXT NOT NULL,
    persyaratan TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 8. UMKM RECOMMENDATIONS TABLE (AI Scoring, Ranking & Reasons)
-- ----------------------------------------------------------------------------
CREATE TABLE umkm_recommendations (
    id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    profile_id VARCHAR(36) NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
    opportunity_id VARCHAR(36) NOT NULL REFERENCES umkm_hub_opportunities(id) ON DELETE CASCADE,
    
    ranking INT NOT NULL DEFAULT 1,              -- 1. Ranking
    skor_relevansi DOUBLE PRECISION NOT NULL DEFAULT 0.90, -- 6. Skor Relevansi (0.00 - 1.00)
    alasan_rekomendasi JSONB NOT NULL DEFAULT '[]'::jsonb, -- 7. Alasan Rekomendasi
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(profile_id, opportunity_id)
);

-- ----------------------------------------------------------------------------
-- 9. BUSINESS TRANSACTIONS TABLE (Business Intelligence Financial Data)
-- ----------------------------------------------------------------------------
CREATE TABLE business_transactions (
    id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    profile_id VARCHAR(36) NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
    
    customer_name VARCHAR(255) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    amount DOUBLE PRECISION NOT NULL DEFAULT 0,
    status VARCHAR(50) NOT NULL DEFAULT 'COMPLETED',
    transaction_date DATE NOT NULL DEFAULT CURRENT_DATE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 10. BUSINESS INSIGHTS TABLE (Actionable BI & Analytics)
-- ----------------------------------------------------------------------------
CREATE TABLE business_insights (
    id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    profile_id VARCHAR(36) NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
    
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    insight_type VARCHAR(50) NOT NULL, -- GROWTH, MARGIN, PRODUCT, MARKET
    period VARCHAR(50) NOT NULL DEFAULT 'Bulan Ini',
    metric_value DOUBLE PRECISION DEFAULT 0.0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 11. INDEXES FOR FAST QUERY PERFORMANCE
-- ----------------------------------------------------------------------------
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_business_profiles_user ON business_profiles(user_id);
CREATE INDEX idx_business_products_profile ON business_products(profile_id);
CREATE INDEX idx_opportunities_status ON umkm_hub_opportunities(status);
CREATE INDEX idx_opportunities_kategori ON umkm_hub_opportunities(kategori);
CREATE INDEX idx_recommendations_profile ON umkm_recommendations(profile_id);
CREATE INDEX idx_transactions_profile ON business_transactions(profile_id);

-- ----------------------------------------------------------------------------
-- 12. ROW LEVEL SECURITY (RLS) POLICIES
-- ----------------------------------------------------------------------------
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE umkm_hub_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE umkm_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_insights ENABLE ROW LEVEL SECURITY;

-- Allow Public/Authenticated Full Access Policies (Supabase Demo Mode)
CREATE POLICY "Public read/write on users" ON users FOR ALL USING (true);
CREATE POLICY "Public read/write on business_profiles" ON business_profiles FOR ALL USING (true);
CREATE POLICY "Public read/write on business_products" ON business_products FOR ALL USING (true);
CREATE POLICY "Public read/write on umkm_hub_opportunities" ON umkm_hub_opportunities FOR ALL USING (true);
CREATE POLICY "Public read/write on umkm_recommendations" ON umkm_recommendations FOR ALL USING (true);
CREATE POLICY "Public read/write on business_transactions" ON business_transactions FOR ALL USING (true);
CREATE POLICY "Public read/write on business_insights" ON business_insights FOR ALL USING (true);

-- ============================================================================
-- 13. SEED DATA DEMO (ALL PLATFORM DATA INCLUDED)
-- ============================================================================

-- A. Users Data (1 Admin & 1 UMKM Owner)
INSERT INTO users (id, email, password_hash, full_name, role, phone) VALUES 
('usr_admin_001', 'admin@aphyah.id', '$2a$10$wJ9B9T1wVbE3P2s7bZJ/6.f2K8W2D7TzE5W0L2V5P4M1K2L3N4O5P', 'Administrator UMKM Hub', 'ADMIN', '081122334455'),
('usr_owner_001', 'demo@aphyah.id', '$2a$10$wJ9B9T1wVbE3P2s7bZJ/6.f2K8W2D7TzE5W0L2V5P4M1K2L3N4O5P', 'Budi Santoso', 'UMKM_OWNER', '081234567890');

-- B. Business Profile Data (5 Sections)
INSERT INTO business_profiles (
    id, user_id,
    -- Section 1: Identitas
    nama_usaha, nama_pemilik, kabupaten_kota, alamat_usaha, tahun_mulai_usaha, deskripsi_usaha,
    -- Section 2: Kategori & Kemampuan
    bidang_usaha, kategori, target_pasar, kapasitas, area_layanan,
    -- Section 3: Pengalaman & Kesiapan
    pengalaman_b2b, pengalaman_pesanan_besar, legalitas_usaha, kesediaan_memenuhi_pesanan_besar, persyaratan_kemampuan_khusus,
    -- Section 4: Preferensi Kemitraan
    jenis_peluang_diminati, wilayah_peluang_diinginkan, minimal_pesanan, maksimal_pesanan, deskripsi_kerjasama
) VALUES (
    'prof_kopi_001', 'usr_owner_001',
    'Kopi Karawang Heritage', 'Budi Santoso', 'Kabupaten Karawang', 'Jl. Interchange Karawang Barat No. 45', 2021, 'Produsen kopi specialty olahan lokal Karawang berkualitas tinggi dengan roasting konsisten.',
    'Pengolahan Makanan & Minuman', 'Kopi & Minuman Olahan', 'Cafe, Hotel, Retail, dan Korporat', '600 kg / bulan', 'Jawa Barat & Jabodetabek',
    'Memasok 15 cafe lokal di Karawang & Bandung serta 3 dinas Pemkab', 'Memenuhi pesanan hampers 1.000 box Telkom Indonesia', 'NIB, PIRT No. 210321501099-26, Halal MUI, Hak Merek (HKI)', 'Ya', 'Sertifikasi Roaster Teruji, Laboratorium Cupping Mandiri',
    'Pasokan B2B, Pengadaan Korporat, Reseller Grosir', 'Jawa Barat, DKI Jakarta, Banten', '50 Pouch / 10kg', '2.000 Pouch / 500kg', 'Kerjasama pasokan berkala jangka panjang 6-12 bulan'
);

-- C. Business Products Data (Section 5: Katalog Produk/Jasa)
INSERT INTO business_products (id, profile_id, nama_produk, kategori, harga, kapasitas, satuan_penjualan, area_layanan) VALUES
('prod_001', 'prof_kopi_001', 'Kopi Arabika Specialty Karawang 250g', 'Biji & Bubuk Kopi', 65000, '300 kg / bulan', 'pouch', 'Nasional'),
('prod_002', 'prof_kopi_001', 'Kopi Robusta Blend Karawang 250g', 'Biji & Bubuk Kopi', 45000, '500 kg / bulan', 'pouch', 'Nasional'),
('prod_003', 'prof_kopi_001', 'Cold Brew Bottled Signature 250ml', 'Minuman Siap Minum', 25000, '400 botol / bulan', 'botol', 'Jabodetabek & Karawang'),
('prod_004', 'prof_kopi_001', 'Drip Bag Coffee Box (Isi 5 Sachet)', 'Kopi Praktis', 35000, '250 box / bulan', 'box', 'Nasional');

-- D. UMKM Hub Opportunities Data (Admin Managed Opportunities)
INSERT INTO umkm_hub_opportunities (
    id, created_by, judul_peluang, nama_instansi, lokasi, kategori, jumlah_dan_satuan, periode, status, link_sumber, deskripsi, persyaratan
) VALUES
(
    'opp_001', 'usr_admin_001',
    'Pengadaan Bingkisan Kopi & Suvenir UMKM Pemkab Karawang',
    'Dinas Koperasi & UMKM Kabupaten Karawang',
    'Kabupaten Karawang',
    'F&B / Pengadaan',
    '500 Box Suvenir',
    '1 Oktober - 15 November 2026',
    'Aktif',
    'https://diskopukm.karawangkab.go.id/peluang-pengadaan-2026',
    'Pengadaan paket suvenir kopi lokal Karawang untuk perayaan HUT Karawang dan event kunjungan kerja dinas.',
    'Legalitas NIB & Halal terverifikasi, kemasan kotak eksklusif berlogo instansi.'
),
(
    'opp_002', 'usr_admin_001',
    'Pasokan Biji Kopi Roasting untuk Jaringan Cafe Bandung',
    'Kolektif Cafe Bandung Raya',
    'Kota Bandung',
    'F&B / Supply Agreement',
    '250 kg / bulan',
    'November 2026 - April 2027 (6 Bulan)',
    'Aktif',
    'https://bandungcafenetwork.com/supply-partner-2026',
    'Kemitraan pasokan biji kopi Arabika & Robusta roasted bean tingkat Medium-to-Dark untuk 8 outlet cafe.',
    'Sampel tes uji rasa (cupping score >80), konsistensi pasokan bulanan.'
),
(
    'opp_003', 'usr_admin_001',
    'Display Ritel Produk Suvenir Kopi Rest Area Tol Cipularang',
    'Pengelola Rest Area KM 88 Purbaleunyi',
    'Kabupaten Purwakarta',
    'Retail / Etalase Suvenir',
    '150 Box / bulan',
    '1 Oktober 2026 - 31 Maret 2027',
    'Aktif',
    'https://jasamarga.co.id/pojok-umkm-restarea',
    'Fasilitas etalase ritel untuk produk olahan kopi praktis (Drip bag & Cold Brew) di pojok UMKM Jabar.',
    'Daya simpan produk >6 bulan, kemasan eye-catching dan tahan banting.'
);

-- E. Recommendations Data (Matches Business Profile with Opportunities)
INSERT INTO umkm_recommendations (id, profile_id, opportunity_id, ranking, skor_relevansi, alasan_rekomendasi) VALUES
(
    'rec_001', 'prof_kopi_001', 'opp_001', 1, 0.95,
    '["Kategori produk kopi specialty sesuai", "Lokasi Kabupaten Karawang tepat sasaran", "Legalitas NIB & Halal terverifikasi", "Kapasitas produksi 600kg/bln mencukupi"]'::jsonb
),
(
    'rec_002', 'prof_kopi_001', 'opp_002', 2, 0.89,
    '["Produk roasted bean siap pasokan B2B", "Pengalaman pasokan cafe terbukti", "Wilayah kemitraan Jawa Barat"]'::jsonb
),
(
    'rec_003', 'prof_kopi_001', 'opp_003', 3, 0.82,
    '["Katalog produk Drip Bag & Cold Brew sesuai standar ritel", "Kemasan produk berizin P-IRT"]'::jsonb
);

-- F. Transactions Data (Business Intelligence Analytics)
INSERT INTO business_transactions (id, profile_id, customer_name, product_name, category, amount, status, transaction_date) VALUES
('tx_001', 'prof_kopi_001', 'Cafe Sejahtera Bandung', 'Kopi Robusta Blend Karawang 250g', 'Biji & Bubuk Kopi', 2250000, 'COMPLETED', '2026-09-15'),
('tx_002', 'prof_kopi_001', 'Dinas Koperasi Karawang', 'Drip Bag Coffee Box', 'Kopi Praktis', 3500000, 'COMPLETED', '2026-09-20'),
('tx_003', 'prof_kopi_001', 'Hotel Grand Karawang', 'Kopi Arabika Specialty Karawang 250g', 'Biji & Bubuk Kopi', 3685000, 'COMPLETED', '2026-09-28');

-- G. Insights Data (Actionable BI Insights)
INSERT INTO business_insights (id, profile_id, title, description, insight_type, period, metric_value) VALUES
('ins_001', 'prof_kopi_001', 'Pertumbuhan Omset B2B Meningkat Spesifik', 'Penjualan ke segmen cafe wholesale naik 32% dalam 30 hari terakhir.', 'GROWTH', 'Bulan Ini', 0.32),
('ins_002', 'prof_kopi_001', 'Produk Drip Bag Menjadi Favorit Instansi', 'Katalog Drip Bag Coffee Box menyumbang 37% dari total margin bersih usaha.', 'PRODUCT', 'Kuartal III', 0.37),
('ins_003', 'prof_kopi_001', 'Potensi Ekspansi Pasar Rest Area Cipularang', 'Rekomendasi AI menunjukkan tingkat kesesuaian 82% untuk etalase suvenir tol.', 'MARKET', 'Prospek', 0.82);

-- ----------------------------------------------------------------------------
-- 14. FINAL EXECUTION CONFIRMATION
-- ----------------------------------------------------------------------------
SELECT 'Supabase Database reset and final schema script executed successfully!' AS status_message;
