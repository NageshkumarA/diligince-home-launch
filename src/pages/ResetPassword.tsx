
import React from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle reset password logic here
  };

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter your new password"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="password">New Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter new password"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            required
          />
        </div>
        
        <Button type="submit" className="w-full">
          Reset Password
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

export default ResetPassword;
