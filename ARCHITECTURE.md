# 🏗️ **System Architecture**

Comprehensive overview of Annadata Connect's system design, components, and data flow.

---

## **System Overview**

Annadata Connect is a **full-stack agricultural web application** with:
- **Frontend**: React 18 + Vite single-page application (PWA)
- **Backend**: FastAPI async REST API with PostgreSQL
- **ML Module**: EfficientNet-B0 crop damage detection
- **LLM Service**: Ollama (LLaMA 3) with RAG pipeline
- **Database**: PostgreSQL + PostGIS for geospatial queries

---

## **Architecture Diagram**

```
┌─────────────────────────────────────────────────────────────────────┐
│                         END USER DEVICE                              │
│                    (Browser / Mobile Web)                            │
└───────────────────────────┬─────────────────────────────────────────┘
                            │
                    ┌───────▼────────┐
                    │ Service Worker │◄────── PWA Offline Support
                    │  (Cache First  │
                    │   API Cache)   │
                    └───────┬────────┘
                            │
┌───────────────────────────▼─────────────────────────────────────────┐
│                    FRONTEND (React 18 + Vite)                        │
├─────────────────────────────────────────────────────────────────────┤
│ ┌─ Core Pages ─────────────┐  ┌─ State Management ───────────────┐  │
│ │ • Dashboard               │  │ • AuthContext (JWT tokens)       │  │
│ │ • New Claim Form          │  │ • i18n Store (EN/HI/MR)          │  │
│ │ • My Claims               │  │ • API Error handling             │  │
│ │ • Grievances              │  │ • useApi custom hooks            │  │
│ │ • AI Advisor (Chatbot)    │  │                                  │  │
│ │ • Weather Widget          │  │                                  │  │
│ └───────────────────────────┘  └──────────────────────────────────┘  │
│                                                                       │
│ ┌─ API Service Layer ───────────────────────────────────────────┐   │
│ │ • apiClient (Axios instance with auth interceptor)           │   │
│ │ • Services: chatApi, weatherApi, claimsApi, authApi, etc.    │   │
│ │ • Retry logic + error handling for network failures          │   │
│ └───────────────────────────────────────────────────────────────┘   │
│                                                                       │
│ ┌─ UI Components (Tailwind CSS + Material Design 3) ───────────┐   │
│ │ • FarmerTopNav, FarmerSidebar, FarmerBottomNav               │   │
│ │ • Form components (inputs, date pickers, file uploads)       │   │
│ │ • Modal dialogs, notifications, loading states               │   │
│ └───────────────────────────────────────────────────────────────┘   │
└───────────────────────────┬─────────────────────────────────────────┘
                            │ HTTPS / REST API
                    ┌───────▼────────────────┐
                    │  CORS Proxy/Gateway    │◄─── Localhost:5173 allowed
                    │  (API Base URL)        │
                    └───────┬────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────────────┐
│                    BACKEND (FastAPI + SQLAlchemy)                    │
│                        Localhost:8000                                 │
├─────────────────────────────────────────────────────────────────────┤
│ ┌─ Router Layer ────────────────────────────────────────────────┐   │
│ │ • /api/v1/auth (register, login)                            │   │
│ │ • /api/v1/farmers (GET /me, PUT /me)                        │   │
│ │ • /api/v1/claims (POST, GET, PATCH status)                  │   │
│ │ • /api/v1/grievances (POST, GET)                            │   │
│ │ • /api/v1/chat/multilingual (query, lang params)            │   │
│ │ • /api/v1/weather/risk (lat, long params)                   │   │
│ │ • /api/v1/analyze (image upload for ML)                     │   │
│ └───────────────────────────────────────────────────────────────┘   │
│                                                                       │
│ ┌─ Service Layer ────────────────────────────────────────────────┐   │
│ │ • AuthService: JWT generation, password hashing (bcrypt)    │   │
│ │ • ClaimService: Orchestrates claim processing, audit logging │   │
│ │ • ChatService: RAG pipeline, LLM calls, translation          │   │
│ │ • WeatherService: External API calls (Open-Meteo)           │   │
│ │ • MLService: Calls ML module for damage detection           │   │
│ └───────────────────────────────────────────────────────────────┘   │
│                                                                       │
│ ┌─ Data Access Layer ────────────────────────────────────────────┐   │
│ │ • ORM Models: User, Farmer, Claim, Grievance, AuditLog       │   │
│ │ • Pydantic Schemas: Request/response validation              │   │
│ │ • Database transactions, connection pooling                  │   │
│ └───────────────────────────────────────────────────────────────┘   │
│                                                                       │
│ ┌─ Middleware ───────────────────────────────────────────────────┐   │
│ │ • JWT Auth middleware (token validation, role checking)      │   │
│ │ • CORS middleware (allows frontend origin)                   │   │
│ │ • Error handling middleware (standardized responses)         │   │
│ └───────────────────────────────────────────────────────────────┘   │
└───────────┬──────────────────────┬──────────────────┬────────────────┘
            │                      │                  │
    ┌───────▼──────────┐   ┌──────▼─────────┐   ┌───▼─────────────┐
    │ PostgreSQL DB    │   │ LLM Service    │   │ ML Module       │
    │ + PostGIS        │   │ (Ollama)       │   │ (Python/TF)     │
    │ Localhost:5432   │   │ Localhost:     │   │ Localhost:      │
    │                  │   │ 11434          │   │ 8001 (optional) │
    │ Tables:          │   │                │   │                 │
    │ • users          │   │ Model:         │   │ Model:          │
    │ • farmers        │   │ llama3 (4GB)   │   │ EfficientNet-B0 │
    │ • claims         │   │                │   │                 │
    │ • grievances     │   │ Stack:         │   │ Features:       │
    │ • land           │   │ • LangChain    │   │ • Damage class  │
    │ • audit_logs     │   │ • ChromaDB     │   │ • Confidence    │
    │                  │   │ • Sentence     │   │ • EXIF extract  │
    │ Indexes on:      │   │   Transformers │   │ • Fraud check   │
    │ • user_id        │   │                │   │ • GPS validation│
    │ • email          │   │ Capabilities:  │   │                 │
    │ • claim_status   │   │ • Multi-lang   │   │ Output:         │
    │ • location       │   │ • RAG pipeline │   │ • damage_level  │
    │ (GIS)            │   │ • Context      │   │ • recommendations
    │                  │   │   awareness    │   │                 │
    └──────────────────┘   └────────────────┘   └─────────────────┘
                                   │
                    ┌──────────────▼─────────────┐
                    │ External Services          │
                    ├────────────────────────────┤
                    │ • Open-Meteo API           │
                    │   (Weather & rainfall)     │
                    │                            │
                    │ • Google Translate API     │
                    │   (Multilingual fallback)  │
                    │                            │
                    │ • Bhashini (planned)       │
                    │   (Indian language NLP)    │
                    └────────────────────────────┘
```

