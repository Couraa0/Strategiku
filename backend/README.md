# Skripsi - Backend Service

Backend service for Skripsi, built using **Node.js**, **Express.js**, and integrated with **Supabase** for database management and JWT authentication.

## Folder Structure

```text
backend/
├── src/
│   ├── config/
│   │   └── supabaseClient.js   # Supabase Client connection instance
│   ├── controllers/
│   │   └── authController.js   # Controllers containing endpoint route actions
│   ├── middlewares/
│   │   ├── authMiddleware.js   # Middleware for verifying JWT authorization header via Supabase
│   │   └── errorMiddleware.js  # Global centralized API error handling middleware
│   ├── routes/
│   │   ├── authRoutes.js       # Authentication & user profile endpoints
│   │   └── index.js            # Route coordinator (mounts all api/v1 routes)
│   ├── utils/
│   │   └── helpers.js          # Helper functions (e.g. response wrappers)
│   └── index.js                # App entrypoint and Express server starter
├── .env                        # Local secret configurations (ignored by git)
├── .env.example                # Blueprint for local configuration
├── .gitignore                  # Backend build and dependency ignores
├── package.json                # Project description and run scripts
└── README.md                   # This instruction file
```

## Setup Instructions

### 1. Prerequisites
Ensure you have **Node.js** (v18 or higher recommended) and **npm** installed.

### 2. Configuration (`.env`)
1. Duplicate `.env.example` to create `.env`:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and fill in the values:
   - `PORT`: Server port (defaults to `5000`)
   - `SUPABASE_URL`: Your Supabase Project API URL
   - `SUPABASE_ANON_KEY`: Your Supabase API public anonymous key

### 3. Installation
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

### 4. Running the App

#### Development Mode (with hot reloading):
```bash
npm run dev
```

#### Production Mode:
```bash
npm start
```
The server will run on `http://localhost:5000`.

## API Documentation

### Base Route
- `GET /` - Base health verification.

### API v1 (`/api/v1`)
- `GET /api/v1/auth/profile` (Protected) - Requires a `Bearer <token>` in the `Authorization` header. Resolves the user identity via Supabase Auth and returns profile data.
