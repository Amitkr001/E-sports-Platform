import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { Session, User } from "@supabase/supabase-js";

// Set to false since we're now connected to real Supabase
const MOCK_AUTH = false;

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (
    email: string,
    password: string,
    username: string,
    role?: string,
  ) => Promise<{ error: any; user: any }>;
  signOut: () => Promise<void>;
  isLoggedIn: boolean;
  refreshUserData: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to fetch user profile data from profiles table
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching user profile:", error);
        return null;
      }

      return data;
    } catch (err) {
      console.error("Exception fetching user profile:", err);
      return null;
    }
  };

  // Function to refresh user data
  const refreshUserData = async () => {
    if (!user) return;

    const profile = await fetchUserProfile(user.id);
    if (profile) {
      // Update user metadata with profile data
      const { data, error } = await supabase.auth.updateUser({
        data: {
          username: profile.username,
          role: profile.role || "user",
          avatar_url: profile.avatar_url,
        },
      });

      if (!error && data.user) {
        setUser(data.user);
      }
    }
  };

  useEffect(() => {
    if (MOCK_AUTH) {
      // For development, we'll just set loading to false
      setLoading(false);
      return () => {};
    } else {
      // Get initial session
      supabase.auth.getSession().then(async ({ data: { session } }) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoggedIn(!!session);

        // If user is logged in, fetch their profile data
        if (session?.user) {
          await refreshUserData();
        }

        setLoading(false);
      });

      // Listen for auth changes
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoggedIn(!!session);

        // If user is logged in, fetch their profile data
        if (session?.user) {
          await refreshUserData();
        }

        setLoading(false);
      });

      return () => subscription.unsubscribe();
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    if (MOCK_AUTH) {
      // Mock successful login for development
      const mockUser = {
        id: "mock-user-id",
        email,
        user_metadata: {
          username: email.split("@")[0],
          role: email.includes("admin") ? "admin" : "user",
        },
      };
      setUser(mockUser as any);
      setIsLoggedIn(true);
      return { error: null };
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (!error && data.user) {
        // Fetch user profile to get role information
        const profile = await fetchUserProfile(data.user.id);
        if (profile) {
          // Update user metadata with profile data
          await supabase.auth.updateUser({
            data: {
              username: profile.username,
              role: profile.role || "user",
              avatar_url: profile.avatar_url,
            },
          });
        }
      }

      return { error };
    }
  };

  const signUp = async (
    email: string,
    password: string,
    username: string,
    role: string = "user",
  ) => {
    if (MOCK_AUTH) {
      // Mock successful registration for development
      const mockUser = {
        id: "mock-user-id",
        email,
        user_metadata: { username, role },
      };
      setUser(mockUser as any);
      setIsLoggedIn(true);
      return { user: mockUser, error: null };
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            role,
          },
        },
      });

      // If successful, create a profile in the profiles table
      if (!error && data.user) {
        try {
          const { error: profileError } = await supabase
            .from("profiles")
            .insert({
              id: data.user.id,
              username,
              role,
              avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            });

          if (profileError) {
            console.error("Error creating profile:", profileError);
          }
        } catch (profileErr) {
          console.error("Exception creating profile:", profileErr);
        }
      }

      return { user: data.user, error };
    }
  };

  const signOut = async () => {
    if (MOCK_AUTH) {
      // Mock sign out for development
      setUser(null);
      setSession(null);
      setIsLoggedIn(false);
    } else {
      await supabase.auth.signOut();
    }
  };

  const value = {
    session,
    user,
    loading,
    signIn,
    signUp,
    signOut,
    isLoggedIn,
    refreshUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
