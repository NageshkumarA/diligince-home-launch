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

// Define industry types array to be shared between signup and profile pages
export const industries = [
  "Sugar Manufacturing",
  "Rice Mills",
  "Coal Mining",
  "Steel Manufacturing",
  "Cement Production",
  "Oil Refining",
  "Natural Gas Processing",
  "Textile Manufacturing",
  "Paper Mills",
  "Chemical Manufacturing",
  "Pharmaceutical Production",
  "Food Processing",
  "Automotive Manufacturing",
  "Electronics Manufacturing",
  "Plastics Manufacturing",
  "Glass Production",
  "Plumber and Wood Products",
  "Fertilizer Production",
  "Power Generation",
  "Water Treatment",
  "Manufacturing",
  "Others"
];

const formSchema = z.object({
  companyName: z.string().min(1, {
    message: "Company name is required",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits",
  }),
  industryType: z.string().min(1, {
    message: "Industry type is required",
  }),
  customIndustryType: z.string().optional(),
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
}).refine(
  (data) => data.industryType !== "Others" || (data.customIndustryType && data.customIndustryType.length > 0),
  {
    message: "Please specify your industry type",
    path: ["customIndustryType"],
  }
);

export function IndustryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      email: "",
      phone: "",
      industryType: "",
      customIndustryType: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const selectedIndustryType = form.watch("industryType");
  const showCustomIndustryField = selectedIndustryType === "Others";

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    setTimeout(() => {
      // Generate initials from company name
      const initials = values.companyName
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .substring(0, 2)
        .toUpperCase();
      
      // Create user profile
      const userProfile = {
        id: Math.random().toString(36).substr(2, 9),
        email: values.email,
        name: values.companyName,
        role: 'industry' as const,
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
          companyName: values.companyName,
          industryType: values.industryType === "Others" ? values.customIndustryType : values.industryType
        }
      };

      // Set user in context
      login(userProfile);
      
      setIsSubmitting(false);
      toast.success("Sign-up successful!", {
        description: "Welcome to diligince.ai",
      });
      
      // Redirect to industry dashboard
      setTimeout(() => {
        navigate("/industry-dashboard");
      }, 1000);
    }, 1500);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 animate-fade-in">
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Steel Industries Ltd." {...field} />
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="you@example.com" 
                    className="pl-10" 
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
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g. 9876543210" 
                  type="tel"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="industryType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industry Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your industry type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {showCustomIndustryField && (
          <FormField
            control={form.control}
            name="customIndustryType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Specify Industry Type</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Please specify your industry type" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    className="pl-10" 
                    {...field} 
                  />
                  <button 
                    type="button"
                    className="absolute right-3 top-3 text-muted-foreground"
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
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type={showConfirmPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    className="pl-10" 
                    {...field} 
                  />
                  <button 
                    type="button"
                    className="absolute right-3 top-3 text-muted-foreground"
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
                <FormLabel>
                  I accept the 
                  <a href="/terms" className="text-primary hover:underline ml-1">terms and conditions</a>
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full hover:scale-105 transition-transform duration-200"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </Button>
      </form>
    </Form>
  );
}
