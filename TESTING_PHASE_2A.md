# Phase 2A Testing Guide

## Prerequisites
- FastAPI backend running: `python main.py` (port 8000)
- Frontend running: `npm run dev` (port 5173)
- Ollama running for LLM: `ollama serve llama3` (port 11434)
- Postman or curl for API testing

---

## Test 1: Backend Endpoint Tests (Postman or curl)

### Chat Endpoint ✅

**Endpoint:** `GET /api/v1/chat/multilingual`

**Test Case 1: English**
```
GET http://localhost:8000/api/v1/chat/multilingual?query=Hello&lang=en
```

Expected Response (200 OK):
```json
{
  "response": "Hello! How can I help you today?",
  "lang": "en",
  "source": "llm"
}
```

**Test Case 2: Hindi**
```
GET http://localhost:8000/api/v1/chat/multilingual?query=नमस्ते&lang=hi
```

Expected Response (200 OK):
```json
{
  "response": "नमस्ते! मैं आपकी कैसे मदद कर सकता हूं?",
  "lang": "hi",
  "source": "llm"
}
```

**Test Case 3: Invalid Language**
```
GET http://localhost:8000/api/v1/chat/multilingual?query=Hello&lang=xx
```

Expected Response (400 Bad Request):
```json
{
  "detail": "Unsupported language 'xx'. Supported: ['en', 'hi', 'mr']"
}
```

---

### Weather Endpoint ✅

**Endpoint:** `GET /api/v1/weather/risk`

**Test Case 1: Valid Coordinates**
```
GET http://localhost:8000/api/v1/weather/risk?latitude=20.5937&longitude=78.9629
```

Expected Response (200 OK):
```json
{
  "flood_risk": 45.2,
  "drought_risk": 12.5,
  "rainfall": 250.5,
  "timestamp": "2026-04-10T10:30:00Z"
}
```

**Test Case 2: Invalid Latitude**
```
GET http://localhost:8000/api/v1/weather/risk?latitude=91&longitude=78.9629
```

Expected Response (422 Unprocessable Entity):
```json
{
  "detail": [
    {
      "loc": ["query", "latitude"],
      "msg": "ensure this value is less than or equal to 90"
    }
  ]
}
```

---

## Test 2: Browser Console Tests

### Setup
1. Start backend: `python main.py`
2. Start frontend: `npm run dev`
3. Open browser: http://localhost:5173
4. Open DevTools: F12 → Console tab

### Test Chat API
```javascript
// Import services
import { chatApi } from './src/services/api/index.js'

// Test 1: Send message in English
const response = await chatApi.sendMessage("Tell me about crop insurance", "en")
console.log("Response:", response)
// Expected: {response: "...", lang: "en", source: "llm" or "rag"}

// Test 2: Send message in Hindi
const responseHi = await chatApi.sendMessage("फसल बीमा के बारे में बताएं", "hi")
console.log("Hindi Response:", responseHi)
// Expected: {response: "फसल बीमा...", lang: "hi", source: "..."}

// Test 3: Check error handling (invalid language)
try {
  await chatApi.sendMessage("Hello", "invalid")
} catch (error) {
  console.log("Error caught:", getErrorMessage(error))
  // Expected: "Unsupported language 'invalid'. Supported: ..."
}
```

### Test Weather API
```javascript
import { weatherApi } from './src/services/api/index.js'

// Test 1: Get risk score
const risk = await weatherApi.getRiskScore(20.5937, 78.9629)
console.log("Weather Risk:", risk)
// Expected: {flood_risk: 45.2, drought_risk: 12.5, rainfall: 250.5, timestamp: "..."}

// Test 2: Check error handling (invalid latitude)
try {
  await weatherApi.getRiskScore(91, 78.9629)
} catch (error) {
  console.log("Error:", getErrorMessage(error))
  // Expected: error message about latitude
}
```

### Test Error Handling Utils
```javascript
import {
  getErrorMessage,
  isAuthError,
  isValidationError,
  isNetworkError
} from './src/utils/apiErrors.js'

// When you catch an error, test these:
try {
  await chatApi.sendMessage("...", "en")
} catch (error) {
  console.log("User message:", getErrorMessage(error))
  console.log("Is auth error?:", isAuthError(error))
  console.log("Is validation error?:", isValidationError(error))
  console.log("Is network error?:", isNetworkError(error))
}
```

