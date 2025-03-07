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
  ) => Promise<{ error: any; user: any }>;
  signOut: () => Promise<void>;
  isLoggedIn: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (MOCK_AUTH) {
      // For development, we'll just set loading to false
      setLoading(false);
      return () => {};
    } else {
      // Get initial session
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoggedIn(!!session);
        setLoading(false);
      });

      // Listen for auth changes
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoggedIn(!!session);
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
        user_metadata: { username: email.split("@")[0] },
      };
      setUser(mockUser as any);
      setIsLoggedIn(true);
      return { error: null };
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    }
  };

  const signUp = async (email: string, password: string, username: string) => {
    if (MOCK_AUTH) {
      // Mock successful registration for development
      const mockUser = {
        id: "mock-user-id",
        email,
        user_metadata: { username },
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
