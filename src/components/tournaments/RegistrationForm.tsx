import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Trophy, Users, Calendar, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";

interface RegistrationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tournament?: {
    title: string;
    game: string;
    date: string;
    prizePool: string;
    teamSize: number;
  };
}

const RegistrationForm = ({
  open = false,
  onOpenChange,
  tournament = {
    title: "Free Fire Pro League Season 5",
    game: "Free Fire",
    date: "August 15, 2023",
    prizePool: "$15,000",
    teamSize: 4,
  },
}: RegistrationFormProps) => {
  const { toast } = useToast();
  const { isLoggedIn, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [teamName, setTeamName] = useState("");
  const [teamMembers, setTeamMembers] = useState([
    { name: "", email: "", inGameId: "" },
    { name: "", email: "", inGameId: "" },
    { name: "", email: "", inGameId: "" },
  ]);
  const [agreeToRules, setAgreeToRules] = useState(false);

  // Fill first team member with current user data if logged in
  React.useEffect(() => {
    if (isLoggedIn && user) {
      const updatedMembers = [...teamMembers];
      updatedMembers[0] = {
        name: user.user_metadata?.username || "",
        email: user.email || "",
        inGameId: "",
      };
      setTeamMembers(updatedMembers);
    }
  }, [isLoggedIn, user]);

  const handleTeamMemberChange = (
    index: number,
    field: "name" | "email" | "inGameId",
    value: string,
  ) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setTeamMembers(updatedMembers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validate form
    if (!teamName.trim()) {
      setError("Team name is required");
      setIsLoading(false);
      return;
    }

    // Check if required team members are filled out based on team size
    for (let i = 0; i < tournament.teamSize - 1; i++) {
      if (!teamMembers[i].name || !teamMembers[i].inGameId) {
        setError(`Team member ${i + 1} information is incomplete`);
        setIsLoading(false);
        return;
      }
    }

    if (!agreeToRules) {
      setError("You must agree to the tournament rules");
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Registration Successful",
        description: `Your team ${teamName} has been registered for ${tournament.title}`,
      });
      onOpenChange(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] bg-gray-900 text-white border-gray-800">
        <DialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
            <Trophy className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-xl font-semibold">
            Register for Tournament
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {tournament.title} - {tournament.game}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {error && (
            <div className="bg-red-500/20 text-red-400 p-3 rounded-md flex items-start gap-2">
              <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-gray-300">{tournament.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-yellow-500" />
              <span className="text-gray-300">{tournament.prizePool}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-400" />
              <span className="text-gray-300">
                {tournament.teamSize} Players/Team
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="team-name" className="text-white">
              Team Name
            </Label>
            <Input
              id="team-name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter your team name"
              className="bg-gray-800 border-gray-700 text-white"
              required
            />
          </div>

          <div className="space-y-4">
            <Label className="text-white">Team Members</Label>

            {Array.from({ length: tournament.teamSize }).map((_, index) => (
              <div
                key={index}
                className="space-y-2 border border-gray-800 p-3 rounded-md"
              >
                <div className="flex justify-between items-center">
                  <Label className="text-white font-medium">
                    {index === 0 ? "Team Captain" : `Member ${index + 1}`}
                  </Label>
                  {index === 0 && (
                    <span className="text-xs text-primary">(You)</span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label
                      htmlFor={`member-${index}-name`}
                      className="text-gray-400 text-xs"
                    >
                      Name
                    </Label>
                    <Input
                      id={`member-${index}-name`}
                      value={teamMembers[index]?.name || ""}
                      onChange={(e) =>
                        handleTeamMemberChange(index, "name", e.target.value)
                      }
                      placeholder="Player name"
                      className="bg-gray-800 border-gray-700 text-white mt-1"
                      disabled={index === 0 && isLoggedIn}
                      required
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor={`member-${index}-email`}
                      className="text-gray-400 text-xs"
                    >
                      Email
                    </Label>
                    <Input
                      id={`member-${index}-email`}
                      value={teamMembers[index]?.email || ""}
                      onChange={(e) =>
                        handleTeamMemberChange(index, "email", e.target.value)
                      }
                      placeholder="Email address"
                      className="bg-gray-800 border-gray-700 text-white mt-1"
                      type="email"
                      disabled={index === 0 && isLoggedIn}
                    />
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor={`member-${index}-id`}
                    className="text-gray-400 text-xs"
                  >
                    In-Game ID
                  </Label>
                  <Input
                    id={`member-${index}-id`}
                    value={teamMembers[index]?.inGameId || ""}
                    onChange={(e) =>
                      handleTeamMemberChange(index, "inGameId", e.target.value)
                    }
                    placeholder={`${tournament.game} ID`}
                    className="bg-gray-800 border-gray-700 text-white mt-1"
                    required
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="rules"
              checked={agreeToRules}
              onCheckedChange={(checked) => setAgreeToRules(checked as boolean)}
              required
            />
            <label
              htmlFor="rules"
              className="text-sm font-medium leading-none text-gray-400 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the{" "}
              <a href="#" className="text-primary hover:underline">
                tournament rules
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:underline">
                code of conduct
              </a>
            </label>
          </div>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              className="border-gray-700 text-white hover:bg-gray-800"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Complete Registration"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationForm;
