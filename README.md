# APH YAH - Integrated UMKM Business Growth Intelligence Platform

> **Tagline**: *"From Business Data to Business Growth"*  
> **Tagline (ID)**: *"Dari Data Usaha Menjadi Arah Pertumbuhan"*  
> **Regional Scope**: Jawa Barat, Indonesia  

APH YAH adalah platform kecerdasan pertumbuhan bisnis terintegrasi (*Business Growth Intelligence Platform*) yang dirancang khusus untuk mengakselerasi skala usaha UMKM (Usaha Mikro, Kecil, dan Menengah) di Jawa Barat. Platform ini mengolah data transaksi harian dan profil kapabilitas usaha menjadi wawasan analitis otomatis, rekomendasi peluang strategis terkurasi (ekspor, sertifikasi halal, pembiayaan), serta pendampingan AI berbasis RAG.

---

## 🚀 Core Product Architecture & 3 Intelligence Engines

APH YAH mengintegrasikan 3 mesin kecerdasan utama yang bekerja harmonis melalui *Shared Business Context*:

1. **Business Intelligence Engine**
   - Ingesti & validasi data transaksi harian (.CSV/Manual).
   - Analisis otomatis omset penjualan, tren transaksi bulanan, perankingan SKU produk favorit, dan kesehatan finansial.
   - Generasi wawasan bisnis kontekstual (*automated insights*) berdasar ambang batas kriteria UMKM Jawa Barat.

2. **Opportunity Matcher Engine**
   - Agregasi peluang terverifikasi (Kurasi Ekspor Disindag Jabar, Sertifikasi Halal SEHATI BPJPH, Kredit Mesra bjb, Program Akselerasi).
   - *Contextual Match Pipeline*: Scoring kecocokan 0-100% berdasarkan kategori sektor usaha, omset, lokasi kabupaten/kota, dan kapasitas produksi.
   - *Provenance display*: Penjelasan transparan *"Why Recommended"* dan sumber asal data peluang.

3. **AI Growth Assistant (Grounded RAG)**
   - Asisten konsultasi bisnis interaktif 24/7.
   - Didukung oleh Retrieval-Augmented Generation (RAG) berbasis *Knowledge Base* resmi usaha (SOP, daftar harga, syarat kemitraan).
   - Menghasilkan jawaban berakurasi tinggi dengan **Garansi Anti-Halusinasi** serta mencantumkan attribusi sumber (*Sources*).

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 19, Vite, TypeScript, Tailwind CSS v4, Plus Jakarta Sans, Recharts, Lucide Icons, React Router v7, TanStack React Query, Axios.
- **Backend**: Node.js, Express.js (ES Modules), TypeScript, Prisma ORM / Supabase JS SDK, Swagger/OpenAPI 3.0, Zod Validation, JWT Auth, Multer CSV Parser.
- **Database**: Supabase PostgreSQL (17 Relational Tables, Indexes, RLS Policies).
- **Deployment**: Vercel Serverless (Backend & Frontend Deployed Separately).

---

## 🗄️ Database Setup Guide (Supabase PostgreSQL)

Project ini menggunakan Supabase PostgreSQL:
- **Supabase URL**: `https://your-supabase-project.supabase.co`
- **PostgreSQL Host**: `db.your-supabase-project.supabase.co`

