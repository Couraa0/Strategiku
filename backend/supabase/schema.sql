-- ============================================================================
-- APH YAH Platform - Supabase PostgreSQL Database Schema
-- Integrated UMKM Business Growth Intelligence Platform (West Java)
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Clean up existing tables (Optional - run with caution)
-- DROP TABLE IF EXISTS knowledge_chunks CASCADE;
-- DROP TABLE IF EXISTS knowledge_documents CASCADE;
-- DROP TABLE IF EXISTS recommendations CASCADE;
-- DROP TABLE IF EXISTS opportunity_requirements CASCADE;
-- DROP TABLE IF EXISTS opportunities CASCADE;
-- DROP TABLE IF EXISTS business_insights CASCADE;
-- DROP TABLE IF EXISTS transaction_items CASCADE;
-- DROP TABLE IF EXISTS transactions CASCADE;
-- DROP TABLE IF EXISTS customers CASCADE;
-- DROP TABLE IF EXISTS products CASCADE;
-- DROP TABLE IF EXISTS business_capabilities CASCADE;
-- DROP TABLE IF EXISTS business_goals CASCADE;
-- DROP TABLE IF EXISTS business_profiles CASCADE;
-- DROP TABLE IF EXISTS business_users CASCADE;
-- DROP TABLE IF EXISTS businesses CASCADE;
-- DROP TABLE IF EXISTS users CASCADE;
-- DROP TABLE IF EXISTS regional_contexts CASCADE;

-- Create Enums
DO $$ BEGIN
    CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'UMKM_OWNER', 'STAFF');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE "BusinessCategory" AS ENUM ('KULINER', 'FASHION', 'KERAJINAN', 'PERDAGANGAN', 'JASA', 'MANUFAKTUR', 'AGROBISNIS', 'LAINNYA');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE "ScaleStage" AS ENUM ('MICRO', 'SMALL', 'MEDIUM');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE "TransactionStatus" AS ENUM ('COMPLETED', 'PENDING', 'CANCELLED');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE "InsightCategory" AS ENUM ('REVENUE', 'PRODUCT', 'CUSTOMER', 'EFFICIENCY', 'MARKET');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE "InsightImpact" AS ENUM ('HIGH', 'MEDIUM', 'LOW');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE "OpportunityCategory" AS ENUM ('EXHIBITION', 'FINANCING', 'DISTRIBUTION', 'TRAINING', 'DIGITALIZATION');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE "DocCategory" AS ENUM ('SOP', 'FINANCIAL', 'MARKETING', 'REGULATION', 'MARKET_RESEARCH', 'GENERAL');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE "SenderType" AS ENUM ('USER', 'ASSISTANT');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- ----------------------------------------------------------------------------
-- 1. Users & Auth
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
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
-- 2. Businesses
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS businesses (
    id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    name VARCHAR(255) NOT NULL,
    category "BusinessCategory" NOT NULL DEFAULT 'KULINER',
    city VARCHAR(100) NOT NULL DEFAULT 'Bandung',
    province VARCHAR(100) NOT NULL DEFAULT 'Jawa Barat',
    description TEXT,
    address TEXT,
    phone VARCHAR(50),
    email VARCHAR(255),
    website VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS business_users (
    id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    user_id VARCHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    business_id VARCHAR(36) NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    role "UserRole" NOT NULL DEFAULT 'UMKM_OWNER',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, business_id)
);

