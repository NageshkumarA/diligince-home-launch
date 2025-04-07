
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ChevronDown } from "lucide-react";

const vendorCategories = {
  "service": {
    label: "Service Vendors",
    subcategories: [
      { value: "epc", label: "Engineering, Procurement & Construction (EPC)" },
      { value: "industrial_work", label: "Industrial Work Contractors" },
      { value: "maintenance", label: "Maintenance Services" },
      { value: "consultancy", label: "Industrial Consultancies" },
      { value: "technical_services", label: "Technical Services" },
    ]
  },
  "product": {
    label: "Product Vendors",
    subcategories: [
      { value: "oem", label: "OEMs (Original Equipment Manufacturers)" },
      { value: "spares", label: "Spares & Material Suppliers" },
      { value: "distributor", label: "Distributors" },
      { value: "component", label: "Component Manufacturers" },
      { value: "raw_materials", label: "Raw Materials Suppliers" },
    ]
  },
  "specialized": {
    label: "Specialized Service Vendors",
    subcategories: [
      { value: "logistics", label: "Logistics & Transportation" },
      { value: "heavy_equipment", label: "Heavy Equipment Providers" },
      { value: "cranes", label: "Cranes & Hoists Providers" },
      { value: "specialized_tools", label: "Specialized Tools & Equipment Rental" },
    ]
  }
};

const industriesList = [
  { value: "oil_gas", label: "Oil & Gas" },
  { value: "power", label: "Power Generation" },
  { value: "chemical", label: "Chemical Processing" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "mining", label: "Mining" },
  { value: "construction", label: "Construction" },
  { value: "pharma", label: "Pharmaceutical" },
  { value: "automotive", label: "Automotive" },
  { value: "aerospace", label: "Aerospace" },
  { value: "logistics", label: "Logistics & Transportation" },
  { value: "other", label: "Other" },
];

const formSchema = z.object({
  businessName: z.string().min(2, { message: "Business name must be at least 2 characters" }),
  vendorCategory: z.string().min(1, { message: "Please select a vendor category" }),
  serviceType: z.string().min(1, { message: "Please select a service type" }),
  industry: z.string().min(1, { message: "Please select your primary industry" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

export const VendorForm = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      vendorCategory: "",
      serviceType: "",
      industry: "",
      email: "",
      phone: "",
      termsAccepted: false,
    },
  });
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    toast.success("Account created successfully!", {
      description: "Welcome to diligince.ai",
    });
    console.log(values);
  }
  
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    form.setValue("vendorCategory", value);
    form.setValue("serviceType", "");
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="businessName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter business name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="vendorCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vendor Category</FormLabel>
                <Select 
                  onValueChange={(value) => {
                    field.onChange(value);
                    handleCategoryChange(value);
                  }} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vendor category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(vendorCategories).map(([key, category]) => (
                      <SelectItem key={key} value={key}>{category.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="serviceType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service/Product Type</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                  disabled={!selectedCategory}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={selectedCategory ? "Select service type" : "Select vendor category first"} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {selectedCategory && vendorCategories[selectedCategory as keyof typeof vendorCategories]?.subcategories.map((subcategory) => (
                      <SelectItem key={subcategory.value} value={subcategory.value}>
                        {subcategory.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="industry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Industry</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select primary industry" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {industriesList.map((industry) => (
                    <SelectItem key={industry.value} value={industry.value}>
                      {industry.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="contact@business.com" {...field} />
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
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+1 (555) 000-0000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="termsAccepted"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I agree to the <a href="/terms" className="text-primary hover:underline">Terms and Conditions</a>
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full">Sign Up</Button>
      </form>
    </Form>
  );
};
