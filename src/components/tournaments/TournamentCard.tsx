import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Trophy, Users, GamepadIcon } from "lucide-react";
import RegistrationForm from "./RegistrationForm";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";

interface TournamentCardProps {
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

const TournamentCard = ({
  title = "Free Fire Pro League Season 5",
  game = "Free Fire",
  image = "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
  date = "August 15, 2023",
  prizePool = "₹15,000",
  teamSize = 4,
  registeredTeams = 24,
  maxTeams = 32,
  status = "open",
}: TournamentCardProps) => {
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const { toast } = useToast();

  const getStatusColor = () => {
    switch (status) {
      case "open":
        return "bg-green-500/20 text-green-500 border-green-500/50";
      case "in-progress":
        return "bg-amber-500/20 text-amber-500 border-amber-500/50";
      case "completed":
        return "bg-gray-500/20 text-gray-400 border-gray-500/50";
      default:
        return "bg-green-500/20 text-green-500 border-green-500/50";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "open":
        return "Registration Open";
      case "in-progress":
        return "In Progress";
      case "completed":
        return "Completed";
      default:
        return "Registration Open";
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

    setRegistrationOpen(true);
  };

  const handleActionClick = () => {
    if (status === "open") {
      handleRegisterClick();
    } else if (status === "in-progress") {
      console.log(`View matches for tournament: ${title}`);
    } else {
      console.log(`View results for tournament: ${title}`);
    }
  };

  return (
    <>
      <Card className="w-full max-w-[320px] h-full overflow-hidden bg-gray-900 border-gray-800 text-white hover:border-primary/50 transition-all duration-300">
        <div className="relative h-40 w-full overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <Badge
            variant="secondary"
            className="absolute top-3 right-3 bg-primary/80 text-white border-none"
          >
            {game}
          </Badge>
          <Badge className={`absolute bottom-3 right-3 ${getStatusColor()}`}>
            {getStatusText()}
          </Badge>
        </div>

        <CardHeader className="pb-2">
          <h3 className="text-lg font-bold line-clamp-2 text-white">{title}</h3>
        </CardHeader>

        <CardContent className="pb-2">
          <div className="grid grid-cols-2 gap-3 text-sm mb-3">
            <div className="flex items-center gap-2">
              <CalendarIcon size={16} className="text-primary" />
              <span className="text-gray-300">{date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy size={16} className="text-yellow-500" />
              <span className="text-gray-300">{prizePool}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={16} className="text-blue-400" />
              <span className="text-gray-300">{teamSize} Players/Team</span>
            </div>
            <div className="flex items-center gap-2">
              <GamepadIcon size={16} className="text-purple-400" />
              <span className="text-gray-300">
                {registeredTeams}/{maxTeams} Teams
              </span>
            </div>
          </div>

          <div className="w-full bg-gray-800 rounded-full h-2 mb-1">
            <div
              className="bg-primary h-2 rounded-full"
              style={{ width: `${(registeredTeams / maxTeams) * 100}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-400 text-right">
            {maxTeams - registeredTeams} spots remaining
          </p>
        </CardContent>

        <CardFooter>
          <Button
            className="w-full bg-primary hover:bg-primary/90"
            onClick={handleActionClick}
          >
            {status === "open"
              ? "Register Now"
              : status === "in-progress"
                ? "View Matches"
                : "View Results"}
          </Button>
        </CardFooter>
      </Card>

      {/* Registration Form Dialog */}
      <RegistrationForm
        open={registrationOpen}
        onOpenChange={setRegistrationOpen}
        tournament={{
          title,
          game,
          date,
          prizePool,
          teamSize,
        }}
      />
    </>
  );
};

export default TournamentCard;
