
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Trophy, Users, Gamepad2, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_50%_120%,#3b82f6,#1e40af)] opacity-20"></div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDYwIEwgNjAgMCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]">
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                  Mobile Gaming
                </span>
                <span className="block mt-2 text-white">
                  Next Level
                </span>
              </h1>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 leading-relaxed"
            >
              Join the ultimate mobile eSports platform. Compete in tournaments, level up your skills, and win amazing prizes in Free Fire and BGMI.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-6"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8 py-6 rounded-xl shadow-lg shadow-blue-500/20"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Join Now
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 py-6 border-2 border-gray-700 hover:bg-gray-800 rounded-xl"
                >
                  Learn More
                </Button>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-800"
            >
              {[
                { icon: Trophy, label: "Daily Prizes", color: "text-yellow-400" },
                { icon: Users, label: "10k+ Players", color: "text-blue-400" },
                { icon: Gamepad2, label: "Pro Gaming", color: "text-green-400" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="text-center p-4 rounded-lg bg-gray-800/50 backdrop-blur-sm"
                >
                  <item.icon className={`w-8 h-8 mx-auto mb-3 ${item.color}`} />
                  <p className="text-sm font-medium">{item.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="relative hidden md:block"
          >
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm"></div>
              <img
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1400&q=80"
                alt="Gaming Setup"
                className="absolute inset-0 w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 via-gray-900/40 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
