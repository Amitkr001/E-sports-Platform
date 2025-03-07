import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Trash, Eye, Loader2 } from "lucide-react";
import { mockTournaments } from "@/data/mockTournaments";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

interface Tournament {
  id: string;
  title: string;
  game: string;
  image: string;
  date: string;
  prize_pool: string;
  team_size: number;
  registered_teams: number;
  max_teams: number;
  status: "open" | "in-progress" | "completed";
  views?: number;
  created_at?: string;
  updated_at?: string;
}

const AdminTournaments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    game: "Free Fire",
    date: "",
    prizePool: "",
    teamSize: "4",
    maxTeams: "32",
    status: "open",
    image: "",
  });

  // Fetch tournaments from Supabase
  useEffect(() => {
    const fetchTournaments = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("tournaments")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        if (data && data.length > 0) {
          setTournaments(data);
        } else {
          // If no data in database, use mock data
          const formattedMockData = mockTournaments.map((tournament) => ({
            id: tournament.id,
            title: tournament.title,
            game: tournament.game,
            image: tournament.image,
            date: tournament.date,
            prize_pool: tournament.prizePool,
            team_size: tournament.teamSize,
            registered_teams: tournament.registeredTeams,
            max_teams: tournament.maxTeams,
            status: tournament.status,
            views: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }));
          setTournaments(formattedMockData);
        }
      } catch (err: any) {
        console.error("Error fetching tournaments:", err);
        setError(err.message);
        toast({
          variant: "destructive",
          title: "Error fetching tournaments",
          description: err.message,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();

    // Set up real-time subscription for updates
    const subscription = supabase
      .channel("tournaments-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tournaments" },
        () => {
          fetchTournaments();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [toast]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateTournament = async () => {
    try {
      // Format tournament data for Supabase
      const newTournament = {
        title: formData.title,
        game: formData.game,
        image:
          formData.image ||
          "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
        date: formData.date,
        prize_pool: formData.prizePool,
        team_size: parseInt(formData.teamSize),
        registered_teams: 0,
        max_teams: parseInt(formData.maxTeams),
        status: formData.status as "open" | "in-progress" | "completed",
        views: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Insert into Supabase
      const { data, error } = await supabase
        .from("tournaments")
        .insert(newTournament)
        .select();

      if (error) {
        throw error;
      }

      toast({
        title: "Tournament Created",
        description: `Successfully created ${formData.title}`,
      });

      setIsCreateDialogOpen(false);
      resetForm();
    } catch (err: any) {
      console.error("Error creating tournament:", err);
      toast({
        variant: "destructive",
        title: "Error creating tournament",
        description: err.message,
      });
    }
  };

  const handleDeleteTournament = async (id: string) => {
    try {
      const { error } = await supabase
        .from("tournaments")
        .delete()
        .eq("id", id);

      if (error) {
        throw error;
      }

      toast({
        title: "Tournament Deleted",
        description: "Tournament has been successfully deleted",
      });
    } catch (err: any) {
      console.error("Error deleting tournament:", err);
      toast({
        variant: "destructive",
        title: "Error deleting tournament",
        description: err.message,
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      game: "Free Fire",
      date: "",
      prizePool: "",
      teamSize: "4",
      maxTeams: "32",
      status: "open",
      image: "",
    });
  };

  const filteredTournaments = tournaments.filter((tournament) =>
    tournament.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-green-500/20 text-green-500">Open</Badge>;
      case "in-progress":
        return (
          <Badge className="bg-amber-500/20 text-amber-500">In Progress</Badge>
        );
      case "completed":
        return (
          <Badge className="bg-gray-500/20 text-gray-400">Completed</Badge>
        );
      default:
        return null;
    }
  };

  return (
    <AdminLayout title="Tournament Management">
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            placeholder="Search tournaments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-700 text-white"
          />
        </div>

        <Button
          className="bg-primary hover:bg-primary/90"
          onClick={() => setIsCreateDialogOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" /> Create Tournament
        </Button>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-gray-400">Loading tournaments...</span>
          </div>
        ) : error ? (
          <div className="text-center p-12 text-red-400">
            <p>Error loading tournaments: {error}</p>
            <Button
              variant="outline"
              className="mt-4 border-gray-700 text-white hover:bg-gray-800"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-gray-800/50">
                <TableHead className="text-gray-400">Title</TableHead>
                <TableHead className="text-gray-400">Game</TableHead>
                <TableHead className="text-gray-400">Date</TableHead>
                <TableHead className="text-gray-400">Prize Pool</TableHead>
                <TableHead className="text-gray-400">Teams</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-gray-400 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTournaments.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-gray-400"
                  >
                    No tournaments found. Create your first tournament!
                  </TableCell>
                </TableRow>
              ) : (
                filteredTournaments.map((tournament) => (
                  <TableRow
                    key={tournament.id}
                    className="hover:bg-gray-800/50"
                  >
                    <TableCell className="font-medium">
                      {tournament.title}
                    </TableCell>
                    <TableCell>{tournament.game}</TableCell>
                    <TableCell>{tournament.date}</TableCell>
                    <TableCell>{tournament.prize_pool}</TableCell>
                    <TableCell>
                      {tournament.registered_teams}/{tournament.max_teams}
                    </TableCell>
                    <TableCell>{getStatusBadge(tournament.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400 hover:text-white"
                          title="View Tournament"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-blue-400 hover:text-blue-300"
                          title="Edit Tournament"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-400 hover:text-red-300"
                          title="Delete Tournament"
                          onClick={() => handleDeleteTournament(tournament.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Create Tournament Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="bg-gray-900 text-white border-gray-800 sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Tournament</DialogTitle>
            <DialogDescription className="text-gray-400">
              Fill in the details to create a new tournament.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Tournament Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter tournament title"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="game">Game</Label>
                <Select
                  value={formData.game}
                  onValueChange={(value) => handleSelectChange("game", value)}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select game" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="Free Fire">Free Fire</SelectItem>
                    <SelectItem value="BGMI">BGMI</SelectItem>
                    <SelectItem value="Call of Duty Mobile">
                      Call of Duty Mobile
                    </SelectItem>
                    <SelectItem value="PUBG Mobile">PUBG Mobile</SelectItem>
                    <SelectItem value="Mobile Legends">
                      Mobile Legends
                    </SelectItem>
                    <SelectItem value="Clash Royale">Clash Royale</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Tournament Date</Label>
                <Input
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  placeholder="e.g., August 15, 2023"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="prizePool">Prize Pool</Label>
                <Input
                  id="prizePool"
                  name="prizePool"
                  value={formData.prizePool}
                  onChange={handleInputChange}
                  placeholder="e.g., ₹15,000"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="teamSize">Team Size</Label>
                <Select
                  value={formData.teamSize}
                  onValueChange={(value) =>
                    handleSelectChange("teamSize", value)
                  }
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="1">1 (Solo)</SelectItem>
                    <SelectItem value="2">2 (Duo)</SelectItem>
                    <SelectItem value="4">4 (Squad)</SelectItem>
                    <SelectItem value="5">5 (Team)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxTeams">Max Teams</Label>
                <Select
                  value={formData.maxTeams}
                  onValueChange={(value) =>
                    handleSelectChange("maxTeams", value)
                  }
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select max teams" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="16">16 Teams</SelectItem>
                    <SelectItem value="32">32 Teams</SelectItem>
                    <SelectItem value="64">64 Teams</SelectItem>
                    <SelectItem value="128">128 Teams</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange("status", value)}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="Enter image URL (optional)"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
              className="border-gray-700 text-white hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateTournament}
              className="bg-primary hover:bg-primary/90"
              disabled={
                !formData.title || !formData.date || !formData.prizePool
              }
            >
              Create Tournament
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminTournaments;
