@echo off
set BASEDIR=C:\Users\Big Doinks\DreamAiApp
mkdir "%BASEDIR%\frontend"
cd /d "%BASEDIR%\frontend"
type nul > App.js
type nul > package.json
type nul > babel.config.js
mkdir android
mkdir ios
mkdir watch
cd watch
type nul > WatchApp.js
type nul > package.json
type nul > app.json
cd ..
echo Folder and file structure created successfully at %BASEDIR%.
pause
