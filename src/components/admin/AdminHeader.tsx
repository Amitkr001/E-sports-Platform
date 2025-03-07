import React from "react";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";

const AdminHeader = ({ title }: { title: string }) => {
  const { user } = useAuth();

  return (
    <header className="bg-gray-900 border-b border-gray-800 py-4 px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">{title}</h1>

        <div className="flex items-center gap-4">
          <div className="relative w-64 hidden md:block">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              placeholder="Search..."
              className="pl-10 bg-gray-800 border-gray-700 text-white"
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="relative text-gray-300 hover:text-white"
          >
            <Bell size={20} />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-gray-900"></span>
          </Button>

          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email || "admin"}`}
                alt={user?.user_metadata?.username || "Admin"}
              />
              <AvatarFallback>
                {user?.user_metadata?.username?.substring(0, 2).toUpperCase() ||
                  "AD"}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium">
                {user?.user_metadata?.username || "Admin"}
              </p>
              <p className="text-xs text-gray-400">
                {user?.email || "admin@example.com"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
