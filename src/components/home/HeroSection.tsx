
import { Button } from "@/components/ui/button";
import { Trophy, Users, Gamepad } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gray-950 text-white min-h-screen">
      {/* Animated background pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,#3b82f6,#1e40af)]"></div>
        <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDYwIEwgNjAgMCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              <span className="block">Mobile Gaming</span>
              <span className="block">Dominate the Arena</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-lg leading-relaxed">
              Join the ultimate mobile eSports platform for Free Fire and BGMI
              players. Compete in tournaments, improve your skills, and win
              amazing prizes.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8">
                  Join Now
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" variant="outline" className="text-lg px-8 border-2">
                  Learn More
                </Button>
              </motion.div>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6">
              <motion.div
                whileHover={{ y: -5 }}
                className="text-center"
              >
                <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <p className="text-sm font-medium">Daily Prizes</p>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                className="text-center"
              >
                <Users className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                <p className="text-sm font-medium">10k+ Players</p>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                className="text-center"
              >
                <Gamepad className="w-8 h-8 mx-auto mb-2 text-green-400" />
                <p className="text-sm font-medium">Pro Gaming</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden md:block"
          >
            <div className="relative w-full h-[600px] rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1400&q=80"
                alt="Gaming Setup"
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-gray-900/80 via-gray-900/40 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
