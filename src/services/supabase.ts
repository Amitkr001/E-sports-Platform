import { supabase } from "@/lib/supabase";
import { Database } from "@/lib/supabase-types";

// Types
type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type Tournament = Database["public"]["Tables"]["tournaments"]["Row"];
type Event = Database["public"]["Tables"]["events"]["Row"];
type Article = Database["public"]["Tables"]["articles"]["Row"];
type Leaderboard = Database["public"]["Tables"]["leaderboard"]["Row"];
type Team = Database["public"]["Tables"]["teams"]["Row"];
type TeamMember = Database["public"]["Tables"]["team_members"]["Row"];

// User Profiles
export const getProfile = async (userId: string): Promise<Profile | null> => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
    return null;
  }

  return data;
};

export const updateProfile = async (
  profile: Partial<Profile> & { id: string },
): Promise<Profile | null> => {
  const { data, error } = await supabase
    .from("profiles")
    .update(profile)
    .eq("id", profile.id)
    .select()
    .single();

  if (error) {
    console.error("Error updating profile:", error);
    return null;
  }

  return data;
};

// Import mock tournaments for fallback
import { mockTournaments } from "@/data/mockTournaments";

// Tournaments
export const getTournaments = async (filters?: {
  status?: string;
  game?: string;
}): Promise<Tournament[]> => {
  try {
    console.log("Fetching tournaments with filters:", filters);
    let query = supabase.from("tournaments").select("*");

    if (filters?.status && filters.status !== "all") {
      query = query.eq("status", filters.status);
    }

    if (filters?.game && filters.game !== "all") {
      query = query.eq("game", filters.game);
    }

    const { data, error } = await query.order("date", { ascending: true });

    if (error) {
      console.error("Error fetching tournaments:", error);
      // Return mock data if there's an error
      return mockTournaments;
    }

    // If no data returned from Supabase, use mock data
    if (!data || data.length === 0) {
      console.log("No tournaments found in database, using mock data");
      return mockTournaments;
    }

    console.log("Tournaments fetched successfully:", data);
    return data;
  } catch (err) {
    console.error("Exception fetching tournaments:", err);
    // Return mock data if there's an exception
    return mockTournaments;
  }
};

export const getTournamentById = async (
  id: string,
): Promise<Tournament | null> => {
  const { data, error } = await supabase
    .from("tournaments")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching tournament:", error);
    return null;
  }

  return data;
};

// Events
export const getEvents = async (filters?: {
  status?: string;
  game?: string;
}): Promise<Event[]> => {
  let query = supabase.from("events").select("*");

  if (filters?.status && filters.status !== "all") {
    query = query.eq("status", filters.status);
  }

  if (filters?.game && filters.game !== "all") {
    query = query.eq("game", filters.game);
  }

  const { data, error } = await query.order("date", { ascending: true });

  if (error) {
    console.error("Error fetching events:", error);
    return [];
  }

  return data || [];
};

export const getEventById = async (id: string): Promise<Event | null> => {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching event:", error);
    return null;
  }

  return data;
};

// Articles
export const getArticles = async (filters?: {
  category?: string;
}): Promise<Article[]> => {
  let query = supabase.from("articles").select("*");

  if (filters?.category && filters.category !== "all") {
    query = query.eq("category", filters.category);
  }

  const { data, error } = await query.order("date", { ascending: false });

  if (error) {
    console.error("Error fetching articles:", error);
    return [];
  }

  return data || [];
};

export const getArticleById = async (id: string): Promise<Article | null> => {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching article:", error);
    return null;
  }

  return data;
};

// Leaderboard
export const getLeaderboard = async (game: string): Promise<Leaderboard[]> => {
  const { data, error } = await supabase
    .from("leaderboard")
    .select("*, profiles(username, avatar_url, country)")
    .eq("game", game)
    .order("rank", { ascending: true });

  if (error) {
    console.error("Error fetching leaderboard:", error);
    return [];
  }

  return data || [];
};

// Teams
export const createTeam = async (
  team: Omit<Team, "id" | "created_at" | "updated_at">,
  members: Omit<TeamMember, "id" | "team_id" | "created_at" | "updated_at">[],
) => {
  // Start a transaction
  const { data: teamData, error: teamError } = await supabase
    .from("teams")
    .insert(team)
    .select()
    .single();

  if (teamError) {
    console.error("Error creating team:", teamError);
    return null;
  }

  // Add team members
  const teamMembers = members.map((member) => ({
    ...member,
    team_id: teamData.id,
  }));

  const { error: membersError } = await supabase
    .from("team_members")
    .insert(teamMembers);

  if (membersError) {
    console.error("Error adding team members:", membersError);
    // Ideally we would roll back the team creation here
    return null;
  }

  // Update tournament registered teams count
  const { error: updateError } = await supabase.rpc(
    "increment_registered_teams",
    { tournament_id: team.tournament_id },
  );

  if (updateError) {
    console.error("Error updating tournament registered teams:", updateError);
  }

  return teamData;
};

export const getTeamsByUserId = async (userId: string): Promise<Team[]> => {
  // Get teams where user is captain
  const { data: captainTeams, error: captainError } = await supabase
    .from("teams")
    .select("*, tournaments(title, game, date, status)")
    .eq("captain_id", userId);

  if (captainError) {
    console.error("Error fetching captain teams:", captainError);
    return [];
  }

  // Get teams where user is a member
  const { data: memberTeams, error: memberError } = await supabase
    .from("team_members")
    .select("team_id")
    .eq("player_id", userId);

  if (memberError) {
    console.error("Error fetching member teams:", memberError);
    return captainTeams || [];
  }

  if (!memberTeams || memberTeams.length === 0) {
    return captainTeams || [];
  }

  const teamIds = memberTeams.map((t) => t.team_id);

  const { data: teams, error: teamsError } = await supabase
    .from("teams")
    .select("*, tournaments(title, game, date, status)")
    .in("id", teamIds);

  if (teamsError) {
    console.error("Error fetching member teams details:", teamsError);
    return captainTeams || [];
  }

  // Combine both sets of teams and remove duplicates
  const allTeams = [...(captainTeams || []), ...(teams || [])];
  const uniqueTeams = allTeams.filter(
    (team, index, self) => index === self.findIndex((t) => t.id === team.id),
  );

  return uniqueTeams;
};
