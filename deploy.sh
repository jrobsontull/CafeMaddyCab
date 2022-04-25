#!/bin/bash

echo -e "\e[33mKilling PM2 daemon processes\e[0m"
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
npm install
cd ..
else
cd frontend/
echo "Building frontend"
npm run build
cd ..
fi

echo -e "\e[33mStarting daemon process\e[0m"
pm2 start npm --name cafemaddycab -- start
echo -e "\e[32mDeploy successful\e[0m"
