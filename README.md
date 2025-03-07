# Mobile Gamers Hub

A comprehensive eSports platform for mobile gamers, focusing on Free Fire and BGMI tournaments, leaderboards, and gaming articles.

## Features

- User authentication with Supabase
- Tournament registration and management
- Leaderboards for different games
- Gaming articles and news
- Events calendar
- Team formation and management

## Tech Stack

- React with TypeScript
- Vite for fast development
- Tailwind CSS for styling
- Shadcn UI components
- Supabase for backend and authentication

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account

### Setup

1. Clone the repository

```bash
git clone https://github.com/yourusername/mobile-gamers-hub.git
cd mobile-gamers-hub
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Set up environment variables

Copy the `.env.example` file to `.env` and fill in your Supabase credentials:

```bash
cp .env.example .env
```

4. Start the development server

```bash
npm run dev
# or
yarn dev
```

### Supabase Setup

1. Create a new Supabase project
2. Run the migration scripts in the `supabase/migrations` folder
3. Run the seed script in `supabase/seed.sql` to populate the database with sample data
4. Copy your Supabase URL and anon key to the `.env` file

## Database Schema

The application uses the following tables in Supabase:

- `profiles`: User profiles
- `tournaments`: Tournament information
- `events`: Gaming events
- `articles`: Gaming articles and news
- `leaderboard`: Player rankings
- `teams`: Team information
- `team_members`: Team membership

## Deployment

To build the application for production:

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory, ready to be deployed to your hosting provider.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
