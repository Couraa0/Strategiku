# Skripsi - AI Services

AI microservice for Skripsi, built using **Python** and **FastAPI** to handle machine learning model loading and predictions.

## Folder Structure

```text
ai-services/
├── app/
│   ├── api/
│   │   ├── endpoints/
│   │   │   └── predict.py    # Predict route logic wrapper
│   │   └── router.py         # Registers endpoints to main API router
│   ├── core/
│   │   └── config.py         # App configuration management (Pydantic)
│   ├── services/
│   │   └── model.py          # Machine learning model loaders & services
│   └── main.py               # Main FastAPI entry point and server setup
├── .env                      # Local env secrets (ignored by git)
├── .env.example              # Blueprint configuration file
├── .gitignore                # Git ignored Python patterns
├── requirements.txt          # Python virtual environment dependencies
└── README.md                 # This file
```

## Setup Instructions

### 1. Prerequisites
- Python 3.9 or higher
- `pip` package manager
- (Optional but recommended) Virtual Environment (`venv`)

### 2. Configure Environment (`.env`)
1. Duplicate `.env.example` as `.env`:
   ```bash
   cp .env.example .env
   ```
2. Adjust configuration parameters if necessary.

### 3. Create Virtual Environment & Install Dependencies
1. Create a virtual environment:
   ```bash
   python -m venv venv
   ```
2. Activate the virtual environment:
   - **On Windows (PowerShell):**
     ```powershell
     .\venv\Scripts\Activate.ps1
     ```
   - **On Windows (CMD):**
     ```cmd
     .\venv\Scripts\activate.bat
     ```
   - **On Linux/macOS:**
     ```bash
     source venv/bin/activate
     ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### 4. Running the Application
Run the FastAPI development server:
```bash
uvicorn app.main:app --reload --port 8000
```
The documentation will be available interactively at `http://localhost:8000/docs`.

## API Endpoints
- `GET /` - Server status healthcheck.
- `POST /api/v1/ai/predict` - Accepts input parameters and outputs machine learning predictions.
