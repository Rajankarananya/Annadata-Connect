# 📚 **API Documentation**

Complete API endpoint reference for Annadata Connect.

---

## **Base URL**

```
http://localhost:8000/api/v1
```

All endpoints require the `VITE_API_BASE_URL` environment variable to be set correctly in `.env`.

---

## **Authentication**

### **JWT Token**

All protected endpoints require a JWT token in the `Authorization` header:

```
Authorization: Bearer <token>
```

Tokens are obtained via `/auth/login` and expire after `JWT_ACCESS_TOKEN_EXPIRE_MINUTES` (default: 30 minutes).

### **Roles**

Three user roles with different access levels:

| Role | Access |
|------|--------|
| `farmer` | View own profile, submit claims/grievances, access chat |
| `field_officer` | Review claims, approve/reject, view analytics |
| `admin` | Full access to all endpoints, user management, audit logs |

---

## **Error Handling**

All error responses follow this format:

```json
{
  "detail": "Error message description",
  "status_code": 400
}
```

Common HTTP status codes:

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (missing/invalid token) |
| 403 | Forbidden (insufficient permissions) |
| 404 | Not Found |
| 500 | Server Error |

---

## **Authentication Endpoints**

### **1. Register User**

Register a new farmer account.

```
POST /auth/register
```

**Request Body:**
```json
{
  "email": "farmer@example.com",
  "password": "SecurePassword123!",
  "full_name": "John Doe",
  "phone": "9876543210",
  "role": "farmer"
}
```

**Response (201 Created):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user_id": 1,
  "email": "farmer@example.com",
  "role": "farmer"
}
```

**Validation Rules:**
- Email must be valid and unique
- Password minimum 8 characters
- Phone must be 10 digits
- Role must be one of: `farmer`, `field_officer`, `admin`

---

### **2. Login User**

Authenticate user and receive JWT token.

```
POST /auth/login
```

**Request Body:**
```json
{
  "email": "farmer@example.com",
  "password": "SecurePassword123!"
}
```

**Response (200 OK):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user_id": 1,
  "email": "farmer@example.com",
  "role": "farmer"
}
```

**Error Responses:**
- `400` - Invalid credentials
- `404` - User not found

---

## **Farmer Endpoints**

### **3. Get Farmer Profile**

Retrieve authenticated farmer's profile information.

```
GET /farmers/me
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "user_id": 1,
  "full_name": "John Doe",
  "email": "farmer@example.com",
  "phone": "9876543210",
  "role": "farmer",
  "district": "Haryana",
  "village": "Sample Village",
  "created_at": "2026-04-10T10:30:00Z"
}
```

---

### **4. Update Farmer Profile**

Update farmer profile information.

```
PUT /farmers/me
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "full_name": "John Updated",
  "phone": "9998765432",
  "district": "Punjab",
  "village": "New Village"
}
```

**Response (200 OK):**
```json
{
  "user_id": 1,
  "full_name": "John Updated",
  "email": "farmer@example.com",
  "phone": "9998765432",
  "role": "farmer",
  "district": "Punjab",
  "village": "New Village",
  "updated_at": "2026-04-13T14:20:00Z"
}
```

---

## **Claims Endpoints**

### **5. Submit Crop Damage Claim**

Submit a new crop damage claim with image and metadata.

