#!/bin/bash

# Pull the latest changes from the repository
echo "Fetching and Pulling the latest code..."
git fetch
git pull

# Build the frontend
echo "Building the frontend..."
cd frontend
npm i
npm run build

# Build the backend
echo "Building the backend..."
cd ../backend
npm run build

# Remove old frontend files and move the new build files
echo "Deploying the frontend..."
rm -rf ../frontend/Runner_webapp/frontend
mkdir ../frontend/Runner_webapp/frontend
mv ../frontend/build/* ../frontend/Runner_webapp/frontend/

# Restart all pm2 processes
echo "Restarting pm2 processes..."
pm2 restart all

echo "Update complete!"
