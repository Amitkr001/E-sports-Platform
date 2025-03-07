-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  country TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tournaments table
CREATE TABLE tournaments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  game TEXT NOT NULL,
  image TEXT NOT NULL,
  date TEXT NOT NULL,
  prize_pool TEXT NOT NULL,
  team_size INTEGER NOT NULL,
  registered_teams INTEGER DEFAULT 0,
  max_teams INTEGER NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('open', 'in-progress', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  date TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('online', 'offline', 'hybrid')),
  game TEXT NOT NULL,
  registration_deadline TEXT NOT NULL,
  prize_pool TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('upcoming', 'ongoing', 'completed')),
  participants INTEGER DEFAULT 0,
  max_participants INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create articles table
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  image TEXT NOT NULL,
  date TEXT NOT NULL,
  category TEXT NOT NULL,
  read_time TEXT NOT NULL,
  views INTEGER DEFAULT 0,
  author_id UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create leaderboard table
CREATE TABLE leaderboard (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  player_id UUID REFERENCES profiles(id),
  game TEXT NOT NULL,
  score INTEGER NOT NULL,
  wins INTEGER NOT NULL,
  rank INTEGER NOT NULL,
  change INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(player_id, game)
);

-- Create teams table
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  captain_id UUID REFERENCES profiles(id),
  tournament_id UUID REFERENCES tournaments(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create team_members table
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID REFERENCES teams(id),
  player_id UUID REFERENCES profiles(id),
  in_game_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(team_id, player_id)
);

-- Create function to increment registered teams
CREATE OR REPLACE FUNCTION increment_registered_teams(tournament_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE tournaments
  SET registered_teams = registered_teams + 1
  WHERE id = tournament_id;
END;
$$ LANGUAGE plpgsql;

-- Create RLS policies
-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tournaments ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone."
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile."
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile."
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Tournaments policies
CREATE POLICY "Tournaments are viewable by everyone."
  ON tournaments FOR SELECT
  USING (true);

-- Events policies
CREATE POLICY "Events are viewable by everyone."
  ON events FOR SELECT
  USING (true);

-- Articles policies
CREATE POLICY "Articles are viewable by everyone."
  ON articles FOR SELECT
  USING (true);

-- Leaderboard policies
CREATE POLICY "Leaderboard is viewable by everyone."
  ON leaderboard FOR SELECT
  USING (true);

-- Teams policies
CREATE POLICY "Teams are viewable by everyone."
  ON teams FOR SELECT
  USING (true);

CREATE POLICY "Users can create teams."
  ON teams FOR INSERT
  WITH CHECK (auth.uid() = captain_id);

CREATE POLICY "Team captains can update their teams."
  ON teams FOR UPDATE
  USING (auth.uid() = captain_id);

-- Team members policies
CREATE POLICY "Team members are viewable by everyone."
  ON team_members FOR SELECT
  USING (true);

CREATE POLICY "Team captains can add members."
  ON team_members FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM teams
    WHERE teams.id = team_id AND teams.captain_id = auth.uid()
  ));

CREATE POLICY "Team captains can update members."
  ON team_members FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM teams
    WHERE teams.id = team_id AND teams.captain_id = auth.uid()
  ));

CREATE POLICY "Team captains can delete members."
  ON team_members FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM teams
    WHERE teams.id = team_id AND teams.captain_id = auth.uid()
  ));
