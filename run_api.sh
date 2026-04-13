#!/bin/bash
# Startup script for Crop Damage Analysis API

cd "$(dirname "$0")"

# Activate virtual environment
source ml/venv/Scripts/activate

# Set PYTHONPATH to include current directory
export PYTHONPATH="$PWD"

# Run uvicorn with proper module path
python -m uvicorn ml.api.main:app --reload --host 0.0.0.0 --port 8000
