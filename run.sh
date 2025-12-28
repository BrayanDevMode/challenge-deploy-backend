#!/bin/bash

echo "Starting Ensolvers Challenge..."

# 1. Basic requirement checks
if ! command -v java &> /dev/null; then
    echo "ERROR: Java could not be found."
    echo "   Please install Java 17+ and ensure it is in your PATH."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "ERROR: npm could not be found."
    echo "   Please install Node.js."
    exit 1
fi

# 2. Start Backend
echo "Starting Backend..."
cd backend
chmod +x mvnw
./mvnw spring-boot:run &
BACKEND_PID=$!

echo "Waiting for Backend to initialize (15s)..."
sleep 15

# 3. Start Frontend
echo "Starting Frontend..."
cd ../frontend
npm install
echo "App is ready! Opening..."
npm run dev

# Kill backend when script exits
kill $BACKEND_PID