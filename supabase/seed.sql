-- Seed data for tournaments
INSERT INTO tournaments (title, game, image, date, prize_pool, team_size, registered_teams, max_teams, status)
VALUES
  ('Free Fire Pro League Season 5', 'Free Fire', 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80', 'August 15, 2023', '$15,000', 4, 24, 32, 'open'),
  ('BGMI Masters Series', 'BGMI', 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&q=80', 'September 5, 2023', '$20,000', 4, 28, 32, 'open'),
  ('Free Fire World Series Qualifiers', 'Free Fire', 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&q=80', 'July 28, 2023', '$25,000', 4, 12, 16, 'in-progress'),
  ('BGMI Rising Stars Tournament', 'BGMI', 'https://images.unsplash.com/photo-1519669556878-63bdad8a1a49?w=800&q=80', 'June 10, 2023', '$12,000', 4, 48, 50, 'completed');

-- Seed data for events
INSERT INTO events (title, description, image, date, location, type, game, registration_deadline, prize_pool, status, participants, max_participants)
VALUES
  ('Free Fire Pro League Season 5', 'The biggest Free Fire tournament of the year with teams from across the country competing for glory.', 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80', 'August 15-20, 2023', 'Online', 'online', 'Free Fire', 'August 1, 2023', '$15,000', 'upcoming', 24, 32),
  ('BGMI Masters Series', 'Elite BGMI tournament featuring the top professional teams competing for the championship title.', 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&q=80', 'September 5-12, 2023', 'Mumbai, India', 'offline', 'BGMI', 'August 20, 2023', '$20,000', 'upcoming', 28, 32),
  ('Free Fire World Series Qualifiers', 'Regional qualifiers for the Free Fire World Series. Top teams will advance to the global championship.', 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&q=80', 'July 28-30, 2023', 'Online + Delhi, India', 'hybrid', 'Free Fire', 'July 15, 2023', '$25,000', 'ongoing', 12, 16),
  ('BGMI Rising Stars Tournament', 'Tournament designed for emerging talent in the BGMI scene. Great opportunity for new teams to showcase their skills.', 'https://images.unsplash.com/photo-1519669556878-63bdad8a1a49?w=800&q=80', 'June 10-12, 2023', 'Online', 'online', 'BGMI', 'June 1, 2023', '$12,000', 'completed', 48, 50),
  ('Mobile Gaming Festival 2023', 'The biggest mobile gaming event of the year featuring tournaments, meet & greets with pro players, and exclusive game reveals.', 'https://images.unsplash.com/photo-1511882150382-421056c89033?w=800&q=80', 'October 15-17, 2023', 'Bangalore, India', 'offline', 'Multiple', 'September 30, 2023', '$50,000', 'upcoming', 120, 200),
  ('Free Fire Campus Challenge', 'Inter-college Free Fire tournament open to students across the country. Represent your campus and compete for scholarships.', 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&q=80', 'August 25-27, 2023', 'Online + Regional Finals', 'hybrid', 'Free Fire', 'August 10, 2023', '$8,000 + Scholarships', 'upcoming', 64, 128);

-- Create some sample profiles
INSERT INTO profiles (id, username, avatar_url, country, created_at, updated_at)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'Badge99', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Badge99', 'IN', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000002', 'TotalGaming', 'https://api.dicebear.com/7.x/avataaars/svg?seed=TotalGaming', 'IN', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000003', 'DesiGamers', 'https://api.dicebear.com/7.x/avataaars/svg?seed=DesiGamers', 'IN', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000004', 'ASGaming', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ASGaming', 'IN', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000005', 'GyanGaming', 'https://api.dicebear.com/7.x/avataaars/svg?seed=GyanGaming', 'IN', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000006', 'Jonathan', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jonathan', 'IN', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000007', 'Scout', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Scout', 'IN', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000008', 'Mortal', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mortal', 'IN', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000009', 'Dynamo', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dynamo', 'IN', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000010', 'Thug', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thug', 'IN', NOW(), NOW());

-- Seed data for leaderboard
INSERT INTO leaderboard (player_id, game, score, wins, rank, change)
VALUES
  -- Free Fire leaderboard
  ('00000000-0000-0000-0000-000000000001', 'Free Fire', 12500, 48, 1, 0),
  ('00000000-0000-0000-0000-000000000002', 'Free Fire', 11800, 42, 2, 1),
  ('00000000-0000-0000-0000-000000000003', 'Free Fire', 11200, 39, 3, -1),
  ('00000000-0000-0000-0000-000000000004', 'Free Fire', 10800, 36, 4, 2),
  ('00000000-0000-0000-0000-000000000005', 'Free Fire', 10500, 34, 5, 0),
  -- BGMI leaderboard
  ('00000000-0000-0000-0000-000000000006', 'BGMI', 14200, 52, 1, 0),
  ('00000000-0000-0000-0000-000000000007', 'BGMI', 13800, 49, 2, 0),
  ('00000000-0000-0000-0000-000000000008', 'BGMI', 13100, 45, 3, 1),
  ('00000000-0000-0000-0000-000000000009', 'BGMI', 12700, 43, 4, -1),
  ('00000000-0000-0000-0000-000000000010', 'BGMI', 12300, 41, 5, 2);

-- Seed data for articles
INSERT INTO articles (title, description, content, image, date, category, read_time, views, author_id)
VALUES
  ('Free Fire vs BGMI: Which Mobile Battle Royale Reigns Supreme?', 
   'A detailed comparison of the two most popular mobile battle royale games in India, analyzing gameplay mechanics, graphics, and competitive scenes.',
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.',
   'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800&q=80',
   'May 15, 2023',
   'Comparison',
   '5 min read',
   1245,
   '00000000-0000-0000-0000-000000000001'),
  ('Pro Player Spotlight: The Rise of Total Gaming in Free Fire', 
   'An exclusive interview with Ajju Bhai from Total Gaming, discussing his journey to becoming one of India\'s top Free Fire content creators and players.',
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.',
   'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
   'June 3, 2023',
   'Player Profiles',
   '8 min read',
   2389,
   '00000000-0000-0000-0000-000000000002'),
  ('Top 5 Smartphone Settings for Competitive BGMI Players', 
   'Optimize your mobile device for peak BGMI performance with these essential settings and configurations recommended by pro players.',
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.',
   'https://images.unsplash.com/photo-1558742569-fe6d39d05837?w=800&q=80',
   'April 22, 2023',
   'Tips & Tricks',
   '6 min read',
   3156,
   '00000000-0000-0000-0000-000000000006');
