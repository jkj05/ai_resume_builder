#!/bin/bash

# AI Resume Builder - Start Script
# This script starts both backend and frontend with correct Node version

echo "🚀 Starting AI Resume Builder..."
echo ""

# Load NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Use Node 20
nvm use 20

# Check if .env exists
if [ ! -f server/.env ]; then
    echo "❌ ERROR: server/.env file not found!"
    echo "Create it with:"
    echo "  OPENAI_API_KEY=your-key-here"
    echo "  PORT=5000"
    echo "  NODE_ENV=development"
    exit 1
fi

# Start backend in background
echo "📡 Starting backend server..."
cd server
npm run dev &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 3

# Check if backend is running
if curl -s http://localhost:5000/api/templates > /dev/null; then
    echo "✅ Backend running on http://localhost:5000"
else
    echo "❌ Backend failed to start"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

# Start frontend
echo "🎨 Starting frontend..."
cd client
npm run dev

# Cleanup on exit
trap "kill $BACKEND_PID 2>/dev/null" EXIT
