@echo off
set BASEDIR=C:\Users\Big Doinks\DreamAiApp
mkdir "%BASEDIR%\backend"
cd /d "%BASEDIR%\backend"
type nul > .env.example
type nul > package.json
type nul > server.js
mkdir routes
cd routes
type nul > sleep.js
type nul > voicenotes.js
mkdir services
cd services
type nul > healthapi.js
type nul > storage.js
cd ..
echo Folder and file structure created successfully at %BASEDIR%.
pause