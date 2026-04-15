#!/bin/bash

#############################################################################
#                    ANNADATA CONNECT - COMPLETE SETUP
#                         One-Command Fix
#############################################################################

set -e

REPO="/Users/shrutijaggi/Desktop/annadata"
cd "$REPO"

echo "🚀 ============================================"
echo "  ANNADATA CONNECT - COMPLETE SETUP"
echo "============================================"
echo ""

# Step 1: Check Prerequisites
echo "📋 Step 1: Checking Prerequisites..."
echo ""

# Check Python
if ! command -v python &> /dev/null; then
    echo "❌ Python not found. Install Python 3.10+"
    exit 1
fi
echo "  ✅ Python $(python --version 2>&1 | cut -d' ' -f2)"

# Check Node
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Install Node.js 18+"
    exit 1
fi
echo "  ✅ Node.js $(node --version)"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found"
    exit 1
fi
echo "  ✅ npm $(npm --version)"

echo ""

# Step 2: Install Backend Dependencies
echo "📋 Step 2: Installing Backend Dependencies..."
cd "$REPO/backend"
pip install -r requirements.txt --quiet
echo "  ✅ Backend dependencies installed"

echo ""

# Step 3: Setup Database
echo "📋 Step 3: Setting Up Database..."

# Check if PostgreSQL is running
if ! lsof -i :5432 &> /dev/null; then
    echo "  ⚠️  PostgreSQL not running. Starting Docker container..."
    docker run -d --name postgres-annadata \
      -e POSTGRES_USER=postgres \
      -e POSTGRES_PASSWORD=baddies2416 \
      -e POSTGRES_DB=agri_db \
      -p 5432:5432 \
      postgres:15-alpine > /dev/null 2>&1
    echo "  ⏳ Waiting for PostgreSQL to start..."
    sleep 3
fi
echo "  ✅ PostgreSQL running on :5432"

# Run migrations
echo "  🔄 Running database migrations..."
alembic upgrade head > /dev/null 2>&1
echo "  ✅ Database migrations complete"

echo ""

# Step 4: Create Test User
echo "📋 Step 4: Creating Test User..."

# Create user using Python directly with explicit path
python << 'EOUSER'
import sys
import os
sys.path.insert(0, '/Users/shrutijaggi/Desktop/annadata/backend')
os.chdir('/Users/shrutijaggi/Desktop/annadata/backend')

import asyncio
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy import select
from app.models.user import User
from app.utils.auth import hash_password

DATABASE_URL = "postgresql+asyncpg://postgres:baddies2416@localhost:5432/agri_db"

async def create_test_user():
    engine = create_async_engine(DATABASE_URL, echo=False)
    async_session = async_sessionmaker(engine, expire_on_commit=False)
    
    async with async_session() as session:
        # Check if user exists
        result = await session.execute(
            select(User).where(User.email == "test@example.com")
        )
        existing_user = result.scalar_one_or_none()
        
        if existing_user:
            print("  ✅ Test user already exists")
            await engine.dispose()
            return
        
        # Create new user
        user = User(
            full_name="Test Farmer",
            email="test@example.com",
            phone="9876543210",
            password=hash_password("Test123456"),
            role="farmer"
        )
        session.add(user)
        await session.commit()
        print("  ✅ Test user created")
    
    await engine.dispose()

try:
    asyncio.run(create_test_user())
except Exception as e:
    print(f"  ⚠️  Note: {type(e).__name__}")
    print("     You can create user via API after starting backend")
EOUSER

echo ""

# Step 5: Install Frontend Dependencies
echo "📋 Step 5: Installing Frontend Dependencies..."
cd "$REPO"
npm install --silent > /dev/null 2>&1
echo "  ✅ Frontend dependencies installed"

echo ""

# Final Summary
echo "✨ ============================================"
echo "   SETUP COMPLETE! 🎉"
echo "============================================"
echo ""
echo "📌 START THE PROJECT IN 3 TERMINALS:"
echo ""
echo "Terminal 1 - Backend:"
echo "  cd $REPO/backend"
echo "  uvicorn main:app --reload"
echo ""
echo "Terminal 2 - Frontend:"
echo "  cd $REPO"
echo "  npm run dev"
echo ""
echo "Terminal 3 - Monitor frontend (optional):"
echo "  cd $REPO"
echo "  npm run build"
echo ""
echo "🌐 Then open: http://localhost:5173"
echo ""
echo "🔑 Test Credentials:"
echo "  Email:    test@example.com"
echo "  Password: Test123456"
echo "  Role:     Farmer"
echo ""
echo "✅ Everything should work now!"
echo "============================================"
