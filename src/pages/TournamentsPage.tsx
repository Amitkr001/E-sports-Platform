import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TournamentsList from "@/components/tournaments/TournamentsList";

const TournamentsPage = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <TournamentsList />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TournamentsPage;
