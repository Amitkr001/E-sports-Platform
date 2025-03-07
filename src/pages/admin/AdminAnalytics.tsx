import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Eye,
  TrendingUp,
  Users,
  Trophy,
  FileText,
  Calendar,
  Download,
} from "lucide-react";

const AdminAnalytics = () => {
  return (
    <AdminLayout title="Analytics & Reports">
      <div className="flex justify-between items-center mb-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-gray-900 border border-gray-800">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="content"
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Content Performance
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              User Analytics
            </TabsTrigger>
            <TabsTrigger
              value="tournaments"
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Tournament Stats
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                {
                  title: "Total Page Views",
                  value: "124,892",
                  change: "+18.2%",
                  icon: <Eye className="h-5 w-5 text-blue-500" />,
                },
                {
                  title: "Unique Visitors",
                  value: "32,456",
                  change: "+12.5%",
                  icon: <Users className="h-5 w-5 text-green-500" />,
                },
                {
                  title: "Avg. Session Duration",
                  value: "4m 32s",
                  change: "+2.3%",
                  icon: <TrendingUp className="h-5 w-5 text-yellow-500" />,
                },
                {
                  title: "Bounce Rate",
                  value: "28.4%",
                  change: "-3.1%",
                  icon: <TrendingUp className="h-5 w-5 text-purple-500" />,
                },
              ].map((stat, index) => (
                <Card key={index} className="bg-gray-900 border-gray-800">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">
                      {stat.title}
                    </CardTitle>
                    <div className="p-2 bg-gray-800 rounded-full">
                      {stat.icon}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-green-500 flex items-center mt-1">
                      {stat.change}
                      <span className="text-gray-400 ml-1">
                        from last month
                      </span>
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
                    Traffic Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <p className="text-gray-400">
                      Traffic chart will appear here
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center">
                    <Users className="h-5 w-5 mr-2 text-primary" />
                    User Demographics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <p className="text-gray-400">
                      Demographics chart will appear here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="content" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  title: "Top Articles",
                  icon: <FileText className="h-5 w-5 text-blue-500" />,
                  items: [
                    { name: "Free Fire vs BGMI: Which is Better", views: 3245 },
                    { name: "Top 5 Smartphone Settings for BGMI", views: 2876 },
                    { name: "Pro Player Spotlight: Total Gaming", views: 2389 },
                    { name: "The Evolution of Free Fire", views: 1876 },
                    { name: "BGMI Tournament Strategy Guide", views: 1654 },
                  ],
                },
                {
                  title: "Popular Tournaments",
                  icon: <Trophy className="h-5 w-5 text-yellow-500" />,
                  items: [
                    { name: "Free Fire Pro League Season 5", views: 4532 },
                    { name: "BGMI Masters Series", views: 3987 },
                    { name: "Free Fire World Series Qualifiers", views: 3421 },
                    { name: "PUBG Mobile Global Invitational", views: 2876 },
                    { name: "Call of Duty Mobile Championship", views: 2345 },
                  ],
                },
                {
                  title: "Upcoming Events",
                  icon: <Calendar className="h-5 w-5 text-green-500" />,
                  items: [
                    { name: "Mobile Gaming Festival 2023", views: 3876 },
                    { name: "Free Fire Campus Challenge", views: 2987 },
                    { name: "BGMI College Cup", views: 2654 },
                    { name: "Mobile Legends Championship", views: 1987 },
                    { name: "Clash Royale Community Cup", views: 1543 },
                  ],
                },
              ].map((section, index) => (
                <Card key={index} className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold flex items-center">
                      {section.icon}
                      <span className="ml-2">{section.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {section.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 bg-gray-800 rounded-md hover:bg-gray-700 transition-colors"
                        >
                          <p className="font-medium truncate max-w-[180px]">
                            {item.name}
                          </p>
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 text-gray-400 mr-1" />
                            <span>{item.views.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gray-900 border-gray-800 mb-8">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                  Content Performance Over Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center">
                  <p className="text-gray-400">
                    Performance chart will appear here
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                {
                  title: "Total Users",
                  value: "5,240",
                  change: "+12%",
                  icon: <Users className="h-5 w-5 text-blue-500" />,
                },
                {
                  title: "New Users (30d)",
                  value: "842",
                  change: "+18%",
                  icon: <Users className="h-5 w-5 text-green-500" />,
                },
                {
                  title: "Active Users",
                  value: "3,128",
                  change: "+5%",
                  icon: <Users className="h-5 w-5 text-yellow-500" />,
                },
                {
                  title: "Conversion Rate",
                  value: "4.2%",
                  change: "+0.8%",
                  icon: <TrendingUp className="h-5 w-5 text-purple-500" />,
                },
              ].map((stat, index) => (
                <Card key={index} className="bg-gray-900 border-gray-800">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">
                      {stat.title}
                    </CardTitle>
                    <div className="p-2 bg-gray-800 rounded-full">
                      {stat.icon}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-green-500 flex items-center mt-1">
                      {stat.change}
                      <span className="text-gray-400 ml-1">
                        from last month
                      </span>
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center">
                    <Users className="h-5 w-5 mr-2 text-primary" />
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
                    <Users className="h-5 w-5 mr-2 text-primary" />
                    User Engagement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <p className="text-gray-400">
                      Engagement chart will appear here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tournaments" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                {
                  title: "Total Tournaments",
                  value: "124",
                  change: "+8%",
                  icon: <Trophy className="h-5 w-5 text-yellow-500" />,
                },
                {
                  title: "Active Tournaments",
                  value: "24",
                  change: "+5%",
                  icon: <Trophy className="h-5 w-5 text-green-500" />,
                },
                {
                  title: "Total Registrations",
                  value: "8,432",
                  change: "+15%",
                  icon: <Users className="h-5 w-5 text-blue-500" />,
                },
                {
                  title: "Avg. Teams per Tournament",
                  value: "28",
                  change: "+3%",
                  icon: <Users className="h-5 w-5 text-purple-500" />,
                },
              ].map((stat, index) => (
                <Card key={index} className="bg-gray-900 border-gray-800">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">
                      {stat.title}
                    </CardTitle>
                    <div className="p-2 bg-gray-800 rounded-full">
                      {stat.icon}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-green-500 flex items-center mt-1">
                      {stat.change}
                      <span className="text-gray-400 ml-1">
                        from last month
                      </span>
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gray-900 border-gray-800 mb-8">
              <CardHeader className="flex justify-between items-center">
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-primary" />
                  Tournament Performance
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-700 text-white hover:bg-gray-800"
                >
                  <Download className="h-4 w-4 mr-2" /> Export Report
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-800">
                        <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
                          Tournament
                        </th>
                        <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
                          Game
                        </th>
                        <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
                          Registrations
                        </th>
                        <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
                          Fill Rate
                        </th>
                        <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
                          Views
                        </th>
                        <th className="text-left py-3 px-4 text-gray-400 text-sm font-medium">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          name: "Free Fire Pro League Season 5",
                          game: "Free Fire",
                          registrations: "24/32",
                          fillRate: "75%",
                          views: 4532,
                          status: "Open",
                        },
                        {
                          name: "BGMI Masters Series",
                          game: "BGMI",
                          registrations: "28/32",
                          fillRate: "87.5%",
                          views: 3987,
                          status: "Open",
                        },
                        {
                          name: "Free Fire World Series Qualifiers",
                          game: "Free Fire",
                          registrations: "12/16",
                          fillRate: "75%",
                          views: 3421,
                          status: "In Progress",
                        },
                        {
                          name: "BGMI Rising Stars Tournament",
                          game: "BGMI",
                          registrations: "48/50",
                          fillRate: "96%",
                          views: 2876,
                          status: "Completed",
                        },
                        {
                          name: "Call of Duty Mobile Championship",
                          game: "Call of Duty Mobile",
                          registrations: "18/32",
                          fillRate: "56.3%",
                          views: 2345,
                          status: "Open",
                        },
                      ].map((tournament, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-800 hover:bg-gray-800/50"
                        >
                          <td className="py-3 px-4 font-medium">
                            {tournament.name}
                          </td>
                          <td className="py-3 px-4">{tournament.game}</td>
                          <td className="py-3 px-4">
                            {tournament.registrations}
                          </td>
                          <td className="py-3 px-4">{tournament.fillRate}</td>
                          <td className="py-3 px-4">
                            {tournament.views.toLocaleString()}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                tournament.status === "Open"
                                  ? "bg-green-500/20 text-green-500"
                                  : tournament.status === "In Progress"
                                    ? "bg-amber-500/20 text-amber-500"
                                    : "bg-gray-500/20 text-gray-400"
                              }`}
                            >
                              {tournament.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminAnalytics;
