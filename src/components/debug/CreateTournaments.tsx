import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { mockTournaments } from "@/data/mockTournaments";

const CreateTournaments = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string>("");
  const { toast } = useToast();

  const createTournaments = async () => {
    setLoading(true);
    setResult("");

    try {
      // Format tournaments for Supabase
      const formattedTournaments = mockTournaments.map((tournament) => ({
        title: tournament.title,
        game: tournament.game,
        image: tournament.image,
        date: tournament.date,
        prize_pool: tournament.prizePool,
        team_size: tournament.teamSize,
        registered_teams: tournament.registeredTeams,
        max_teams: tournament.maxTeams,
        status: tournament.status,
      }));

      // Insert tournaments into Supabase
      const { data, error } = await supabase
        .from("tournaments")
        .insert(formattedTournaments)
        .select();

      if (error) {
        setResult(`Error creating tournaments: ${error.message}`);
        toast({
          variant: "destructive",
          title: "Error creating tournaments",
          description: error.message,
        });
      } else {
        setResult(`Successfully created ${data.length} tournaments!`);
        toast({
          title: "Tournaments Created",
          description: `Successfully added ${data.length} tournaments to the database.`,
        });
      }
    } catch (err) {
      setResult(`Exception: ${err.message}`);
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">Create Tournament Data</h2>
      <p className="text-gray-300 mb-4">
        This will add {mockTournaments.length} sample tournaments to your
        Supabase database.
      </p>

      <Button
        onClick={createTournaments}
        disabled={loading}
        className="bg-green-600 hover:bg-green-700"
      >
        {loading ? "Creating..." : "Create Sample Tournaments"}
      </Button>

      {result && (
        <div className="mt-4 bg-gray-800 p-4 rounded-md overflow-auto max-h-60">
          <pre className="text-sm text-gray-300 whitespace-pre-wrap">
            {result}
          </pre>
        </div>
      )}
    </div>
  );
};

export default CreateTournaments;
