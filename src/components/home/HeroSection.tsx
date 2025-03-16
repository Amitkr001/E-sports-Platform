import React from "react";
import { Button } from "@/components/ui/button";
//import { motion } from "framer-motion"; // Removed as not used in edited code
import { Trophy, Users, Gamepad } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gray-950 text-white">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1400&q=80"
          alt="Gaming Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-900/90 to-gray-950/80"></div>
      </div>

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
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Join Now
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;