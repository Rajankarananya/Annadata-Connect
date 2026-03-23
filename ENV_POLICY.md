# Team Environment Variable Policy

This project uses a shared template in `.env.example` and local values in each developer's `.env`.

## Rules

1. Commit `.env.example` to Git.
2. Never commit `.env` to Git.
3. Keep variable names identical for everyone.
4. For local development, team-owned dev secrets may be shared inside the team.
5. For production/staging, secrets are managed by one owner and rotated regularly.

## Variable Ownership Matrix

| Variable | Local Dev (Team) | Personal/Per Member | Shared in Repo (`.env.example`) | Production |
|---|---|---|---|---|
| APP_NAME | Shared | No | Yes (placeholder/default) | Shared |
| ENVIRONMENT | Shared | No | Yes | Shared |
| DEBUG | Shared | No | Yes | Shared |
| API_V1_PREFIX | Shared | No | Yes | Shared |
| BACKEND_HOST | Shared | No | Yes | Shared |
| BACKEND_PORT | Shared | No | Yes | Shared |
| FRONTEND_URL | Shared | No | Yes | Shared |
| CORS_ORIGINS | Shared | No | Yes | Shared |
| POSTGRES_USER | Shared | No | Yes | Shared |
| POSTGRES_PASSWORD | Usually shared for local Docker | Optional personal | Yes (placeholder) | Shared secret (managed) |
| POSTGRES_DB | Shared | No | Yes | Shared |
| POSTGRES_HOST | Shared | No | Yes | Shared |
| POSTGRES_PORT | Shared | No | Yes | Shared |
| POSTGIS_REQUIRED | Shared | No | Yes | Shared |
| DATABASE_URL | Shared format | May differ by machine | Yes (placeholder) | Shared secret (managed) |
| JWT_SECRET_KEY | Shared for local dev only | Optional personal | Yes (placeholder) | Shared secret (managed) |
| JWT_ALGORITHM | Shared | No | Yes | Shared |
| JWT_ACCESS_TOKEN_EXPIRE_MINUTES | Shared | No | Yes | Shared |
| JWT_REFRESH_TOKEN_EXPIRE_DAYS | Shared | No | Yes | Shared |
| AUTH_ALLOWED_ROLES | Shared | No | Yes | Shared |
| VITE_APP_NAME | Shared | No | Yes | Shared |
| VITE_API_BASE_URL | Shared | No | Yes | Shared |
| VITE_DEFAULT_LANGUAGE | Shared | Optional personal | Yes | Shared |
| TFLITE_MODEL_PATH | Shared | May differ by local path | Yes | Shared |
| TFLITE_LABELS_PATH | Shared | May differ by local path | Yes | Shared |
| MODEL_INPUT_SIZE | Shared | No | Yes | Shared |
| MODEL_CONFIDENCE_THRESHOLD | Shared | No | Yes | Shared |
| OLLAMA_BASE_URL | Shared | No | Yes | Shared |
| OLLAMA_MODEL | Shared | Optional personal | Yes | Shared |
| OLLAMA_TEMPERATURE | Shared | Optional personal | Yes | Shared |
| OLLAMA_NUM_CTX | Shared | Optional personal | Yes | Shared |
| LANGCHAIN_TRACING_V2 | Shared | Optional personal | Yes | Shared |
| LANGCHAIN_API_KEY | Optional shared (team LangSmith) | Often personal | Yes (placeholder) | Shared secret (managed) |
| CHROMA_PERSIST_DIRECTORY | Shared | May differ by machine | Yes | Shared |
| RAG_COLLECTION_NAME | Shared | No | Yes | Shared |
| RAG_CHUNK_SIZE | Shared | No | Yes | Shared |
| RAG_CHUNK_OVERLAP | Shared | No | Yes | Shared |
| RAG_TOP_K | Shared | No | Yes | Shared |
| BHASHINI_API_BASE_URL | Shared | No | Yes | Shared |
| BHASHINI_API_KEY | Shared team key or personal key | Often personal | Yes (placeholder) | Shared secret (managed) |
| BHASHINI_USER_ID | Shared team ID or personal ID | Often personal | Yes (placeholder) | Shared secret (managed) |
| BHASHINI_SOURCE_LANGUAGE | Shared | No | Yes | Shared |
| BHASHINI_TARGET_LANGUAGES | Shared | No | Yes | Shared |
| OPEN_METEO_BASE_URL | Shared | No | Yes | Shared |
| WEATHER_DEFAULT_TIMEZONE | Shared | Optional personal | Yes | Shared |
| ADMIN_EMAIL | Shared for demo | Optional personal | Yes | Shared admin account |
| ADMIN_PASSWORD | Shared for demo | Optional personal | Yes (placeholder) | Shared secret (managed) |

## Recommended Team Workflow

1. Pull latest code from Git.
2. Copy `.env.example` to `.env`.
3. Replace only placeholder secrets and machine-specific values.
4. Run Docker services with the same variable names.
5. Never paste production secrets into chats or commits.

## Minimum Fields Each Member Must Set in `.env`

- `POSTGRES_PASSWORD`
- `JWT_SECRET_KEY`
- `ADMIN_PASSWORD`
- `BHASHINI_API_KEY` and `BHASHINI_USER_ID` (if translation is being tested)
- `LANGCHAIN_API_KEY` (only if tracing is enabled)
