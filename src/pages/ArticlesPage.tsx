import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Calendar, Clock, Eye } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ArticleCard from "@/components/articles/ArticleCard";

interface Article {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  category: string;
  readTime: string;
  views: number;
}

const ArticlesPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Mock data for articles
  const articles: Article[] = [
    {
      id: "1",
      title: "Free Fire vs BGMI: Which Mobile Battle Royale Reigns Supreme?",
      description:
        "A detailed comparison of the two most popular mobile battle royale games in India, analyzing gameplay mechanics, graphics, and competitive scenes.",
      image:
        "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800&q=80",
      date: "May 15, 2023",
      category: "Comparison",
      readTime: "5 min read",
      views: 1245,
    },
    {
      id: "2",
      title: "Pro Player Spotlight: The Rise of Total Gaming in Free Fire",
      description:
        "An exclusive interview with Ajju Bhai from Total Gaming, discussing his journey to becoming one of India's top Free Fire content creators and players.",
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
      date: "June 3, 2023",
      category: "Player Profiles",
      readTime: "8 min read",
      views: 2389,
    },
    {
      id: "3",
      title: "Top 5 Smartphone Settings for Competitive BGMI Players",
      description:
        "Optimize your mobile device for peak BGMI performance with these essential settings and configurations recommended by pro players.",
      image:
        "https://images.unsplash.com/photo-1558742569-fe6d39d05837?w=800&q=80",
      date: "April 22, 2023",
      category: "Tips & Tricks",
      readTime: "6 min read",
      views: 3156,
    },
    {
      id: "4",
      title: "The Evolution of Free Fire: From Launch to Global Phenomenon",
      description:
        "Tracing the journey of Free Fire from its humble beginnings to becoming one of the most downloaded mobile games worldwide.",
      image:
        "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&q=80",
      date: "March 10, 2023",
      category: "Game History",
      readTime: "7 min read",
      views: 1876,
    },
    {
      id: "5",
      title: "BGMI Tournament Strategy Guide: Positioning for Late Game",
      description:
        "Learn advanced positioning techniques for the final circles in BGMI tournaments to maximize your chances of securing that Chicken Dinner.",
      image:
        "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&q=80",
      date: "May 28, 2023",
      category: "Tips & Tricks",
      readTime: "9 min read",
      views: 2754,
    },
    {
      id: "6",
      title:
        "Free Fire Character Guide: Choosing the Best Abilities for Your Playstyle",
      description:
        "A comprehensive breakdown of all character abilities in Free Fire and how to combine them effectively for different strategies.",
      image:
        "https://images.unsplash.com/photo-1519669556878-63bdad8a1a49?w=800&q=80",
      date: "June 15, 2023",
      category: "Tips & Tricks",
      readTime: "10 min read",
      views: 3421,
    },
    {
      id: "7",
      title:
        "The Business of Mobile Esports: How BGMI and Free Fire Are Changing the Game",
      description:
        "An analysis of the economic impact of mobile esports in India, with a focus on sponsorships, tournaments, and career opportunities.",
      image:
        "https://images.unsplash.com/photo-1569974498991-d3c12a504f95?w=800&q=80",
      date: "April 5, 2023",
      category: "Industry",
      readTime: "8 min read",
      views: 1932,
    },
    {
      id: "8",
      title:
        "From Casual to Pro: A Beginner's Journey in Competitive Mobile Gaming",
      description:
        "Follow the story of a casual player who transformed into a professional competitor in the mobile gaming scene over the course of a year.",
      image:
        "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&q=80",
      date: "March 22, 2023",
      category: "Player Profiles",
      readTime: "6 min read",
      views: 2145,
    },
  ];

  // Get unique categories for filter dropdown
  const categories = [
    "all",
    ...new Set(articles.map((article) => article.category)),
  ];

  // Filter articles based on active tab, search query, and category filter
  const filteredArticles = articles.filter((article) => {
    // Filter by search query
    if (
      searchQuery &&
      !article.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !article.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;

    // Filter by category
    if (categoryFilter !== "all" && article.category !== categoryFilter)
      return false;

    return true;
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Gaming Articles</h1>
          <p className="text-gray-400 text-lg">
            Latest news, guides, and insights for mobile gamers
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="relative w-full md:w-64">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-900 border-gray-700 text-white w-full"
            />
          </div>

          <div className="relative w-full md:w-48">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="bg-gray-900 border-gray-700 text-white w-full">
                <div className="flex items-center gap-2">
                  <Filter size={16} />
                  <SelectValue placeholder="Filter by category" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700 text-white">
                {categories.map((category) => (
                  <SelectItem
                    key={category}
                    value={category}
                    className="capitalize"
                  >
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mb-12">
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
            className="mb-6"
          >
            <TabsList className="bg-gray-900 border border-gray-800">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                All Articles
              </TabsTrigger>
              <TabsTrigger
                value="guides"
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Guides & Tutorials
              </TabsTrigger>
              <TabsTrigger
                value="news"
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                News & Updates
              </TabsTrigger>
              <TabsTrigger
                value="interviews"
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Player Interviews
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              No articles found matching your search criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.id} {...article} />
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-center mt-8 mb-12">
          <Button
            variant="outline"
            className="border-gray-700 text-white hover:bg-gray-800"
          >
            Load More Articles
          </Button>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Featured Article</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <img
                src="https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800&q=80"
                alt="Featured Article"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-2">
                Mastering Mobile Aim: Pro Tips for Free Fire and BGMI
              </h3>
              <p className="text-gray-300 mb-4">
                Discover the secrets to improving your aim on mobile devices
                with these expert tips from professional players. Learn about
                sensitivity settings, gyroscope usage, and practice drills that
                will help you dominate in both Free Fire and BGMI.
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>June 20, 2023</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>12 min read</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye size={14} />
                  <span>5,432 views</span>
                </div>
              </div>
              <Button className="bg-primary hover:bg-primary/90">
                Read Full Article
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-gray-300 mb-4">
            Stay updated with the latest mobile gaming news, tournament
            announcements, and exclusive content delivered straight to your
            inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Your email address"
              className="bg-gray-800 border-gray-700 text-white flex-grow"
            />
            <Button className="bg-primary hover:bg-primary/90 whitespace-nowrap">
              Subscribe Now
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ArticlesPage;
