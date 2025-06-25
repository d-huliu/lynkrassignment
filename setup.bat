@echo off
echo ========================================
echo         WeatherSync Setup Script
echo ========================================
echo.

echo [1/4] Setting up Python virtual environment...
cd backend
if not exist venv (
    python -m venv venv
    echo Virtual environment created successfully!
) else (
    echo Virtual environment already exists.
)

echo.
echo [2/4] Installing Python dependencies...
call venv\Scripts\activate
pip install -r requirements.txt
echo Python dependencies installed!

echo.
echo [3/4] Installing Node.js dependencies...
cd ..\frontend
call npm install
echo Node.js dependencies installed!

echo.
echo [4/4] Setup completed successfully!
echo.
echo ========================================
echo         How to run WeatherSync
echo ========================================
echo.
echo 1. Start Backend (in one terminal):
echo    cd backend
echo    venv\Scripts\activate
echo    python main.py
echo.
echo 2. Start Frontend (in another terminal):
echo    cd frontend
echo    npm run dev
echo.
echo 3. Open your browser:
echo    Frontend: http://localhost:3000
echo    Backend API: http://localhost:8000
echo    API Docs: http://localhost:8000/docs
echo.
echo Sample Weather ID for testing: sample-weather-123
echo.
echo ========================================
pause
