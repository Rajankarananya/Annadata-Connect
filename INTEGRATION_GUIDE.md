# 🔗 Full Project Integration Guide - Annadata Connect

Complete guide to connect all components of the project and test end-to-end functionality.

---

## ✅ **What's Been Fixed**

### 1. **Backend Dependencies** (`backend/requirements.txt`)
- ✅ Added authentication packages: `python-jose`, `bcrypt`
- ✅ Added ML packages: `tensorflow`, `pillow`, `numpy`
- ✅ Added LLM packages: `langchain`, `chromadb`, `ollama`
- ✅ Added utility packages: `requests`, `httpx`, `pandas`, `python-multipart`

### 2. **Environment Configuration** (`.env`)
- ✅ Fixed Ollama URL: `http://localhost:11434` (was `http://ollama:11434`)
- ✅ Added Frontend API URL: `VITE_API_BASE_URL=http://localhost:8000/api/v1`
- ✅ Added language defaults

### 3. **Frontend API Configuration** (`src/services/api/client.js`)
- ✅ Updated default API base URL from `http://localhost:5000/api` to `http://localhost:8000/api/v1`
- ✅ Proper Vite environment variable support

### 4. **Login Page Integration** (`src/features/public/pages/LoginPage.jsx`)
- ✅ Fixed to call actual `authApi.login()` instead of using fake dev token
- ✅ Updated form field from `username` to `email`
- ✅ Proper error handling for API responses

---

## 🚀 **How to Run the Project**

### **Prerequisites**
```bash
# Check versions
python --version          # Should be 3.11+
node --version            # Should be 18+
npm --version             # Should be 10+
```

### **Terminal 1: PostgreSQL Database**
```bash
# Start PostgreSQL (if using local installation)
# On macOS with Homebrew:
brew services start postgresql

# Or use Docker:
docker run -d --name postgres-annadata \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=baddies2416 \
  -e POSTGRES_DB=agri_db \
  -p 5432:5432 \
  postgres:15-alpine
```

### **Terminal 2: Backend API**
```bash
cd /Users/shrutijaggi/Desktop/annadata

# Install Python dependencies
pip install -r backend/requirements.txt

# Run database migrations
cd backend
alembic upgrade head

# Start backend server
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Expected output:
# INFO:     Started server process [14521]
# INFO:     Uvicorn running on http://0.0.0.0:8000
```

### **Terminal 3: Frontend Development Server**
```bash
cd /Users/shrutijaggi/Desktop/annadata

# Install Node dependencies (first time only)
npm install

# Start frontend dev server
npm run dev

# Expected output:
# VITE v8.0.1  ready in 245 ms
# ➜  Local:   http://localhost:5173/
```

### **Terminal 4 (Optional): Ollama LLM**
```bash
# Start Ollama service (if you have it installed)
ollama serve

# In another terminal, pull the model:
ollama pull llama3
```

---

## 🧪 **Testing the Integration**

### **1. Check Backend Health**
```bash
curl http://localhost:8000/health
# Expected: {"status":"ok"}
```

### **2. Check Frontend Loads**
Open browser: http://localhost:5173
- Should see Annadata Connect login page
- No console errors related to API URLs

### **3. Test Login Flow**
1. Navigate to http://localhost:5173
2. Enter test credentials:
   - Email: `test@example.com`
   - Password: `password123`
   - Role: Farmer
