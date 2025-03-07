import React, { useState } from "react";
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
import { Plus, Search, Edit, Trash, Eye } from "lucide-react";
import { mockTournaments } from "@/data/mockTournaments";

const AdminTournaments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [tournaments, setTournaments] = useState(mockTournaments);

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateTournament = () => {
    // In a real app, this would make an API call to create the tournament
    const newTournament = {
      id: `${tournaments.length + 1}`,
      title: formData.title,
      game: formData.game,
      image:
        formData.image ||
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
      date: formData.date,
      prizePool: formData.prizePool,
      teamSize: parseInt(formData.teamSize),
      registeredTeams: 0,
      maxTeams: parseInt(formData.maxTeams),
      status: formData.status as "open" | "in-progress" | "completed",
    };

    setTournaments([...tournaments, newTournament]);
    setIsCreateDialogOpen(false);
    resetForm();
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
            {filteredTournaments.map((tournament) => (
              <TableRow key={tournament.id} className="hover:bg-gray-800/50">
                <TableCell className="font-medium">
                  {tournament.title}
                </TableCell>
                <TableCell>{tournament.game}</TableCell>
                <TableCell>{tournament.date}</TableCell>
                <TableCell>{tournament.prizePool}</TableCell>
                <TableCell>
                  {tournament.registeredTeams}/{tournament.maxTeams}
                </TableCell>
                <TableCell>{getStatusBadge(tournament.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-400 hover:text-white"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-blue-400 hover:text-blue-300"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-400 hover:text-red-300"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
