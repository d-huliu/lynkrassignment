@echo off
echo ========================================
echo      Starting WeatherSync Services
echo ========================================
echo.

echo Starting Backend server...
start "WeatherSync Backend" cmd /k "cd backend && venv\Scripts\activate && python main.py"

timeout /t 3 /nobreak >nul

echo Starting Frontend development server...
start "WeatherSync Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo       WeatherSync is starting up!
echo ========================================
echo.
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo API Docs: http://localhost:8000/docs
echo.
echo Sample Weather ID: sample-weather-123
echo.
echo Both services are starting in separate windows...
echo Close this window or press any key to exit.
pause
