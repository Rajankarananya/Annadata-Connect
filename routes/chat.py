"""
Chat Route - RAG-powered agricultural chatbot
Provides farmers with information about government schemes using PDF documents.
If no PDFs are available, falls back to direct LLM responses.
"""

import json
import os
import asyncio
from pathlib import Path
from typing import Any, Dict, List, Optional

import requests
from fastapi import APIRouter, Body, HTTPException, Query, Request, Response
from fastapi.responses import StreamingResponse
from deep_translator import GoogleTranslator
from pydantic import BaseModel, Field

# LangChain imports for RAG pipeline
from langchain_ollama import OllamaLLM
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings import SentenceTransformerEmbeddings
from langchain_chroma import Chroma

# Initialize the router
router = APIRouter(tags=["Chat"])


def _preflight_response(request: Request) -> Response:
    """Return CORS headers for explicit preflight handling on chat endpoints."""
    configured = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173")
    allowed_origins = [origin.strip() for origin in configured.split(",") if origin.strip()]

    origin = request.headers.get("origin", "")
    requested_headers = request.headers.get("access-control-request-headers", "Authorization,Content-Type")

    response = Response(status_code=204)
    if origin in allowed_origins:
        response.headers["Access-Control-Allow-Origin"] = origin
        response.headers["Vary"] = "Origin"
        response.headers["Access-Control-Allow-Credentials"] = "true"
        response.headers["Access-Control-Allow-Methods"] = "GET,POST,PUT,PATCH,DELETE,OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = requested_headers

    return response

# ---------------------------------------------------------------------------
# LLM Configuration
# Using Ollama with llama3 model running locally
# ---------------------------------------------------------------------------
llm = OllamaLLM(
    model="llama3",
    base_url="http://localhost:11434"
)

# ---------------------------------------------------------------------------
# RAG Components (initialized on startup)
# ---------------------------------------------------------------------------
retriever = None
rag_enabled = False

SUPPORTED_LANGUAGES = {"en", "hi", "mr"}

# Bhashini API credentials (scaffolded for future integration)
BHASHINI_API_KEY = os.getenv("BHASHINI_API_KEY")
BHASHINI_USER_ID = os.getenv("BHASHINI_USER_ID")
BHASHINI_API_BASE_URL = os.getenv("BHASHINI_API_BASE_URL")
LLM_TIMEOUT_SECONDS = int(os.getenv("LLM_TIMEOUT_SECONDS", "120"))


def translate_with_bhashini(text: str, source: str, target: str) -> str:
    """
    Translate using Bhashini API.
    [FUTURE] Currently disabled - use when credentials are ready.
    """
    url = f"{BHASHINI_API_BASE_URL}/translate"
    headers = {
        "userID": BHASHINI_USER_ID,
        "ulcaApiKey": BHASHINI_API_KEY,
        "Content-Type": "application/json",
    }
    payload = {
        "input": [{"source": text}],
        "config": {
            "language": {
                "sourceLanguage": source,
                "targetLanguage": target,
            }
        },
    }

    response = requests.post(url, json=payload, headers=headers, timeout=10)
    response.raise_for_status()
    return response.json()["output"][0]["target"]


def translate_with_google(text: str, source: str, target: str) -> str:
    """Translate using Google Translate via deep-translator (active translation provider)."""
    if source == target:
        return text
    return GoogleTranslator(source=source, target=target).translate(text)


def translate(text: str, source: str, target: str) -> str:
    """
    Smart translation with automatic fallback chain:
    1. Bhashini API (if credentials configured) - FUTURE
    2. Google Translate via deep-translator - ACTIVE
    3. Original text if both fail (never crashes chat)
    """
    if source == target:
        return text

    # Check if Bhashini is configured
    bhashini_configured = (
        BHASHINI_API_KEY
        and BHASHINI_API_KEY != "your_bhashini_api_key_here"
        and BHASHINI_USER_ID
        and BHASHINI_USER_ID != "your_user_id_here"
        and BHASHINI_API_BASE_URL
    )

    # Try Bhashini if configured
    if bhashini_configured:
        try:
            result = translate_with_bhashini(text, source, target)
            print(f"[Translation] Used Bhashini: {source} -> {target}")
            return result
        except Exception as e:
            print(f"[Translation] Bhashini failed ({e}). Falling back to Google Translate.")

    # Try Google Translate (deep-translator) - PRIMARY FALLBACK
    try:
        result = translate_with_google(text, source, target)
        print(f"[Translation] Used Google Translate (deep-translator): {source} -> {target}")
        return result
    except Exception as e:
        print(f"[Translation] Google Translate failed ({e}). Returning original text.")
        return text


def to_english(text: str, lang: str) -> str:
    """Translate user input to English before sending to LLM."""
    return translate(text, source=lang, target="en")


