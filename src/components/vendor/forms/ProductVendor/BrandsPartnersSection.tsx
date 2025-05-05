import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Plus, Upload, Calendar, Tag, Trash, Edit } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { MultiSelect } from "@/components/vendor/ui/MultiSelect";

const brandSchema = z.object({
  brandName: z.string().min(1, { message: "Brand name is required" }),
  relationshipType: z.string().min(1, { message: "Relationship type is required" }),
  productCategories: z.array(z.string()).min(1, { message: "At least one product category is required" }),
  partnershipStartDate: z.string().min(1, { message: "Partnership start date is required" }),
  documentProof: z.any().optional(),
});

// Relationship type options
const relationshipOptions = [
  { value: "authorized_dealer", label: "Authorized Dealer" },
  { value: "distributor", label: "Distributor" },
  { value: "reseller", label: "Reseller" },
  { value: "service_partner", label: "Service Partner" },
  { value: "manufacturer_rep", label: "Manufacturer's Representative" },
  { value: "oem_partner", label: "OEM Partner" },
  { value: "var", label: "Value-Added Reseller (VAR)" },
];

// Product category options
const categoryOptions = [
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

// Mock brands data
const mockBrands = [
  {
    id: "1",
    logo: "https://images.unsplash.com/photo-1560472355-536de3962603?w=300&h=300&fit=crop",
    name: "TechFlex Industries",
    relationshipType: "Authorized Dealer",
    categories: ["Electrical Components", "Process Control"],
    partnershipStartDate: "2021-05-15",
    documents: ["Partnership_Agreement_TechFlex.pdf"],
  },
  {
    id: "2",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=300&h=300&fit=crop",
    name: "MechaPro Systems",
    relationshipType: "Distributor",
    categories: ["Mechanical Parts", "Motors & Drives"],
    partnershipStartDate: "2020-02-10",
    documents: ["MechaPro_Authorization.pdf", "Product_Catalog_2023.pdf"],
  },
  {
    id: "3",
    logo: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=300&h=300&fit=crop",
    name: "SafeGuard Equipment",
    relationshipType: "Manufacturer's Representative",
    categories: ["Safety Equipment"],
    partnershipStartDate: "2022-08-22",
    documents: ["SafeGuard_Agreement.pdf"],
  },
];

const BrandsPartnersSection = () => {
  const [isAddBrandDialogOpen, setIsAddBrandDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [brands, setBrands] = useState(mockBrands);
  const [brandLogo, setBrandLogo] = useState<string | null>(null);
  const [documents, setDocuments] = useState<string[]>([]);
  
  const form = useForm<z.infer<typeof brandSchema>>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      brandName: "",
      relationshipType: "",
      productCategories: [],
      partnershipStartDate: "",
      documentProof: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof brandSchema>) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Brand values:", values);
      
      // Generate a new brand object
      const newBrand = {
        id: (brands.length + 1).toString(),
        logo: brandLogo || "https://images.unsplash.com/photo-1560472355-536de3962603?w=300&h=300&fit=crop",
        name: values.brandName,
        relationshipType: relationshipOptions.find(r => r.value === values.relationshipType)?.label || values.relationshipType,
        categories: values.productCategories.map(
          c => categoryOptions.find(cat => cat.value === c)?.label || c
        ),
        partnershipStartDate: values.partnershipStartDate,
        documents: documents,
      };
      
      // Add the new brand to the list
      setBrands([...brands, newBrand]);
      
      setIsLoading(false);
      setIsAddBrandDialogOpen(false);
      form.reset();
      setBrandLogo(null);
      setDocuments([]);
      
      toast.success("Brand added successfully!");
    }, 1500);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Simulate logo upload
    if (e.target.files && e.target.files[0]) {
      // In a real application, you would upload the file to a server
      // Here we're just creating a fake URL for demonstration
      const fakeUrl = "https://images.unsplash.com/photo-1616469829941-c7200edec809?w=300&h=300&fit=crop";
      setBrandLogo(fakeUrl);
      toast.success("Logo uploaded successfully!");
    }
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Simulate document upload
    if (e.target.files && e.target.files[0]) {
      const newDocuments = [...documents];
      
      for (let i = 0; i < e.target.files.length; i++) {
        // In a real application, you would upload the file to a server
        // Here we're just using the filename for demonstration
        newDocuments.push(e.target.files[i].name);
      }
      
      setDocuments(newDocuments);
      toast.success("Documents uploaded successfully!");
    }
  };

  const handleDeleteBrand = (id: string) => {
    setBrands(brands.filter(brand => brand.id !== id));
    toast.success("Brand deleted successfully!");
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-gray-800">Brands & Partners</CardTitle>
              <CardDescription>
                Manage your represented brands, partnerships and distributorships.
              </CardDescription>
            </div>
            
            <Dialog open={isAddBrandDialogOpen} onOpenChange={setIsAddBrandDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-yellow-600 hover:bg-yellow-700">
                  <Plus size={16} />
                  <span>Add Brand</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Brand</DialogTitle>
                  <DialogDescription>
                    Add details about your brand partnership and upload supporting documents.
                  </DialogDescription>
                </DialogHeader>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="h-32 w-32 relative border-2 border-dashed rounded-md flex items-center justify-center overflow-hidden">
                        {brandLogo ? (
                          <img 
                            src={brandLogo} 
                            alt="Brand logo" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex flex-col items-center">
                            <Upload className="h-8 w-8 text-muted-foreground mb-1" />
                            <span className="text-xs text-muted-foreground text-center">
                              Brand Logo
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <Input
                        id="brandLogo"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleLogoUpload}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById("brandLogo")?.click()}
                      >
                        {brandLogo ? "Change Logo" : "Upload Logo"}
                      </Button>
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="brandName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Brand Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter brand name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="relationshipType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Relationship Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select relationship type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {relationshipOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
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
                      name="productCategories"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Categories</FormLabel>
                          <FormControl>
                            <MultiSelect
                              options={categoryOptions}
                              selected={field.value}
                              onChange={field.onChange}
                              placeholder="Select product categories for this brand"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="partnershipStartDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Partnership Start Date</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input type="date" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="space-y-3">
                      <FormLabel>Partnership Documents</FormLabel>
                      <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground text-center mb-2">
                          Upload documents proving your partnership
                        </p>
                        <p className="text-xs text-muted-foreground mb-4">
                          Certificate, authorization letter, agreement, etc.
                        </p>
                        <Input
                          id="partnershipDocuments"
                          type="file"
                          className="hidden"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          multiple
                          onChange={handleDocumentUpload}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById("partnershipDocuments")?.click()}
                        >
                          Browse Files
                        </Button>
                        
                        {documents.length > 0 && (
                          <div className="w-full space-y-2 mt-4">
                            {documents.map((doc, index) => (
                              <div key={index} className="flex items-center justify-between p-2 border rounded-md bg-muted/30">
                                <span className="text-sm font-medium truncate">{doc}</span>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => setDocuments(documents.filter((_, i) => i !== index))}
                                >
                                  <Trash size={14} />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button 
                        variant="outline" 
                        type="button" 
                        onClick={() => setIsAddBrandDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit" 
                        className="bg-yellow-600 hover:bg-yellow-700" 
                        disabled={isLoading}
                      >
                        {isLoading ? "Adding..." : "Add Brand"}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        
        <CardContent>
          {brands.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Tag className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No brands added yet</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Add your first brand partnership to showcase your authorized relationships
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brands.map((brand) => (
                <Card key={brand.id} className="overflow-hidden border">
                  <div className="aspect-[3/2] bg-muted/20 relative flex items-center justify-center p-4">
                    <img 
                      src={brand.logo} 
                      alt={brand.name}
                      className="max-h-full max-w-full object-contain"
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button variant="secondary" size="icon" className="h-8 w-8 opacity-90">
                        <Edit size={14} />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="icon" 
                        className="h-8 w-8 opacity-90"
                        onClick={() => handleDeleteBrand(brand.id)}
                      >
                        <Trash size={14} />
                      </Button>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{brand.name}</h3>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Relationship Type</p>
                        <Badge className="mt-1 bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200">
                          {brand.relationshipType}
                        </Badge>
                      </div>
                      
                      <div>
                        <p className="text-xs text-muted-foreground">Product Categories</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {brand.categories.map((category, index) => (
                            <Badge 
                              key={index}
                              variant="outline" 
                              className="bg-gray-100 text-gray-800"
                            >
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-xs text-muted-foreground">Partnership Since</p>
                        <p className="text-sm font-medium mt-1">
                          {new Date(brand.partnershipStartDate).toLocaleDateString()}
                        </p>
                      </div>
                      
                      {brand.documents.length > 0 && (
                        <div>
                          <p className="text-xs text-muted-foreground">Documents</p>
                          <div className="mt-1 space-y-1">
                            {brand.documents.map((doc, index) => (
                              <div key={index} className="text-sm text-blue-600 underline cursor-pointer">
                                {doc}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BrandsPartnersSection;