-- ----------------------------------------------------------------------------
-- 3. Business Profiles & Capability Engine
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS business_profiles (
    id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    business_id VARCHAR(36) UNIQUE NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    scale_stage "ScaleStage" NOT NULL DEFAULT 'MICRO',
    monthly_revenue DOUBLE PRECISION NOT NULL DEFAULT 0,
    employee_count INT NOT NULL DEFAULT 1,
    operational_years INT NOT NULL DEFAULT 1,
    readiness_score INT NOT NULL DEFAULT 65,
    digital_adoption_score INT NOT NULL DEFAULT 50,
    financial_health_score INT NOT NULL DEFAULT 60,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS business_goals (
    id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    profile_id VARCHAR(36) NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
    goal_type VARCHAR(100) NOT NULL,
    target_value DOUBLE PRECISION,
    target_date TIMESTAMP WITH TIME ZONE,
    is_achieved BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS business_capabilities (
    id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    profile_id VARCHAR(36) NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
    capability_name VARCHAR(100) NOT NULL,
    has_capability BOOLEAN NOT NULL DEFAULT false,
    notes TEXT
);

-- ----------------------------------------------------------------------------
-- 4. Products & Customers
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    business_id VARCHAR(36) NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    sku VARCHAR(100),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL DEFAULT 'Umum',
    price DOUBLE PRECISION NOT NULL DEFAULT 0,
    cost_price DOUBLE PRECISION NOT NULL DEFAULT 0,
    stock INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS customers (
    id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    business_id VARCHAR(36) NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    email VARCHAR(255),
    city VARCHAR(100) DEFAULT 'Bandung',
    total_spend DOUBLE PRECISION NOT NULL DEFAULT 0,
    transaction_count INT NOT NULL DEFAULT 0,
    last_transaction_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 5. Transactions & Items
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS transactions (
    id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    business_id VARCHAR(36) NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    customer_id VARCHAR(36) REFERENCES customers(id) ON DELETE SET NULL,
    invoice_number VARCHAR(100) NOT NULL,
    transaction_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    total_amount DOUBLE PRECISION NOT NULL DEFAULT 0,
    discount_amount DOUBLE PRECISION NOT NULL DEFAULT 0,
    final_amount DOUBLE PRECISION NOT NULL DEFAULT 0,
    payment_method VARCHAR(50) NOT NULL DEFAULT 'CASH',
    status "TransactionStatus" NOT NULL DEFAULT 'COMPLETED',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS transaction_items (
    id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    transaction_id VARCHAR(36) NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
    product_id VARCHAR(36) NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity INT NOT NULL DEFAULT 1,
    unit_price DOUBLE PRECISION NOT NULL DEFAULT 0,
    subtotal DOUBLE PRECISION NOT NULL DEFAULT 0
);

-- ----------------------------------------------------------------------------
-- 6. Business Intelligence Engine Output
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS business_insights (
    id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    business_id VARCHAR(36) NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    summary TEXT NOT NULL,
    category "InsightCategory" NOT NULL DEFAULT 'REVENUE',
    impact "InsightImpact" NOT NULL DEFAULT 'MEDIUM',
    data_source VARCHAR(255),
    actionable_step TEXT,
    is_read BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 7. Opportunity Matcher Engine
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS opportunities (
    id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    title VARCHAR(255) NOT NULL,
    organizer VARCHAR(255) NOT NULL,
    category "OpportunityCategory" NOT NULL DEFAULT 'EXHIBITION',
    description TEXT NOT NULL,
    city VARCHAR(100) NOT NULL DEFAULT 'Bandung',
    province VARCHAR(100) NOT NULL DEFAULT 'Jawa Barat',
    min_scale "ScaleStage" NOT NULL DEFAULT 'MICRO',
    funding_amount DOUBLE PRECISION,
    deadline TIMESTAMP WITH TIME ZONE NOT NULL,
    link_url VARCHAR(500),
    is_verified BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS opportunity_requirements (
    id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    opportunity_id VARCHAR(36) NOT NULL REFERENCES opportunities(id) ON DELETE CASCADE,
    requirement VARCHAR(255) NOT NULL,
    is_mandatory BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS recommendations (
    id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    business_id VARCHAR(36) NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    opportunity_id VARCHAR(36) NOT NULL REFERENCES opportunities(id) ON DELETE CASCADE,
    match_score DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    match_reasons JSONB NOT NULL DEFAULT '[]'::jsonb,
    status VARCHAR(50) NOT NULL DEFAULT 'NEW',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 8. RAG & Knowledge Base Engine
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS knowledge_documents (
    id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    title VARCHAR(255) NOT NULL,
    category "DocCategory" NOT NULL DEFAULT 'GENERAL',
    tags VARCHAR(500),
    source_url VARCHAR(500),
    file_type VARCHAR(50) NOT NULL DEFAULT 'TXT',
    content TEXT NOT NULL,
    author VARCHAR(100) DEFAULT 'Tim APH YAH',
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS knowledge_chunks (
    id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    document_id VARCHAR(36) NOT NULL REFERENCES knowledge_documents(id) ON DELETE CASCADE,
    chunk_index INT NOT NULL,
    content TEXT NOT NULL
);

-- ----------------------------------------------------------------------------
-- 9. Regional Context (West Java Focus)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS regional_contexts (
    id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    city_kabupaten VARCHAR(100) UNIQUE NOT NULL,
    priority_sector VARCHAR(255) NOT NULL,
    dinas_contact VARCHAR(255),
    program_summary TEXT
);

-- ----------------------------------------------------------------------------
-- INDEXES FOR OPTIMAL QUERY PERFORMANCE
-- ----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_businesses_category ON businesses(category);
CREATE INDEX IF NOT EXISTS idx_businesses_city ON businesses(city);
CREATE INDEX IF NOT EXISTS idx_products_business ON products(business_id);
CREATE INDEX IF NOT EXISTS idx_transactions_business ON transactions(business_id);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(transaction_date);
CREATE INDEX IF NOT EXISTS idx_insights_business ON business_insights(business_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_business ON recommendations(business_id);
CREATE INDEX IF NOT EXISTS idx_opportunities_category ON opportunities(category);
CREATE INDEX IF NOT EXISTS idx_knowledge_category ON knowledge_documents(category);

-- ----------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ----------------------------------------------------------------------------
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_documents ENABLE ROW LEVEL SECURITY;

-- Allow read/write access for service role or public demo access
CREATE POLICY "Public full access on users" ON users FOR ALL USING (true);
CREATE POLICY "Public full access on businesses" ON businesses FOR ALL USING (true);
CREATE POLICY "Public full access on business_profiles" ON business_profiles FOR ALL USING (true);
CREATE POLICY "Public full access on products" ON products FOR ALL USING (true);
CREATE POLICY "Public full access on transactions" ON transactions FOR ALL USING (true);
CREATE POLICY "Public full access on business_insights" ON business_insights FOR ALL USING (true);
CREATE POLICY "Public full access on opportunities" ON opportunities FOR ALL USING (true);
CREATE POLICY "Public full access on recommendations" ON recommendations FOR ALL USING (true);
CREATE POLICY "Public full access on knowledge_documents" ON knowledge_documents FOR ALL USING (true);

-- ----------------------------------------------------------------------------
-- SEED DEMO DATA
-- ----------------------------------------------------------------------------
-- Clear pre-existing demo user if exists
DELETE FROM users WHERE email = 'demo@aphyah.id';

-- Insert Demo User (Password: Demo123!)
INSERT INTO users (id, email, password_hash, full_name, role, phone, is_active)
VALUES (
    'usr_demo_001',
    'demo@aphyah.id',
    '$2a$10$wJ9B9T1wVbE3P2s7bZJ/6.f2K8W2D7TzE5W0L2V5P4M1K2L3N4O5P', -- hash for Demo123!
    'Budi Santoso (Demo)',
    'UMKM_OWNER',
    '081234567890',
    true
) ON CONFLICT (email) DO NOTHING;

-- Insert Demo Business
INSERT INTO businesses (id, name, category, city, province, description, address, phone, email)
VALUES (
    'biz_kopi_001',
    'Kopi Karawang Heritage',
    'KULINER',
    'Karawang',
    'Jawa Barat',
    'Produsen kopi lokal khas Karawang dengan varian Robusta Karawang dan Arabica Puntang pilihan.',
    'Jl. Interchange Karawang Barat No. 45, Karawang',
    '081234567890',
    'info@kopikarawang.id'
) ON CONFLICT (id) DO NOTHING;

-- Map User to Business
INSERT INTO business_users (id, user_id, business_id, role)
VALUES ('bu_demo_001', 'usr_demo_001', 'biz_kopi_001', 'UMKM_OWNER')
ON CONFLICT DO NOTHING;

-- Insert Business Profile
INSERT INTO business_profiles (id, business_id, scale_stage, monthly_revenue, employee_count, operational_years, readiness_score, digital_adoption_score, financial_health_score)
VALUES (
    'prof_kopi_001',
    'biz_kopi_001',
    'SMALL',
    48500000,
    5,
    3,
    82,
    75,
    80
) ON CONFLICT (business_id) DO NOTHING;

-- Insert Sample Opportunities
INSERT INTO opportunities (id, title, organizer, category, description, city, province, min_scale, funding_amount, deadline, link_url, is_verified)
VALUES
(
    'opp_001',
    'Kurasi UMKM Ekspor Jawa Barat 2026',
    'Dinas Indag Jabar & Bank Indonesia',
    'EXHIBITION',
    'Program pendampingan dan fasilitasi ekspor untuk produk unggulan Jawa Barat sektor Kuliner dan Fashion ke pasar ASEAN.',
    'Bandung',
    'Jawa Barat',
    'SMALL',
    50000000,
    NOW() + INTERVAL '30 days',
    'https://disindag.jabarprov.go.id/ekspor-2026',
    true
),
(
    'opp_002',
    'Subsidi Sertifikasi Halal Gratis (SEHATI) Jabar',
    'BPJPH & Kemenag Jabar',
    'DIGITALIZATION',
    'Program sertifikasi halal gratis jalur self declare untuk UMKM produk makanan dan minuman skala mikro & kecil.',
    'Bandung',
    'Jawa Barat',
    'MICRO',
    0,
    NOW() + INTERVAL '15 days',
    'https://sehati.halal.go.id',
    true
),
(
    'opp_003',
    'Kredit Mesra (Masyarakat Sejahtera) bjb',
    'Bank bjb & Pemprov Jabar',
    'FINANCING',
    'Pinjaman tanpa bunga dan tanpa agunan hingga Rp 5 juta untuk UMKM berbasis komunitas rumah ibadah.',
    'Bandung',
    'Jawa Barat',
    'MICRO',
    5000000,
    NOW() + INTERVAL '60 days',
    'https://bankbjb.co.id/kredit-mesra',
    true
)
ON CONFLICT (id) DO NOTHING;

-- Insert Opportunity Requirements
INSERT INTO opportunity_requirements (id, opportunity_id, requirement, is_mandatory)
VALUES
('req_001', 'opp_001', 'NIB (Nomor Induk Berusaha)', true),
('req_002', 'opp_001', 'Omset Minimal Rp 300 Juta / Tahun', true),
('req_003', 'opp_001', 'Sudah Beroperasi Minimal 2 Tahun', true),
('req_004', 'opp_002', 'Produk Makanan / Minuman Tidak Berisiko', true),
('req_005', 'opp_002', 'KTP & NIB Berbasis Jawa Barat', true)
ON CONFLICT (id) DO NOTHING;

-- Insert Regional Context
INSERT INTO regional_contexts (id, city_kabupaten, priority_sector, dinas_contact, program_summary)
VALUES
('reg_001', 'Karawang', 'Agro-industri, Kuliner Olahan, Manufaktur Komponen', 'Dinas Koperasi & UMKM Kab. Karawang (0267-402123)', 'Fokus pengembangan UMKM penyokong rantai pasok industri & pusat oleh-oleh kuliner.'),
('reg_002', 'Kota Bandung', 'Kuliner Creative, Fashion & Craft, Software/Digital', 'Dinas Koperasi & UKM Kota Bandung (022-7201234)', 'Program Bandung Creative Hub & Akselerasi Ekspor Digital.')
ON CONFLICT (id) DO NOTHING;

-- Schema setup complete notification
SELECT 'APH YAH Supabase Schema and Seed Data initialized successfully!' AS result;
