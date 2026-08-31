# Skripsi Project

Repository setup for Skripsi. This project is structured as a monorepo containing a React + Vite + TypeScript frontend, an Express.js backend connecting to a Supabase database, and a Python FastAPI service for AI processing.

## Architecture Stack
- **Frontend**: Vite, React, TypeScript, TailwindCSS/CSS
- **Backend**: Node.js, Express.js (ES Modules syntax)
- **AI Services**: Python, FastAPI
- **Database / Auth / BaaS**: Supabase

## Project Structure

```text
Skripsi/
├── frontend/                # Vite React TS Frontend Application
│   ├── src/                 # Source components, pages, hooks, contexts
│   ├── package.json
│   └── README.md            # Detailed Frontend Documentation
│
├── backend/                 # Node.js + Express.js API
│   ├── src/                 # Controllers, Middlewares, Routes, Configs
│   ├── package.json
│   └── README.md            # Detailed Backend Documentation
│
├── ai-services/             # Python + FastAPI AI Microservice
│   ├── app/                 # FastAPI routes, models, configuration
│   ├── requirements.txt     # Python requirements file
│   └── README.md            # Detailed AI Services Documentation
│
├── .gitignore               # Multi-package root level Git Ignore rules
└── README.md                # This setup guide
```

---

## Getting Started

Follow these steps to set up and run both applications locally.

### 1. Clone & Access the Directory
```bash
git clone https://github.com/Couraa0/Skripsi.git
cd Skripsi
```

### 2. Database & Auth Setup (Supabase)
Ensure you have created a project on [Supabase](https://supabase.com). You will need:
- Project URL
- Project API Anon Key (Public Key)

---

### 3. Backend Setup
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install npm packages:
   ```bash
   npm install
   ```
3. Set up environment config:
   Create a `.env` file by copying the template:
   ```bash
   cp .env.example .env
   ```
   Add your credentials inside `.env`:
   ```env
   PORT=5000
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_public_key
   ```
4. Start development server:
   ```bash
   npm run dev
   ```
   The backend will be running at `http://localhost:5000`.

---

### 4. Frontend Setup
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install npm packages:
   ```bash
   npm install
   ```
3. Set up environment config:
   Create a `.env` file:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_public_key
   ```
4. Start development server:
   ```bash
   npm run dev
   ```
   The frontend application will be running at `http://localhost:5173`.

---

### 5. AI Services Setup (Python FastAPI)
1. Open a new terminal and navigate to the AI services folder:
   ```bash
   cd ai-services
   ```
2. Create and activate a virtual environment:
   - **On Windows (PowerShell):**
     ```powershell
     python -m venv venv
     .\venv\Scripts\Activate.ps1
     ```
   - **On Linux/macOS:**
     ```bash
     python -m venv venv
     source venv/bin/activate
     ```
3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Set up environment config:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
5. Run the FastAPI server:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```
   The interactive Swagger documentation will be available at `http://localhost:8000/docs`.

