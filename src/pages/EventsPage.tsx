import React, { useState, useEffect } from "react";
import { useEvents } from "@/hooks/useSupabaseData";
import { Skeleton } from "@/components/ui/skeleton";
import SupabaseDebug from "@/components/debug/SupabaseDebug";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Calendar, MapPin, Users, Trophy } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  location: string;
  type: "online" | "offline" | "hybrid";
  game: string;
  registrationDeadline: string;
  prizePool: string;
  status: "upcoming" | "ongoing" | "completed";
  participants: number;
  maxParticipants: number;
}

const EventsPage = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [gameFilter, setGameFilter] = useState("all");
  const [showDebug, setShowDebug] = useState(false);
  const { events: supabaseEvents, loading, error } = useEvents();

  // Toggle debug panel with Ctrl+Shift+D
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "D") {
        e.preventDefault();
        setShowDebug((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Use Supabase data or fallback to mock data
  const events: Event[] = supabaseEvents?.length
    ? supabaseEvents
    : [
        {
          id: "1",
          title: "Free Fire Pro League Season 5",
          description:
            "The biggest Free Fire tournament of the year with teams from across the country competing for glory.",
          image:
            "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
          date: "August 15-20, 2023",
          location: "Online",
          type: "online",
          game: "Free Fire",
          registrationDeadline: "August 1, 2023",
          prizePool: "$15,000",
          status: "upcoming",
          participants: 24,
          maxParticipants: 32,
        },
        {
          id: "2",
          title: "BGMI Masters Series",
          description:
            "Elite BGMI tournament featuring the top professional teams competing for the championship title.",
          image:
            "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&q=80",
          date: "September 5-12, 2023",
          location: "Mumbai, India",
          type: "offline",
          game: "BGMI",
          registrationDeadline: "August 20, 2023",
          prizePool: "$20,000",
          status: "upcoming",
          participants: 28,
          maxParticipants: 32,
        },
        {
          id: "3",
          title: "Free Fire World Series Qualifiers",
          description:
            "Regional qualifiers for the Free Fire World Series. Top teams will advance to the global championship.",
          image:
            "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&q=80",
          date: "July 28-30, 2023",
          location: "Online + Delhi, India",
          type: "hybrid",
          game: "Free Fire",
          registrationDeadline: "July 15, 2023",
          prizePool: "$25,000",
          status: "ongoing",
          participants: 12,
          maxParticipants: 16,
        },
        {
          id: "4",
          title: "BGMI Rising Stars Tournament",
          description:
            "Tournament designed for emerging talent in the BGMI scene. Great opportunity for new teams to showcase their skills.",
          image:
            "https://images.unsplash.com/photo-1519669556878-63bdad8a1a49?w=800&q=80",
          date: "June 10-12, 2023",
          location: "Online",
          type: "online",
          game: "BGMI",
          registrationDeadline: "June 1, 2023",
          prizePool: "$12,000",
          status: "completed",
          participants: 48,
          maxParticipants: 50,
        },
        {
          id: "5",
          title: "Mobile Gaming Festival 2023",
          description:
            "The biggest mobile gaming event of the year featuring tournaments, meet & greets with pro players, and exclusive game reveals.",
          image:
            "https://images.unsplash.com/photo-1511882150382-421056c89033?w=800&q=80",
          date: "October 15-17, 2023",
          location: "Bangalore, India",
          type: "offline",
          game: "Multiple",
          registrationDeadline: "September 30, 2023",
          prizePool: "$50,000",
          status: "upcoming",
          participants: 120,
          maxParticipants: 200,
        },
        {
          id: "6",
          title: "Free Fire Campus Challenge",
          description:
            "Inter-college Free Fire tournament open to students across the country. Represent your campus and compete for scholarships.",
          image:
            "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&q=80",
          date: "August 25-27, 2023",
          location: "Online + Regional Finals",
          type: "hybrid",
          game: "Free Fire",
          registrationDeadline: "August 10, 2023",
          prizePool: "$8,000 + Scholarships",
          status: "upcoming",
          participants: 64,
          maxParticipants: 128,
        },
      ];

  // Get unique game names for filter dropdown
  const gameOptions = ["all", ...new Set(events.map((event) => event.game))];

  // Filter events based on active tab, search query, and game filter
  const filteredEvents = events.filter((event) => {
    // Filter by status tab
    if (activeTab !== "all" && event.status !== activeTab) return false;

    // Filter by search query
    if (
      searchQuery &&
      !event.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !event.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;

    // Filter by game
    if (gameFilter !== "all" && event.game !== gameFilter) return false;

    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return (
          <Badge className="bg-green-500/20 text-green-500 border-green-500/50">
            Upcoming
          </Badge>
        );
      case "ongoing":
        return (
          <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/50">
            Ongoing
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/50">
            Completed
          </Badge>
        );
      default:
        return null;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "online":
        return (
          <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/50">
            Online
          </Badge>
        );
      case "offline":
        return (
          <Badge className="bg-purple-500/20 text-purple-500 border-purple-500/50">
            Offline
          </Badge>
        );
      case "hybrid":
        return (
          <Badge className="bg-indigo-500/20 text-indigo-500 border-indigo-500/50">
            Hybrid
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Events & Tournaments</h1>
          <p className="text-gray-400 text-lg">
            Discover upcoming gaming events, tournaments, and competitions
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="relative w-full md:w-64">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-900 border-gray-700 text-white w-full"
            />
          </div>

          <div className="relative w-full md:w-48">
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

        <Tabs
          defaultValue="upcoming"
          value={activeTab}
          onValueChange={setActiveTab}
          className="mb-6"
        >
          <TabsList className="bg-gray-900 border border-gray-800">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              All Events
            </TabsTrigger>
            <TabsTrigger
              value="upcoming"
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Upcoming
            </TabsTrigger>
            <TabsTrigger
              value="ongoing"
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Ongoing
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Completed
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            {loading ? (
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <Skeleton
                    key={i}
                    className="h-[200px] w-full bg-gray-800 rounded-lg"
                  />
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-10 text-red-400">
                <p>Error loading events. Please try again later.</p>
                <p className="text-sm mt-2">{error.message}</p>
              </div>
            ) : (
              renderEventsList(filteredEvents)
            )}
          </TabsContent>
          <TabsContent value="upcoming" className="mt-4">
            {renderEventsList(filteredEvents)}
          </TabsContent>
          <TabsContent value="ongoing" className="mt-4">
            {renderEventsList(filteredEvents)}
          </TabsContent>
          <TabsContent value="completed" className="mt-4">
            {renderEventsList(filteredEvents)}
          </TabsContent>
        </Tabs>

        <div className="flex justify-center mt-8 mb-12">
          <Button
            variant="outline"
            className="border-gray-700 text-white hover:bg-gray-800"
          >
            Load More Events
          </Button>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Featured Event</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <img
                src="https://images.unsplash.com/photo-1511882150382-421056c89033?w=800&q=80"
                alt="Featured Event"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="md:col-span-2">
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge className="bg-primary/20 text-primary border-primary/50">
                  Featured
                </Badge>
                <Badge className="bg-green-500/20 text-green-500 border-green-500/50">
                  Upcoming
                </Badge>
                <Badge className="bg-purple-500/20 text-purple-500 border-purple-500/50">
                  Offline
                </Badge>
              </div>
              <h3 className="text-xl font-bold mb-2">
                Mobile Gaming Festival 2023
              </h3>
              <p className="text-gray-300 mb-4">
                The biggest mobile gaming event of the year featuring
                tournaments, meet & greets with pro players, and exclusive game
                reveals. Don't miss this opportunity to connect with the mobile
                gaming community and compete for massive prizes.
              </p>
              <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-primary" />
                  <span className="text-gray-300">October 15-17, 2023</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-red-400" />
                  <span className="text-gray-300">Bangalore, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy size={16} className="text-yellow-500" />
                  <span className="text-gray-300">$50,000 Prize Pool</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-blue-400" />
                  <span className="text-gray-300">120/200 Registered</span>
                </div>
              </div>
              <Button
                className="bg-primary hover:bg-primary/90"
                onClick={() => {
                  const authContext = require("@/context/AuthContext");
                  const { useToast } = require("@/components/ui/use-toast");
                  const isLoggedIn = authContext.useAuth().isLoggedIn;
                  const toast = useToast().toast;

                  if (!isLoggedIn) {
                    toast({
                      title: "Authentication Required",
                      description: "Please sign in to register for events",
                      variant: "destructive",
                    });
                    return;
                  }

                  // Would normally open registration form here
                  toast({
                    title: "Registration Started",
                    description:
                      "Opening registration form for Mobile Gaming Festival 2023",
                  });
                }}
              >
                Register Now
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Host Your Own Tournament</h2>
          <p className="text-gray-300 mb-4">
            Are you interested in organizing a mobile gaming tournament? We
            provide the platform, tools, and support to help you create and
            manage successful events.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="bg-primary hover:bg-primary/90">
              Start Organizing
            </Button>
            <Button
              variant="outline"
              className="border-gray-700 text-white hover:bg-gray-800"
            >
              Learn More
            </Button>
          </div>
        </div>
      </main>

      {showDebug && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <SupabaseDebug />
        </div>
      )}
      <Footer />
    </div>
  );

  function renderEventsList(events: Event[]) {
    if (events.length === 0) {
      return (
        <div className="text-center py-10 text-gray-400">
          No events found matching your criteria. Try adjusting your filters.
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-1">
                <div className="h-full w-full relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 md:h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    {getStatusBadge(event.status)}
                    {getTypeBadge(event.type)}
                  </div>
                </div>
              </div>
              <div className="md:col-span-3 p-6 pt-0 md:pt-6">
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-gray-300 mb-4">{event.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-primary" />
                    <span className="text-gray-300">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-red-400" />
                    <span className="text-gray-300">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy size={16} className="text-yellow-500" />
                    <span className="text-gray-300">{event.prizePool}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-blue-400" />
                    <span className="text-gray-300">
                      {event.participants}/{event.maxParticipants} Registered
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30">
                    {event.game}
                  </Badge>
                  <Badge className="bg-gray-800 text-gray-300">
                    Registration Deadline: {event.registrationDeadline}
                  </Badge>
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  {event.status === "completed" ? (
                    <Button
                      variant="outline"
                      className="border-gray-700 text-white hover:bg-gray-800"
                    >
                      View Results
                    </Button>
                  ) : (
                    <Button
                      className="bg-primary hover:bg-primary/90"
                      onClick={() => {
                        if (event.status === "upcoming") {
                          const authContext = require("@/context/AuthContext");
                          const {
                            useToast,
                          } = require("@/components/ui/use-toast");
                          const isLoggedIn = authContext.useAuth().isLoggedIn;
                          const toast = useToast().toast;

                          if (!isLoggedIn) {
                            toast({
                              title: "Authentication Required",
                              description:
                                "Please sign in to register for events",
                              variant: "destructive",
                            });
                            return;
                          }

                          // Would normally open registration form here
                          toast({
                            title: "Registration Started",
                            description: `Opening registration form for ${event.title}`,
                          });
                        }
                      }}
                    >
                      {event.status === "upcoming"
                        ? "Register Now"
                        : "View Matches"}
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="border-gray-700 text-white hover:bg-gray-800"
                  >
                    Event Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
};

export default EventsPage;
