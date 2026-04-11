# PowerShell script to start the Crop Damage Analysis API

# Get the script directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

# Display startup message
Write-Host "================================================" -ForegroundColor Green
Write-Host "  Starting Crop Damage Analysis API" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""

# Activate virtual environment
Write-Host "Activating virtual environment..." -ForegroundColor Yellow
& "ml\venv\Scripts\Activate.ps1"

# Set PYTHONPATH
$env:PYTHONPATH = (Get-Location).Path

Write-Host "Starting server on http://localhost:8000" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Cyan
Write-Host ""

# Run uvicorn
python -m uvicorn ml.api.main:app --host 0.0.0.0 --port 8000 --reload

Write-Host ""
Write-Host "Server stopped." -ForegroundColor Yellow
