export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      articles: {
        Row: {
          id: string;
          title: string;
          description: string;
          content: string;
          image: string;
          date: string;
          category: string;
          read_time: string;
          views: number;
          author_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          content: string;
          image: string;
          date: string;
          category: string;
          read_time: string;
          views?: number;
          author_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          content?: string;
          image?: string;
          date?: string;
          category?: string;
          read_time?: string;
          views?: number;
          author_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      events: {
        Row: {
          id: string;
          title: string;
          description: string;
          image: string;
          date: string;
          location: string;
          type: "online" | "offline" | "hybrid";
          game: string;
          registration_deadline: string;
          prize_pool: string;
          status: "upcoming" | "ongoing" | "completed";
          participants: number;
          max_participants: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          image: string;
          date: string;
          location: string;
          type: "online" | "offline" | "hybrid";
          game: string;
          registration_deadline: string;
          prize_pool: string;
          status: "upcoming" | "ongoing" | "completed";
          participants?: number;
          max_participants: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          image?: string;
          date?: string;
          location?: string;
          type?: "online" | "offline" | "hybrid";
          game?: string;
          registration_deadline?: string;
          prize_pool?: string;
          status?: "upcoming" | "ongoing" | "completed";
          participants?: number;
          max_participants?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          username: string;
          avatar_url: string | null;
          bio: string | null;
          country: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username: string;
          avatar_url?: string | null;
          bio?: string | null;
          country?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          avatar_url?: string | null;
          bio?: string | null;
          country?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      tournaments: {
        Row: {
          id: string;
          title: string;
          game: string;
          image: string;
          date: string;
          prize_pool: string;
          team_size: number;
          registered_teams: number;
          max_teams: number;
          status: "open" | "in-progress" | "completed";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          game: string;
          image: string;
          date: string;
          prize_pool: string;
          team_size: number;
          registered_teams?: number;
          max_teams: number;
          status: "open" | "in-progress" | "completed";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          game?: string;
          image?: string;
          date?: string;
          prize_pool?: string;
          team_size?: number;
          registered_teams?: number;
          max_teams?: number;
          status?: "open" | "in-progress" | "completed";
          created_at?: string;
          updated_at?: string;
        };
      };
      leaderboard: {
        Row: {
          id: string;
          player_id: string;
          game: string;
          score: number;
          wins: number;
          rank: number;
          change: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          player_id: string;
          game: string;
          score: number;
          wins: number;
          rank: number;
          change?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          player_id?: string;
          game?: string;
          score?: number;
          wins?: number;
          rank?: number;
          change?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      teams: {
        Row: {
          id: string;
          name: string;
          captain_id: string;
          tournament_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          captain_id: string;
          tournament_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          captain_id?: string;
          tournament_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      team_members: {
        Row: {
          id: string;
          team_id: string;
          player_id: string;
          in_game_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          team_id: string;
          player_id: string;
          in_game_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          team_id?: string;
          player_id?: string;
          in_game_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
