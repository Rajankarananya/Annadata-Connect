# 🌾 **Annadata Connect**

Agricultural admin web application for Indian farmers with AI-powered crop damage detection, multilingual chatbot, and weather risk assessment.

---

## ✨ **Features**

### 🤖 **AI & ML**
- **Multilingual Chatbot** (EN/HI/MR) - LLaMA 3 + RAG for government scheme guidance
- **Crop Damage Detection** - EfficientNet-B0 real-time analysis
- **Fraud Detection** - GPS validation & EXIF metadata extraction

### 📱 **Farmer Dashboard**
- Crop damage claim submission with image upload
- Real-time weather risk assessment (flood/drought)
- Insurance claim tracking & status updates
- Grievance submission & tracking

### 👨‍💼 **Admin Panel**
- Claims queue with approval workflow
- Multi-language grievance routing
- Analytics dashboard with heatmaps
- Audit logs for compliance

### 🌐 **Platform Features**
- PWA with offline support
- JWT authentication with role-based access (farmer/field_officer/admin)
- PostgreSQL + PostGIS for geospatial queries
- Real-time multilingual translations

---

## 🏗️ **Architecture**

```
Frontend (React + Vite)          → http://localhost:5173
        ↓
API Service Layer (Axios)
        ↓
Backend (FastAPI + SQLAlchemy)   → http://localhost:8000
        ├── /api/v1/auth         (JWT authentication)
        ├── /api/v1/farmers      (CRUD profiles)
        ├── /api/v1/claims       (Damage claims with audit logs)
        ├── /api/v1/grievances   (Support tickets)
        ├── /api/v1/chat         (Multilingual LLM)
        ├── /api/v1/weather      (Risk scoring)
        └── /api/v1/analyze      (ML damage detection)
        ↓
Database (PostgreSQL + PostGIS)
LLM (Ollama - LLaMA 3)
Vector DB (ChromaDB - RAG)
```

---

## 🚀 **Quick Start**

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL 15+
- Ollama (for local LLM)

### Installation

**1. Clone & Setup**
```bash
git clone https://github.com/Rajankarananya/Annadata-Connect.git
cd Annadata-Connect
cp .env.example .env
```

**2. Backend Setup**
```bash
cd backend
pip install -r requirements.txt
alembic upgrade head  # Run database migrations
cd ..
```

**3. Frontend Setup**
```bash
npm install
```

**4. Ingest PDFs for Chat RAG** (Optional)
```bash
# Add scheme PDFs to ./schemes folder
python ingest.py
```

---

## 📖 **Running the Project**

Open 3 terminals:

**Terminal 1 - Backend**
```bash
python main.py
# Runs on http://localhost:8000
```

**Terminal 2 - Frontend**
```bash
npm run dev
# Runs on http://localhost:5173
```

**Terminal 3 - Ollama** (if not already running)
```bash
ollama serve
# Runs on http://localhost:11434
```

---

## 📚 **Documentation**

- **[SETUP.md](SETUP.md)** - Detailed installation & configuration
- **[API.md](API.md)** - Complete API endpoint documentation
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System design & components

---

## 🎯 **Technology Stack**

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 18, Vite, Tailwind CSS | UI with Material Design 3 |
| **Backend** | FastAPI, SQLAlchemy, Alembic | REST API with async support |
| **Database** | PostgreSQL 15, PostGIS | Relational + geospatial queries |
| **ML** | TensorFlow Lite, EfficientNet-B0 | Crop damage classification |
| **LLM** | Ollama (LLaMA 3), LangChain | Local language model + RAG |
| **Translation** | Google Translate (deep-translator) | Multilingual support |
| **Weather** | Open-Meteo API | Real-time risk assessment |
| **Auth** | JWT, Bcrypt | Secure authentication |

---

## 🔐 **Security**

- ✅ JWT token-based authentication (30-min expiry)
- ✅ Role-based access control (farmer/field_officer/admin)
- ✅ Password hashing with bcrypt
- ✅ Audit logs for all data changes
- ✅ CORS configured for frontend only
- ✅ SQL injection prevention via SQLAlchemy ORM

---

## 🧪 **Testing**

**Verify Installation**
```bash
# Backend health
curl http://localhost:8000

# Chat endpoint
curl "http://localhost:8000/api/v1/chat/multilingual?query=hello&lang=en"

# API docs
open http://localhost:8000/docs
```

---

## 📊 **API Endpoints Summary**

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/v1/auth/register` | Create farmer account |
| POST | `/api/v1/auth/login` | Authenticate user |
| POST | `/api/v1/claims` | Submit crop damage claim |
| GET | `/api/v1/claims/{id}` | Get claim details |
| PATCH | `/api/v1/claims/{id}/status` | Update claim status (admin) |
| POST | `/api/v1/grievances` | Submit grievance |
| POST | `/api/v1/analyze` | ML damage detection |
| POST | `/api/v1/chat/multilingual` | Multilingual chatbot |
| GET | `/api/v1/weather/risk` | Weather risk assessment |

See [API.md](API.md) for complete documentation.

---

## 🎨 **UI Pages**

### Public
- Landing page with language selector
- User registration
- User login

### Farmer
- Dashboard with weather widget & recent activity
- AI Advisor chatbot (multilingual)
- New claim form with image upload
- My claims list
- Grievances submission
- Profile management

### Admin
- Claims queue & review page
- Grievances queue
- Analytics dashboard
- Settings & reports

---

## 🐳 **Docker Setup** (Optional)

```bash
docker-compose up -d
# Starts: PostgreSQL, Backend, Ollama
```

---
## 🤝 **Contributing**

This is a group project with contributions from:
- **Dev A**: ML/AI (EfficientNet, EXIF, Fraud detection)
- **Dev B**: Backend (Auth, CRUD, JWT, Audit logs)
- **Dev C**: Frontend (React UI, Internationalization)
- **Dev D**: Integration (Chat LLM, Weather API, MLOps)

---

## 📧 **Contact**

Project Member 1: Ananya  Rajankar
Email: ananyasocialuse@gmail.com || ananya.rajanakr23@pccoepune.org
GitHub: https://github.com/Rajankarananya/Annadata-Connect

Project Member 2: Shruti Jaggi
Email: shruti.jaggo23@pcoepune.org 
GitHub:  https://github.com/Shruti1724/Annadata-Connect

Project Member 3: Vaidavi Naik
Email: vaidavink2005@gmail.com || vaidavi.naik23@pccoepune.org
GitHub: https://github.com/VaidaviNaik/Annadata-Connect

Project Member 4: Shruti Mahadik
Email: shruti.mahadik23@pccoepune.org
GitHub: https://github.com/Shrutim47/Annadata-Connect

---

## 📜 **License**

MIT License

---

## 🎯 **For Reviewers**

1. See **[SETUP.md](SETUP.md)** for installation instructions
2. See **[API.md](API.md)** for API endpoint testing
3. See **[ARCHITECTURE.md](ARCHITECTURE.md)** for system design
4. Live demo: http://localhost:5173 (after setup)
