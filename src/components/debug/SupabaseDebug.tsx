import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

const SupabaseDebug = () => {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const testConnection = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("profiles").select("count");

      if (error) {
        setResult(`Error: ${error.message}`);
        toast({
          variant: "destructive",
          title: "Connection Error",
          description: error.message,
        });
      } else {
        setResult(`Connection successful! Data: ${JSON.stringify(data)}`);
        toast({
          title: "Connection Successful",
          description: "Successfully connected to Supabase",
        });
      }
    } catch (err) {
      setResult(`Exception: ${err.message}`);
      toast({
        variant: "destructive",
        title: "Connection Exception",
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const createTestData = async () => {
    setLoading(true);
    try {
      // Create a test tournament
      const { data: tournamentData, error: tournamentError } = await supabase
        .from("tournaments")
        .insert({
          title: "Test Tournament",
          game: "Free Fire",
          image:
            "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
          date: "August 30, 2023",
          prize_pool: "$5,000",
          team_size: 4,
          registered_teams: 0,
          max_teams: 16,
          status: "open",
        })
        .select();

      if (tournamentError) {
        setResult(`Tournament Error: ${tournamentError.message}`);
        toast({
          variant: "destructive",
          title: "Tournament Creation Error",
          description: tournamentError.message,
        });
        setLoading(false);
        return;
      }

      setResult(
        `Test data created successfully! Tournament ID: ${tournamentData[0]?.id}`,
      );
      toast({
        title: "Test Data Created",
        description: "Successfully created test tournament data",
      });
    } catch (err) {
      setResult(`Exception: ${err.message}`);
      toast({
        variant: "destructive",
        title: "Data Creation Exception",
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Supabase Debug</h2>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={testConnection}
            disabled={loading}
            className="bg-primary hover:bg-primary/90"
          >
            {loading ? "Testing..." : "Test Connection"}
          </Button>
          <Button
            onClick={createTestData}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700"
          >
            {loading ? "Creating..." : "Create Test Data"}
          </Button>
        </div>

        {result && (
          <div className="bg-gray-800 p-4 rounded-md overflow-auto max-h-60">
            <pre className="text-sm text-gray-300 whitespace-pre-wrap">
              {result}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupabaseDebug;
