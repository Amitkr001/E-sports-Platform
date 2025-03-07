import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import TournamentCategoryPage from "./pages/TournamentCategoryPage";
import { useAuth } from "./context/AuthContext";

// Lazy load pages for better performance
const TournamentsPage = lazy(() => import("./pages/TournamentsPage"));
const LeaderboardPage = lazy(() => import("./pages/LeaderboardPage"));
const ArticlesPage = lazy(() => import("./pages/ArticlesPage"));
const EventsPage = lazy(() => import("./pages/EventsPage"));

// Admin pages
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminTournaments = lazy(() => import("./pages/admin/AdminTournaments"));
const AdminArticles = lazy(() => import("./pages/admin/AdminArticles"));
const AdminAnalytics = lazy(() => import("./pages/admin/AdminAnalytics"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));

// Protected route component
const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  // Check if user has admin role
  if (user?.user_metadata?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
          Loading...
        </div>
      }
    >
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tournaments" element={<TournamentsPage />} />
          <Route
            path="/tournaments/:category"
            element={<TournamentCategoryPage />}
          />
          <Route path="/leaderboards" element={<LeaderboardPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/events" element={<EventsPage />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/tournaments"
            element={
              <ProtectedAdminRoute>
                <AdminTournaments />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/articles"
            element={
              <ProtectedAdminRoute>
                <AdminArticles />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/analytics"
            element={
              <ProtectedAdminRoute>
                <AdminAnalytics />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedAdminRoute>
                <AdminUsers />
              </ProtectedAdminRoute>
            }
          />

          {/* Add the tempobook route to prevent catchall issues */}
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
