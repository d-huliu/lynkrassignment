"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, Thermometer, Droplets, Wind, Eye, Gauge, Sun, Clock } from "lucide-react";

interface WeatherData {
  id: string;
  date: string;
  location: string;
  notes: string;
  temperature: number;
  weather_description: string;
  humidity: number;
  wind_speed: number;
  wind_direction: string;
  pressure: number;
  visibility: number;
  uv_index: number;
  feels_like: number;
  created_at: string;
}

export function WeatherLookup() {
  const [searchId, setSearchId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    setIsLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const response = await fetch(`http://localhost:8000/weather/${searchId}`);
      
      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
      } else if (response.status === 404) {
        setError("Weather data not found. Please check the ID and try again.");
      } else {
        setError("Failed to fetch weather data. Please try again.");
      }
    } catch {
      setError("Network error: Could not connect to the server.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTemperatureColor = (temp: number) => {
    if (temp <= 0) return "text-blue-400";
    if (temp <= 15) return "text-cyan-400";
    if (temp <= 25) return "text-green-400";
    if (temp <= 35) return "text-yellow-400";
    return "text-red-400";
  };

  const getUVIndexColor = (uv: number) => {
    if (uv <= 2) return "text-green-400";
    if (uv <= 5) return "text-yellow-400";
    if (uv <= 7) return "text-orange-400";
    if (uv <= 10) return "text-red-400";
    return "text-purple-400";
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Search Section */}
      <Card className="glass animate-slide-up">
        <CardHeader>
          <CardTitle className="jost-semibold text-xl flex items-center gap-2">
            <Search className="w-5 h-5 text-blue-400" />
            Weather Data Lookup
          </CardTitle>
          <CardDescription className="jost-regular">
            Enter a weather request ID to retrieve stored meteorological data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="flex-1">
              <Label htmlFor="search-id" className="sr-only">
                Weather ID
              </Label>
              <Input
                id="search-id"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Enter weather request ID (e.g., sample-weather-123)"
                className="jost-regular bg-black/50 border-zinc-700 focus:border-blue-400 transition-colors"
                disabled={isLoading}
              />
            </div>
            <Button 
              type="submit" 
              disabled={isLoading || !searchId.trim()}
              className="jost-medium bg-blue-600 hover:bg-blue-500 text-white px-6 transition-all hover:neon-glow"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Searching...
                </div>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </>
              )}
            </Button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm jost-regular animate-scale-in">
              {error}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Weather Data Display */}
      {weatherData && (
        <div className="space-y-6 animate-slide-up">
          {/* Header Card */}
          <Card className="gradient-border glass">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="jost-bold text-3xl text-white mb-2">
                    {weatherData.location}
                  </h1>
                  <p className="jost-medium text-zinc-400 text-lg">
                    {formatDate(weatherData.date)}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-zinc-500 jost-regular">
                    <Clock className="w-4 h-4" />
                    Retrieved: {formatDateTime(weatherData.created_at)}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`jost-black text-6xl ${getTemperatureColor(weatherData.temperature)}`}>
                    {weatherData.temperature}°C
                  </div>
                  <p className="jost-medium text-zinc-300 text-lg mt-1">
                    {weatherData.weather_description}
                  </p>
                  <p className={`jost-regular text-sm mt-1 ${getTemperatureColor(weatherData.feels_like)}`}>
                    Feels like {weatherData.feels_like}°C
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weather Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="glass hover:bg-zinc-800/50 transition-colors">
              <CardContent className="p-4 text-center">
                <Droplets className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <p className="jost-medium text-2xl text-white">{weatherData.humidity}%</p>
                <p className="jost-regular text-zinc-400 text-sm">Humidity</p>
              </CardContent>
            </Card>

            <Card className="glass hover:bg-zinc-800/50 transition-colors">
              <CardContent className="p-4 text-center">
                <Wind className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <p className="jost-medium text-2xl text-white">{weatherData.wind_speed} km/h</p>
                <p className="jost-regular text-zinc-400 text-sm">Wind {weatherData.wind_direction}</p>
              </CardContent>
            </Card>

            <Card className="glass hover:bg-zinc-800/50 transition-colors">
              <CardContent className="p-4 text-center">
                <Gauge className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <p className="jost-medium text-2xl text-white">{weatherData.pressure} mb</p>
                <p className="jost-regular text-zinc-400 text-sm">Pressure</p>
              </CardContent>
            </Card>

            <Card className="glass hover:bg-zinc-800/50 transition-colors">
              <CardContent className="p-4 text-center">
                <Eye className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <p className="jost-medium text-2xl text-white">{weatherData.visibility} km</p>
                <p className="jost-regular text-zinc-400 text-sm">Visibility</p>
              </CardContent>
            </Card>
          </div>

          {/* UV Index Card */}
          <Card className="glass">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sun className="w-8 h-8 text-yellow-400" />
                  <div>
                    <p className="jost-semibold text-white text-lg">UV Index</p>
                    <p className="jost-regular text-zinc-400 text-sm">
                      {weatherData.uv_index <= 2 && "Low"}
                      {weatherData.uv_index > 2 && weatherData.uv_index <= 5 && "Moderate"}
                      {weatherData.uv_index > 5 && weatherData.uv_index <= 7 && "High"}
                      {weatherData.uv_index > 7 && weatherData.uv_index <= 10 && "Very High"}
                      {weatherData.uv_index > 10 && "Extreme"}
                    </p>
                  </div>
                </div>
                <div className={`jost-bold text-3xl ${getUVIndexColor(weatherData.uv_index)}`}>
                  {weatherData.uv_index}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes Section */}
          {weatherData.notes && (
            <Card className="glass">
              <CardHeader>
                <CardTitle className="jost-semibold text-lg text-white">Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="jost-regular text-zinc-300 leading-relaxed">
                  {weatherData.notes}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Request Info */}
          <Card className="glass border-zinc-700/50">
            <CardContent className="p-4">
              <div className="text-center text-sm text-zinc-500 jost-regular">
                Request ID: <code className="bg-zinc-800 px-2 py-1 rounded text-zinc-300 jost-mono">{weatherData.id}</code>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
