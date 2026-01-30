@echo off
echo ========================================
echo  Push The Gamer's Hideout to GitHub
echo ========================================
echo.

cd /d "%~dp0"

echo Checking for Git...
set GIT_CMD=git
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    if exist "C:\Program Files\Git\bin\git.exe" (
        set "GIT_CMD=C:\Program Files\Git\bin\git.exe"
    ) else if exist "C:\Program Files (x86)\Git\bin\git.exe" (
        set "GIT_CMD=C:\Program Files (x86)\Git\bin\git.exe"
    ) else (
        echo [ERROR] Git not found!
        echo.
        echo Install Git from: https://git-scm.com/download/win
        echo Then close this window and run this script again.
        echo.
        pause
        exit /b 1
    )
)

echo Git found. Proceeding...
echo.

echo [1/5] Initializing Git repository...
"%GIT_CMD%" init

echo.
echo [2/5] Adding all files...
"%GIT_CMD%" add .

echo.
echo [3/5] Creating commit...
"%GIT_CMD%" commit -m "Initial commit: The Gamer's Hideout website - full project"

echo.
echo [4/5] Adding GitHub remote...
"%GIT_CMD%" remote remove origin 2>nul
"%GIT_CMD%" remote add origin https://sakshamtikekar19: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@github.com/sakshamtikekar19/gamers-hideout.git
"%GIT_CMD%" branch -M main

echo.
echo [5/5] Pushing to GitHub...

"%GIT_CMD%" push -u origin main --force

"%GIT_CMD%" remote set-url origin https://github.com/sakshamtikekar19/gamers-hideout.git

echo.
echo ========================================
echo  Done! Check: https://github.com/sakshamtikekar19/gamers-hideout
echo ========================================
pause
