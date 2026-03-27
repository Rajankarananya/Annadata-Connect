"""
Chat Route - RAG-powered agricultural chatbot
Provides farmers with information about government schemes using PDF documents.
If no PDFs are available, falls back to direct LLM responses.
"""

import os
from pathlib import Path
from fastapi import APIRouter, Query, HTTPException

# LangChain imports for RAG pipeline
from langchain_ollama import OllamaLLM
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings import SentenceTransformerEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_classic.chains import RetrievalQA

# Initialize the router
router = APIRouter(tags=["Chat"])

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
qa_chain = None  # Will hold the RetrievalQA chain if PDFs are available
rag_enabled = False  # Flag to track if RAG is set up


def initialize_rag():
    """
    Initialize the RAG pipeline on startup.
    Checks for PDFs in /schemes folder and sets up vector store if found.
    """
    global qa_chain, rag_enabled

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
    embeddings = SentenceTransformerEmbeddings(
        model_name="all-MiniLM-L6-v2"
    )

    # ---------------------------------------------------------------------------
    # Step 4: Store embeddings in ChromaDB vector database
    # persist_directory ensures the database is saved to disk
    # ---------------------------------------------------------------------------
    vectorstore = Chroma.from_documents(
        documents=splits,
        embedding=embeddings,
        persist_directory="./chroma_db"
    )
    print("[INFO] Vector store created and persisted to ./chroma_db")

    # ---------------------------------------------------------------------------
    # Step 5: Create the RetrievalQA chain
    # This combines retrieval from vector store with LLM for answering
    # ---------------------------------------------------------------------------
    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",  # "stuff" puts all retrieved docs into one prompt
        retriever=vectorstore.as_retriever()
    )

    rag_enabled = True
    print("[OK] RAG pipeline initialized successfully!")


# Initialize RAG on module load
initialize_rag()


# ---------------------------------------------------------------------------
# Endpoint 1: Basic Chat (English only)
# POST /chat
# ---------------------------------------------------------------------------
@router.post("/chat")
async def chat(query: str = Query(..., description="User's question about agricultural schemes")):
    """
    Process a user query and return a response.
    Uses RAG (Retrieval-Augmented Generation) if PDFs are loaded,
    otherwise falls back to direct LLM response.

    Args:
        query: The user's question (query parameter)

    Returns:
        JSON with the response text
    """
    try:
        if rag_enabled and qa_chain is not None:
            # Use RAG chain to answer from PDF knowledge base
            result = qa_chain.invoke({"query": query})
            response_text = result.get("result", "Sorry, I couldn't find an answer.")
        else:
            # No PDFs available - answer directly using LLM
            response_text = llm.invoke(query)

        return {"response": response_text}

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing query: {str(e)}"
        )


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
    # Validate language code
    supported_languages = ["en", "hi", "mr"]
    if lang not in supported_languages:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported language '{lang}'. Supported: {supported_languages}"
        )

    try:
        # Get the English response first
        if rag_enabled and qa_chain is not None:
            result = qa_chain.invoke({"query": query})
            response_text = result.get("result", "Sorry, I couldn't find an answer.")
        else:
            response_text = llm.invoke(query)

        # =====================================================================
        # TODO: Bhashini translation will go here (Phase 3)
        # ---------------------------------------------------------------------
        # When implementing Bhashini API integration:
        # 1. If lang != "en", translate response_text to target language
        # 2. Use Bhashini NMT (Neural Machine Translation) API
        # 3. API endpoint: https://dhruva-api.bhashini.gov.in/
        # 4. Supported translations: en->hi, en->mr
        # 5. Handle API errors gracefully, fallback to English if translation fails
        #
        # Example (to be implemented):
        # if lang != "en":
        #     response_text = await translate_with_bhashini(response_text, "en", lang)
        # =====================================================================

        return {
            "response": response_text,
            "lang": lang
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing query: {str(e)}"
        )
