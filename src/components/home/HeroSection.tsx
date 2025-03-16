import { Button } from "@/components/ui/button";
import { Trophy, Users, Gamepad } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen">
      <div className="animated-background" />
      <div className="grid-background" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-violet-400 to-purple-500">
              <span className="block">Mobile Gaming</span>
              <span className="block">Dominate the Arena</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Join the ultimate mobile eSports platform for Free Fire and BGMI
              players. Compete in tournaments, improve your skills, and win
              amazing prizes.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-lg px-8">
                  Join Now
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="text-lg px-8 border-2">
                  Learn More
                </Button>
              </motion.div>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <motion.div whileHover={{ y: -5 }} className="text-center">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <p className="text-sm font-medium text-gray-300">Daily Prizes</p>
              </motion.div>
              <motion.div whileHover={{ y: -5 }} className="text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                <p className="text-sm font-medium text-gray-300">10k+ Players</p>
              </motion.div>
              <motion.div whileHover={{ y: -5 }} className="text-center">
                <Gamepad className="w-8 h-8 mx-auto mb-2 text-green-400" />
                <p className="text-sm font-medium text-gray-300">Pro Gaming</p>
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
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-900/40 via-transparent to-transparent rounded-lg backdrop-blur-sm"></div>
              <img
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1400&q=80"
                alt="Gaming Setup"
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;