
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { Building, Upload, MapPin, Clock, Package, Wrench, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const formSchema = z.object({
  businessName: z.string().min(1, { message: "Business name is required" }),
  vendorCategory: z.string().min(1, { message: "Vendor category is required" }),
  serviceType: z.array(z.string()).min(1, { message: "At least one service/product type is required" }),
  primaryIndustry: z.string().min(1, { message: "Primary industry is required" }),
  businessLocation: z.string().min(1, { message: "Business location is required" }),
  yearsInBusiness: z.string().min(1, { message: "Years in business is required" }),
  documentUpload: z.any().optional(),
});

const industryTypes = [
  "Sugar Mill",
  "Cement Plant",
  "Steel Plant",
  "Pharmaceutical",
  "Food Processing",
  "Automotive",
  "Chemical",
  "Textile",
  "Refinery",
  "Power Plant",
  "Paper Mill",
  "Mining",
  "Aerospace",
  "Construction",
  "Electronics",
  "Multiple Industries",
];

// Service options based on vendor category
const serviceOptions = {
  "Service Vendors": [
    { id: "maintenance", label: "Maintenance & Repair" },
    { id: "installation", label: "Installation Services" },
    { id: "engineering", label: "Engineering Services" },
    { id: "technical", label: "Technical Consulting" },
    { id: "calibration", label: "Calibration & Testing" },
    { id: "safety", label: "Safety Inspections" },
    { id: "cleaning", label: "Industrial Cleaning" },
    { id: "automation", label: "Automation Services" },
  ],
  "Product Vendors": [
    { id: "spareParts", label: "Spare Parts & Components" },
    { id: "machinery", label: "Machinery & Equipment" },
    { id: "tools", label: "Industrial Tools" },
    { id: "electrical", label: "Electrical Supplies" },
    { id: "safety", label: "Safety Equipment" },
    { id: "chemicals", label: "Industrial Chemicals" },
    { id: "consumables", label: "Consumables & Supplies" },
    { id: "raw", label: "Raw Materials" },
  ],
  "Logistics Vendors": [
    { id: "transportation", label: "Transportation Services" },
    { id: "heavyEquipment", label: "Heavy Equipment Rental (Cranes, etc.)" },
    { id: "warehousing", label: "Warehousing & Storage" },
    { id: "distribution", label: "Distribution Services" },
    { id: "freight", label: "Freight Forwarding" },
    { id: "customsClearance", label: "Customs Clearance" },
    { id: "lastMile", label: "Last Mile Delivery" },
    { id: "specialized", label: "Specialized Logistics (Hazardous Materials)" },
  ],
};

const VendorProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fileUploaded, setFileUploaded] = useState<File | null>(null);
  const [currentServiceOptions, setCurrentServiceOptions] = useState<Array<{ id: string; label: string }>>([]);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      vendorCategory: "",
      serviceType: [],
      primaryIndustry: "",
      businessLocation: "",
      yearsInBusiness: "",
      documentUpload: undefined,
    },
  });

  // Update service options when vendor category changes
  const watchVendorCategory = form.watch('vendorCategory');
  
  useEffect(() => {
    if (watchVendorCategory) {
      // Cast the watchVendorCategory as a key of serviceOptions
      const category = watchVendorCategory as keyof typeof serviceOptions;
      setCurrentServiceOptions(serviceOptions[category] || []);
      
      // Reset serviceType field when vendor category changes
      form.setValue('serviceType', []);
    }
  }, [watchVendorCategory, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      console.log("Vendor profile values:", values);
      setIsLoading(false);
      toast.success("Profile saved successfully!", {
        description: "Your vendor profile has been created.",
      });
      
      // Route to the appropriate vendor profile page based on vendor category
      setTimeout(() => {
        switch (values.vendorCategory) {
          case "Service Vendors":
            navigate("/service-vendor-profile");
            break;
          case "Product Vendors":
            navigate("/product-vendor-profile");
            break;
          case "Logistics Vendors":
            navigate("/logistics-vendor-profile");
            break;
          default:
            navigate("/service-vendor-profile"); // Fallback to service vendor profile
        }
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
              <CardTitle className="text-2xl font-bold text-primary">Create Your Vendor Profile</CardTitle>
              <CardDescription className="text-gray-600">
                Provide your business details to connect with Industries and Professionals.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="businessName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input 
                              placeholder="e.g., Coastal Cranes Ltd" 
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
                    name="vendorCategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vendor Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="pl-10 relative">
                              <Package className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <SelectValue placeholder="Select vendor category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Service Vendors">Service Vendors</SelectItem>
                            <SelectItem value="Product Vendors">Product Vendors</SelectItem>
                            <SelectItem value="Logistics Vendors">Logistics Vendors</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {watchVendorCategory && (
                    <FormField
                      control={form.control}
                      name="serviceType"
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel className="text-base">
                              {watchVendorCategory === "Service Vendors" 
                                ? "Service Type" 
                                : watchVendorCategory === "Product Vendors" 
                                  ? "Product Type"
                                  : "Logistics Service Type"}
                            </FormLabel>
                            <div className="text-sm text-muted-foreground mb-4">
                              Select all that apply to your business
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {currentServiceOptions.map((option) => (
                              <FormField
                                key={option.id}
                                control={form.control}
                                name="serviceType"
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
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="primaryIndustry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary Industry</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="pl-10 relative">
                                <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <SelectValue placeholder="Select primary industry" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="max-h-[200px]">
                              {industryTypes.map((type) => (
                                <SelectItem key={type} value={type}>{type}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="yearsInBusiness"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Years in Business</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="pl-10 relative">
                                <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <SelectValue placeholder="Select years in business" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="0-2 years">0-2 years</SelectItem>
                              <SelectItem value="2-5 years">2-5 years</SelectItem>
                              <SelectItem value="5-10 years">5-10 years</SelectItem>
                              <SelectItem value="10+ years">10+ years</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="businessLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Location</FormLabel>
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

                  <div className="space-y-3">
                    <FormLabel>Document Upload (Optional)</FormLabel>
                    <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                      <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground text-center mb-2">
                        Drag and drop business documents or click to browse
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

export default VendorProfile;
