
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUser } from "@/contexts/UserContext";

const formSchema = z.object({
  fullName: z.string().min(1, {
    message: "Full name is required",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits",
  }),
  expertise: z.string().min(1, {
    message: "Area of expertise is required",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine((value) => value === true, {
    message: "You must accept the terms and conditions",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const expertiseAreas = [
  "Mechanical Engineering",
  "Electrical Engineering",
  "Process Engineering",
  "Chemical Engineering",
  "Civil Engineering",
  "Industrial Safety",
  "Quality Control",
  "Maintenance",
  "Plant Operations",
  "Automation",
  "Robotics",
  "Welding",
  "Heavy Equipment Operation",
  "HVAC Systems",
  "Instrumentation",
  "Logistics Management",
  "Supply Chain Management",
  "Production Management",
  "Project Management",
  "Environmental Compliance"
];

export function ProfessionalForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      expertise: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    setTimeout(() => {
      // Generate initials from full name
      const initials = values.fullName
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .substring(0, 2)
        .toUpperCase();
      
      // Create user profile
      const userProfile = {
        id: Math.random().toString(36).substr(2, 9),
        email: values.email,
        name: values.fullName,
        role: 'professional' as const,
        avatar: '',
        initials: initials,
        status: 'active' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        preferences: {
          theme: 'system' as const,
          notifications: {
            email: true,
            push: true,
            sms: false,
            marketing: false,
          },
          language: 'en',
          timezone: 'UTC',
        },
        profile: {
          fullName: values.fullName,
          phone: values.phone,
          expertise: values.expertise
        }
      };

      // Set user in context
      login(userProfile);
      
      setIsSubmitting(false);
      toast.success("Sign-up successful!", {
        description: "Welcome to diligince.ai",
      });
      
      // Redirect to professional dashboard
      setTimeout(() => {
        navigate("/professional-dashboard");
      }, 1000);
    }, 1500);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 animate-fade-in">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Full Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g. Rahul Sharma" 
                  className="bg-white border-gray-200 text-gray-900 focus:border-blue-500 focus:ring-blue-200"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="you@example.com" 
                    className="pl-10 bg-white border-gray-200 text-gray-900 focus:border-blue-500 focus:ring-blue-200" 
                    {...field} 
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Phone Number</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g. 9876543210" 
                  type="tel"
                  className="bg-white border-gray-200 text-gray-900 focus:border-blue-500 focus:ring-blue-200"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="expertise"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Area of Expertise</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-white border-gray-200 text-gray-900 focus:border-blue-500 focus:ring-blue-200">
                    <SelectValue placeholder="Select your area of expertise" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white shadow-lg border border-gray-200 z-50">
                  {expertiseAreas.map((expertise) => (
                    <SelectItem key={expertise} value={expertise} className="text-gray-900 hover:bg-gray-100">
                      {expertise}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    className="pl-10 bg-white border-gray-200 text-gray-900 focus:border-blue-500 focus:ring-blue-200" 
                    {...field} 
                  />
                  <button 
                    type="button"
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Confirm Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    type={showConfirmPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    className="pl-10 bg-white border-gray-200 text-gray-900 focus:border-blue-500 focus:ring-blue-200" 
                    {...field} 
                  />
                  <button 
                    type="button"
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="acceptTerms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-gray-700">
                  I accept the 
                  <a href="/terms" className="text-blue-600 hover:underline ml-1">terms and conditions</a>
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white hover:scale-105 transition-transform duration-200"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </Button>
      </form>
    </Form>
  );
}
