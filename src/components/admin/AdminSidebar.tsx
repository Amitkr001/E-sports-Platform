import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Trophy,
  FileText,
  Calendar,
  Users,
  BarChart,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const AdminSidebar = () => {
  const location = useLocation();
  const { signOut } = useAuth();

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Tournaments",
      href: "/admin/tournaments",
      icon: <Trophy className="h-5 w-5" />,
    },
    {
      title: "Articles",
      href: "/admin/articles",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Events",
      href: "/admin/events",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Analytics",
      href: "/admin/analytics",
      icon: <BarChart className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <div className="h-screen w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <Trophy className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">Admin Panel</span>
        </div>
      </div>

      <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              location.pathname === item.href
                ? "bg-primary text-primary-foreground"
                : "text-gray-300 hover:bg-gray-800 hover:text-white",
            )}
          >
            {item.icon}
            {item.title}
          </Link>
        ))}
      </div>

      <div className="p-4 border-t border-gray-800">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-300 hover:bg-gray-800 hover:text-white"
          onClick={signOut}
        >
          <LogOut className="h-5 w-5 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
