import React from "react";
import { Button } from "@/components/ui/button";
import { Trophy, Users, Gamepad } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gray-950 text-white">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1400&q=80"
          alt="Gaming Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-900/90 to-gray-950/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              <span className="block">Mobile Gaming</span>
              <span className="block text-primary">Dominate the Arena</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-lg">
              Join the ultimate mobile eSports platform for Free Fire and BGMI
              players. Compete in tournaments, improve your skills, and win
              amazing prizes.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg h-auto"
                onClick={() => (window.location.href = "/tournaments")}
              >
                Join Tournament
              </Button>
              <Button
                variant="outline"
                className="border-gray-700 text-white hover:bg-gray-800 px-8 py-6 text-lg h-auto"
                onClick={() => (window.location.href = "/events")}
              >
                Browse Games
              </Button>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row gap-8">
              <div className="flex items-center gap-3">
                <div className="bg-primary/20 p-3 rounded-full">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">250+</p>
                  <p className="text-gray-400">Tournaments</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-blue-500/20 p-3 rounded-full">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">10k+</p>
                  <p className="text-gray-400">Active Players</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-purple-500/20 p-3 rounded-full">
                  <Gamepad className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">2</p>
                  <p className="text-gray-400">Game Titles</p>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:block relative">
            <div className="absolute -top-6 -left-6 w-64 h-64 bg-primary/30 rounded-full filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-purple-500/30 rounded-full filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 shadow-2xl">
              <div className="absolute -top-4 -right-4 bg-primary text-white text-sm font-bold px-3 py-1 rounded-full">
                LIVE NOW
              </div>

              <h3 className="text-xl font-bold mb-4">Featured Tournament</h3>

              <div className="relative h-48 w-full mb-4 overflow-hidden rounded-md">
                <img
                  src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80"
                  alt="Tournament"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h4 className="text-lg font-bold">Free Fire Pro League</h4>
                  <p className="text-sm text-gray-300">Prize Pool: $15,000</p>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-gray-300">32 Teams</span>
                </div>
                <div className="text-sm text-gray-300">Starts in 2 days</div>
              </div>

              <Button
                className="w-full bg-primary hover:bg-primary/90"
                onClick={() => (window.location.href = "/tournaments")}
              >
                Register Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave effect */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-auto"
        >
          <path
            fill="#111827"
            fillOpacity="1"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
