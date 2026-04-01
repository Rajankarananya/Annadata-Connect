"""
Ingest PDF documents into ChromaDB vector store for RAG pipeline.

This script:
1. Reads all PDF files from ./schemes folder
2. Uses PyPDFLoader to load each PDF
3. Splits documents into chunks using RecursiveCharacterTextSplitter
4. Creates embeddings using OllamaEmbeddings
5. Stores embeddings in ChromaDB with persistence

Configuration is read from .env file:
- CHROMA_PERSIST_DIRECTORY: Where to store ChromaDB
- RAG_COLLECTION_NAME: Name of the ChromaDB collection
- RAG_CHUNK_SIZE: Size of text chunks
- RAG_CHUNK_OVERLAP: Overlap between chunks
- OLLAMA_BASE_URL: URL of Ollama service
- OLLAMA_MODEL: Which Ollama model to use for embeddings
"""

import os
import sys
from pathlib import Path
from typing import List

from dotenv import load_dotenv

# LangChain imports
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings import OllamaEmbeddings
from langchain_chroma import Chroma

# Load environment variables from .env
load_dotenv()


def get_config() -> dict:
    """
    Read configuration from environment variables.

    Returns:
        dict: Configuration with keys for chroma_persist_dir, collection_name,
              chunk_size, chunk_overlap, ollama_base_url, ollama_model
    """
    chroma_dir = os.getenv("CHROMA_PERSIST_DIRECTORY", "./data/chroma")
    collection_name = os.getenv("RAG_COLLECTION_NAME", "annadata_connect_docs")
    chunk_size = int(os.getenv("RAG_CHUNK_SIZE", "1000"))
    chunk_overlap = int(os.getenv("RAG_CHUNK_OVERLAP", "200"))
    ollama_base_url = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
    ollama_model = os.getenv("OLLAMA_MODEL", "llama3")

    return {
        "chroma_persist_dir": chroma_dir,
        "collection_name": collection_name,
        "chunk_size": chunk_size,
        "chunk_overlap": chunk_overlap,
        "ollama_base_url": ollama_base_url,
        "ollama_model": ollama_model,
    }


def get_pdf_files(schemes_dir: Path) -> List[Path]:
    """
    Get all PDF files from schemes directory.

    Args:
        schemes_dir: Path to schemes directory

    Returns:
        List of PDF file paths sorted by name
    """
    if not schemes_dir.exists():
        print(f"[WARN] Schemes directory not found: {schemes_dir}")
        return []

    pdf_files = sorted(schemes_dir.glob("*.pdf"))

    if not pdf_files:
        print(f"[WARN] No PDF files found in: {schemes_dir}")
        return []

    return pdf_files


def load_pdfs(pdf_files: List[Path]) -> tuple:
    """
    Load all PDF files using PyPDFLoader.

    Args:
        pdf_files: List of PDF file paths

    Returns:
        tuple: (list of loaded documents, dict of errors encountered)
    """
    all_documents = []
    errors = {}

    for pdf_path in pdf_files:
        try:
            print(f"  Loading: {pdf_path.name}...", end=" ")
            loader = PyPDFLoader(str(pdf_path))
            documents = loader.load()
            all_documents.extend(documents)
            print(f"[OK] ({len(documents)} pages)")
        except Exception as e:
            error_msg = str(e)
            errors[pdf_path.name] = error_msg
            print(f"[FAIL] ERROR: {error_msg}")

    return all_documents, errors


def split_documents(documents: list, chunk_size: int, chunk_overlap: int) -> list:
    """
    Split documents into chunks using RecursiveCharacterTextSplitter.

    Args:
        documents: List of loaded documents
        chunk_size: Size of each chunk
        chunk_overlap: Overlap between chunks

    Returns:
        List of document chunks
    """
    print(f"\n[INFO] Splitting documents into chunks...")
    print(f"       Chunk size: {chunk_size}, Overlap: {chunk_overlap}")

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap,
        separators=["\n\n", "\n", " ", ""]
    )

    chunks = splitter.split_documents(documents)
    print(f"[OK] Created {len(chunks)} chunks from {len(documents)} documents")

    return chunks


def create_embeddings_and_store(
    chunks: list,
    config: dict
) -> bool:
    """
    Create embeddings using OllamaEmbeddings and store in ChromaDB.

    Args:
        chunks: List of document chunks
        config: Configuration dictionary

    Returns:
        bool: True if successful, False otherwise
    """
    try:
        print(f"\n[INFO] Creating embeddings using Ollama model: {config['ollama_model']}")
        print(f"       Ollama URL: {config['ollama_base_url']}")

        embeddings = OllamaEmbeddings(
            model=config["ollama_model"],
            base_url=config["ollama_base_url"]
        )

        # Test embeddings by creating a single embedding
        print("       Testing embeddings...", end=" ")
        test_embedding = embeddings.embed_query("test")
        print(f"[OK] (embedding dim: {len(test_embedding)})")

        print(f"\n[INFO] Storing in ChromaDB...")
        print(f"       Persist dir: {config['chroma_persist_dir']}")
        print(f"       Collection: {config['collection_name']}")

        vectorstore = Chroma.from_documents(
            documents=chunks,
            embedding=embeddings,
            collection_name=config["collection_name"],
            persist_directory=config["chroma_persist_dir"]
        )

        print(f"[OK] ChromaDB collection created successfully!")
        print(f"     Total documents stored: {len(chunks)}")

        return True

    except Exception as e:
        print(f"[ERROR] Failed to create embeddings/store: {str(e)}")
        print("[ERROR] Make sure Ollama is running at: " + config["ollama_base_url"])
        return False


def main():
    """Main ingestion workflow."""
    print("=" * 70)
    print("Annadata Connect - PDF Ingestion into ChromaDB")
    print("=" * 70)

    # Get configuration
    config = get_config()
    print(f"\n[INFO] Configuration loaded:")
    print(f"       Chunk size: {config['chunk_size']}")
    print(f"       Chunk overlap: {config['chunk_overlap']}")
    print(f"       ChromaDB dir: {config['chroma_persist_dir']}")
    print(f"       Collection: {config['collection_name']}")

    # Create schemes directory path
    schemes_dir = Path("./schemes")

    # Get PDF files
    print(f"\n[INFO] Scanning for PDF files in: {schemes_dir}")
    pdf_files = get_pdf_files(schemes_dir)

    if not pdf_files:
        print("[ERROR] No PDF files found. Exiting.")
        return 1

    print(f"[OK] Found {len(pdf_files)} PDF file(s)")

    # Load PDFs
    print(f"\n[INFO] Loading PDF files...")
    documents, errors = load_pdfs(pdf_files)

    if errors:
        print(f"\n[WARN] {len(errors)} file(s) failed to load:")
        for filename, error in errors.items():
            print(f"       - {filename}: {error}")

    if not documents:
        print("[ERROR] No documents loaded. Exiting.")
        return 1

    print(f"[OK] Loaded {len(documents)} documents total")

    # Split documents
    chunks = split_documents(
        documents,
        config["chunk_size"],
        config["chunk_overlap"]
    )

    # Create embeddings and store
    success = create_embeddings_and_store(chunks, config)

    if not success:
        return 1

    print("\n" + "=" * 70)
    print("[SUCCESS] PDF ingestion completed successfully!")
    print("=" * 70)
    print("\nYou can now use the RAG pipeline in your chat endpoint.")
    print("The chat route will automatically use this ChromaDB collection.")

    return 0


if __name__ == "__main__":
    exit_code = main()
    sys.exit(exit_code)
