# 🏛️ Arsitektur Sistem & Integrasi AI (APH YAH Platform)

Dokumen ini berisi rancangan arsitektur teknis terintegrasi antara **Frontend Web**, **Backend API**, **AI Microservice (RAG Engine)**, dan **Integrasi Obsidian Vault** untuk platform kecerdasan bisnis UMKM.

---

## 1. High-Level Architecture Diagram

Diagram berikut menggambarkan interaksi antara komponen layer Frontend, Obsidian Vault, Backend Gateway, AI Service, dan Database/Vector Store.

```mermaid
graph TB
    subgraph CLIENT_LAYER["💻 Client & User Interface Layer"]
        FE["Web App (React 19 + Vite)<br/>• Dashboard BI & Recharts<br/>• Opportunity Matcher UI<br/>• AI Chat Assistant UI"]
        OBS["Obsidian App (User / Business Vault)<br/>• SOP & Business Strategy Notes<br/>• Catalog & Product Docs (.md)<br/>• APH YAH Obsidian Plugin"]
    end

    subgraph BACKEND_LAYER["⚙️ Backend API Layer (Node.js / Express / TS)"]
        API_GW["Express API Server / Router"]
        AUTH["Auth & JWT Module"]
        BI_MOD["BI & Transaction Analytics"]
        OPP_MOD["Opportunity Matcher Engine"]
        KB_MOD["Knowledge Base Manager"]
        MULTER["Multer CSV Parser"]
    end

    subgraph AI_LAYER["🤖 AI Microservice Layer (Python / FastAPI)"]
        FAST_API["FastAPI AI Engine"]
        RAG_ENG["RAG Orchestration Core<br/>(LangChain / LlamaIndex)"]
        INGEST_ENG["Obsidian Vault Sync & Markdown Ingestor<br/>• Frontmatter Parser<br/>• Chunking & Tokenizer"]
        EMBED_ENG["Embedding Model<br/>(text-embedding-3-small / Gemini Embedding)"]
        LLM_ENG["LLM Engine<br/>(Google Gemini / OpenAI GPT)"]
    end

    subgraph DATA_LAYER["🗄️ Storage & Database Layer (Supabase / Postgres)"]
        PG_DB[("Supabase PostgreSQL DB<br/>• Users & Profiles<br/>• Transactions & SKU<br/>• Opportunities Data")]
        VEC_DB[("Vector Database / pgvector<br/>• Knowledge Base Embeddings<br/>• Document Chunks & Metadata")]
        STORAGE["Supabase Storage<br/>• CSV Files & Media Assets"]
    end

    %% Client Interactions
    FE -->|"HTTP REST / JSON<br/>(Zod Validated)"| API_GW
    OBS -->|"Sync / Markdown Push via Plugin<br/>atau API Endpoint"| API_GW
    OBS -->|"Direct Local RAG / API Query"| FAST_API

    %% Backend Routing & Data Flow
    API_GW --> AUTH
    API_GW --> BI_MOD
    API_GW --> OPP_MOD
    API_GW --> KB_MOD
    API_GW --> MULTER

    BI_MOD --> PG_DB
    OPP_MOD --> PG_DB
    MULTER --> STORAGE

    %% Backend to AI Microservice
    KB_MOD -->|"Trigger Ingestion API"| FAST_API
    API_GW -->|"Chat Query & Context Request"| FAST_API

    %% AI Microservice Logic & Embeddings
    FAST_API --> RAG_ENG
    FAST_API --> INGEST_ENG
    INGEST_ENG --> EMBED_ENG
    RAG_ENG --> EMBED_ENG
    RAG_ENG --> LLM_ENG

    %% AI Database Operations
    EMBED_ENG -->|"Store / Query Vector Embeddings"| VEC_DB
    RAG_ENG -->|"Fetch Relevant Context Chunks"| VEC_DB
```

---

## 2. Diagram Integrasi Obsidian Vault (Markdown to RAG Knowledge Base)

Obsidian berfungsi sebagai pencatat strategi bisnis, SOP, dan catatan operasional UMKM. Alur ingesti data dari Obsidian ke RAG Engine digambarkan pada diagram urutan (Sequence Diagram) di bawah ini:

