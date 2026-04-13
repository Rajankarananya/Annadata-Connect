# 🚀 **Setup & Installation Guide**

Complete setup instructions for Annadata Connect.

---

## **System Requirements**

- Python 3.11+
- Node.js 18+
- PostgreSQL 15+
- Ollama (for local LLM)
- 4GB RAM minimum
- 10GB disk space

---

## **Installation Steps**

### **1. Clone Repository**

```bash
git clone https://github.com/Rajankarananya/Annadata-Connect.git
cd Annadata-Connect
```

---

### **2. Setup Environment File**

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# ==========================================
# Backend Configuration
# ==========================================
BACKEND_HOST=0.0.0.0
BACKEND_PORT=8000
DEBUG=True

# ==========================================
# Database
# ==========================================
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_secure_password
POSTGRES_DB=agri_db
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
DATABASE_URL=postgresql+asyncpg://postgres:your_secure_password@localhost:5432/agri_db

# ==========================================
# JWT Authentication
# ==========================================
SECRET_KEY=your-secret-key-here
JWT_SECRET_KEY=your-jwt-secret-key
JWT_ALGORITHM=HS256
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=30

# ==========================================
# LLM Configuration (Ollama)
# ==========================================
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3
OLLAMA_TEMPERATURE=0.2
OLLAMA_NUM_CTX=4096

# ==========================================
# RAG Configuration (ChromaDB)
# ==========================================
CHROMA_PERSIST_DIRECTORY=./chroma_db
RAG_COLLECTION_NAME=annadata_connect_docs
RAG_CHUNK_SIZE=1000
RAG_CHUNK_OVERLAP=200
RAG_TOP_K=4

# ==========================================
# Translation & API
# ==========================================
OPEN_METEO_BASE_URL=https://api.open-meteo.com/v1

# ==========================================
# Frontend Configuration
# ==========================================
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_DEFAULT_LANGUAGE=en
```

---

### **3. Backend Setup**

#### **3.1 Install Python Dependencies**

```bash
cd backend
pip install -r requirements.txt
```

#### **3.2 Setup Database**

Make sure PostgreSQL is running:

```bash
# Check PostgreSQL status
psql -U postgres -c "SELECT 1"
# Should return: 1
```

Run migrations:

```bash
cd backend
alembic upgrade head
# Creates all tables: users, farmers, claims, grievances, audit_logs, etc.
cd ..
```

#### **3.3 (Optional) Seed Database with Test Data**

```bash
cd backend
python seed.py
# Creates 10 farmers, 20 claims, 5 grievances for demo
cd ..
```

---

### **4. Frontend Setup**

```bash
npm install
# Installs all React dependencies
```

---

### **5. Prepare Chat RAG** (Optional but Recommended)

To enable the chat RAG pipeline for government scheme PDFs:

```bash
# Create schemes folder
mkdir schemes

# Place PDF files in ./schemes/ folder
# (government scheme documents, policy files, etc.)

# Ingest PDFs into ChromaDB
python ingest.py
# Creates ./chroma_db with vector embeddings
```

---

### **6. Ollama Setup**

Make sure Ollama is installed and running:

```bash
# Check if Ollama is running
curl http://localhost:11434
# Should return: "Ollama is running"

# If not installed, download from: https://ollama.ai

# Pull llama3 model (first time only, ~4GB):
ollama pull llama3

# Start Ollama
ollama serve
```

---

## **Running the Project**

### **Option A: Manual Start (3 Terminals)**

**Terminal 1 - Backend:**
```bash
cd backend
python main.py
# Should see: Uvicorn running on http://0.0.0.0:8000
```

**Terminal 2 - Frontend:**
```bash
npm run dev
# Should see: VITE v8.0.2 ready in XXX ms ... Local: http://localhost:5173
```

**Terminal 3 - Ollama:**
```bash
ollama serve
# Should see: Listening on 127.0.0.1:11434
```

### **Option B: Docker Compose (One Command)**

```bash
docker-compose up -d
# Starts PostgreSQL, Ollama, and Backend containers
npm run dev  # Still run frontend manually
```

---

## **Verification Checklist**

Before using the app, verify all services:

```bash
# 1. Backend Health
curl http://localhost:8000
# Expected: {"status": "ok", "message": "Annadata Connect API is running"}

