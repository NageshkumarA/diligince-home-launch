
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { UploadCloud, ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";

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

const certificationsList = [
  { value: "iso9001", label: "ISO 9001 - Quality Management" },
  { value: "iso14001", label: "ISO 14001 - Environmental Management" },
  { value: "iso45001", label: "ISO 45001 - Occupational Health & Safety" },
  { value: "api", label: "API Certification" },
  { value: "asme", label: "ASME Certification" },
  { value: "ce", label: "CE Mark" },
  { value: "ul", label: "UL Certification" },
  { value: "other", label: "Other" },
];

const formSchema = z.object({
  businessName: z.string().min(2, { message: "Business name must be at least 2 characters" }),
  vendorCategory: z.string().min(1, { message: "Please select a vendor category" }),
  serviceType: z.string().min(1, { message: "Please select a service type" }),
  industry: z.string().min(1, { message: "Please select your primary industry" }),
  certifications: z.array(z.string()).default([]),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

export const VendorForm = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([]);
  const [openCertification, setOpenCertification] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      vendorCategory: "",
      serviceType: "",
      industry: "",
      certifications: [],
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
  
  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    // Simulate file upload
    setTimeout(() => {
      setIsUploading(false);
      toast.success("Documents uploaded successfully");
    }, 2000);
  };
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true);
      
      // Simulate file upload
      setTimeout(() => {
        setIsUploading(false);
        toast.success("Documents uploaded successfully");
      }, 2000);
    }
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    form.setValue("vendorCategory", value);
    form.setValue("serviceType", "");
  };

  const handleCertificationSelection = (value: string) => {
    const currentValues = form.getValues("certifications") || [];
    const updatedValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    setSelectedCertifications(updatedValues);
    form.setValue("certifications", updatedValues);
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          <FormField
            control={form.control}
            name="certifications"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Certifications</FormLabel>
                <Popover open={openCertification} onOpenChange={setOpenCertification}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openCertification}
                        className="justify-between h-10 w-full"
                      >
                        {selectedCertifications.length > 0
                          ? `${selectedCertifications.length} selected`
                          : "Select certifications"}
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search certifications..." />
                      <CommandEmpty>No certification found.</CommandEmpty>
                      <CommandGroup>
                        {certificationsList.map((certification) => {
                          const isSelected = selectedCertifications.includes(certification.value);
                          return (
                            <CommandItem
                              key={certification.value}
                              value={certification.value}
                              onSelect={() => handleCertificationSelection(certification.value)}
                            >
                              <div className={cn(
                                "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                isSelected 
                                  ? "bg-primary text-primary-foreground" 
                                  : "opacity-50 [&_svg]:invisible"
                              )}>
                                <Checkbox
                                  checked={isSelected}
                                  className="h-4 w-4"
                                />
                              </div>
                              {certification.label}
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div
          className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors ${
            isUploading ? "bg-blue-50 border-blue-300" : "border-gray-300 hover:border-primary hover:bg-blue-50"
          }`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleFileDrop}
          onClick={() => document.getElementById("vendor-docs")?.click()}
        >
          <input
            id="vendor-docs"
            type="file"
            multiple
            className="hidden"
            onChange={handleFileSelect}
          />
          <UploadCloud className="mx-auto h-12 w-12 text-primary mb-2" />
          <p className="text-sm font-medium">
            {isUploading ? "Uploading..." : "Upload Business Documents"}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Drag and drop files here or click to browse
          </p>
          <p className="text-xs text-gray-500 mt-1">
            (Company registration, certifications, licenses, etc.)
          </p>
        </div>
        
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