### Langkah Inisialisasi Database via Supabase SQL Editor:
1. Buka dashboard [Supabase Console](https://supabase.com).
2. Pilih project Supabase Anda.
3. Buka menu **SQL Editor** pada navigasi sebelah kiri.
4. Buka file `backend/supabase/schema.sql` yang berada di dalam repository ini.
5. Salin (*copy*) seluruh perintah DDL SQL dari file `schema.sql` dan tempelkan (*paste*) di SQL Editor Supabase.
6. Klik **Run**. File SQL ini akan secara otomatis:
   - Membuat 17 tabel relational lengkap dengan kunci utama (*primary key*) dan relasi (*foreign key*).
   - Menambahkan Enum Types & Index performa tinggi.
   - Mengaktifkan Row Level Security (RLS) policies.
   - Memasukkan data seed demo awal (*Kopi Karawang Heritage* & akun `demo@aphyah.id`).

---

## 💻 Local Setup & Running Guide

### 1. Clone Repository
```bash
git clone https://github.com/Couraa0/Skripsi.git
cd Skripsi
```

### 2. Backend Setup & Run
1. Buka terminal dan masuk ke folder `backend`:
   ```bash
   cd backend
   ```
2. Install dependensi:
   ```bash
   npm install
   ```
3. Buat file `.env` di folder `backend` (dapat menyalin dari `.env.example`):
   ```env
   PORT=5000
   NODE_ENV=development
   DATABASE_URL="postgresql://postgres:your_password@db.your-supabase-project.supabase.co:5432/postgres?schema=public"
   SUPABASE_URL="https://your-supabase-project.supabase.co"
   SUPABASE_ANON_KEY="your_supabase_anon_key"
   JWT_SECRET="your_jwt_secret_key"
   JWT_EXPIRES_IN="7d"
   CLIENT_URL="http://localhost:5173"
   ```
4. Jalankan backend development server:
   ```bash
   npm run dev
   ```
   - REST API berjalan di: `http://localhost:5000/api`
   - Health Check Endpoint: `http://localhost:5000/api/health`
   - **Interactive Swagger Documentation**: `http://localhost:5000/api/docs`

---

### 3. Frontend Setup & Run
1. Buka terminal baru dan masuk ke folder `frontend`:
   ```bash
   cd frontend
   ```
2. Install dependensi:
   ```bash
   npm install
   ```
3. Buat file `.env` di folder `frontend` (dapat menyalin dari `.env.example`):
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Jalankan frontend development server:
   ```bash
   npm run dev
   ```
   - Aplikasi Frontend berjalan di: `http://localhost:5173`

---

## 📚 Interactive Swagger / OpenAPI Documentation

Backend APH YAH dilengkapi dengan dokumentasi OpenAPI 3.0 interaktif:

- **Swagger UI**: [http://localhost:5000/api/docs](http://localhost:5000/api/docs)
- **Raw OpenAPI JSON Spec**: `http://localhost:5000/api/docs.json`

Swagger mencakup seluruh endpoint:
- Auth (`/api/auth/register`, `/api/auth/login`, `/api/auth/me`)
- Business Profile (`/api/business`)
- Products Management (`/api/products`)
- Data Ingestion / CSV Upload (`/api/business-data/upload`)
- Transactions Analytics (`/api/transactions`)
- Business Intelligence (`/api/bi/dashboard`, `/api/bi/insights`)
- Opportunity Matcher (`/api/opportunities`, `/api/recommendations`)
- Knowledge Base (`/api/knowledge`)
- RAG AI Assistant (`/api/assistant/chat`)

---

## 🌐 Vercel Deployment Guide (Separate Deployments)

Platform APH YAH dirancang untuk dideploy secara terpisah di Vercel.

### Deploying Backend to Vercel
1. Pastikan file `backend/vercel.json` dan `backend/api/index.ts` sudah ada.
2. Gunakan Vercel CLI atau Vercel Dashboard:
   ```bash
   cd backend
   vercel
   ```
3. Set Environment Variables di Vercel Backend:
   - `NODE_ENV`: `production`
   - `DATABASE_URL`: `postgresql://postgres:your_password@db.your-supabase-project.supabase.co:5432/postgres?schema=public`
   - `SUPABASE_URL`: `https://your-supabase-project.supabase.co`
   - `SUPABASE_ANON_KEY`: `your_supabase_anon_key`
   - `JWT_SECRET`: `your_jwt_secret_key`

### Deploying Frontend to Vercel
1. Pastikan file `frontend/vercel.json` sudah ada (untuk penanganan routing SPA).
2. Gunakan Vercel CLI atau Vercel Dashboard:
   ```bash
   cd frontend
   vercel
   ```
3. Set Environment Variable di Vercel Frontend:
   - `VITE_API_URL`: URL Backend Vercel Anda + `/api` (contoh: `https://aphyah-backend.vercel.app/api`)

---

## 🔑 Demo Account & Golden Path Testing

Untuk menguji alur lengkap (*Golden Path*) aplikasi tanpa registrasi manual:

- **Demo Email**: `demo@aphyah.id`
- **Password**: `Demo123!`
- **Profil Usaha Sample**: *Kopi Karawang Heritage* (Karawang, Jawa Barat)

### Alur Uji Golden Path:
1. **Login**: Buka `http://localhost:5173/login` lalu klik tombol **Quick Demo Mode** atau **Demo Account**.
2. **Dashboard Overview**: Tinjau KPI omset penjualan, tren Recharts, serta insight pertumbuhan bisnis otomatis.
3. **Data Ingestion**: Unggah file transaksi CSV pada menu **Business Data**.
4. **Opportunity Matcher**: Buka **Opportunity Center** & **Recommendations** untuk melihat peluang ekspor & pendanaan Jabar terverifikasi beserta skor matching %.
5. **AI Growth Assistant**: Ajukan pertanyaan seputar Sertifikasi Halal atau syarat kemitraan usaha pada **AI Assistant**.

---

## 📄 License & Attribution

APH YAH Platform © 2026 - Designed & Built for West Java UMKM Business Acceleration.
