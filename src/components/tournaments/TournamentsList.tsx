import React, { useState, useEffect } from "react";
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
import { mockTournaments } from "@/data/mockTournaments";

export interface Tournament {
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

interface TournamentsListProps {
  initialTournaments?: Tournament[];
}

const TournamentsList = ({ initialTournaments }: TournamentsListProps = {}) => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [gameFilter, setGameFilter] = useState("all");

  // Use provided tournaments or fallback to mock data
  const [tournaments, setTournaments] = useState<Tournament[]>(
    initialTournaments || mockTournaments,
  );

  // Set active tab based on URL path
  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/tournaments/open") setActiveTab("open");
    else if (path === "/tournaments/in-progress") setActiveTab("in-progress");
    else if (path === "/tournaments/completed") setActiveTab("completed");
    else setActiveTab("all");
  }, []);

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
            onClick={() =>
              window.location.pathname !== "/tournaments" &&
              (window.location.href = "/tournaments")
            }
          >
            All Tournaments
          </TabsTrigger>
          <TabsTrigger
            value="open"
            className="data-[state=active]:bg-primary data-[state=active]:text-white"
            onClick={() =>
              window.location.pathname !== "/tournaments/open" &&
              (window.location.href = "/tournaments/open")
            }
          >
            Registration Open
          </TabsTrigger>
          <TabsTrigger
            value="in-progress"
            className="data-[state=active]:bg-primary data-[state=active]:text-white"
            onClick={() =>
              window.location.pathname !== "/tournaments/in-progress" &&
              (window.location.href = "/tournaments/in-progress")
            }
          >
            In Progress
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="data-[state=active]:bg-primary data-[state=active]:text-white"
            onClick={() =>
              window.location.pathname !== "/tournaments/completed" &&
              (window.location.href = "/tournaments/completed")
            }
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
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
