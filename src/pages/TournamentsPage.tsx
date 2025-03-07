import React, { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TournamentsList from "@/components/tournaments/TournamentsList";
import { useTournaments } from "@/hooks/useSupabaseData";
import { Skeleton } from "@/components/ui/skeleton";
import SupabaseDebug from "@/components/debug/SupabaseDebug";

const TournamentsPage = () => {
  const [showDebug, setShowDebug] = useState(false);
  const { tournaments, loading, error } = useTournaments();

  // Toggle debug panel with Ctrl+Shift+D
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "D") {
        e.preventDefault();
        setShowDebug((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {loading ? (
            <div className="space-y-6">
              <Skeleton className="h-12 w-64 bg-gray-800" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton
                    key={i}
                    className="h-[400px] w-full bg-gray-800 rounded-lg"
                  />
                ))}
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-10 text-red-400">
              <p>Error loading tournaments. Please try again later.</p>
              <p className="text-sm mt-2">{error.message}</p>
            </div>
          ) : (
            <TournamentsList initialTournaments={tournaments} />
          )}

          {showDebug && (
            <div className="mt-8">
              <SupabaseDebug />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TournamentsPage;
