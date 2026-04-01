#!/bin/bash
# Test script for ingest.py

echo "=================================="
echo "Testing ingest.py Setup"
echo "=================================="

# Check if Python is available
echo -n "✓ Python: "
python --version || echo "✗ Not found"

# Check if required directories exist
echo -n "✓ Project root: "
test -f "ingest.py" && echo "OK" || echo "✗ ingest.py not found"

# Check Python dependencies
echo ""
echo "Checking dependencies:"

dependencies=(
    "dotenv"
    "langchain"
    "langchain_community"
    "pypdf"
    "chromadb"
)

for dep in "${dependencies[@]}"; do
    echo -n "  - $dep: "
    python -c "import $dep" 2>/dev/null && echo "✓" || echo "✗ Not installed"
done

# Check if schemes folder exists
echo ""
echo -n "✓ Schemes folder: "
test -d "schemes" && echo "OK ($(ls schemes/*.pdf 2>/dev/null | wc -l) PDFs found)" || echo "✗ Not found (create with: mkdir -p schemes)"

# Check if .env exists
echo -n "✓ .env file: "
test -f ".env" && echo "OK" || echo "✗ Not found"

# Verify Ollama (optional)
echo ""
echo "Ollama Status (optional):"
echo -n "  - Checking http://localhost:11434: "
curl -s http://localhost:11434/api/status > /dev/null && echo "✓ Running" || echo "✗ Not responding"

echo ""
echo "=================================="
echo "Setup Check Complete"
echo "=================================="
echo ""
echo "To run ingestion:"
echo "  1. Add PDF files to ./schemes/ folder"
echo "  2. Ensure Ollama is running: ollama serve"
echo "  3. Run: python ingest.py"
echo ""
