# ML Integration Point - Crop Damage Detection

## Current Status
✅ **Frontend**: Claim form ready (NewClaimPage.jsx)  
✅ **Backend**: Chat endpoint ready (`/api/v1/chat/multilingual`)  
✅ **Backend**: Weather risk endpoint ready (`/api/v1/weather/risk`)  
⏳ **Pending**: ML damage detection endpoint from Dev A

## ML Integration Architecture

### 1. Frontend Integration Point
**File**: `src/features/farmer/pages/NewClaimPage.jsx`

The claims form accepts:
- `crop_type` - Type of crop
- `sowing_date` - When crop was sown  
- `incident_date` - When damage occurred
- `farm_location` - GPS coordinates or location name
- `damage_type` - Nature of damage (damage detection model output)
- `narrative` - Description of damage
- `image_path` - Path or URL to damage image (for ML analysis)

**Current Flow**:
```
User fills form → Submits → claimsApi.createClaim() → /api/v1/claims (Dev B endpoint)
```

### 2. ML Endpoint Integration (When Dev A Provides)
Expected endpoint from Dev A:
```
POST /api/v1/analyze
Content-Type: multipart/form-data

Parameters:
- image: Binary image file (JPG, PNG)
- crop_type: string (e.g., "rice", "wheat")

Response:
{
  "damage_detected": boolean,
  "damage_type": string,  // e.g., "rice_blast", "powdery_mildew"
  "confidence": float,    // 0.0 - 1.0
  "recommendation": string,
  "severity": "low" | "medium" | "high"
}
```

### 3. Frontend-to-ML Integration Steps

#### Step 1: Add Image Upload Handler
```javascript
// In NewClaimPage.jsx
const handleImageUpload = async (imageFile) => {
  const formData = new FormData()
  formData.append('image', imageFile)
  formData.append('crop_type', getValues().cropType)
  
  const result = await apiClient.post('/analyze', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  
  // Extract damage type from ML model
  setValue('damageType', result.damage_type)
  return result
}
```

#### Step 2: Update Service Layer
```javascript
// In src/services/api/index.js
export const mlApi = {
  analyzeDamage: async (imageFile, cropType) => {
    const formData = new FormData()
    formData.append('image', imageFile)
    formData.append('crop_type', cropType)
    
    const response = await apiClient.post('/analyze', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  }
}
```

#### Step 3: Update Claims Form Component
```javascript
// In onSubmit handler
const onSubmit = async (data) => {
  try {
    // Call ML if image provided
    let aiDamageType = data.damageType
    if (selectedImage) {
      const mlResult = await mlApi.analyzeDamage(selectedImage, data.cropType)
      aiDamageType = mlResult.damage_type
    }

    // Submit claim with AI-enhanced damage type
    await claimsApi.createClaim({
      damage_type: aiDamageType,
      description: data.narrative,
      // ... other fields
    })
  } catch (error) {
    console.error('Error:', error)
  }
}
```

## Current Deployment Status

### Backend Running ✅
- **URL**: http://localhost:8000
- **Chat**: `/api/v1/chat/multilingual` (multilingual support)
- **Weather**: `/api/v1/weather/risk` (flood/drought risk scoring)
- **Auth** (Dev B): Not yet deployed
- **Claims** (Dev B): Not yet deployed
- **ML** (Dev A): Not yet deployed

### Frontend Running ✅
- **URL**: http://localhost:5173
- **All pages built** with form validation
- **API services ready** but waiting for backend endpoints

### What's Working Now
1. ✅ Multilingual chat (English, Hindi, Marathi)
2. ✅ Weather risk scoring  
3. ✅ Form UI with validation

### What's Pending
1. ⏳ Dev B's auth endpoints
2. ⏳ Dev B's claims CRUD endpoints
3. ⏳ Dev A's ML damage detection endpoint

## Demo Walkthrough (For Submission)

### 1. Chat Multilingual Demo
```bash
# Terminal 1: Start backend
python main.py

# Browser: http://localhost:5173
# Navigate to: AI Advisor (Chat)
# - Select language (EN/HI/MR)
# - Ask: "What is PM Fasal Bima?"
# - Response: LLM generates agricultural advice in selected language
```

### 2. Weather Risk Demo
```bash
# Navigate to: Farmer Dashboard
# Weather widget shows:
# - Flood risk %
# - Drought risk %
# - Rainfall (mm)
```

### 3. Claims Form Demo (Pending Dev B Backend)
```bash
# Navigate to: New Claim
# Fill form:
# - Crop type: Wheat
# - Sowing date: 2023-10-15
# - Incident date: 2024-01-15
# - Damage type: Hail
# - Description: Severe hail damage...
# - Click "Submit" (will fail until Dev B deploys auth/claims endpoints)
```

### 4. ML Integration Point (Pending Dev A)
When Dev A provides the `/analyze` endpoint:
- Add image upload button to claim form
- Auto-detect damage type using EfficientNet-B0
- Suggest remediation actions

## Technical Stack

| Component | Technology | Status |
|-----------|-----------|--------|
| Frontend | React 18 + Vite | ✅ Ready |
| Backend Chat | FastAPI + LangChain + Ollama | ✅ Live |
| Backend Weather | FastAPI + Open-Meteo | ✅ Live |
| ML Model | TensorFlow Lite (EfficientNet-B0) | ⏳ Dev A |
| RAG | LangChain + ChromaDB | ✅ Ready |
| i18n | i18next + Google Translate | ✅ Ready |
| PWA | Service Worker + offline support | ✅ Ready |

## Next Steps

1. **Dev A**: Deploy ML endpoint at `/analyze`
2. **Dev B**: Deploy auth/claims/farmers/grievances endpoints
3. **Team**: Run full end-to-end test
4. **Demo**: Show complete workflow to evaluators
