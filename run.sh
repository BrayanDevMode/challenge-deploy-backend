#!/bin/bash

echo "Starting Ensolvers Challenge - Notes App..."

# 1. Start Backend (Spring Boot) in background
echo "Starting Backend (Java + Spring Boot)..."
cd backend
# Grant execution permissions to Maven wrapper
chmod +x mvnw
# Run in background and save PID
./mvnw spring-boot:run &
BACKEND_PID=$!

echo "Waiting for Backend to start (15 seconds)..."
sleep 15

# 2. Start Frontend (React)
echo "Starting Frontend (React + Vite)..."
cd ../frontend
npm install
echo "Everything ready. Opening application..."
npm run dev

# Optional: Kill backend when script exits
kill $BACKEND_PID