---

## **Data Flow - Key Scenarios**

### **1. Farmer Submits Crop Damage Claim**

```
Farmer (Browser)
       │
       ├─► 1. Fill form (crop type, damage %, image)
       │
       ├─► 2. Click "Submit Claim"
       │
       └─► 3. HTTP POST /api/v1/claims (multipart/form-data)
               │
               ├─► Backend Claim Router receives request
               │   • Validates JWT token
               │   • Checks user is 'farmer' role
               │   • Validates form data (Pydantic schemas)
               │
               ├─► ClaimService.create_claim()
               │   • Saves file to disk
               │   • Creates Claim record in DB
               │   • Calls MLService for damage analysis
               │
               ├─► MLService.analyze_damage()
               │   • Sends image to ML Module
               │   • Gets damage_class, confidence, EXIF data
               │   • Performs fraud detection (GPS validation)
               │
               ├─► Backend stores:
               │   • claim_id, crop_type, damage_percentage, status
               │   • image_url, ml_analysis result, gps_coords
               │   • Creates entry in audit_logs table
               │
               └─► 4. HTTP 201 Response
                   { claim_id, status: "pending", ml_analysis {...} }

Field Officer (Admin Dashboard)
       │
       ├─► Receives notification
       │   GET /api/v1/claims (all pending)
       │
       ├─► Reviews damage analysis
       │   GET /api/v1/claims/{claim_id}
       │   Shows farmer info, image + ML confidence
       │
       ├─► Approves or rejects
       │   PATCH /api/v1/claims/{claim_id}/status
       │   { status: "approved", approved_amount: 5000 }
       │
       └─► Backend updates:
           • claim.status = "approved"
           • claim.approved_amount = 5000
           • audit_log entry with field_officer_id + timestamp
```