def from_english(text: str, lang: str) -> str:
    """Translate LLM response back to user's language."""
    return translate(text, source="en", target=lang)


class ChatMessage(BaseModel):
    role: str = Field(..., description="Message role: user | assistant | system")
    content: str = Field(..., min_length=1, description="Message text")


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, description="Current user message")
    history: List[ChatMessage] = Field(default_factory=list, description="Conversation history")
    language: str = Field(default="en", description="Response language: en | hi | mr")
    stream: bool = Field(default=False, description="If true, returns SSE stream")


def format_docs(docs):
    """Format retrieved documents into a single string for the prompt."""
    return "\n\n".join(doc.page_content for doc in docs)


def initialize_rag():
    """
    Initialize the RAG pipeline on startup.
    Checks for PDFs in /schemes folder and sets up vector store if found.
    """
    global retriever, rag_enabled

    # Path to the schemes folder containing PDF documents
    schemes_dir = Path("./schemes")

    # Check if schemes directory exists and contains PDF files
    if not schemes_dir.exists():
        print("[INFO] /schemes folder not found. Running in direct LLM mode.")
        return

    pdf_files = list(schemes_dir.glob("*.pdf"))

    if not pdf_files:
        print("[INFO] No PDF files found in /schemes. Running in direct LLM mode.")
        return

    print(f"[INFO] Found {len(pdf_files)} PDF file(s). Setting up RAG pipeline...")

    # ---------------------------------------------------------------------------
    # Step 1: Load all PDF documents
    # ---------------------------------------------------------------------------
    all_documents = []
    for pdf_path in pdf_files:
        try:
            loader = PyPDFLoader(str(pdf_path))
            documents = loader.load()
            all_documents.extend(documents)
            print(f"  [OK] Loaded: {pdf_path.name}")
        except Exception as e:
            print(f"  [FAIL] Failed to load {pdf_path.name}: {e}")

    if not all_documents:
        print("[WARN] No documents could be loaded. Running in direct LLM mode.")
        return

    # ---------------------------------------------------------------------------
    # Step 2: Split documents into chunks for better retrieval
    # chunk_size=500: Each chunk contains ~500 characters
    # chunk_overlap=50: Chunks overlap by 50 chars to preserve context
    # ---------------------------------------------------------------------------
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50
    )
    splits = text_splitter.split_documents(all_documents)
    print(f"[INFO] Created {len(splits)} text chunks from documents")

    # ---------------------------------------------------------------------------
    # Step 3: Create embeddings using SentenceTransformers
    # all-MiniLM-L6-v2 is a lightweight, fast embedding model
    # ---------------------------------------------------------------------------
    try:
        embeddings = SentenceTransformerEmbeddings(
            model_name="all-MiniLM-L6-v2"
        )
    except Exception as e:
        print(f"[WARN] Embedding model init failed ({e}). Running in direct LLM mode.")
        return

    # ---------------------------------------------------------------------------
    # Step 4: Store embeddings in ChromaDB vector database
    # persist_directory ensures the database is saved to disk
    # ---------------------------------------------------------------------------
    try:
        vectorstore = Chroma.from_documents(
            documents=splits,
            embedding=embeddings,
            persist_directory="./chroma_db"
        )
    except Exception as e:
        print(f"[WARN] Failed to create vector store ({e}). Running in direct LLM mode.")
        return
    print("[INFO] Vector store created and persisted to ./chroma_db")

    # ---------------------------------------------------------------------------
    # Step 5: Create retriever for runtime prompt construction
    # ---------------------------------------------------------------------------
    retriever = vectorstore.as_retriever(search_kwargs={"k": 4})

    rag_enabled = True
    print("[OK] RAG pipeline initialized successfully!")


# Initialize RAG on module load
initialize_rag()


def _build_history_text(history: List[ChatMessage]) -> str:
    if not history:
        return ""

    # Keep the latest turns to keep prompts efficient for local models.
    recent = history[-8:]
    lines = [f"{m.role.upper()}: {m.content}" for m in recent]
    return "\n".join(lines)


def _build_prompt(message: str, history: List[ChatMessage], language: str, context: str) -> str:
    language_map = {"en": "English", "hi": "Hindi", "mr": "Marathi"}
    lang_name = language_map.get(language, "English")

    history_text = _build_history_text(history)

    return f"""You are Annadata Connect assistant for farmers.
Use simple, practical guidance and mention government scheme context when relevant.
Respond in {lang_name}.

Context from documents:
{context if context else 'No document context available.'}

Conversation history:
{history_text if history_text else 'No previous messages.'}

Current user question:
{message}
"""


def _get_context(message: str) -> str:
    if not rag_enabled or retriever is None:
        return ""

    docs = retriever.invoke(message)
    if not docs:
        return ""
    return format_docs(docs)


