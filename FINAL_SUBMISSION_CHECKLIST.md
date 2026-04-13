# ✅ **PRE-SUBMISSION VERIFICATION CHECKLIST**

**Run this tomorrow, 30 minutes before submission demo**

---

## **STEP 1: Start Services (5 min)**

### Terminal 1 - Backend
```bash
cd /path/to/Annadata-Connect
python main.py
# ✅ Should see: "Uvicorn running on http://0.0.0.0:8000"
```

**Verify:**
```bash
curl http://localhost:8000
# ✅ Expected: {"status": "ok", "message": "Annadata Connect API is running"}
```

---

### Terminal 2 - Frontend
```bash
npm run dev
# ✅ Should see: "VITE v8.0.2 ready in XXX ms"
# ✅ Should see: Local: http://localhost:5173
```

**Verify:**
```bash
open http://localhost:5173
# ✅ Should see landing page with 3 language buttons (EN/HI/मराठी)
# ✅ F12 → Console should be clean (no red errors)
```

---

### Terminal 3 - Ollama (if not running)
```bash
ollama serve
# ✅ Should see: "Listening on 127.0.0.1:11434"
```

**Verify:**
```bash
curl http://localhost:11434
# ✅ Expected: "Ollama is running"
```

---

## **STEP 2: Test Each Feature (10 min)**

### ✅ TEST 1: Chat (Multilingual) - 2 min

**In browser:**
1. Go to http://localhost:5173
2. Click "AI Advisor" in sidebar
3. At top, click "EN" button
4. Type: "What is crop insurance?"
5. Wait 10-30 seconds for response

**Expected:**
- Response appears in chat
- Has message timestamp
- Shows "LIVE ADVICE" indicator

**Test Hindi:**
1. Click "हिंदी" button at top
2. Type: "बीमा क्या है?"
3. Should get response in Hindi

**Status:** ✅ WORKS / ❌ FAILS

---

### ✅ TEST 2: Weather - 1 min

**In browser:**
1. Go to http://localhost:5173 → Dashboard
2. Scroll to "Current Weather & Risk" widget
3. Should show:
   - Flood Risk: X%
   - Drought Risk: Y%
   - Rainfall: Zmm

**Status:** ✅ WORKS / ❌ FAILS

---

### ✅ TEST 3: Forms Validation - 2 min

**In browser:**
1. Go to http://localhost:5173 → New Claim
2. Try to submit EMPTY form
3. **Expected:** Error message appears on each field
4. Fill in some fields:
   - Crop Type: Drop down works?
   - Damage Type: Button selection works?
5. Try to submit again
6. **Expected:** Form accepts or shows API error (OK - backend not required for form validation)

**Status:** ✅ WORKS / ❌ FAILS

---

### ✅ TEST 4: API Endpoints - 2 min

**Open Postman or Terminal:**

#### Auth (should work)
```bash
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123",
    "full_name": "Test User",
    "phone": "9876543210",
    "role": "farmer"
  }'
```

**Status:** ✅ WORKS / ❌ FAILS
**Expected:** Token returned or error message

---

#### Weather Endpoint (should work)
```bash
curl "http://localhost:8000/api/v1/weather/risk?latitude=29.1965&longitude=75.7345"
```

**Status:** ✅ WORKS / ❌ FAILS
**Expected:** `{"flood_risk": X, "drought_risk": Y, "rainfall": Z}`

---

#### Chat Endpoint (should work)
```bash
curl -X POST "http://localhost:8000/api/v1/chat/multilingual?query=hello&lang=en"
```

**Status:** ✅ WORKS / ❌ FAILS
**Expected:** `{"response": "...", "lang": "en"}` (may take 30 seconds)

---

### ✅ TEST 5: API Documentation - 1 min