```mermaid
sequenceDiagram
    autonumber
    actor User as Pemilik UMKM / Admin
    participant Obs as Obsidian Vault & Plugin
    participant Backend as Express Backend API
    participant AI as FastAPI AI Service
    participant Embed as Embedding Model API
    participant VecDB as Vector DB (pgvector / Supabase)

    %% Flow 1: Ingestion Note
    rect rgb(240, 248, 255)
    note over User, VecDB: Alur 1: Ingesti & Sinkronisasi Catatan Bisnis dari Obsidian
    User->>Obs: Tulis / Edit Catatan SOP / Strategy (.md)
    Obs->>Obs: Trigger Auto-Sync Plugin (atau Sync Manual)
    Obs->>Backend: POST /api/knowledge/sync-obsidian (Metadata + Markdown Content)
    Backend->>Backend: Validasi Auth Token & Hak Akses
    Backend->>AI: POST /api/v1/ai/ingest-markdown (Payload File .md)
    AI->>AI: Parse Frontmatter, Clean Text & Chunking Text
    AI->>Embed: Request Vector Embedding per Chunk Text
    Embed-->>AI: Return Vector Embeddings (1536d / 768d)
    AI->>VecDB: Upsert Vectors + Chunk Metadata (Document ID, Chunk Index, Source: Obsidian)
    VecDB-->>AI: Confirm Saved
    AI-->>Backend: HTTP 200 OK (Status Ingestion Success)
    Backend-->>Obs: Response Ingested Successfully
    end
```

---

## 3. Diagram Alur Tanya Jawab AI Assistant (Grounded RAG Flow)

Berikut alur interaksi user ketika melakukan tanya-jawab bisnis via Web Client atau Obsidian Plugin:

```mermaid
sequenceDiagram
    autonumber
    actor User as Pemilik UMKM
    participant Client as Frontend Web / Obsidian Plugin
    participant Backend as Express Backend API
    participant AI as FastAPI AI Service
    participant VecDB as Vector DB (pgvector)
    participant LLM as Gemini / OpenAI LLM API

    rect rgb(245, 245, 245)
    note over User, LLM: Alur 2: Grounded RAG Chat Consultation
    User->>Client: Input Pertanyaan: "Bagaimana alur pengajuan Halal untuk produk kopi?"
    Client->>Backend: POST /api/assistant/chat (Query + User Context ID)
    Backend->>Backend: Ambil Business Profile Context (Kategori, Lokasi, Omset)
    Backend->>AI: POST /api/v1/ai/predict-rag (Query + Business Context)
    
    AI->>AI: Vectorize User Query
    AI->>VecDB: Similarity Search (Cosine Similarity top_k=5)
    VecDB-->>AI: Return Relevant Chunks (SOP Obsidian + Regulasi Terkait)
    
    AI->>AI: Construct Grounded Prompt (Query + System Prompt + Context + Profile)
    AI->>LLM: Stream / Generate Answer with Citation Rules
    LLM-->>AI: Generated Grounded Answer + Attributions
    
    AI-->>Backend: HTTP 200 (Answer, Source Documents, Citation List)
    Backend-->>Client: Render Response + Interactive Sources / References
    Client-->>User: Tampilkan Jawaban Bebas Halusinasi dengan Sumber Rujukan
    end
```

---

## 4. Rincian Peran Komponen Arsitektur

| Layer | Komponen Utama | Teknologi | Peran & Tanggung Jawab Utama |
| :--- | :--- | :--- | :--- |
| **Frontend Web** | Dashboard & Analytics UI | React 19, Vite, Tailwind CSS v4, Recharts | Menampilkan visualisasi omset BI, rekomendasi peluang, dan antarmuka AI Chat Assistant. |
| **Obsidian Integration** | APH YAH Obsidian Plugin | Markdown, TypeScript, Obsidian API | Menghubungkan vault catatan bisnis lokal pengguna secara langsung ke pipeline Knowledge Base RAG. |
| **Backend API** | Business & API Gateway | Node.js, Express, TypeScript, Zod | Mengelola autentikasi JWT, validasi request, logika BI, opportunity matching, serta orkestrasi endpoint. |
| **AI Microservice** | RAG Engine & Model Processor | Python, FastAPI, LangChain/LlamaIndex | Memproses ingesti markdown Obsidian, chunking, ekstraksi embedding, similarity search, dan generasi jawaban LLM. |
| **Database & Vector Store** | Relational & Vector DB | Supabase PostgreSQL + pgvector | Menyimpan data transaksi relational 17 tabel serta vektor embedding dokumen bisnis untuk pencarian pencocokan semantik. |

---

## 5. Fitur Unggulan Integrasi Obsidian dengan AI

1. **Seamless Markdown Knowledge Ingestion**: Catatan SOP, formula resep, daftar harga, dan dokumen strategi bisnis di Obsidian langsung dapat diindeks menjadi Knowledge Base AI.
2. **Context-Aware RAG**: Pertanyaan pengguna tidak hanya dijawab menggunakan LLM umum, melainkan dicocokkan terlebih dahulu dengan konteks catatan pribadi di Obsidian Vault dan profil usaha.
3. **Anti-Hallucination Guardrails**: Jawaban AI wajib memberikan atribut/sitasi (*Sources*) yang merujuk pada catatan Obsidian atau regulasi resmi.
4. **Bi-directional Knowledge Flow**:
   - **Push**: Catatan di Obsidian disinkronkan ke AI Knowledge Base.
   - **Query**: Obsidian Plugin dapat mengeksekusi AI Query langsung di dalam lingkungan editor Obsidian.
