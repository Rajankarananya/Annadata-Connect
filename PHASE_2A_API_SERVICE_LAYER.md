# Phase 2A - API Service Layer Documentation

## Overview
Phase 2A consists of building the **API service layer** that connects React frontend to FastAPI backend.

### Status
- ✅ **Existing Endpoints (Ready to Use):**
  - `/chat/multilingual` - Chatbot endpoint
  - `/weather/risk` - Weather risk assessment

- ⏳ **Pending Endpoints (Waiting for Dev B):**
  - `/auth/login`, `/auth/register`, `/auth/logout`
  - `/farmers` (GET, PUT)
  - `/claims` (POST, GET, PATCH)
  - `/grievances` (POST, GET, PATCH)

---

## File Structure

```
src/
├── services/
│   └── api/
│       ├── client.js          ✅ Axios instance (existing)
│       └── index.js           ✅ NEW - All API services
├── context/
│   └── AuthContext.jsx        ✅ NEW - Auth state management
├── hooks/
│   └── useApi.js              ✅ NEW - Custom hooks for API calls
└── utils/
    └── apiErrors.js           ✅ NEW - Error handling utilities
```

---

## Quick Start

### 1. Using Chat Service

```jsx
import { useApi } from '@/hooks/useApi'
import { chatApi } from '@/services/api'

function ChatWidget() {
  const { data, loading, error, execute } = useApi()

  const handleSendMessage = async (message, language = 'en') => {
    try {
      const result = await execute(
        () => chatApi.sendMessage(message, language),
        {
          onSuccess: (result) => console.log('Response:', result),
          onError: (err) => console.error('Chat error:', err),
        }
      )
    } catch (err) {
      // error is already set in state
    }
  }

  return (
    <div>
      <input onSubmit={(msg) => handleSendMessage(msg)} />
      {loading && <p>Sending...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {data && <p>{data.response}</p>}
    </div>
  )
}
```

### 2. Using Weather Service

```jsx
import { useApiList } from '@/hooks/useApi'
import { weatherApi } from '@/services/api'

function WeatherCard({ latitude, longitude }) {
  const { data, loading, error, execute } = useApi()

  useEffect(() => {
    execute(() => weatherApi.getRiskScore(latitude, longitude))
  }, [latitude, longitude])

  if (loading) return <div>Loading weather...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div>
      <p>Flood Risk: {data?.flood_risk}%</p>
      <p>Drought Risk: {data?.drought_risk}%</p>
    </div>
  )
}
```

### 3. Using Mutation Hook (Claims)

```jsx
import { useApiMutation } from '@/hooks/useApi'
import { claimsApi } from '@/services/api'

function NewClaimForm() {
  const { loading, error, success, mutate } = useApiMutation()
  const [formData, setFormData] = useState({
    crop_type: '',
    sowing_date: '',
    damage_description: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await mutate(
        () => claimsApi.createClaim(formData),
        {
          onSuccess: (result) => {
            console.log('Claim submitted:', result)
            // Redirect to claim details
          },
        }
      )
    } catch (err) {
      // error is already set in state
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-500">Claim submitted!</div>}
      <button disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Claim'}
      </button>
    </form>
  )
}
```

### 4. Auth Context Setup

Add to `src/App.jsx`:

```jsx
import { AuthProvider } from '@/context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <YourRoutes />
    </AuthProvider>
  )
}
```

Use in components:

```jsx
import { useAuth } from '@/context/AuthContext'

function Dashboard() {
  const { user, role, isAuthenticated, logout } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return (
    <div>
      Welcome {user?.name}!
      <button onClick={logout}>Logout</button>
    </div>
  )
}
```

---

## API Services Reference

### chatApi
```javascript
chatApi.sendMessage(message, language)
  // GET /chat/multilingual?query={message}&lang={language}
  // Returns: {response, lang, source}

chatApi.sendMessageWithHistory(message, history, language, stream)
  // POST /chat
  // Returns: {response, lang, source}
```

### weatherApi
```javascript
weatherApi.getRiskScore(latitude, longitude)
  // GET /weather/risk?latitude={lat}&longitude={lon}
  // Returns: {flood_risk, drought_risk, rainfall, timestamp}
```

### authApi (Placeholder - Waiting for Dev B)
```javascript
authApi.login(email, password)
authApi.register(data)
authApi.logout()
```