**In browser:**
1. Go to http://localhost:8000/docs
2. Should see Swagger UI
3. List all endpoints:
   - /api/v1/auth/register ✅
   - /api/v1/auth/login ✅
   - /api/v1/chat/multilingual ✅
   - /api/v1/weather/risk ✅
   - /api/v1/farmers/* ✅
   - /api/v1/claims/* ✅
   - /api/v1/grievances/* ✅

**Status:** ✅ WORKS / ❌ FAILS

---

### ✅ TEST 6: Database - 1 min

```bash
# Check PostgreSQL is running
psql -U postgres -d agri_db -c "\dt"

# Should list tables:
# - users
# - farmers
# - claims
# - grievances
# - land
# - audit_logs
```

**Status:** ✅ WORKS / ❌ FAILS

---

### ✅ TEST 7: Git Status - 1 min

```bash
git status
# ✅ Expected: "working tree clean"

git log --oneline -5
# ✅ Should see recent commits about integration & ML
```

**Status:** ✅ WORKS / ❌ FAILS

---

## **STEP 3: Browser Console Check (2 min)**

**Critical:** No red errors should appear

1. Open http://localhost:5173
2. Press F12 (DevTools)
3. Go to Console tab
4. Refresh page (Ctrl+R)
5. Look for red errors or warnings

**Status:**
- ✅ Clean (no red errors) → PASS
- ❌ Has errors → FAIL (investigate before demo)

---

## **STEP 4: Network Tab Check (2 min)**

**In DevTools:**
1. Go to Network tab
2. Refresh page
3. Click "Chat" page
4. Ask a question
5. Watch API calls:
   - ✅ POST /chat/multilingual → 200
   - ✅ Response shows damage data

**Status:** ✅ WORKS / ❌ FAILS

---

## **STEP 5: Test Docker Components (Optional)**

```bash
# Check if using Docker
docker ps

# Should show:
# - postgres:15
# - ollama/ollama
# - (backend if containerized)
```

**Status:** ✅ WORKS / ❌ FAILS

---

## **FINAL CHECKLIST**

| Check | Status | Notes |
|-------|--------|-------|
| Backend running on 8000 | ✅/❌ | |
| Frontend running on 5173 | ✅/❌ | |
| Ollama running on 11434 | ✅/❌ | |
| Chat endpoint responds | ✅/❌ | May take 30s |
| Weather endpoint responds | ✅/❌ | |
| Forms have validation | ✅/❌ | |
| API Docs visible | ✅/❌ | |
| Database tables exist | ✅/❌ | |
| Browser console clean | ✅/❌ | No red errors |
| Network tab shows API calls | ✅/❌ | |
| Git working tree clean | ✅/❌ | |

---

## **IF SOMETHING FAILS**

### Chat timeout (30+ seconds)?
```bash
# This is normal - LLM is slow first time
# Wait 30-60 seconds
# Or restart Ollama and try again
```

### Backend won't start?
```bash
# Check port is free:
lsof -i :8000

# If in use, kill it:
npx fkill 8000
python main.py
```

### Frontend blank?
```bash
# Clear cache:
Ctrl+Shift+Delete

# Refresh:
Ctrl+R

# Check console for errors
```

### Weather returns null?
```bash
# Check internet connection (uses Open-Meteo API)
# Try manual curl:
curl "https://api.open-meteo.com/v1/forecast?latitude=29&longitude=75&current=rainfall"
```

### Database error?
```bash
# Check PostgreSQL running:
psql -U postgres -c "SELECT 1"

# If not, restart:
sudo service postgresql restart
```

---

## **🎬 READY FOR DEMO!**

Once all tests pass (✅):

1. **Keep all 3 terminals running** (Backend, Frontend, Ollama)
2. **Open browser at http://localhost:5173**
3. **Follow SUBMISSION_CHECKLIST.md** for demo script
4. **Show evaluators:**
   - Chat in 3 languages
   - Weather risk dashboard
   - Form submission flow
   - API documentation page

---

## **⏱️ TIMING**

```
2:30 PM - Start all 3 services
2:35 PM - Run all tests above
2:45 PM - Final verification
2:55 PM - Demo ready
3:00 PM - Start demo
3:15 PM - Demo complete
```

**Good luck! 🚀**
