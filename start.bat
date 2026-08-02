@echo off
title Filip Engelhart - Portfolio
echo ============================================
echo   Spoustim portfolio...
echo ============================================
echo.

cd /d "C:\Users\Filip\Desktop\FE-Portfolio"

REM Pokud chybi balicky (node_modules), nainstaluj je
if not exist "node_modules" (
    echo Prvni spusteni - instaluji balicky, chvili to potrva...
    call npm install
    echo.
)

REM Po kratke prodleve (az server naskoci) otevri web v prohlizeci
start "" cmd /c "timeout /t 3 /nobreak >nul && start "" http://localhost:5180"

echo Web bezi na: http://localhost:5180
echo Zavri toto okno nebo stiskni Ctrl+C pro vypnuti.
echo.

npm run dev
