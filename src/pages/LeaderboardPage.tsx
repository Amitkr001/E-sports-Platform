import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Medal, Star, ArrowRight, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";

interface Player {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  score: number;
  wins: number;
  country: string;
  change: number;
}

interface Game {
  id: string;
  name: string;
  players: Player[];
}

const LeaderboardPage = () => {
  const [activeGame, setActiveGame] = useState("freefire");
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState("all-time");
  const { isLoggedIn } = useAuth();
  const { toast } = useToast();

  // Mock data for leaderboards
  const games: Game[] = [
    {
      id: "freefire",
      name: "Free Fire",
      players: [
        {
          id: "1",
          rank: 1,
          name: "Badge99",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Badge99",
          score: 12500,
          wins: 48,
          country: "IN",
          change: 0,
        },
        {
          id: "2",
          rank: 2,
          name: "Total Gaming",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=TotalGaming",
          score: 11800,
          wins: 42,
          country: "IN",
          change: 1,
        },
        {
          id: "3",
          rank: 3,
          name: "Desi Gamers",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DesiGamers",
          score: 11200,
          wins: 39,
          country: "IN",
          change: -1,
        },
        {
          id: "4",
          rank: 4,
          name: "AS Gaming",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ASGaming",
          score: 10800,
          wins: 36,
          country: "IN",
          change: 2,
        },
        {
          id: "5",
          rank: 5,
          name: "Gyan Gaming",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=GyanGaming",
          score: 10500,
          wins: 34,
          country: "IN",
          change: 0,
        },
        {
          id: "6",
          rank: 6,
          name: "Lokesh Gamer",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=LokeshGamer",
          score: 10200,
          wins: 32,
          country: "IN",
          change: 1,
        },
        {
          id: "7",
          rank: 7,
          name: "Tonde Gamer",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=TondeGamer",
          score: 9800,
          wins: 30,
          country: "IN",
          change: -2,
        },
        {
          id: "8",
          rank: 8,
          name: "Raistar",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Raistar",
          score: 9500,
          wins: 28,
          country: "IN",
          change: 0,
        },
        {
          id: "9",
          rank: 9,
          name: "Ungraduate Gamer",
          avatar:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=UngraduateGamer",
          score: 9200,
          wins: 26,
          country: "IN",
          change: 3,
        },
        {
          id: "10",
          rank: 10,
          name: "Gyan Sujan",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=GyanSujan",
          score: 8900,
          wins: 24,
          country: "IN",
          change: -1,
        },
      ],
    },
    {
      id: "bgmi",
      name: "BGMI",
      players: [
        {
          id: "1",
          rank: 1,
          name: "Jonathan",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jonathan",
          score: 14200,
          wins: 52,
          country: "IN",
          change: 0,
        },
        {
          id: "2",
          rank: 2,
          name: "Scout",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Scout",
          score: 13800,
          wins: 49,
          country: "IN",
          change: 0,
        },
        {
          id: "3",
          rank: 3,
          name: "Mortal",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mortal",
          score: 13100,
          wins: 45,
          country: "IN",
          change: 1,
        },
        {
          id: "4",
          rank: 4,
          name: "Dynamo",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dynamo",
          score: 12700,
          wins: 43,
          country: "IN",
          change: -1,
        },
        {
          id: "5",
          rank: 5,
          name: "Thug",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Thug",
          score: 12300,
          wins: 41,
          country: "IN",
          change: 2,
        },
        {
          id: "6",
          rank: 6,
          name: "Kronten",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kronten",
          score: 12000,
          wins: 39,
          country: "IN",
          change: 0,
        },
        {
          id: "7",
          rank: 7,
          name: "Owais",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Owais",
          score: 11700,
          wins: 37,
          country: "IN",
          change: 1,
        },
        {
          id: "8",
          rank: 8,
          name: "Viper",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Viper",
          score: 11400,
          wins: 35,
          country: "IN",
          change: -2,
        },
        {
          id: "9",
          rank: 9,
          name: "Payal",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Payal",
          score: 11100,
          wins: 33,
          country: "IN",
          change: 3,
        },
        {
          id: "10",
          rank: 10,
          name: "Zgod",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zgod",
          score: 10800,
          wins: 31,
          country: "IN",
          change: 0,
        },
      ],
    },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-amber-700" />;
      default:
        return <span className="text-gray-400 font-bold">{rank}</span>;
    }
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) {
      return <span className="text-green-500 text-xs">↑{change}</span>;
    } else if (change < 0) {
      return <span className="text-red-500 text-xs">↓{Math.abs(change)}</span>;
    } else {
      return <span className="text-gray-500 text-xs">-</span>;
    }
  };

  const handleRegisterClick = () => {
    if (!isLoggedIn) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to register for tournaments",
        variant: "destructive",
      });
      return;
    }

    // Would normally open registration form here
    toast({
      title: "Registration Started",
      description:
        "Opening registration form for Free Fire Pro League Season 5",
    });
  };

  const currentGame = games.find((game) => game.id === activeGame) || games[0];

  // Filter players based on search query
  const filteredPlayers = currentGame.players.filter((player) =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2 mb-2">
            <Trophy className="h-8 w-8 text-yellow-500" />
            Leaderboards
          </h1>
          <p className="text-gray-400 text-lg">
            Track the top players across our mobile gaming tournaments
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="relative w-full md:w-64">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              placeholder="Search players..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-900 border-gray-700 text-white w-full"
            />
          </div>

          <div className="relative w-full md:w-48">
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="bg-gray-900 border-gray-700 text-white w-full">
                <div className="flex items-center gap-2">
                  <Filter size={16} />
                  <SelectValue placeholder="Time period" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700 text-white">
                <SelectItem value="all-time">All Time</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="this-week">This Week</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden mb-8">
          <Tabs
            defaultValue={activeGame}
            value={activeGame}
            onValueChange={setActiveGame}
          >
            <div className="border-b border-gray-800 px-4">
              <TabsList className="bg-transparent h-14">
                {games.map((game) => (
                  <TabsTrigger
                    key={game.id}
                    value={game.id}
                    className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none px-4 h-14"
                  >
                    {game.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {games.map((game) => (
              <TabsContent key={game.id} value={game.id} className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-800/50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-16">
                          Rank
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Player
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Score
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Wins
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-20">
                          Change
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {filteredPlayers.length > 0 ? (
                        filteredPlayers.map((player) => (
                          <tr
                            key={player.id}
                            className="hover:bg-gray-800/30 transition-colors"
                          >
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center justify-center">
                                {getRankIcon(player.rank)}
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <img
                                    className="h-10 w-10 rounded-full"
                                    src={player.avatar}
                                    alt={player.name}
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="font-medium">
                                    {player.name}
                                  </div>
                                  <div className="text-gray-400 text-sm">
                                    {player.country}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium">
                                {player.score.toLocaleString()}
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm">{player.wins}</div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-center">
                              {getChangeIcon(player.change)}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={5}
                            className="px-4 py-8 text-center text-gray-400"
                          >
                            No players found matching your search.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">How Rankings Work</h2>
          <p className="text-gray-300 mb-4">
            Our leaderboard rankings are calculated based on a combination of
            factors including:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
            <li>Tournament placements and victories</li>
            <li>Kill/death ratio in competitive matches</li>
            <li>Consistency of performance across multiple events</li>
            <li>Performance against higher-ranked opponents</li>
          </ul>
          <p className="text-gray-300">
            Rankings are updated weekly after the completion of official
            tournaments. Players must participate in at least 3 tournaments per
            month to maintain their ranking status.
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">
            Upcoming Ranking Tournaments
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 border border-gray-800 rounded-lg hover:bg-gray-800/30 transition-colors">
              <div>
                <h3 className="font-medium">Free Fire Pro League Season 5</h3>
                <p className="text-gray-400 text-sm">August 15, 2023</p>
              </div>
              <Button
                className="bg-primary hover:bg-primary/90"
                onClick={handleRegisterClick}
              >
                Register
              </Button>
            </div>
            <div className="flex justify-between items-center p-4 border border-gray-800 rounded-lg hover:bg-gray-800/30 transition-colors">
              <div>
                <h3 className="font-medium">BGMI Masters Series</h3>
                <p className="text-gray-400 text-sm">September 5, 2023</p>
              </div>
              <Button
                className="bg-primary hover:bg-primary/90"
                onClick={handleRegisterClick}
              >
                Register
              </Button>
            </div>
            <div className="flex justify-between items-center p-4 border border-gray-800 rounded-lg hover:bg-gray-800/30 transition-colors">
              <div>
                <h3 className="font-medium">
                  Free Fire World Series Qualifiers
                </h3>
                <p className="text-gray-400 text-sm">July 28, 2023</p>
              </div>
              <Button
                className="bg-primary hover:bg-primary/90"
                onClick={handleRegisterClick}
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LeaderboardPage;
