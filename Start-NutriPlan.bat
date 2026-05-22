@echo off
title NutriPlan Local Server
echo ==============================================
echo    Starting NutriPlan India Local Server
echo ==============================================
echo.
echo Please leave this window open to keep the server running.
echo.
echo [1] To access on this Computer, go to:
echo     http://localhost:8000
echo.
echo [2] To access on your Mobile Phone:
echo     Find this PC's IPv4 address (usually 192.168.x.x)
echo     and go to http://[your-ip-address]:8000
echo     (Make sure your phone is on the same Wi-Fi network)
echo.
powershell.exe -ExecutionPolicy Bypass -File server.ps1
pause