def _sse_stream(prompt: str, language: str):
    accumulated = ""

    for chunk in llm.stream(prompt):
        text = chunk if isinstance(chunk, str) else str(chunk)
        accumulated += text
        yield f"data: {json.dumps({'delta': text})}\n\n"

    yield f"data: {json.dumps({'done': True, 'response': accumulated, 'lang': language})}\n\n"


async def _invoke_llm(prompt: str) -> str:
    """Run blocking LLM call in a thread with timeout protection."""
    try:
        return await asyncio.wait_for(
            asyncio.to_thread(llm.invoke, prompt),
            timeout=LLM_TIMEOUT_SECONDS,
        )
    except asyncio.TimeoutError as e:
        raise HTTPException(
            status_code=504,
            detail=(
                f"LLM request timed out after {LLM_TIMEOUT_SECONDS}s. "
                "Ensure Ollama is running at http://localhost:11434"
            ),
        ) from e
    except Exception as e:
        raise HTTPException(
            status_code=503,
            detail=f"LLM backend unavailable: {str(e)}",
        ) from e


def _resolve_request_payload(
    payload: Optional[ChatRequest],
    query: Optional[str],
    lang: Optional[str],
    stream: Optional[bool],
) -> ChatRequest:
    if payload is not None:
        return payload

    if not query:
        raise HTTPException(
            status_code=400,
            detail="Provide either JSON body {message, history, language, stream} or ?query=...",
        )

    return ChatRequest(
        message=query,
        history=[],
        language=lang or "en",
        stream=bool(stream),
    )


# ---------------------------------------------------------------------------
# Endpoint 1: Basic Chat (English only)
# POST /chat
# ---------------------------------------------------------------------------
@router.post("/chat")
async def chat(
    payload: Optional[ChatRequest] = Body(default=None),
    query: Optional[str] = Query(default=None, description="Legacy query param support"),
    lang: Optional[str] = Query(default=None, description="Legacy language query param support"),
    stream: Optional[bool] = Query(default=None, description="Legacy streaming query param support"),
):
    """
    Process a user query and return a response.
    Uses RAG (Retrieval-Augmented Generation) if PDFs are loaded,
    otherwise falls back to direct LLM response.

    Args:
        payload: JSON body with message, history, language, stream
        query/lang/stream: legacy query-param fallback

    Returns:
        JSON with response text, or SSE stream when stream=true
    """
    request_data = _resolve_request_payload(payload, query, lang, stream)

    if request_data.language not in SUPPORTED_LANGUAGES:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported language '{request_data.language}'. Supported: {sorted(SUPPORTED_LANGUAGES)}",
        )

    try:
        context = _get_context(request_data.message)
        prompt = _build_prompt(
            message=request_data.message,
            history=request_data.history,
            language=request_data.language,
            context=context,
        )

        if request_data.stream:
            return StreamingResponse(
                _sse_stream(prompt, request_data.language),
                media_type="text/event-stream",
                headers={"Cache-Control": "no-cache"},
            )

        response_text = await _invoke_llm(prompt)
        return {
            "response": response_text,
            "lang": request_data.language,
            "source": "rag" if context else "llm",
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing query: {str(e)}"
        )


@router.options("/chat")
async def chat_preflight(request: Request):
    return _preflight_response(request)


# ---------------------------------------------------------------------------
# Endpoint 2: Multilingual Chat
# POST /chat/multilingual
# ---------------------------------------------------------------------------
@router.post("/chat/multilingual")
async def chat_multilingual(
    query: str = Query(..., description="User's question about agricultural schemes"),
    lang: str = Query(default="en", description="Response language: 'en', 'hi', or 'mr'")
):
    """
    Process a user query and return a response in the specified language.
    Supports English (en), Hindi (hi), and Marathi (mr).

    Args:
        query: The user's question (query parameter)
        lang: Target language code - 'en' (default), 'hi', or 'mr'

    Returns:
        JSON with the response text and language code
    """
    if lang not in SUPPORTED_LANGUAGES:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported language '{lang}'. Supported: {sorted(SUPPORTED_LANGUAGES)}"
        )

    try:
        english_query = to_english(query, lang)
        context = _get_context(english_query)
        prompt = _build_prompt(
            message=english_query,
            history=[],
            language="en",
            context=context,
        )
        llm_response_text = await _invoke_llm(prompt)
        response_text = from_english(llm_response_text, lang)

        return {
            "response": response_text,
            "lang": lang,
            "source": "rag" if context else "llm",
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing query: {str(e)}"
        )


@router.options("/chat/multilingual")
async def chat_multilingual_preflight(request: Request):
    return _preflight_response(request)
