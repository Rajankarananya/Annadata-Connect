# 🔐 ADMIN & FARMER LOGIN REFERENCE

## 👨‍💻 ADMIN LOGIN
```
Email:    admin@farmer.local
Password: Password123!
```
✅ **Role:** admin | **Status:** Ready to use

---

## 👨‍🌾 FARMER TEST ACCOUNTS

| # | Name | Email | Password |
|---|------|-------|----------|
| 1 | Ramesh Patil | ramesh.patil@farmer.local | Password123! |
| 2 | **Sunita Deshmukh** | **sunita.deshmukh@farmer.local** | **Password123!** |
| 3 | Anil Yadav | anil.yadav@farmer.local | Password123! |
| 4 | Kavita Shinde | kavita.shinde@farmer.local | Password123! |
| 5 | Manoj Jadhav | manoj.jadhav@farmer.local | Password123! |
| 6 | Priya Kulkarni | priya.kulkarni@farmer.local | Password123! |
| 7 | Suresh Waghmare | suresh.waghmare@farmer.local | Password123! |
| 8 | Rekha Borde | rekha.borde@farmer.local | Password123! |
| 9 | Vijay Mane | vijay.mane@farmer.local | Password123! |
| 10 | Anita Pawar | anita.pawar@farmer.local | Password123! |

**⭐ Recommended for testing:** Sunita Deshmukh (has test claims and data)

---

## ✨ NEW FEATURES

### 1️⃣ Dynamic Farmer Name on Dashboard
- ✅ Shows actual farmer name (not hardcoded "Rajesh")
- ✅ Updates based on logged-in user
- Example: "Welcome back, Sunita Deshmukh"

### 2️⃣ Add Claim Button on My Claims Page
- ✅ Green button in top-right corner
- ✅ Quick access to create new claim
- ✅ New claims appear in list automatically

### 3️⃣ Location-Based Weather
- ✅ Shows weather for farmer's actual location
- ✅ Uses browser geolocation (with permission)
- ✅ Displays rainfall, flood risk, drought risk
- Falls back to Hisar region if location unavailable

### 4️⃣ Admin Portal Ready
- ✅ Admin login credentials provided
- ✅ Can manage farmers and claims
- Dashboard awaiting implementation

---

## 🌐 ACCESS POINTS

**Frontend:** http://localhost:5173
**Backend API:** http://localhost:8000/api/v1
**API Docs:** http://localhost:8000/docs (if enabled)

---

## 🧪 QUICK TEST SCRIPT

```bash
# Test admin login
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@farmer.local","password":"Password123!"}'

# Test farmer login
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"sunita.deshmukh@farmer.local","password":"Password123!"}'

# Get your profile
curl http://localhost:8000/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

**Last Updated:** April 15, 2026
**Status:** 🟢 All Features Active