---

### **2. Farmer Chats with AI Advisor**

```
Farmer (ChatbotPage.jsx)
       │
       ├─► User types question in hindi: "बीमा क्या है?"
       │
       ├─► Select language: "हिंदी"
       │
       └─► HTTP POST /api/v1/chat/multilingual
              ?query=बीमा%20क्या%20है&lang=hi
               │
               ├─► Backend ChatRouter.multilingual()
               │   • Validates query language
               │   • Sets response language = 'hi'
               │
               ├─► ChatService.process_query()
               │   │
               │   ├─► RAG Pipeline Lookup
               │   │   • Split query into chunks
               │   │   • Convert to embeddings (SentenceTransformers)
               │   │   • Search ChromaDB for similar docs
               │   │   • Retrieve top-4 documents (government schemes)
               │   │
               │   ├─► If docs found → Build context prompt
               │   │   Else → Direct LLM query
               │   │
               │   ├─► LLM Call (Ollama - llama3)
               │   │   Prompt:
               │   │   "You are an AI advisor for Indian farmers.
               │   │    Context: [RAG docs with scheme info]
               │   │    Question: [User query in hindi]
               │   │    Answer in Hindi:"
               │   │
               │   ├─► Ollama returns response in hindi
               │   │   (if LLM understands input language)
               │   │
               │   └─► Translation (if needed)
               │       • Detect response language
               │       • Translate to requested lang (if different)
               │       • Using deep-translator (Google Translate API)
               │
               └─► HTTP 200 Response
                   {
                     "response": "फसल बीमा एक वित्तीय उत्पाद है...",
                     "lang": "hi",
                     "timestamp": "2026-04-13T16:00:00Z"
                   }

Frontend receives response → Display in chat bubble
```

---

### **3. Check Weather Risk for District**

```
FarmerDashboard.jsx (useEffect on mount)
       │
       └─► Detect user location
           • Use browser Geolocation API OR
           • Use stored farmer GPS coordinates
           │
           └─► HTTP GET /api/v1/weather/risk
                  ?latitude=29.1965&longitude=75.7345
                  │
                  ├─► Backend WeatherRouter.get_risk()
                  │   
                  ├─► WeatherService.calculate_risk()
                  │   • Call Open-Meteo API for rainfall data
                  │     URL: https://api.open-meteo.com/v1/forecast
                  │     ?latitude=29.1965&longitude=75.7345
                  │     &current=rainfall,temperature,relative_humidity
                  │   
                  │   • Receive: rainfall (mm), temp, humidity, etc.
                  │   
                  │   • Compute risk scores:
                  │     flood_risk = rainfall * 2 + humidity_factor
                  │     drought_risk = (100 - rainfall) * 0.5
                  │   
                  │   • Return risk percentages + advisory
                  │
                  └─► HTTP 200 Response
                      {
                        "flood_risk": 35,
                        "drought_risk": 15,
                        "rainfall": 2.5,
                        "temperature": 28.5,
                        "advisory": "Moderate flood risk..."
                      }

Frontend receives → Update Weather Widget
```

