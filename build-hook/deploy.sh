#!/usr/bin/env bash
echo "executing deployment script for production"

echo "setting permissions"
chown -R root .

echo "stop pm2"
pm2 stop ecosystem.config.js

echo "install node modules"
npm install

echo "start pm2"
pm2 start ecosystem.config.js