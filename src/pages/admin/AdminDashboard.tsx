import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Trophy,
  Users,
  FileText,
  Calendar,
  TrendingUp,
  Eye,
  ArrowUpRight,
} from "lucide-react";

const AdminDashboard = () => {
  // Mock data for dashboard stats
  const stats = [
    {
      title: "Total Users",
      value: "5,240",
      change: "+12%",
      icon: <Users className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "Active Tournaments",
      value: "24",
      change: "+5%",
      icon: <Trophy className="h-5 w-5 text-yellow-500" />,
    },
    {
      title: "Article Views",
      value: "18.5k",
      change: "+24%",
      icon: <Eye className="h-5 w-5 text-green-500" />,
    },
    {
      title: "Upcoming Events",
      value: "12",
      change: "+2%",
      icon: <Calendar className="h-5 w-5 text-purple-500" />,
    },
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                {stat.title}
              </CardTitle>
              <div className="p-2 bg-gray-800 rounded-full">{stat.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-green-500 flex items-center mt-1">
                {stat.change}
                <ArrowUpRight className="h-3 w-3 ml-1" />
                <span className="text-gray-400 ml-1">from last month</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-primary" />
              User Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <p className="text-gray-400">
                User growth chart will appear here
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <Eye className="h-5 w-5 mr-2 text-primary" />
              Popular Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Free Fire Pro League Season 5",
                  type: "Tournament",
                  views: "3.2k",
                },
                {
                  title:
                    "BGMI vs Free Fire: Which is Better for Competitive Play?",
                  type: "Article",
                  views: "2.8k",
                },
                {
                  title: "Mobile Gaming Festival 2023",
                  type: "Event",
                  views: "2.1k",
                },
                {
                  title: "Top 10 BGMI Players of 2023",
                  type: "Article",
                  views: "1.9k",
                },
                {
                  title: "Free Fire World Series Qualifiers",
                  type: "Tournament",
                  views: "1.7k",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-800 rounded-md hover:bg-gray-700 transition-colors"
                >
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-gray-400">{item.type}</p>
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 text-gray-400 mr-1" />
                    <span>{item.views}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: "New tournament created",
                  user: "Admin",
                  time: "2 hours ago",
                  details: "BGMI Masters Series",
                },
                {
                  action: "Article published",
                  user: "ContentEditor",
                  time: "5 hours ago",
                  details:
                    "Top 5 Smartphone Settings for Competitive BGMI Players",
                },
                {
                  action: "User registered",
                  user: "System",
                  time: "6 hours ago",
                  details: "50 new users registered today",
                },
                {
                  action: "Tournament completed",
                  user: "System",
                  time: "1 day ago",
                  details: "Free Fire Campus Challenge",
                },
                {
                  action: "Event updated",
                  user: "EventManager",
                  time: "1 day ago",
                  details: "Mobile Gaming Festival 2023 - Date changed",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-800 rounded-md hover:bg-gray-700 transition-colors"
                >
                  <div>
                    <p className="font-medium">{item.action}</p>
                    <p className="text-xs text-gray-400">{item.details}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{item.user}</p>
                    <p className="text-xs text-gray-400">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
