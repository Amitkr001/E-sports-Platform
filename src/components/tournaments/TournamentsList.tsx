import React, { useState } from "react";
import TournamentCard from "./TournamentCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter } from "lucide-react";

interface Tournament {
  id: string;
  title: string;
  game: string;
  image: string;
  date: string;
  prizePool: string;
  teamSize: number;
  registeredTeams: number;
  maxTeams: number;
  status: "open" | "in-progress" | "completed";
}

const TournamentsList = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [gameFilter, setGameFilter] = useState("all");

  // Mock data for tournaments
  const tournaments: Tournament[] = [
    {
      id: "1",
      title: "Free Fire Pro League Season 5",
      game: "Free Fire",
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
      date: "August 15, 2023",
      prizePool: "$15,000",
      teamSize: 4,
      registeredTeams: 24,
      maxTeams: 32,
      status: "open",
    },
    {
      id: "2",
      title: "BGMI Masters Series",
      game: "BGMI",
      image:
        "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&q=80",
      date: "September 5, 2023",
      prizePool: "$20,000",
      teamSize: 4,
      registeredTeams: 28,
      maxTeams: 32,
      status: "open",
    },
    {
      id: "3",
      title: "Free Fire World Series Qualifiers",
      game: "Free Fire",
      image:
        "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&q=80",
      date: "July 28, 2023",
      prizePool: "$25,000",
      teamSize: 4,
      registeredTeams: 12,
      maxTeams: 16,
      status: "in-progress",
    },
    {
      id: "4",
      title: "BGMI Rising Stars Tournament",
      game: "BGMI",
      image:
        "https://images.unsplash.com/photo-1519669556878-63bdad8a1a49?w=800&q=80",
      date: "June 10, 2023",
      prizePool: "$12,000",
      teamSize: 4,
      registeredTeams: 48,
      maxTeams: 50,
      status: "completed",
    },
  ];

  // Filter tournaments based on active tab, search query, and game filter
  const filteredTournaments = tournaments.filter((tournament) => {
    // Filter by status tab
    if (activeTab !== "all" && tournament.status !== activeTab) return false;

    // Filter by search query
    if (
      searchQuery &&
      !tournament.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;

    // Filter by game
    if (gameFilter !== "all" && tournament.game !== gameFilter) return false;

    return true;
  });

  // Get unique game names for filter dropdown
  const gameOptions = ["all", ...new Set(tournaments.map((t) => t.game))];

  return (
    <div className="w-full bg-gray-950 text-white p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold">Tournaments</h2>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              placeholder="Search tournaments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-900 border-gray-700 text-white w-full"
            />
          </div>

          <div className="relative w-full sm:w-48">
            <Select value={gameFilter} onValueChange={setGameFilter}>
              <SelectTrigger className="bg-gray-900 border-gray-700 text-white w-full">
                <div className="flex items-center gap-2">
                  <Filter size={16} />
                  <SelectValue placeholder="Filter by game" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700 text-white">
                {gameOptions.map((game) => (
                  <SelectItem key={game} value={game} className="capitalize">
                    {game === "all" ? "All Games" : game}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={setActiveTab}
        className="mb-6"
      >
        <TabsList className="bg-gray-900 border border-gray-800">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            All Tournaments
          </TabsTrigger>
          <TabsTrigger
            value="open"
            className="data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            Registration Open
          </TabsTrigger>
          <TabsTrigger
            value="in-progress"
            className="data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            In Progress
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            Completed
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          {filteredTournaments.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              No tournaments found. Try adjusting your filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTournaments.map((tournament) => (
                <TournamentCard key={tournament.id} {...tournament} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="open" className="mt-4">
          {filteredTournaments.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              No open tournaments found. Try adjusting your filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTournaments.map((tournament) => (
                <TournamentCard key={tournament.id} {...tournament} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="in-progress" className="mt-4">
          {filteredTournaments.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              No in-progress tournaments found. Try adjusting your filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTournaments.map((tournament) => (
                <TournamentCard key={tournament.id} {...tournament} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="mt-4">
          {filteredTournaments.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              No completed tournaments found. Try adjusting your filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTournaments.map((tournament) => (
                <TournamentCard key={tournament.id} {...tournament} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <div className="flex justify-center mt-8">
        <Button
          variant="outline"
          className="border-gray-700 text-white hover:bg-gray-800"
          onClick={() => console.log("Load more tournaments")}
        >
          Load More Tournaments
        </Button>
      </div>
    </div>
  );
};

export default TournamentsList;
