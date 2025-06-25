from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any, Optional
import uvicorn
import requests
import uuid
import datetime

# Configuration
WEATHERSTACK_API_KEY = "3f044cf270d35cc6923b7baa5d3f940c"
WEATHERSTACK_BASE_URL = "http://api.weatherstack.com/current"

app = FastAPI(title="Weather Data System", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for weather data
weather_storage: Dict[str, Dict[str, Any]] = {}

class WeatherRequest(BaseModel):
    date: str
    location: str
    notes: Optional[str] = ""

class WeatherResponse(BaseModel):
    id: str

class WeatherData(BaseModel):
    id: str
    date: str
    location: str
    notes: Optional[str] = ""
    temperature: float
    weather_description: str
    humidity: int
    wind_speed: float
    wind_direction: str
    pressure: float
    visibility: float
    uv_index: int
    feels_like: float
    created_at: str

@app.post("/weather", response_model=WeatherResponse)
async def create_weather_request(request: WeatherRequest):
    """
    Handle weather request creation:
    1. Receive form data (date, location, notes)
    2. Call WeatherStack API for the location
    3. Store combined data with unique ID in memory
    4. Return the ID to frontend
    """
    try:
        # Generate unique ID
        weather_id = str(uuid.uuid4())
        
        # Call WeatherStack API
        params = {
            "access_key": WEATHERSTACK_API_KEY,
            "query": request.location,
            "units": "m"  # Use metric units (Celsius)
        }
        
        response = requests.get(WEATHERSTACK_BASE_URL, params=params, timeout=10)
        
        if response.status_code != 200:
            raise HTTPException(status_code=500, detail="Failed to fetch weather data from WeatherStack API")
        
        weather_api_data = response.json()
        
        # Check if API returned an error
        if "error" in weather_api_data:
            error_message = weather_api_data["error"].get("info", "Unknown error from WeatherStack API")
            raise HTTPException(status_code=400, detail=f"WeatherStack API error: {error_message}")
        
        # Extract weather data
        current = weather_api_data.get("current", {})
        location_data = weather_api_data.get("location", {})
        
        # Create comprehensive weather data object
        weather_data = {
            "id": weather_id,
            "date": request.date,
            "location": f"{location_data.get('name', request.location)}, {location_data.get('country', '')}".strip(", "),
            "notes": request.notes or "",
            "temperature": current.get("temperature", 0),
            "weather_description": current.get("weather_descriptions", ["Unknown"])[0],
            "humidity": current.get("humidity", 0),
            "wind_speed": current.get("wind_speed", 0),
            "wind_direction": current.get("wind_dir", "N"),
            "pressure": current.get("pressure", 0),
            "visibility": current.get("visibility", 0),
            "uv_index": current.get("uv_index", 0),
            "feels_like": current.get("feelslike", 0),
            "created_at": datetime.datetime.now().isoformat(),
            "raw_api_response": weather_api_data  # Store the full API response for debugging
        }
        
        # Store in memory
        weather_storage[weather_id] = weather_data
        
        return WeatherResponse(id=weather_id)
        
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Network error while fetching weather data: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.get("/weather/{weather_id}")
async def get_weather_data(weather_id: str):
    """
    Retrieve stored weather data by ID.
    This endpoint is already implemented for the assessment.
    """
    if weather_id not in weather_storage:
        raise HTTPException(status_code=404, detail="Weather data not found")
    
    return weather_storage[weather_id]


if __name__ == "__main__":
    # Add some sample data for testing
    sample_id = "sample-weather-123"
    weather_storage[sample_id] = {
        "id": sample_id,
        "date": "2024-12-25",
        "location": "New York, United States",
        "notes": "Sample weather data for testing",
        "temperature": 2,
        "weather_description": "Light Snow",
        "humidity": 87,
        "wind_speed": 15,
        "wind_direction": "NNW",
        "pressure": 1015,
        "visibility": 8,
        "uv_index": 1,
        "feels_like": -2,
        "created_at": "2024-12-25T10:30:00",
    }
    
    print(f"🌤️  Weather Data System Backend")
    print(f"🔗 Server running on: http://localhost:8000")
    print(f"📖 API docs: http://localhost:8000/docs")
    print(f"🧪 Sample weather ID for testing: {sample_id}")
    print("=" * 50)
    
    uvicorn.run(app, host="0.0.0.0", port=8000)