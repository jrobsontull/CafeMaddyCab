#!/bin/bash

echo -e "\e[33m[DEPLOY]\e[0m Killing PM2 daemon processes"
pm2 kill

echo -e "\e[32m[DEPLOY]\e[0m Pulling latest repo updates"
git pull

echo -e -n "\e[32m[DEPLOY]\e[0m Do you need to install node.js modules (y/n)? "
read runInstall

if [ $runInstall == "y" ]; then
echo -e "\e[32m[DEPLOY]\e[0m Installing frontend modules"
cd frontend/
npm install
echo -e "\e[32m[DEPLOY]\e[0m Building frontend"
npm run build
echo -e "\e[32m[DEPLOY]\e[0m Purging CSS"
npm run postbuild
cd ..
cd backend/
echo -e "\e[32m[DEPLOY]\e[0m Installing backend modules"
npm install
cd ..
else
cd frontend/
echo -e "\e[32m[DEPLOY]\e[0m Building frontend"
npm run build
cd ../backend/
fi

echo -e "\e[32m[DEPLOY]\e[0m Starting daemon process"
pm2 start npm --name cafemaddycab -- start

echo -e "\e[32m[DEPLOY]\e[0m Started successfully. Setting up server restart daemonisation."
pm2 save
pm2 startup

echo -e "\e[32m[DEPLOY]\e[0m Deploy successful"
