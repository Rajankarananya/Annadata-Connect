# PDF Ingestion Guide for ChromaDB

## Overview
The `ingest.py` script automates the process of loading government scheme PDFs into ChromaDB for use with the RAG (Retrieval-Augmented Generation) chatbot.

## Prerequisites

### 1. Required Dependencies
Ensure all packages from `requirements.txt` are installed:
```bash
pip install -r routes/requirements.txt
```

Key packages needed:
- `langchain` - Document processing framework
- `langchain-community` - Community integrations
- `langchain-ollama` - Ollama LLM support
- `pypdf` - PDF loading
- `chromadb` - Vector database
- `sentence-transformers` - Text embeddings (fallback)
- `python-dotenv` - Environment variable loading

### 2. Ollama Running
The script uses **OllamaEmbeddings** which requires Ollama to be running:

```bash
# Start Ollama (if not using Docker)
ollama serve

# Or using Docker Compose
docker-compose up -d ollama
```

Verify Ollama is accessible:
```bash
curl http://localhost:11434/api/status
```

### 3. PDF Files
Place your government scheme PDFs in the `./schemes` folder:
```
project-root/
├── schemes/
│   ├── pds_scheme.pdf
│   ├── irrigation_scheme.pdf
│   └── crop_insurance.pdf
├── ingest.py
└── ...
```

### 4. Environment Variables
The script reads from `.env` file. Key variables:

```env
# ChromaDB Configuration
CHROMA_PERSIST_DIRECTORY=./data/chroma
RAG_COLLECTION_NAME=annadata_connect_docs
RAG_CHUNK_SIZE=1000
RAG_CHUNK_OVERLAP=200

# Ollama Configuration
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3
```

These are already configured in your `.env` file.

## Usage

### Basic Run
```bash
python ingest.py
```

### How It Works

1. **Configuration Loading**
   - Reads settings from `.env` file
   - Sets up chunk size (1000 chars), overlap (200 chars)
   - Initializes Ollama embedding endpoint

2. **PDF Scanning**
   - Lists all `.pdf` files in `./schemes/`
   - Reports any missing directories

3. **PDF Loading**
   - Uses PyPDFLoader to extract text from each PDF
   - Shows progress: `Loading: filename.pdf... ✓ (X pages)`
   - Records errors without stopping

4. **Document Chunking**
   - Splits documents into 1000-character chunks
   - Maintains 200-character overlap for context
   - Reports total chunks created

5. **Embedding Creation**
   - Tests OllamaEmbeddings connection
   - Shows embedding dimension
   - Processes all chunks

6. **Storage**
   - Saves embeddings to ChromaDB
   - Persists to `./data/chroma/`
   - Names collection `annadata_connect_docs`

### Example Output
```
======================================================================
Annadata Connect - PDF Ingestion into ChromaDB
======================================================================

[INFO] Configuration loaded:
       Chunk size: 1000
       Chunk overlap: 200
       ChromaDB dir: ./data/chroma
       Collection: annadata_connect_docs

[INFO] Scanning for PDF files in: ./schemes
[OK] Found 3 PDF file(s)

[INFO] Loading PDF files...
  Loading: pds_scheme.pdf... ✓ (45 pages)
  Loading: irrigation_scheme.pdf... ✓ (32 pages)
  Loading: crop_insurance.pdf... ✓ (28 pages)
[OK] Loaded 105 documents total

[INFO] Splitting documents into chunks...
       Chunk size: 1000, Overlap: 200
[OK] Created 1250 chunks from 105 documents

[INFO] Creating embeddings using Ollama model: llama3
       Ollama URL: http://localhost:11434
       Testing embeddings... ✓ (embedding dim: 384)

[INFO] Storing in ChromaDB...
       Persist dir: ./data/chroma
       Collection: annadata_connect_docs
[OK] ChromaDB collection created successfully!
     Total documents stored: 1250

======================================================================
[SUCCESS] PDF ingestion completed successfully!
======================================================================

You can now use the RAG pipeline in your chat endpoint.
The chat route will automatically use this ChromaDB collection.
```

## Troubleshooting

### Error: "Ollama not responding"
```
[ERROR] Failed to create embeddings/store: Connection error
[ERROR] Make sure Ollama is running at: http://localhost:11434
```

**Solution:**
```bash
# Check if Ollama is running
curl http://localhost:11434/api/status

# Start Ollama if not running
ollama serve

# Or pull the llama3 model
ollama pull llama3
```

### Error: "No PDF files found"
```
[WARN] Schemes directory not found: ./schemes
[ERROR] No PDF files found. Exiting.
```

**Solution:**
```bash
# Create schemes folder
mkdir -p schemes

# Add PDF files
cp your_pdfs/*.pdf schemes/

# Run again
python ingest.py
```

### Error: "No documents loaded"
```
  Loading: file.pdf... ✗ ERROR: PDF is corrupted
[ERROR] No documents loaded. Exiting.
```

**Solution:**
- Check PDF files are valid
- Try opening PDFs in a PDF reader
- Replace corrupted PDFs with valid ones

### Error: "Insufficient precipitation data"
This is for the weather endpoint - not related to PDF ingestion. Check weather route if you get this.

## Integration with Chat Endpoint

Once ingestion completes, the chat endpoint automatically uses the ChromaDB:

```bash
# The chat route reads from the same ChromaDB
curl -X POST "http://localhost:8000/api/v1/chat?query=What%20are%20PDS%20schemes?"
```

The `/chat` endpoint will:
1. Retrieve relevant chunks from ChromaDB
2. Use Ollama LLM to generate response
3. Return government scheme information

## Advanced Options

### Change Chunk Size
Edit `.env`:
```env
RAG_CHUNK_SIZE=2000      # Larger chunks for summaries
RAG_CHUNK_OVERLAP=300    # More context preservation
```

### Change Collection Name
Edit `.env`:
```env
RAG_COLLECTION_NAME=my_custom_collection
```

### Use Different Ollama Model
Edit `.env`:
```env
OLLAMA_MODEL=mistral     # Or other Ollama models
```

Then pull the model:
```bash
ollama pull mistral
python ingest.py
```

## Best Practices

1. **Organize PDFs**: Keep government schemes in `./schemes` folder only
2. **Valid PDFs**: Ensure all PDFs are readable and not corrupted
3. **Run Once**: Ingestion replaces the entire collection each time
4. **Monitor Progress**: Watch console output for chunk counts
5. **Check Storage**: Verify `./data/chroma/` exists after run
6. **Backup Data**: Save ChromaDB directory before re-ingesting

## Reingesting Documents

To update the knowledge base with new PDFs:

```bash
# 1. Add new PDFs to ./schemes/
cp new_scheme.pdf schemes/

# 2. Re-run ingestion (replaces old collection)
python ingest.py

# 3. Chat endpoint automatically uses new data
```

## Performance Notes

- Embedding time depends on Ollama model and total chunks
- Example: 1000 chunks ≈ 2-5 minutes with llama3
- Storage: ~1 MB per 1000 chunks (depends on embedding dimension)
- Query time: <1 second for retrieval

---

**Next Steps After Ingestion:**
- ✅ PDFs ingested into ChromaDB
- Use `/api/v1/chat` endpoint with queries
- Use `/api/v1/chat/multilingual` for Hindi/Marathi (when Bhashini is integrated)