### claimsApi (Placeholder - Waiting for Dev B)
```javascript
claimsApi.createClaim(data)
claimsApi.listClaims(filters)
claimsApi.getClaimDetails(claimId)
claimsApi.updateStatus(claimId, data)
```

### grievancesApi (Placeholder - Waiting for Dev B)
```javascript
grievancesApi.createGrievance(data)
grievancesApi.listGrievances(filters)
grievancesApi.getGrievanceDetails(grievanceId)
grievancesApi.updateStatus(grievanceId, data)
```

### farmersApi (Placeholder - Waiting for Dev B)
```javascript
farmersApi.getProfile(farmerId)
farmersApi.updateProfile(farmerId, data)
```

---

## Error Handling

### useApi Hook
```jsx
const { data, loading, error, execute } = useApi()

// Execute with error callbacks
await execute(
  async () => apiFunction(),
  {
    onSuccess: (result) => { /* handle success */ },
    onError: (err) => { /* handle error */ },
    retries: 2,  // Retry failed requests 2 times
    onRetry: (attempt) => console.log(`Retrying... attempt ${attempt}`),
  }
)
```

### Error Utilities
```javascript
import {
  getErrorMessage,        // Convert error to user-friendly string
  isAuthError,            // Check if 401/403
  isValidationError,      // Check if 422/400
  isServerError,          // Check if 5xx
  isNetworkError,         // Check if network down
  getValidationErrors,    // Extract field errors
  shouldRetry,            // Determine if request should retry
} from '@/utils/apiErrors'

// Example: Retry on server errors
if (shouldRetry(error)) {
  // Retry logic
}
```

---

## Awaiting Dev B - Migration Checklist

Once Dev B provides endpoint contracts, update these placeholders:

### In `src/services/api/index.js`:

1. **Auth Endpoints** (lines ~61-89)
   - [ ] `POST /auth/login` - request/response format
   - [ ] `POST /auth/register` - request schema
   - [ ] `POST /auth/logout` - endpoint

2. **Claims Endpoints** (lines ~110-157)
   - [ ] `POST /claims` - file upload handling?
   - [ ] `GET /claims` - filtering support?
   - [ ] `PATCH /claims/{id}/status` - response format?

3. **Grievances Endpoints** (lines ~159-205)
   - [ ] `POST /grievances` - auto-category tagging?
   - [ ] `GET /grievances` - priority field name?

4. **Farmers Endpoints** (lines ~91-108)
   - [ ] `GET /farmers/{id}` - fields returned?
   - [ ] `PUT /farmers/{id}` - validation rules?

### In `src/context/AuthContext.jsx`:

1. Update `login()` and `register()` functions to call actual `authApi` methods
2. Handle JWT token storage (check if `Bearer` header or cookie)
3. Implement token refresh logic if needed

---

## Testing Phase 2A

### Manual Testing (Before full integration)

```bash
# Test chat endpoint
curl -X GET "http://localhost:8000/api/v1/chat/multilingual?query=Hello&lang=en"

# Test weather endpoint
curl -X GET "http://localhost:8000/api/v1/weather/risk?latitude=20.5937&longitude=78.9629"
```

### Integration Testing
- [ ] Chat page sends message → receives response
- [ ] Weather dashboard calls risk endpoint → displays data
- [ ] Auth context updates on login
- [ ] Error messages display correctly
- [ ] Loading states show during requests
- [ ] Retry logic works on transient errors

---

## Next Steps

### Phase 2B (When Dev B provides contracts)
1. Update `/auth/*` endpoints
2. Update `/farmers/*` endpoints
3. Update `/claims/*` endpoints
4. Update `/grievances/*` endpoints
5. Integrate with ChatbotPage, NewClaimPage, AuthPages
6. Test full user flows

### Current Blockers
- ⏳ Waiting for Dev B API contracts
- ⏳ Waiting for Dev A `/analyze-damage` ML endpoint

---

## Files Created

| File | Purpose | Status |
|------|---------|--------|
| `src/services/api/index.js` | All API services | ✅ Ready |
| `src/context/AuthContext.jsx` | Auth state mgmt | ✅ Ready |
| `src/hooks/useApi.js` | API custom hooks | ✅ Ready |
| `src/utils/apiErrors.js` | Error handling | ✅ Ready |

Total: 4 new files, ~500 lines of code
