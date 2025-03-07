import { useState, useEffect } from "react";
import * as supabaseService from "@/services/supabase";

// Hook for tournaments
export function useTournaments(filters?: { status?: string; game?: string }) {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await supabaseService.getTournaments(filters);
        setTournaments(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred"),
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters?.status, filters?.game]);

  return { tournaments, loading, error };
}

// Hook for events
export function useEvents(filters?: { status?: string; game?: string }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await supabaseService.getEvents(filters);
        setEvents(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred"),
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters?.status, filters?.game]);

  return { events, loading, error };
}

// Hook for articles
export function useArticles(filters?: { category?: string }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await supabaseService.getArticles(filters);
        setArticles(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred"),
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters?.category]);

  return { articles, loading, error };
}

// Hook for leaderboard
export function useLeaderboard(game: string) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await supabaseService.getLeaderboard(game);
        setLeaderboard(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred"),
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [game]);

  return { leaderboard, loading, error };
}

// Hook for user profile
export function useProfile(userId: string | undefined) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await supabaseService.getProfile(userId);
        setProfile(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred"),
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  return { profile, loading, error };
}

// Hook for user teams
export function useUserTeams(userId: string | undefined) {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) {
      setTeams([]);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await supabaseService.getTeamsByUserId(userId);
        setTeams(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred"),
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  return { teams, loading, error };
}