```
POST /claims
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body:**
```
- crop_type (string): "Wheat", "Rice", "Cotton", etc.
- damage_type (string): "Pest", "Disease", "Weather", "Other"
- affected_area (number): Area in hectares (0.5 - 100)
- damage_percentage (number): Percentage damaged (1 - 100)
- image (file): Crop damage photo (JPG/PNG, max 5MB)
- gps_latitude (number): GPS latitude coordinate
- gps_longitude (number): GPS longitude coordinate
- description (text): Detailed description of damage
```

**Response (201 Created):**
```json
{
  "claim_id": 101,
  "user_id": 1,
  "crop_type": "Wheat",
  "damage_type": "Pest",
  "affected_area": 2.5,
  "damage_percentage": 45,
  "image_url": "/uploads/claims/claim_101_image.jpg",
  "status": "pending",
  "created_at": "2026-04-13T15:00:00Z",
  "ml_analysis": {
    "damage_class": "moderate",
    "confidence": 0.87,
    "damage_level": "yellow_flag"
  }
}
```

---

### **6. Get Claim Details**

Retrieve details of a specific claim.

```
GET /claims/{claim_id}
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "claim_id": 101,
  "user_id": 1,
  "farmer_name": "John Doe",
  "crop_type": "Wheat",
  "damage_type": "Pest",
  "affected_area": 2.5,
  "damage_percentage": 45,
  "status": "approved",
  "ml_analysis": {
    "damage_class": "moderate",
    "confidence": 0.87,
    "damage_level": "yellow_flag",
    "exif_metadata": {
      "timestamp": "2026-04-13T14:30:00Z",
      "gps": "29.1965, 75.7345"
    }
  },
  "approved_amount": 5000,
  "approved_by": "Officer Name",
  "created_at": "2026-04-13T15:00:00Z",
  "updated_at": "2026-04-13T16:30:00Z"
}
```

---

### **7. Update Claim Status (Admin/Field Officer)**

Update claim status and approval amount.

```
PATCH /claims/{claim_id}/status
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "status": "approved",
  "approved_amount": 5000,
  "notes": "Claim approved based on damage assessment"
}
```

**Valid Statuses:**
- `pending` - Under review
- `approved` - Approved for payment
- `rejected` - Rejected with reason
- `processing` - In processing

**Response (200 OK):**
```json
{
  "claim_id": 101,
  "status": "approved",
  "approved_amount": 5000,
  "updated_by": "admin@example.com",
  "updated_at": "2026-04-13T16:30:00Z"
}
```

---

### **8. Get Farmer's Claims**

Retrieve all claims submitted by authenticated farmer.

```
GET /farmers/me/claims
Authorization: Bearer <token>
```

**Query Parameters:**
- `skip` (integer, default: 0): Number of claims to skip
- `limit` (integer, default: 20): Maximum claims to return

**Response (200 OK):**
```json
{
  "total": 3,
  "claims": [
    {
      "claim_id": 101,
      "crop_type": "Wheat",
      "status": "approved",
      "created_at": "2026-04-13T15:00:00Z"
    },
    {
      "claim_id": 102,
      "crop_type": "Rice",
      "status": "pending",
      "created_at": "2026-04-12T10:00:00Z"
    }
  ]
}
```

---

## **Grievance Endpoints**

### **9. Submit Grievance**

Submit a complaint or grievance.

```
POST /grievances
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Claim not processed",
  "description": "My claim from last month is still pending",
  "category": "claim_support",
  "priority": "high"
}
```

**Valid Categories:**
- `claim_support` - Issue with claims process
- `payment` - Payment-related issues
- `technical` - Technical/app issues
- `other` - Other complaints

**Response (201 Created):**
```json
{
  "grievance_id": 201,
  "user_id": 1,
  "title": "Claim not processed",
  "status": "open",
  "created_at": "2026-04-13T15:30:00Z",
  "ticket_number": "GRV-2026-0201"
}
```

---

### **10. Get Grievance Status**

Retrieve details of a submitted grievance.

```
GET /grievances/{grievance_id}
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "grievance_id": 201,
  "ticket_number": "GRV-2026-0201",
  "title": "Claim not processed",
  "description": "My claim from last month is still pending",
  "category": "claim_support",
  "status": "resolved",
  "resolution_notes": "Claim has been processed and approved",
  "created_at": "2026-04-13T15:30:00Z",
  "resolved_at": "2026-04-14T10:00:00Z"
}
```

---

## **Chat Endpoints**

### **11. Multilingual Chat**

Send a query to the AI advisor in English, Hindi, or Marathi.

```
POST /chat/multilingual
```

**Query Parameters:**
- `query` (string, required): Question in any language
- `lang` (string, required): Response language - `en`, `hi`, or `mr`

**Example Request:**

```bash
curl -X POST "http://localhost:8000/api/v1/chat/multilingual?query=What%20is%20crop%20insurance&lang=en"
```

**Response (200 OK):**
```json
{
  "response": "Crop insurance is a financial product that protects farmers against crop losses due to natural disasters, pest damage, or disease. In India, the PM Fasal Bima Yojana is the main government crop insurance scheme.",
  "lang": "en",
  "timestamp": "2026-04-13T16:00:00Z"
}
```

**Hindi Example:**

```bash
curl -X POST "http://localhost:8000/api/v1/chat/multilingual?query=बीमा%20क्या%20है&lang=hi"
```

**Response:**
```json
{
  "response": "फसल बीमा एक वित्तीय उत्पाद है जो किसानों को प्राकृतिक आपदाओं, कीटों के नुकसान या बीमारी के कारण फसल के नुकसान से बचाता है।",
  "lang": "hi",
  "timestamp": "2026-04-13T16:00:00Z"
}
```

**Supported Questions:**
- Government schemes (PM Fasal Bima, crop insurance)
- Claim procedures and deadlines
- Weather risk assessment
- Crop disease information
- fertilizer and pesticide guidance

**Note:** First request may take 20-30 seconds (LLM warmup). Subsequent requests are faster.

---

## **Weather Endpoints**

### **12. Get Weather Risk Score**

Get flood and drought risk assessment for a location.

```
GET /weather/risk
```

**Query Parameters:**
- `latitude` (number, required): GPS latitude
- `longitude` (number, required): GPS longitude

**Example Request:**

```bash
curl "http://localhost:8000/api/v1/weather/risk?latitude=29.1965&longitude=75.7345"
```

**Response (200 OK):**
```json
{
  "flood_risk": 35,
  "drought_risk": 15,
  "rainfall": 2.5,
  "temperature": 28.5,
  "humidity": 65,
  "location": {
    "latitude": 29.1965,
    "longitude": 75.7345
  },
  "timestamp": "2026-04-13T16:00:00Z",
  "advisory": "Moderate flood risk. Monitor weather updates."
}
```

**Risk Levels:**
- `0-25%` - Low risk
- `25-50%` - Moderate risk
- `50-75%` - High risk
- `75-100%` - Critical risk

---

## **ML Analysis Endpoints**

### **13. Analyze Crop Damage (ML)**

Submit image for ML-based crop damage analysis.

```
POST /analyze
Content-Type: multipart/form-data
```

**Parameters:**
- `image` (file): Crop image (JPG/PNG, max 5MB)
- `crop_type` (string, optional): Type of crop for context
- `gps_latitude` (number, optional): GPS latitude
- `gps_longitude` (number, optional): GPS longitude

**Response (200 OK):**
```json
{
  "damage_class": "moderate",
  "confidence": 0.87,
  "damage_level": "yellow_flag",
  "predicted_yield_loss": "30-40%",
  "recommendations": [
    "Apply fungicide for disease control",
    "Increase irrigation frequency",
    "Monitor for pest infestation"
  ],
  "exif_metadata": {
    "timestamp": "2026-04-13T14:30:00Z",
    "camera": "iPhone 12",
    "gps": "29.1965, 75.7345"
  },
  "fraud_check": {
    "is_genuine": true,
    "confidence": 0.95,
    "flags": []
  },
  "processing_time_ms": 245
}
```

**Damage Classes:**
- `green_flag` - No significant damage (0-20%)
- `yellow_flag` - Moderate damage (20-50%)
- `orange_flag` - Severe damage (50-80%)
- `red_flag` - Critical damage (80-100%)

---

## **Health Check**

### **14. API Health Status**

Check if backend API is running.

```
GET /
```

**Response (200 OK):**
```json
{
  "status": "ok",
  "message": "Annadata Connect API is running"
}
```

---

## **Rate Limiting**

Currently no rate limiting is enforced. Future versions will implement:
- 100 requests per minute per IP for public endpoints
- 1000 requests per minute per token for authenticated endpoints

---

## **CORS Policy**

CORS is configured to allow requests from:
- `http://localhost:5173` (local development)
- `http://localhost:3000` (alternative frontend port)

