
import React from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle forgot password logic here
  };

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email to reset your password"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>
        
        <Button type="submit" className="w-full">
          Send Reset Link
        </Button>
        
        <div className="text-center">
          <Link to="/signin" className="text-sm text-blue-600 hover:underline">
            Back to Sign In
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;
