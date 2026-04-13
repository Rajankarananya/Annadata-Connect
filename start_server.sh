#!/bin/bash
cd /c/Users/vaida/OneDrive/Desktop/PCCOE/TY/Annadata/Annadata-Connect
export PYTHONPATH=/c/Users/vaida/OneDrive/Desktop/PCCOE/TY/Annadata/Annadata-Connect

# Run the API server
/c/Users/vaida/OneDrive/Desktop/PCCOE/TY/Annadata/Annadata-Connect/ml/venv/Scripts/python.exe -m uvicorn ml.api.main:app --host 0.0.0.0 --port 8000