Production deployment should restrict to actual frontend domain.

---

## **Testing Endpoints**

### **Quick Test Commands**

**1. Health Check:**
```bash
curl http://localhost:8000
```

**2. Register:**
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

**3. Get Weather:**
```bash
curl "http://localhost:8000/api/v1/weather/risk?latitude=29.1965&longitude=75.7345"
```

**4. Chat:**
```bash
curl -X POST "http://localhost:8000/api/v1/chat/multilingual?query=hello&lang=en"
```

**5. API Documentation (Swagger UI):**
```
http://localhost:8000/docs
```

---

## **Changelog**

### Version 1.0.0 (Current)
- ✅ Authentication endpoints (register, login)
- ✅ Farmer profile management
- ✅ Crop damage claims submission and tracking
- ✅ Grievance submission and tracking
- ✅ Multilingual AI chatbot (EN/HI/MR)
- ✅ Weather risk assessment
- ✅ ML-based crop damage detection
- ✅ Audit logging on all operations

---

## **Support**

For API issues:
1. Check logs: `Backend log output` or `docker logs <container_id>`
2. Verify JWT token expiry (tokens expire after 30 minutes)
3. Check VITE_API_BASE_URL in .env matches backend port
4. Try endpoint in Swagger UI: http://localhost:8000/docs
