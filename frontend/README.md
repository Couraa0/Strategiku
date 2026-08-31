# Skripsi - Frontend Application

Frontend project for Skripsi, built using **Vite**, **React**, and **TypeScript**, integrated with **Supabase Auth**.

## Folder Structure

```text
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── common/
│   │   │   └── Button.tsx  # Custom Button component with loading state
│   │   └── layout/
│   │       └── Navbar.tsx  # Application Header/Navigation bar
│   ├── context/
│   │   └── AuthContext.tsx # Supabase Session Context & Auth Provider
│   ├── hooks/
│   │   └── useAuth.ts      # Custom hook to consume AuthContext
│   ├── pages/
│   │   ├── Home.tsx        # Landing Page
│   │   ├── Login.tsx       # Auth Form (Email & Password)
│   │   └── Dashboard.tsx   # Authenticated user view
│   ├── routes/
│   │   └── AppRoutes.tsx   # Client-side router path setup
│   ├── services/
│   │   └── supabaseClient.ts # Supabase Browser client initialization
│   ├── types/
│   │   └── index.ts        # TypeScript typings and interfaces
│   ├── utils/
│   │   └── helpers.ts      # Custom frontend utility functions
│   ├── App.css             # Main styling
│   ├── App.tsx             # Root Component with Provider mapping
│   ├── index.css           # Global reset & utility styles
│   └── main.tsx            # DOM Mounting point
├── index.html              # HTML Root Document
├── package.json            # Scripts & frontend dependencies
├── tsconfig.json           # TypeScript main config
└── vite.config.ts          # Vite configuration
```

## Setup Instructions

### 1. Prerequisites
Ensure you have **Node.js** (v18 or higher recommended) and **npm** installed.

### 2. Configuration (`.env`)
1. Create a `.env` file in the `frontend` root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_public_key
   ```
2. Replace the values with your actual Supabase Project API credentials.

### 3. Installation
Navigate to the frontend directory and install dependencies:
```bash
cd frontend
npm install
```

### 4. Development Server
Run the application in local development mode:
```bash
npm run dev
```
By default, the application runs on `http://localhost:5173`.

### 5. Build & Deployment
Build optimized assets for production:
```bash
npm run build
```
This builds static assets into the `dist/` folder.

To preview your production build locally:
```bash
npm run preview
```
