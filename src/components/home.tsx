import React from "react";
import Navbar from "./layout/Navbar";
import HeroSection from "./home/HeroSection";
import TournamentsList from "./tournaments/TournamentsList";
import LeaderboardPreview from "./leaderboard/LeaderboardPreview";
import FeaturedArticles from "./articles/FeaturedArticles";
import Footer from "./layout/Footer";

function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <main>
        <HeroSection />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <TournamentsList />
          <div className="py-16">
            <LeaderboardPreview />
          </div>
          <div className="py-16">
            <FeaturedArticles />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