# 2. API Documentation
open http://localhost:8000/docs
# Should show Swagger UI with all endpoints

# 3. Database Connection
psql -U postgres -d agri_db -c "\dt"
# Should list: users, farmers, claims, grievances, land, audit_logs

# 4. Ollama Check
curl http://localhost:11434
# Expected: "Ollama is running"

# 5. Frontend Load
open http://localhost:5173
# Should show landing page with language selector
# Check browser console (F12) for any errors
```

---

## **Default Login Credentials** (if seeded)

```
Email: farmer@test.com
Password: test123
Role: farmer
```

---

## **Troubleshooting**

### **Port Already in Use**

```bash
# Kill process on port
npx fkill 8000  # Backend
npx fkill 5173  # Frontend
npx fkill 11434 # Ollama
```

### **Database Connection Error**

```bash
# Check PostgreSQL is running
psql -U postgres -c "SELECT 1"

# If not, restart PostgreSQL
sudo service postgresql restart

# Reset migrations if needed
cd backend
alembic downgrade base
alembic upgrade head
cd ..
```

### **LLM Timeout**

```bash
# LLM is slow first request (30+ seconds is normal)
# Check Ollama log or restart:
killall ollama
ollama serve
```

### **Frontend Can't Connect to Backend**

```bash
# Check VITE_API_BASE_URL in .env
# Should be: http://localhost:8000/api/v1

# Check backend is running on port 8000
curl http://localhost:8000

# Check browser CORS error in console
```

### **Build Errors**

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## **Project Structure**

```
Annadata-Connect/
├── backend/                    ← FastAPI backend
│   ├── app/
│   │   ├── models/            ← Database ORM
│   │   ├── routes/            ← API endpoints
│   │   ├── schemas/           ← Pydantic validation
│   │   ├── services/          ← Business logic
│   │   └── utils/             ← Helpers
│   ├── alembic/               ← Database migrations
│   └── main.py                ← FastAPI app
├── src/                       ← React frontend
│   ├── features/
│   │   ├── farmer/            ← Farmer pages
│   │   ├── admin/             ← Admin pages
│   │   └── public/            ← Public pages
│   ├── components/            ← Reusable components
│   ├── services/api/          ← API layer
│   └── App.jsx                ← Main app
├── ml/                        ← ML module
│   ├── api/main.py            ← ML FastAPI
│   └── utils/                 ← EXIF, fraud detection
├── public/                    ← Static files + PWA
├── .env.example               ← Configuration template
├── docker-compose.yml         ← Docker setup
├── package.json               ← Frontend dependencies
└── README.md                  ← This file
```

---

## **Development Commands**

```bash
# Backend
python main.py                 # Run development server
cd backend && alembic init .   # Initialize migrations

# Frontend
npm run dev                    # Development server
npm run build                  # Production build
npm run lint                   # ESLint check
npm run preview               # Preview build

# Database
psql -U postgres -d agri_db   # Connect to database
alembic upgrade head          # Run all migrations
alembic downgrade base        # Revert to empty db

# ML/Ingest
python ingest.py              # Ingest PDFs to ChromaDB
ollama pull llama3            # Download model
```

---

## **Environment Variables Quick Reference**

| Variable | Purpose | Example |
|----------|---------|---------|
| `BACKEND_PORT` | Backend server port | 8000 |
| `DATABASE_URL` | PostgreSQL connection | postgresql+asyncpg://user:pass@localhost/db |
| `JWT_SECRET_KEY` | JWT signing key | your-secret-key |
| `OLLAMA_BASE_URL` | Ollama server URL | http://localhost:11434 |
| `VITE_API_BASE_URL` | Frontend API URL | http://localhost:8000/api/v1 |

---

## **Next Steps**

1. Complete setup above
2. Run following the "Running the Project" section
3. See [API.md](API.md) for API documentation
4. See [ARCHITECTURE.md](ARCHITECTURE.md) for system design
5. Open http://localhost:5173 to use the app

---

## **Support**

For issues, check:
- Browser console (F12) for frontend errors
- Backend log output
- `psql` for database issues
- `ollama` logs for LLM issues

---

## **Next: API Documentation**

See [API.md](API.md) for complete API endpoint documentation.
