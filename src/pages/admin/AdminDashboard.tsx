import React, { useState, useEffect } from "react";
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
  Loader2,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface DashboardStats {
  totalUsers: number;
  activeTournaments: number;
  articleViews: number;
  upcomingEvents: number;
  userGrowth: number;
  tournamentGrowth: number;
  articleViewsGrowth: number;
  eventsGrowth: number;
}

interface PopularContent {
  title: string;
  type: string;
  views: number;
}

interface RecentActivity {
  action: string;
  user: string;
  time: string;
  details: string;
}

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeTournaments: 0,
    articleViews: 0,
    upcomingEvents: 0,
    userGrowth: 0,
    tournamentGrowth: 0,
    articleViewsGrowth: 0,
    eventsGrowth: 0,
  });
  const [popularContent, setPopularContent] = useState<PopularContent[]>([]);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Fetch total users count
        const { count: userCount, error: userError } = await supabase
          .from("profiles")
          .select("*", { count: "exact", head: true });

        // Fetch active tournaments count
        const { data: tournaments, error: tournamentError } = await supabase
          .from("tournaments")
          .select("*")
          .eq("status", "open");

        // Fetch article views (sum of views column)
        const { data: articles, error: articleError } = await supabase
          .from("articles")
          .select("views");

        // Fetch upcoming events count
        const { data: events, error: eventError } = await supabase
          .from("events")
          .select("*")
          .eq("status", "upcoming");

        // Calculate total article views
        const totalViews =
          articles?.reduce((sum, article) => sum + (article.views || 0), 0) ||
          0;

        // Set dashboard stats
        setStats({
          totalUsers: userCount || 0,
          activeTournaments: tournaments?.length || 0,
          articleViews: totalViews,
          upcomingEvents: events?.length || 0,
          userGrowth: 12, // Mock growth data for now
          tournamentGrowth: 5,
          articleViewsGrowth: 24,
          eventsGrowth: 2,
        });

        // Fetch popular content
        const { data: popularArticles } = await supabase
          .from("articles")
          .select("title, views")
          .order("views", { ascending: false })
          .limit(3);

        const { data: popularTournaments } = await supabase
          .from("tournaments")
          .select("title, views")
          .order("views", { ascending: false })
          .limit(2);

        // Combine and format popular content
        const formattedPopularContent: PopularContent[] = [
          ...(popularArticles?.map((article) => ({
            title: article.title,
            type: "Article",
            views: article.views || 0,
          })) || []),
          ...(popularTournaments?.map((tournament) => ({
            title: tournament.title,
            type: "Tournament",
            views: tournament.views || 0,
          })) || []),
        ]
          .sort((a, b) => b.views - a.views)
          .slice(0, 5);

        setPopularContent(
          formattedPopularContent.length > 0
            ? formattedPopularContent
            : [
                {
                  title: "Free Fire Pro League Season 5",
                  type: "Tournament",
                  views: 3200,
                },
                {
                  title:
                    "BGMI vs Free Fire: Which is Better for Competitive Play?",
                  type: "Article",
                  views: 2800,
                },
                {
                  title: "Mobile Gaming Festival 2023",
                  type: "Event",
                  views: 2100,
                },
                {
                  title: "Top 10 BGMI Players of 2023",
                  type: "Article",
                  views: 1900,
                },
                {
                  title: "Free Fire World Series Qualifiers",
                  type: "Tournament",
                  views: 1700,
                },
              ],
        );

        // Fetch recent activity (this would typically come from an activity log table)
        // For now, we'll use mock data
        setRecentActivity([
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
            details: "Top 5 Smartphone Settings for Competitive BGMI Players",
          },
          {
            action: "User registered",
            user: "System",
            time: "6 hours ago",
            details: `${userCount || 0} total users registered`,
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
        ]);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();

    // Set up real-time subscription for updates
    const profilesSubscription = supabase
      .channel("profiles-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "profiles" },
        () => {
          fetchDashboardData();
        },
      )
      .subscribe();

    const tournamentsSubscription = supabase
      .channel("tournaments-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tournaments" },
        () => {
          fetchDashboardData();
        },
      )
      .subscribe();

    const articlesSubscription = supabase
      .channel("articles-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "articles" },
        () => {
          fetchDashboardData();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(profilesSubscription);
      supabase.removeChannel(tournamentsSubscription);
      supabase.removeChannel(articlesSubscription);
    };
  }, []);

  // Format stats for display
  const formattedStats = [
    {
      title: "Total Users",
      value: loading ? "--" : stats.totalUsers.toLocaleString(),
      change: `+${stats.userGrowth}%`,
      icon: <Users className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "Active Tournaments",
      value: loading ? "--" : stats.activeTournaments.toLocaleString(),
      change: `+${stats.tournamentGrowth}%`,
      icon: <Trophy className="h-5 w-5 text-yellow-500" />,
    },
    {
      title: "Article Views",
      value: loading
        ? "--"
        : stats.articleViews > 1000
          ? `${(stats.articleViews / 1000).toFixed(1)}k`
          : stats.articleViews.toLocaleString(),
      change: `+${stats.articleViewsGrowth}%`,
      icon: <Eye className="h-5 w-5 text-green-500" />,
    },
    {
      title: "Upcoming Events",
      value: loading ? "--" : stats.upcomingEvents.toLocaleString(),
      change: `+${stats.eventsGrowth}%`,
      icon: <Calendar className="h-5 w-5 text-purple-500" />,
    },
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {formattedStats.map((stat, index) => (
          <Card key={index} className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                {stat.title}
              </CardTitle>
              <div className="p-2 bg-gray-800 rounded-full">{stat.icon}</div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                  <span className="text-gray-400">Loading...</span>
                </div>
              ) : (
                <>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-green-500 flex items-center mt-1">
                    {stat.change}
                    <ArrowUpRight className="h-3 w-3 ml-1" />
                    <span className="text-gray-400 ml-1">from last month</span>
                  </p>
                </>
              )}
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
            {loading ? (
              <div className="h-[300px] flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : (
              <div className="h-[300px] flex items-center justify-center">
                <p className="text-gray-400">
                  User growth chart will appear here
                </p>
              </div>
            )}
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
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-gray-800 rounded-md"
                  >
                    <div className="w-3/4">
                      <div className="h-4 bg-gray-700 rounded animate-pulse mb-2 w-full"></div>
                      <div className="h-3 bg-gray-700 rounded animate-pulse w-1/3"></div>
                    </div>
                    <div className="w-1/4 flex justify-end">
                      <div className="h-4 bg-gray-700 rounded animate-pulse w-16"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {popularContent.map((item, index) => (
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
                      <span>{item.views.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-gray-800 rounded-md"
                  >
                    <div className="w-3/4">
                      <div className="h-4 bg-gray-700 rounded animate-pulse mb-2 w-full"></div>
                      <div className="h-3 bg-gray-700 rounded animate-pulse w-2/3"></div>
                    </div>
                    <div className="w-1/4">
                      <div className="h-4 bg-gray-700 rounded animate-pulse w-16 ml-auto mb-2"></div>
                      <div className="h-3 bg-gray-700 rounded animate-pulse w-24 ml-auto"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {recentActivity.map((item, index) => (
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
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
