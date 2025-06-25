import { WeatherForm } from "@/components/weather-form";
import { WeatherLookup } from "@/components/weather-lookup";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-black via-zinc-900 to-black">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        
        <div className="relative max-w-6xl mx-auto px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="jost-black text-6xl md:text-8xl mb-6 bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent animate-float">
              WeatherSync
            </h1>
            <p className="jost-light text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
              Professional meteorological data system with real-time weather analytics and comprehensive reporting
            </p>
            <div className="flex justify-center mt-8">
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 animate-shimmer"></div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16 text-center">
            <div className="glass p-6 animate-slide-up" style={{animationDelay: '0.1s'}}>
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="jost-semibold text-lg text-white mb-2">Real-time Data</h3>
              <p className="jost-regular text-zinc-400 text-sm">Get instant weather updates from global meteorological stations</p>
            </div>
            
            <div className="glass p-6 animate-slide-up" style={{animationDelay: '0.2s'}}>
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="jost-semibold text-lg text-white mb-2">Smart Analytics</h3>
              <p className="jost-regular text-zinc-400 text-sm">Advanced data processing with intelligent weather insights</p>
            </div>
            
            <div className="glass p-6 animate-slide-up" style={{animationDelay: '0.3s'}}>
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="jost-semibold text-lg text-white mb-2">Secure Storage</h3>
              <p className="jost-regular text-zinc-400 text-sm">Enterprise-grade data security with persistent storage</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Weather Form Section */}
          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h2 className="jost-bold text-4xl text-white mb-4">
                Submit Request
              </h2>
              <p className="jost-regular text-zinc-400 text-lg">
                Request comprehensive weather data for any location and date. Our system provides detailed meteorological information including temperature, humidity, wind patterns, and atmospheric conditions.
              </p>
            </div>
            <div className="flex justify-center lg:justify-start">
              <WeatherForm />
            </div>
          </div>

          {/* Data Lookup Section */}
          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h2 className="jost-bold text-4xl text-white mb-4">
                Retrieve Data
              </h2>
              <p className="jost-regular text-zinc-400 text-lg">
                Access your stored weather data using the unique request ID. View detailed analytics, visual representations, and comprehensive meteorological reports.
              </p>
            </div>
            <WeatherLookup />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="max-w-6xl mx-auto px-8 py-8">
          <div className="text-center">
            <p className="jost-regular text-zinc-500">
              WeatherSync © 2024 | Advanced Meteorological Data System
            </p>
            <p className="jost-light text-zinc-600 text-sm mt-2">
              Powered by WeatherStack API | Built with Next.js & FastAPI
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
