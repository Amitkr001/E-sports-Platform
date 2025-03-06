import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Medal, Star, ArrowRight } from "lucide-react";

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

const LeaderboardPreview = () => {
  const [activeGame, setActiveGame] = useState("freefire");

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

  const currentGame = games.find((game) => game.id === activeGame) || games[0];

  return (
    <div className="w-full bg-gray-950 text-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-500" />
            Leaderboards
          </h2>
          <p className="text-gray-400">Top players across popular games</p>
        </div>

        <Button
          variant="outline"
          className="border-gray-700 text-white hover:bg-gray-800"
          onClick={() => (window.location.href = "/leaderboards")}
        >
          View Full Rankings
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
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
                    {game.players.map((player) => (
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
                              <div className="font-medium">{player.name}</div>
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
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default LeaderboardPreview;