---

## **Component Hierarchy**

### **Frontend React Components**

```
App.jsx (Root)
  ├─── Layout Wrapper
  │    ├─── FarmerTopNav
  │    │    ├─ Language selector (EN/HI/मराठी)
  │    │    ├─ User menu
  │    │    └─ Logout button
  │    │
  │    ├─── FarmerSidebar
  │    │    ├─ Navigation links
  │    │    ├─ Active route indicator
  │    │    └─ Settings
  │    │
  │    ├─── Page Content
  │    │    ├─ FarmerDashboardPage
  │    │    │  ├─ Weather widget
  │    │    │  ├─ Recent activity
  │    │    │  └─ Quick actions
  │    │    │
  │    │    ├─ ChatbotPage
  │    │    │  ├─ Message list
  │    │    │  ├─ Quick prompts
  │    │    │  ├─ Input textarea
  │    │    │  └─ Copy/Clear buttons
  │    │    │
  │    │    ├─ NewClaimPage
  │    │    │  ├─ Crop type selector
  │    │    │  ├─ Damage percentage input
  │    │    │  ├─ File upload
  │    │    │  └─ GPS coordinates
  │    │    │
  │    │    ├─ MyClaimsPage
  │    │    │  ├─ Claims table/list
  │    │    │  ├─ Status badge
  │    │    │  ├─ Pagination
  │    │    │  └─ Detail modal
  │    │    │
  │    │    └─ GrievancesPage
  │    │       ├─ Grievance form
  │    │       ├─ Submitted grievances list
  │    │       └─ Status tracking
  │    │
  │    └─── FarmerBottomNav
  │         └─ Mobile navigation tabs
  │
  └─── Service Worker
       ├─ Offline cache management
       ├─ Static asset caching
       └─ API fallback responses
```

---

## **Database Schema**

```sql
-- Users & Authentication
users
├─ user_id (PK) - UUID
├─ email (UQ) - String
├─ password_hash - String (bcrypt)
├─ full_name - String
├─ phone - String
├─ role - Enum[farmer, field_officer, admin]
├─ created_at - DateTime
└─ updated_at - DateTime

-- Farmer Profiles
farmers
├─ farmer_id (PK) - UUID
├─ user_id (FK) - UUID
├─ district - String
├─ village - String
├─ total_land_area - Float
├─ primary_crops - JSONArray
└─ created_at - DateTime

-- Land Information
land
├─ land_id (PK) - UUID
├─ farmer_id (FK) - UUID
├─ location - Point (PostGIS)  ◄─── Geospatial
├─ area_hectares - Float
├─ soil_type - String
├─ irrigated - Boolean
└─ created_at - DateTime

-- Crop Insurance Claims
claims
├─ claim_id (PK) - UUID
├─ farmer_id (FK) - UUID
├─ crop_type - String
├─ damage_type - String
├─ affected_area - Float
├─ damage_percentage - Int (0-100)
├─ image_url - String
├─ status - Enum[pending, approved, rejected, processing]
├─ approved_amount - Decimal (nullable)
├─ approved_by - UUID (FK - user, nullable)
├─ ml_analysis - JSON
│  ├─ damage_class: String
│  ├─ confidence: Float
│  ├─ damage_level: String
│  └─ exif_metadata: Object
├─ fraud_check - JSON
├─ gps_latitude - Float
├─ gps_longitude - Float
├─ created_at - DateTime
├─ updated_at - DateTime
└─ Index: (farmer_id, status, created_at)

-- Grievances/Support Tickets
grievances
├─ grievance_id (PK) - UUID
├─ farmer_id (FK) - UUID
├─ title - String
├─ description - Text
├─ category - String
├─ status - Enum[open, in_progress, resolved]
├─ priority - Enum[low, medium, high]
├─ assigned_to - UUID (FK - user, nullable)
├─ resolved_at - DateTime (nullable)
├─ resolution_notes - Text (nullable)
├─ created_at - DateTime
└─ updated_at - DateTime

-- Audit Logs (Compliance)
audit_logs
├─ log_id (PK) - UUID
├─ user_id (FK) - UUID
├─ action - String (CREATE, UPDATE, DELETE, APPROVE)
├─ entity_type - String (claim, grievance, user)
├─ entity_id - UUID
├─ old_values - JSON (nullable)
├─ new_values - JSON (nullable)
├─ timestamp - DateTime
└─ Index: (user_id, entity_type, timestamp)
```

