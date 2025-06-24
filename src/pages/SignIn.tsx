import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/hooks/use-toast";
import { UserProfile } from "@/types/shared";

// Mock user accounts for testing
const mockUsers: { email: string; password: string; profile: UserProfile }[] = [
  {
    email: "industry@test.com",
    password: "password123",
    profile: {
      id: "1",
      email: "industry@test.com",
      name: "John Manufacturing",
      role: "industry",
      avatar: "",
      initials: "JM",
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      preferences: {
        theme: 'system',
        notifications: { email: true, push: true, sms: false, marketing: false },
        language: 'en',
        timezone: 'UTC',
      },
      profile: {
        companyName: "ABC Manufacturing",
        industryType: "Manufacturing"
      }
    }
  },
  {
    email: "professional@test.com",
    password: "password123",
    profile: {
      id: "2",
      email: "professional@test.com",
      name: "Rahul Engineer",
      role: "professional",
      avatar: "",
      initials: "RE",
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      preferences: {
        theme: 'system',
        notifications: { email: true, push: true, sms: false, marketing: false },
        language: 'en',
        timezone: 'UTC',
      },
      profile: {
        fullName: "Rahul Engineer",
        expertise: "Industrial Automation"
      }
    }
  },
  {
    email: "service@test.com",
    password: "password123",
    profile: {
      id: "3",
      email: "service@test.com",
      name: "Tech Services Co",
      role: "vendor",
      avatar: "",
      initials: "TS",
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      preferences: {
        theme: 'system',
        notifications: { email: true, push: true, sms: false, marketing: false },
        language: 'en',
        timezone: 'UTC',
      },
      profile: {
        businessName: "Tech Services Co",
        vendorCategory: "service",
        specialization: "Industrial Services"
      }
    }
  },
  {
    email: "product@test.com",
    password: "password123",
    profile: {
      id: "4",
      email: "product@test.com",
      name: "Product Supply Ltd",
      role: "vendor",
      avatar: "",
      initials: "PS",
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      preferences: {
        theme: 'system',
        notifications: { email: true, push: true, sms: false, marketing: false },
        language: 'en',
        timezone: 'UTC',
      },
      profile: {
        businessName: "Product Supply Ltd",
        vendorCategory: "product",
        specialization: "Industrial Equipment"
      }
    }
  },
  {
    email: "logistics@test.com",
    password: "password123",
    profile: {
      id: "5",
      email: "logistics@test.com",
      name: "Fast Logistics",
      role: "vendor",
      avatar: "",
      initials: "FL",
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      preferences: {
        theme: 'system',
        notifications: { email: true, push: true, sms: false, marketing: false },
        language: 'en',
        timezone: 'UTC',
      },
      profile: {
        businessName: "Fast Logistics",
        vendorCategory: "logistics",
        specialization: "Heavy Equipment Transport"
      }
    }
  }
];

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { login, getDashboardUrl } = useUser();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Find matching user
      const matchedUser = mockUsers.find(
        user => user.email === formData.email && user.password === formData.password
      );

      if (matchedUser) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Login user
        login(matchedUser.profile);
        
        // Show success message
        toast({
          title: "Sign in successful!",
          description: `Welcome back, ${matchedUser.profile.name}!`,
        });

        // Redirect to appropriate dashboard
        const dashboardUrl = getDashboardUrl();
        navigate(dashboardUrl);
      } else {
        // Show error message
        toast({
          title: "Sign in failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Sign in error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-sm text-gray-600">Sign in to your account</p>
          </div>

          <Card className="bg-white border border-gray-100 shadow-sm">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl font-semibold text-gray-900">Sign In</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Test Accounts Info */}
              <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-700">
                <p className="font-semibold mb-1">Test Accounts:</p>
                <p>• industry@test.com (Industry Dashboard)</p>
                <p>• professional@test.com (Professional Dashboard)</p>
                <p>• service@test.com (Service Vendor Dashboard)</p>
                <p>• product@test.com (Product Vendor Dashboard)</p>
                <p>• logistics@test.com (Logistics Vendor Dashboard)</p>
                <p className="mt-1 font-semibold">Password: password123</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="pl-10 bg-white border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-200"
                      autoComplete="email"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="pl-10 pr-10 bg-white border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-200"
                      autoComplete="current-password"
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      disabled={isLoading}
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
                    Forgot password?
                  </Link>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                    disabled={isLoading}
                  >
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                    disabled={isLoading}
                  >
                    <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </Button>
                </div>
              </div>

              <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-blue-600 hover:text-blue-500 font-medium">
                    Sign up
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SignIn;
