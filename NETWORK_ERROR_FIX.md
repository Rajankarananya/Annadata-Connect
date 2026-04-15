# 🔧 Frontend-Backend Connection Architecture

## Current Setup
- **Frontend**: React app served by Vite on localhost:5173+ (varies by port conflicts)
- **Backend**: FastAPI on localhost:8000/api/v1
- **Communication**: Axios HTTP client with automatic token injection

## Why the "Network Error" Happens

### ❌ Problem: CORS (Cross-Origin Resource Sharing)
When frontend calls backend, browser enforces same-origin policy. Frontend on port 5173 cannot talk to backend on 8000 unless backend explicitly allows it via CORS headers.

### The Issue Cycle
1. **Ports Conflict**: Multiple services start, Vite picks ports 5173 → 5174 → 5175 → 5176 → 5177...
2. **CORS Not Updated**: `.env` only had old ports (5173), new port (5176) isn't in CORS_ORIGINS
3. **Browser Blocks Request**: Frontend makes request, server doesn't recognize the origin, request blocked
4. **User Sees**: "Network error" in browser console

## ✅ Permanent Solution

### Step 1: Update `.env` with All Possible Ports
```env
CORS_ORIGINS=http://localhost:5173,http://localhost:5174,http://localhost:5175,http://localhost:5176,http://localhost:5177,http://127.0.0.1:5173,http://127.0.0.1:5174,http://127.0.0.1:5175,http://127.0.0.1:5176,http://127.0.0.1:5177
```
✅ **NOW IN .env** - Backend will accept requests from ANY of these ports

### Step 2: Frontend Always Points to Backend
```javascript
// src/services/api/client.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1'
```
✅ **ALREADY CONFIGURED** - Frontend knows where backend is

### Step 3: Restart Services
```bash
# Kill everything
pkill -9 -f uvicorn
pkill -9 -f "npm run dev"
lsof -ti:8000 | xargs kill -9 2>/dev/null

# Start backend
cd backend && PYTHONPATH=. python -m uvicorn main:app --reload --port 8000

# Start frontend (in another terminal)
cd /Users/shrutijaggi/Desktop/annadata && npm run dev
```

## 🎯 How to Know It's Working

1. **Browser Console**: No CORS errors
2. **Network Tab**: Login POST request goes to `http://localhost:8000/api/v1/auth/login`
3. **Dark theme**: Login should work without "network error"

## 📋 Checklist: Never Fix This Again

- [x] CORS includes ports 5173-5177 (handles Vite conflicts)
- [x] CORS includes 127.0.0.1 variants (localhost alias)
- [x] Backend loads CORS from .env on startup
- [x] Frontend hard-refresh clears cache (**Cmd+Shift+R** on Mac)
- [x] Backend and frontend running on correct ports
- [x] No typos in API URLs (trailing slashes matter!)

## 🚀 Quick Restart Commands

```bash
# Terminal 1: Backend
cd /Users/shrutijaggi/Desktop/annadata/backend && PYTHONPATH=. python -m uvicorn main:app --reload --port 8000

# Terminal 2: Frontend  
cd /Users/shrutijaggi/Desktop/annadata && npm run dev
```

Then in browser:
1. **Hard refresh**: Cmd+Shift+R (macOS) or Ctrl+Shift+R
2. **Open DevTools**: F12 → Console
3. **Check for errors**: Should be none
4. **Try login**: Should work!

## 🛑 If It Still Doesn't Work

Check these in order:
1. Backend running? → `curl http://localhost:8000/health`
2. Frontend running? → Can see Vite banner in npm terminal
3. CORS value? → Should include current frontend port
4. Token stored? → Check localStorage in DevTools
5. API URL correct? → `console.log(apiClient.defaults.baseURL)`