---

## **Technology Stack Justification**

| Technology | Choice | Why |
|-----------|--------|-----|
| **Frontend** | React 18 + Vite | Fast development + hot reload, ecosystem maturity, Tailwind CSS for styling |
| **Backend** | FastAPI | Async performance, auto API docs (Swagger), fast development, Python ecosystem |
| **Database** | PostgreSQL 15 | Strong ACID guarantees, PostGIS for geospatial queries, superior JSON support |
| **ORM** | SQLAlchemy | Type hints, async support, migration tool (Alembic), prevent SQL injection |
| **LLM** | Ollama (llama3) | Local inference (privacy), no API costs, offline capable, runs on modest hardware |
| **RAG** | LangChain + ChromaDB | Production-ready vector DB, seamless LLM integration, document chunking |
| **ML** | TensorFlow Lite + EfficientNet-B0 | Efficient inference, mobile-friendly model size, proven agriculture use cases |
| **Auth** | JWT + Bcrypt | Stateless auth, role-based access, industry standard, secure password hashing |
| **Translation** | Google Translate API | Reliable, supports rural Indian languages (Hindi, Marathi, Kannada) |
| **Weather** | Open-Meteo | Free, open-source, no API key required, no rate limiting on free tier |
| **PWA** | Service Worker | Offline support critical for rural connectivity, cache-first strategy |

---

## **Security Architecture**

### **Authentication Flow**

```
User Login (Email + Password)
       │
       └─► POST /auth/login
           • Verify email exists
           • Check password vs bcrypt hash
           • Generate JWT token (HS256, 30-min expiry)
           • Return token + user info
       
User makes API request with token
       │
       └─► Header: Authorization: Bearer <token>
           │
           ├─► JWT middleware validates:
           │   • Token signature (using SECRET_KEY)
           │   • Token not expired
           │   • Token not revoked
           │
           └─► Extract user_id + role
               • Pass to route handler
               • Check role permissions
               • Proceed if authorized
```

### **Authorization Levels**

```
farmer:
  • GET /farmers/me (own profile only)
  • POST /claims (create own)
  • GET /claims/me (own claims)
  • POST /grievances (create own)
  • POST /chat (access chatbot)

field_officer:
  • GET /claims (all pending)
  • PATCH /claims/{id}/status (approve/reject)
  • GET /grievances (assigned grievances)

admin:
  • Full access to all endpoints
  • GET /audit-logs (compliance)
  • DELETE /users (user management)
```

### **Data Protection**

- **Passwords**: Bcrypt hashing (12 rounds)
- **API Communication**: HTTPS only in production
- **SQL Injection**: Parameterized queries via SQLAlchemy ORM
- **XSS Prevention**: React escapes HTML by default
- **CORS**: Whitelist frontend origin only
- **Audit Logging**: All claim approvals + data changes logged
- **File Upload**: Validate file type + size, store outside web root

---

## **Deployment Architecture** (Recommended)

