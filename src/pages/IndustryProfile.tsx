
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { Building, Upload, MapPin, Users, CreditCard, Wrench } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { industries } from "@/components/signup/IndustryForm"; // Import the shared industries array

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const formSchema = z.object({
  companyName: z.string().min(1, { message: "Company name is required" }),
  industryType: z.string().min(1, { message: "Industry type is required" }),
  customIndustryType: z.string().optional(),
  plantLocation: z.string().min(1, { message: "Plant location is required" }),
  employees: z.string().min(1, { message: "Number of employees is required" }),
  revenue: z.string().min(1, { message: "Annual revenue is required" }),
  primaryNeeds: z.array(z.string()).min(1, { message: "Select at least one primary need" }),
  documentUpload: z.any().optional(),
}).refine(
  (data) => data.industryType !== "Others" || (data.customIndustryType && data.customIndustryType.length > 0),
  {
    message: "Please specify your industry type",
    path: ["customIndustryType"],
  }
);

const primaryNeedsOptions = [
  { id: "maintenance", label: "Maintenance Services" },
  { id: "equipment", label: "Equipment Rental (e.g., cranes)" },
  { id: "spareParts", label: "Spare Parts" },
  { id: "logistics", label: "Logistics & Transportation" },
  { id: "consulting", label: "Technical Consulting" },
  { id: "engineering", label: "Engineering Services" },
  { id: "other", label: "Other" },
];

const IndustryProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fileUploaded, setFileUploaded] = useState<File | null>(null);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      industryType: "",
      customIndustryType: "",
      plantLocation: "",
      employees: "",
      revenue: "",
      primaryNeeds: [],
      documentUpload: undefined,
    },
  });

  // Watch the industry type to show/hide the custom field
  const selectedIndustryType = form.watch("industryType");
  const showCustomIndustryField = selectedIndustryType === "Others";

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    // Capture the effective industry type (either selected or custom)
    const effectiveIndustryType = values.industryType === "Others" 
      ? values.customIndustryType 
      : values.industryType;
    
    // Simulate API call delay
    setTimeout(() => {
      console.log("Industry profile values:", {...values, effectiveIndustryType});
      setIsLoading(false);
      toast.success("Profile saved successfully!", {
        description: "Your industry profile has been created.",
      });
      
      // Redirect after successful profile creation
      setTimeout(() => {
        navigate("/industry-dashboard");
      }, 1500);
    }, 1000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File too large", {
        description: "Maximum file size is 5MB.",
      });
      return;
    }

    setFileUploaded(file);
    toast.success("Document uploaded!", {
      description: `File "${file.name}" has been uploaded.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 px-4 mt-16 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-lg animate-fade-in">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-primary">Create Your Industry Profile</CardTitle>
              <CardDescription className="text-gray-600">
                Tell us more about your plant to connect with the right Vendors and Professionals.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input 
                              placeholder="e.g., APPM Sugar Mills Ltd" 
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
                    name="industryType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="pl-10 relative">
                              <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <SelectValue placeholder="Select industry type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {industries.map((type) => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
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
                            <div className="relative">
                              <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input 
                                placeholder="Please specify your industry type" 
                                className="pl-10" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="plantLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Plant Location</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input 
                              placeholder="e.g., Visakhapatnam, Andhra Pradesh" 
                              className="pl-10" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="employees"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Employees</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="pl-10 relative">
                                <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <SelectValue placeholder="Select employee range" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1-50">1-50</SelectItem>
                              <SelectItem value="51-100">51-100</SelectItem>
                              <SelectItem value="101-500">101-500</SelectItem>
                              <SelectItem value="501-1000">501-1000</SelectItem>
                              <SelectItem value="1000+">1000+</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="revenue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Annual Revenue</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="pl-10 relative">
                                <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <SelectValue placeholder="Select revenue range" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="< ₹1 Cr">&lt; ₹1 Cr</SelectItem>
                              <SelectItem value="₹1-5 Cr">₹1-5 Cr</SelectItem>
                              <SelectItem value="₹5-10 Cr">₹5-10 Cr</SelectItem>
                              <SelectItem value="₹10-50 Cr">₹10-50 Cr</SelectItem>
                              <SelectItem value="₹50 Cr+">₹50 Cr+</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="primaryNeeds"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-base">Primary Needs</FormLabel>
                          <div className="text-sm text-muted-foreground mb-4">
                            Select all that apply
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {primaryNeedsOptions.map((option) => (
                            <FormField
                              key={option.id}
                              control={form.control}
                              name="primaryNeeds"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={option.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(option.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, option.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== option.id
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {option.label}
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-3">
                    <FormLabel>Document Upload (Optional)</FormLabel>
                    <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                      <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground text-center mb-2">
                        Drag and drop your documents or click to browse
                      </p>
                      <p className="text-xs text-muted-foreground mb-4">
                        PDF or Images up to 5MB
                      </p>
                      <Input
                        id="documentUpload"
                        type="file"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("documentUpload")?.click()}
                      >
                        Browse Files
                      </Button>
                      {fileUploaded && (
                        <p className="text-sm text-primary mt-2 font-medium">
                          {fileUploaded.name}
                        </p>
                      )}
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full hover:scale-105 transition-transform duration-200"
                    disabled={isLoading || !form.formState.isValid}
                  >
                    {isLoading ? "Saving Profile..." : "Save Profile"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default IndustryProfile;
