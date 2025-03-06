import React from "react";
import ArticleCard from "./ArticleCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FeaturedArticles = () => {
  // Mock data for articles
  const articles = [
    {
      id: "1",
      title: "Free Fire vs BGMI: Which Mobile Battle Royale Reigns Supreme?",
      description:
        "A detailed comparison of the two most popular mobile battle royale games in India, analyzing gameplay mechanics, graphics, and competitive scenes.",
      image:
        "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800&q=80",
      date: "May 15, 2023",
      category: "Mobile Gaming",
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
      category: "Equipment",
      readTime: "6 min read",
      views: 3156,
    },
  ];

  return (
    <div className="w-full bg-gray-950 text-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold">Featured Articles</h2>
          <p className="text-gray-400">
            Latest news and insights from the gaming world
          </p>
        </div>

        <Button
          variant="outline"
          className="border-gray-700 text-white hover:bg-gray-800"
          onClick={() => console.log("View all articles")}
        >
          View All Articles
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedArticles;
