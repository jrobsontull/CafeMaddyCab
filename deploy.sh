#!/bin/bash

echo "Killing PM2 daemon processes"
pm2 kill

echo "Pulling latest repo updates"
git pull

read -p "Do you need to install node.js modules (y/n)? " runInstall

if [ $runInstall == "y" ]; then
echo "Installing frontend modules"
cd frontend/
npm install
echo "Building frontend"
npm run build
cd ..
cd backend/
echo "Installing backend modules"
npm run install
cd ..
else
cd frontend/
echo "Building frontend"
npm run build
cd ..
fi

echo "Starting daemon process"
pm2 start npm --name cafemaddycab -- start
echo "Deploy successful"
