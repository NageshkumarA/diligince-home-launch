import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Building, Mail, Phone, Calendar, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MultiSelect } from "@/components/vendor/ui/MultiSelect";

const companySchema = z.object({
  companyName: z.string().min(1, { message: "Company name is required" }),
  industryFocus: z.array(z.string()).min(1, { message: "At least one industry focus is required" }),
  companyDescription: z.string().min(10, { message: "Company description must be at least 10 characters" }),
  gstNumber: z.string().optional(),
  registrationNumber: z.string().min(1, { message: "Registration number is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
  address: z.string().min(1, { message: "Address is required" }),
  warehouseLocations: z.array(z.string()),
  yearEstablished: z.string().min(1, { message: "Year established is required" }),
  productCategories: z.array(z.string()).min(1, { message: "At least one product category is required" }),
});

const industryOptions = [
  { label: "Sugar Mill", value: "sugar_mill" },
  { label: "Cement Plant", value: "cement_plant" },
  { label: "Steel Plant", value: "steel_plant" },
  { label: "Pharmaceutical", value: "pharmaceutical" },
  { label: "Food Processing", value: "food_processing" },
  { label: "Automotive", value: "automotive" },
  { label: "Chemical", value: "chemical" },
  { label: "Textile", value: "textile" },
  { label: "Refinery", value: "refinery" },
  { label: "Power Plant", value: "power_plant" },
  { label: "Paper Mill", value: "paper_mill" },
  { label: "Mining", value: "mining" },
];

const productCategoryOptions = [
  { label: "Electrical Components", value: "electrical" },
  { label: "Mechanical Parts", value: "mechanical" },
  { label: "Pneumatic Systems", value: "pneumatic" },
  { label: "Hydraulic Components", value: "hydraulic" },
  { label: "Safety Equipment", value: "safety" },
  { label: "Instrumentation", value: "instrumentation" },
  { label: "Process Control", value: "process_control" },
  { label: "Pumps & Valves", value: "pumps_valves" },
  { label: "Motors & Drives", value: "motors_drives" },
  { label: "Maintenance Tools", value: "maintenance_tools" },
  { label: "Laboratory Equipment", value: "laboratory" },
  { label: "Raw Materials", value: "raw_materials" },
];

const CompanyInfoForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      companyName: "",
      industryFocus: [],
      companyDescription: "",
      gstNumber: "",
      registrationNumber: "",
      email: "",
      phone: "",
      address: "",
      warehouseLocations: [],
      yearEstablished: "",
      productCategories: [],
    },
  });

  const onSubmit = (values: z.infer<typeof companySchema>) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Company info values:", values);
      setIsLoading(false);
      toast.success("Company information saved successfully!");
    }, 1000);
  };

  // Function to handle adding a new warehouse location
  const [newWarehouseLocation, setNewWarehouseLocation] = useState("");
  
  const addWarehouseLocation = () => {
    if (newWarehouseLocation.trim() === "") return;
    
    const currentLocations = form.getValues("warehouseLocations") || [];
    form.setValue("warehouseLocations", [...currentLocations, newWarehouseLocation.trim()]);
    setNewWarehouseLocation("");
  };

  const removeWarehouseLocation = (index: number) => {
    const currentLocations = form.getValues("warehouseLocations") || [];
    form.setValue(
      "warehouseLocations",
      currentLocations.filter((_, i) => i !== index)
    );
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-800">Company Information</CardTitle>
        <CardDescription>
          Update your company details, industry focus, and product categories.
        </CardDescription>
      </CardHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Enter company name" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="yearEstablished"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year Established</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="e.g., 2010" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="industryFocus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry Focus</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={industryOptions}
                      selected={field.value}
                      onChange={field.onChange}
                      placeholder="Select industries you serve"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="companyDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your company, specialization, and value proposition"
                      className="min-h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="gstNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GST Number (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter GST number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="registrationNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registration Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter registration number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Enter business email" className="pl-10" {...field} />
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
                    <FormLabel>Business Phone</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Enter business phone" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Address</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Textarea
                        placeholder="Enter complete business address"
                        className="min-h-24 pl-10"
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
              name="warehouseLocations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Warehouse Locations</FormLabel>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Add warehouse location"
                        value={newWarehouseLocation}
                        onChange={(e) => setNewWarehouseLocation(e.target.value)}
                        className="flex-1"
                      />
                      <Button type="button" onClick={addWarehouseLocation} size="sm">
                        Add
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-2">
                      {form.getValues("warehouseLocations")?.map((location, index) => (
                        <div key={index} className="flex items-center bg-yellow-50 text-yellow-700 rounded-full pl-3 pr-1 py-1 text-sm">
                          <span>{location}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5 ml-1 hover:bg-yellow-100"
                            onClick={() => removeWarehouseLocation(index)}
                          >
                            <span className="sr-only">Remove</span>
                            <span className="text-xs">×</span>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="productCategories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Categories</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={productCategoryOptions}
                      selected={field.value}
                      onChange={field.onChange}
                      placeholder="Select product categories you supply"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          
          <CardFooter className="flex justify-end gap-2 border-t bg-gray-50/50 px-6 py-4">
            <Button variant="outline" type="button" disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-yellow-600 hover:bg-yellow-700">
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default CompanyInfoForm;
