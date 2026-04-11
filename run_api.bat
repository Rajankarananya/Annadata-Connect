@echo off
REM Startup script for Crop Damage Analysis API

cd /d "%~dp0"

REM Activate virtual environment
call ml\venv\Scripts\activate.bat

REM Set PYTHONPATH to include current directory
set PYTHONPATH=%cd%

REM Run uvicorn with proper module path
python -m uvicorn ml.api.main:app --reload --host 0.0.0.0 --port 8000

pause
