# Push The Gamer's Hideout to GitHub
# Run this in PowerShell from the sak folder, or right-click -> Run with PowerShell

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

# Find Git (PATH or common install locations)
$gitExe = $null
if (Get-Command git -ErrorAction SilentlyContinue) { $gitExe = "git" }
if (-not $gitExe -and (Test-Path "C:\Program Files\Git\bin\git.exe")) { $gitExe = "C:\Program Files\Git\bin\git.exe" }
if (-not $gitExe -and (Test-Path "C:\Program Files (x86)\Git\bin\git.exe")) { $gitExe = "C:\Program Files (x86)\Git\bin\git.exe" }

if (-not $gitExe) {
    Write-Host "Git not found. Install it first:" -ForegroundColor Red
    Write-Host "  1. Go to https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host "  2. Run the installer (default options are fine)" -ForegroundColor Yellow
    Write-Host "  3. Close this window, reopen PowerShell, run this script again" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Or read INSTALL-AND-PUSH.md in this folder." -ForegroundColor Cyan
    pause
    exit 1
}

function Run-Git {
    if ($gitExe -eq "git") { git @args } else { & $gitExe @args }
}

Write-Host "Initializing repo and adding files..." -ForegroundColor Cyan
Run-Git init 2>$null
Run-Git add .
Run-Git status

Write-Host "`nCommitting..." -ForegroundColor Cyan
Run-Git commit -m "Initial commit: The Gamer's Hideout website"

Write-Host "`nAdding remote and pushing to GitHub..." -ForegroundColor Cyan
Run-Git remote remove origin 2>$null
Run-Git remote add origin https://github.com/sakshamtikekar19/gamers-hideout.git
Run-Git branch -M main

Write-Host "`nWhen prompted:" -ForegroundColor Yellow
Write-Host "  Username: sakshamtikekar19"
Write-Host "  Password: paste your GitHub Personal Access Token (starts with ghp_)"
Write-Host ""

Run-Git push -u origin main

Write-Host "`nDone!" -ForegroundColor Green
pause
