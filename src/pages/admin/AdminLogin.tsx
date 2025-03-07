import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Trophy, Lock, Mail, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { signIn, user, isLoggedIn } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn && user?.user_metadata?.role === "admin") {
      navigate("/admin");
    }
  }, [isLoggedIn, user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error.message);
        toast({
          variant: "destructive",
          title: "Login failed",
          description: error.message,
        });
      } else {
        // Check if user has admin role
        if (user?.user_metadata?.role !== "admin") {
          setError("You don't have permission to access the admin panel");
          toast({
            variant: "destructive",
            title: "Access denied",
            description: "You don't have permission to access the admin panel",
          });
        } else {
          toast({
            title: "Login successful",
            description: "Welcome to the admin panel",
          });
          navigate("/admin");
        }
      }
    } catch (error: any) {
      setError(error.message || "An unexpected error occurred");
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message || "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-lg p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
            <Trophy className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
          <p className="text-gray-400 mt-2">
            Sign in to access the admin dashboard
          </p>
        </div>

        {error && (
          <div className="bg-red-500/20 text-red-400 p-3 rounded-md flex items-start gap-2 mb-6">
            <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="pl-10 bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-10 bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none text-gray-400"
              >
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-primary hover:underline">
              Forgot password?
            </a>
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>

          <div className="text-center text-sm text-gray-400 mt-4">
            <p>For admin access, please contact the system administrator</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
