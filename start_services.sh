#!/bin/bash

# Annadata Smart Start Script - Handles port conflicts and connections automatically

PROJECT_ROOT="/Users/shrutijaggi/Desktop/annadata"
BACKEND_DIR="$PROJECT_ROOT/backend"

echo "🚀 Annadata Connect - Intelligent Startup"
echo "=========================================="

# Step 1: Kill any existing services
echo "🛑 Stopping existing services..."
pkill -9 -f "uvicorn main:app" 2>/dev/null
pkill -9 -f "npm run dev" 2>/dev/null
lsof -ti:8000 | xargs kill -9 2>/dev/null 2>&1

# Wait for ports to free up
sleep 3

# Step 2: Start backend
echo "🔧 Starting backend server on port 8000..."
cd "$BACKEND_DIR"
PYTHONPATH=. python -m uvicorn main:app --reload --port 8000 &
BACKEND_PID=$!
sleep 2

# Verify backend is running
if curl -s http://localhost:8000/health > /dev/null 2>&1; then
    echo "✅ Backend is running on http://localhost:8000"
else
    echo "❌ Backend failed to start"
    exit 1
fi

# Step 3: Start frontend
echo "⚡ Starting frontend dev server..."
cd "$PROJECT_ROOT"
npm run dev &
FRONTEND_PID=$!

# Wait a moment for frontend to find a port
sleep 3

# Find which port Vite is using
FRONTEND_PORT=$(lsof -ti:5173,5174,5175,5176,5177 | head -1 | xargs -I {} sh -c 'lsof -p {} | grep LISTEN | awk "\$NF ~ /:517[0-9]/{print \$NF}" | tail -1 | cut -d: -f2')

if [ -z "$FRONTEND_PORT" ]; then
    FRONTEND_PORT="5173"
fi

echo "✅ Frontend is running on http://localhost:$FRONTEND_PORT"

echo ""
echo "=========================================="
echo "✅ ANNADATA IS READY!"
echo "=========================================="
echo "Frontend:  http://localhost:$FRONTEND_PORT"
echo "Backend:   http://localhost:8000"
echo "API:       http://localhost:8000/api/v1"
echo ""
echo "👉 Test Login:"
echo "   Email:    sunita.deshmukh@farmer.local"
echo "   Password: Password123!"
echo ""
echo "Press Ctrl+C to stop all services"
echo "=========================================="

# Keep the script running
wait $BACKEND_PID
