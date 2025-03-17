import { Button } from "@/components/ui/button";
import { Trophy, Users, Gamepad } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-radial from-violet-900/20 via-slate-900 to-black animate-gradient"></div>
        <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDYwIEwgNjAgMCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>

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
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-lg px-8 py-6">
                  Join Now
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 border-violet-500/50">
                  Learn More
                </Button>
              </motion.div>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              {[
                { icon: Trophy, text: "Daily Prizes", color: "text-yellow-400" },
                { icon: Users, text: "10k+ Players", color: "text-blue-400" },
                { icon: Gamepad, text: "Pro Gaming", color: "text-green-400" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="text-center"
                >
                  <item.icon className={`w-8 h-8 mx-auto mb-2 ${item.color}`} />
                  <p className="text-sm font-medium text-gray-300">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden md:block space-y-4"
          >
            {[
              {
                title: "Free Fire Pro League Season 5",
                date: "August 15, 2023",
                prize: "₹25,000",
                image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80"
              },
              {
                title: "BGMI Masters Series",
                date: "September 5, 2023",
                prize: "₹50,000",
                image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80"
              }
            ].map((tournament, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="relative rounded-lg overflow-hidden bg-gray-800/50 backdrop-blur-sm border border-gray-700"
              >
                <div className="relative h-48">
                  <img
                    src={tournament.image}
                    alt={tournament.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white">{tournament.title}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-gray-300">{tournament.date}</p>
                    <p className="text-sm font-medium text-violet-400">{tournament.prize}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;