### Test useApi Hook
```javascript
import { useApi } from './src/hooks/useApi.js'

// In a React component:
function TestChat() {
  const { data, loading, error, execute } = useApi()

  const handleTest = async () => {
    try {
      await execute(
        () => chatApi.sendMessage("Hello", "en"),
        {
          onSuccess: (result) => console.log("✅ Success:", result),
          onError: (err) => console.log("❌ Error:", err),
          retries: 2,
        }
      )
    } catch (err) {
      console.log("Failed after retries")
    }
  }

  return (
    <div>
      <button onClick={handleTest} disabled={loading}>
        {loading ? "Testing..." : "Test Chat"}
      </button>
      {error && <p style={{color: 'red'}}>{error}</p>}
      {data && <p style={{color: 'green'}}>{data.response}</p>}
    </div>
  )
}
```

---

## Test 3: Integration Tests (In React Pages)

### ChatbotPage Integration Test

File: `src/features/farmer/pages/ChatbotPage.jsx`

```javascript
import { useApi } from '@/hooks/useApi'
import { chatApi } from '@/services/api'
import { getErrorMessage } from '@/utils/apiErrors'
import { useState } from 'react'

export function ChatbotPage() {
  const { data, loading, error, execute } = useApi()
  const [messages, setMessages] = useState([])
  const language = localStorage.getItem('language') || 'en'

  const handleSendMessage = async (text) => {
    setMessages(prev => [...prev, { role: 'user', content: text }])

    try {
      await execute(
        () => chatApi.sendMessage(text, language),
        {
          onSuccess: (result) => {
            setMessages(prev => [...prev, { role: 'assistant', content: result.response }])
          },
          onError: (err) => {
            setMessages(prev => [...prev, { role: 'error', content: getErrorMessage(err) }])
          },
          retries: 2,
        }
      )
    } catch (err) {
      console.error('Chat failed:', err)
    }
  }

  return (
    <div className="chatbot">
      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
        {loading && <div className="typing">Thinking...</div>}
      </div>

      <input
        onSubmit={(e) => handleSendMessage(e.target.value)}
        placeholder="Ask about crop schemes..."
        disabled={loading}
      />
    </div>
  )
}
```

**Manual Test:**
1. Go to ChatbotPage
2. Type: "Tell me about PM-KISAN scheme"
3. Verify: Response appears
4. Verify: No error messages
5. Verify: Loading state shows while waiting

---

## Test 4: Error Scenarios

### Scenario 1: Network Down
```
1. Stop backend: Ctrl+C
2. Try chat API: await chatApi.sendMessage("Hello", "en")
3. Expected error: "Network error. Check your connection."
4. Start backend again
```

### Scenario 2: Invalid Input
```
1. Try: await chatApi.sendMessage("", "en")
2. Expected error: 422 validation error
3. Verify: getErrorMessage(error) returns user-friendly text
```

### Scenario 3: LLM Timeout
```
1. Stop Ollama: Ctrl+C
2. Try chat API: await chatApi.sendMessage("Hello", "en")
3. Expected error: "LLM request timed out..."
4. Verify: Retry logic kicks in (wait ~2 seconds, see retry message)
5. Start Ollama again
```

---

## Test Checklist ✅

| Test | Manual | Automated | Status |
|------|--------|-----------|--------|
| Chat endpoint exists | ✅ curl | — | Ready |
| Weather endpoint exists | ✅ curl | — | Ready |
| Chat API service works | ✅ console | — | Ready |
| Weather API service works | ✅ console | — | Ready |
| Error handling works | ✅ console | — | Ready |
| useApi hook works | ✅ component | — | Pending |
| ChatbotPage integration | ✅ page | — | Pending |
| Dashboard weather widget | ✅ page | — | Pending |
| Error retries work | ✅ manual | — | Pending |
| Auth context ready | — | — | Pending (Dev B) |

---

## Commands to Run Tests

### Quick Backend Test
```bash
# Terminal 1: Start backend
cd /c/Users/HP/Desktop/Annadata/Annadata-Connect
python main.py

# Terminal 2: Test chat
curl "http://localhost:8000/api/v1/chat/multilingual?query=Hello&lang=en"

# Terminal 2: Test weather
curl "http://localhost:8000/api/v1/weather/risk?latitude=20.5937&longitude=78.9629"
```

### Full Test (Backend + Frontend)
```bash
# Terminal 1: Start Ollama (if not running)
ollama serve llama3

# Terminal 2: Start backend
python main.py

# Terminal 3: Start frontend
npm run dev

# Then open http://localhost:5173 and test in console
```

---

## Report Issues

If any test fails:
1. Check backend logs: `python main.py` output
2. Check frontend logs: Browser DevTools Console (F12)
3. Verify .env variables: `VITE_API_BASE_URL=http://localhost:8000/api/v1`
4. Check network tab in DevTools: See actual API requests/responses

---

## Next: When Dev B Provides Contracts

Once Dev B gives us `/auth`, `/claims`, `/grievances` endpoints:
1. Update src/services/api/index.js with real endpoints
2. Test each new endpoint
3. Wire to corresponding pages
4. Add to this test checklist
