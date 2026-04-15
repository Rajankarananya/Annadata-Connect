# 🔧 Login Troubleshooting Guide

**Issue:** Login functionality doesn't work

Follow this guide to diagnose and fix the issue.

---

## 🔍 Step 1: Check Backend is Running

```bash
# Test if backend is running
lsof -i :8000

# If not running, start it:
cd /Users/shrutijaggi/Desktop/annadata/backend
uvicorn main:app --reload
```

You should see: `Uvicorn running on http://0.0.0.0:8000`

---

## 🔍 Step 2: Test Backend API Directly

Open a terminal and test the auth endpoint:

```bash
# First, create a test user
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123",
    "full_name": "Test User",
    "phone": "9876543210",
    "role": "farmer"
  }'

# Expected response:
# {"access_token":"eyJ...","token_type":"bearer","role":"farmer"}

# Then try to login
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123"
  }'

# Expected response:
# {"access_token":"eyJ...","token_type":"bearer","role":"farmer"}
```

### If curl fails:
- ❌ "Connection refused" → Backend not running (see Step 1)
- ❌ "email already registered" → User exists, use different email
- ❌ "Invalid email or password" → Credentials wrong
- ❌ Any other error → Check backend terminal for error messages

---

## 🔍 Step 3: Check Database Connection

If backend running but login fails, check database:

```bash
# Check if PostgreSQL is running
lsof -i :5432

# If not running, start it:
docker run -d --name postgres-annadata \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=baddies2416 \
  -e POSTGRES_DB=agri_db \
  -p 5432:5432 postgres:15-alpine

# Then apply migrations:
cd /Users/shrutijaggi/Desktop/annadata/backend
alembic upgrade head

# Verify database has tables:
psql -U postgres -d agri_db -c "\dt"

# You should see: users, farmers, claims, etc.
```

---

## 🔍 Step 4: Check Frontend (Browser DevTools)

1. **Open DevTools:** Press `F12` in browser
2. **Go to Console tab**
3. **Try to login and watch for** console logs:

### You should see:
```
[apiClient] Request: POST http://localhost:8000/api/v1/auth/login
[authApi.login] Sending request to /auth/login with email: test@example.com
[apiClient] Response: 200 {access_token: "eyJ...", token_type: "bearer", role: "farmer"}
[authApi.login] Response received: 200 {access_token: "eyJ...", token_type: "bearer", role: "farmer"}
[authApi.login] Token stored successfully
[LoginPage] Attempting login with: {email: "test@example.com", role: "farmer"}
[LoginPage] Login response: {access_token: "eyJ...", token_type: "bearer", role: "farmer"}
[LoginPage] Token stored, redirecting to: /farmer/dashboard
```

### If you see errors instead:

**Error Type A - Network Error:**
```
[apiClient] Response Error: {status: undefined, url: "/auth/login", message: "Network Error"}
```
**Fix:** Backend not running (see Step 1)

**Error Type B - 401 Unauthorized:**
```
[apiClient] Response Error: {status: 401, data: {detail: "Invalid email or password"}}
```
**Fix:** Wrong email/password or user doesn't exist (see Step 2)

**Error Type C - 404 Not Found:**
```
[apiClient] Response Error: {status: 404, data: {detail: "Not Found"}}
```
**Fix:** Backend APIs not registered or wrong URL (check Step 1 & Step 5)

**Error Type D - CORS Error:**
```
Access to XMLHttpRequest at 'http://localhost:8000/api/v1/auth/login' from origin
'http://localhost:5173' has been blocked by CORS policy
```
**Fix:** Check `.env` CORS_ORIGINS (see Step 5)

---

## 🔍 Step 5: Check Environment Configuration

```bash
cd /Users/shrutijaggi/Desktop/annadata

# Check .env has correct values:
grep "CORS_ORIGINS\|VITE_API_BASE_URL\|DATABASE_URL" .env

# Expected output:
# CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
# VITE_API_BASE_URL=http://localhost:8000/api/v1
# DATABASE_URL=postgresql+asyncpg://postgres:baddies2416@localhost:5432/agri_db
```

If any are missing or wrong, fix `.env` and restart services.

---

## 🔍 Step 6: Check Network Tab

In DevTools → **Network tab**:

1. Try to login
2. Look for `login` request
3. Check:
   - **Status:** Should be `200` (success) or `401` (bad credentials)
   - **URL:** Should be `http://localhost:8000/api/v1/auth/login`
   - **Request Body:** Should show email and password
   - **Response:** Should show `access_token`, `token_type`, `role`

---

## ✅ Complete Checklist

Run this to verify everything:

```bash
#!/bin/bash

echo "🔍 Checking Login Setup..."
echo ""

# 1. Check backend
echo "1. Backend running on :8000?"
lsof -i :8000 > /dev/null && echo "   ✅ YES" || echo "   ❌ NO - Start backend"

# 2. Check database
echo "2. Database running on :5432?"
lsof -i :5432 > /dev/null && echo "   ✅ YES" || echo "   ❌ NO - Start PostgreSQL"

# 3. Check frontend
echo "3. Frontend running on :5173?"
lsof -i :5173 > /dev/null && echo "   ✅ YES" || echo "   ❌ NO - Start npm run dev"

# 4. Check backend health
echo "4. Backend health check?"
curl -s http://localhost:8000/health > /dev/null && echo "   ✅ YES" || echo "   ❌ NO"

# 5. Check .env
echo "5. .env configured?"
grep -q "VITE_API_BASE_URL" /Users/shrutijaggi/Desktop/annadata/.env && echo "   ✅ YES" || echo "   ❌ NO"

echo ""
echo "If all ✅, login should work!"
echo "If any ❌, see above steps for fixes."
```

Save as `check_login.sh` and run:
```bash
chmod +x check_login.sh
./check_login.sh
```

---

## 📞 Quick Fixes

### "Can't connect to backend"
```bash
cd /Users/shrutijaggi/Desktop/annadata/backend
pip install -r ../backend/requirements.txt
uvicorn main:app --reload
```

### "Database connection failed"
```bash
docker run -d --name postgres-annadata \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=baddies2416 \
  -e POSTGRES_DB=agri_db \
  -p 5432:5432 postgres:15-alpine

cd /Users/shrutijaggi/Desktop/annadata/backend
alembic upgrade head
```

### "User not found in database"
```bash
# Create test user
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"Test123456","full_name":"Test","phone":"9876543210","role":"farmer"}'

# Then login with same credentials
```

### "Page redirects but dashboard is blank"
- Check if `/farmer/dashboard` route exists
- Check browser console for errors
- Make sure claims API is working: `curl http://localhost:8000/api/v1/claims -H "Authorization: Bearer YOUR_TOKEN"`

---

## 📊 Expected Login Flow

```
1. User enters email + password
   ↓
2. Click Login button
   ↓
3. Form validates (zod schema)
   ↓
4. AuthApi.login() called
   ↓
5. HTTP POST to http://localhost:8000/api/v1/auth/login
   ↓
6. Backend checks database
   ↓
7. Backend returns JWT token
   ↓
8. Frontend stores token in localStorage
   ↓
9. Frontend redirects to /farmer/dashboard
   ↓
10. Dashboard page fetches claims using token
   ↓
11. Claims display ✅
```

---

## 🎯 Success!

When login works, you should:
1. See login page
2. Enter credentials and click Login
3. Briefly see "Loading..." state
4. Get redirected to dashboard
5. See "My Claims" page with claims list

If stuck at any step, check the console logs and see which step is failing, then refer to the matching section above.

---

**Questions?** Check the browser console output first - it will tell you exactly what's failing!
