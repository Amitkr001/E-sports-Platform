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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Edit,
  Trash,
  Ban,
  CheckCircle,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  role: "admin" | "moderator" | "user";
  status: "active" | "suspended" | "banned";
  registeredDate: string;
  lastActive: string;
}

const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock users data
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      username: "GamingGuru",
      email: "guru@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=GamingGuru",
      role: "admin",
      status: "active",
      registeredDate: "Jan 15, 2023",
      lastActive: "2 hours ago",
    },
    {
      id: "2",
      username: "ProPlayer123",
      email: "player@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ProPlayer123",
      role: "user",
      status: "active",
      registeredDate: "Feb 28, 2023",
      lastActive: "5 hours ago",
    },
    {
      id: "3",
      username: "ContentCreator",
      email: "creator@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ContentCreator",
      role: "moderator",
      status: "active",
      registeredDate: "Mar 10, 2023",
      lastActive: "1 day ago",
    },
    {
      id: "4",
      username: "ToxicGamer",
      email: "toxic@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ToxicGamer",
      role: "user",
      status: "banned",
      registeredDate: "Apr 5, 2023",
      lastActive: "30 days ago",
    },
    {
      id: "5",
      username: "FreeFire_Pro",
      email: "freefire@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=FreeFire_Pro",
      role: "user",
      status: "active",
      registeredDate: "May 12, 2023",
      lastActive: "3 hours ago",
    },
    {
      id: "6",
      username: "BGMIChampion",
      email: "bgmi@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=BGMIChampion",
      role: "user",
      status: "active",
      registeredDate: "Jun 20, 2023",
      lastActive: "Just now",
    },
    {
      id: "7",
      username: "SpamBot",
      email: "spam@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SpamBot",
      role: "user",
      status: "suspended",
      registeredDate: "Jul 1, 2023",
      lastActive: "15 days ago",
    },
  ]);

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return (
          <Badge className="bg-purple-500/20 text-purple-500">Admin</Badge>
        );
      case "moderator":
        return (
          <Badge className="bg-blue-500/20 text-blue-500">Moderator</Badge>
        );
      case "user":
        return <Badge className="bg-gray-500/20 text-gray-400">User</Badge>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/20 text-green-500">Active</Badge>;
      case "suspended":
        return (
          <Badge className="bg-amber-500/20 text-amber-500">Suspended</Badge>
        );
      case "banned":
        return <Badge className="bg-red-500/20 text-red-500">Banned</Badge>;
      default:
        return null;
    }
  };

  const handleStatusChange = (
    userId: string,
    newStatus: "active" | "suspended" | "banned",
  ) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user,
      ),
    );
  };

  return (
    <AdminLayout title="User Management">
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-700 text-white"
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="border-gray-700 text-white hover:bg-gray-800"
          >
            Export Users
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            Add New User
          </Button>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-gray-800/50">
              <TableHead className="text-gray-400">User</TableHead>
              <TableHead className="text-gray-400">Role</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-gray-400">Registered</TableHead>
              <TableHead className="text-gray-400">Last Active</TableHead>
              <TableHead className="text-gray-400 text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id} className="hover:bg-gray-800/50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.username} />
                      <AvatarFallback>
                        {user.username.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.username}</p>
                      <p className="text-sm text-gray-400">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{getRoleBadge(user.role)}</TableCell>
                <TableCell>{getStatusBadge(user.status)}</TableCell>
                <TableCell>{user.registeredDate}</TableCell>
                <TableCell>{user.lastActive}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-400 hover:text-white"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-gray-900 border-gray-800 text-white">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-gray-800" />
                      <DropdownMenuItem
                        className="hover:bg-gray-800 cursor-pointer"
                        onClick={() =>
                          console.log(`View profile: ${user.username}`)
                        }
                      >
                        <Edit className="h-4 w-4 mr-2" /> Edit User
                      </DropdownMenuItem>
                      {user.status !== "active" && (
                        <DropdownMenuItem
                          className="hover:bg-gray-800 cursor-pointer text-green-500"
                          onClick={() => handleStatusChange(user.id, "active")}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" /> Activate
                        </DropdownMenuItem>
                      )}
                      {user.status !== "suspended" && (
                        <DropdownMenuItem
                          className="hover:bg-gray-800 cursor-pointer text-amber-500"
                          onClick={() =>
                            handleStatusChange(user.id, "suspended")
                          }
                        >
                          <Ban className="h-4 w-4 mr-2" /> Suspend
                        </DropdownMenuItem>
                      )}
                      {user.status !== "banned" && (
                        <DropdownMenuItem
                          className="hover:bg-gray-800 cursor-pointer text-red-500"
                          onClick={() => handleStatusChange(user.id, "banned")}
                        >
                          <Ban className="h-4 w-4 mr-2" /> Ban User
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator className="bg-gray-800" />
                      <DropdownMenuItem
                        className="hover:bg-gray-800 cursor-pointer text-red-500"
                        onClick={() =>
                          console.log(`Delete user: ${user.username}`)
                        }
                      >
                        <Trash className="h-4 w-4 mr-2" /> Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