```
┌─────────────────────────────────────────────┐
│         AWS / Google Cloud / Azure          │
├─────────────────────────────────────────────┤
│ ┌──────────────────────────────────────┐   │
│ │ CDN (CloudFront / Cloudflare)        │   │
│ │ Cache static assets globally         │   │
│ └──────────────────┬───────────────────┘   │
│                    │                        │
│ ┌──────────────────▼───────────────────┐   │
│ │ Load Balancer (Application Gateway)  │   │
│ │ SSL termination + routing             │   │
│ └──────────────────┬───────────────────┘   │
│                    │                        │
│ ┌──────────────────▼───────────────────┐   │
│ │ Kubernetes Cluster                    │   │
│ ├──────────────────────────────────────┤   │
│ │ Pod 1: Backend (FastAPI)             │   │
│ │ Pod 2: Backend (FastAPI)             │   │
│ │ Pod 3: Frontend (Nginx serving React)│   │
│ │ Pod 4: LLM Service (Ollama)          │   │
│ │ Pod 5: ML Service (TensorFlow Lite)  │   │
│ └──────────────────────────────────────┘   │
│                    │                        │
│ ┌──────────────────▼───────────────────┐   │
│ │ Managed PostgreSQL (RDS/Cloud SQL)   │   │
│ │ • Automated backups                  │   │
│ │ • Read replicas for scaling          │   │
│ │ • Point-in-time recovery             │   │
│ └──────────────────────────────────────┘   │
│                                             │
│ ┌──────────────────────────────────────┐   │
│ │ Monitoring & Logging                  │   │
│ │ • CloudWatch / Stackdriver             │   │
│ │ • Error tracking (Sentry)             │   │
│ │ • Performance monitoring (DataDog)    │   │
│ └──────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

---

## **Scalability Considerations**

### **Current (Single Machine)**
- ✅ Works for 100-500 concurrent users
- ✅ Development + demo phase

### **Future Scaling**

| Bottleneck | Solution |
|-----------|----------|
| Backend CPU | Horizontal scaling with K8s + load balancer |
| Database | Read replicas, connection pooling, query optimization |
| LLM latency | Cache frequent queries, batch processing |
| File storage | Move to S3/Cloud Storage, CDN for image delivery |
| Real-time | WebSocket support for notifications |

---

## **Development Workflow**

```
Local Development:
  ├─ Terminal 1: cd backend && python main.py
  ├─ Terminal 2: npm run dev
  └─ Terminal 3: ollama serve

Testing:
  ├─ Unit tests: pytest backend/tests/
  ├─ Integration tests: pytest backend/tests/integration/
  └─ E2E tests: Cypress (spec in cypress/e2e/)

Code Quality:
  ├─ Backend: Black (formatting), Flake8 (linting), mypy (typing)
  ├─ Frontend: ESLint, Prettier
  └─ Pre-commit: Run linters before commits

Production Build:
  ├─ Backend: docker build -f backend/Dockerfile
  ├─ Frontend: npm run build (generates dist/)
  ├─ ML: docker build -f ml/Dockerfile
  └─ Orchestrate: docker-compose.prod.yml
```

---

## **Monitoring & Observability**

### **Key Metrics**

| Metric | Tool | Alert Threshold |
|--------|------|-----------------|
| API response time | Prometheus | > 1000ms |
| Error rate | Sentry | > 1% requests |
| Database connections | CloudWatch | > 80% pool |
| LLM inference time | Custom logs | > 30s |
| Storage usage | Cloud Storage | > 90% quota |

### **Logging Strategy**

- **Backend**: Structured JSON logs (timestamp, level, service, message)
- **Frontend**: Browser console + error reporting service
- **Database**: Query logging (slow queries > 1000ms)
- **ML**: Inference logs (timing, confidence scores, failures)

---

## **Future Enhancements**

- [ ] Real-time notifications (WebSocket)
- [ ] Mobile app (React Native)
- [ ] Bhashini integration (government LLM service)
- [ ] Video documentation (crop disease guides)
- [ ] Farmer marketplace (connect with input suppliers)
- [ ] Advanced analytics dashboard (yield prediction)
- [ ] Integration with government benefit schemes portal