3. Should see error (user doesn't exist yet) OR
4. If test user exists, should redirect to `/farmer/dashboard`

### **4. Create Test User (Backend)**
```bash
# From backend directory, run seed script
python seed.py

# Or manually via API:
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "farmer@test.com",
    "password": "Test@123456",
    "full_name": "Test Farmer",
    "phone": "9876543210",
    "role": "farmer"
  }'
```

### **5. Test API Endpoints**

**Login:**
```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "farmer@test.com",
    "password": "Test@123456"
  }'

# Save the access_token from response
```

**Get Farmer Profile (with token):**
```bash
curl -X GET http://localhost:8000/api/v1/farmers/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
```

**Create Claim:**
```bash
curl -X POST http://localhost:8000/api/v1/claims \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE" \
  -d '{
    "farmer_id": 1,
    "damage_type": "rice_blast",
    "description": "Crop damaged by blast",
    "gps_lat": "28.6139",
    "gps_lng": "77.2090",
    "image_path": "/uploads/claim_001.jpg"
  }'
```

---

## 📊 **Data Flow Verification**

### **Frontend → Backend → Database**
```
LoginPage.jsx
    ↓ (calls authApi.login())
src/services/api/index.js
    ↓ (POSTs to /auth/login)
apiClient (axios with interceptor)
    ↓ (HTTP request)
http://localhost:8000/api/v1/auth/login
    ↓ (FastAPI backend)
backend/app/routes/auth.py
    ↓ (queries User model)
backend/app/models/user.py
    ↓ (SQLAlchemy ORM)
PostgreSQL Database
    ↓ (returns user data)
Creates JWT token
    ↓ (returns to frontend)
localStorage.setItem('authToken')
    ↓ (stores token)
navigate('/dashboard')
    ↓ (redirects user)
DashboardPage fetches claims...
```

---

## 🔧 **Common Issues & Fixes**

### **Issue: "Connection refused" on backend startup**
**Fix:** PostgreSQL not running
```bash
# Start PostgreSQL
brew services start postgresql
# Or use Docker: see above
```

### **Issue: "ModuleNotFoundError: No module named 'jose'"**
**Fix:** Python dependencies not installed
```bash
pip install -r backend/requirements.txt --upgrade
```

### **Issue: Frontend shows "API error: Network request failed"**
**Fix:** Backend not running or CORS not configured
```bash
# Check backend is running on :8000
curl http://localhost:8000/health

# Check CORS_ORIGINS in .env includes localhost:5173
grep CORS_ORIGINS /Users/shrutijaggi/Desktop/annadata/.env
```

### **Issue: "Invalid token" when trying authenticated endpoints**
**Fix:** Token not being sent in header
```bash
# Verify authToken in localStorage
# In browser console:
localStorage.getItem('authToken')
```

### **Issue: ML module not working**
Current Status: ML module is separate FastAPI app in `ml/api/main.py`
- Requires separate start on port (need to configure)
- Integration into main backend planned

### **Issue: Chat/LLM endpoint not responding**
**Fix:** Ollama not running
```bash
# Terminal: Start Ollama
ollama serve

# Another Terminal: Pull model
ollama pull llama3
```

---

## 🎯 **Next Steps for Complete Integration**

### **Phase 1: Core System (In Progress)**
- [x] Fix environment configuration
- [x] Update backend dependencies
- [x] Fix frontend API URLs
- [x] Fix authentication flow
- [ ] Test database migrations
- [ ] Verify all API endpoints work

### **Phase 2: Frontend Data Integration**
- [ ] Connect MyClaimsPage to actual API (currently static)
- [ ] Connect NewClaimPage form submission to API
- [ ] Connect GrievancesPage to API
- [ ] Connect DashboardPage to display user data
- [ ] Add loading states and error handling

### **Phase 3: ML Integration**
- [ ] Create `/api/v1/analyze` endpoint in main backend
- [ ] Integrate ML module's image analysis
- [ ] Connect claim form image upload to ML analysis
- [ ] Store analysis results in database

### **Phase 4: Advanced Features**
- [ ] Chat service with Ollama integration
- [ ] Weather service API integration
- [ ] Multi-language support verification
- [ ] Audit logging
- [ ] Admin dashboard

### **Phase 5: Testing & Deployment**
- [ ] End-to-end tests
- [ ] Performance tests
- [ ] Security tests
- [ ] Docker deployment

---

## 📚 **File Structure Reference**

```
annadata/
├── .env                           # Configuration (fixed ✅)
├── backend/
│   ├── main.py                   # FastAPI app entry
│   ├── requirements.txt           # Dependencies (updated ✅)
│   ├── alembic/                  # Database migrations
│   ├── app/
│   │   ├── models/               # SQLAlchemy ORM models
│   │   ├── routes/               # API endpoints
│   │   ├── services/             # Business logic
│   │   ├── schemas/              # Pydantic validation
│   │   └── utils/                # Helpers (DB, Auth, Dependencies)
│   └── seed.py                   # Test data generator
├── frontend/
│   ├── src/
│   │   ├── services/api/
│   │   │   ├── client.js         # Axios instance (fixed ✅)
│   │   │   └── index.js          # API methods
│   │   └── features/
│   │       ├── auth/             # Authentication pages
│   │       ├── farmer/           # Farmer dashboard pages
│   │       └── admin/            # Admin dashboard pages
│   └── vite.config.js
├── ml/
│   ├── api/main.py               # ML module API (separate)
│   ├── models/                   # TF/TFLite models
│   └── utils/                    # EXIF, fraud detection
└── INTEGRATION_GUIDE.md           # This file ✅
```

---

## 💡 **Development Tips**

### **Enable Debug Logging**
```bash
# Set DEBUG=true in .env
DEBUG=true

# Backend will show all SQL queries
```

### **Check API Documentation**
```bash
# Swagger/OpenAPI docs available at:
http://localhost:8000/docs
http://localhost:8000/redoc
```

### **Check Database**
```bash
# Connect to PostgreSQL
psql -U postgres -d agri_db

# List tables:
\dt

# Query users:
SELECT * FROM users;
```

### **Frontend Console Debugging**
```javascript
// In browser console:
// Check API URL
console.log(import.meta.env.VITE_API_BASE_URL)

// Check auth token
console.log(localStorage.getItem('authToken'))

// Check Axios instance
import { apiClient } from './src/services/api/client'
console.log(apiClient.defaults.baseURL)
```

---

## ✨ **Success Indicators**

You'll know integration is complete when:

✅ Backend starts without errors
✅ Frontend loads on http://localhost:5173
✅ Login page calls backend API (check Network tab)
✅ Can create user and login
✅ Dashboard shows user data from API
✅ Can submit claims and see them in list
✅ Admin can view and approve claims
✅ Chat endpoint responds (if Ollama running)
✅ All CRUD operations work end-to-end

---

## 📞 **Need Help?**

### **Check logs:**
- Backend: Look at terminal where `uvicorn` is running
- Frontend: Open browser DevTools → Console/Network
- Database: Check PostgreSQL logs

### **Verify connectivity:**
```bash
# Backend running?
lsof -i :8000

# Frontend running?
lsof -i :5173

# PostgreSQL running?
lsof -i :5432

# Ollama running?
lsof -i :11434
```

---

**Last Updated:** April 13, 2026  
**Status:** 🟡 In Progress  
**Next Action:** Test backend startup and database migrations
