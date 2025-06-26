
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
import { useAuth } from "@/components/auth/hooks/useAuth";
import { useVendorSpecialization } from "@/contexts/VendorSpecializationContext";
import { mapSignupToSpecialization } from "@/utils/vendorSpecializationMapping";
import { VendorCategory } from "@/types/shared";
import { WelcomeModal } from "@/components/shared/WelcomeModal";

const formSchema = z.object({
  businessName: z.string().min(1, {
    message: "Business name is required",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits",
  }),
  vendorCategory: z.string().min(1, {
    message: "Vendor category is required",
  }),
  specialization: z.string().min(1, {
    message: "Specialization is required",
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

const vendorCategories = [
  "Service Vendor",
  "Product Vendor", 
  "Logistics Vendor"
];

const specializations = {
  "Service Vendor": [
    "Equipment Maintenance",
    "Plant Installation",
    "Process Optimization",
    "Industrial Cleaning",
    "Quality Inspection",
    "Safety Compliance",
    "Environmental Services",
    "Automation Services",
    "Electrical Services",
    "Mechanical Services"
  ],
  "Product Vendor": [
    "Industrial Equipment",
    "Spare Parts",
    "Raw Materials",
    "Safety Equipment",
    "Tools & Hardware",
    "Industrial Chemicals",
    "Industrial Electronics",
    "Process Control Equipment",
    "Packaging Materials",
    "Laboratory Equipment"
  ],
  "Logistics Vendor": [
    "Transportation Services",
    "Warehouse Management",
    "Heavy Equipment Rental",
    "Crane Services",
    "Forklift Rental",
    "Inventory Management",
    "Supply Chain Solutions",
    "Cold Chain Logistics",
    "Bulk Material Transport",
    "Hazardous Material Transport"
  ]
};

export function VendorFormEnhanced() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [newUser, setNewUser] = useState<any>(null);
  const navigate = useNavigate();
  const { signUp, isLoading } = useAuth();
  const { setSpecialization } = useVendorSpecialization();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      email: "",
      phone: "",
      vendorCategory: "",
      specialization: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Generate initials from business name
    const initials = values.businessName
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
    
    // Map vendor category to our internal format
    const vendorCategoryMap: Record<string, VendorCategory> = {
      "Service Vendor": "service",
      "Product Vendor": "product",
      "Logistics Vendor": "logistics"
    };
    
    const vendorCategory = vendorCategoryMap[values.vendorCategory];
    
    // Create user profile
    const userProfile = {
      id: Math.random().toString(36).substr(2, 9),
      email: values.email,
      name: values.businessName,
      role: 'vendor' as const,
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
        businessName: values.businessName,
        phone: values.phone,
        vendorCategory: vendorCategory,
        specialization: values.specialization
      }
    };

    const result = await signUp({ ...userProfile, password: values.password });
    
    if (result.success) {
      // Set vendor specialization if it's a logistics vendor
      if (values.vendorCategory === "Logistics Vendor") {
        const mappedSpecialization = mapSignupToSpecialization(values.specialization);
        setSpecialization(mappedSpecialization);
      }
      
      setNewUser(userProfile);
      setShowWelcomeModal(true);
    }
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    form.setValue("specialization", "");
  };

  const handleCompleteProfile = () => {
    setShowWelcomeModal(false);
    setTimeout(() => {
      navigate("/profile-completion");
    }, 300);
  };

  const handleGoToDashboard = () => {
    setShowWelcomeModal(false);
    setTimeout(() => {
      const vendorCategory = newUser?.profile?.vendorCategory;
      switch (vendorCategory) {
        case "service":
          navigate("/service-vendor-dashboard");
          break;
        case "product":
          navigate("/product-vendor-dashboard");
          break;
        case "logistics":
          navigate("/logistics-vendor-dashboard");
          break;
        default:
          navigate("/vendor-profile");
      }
    }, 300);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 animate-fade-in">
          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Business Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g. Coastal Services Ltd." 
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
            name="vendorCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Vendor Category</FormLabel>
                <Select 
                  onValueChange={(value) => {
                    field.onChange(value);
                    handleCategoryChange(value);
                  }} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-white border-gray-200 text-gray-900 focus:border-blue-500 focus:ring-blue-200">
                      <SelectValue placeholder="Select vendor category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white shadow-lg border border-gray-200 z-50">
                    {vendorCategories.map((category) => (
                      <SelectItem key={category} value={category} className="text-gray-900 hover:bg-gray-100">
                        {category}
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
            name="specialization"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Specialization</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger 
                      disabled={!selectedCategory}
                      className="bg-white border-gray-200 text-gray-900 focus:border-blue-500 focus:ring-blue-200 disabled:bg-gray-100"
                    >
                      <SelectValue placeholder="Select specialization" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white shadow-lg border border-gray-200 z-50">
                    {selectedCategory && 
                      specializations[selectedCategory as keyof typeof specializations]?.map((spec) => (
                        <SelectItem key={spec} value={spec} className="text-gray-900 hover:bg-gray-100">
                          {spec}
                        </SelectItem>
                      ))
                    }
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
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
      </Form>

      {showWelcomeModal && newUser && (
        <WelcomeModal
          isOpen={showWelcomeModal}
          onClose={() => setShowWelcomeModal(false)}
          userRole={newUser.role}
          userName={newUser.name}
          onCompleteProfile={handleCompleteProfile}
          onGoToDashboard={handleGoToDashboard}
          profileCompletion={75} // Vendor form collects essential data
        />
      )}
    </>
  );
}
