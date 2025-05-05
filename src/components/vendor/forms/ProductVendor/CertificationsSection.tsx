
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Plus, Upload, Calendar, Search, Building, Check, AlertTriangle, Pencil, Trash, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import MultiSelect from "@/components/vendor/ui/MultiSelect";

const certificationSchema = z.object({
  certificateName: z.string().min(1, { message: "Certificate name is required" }),
  issuingOrganization: z.string().min(1, { message: "Issuing organization is required" }),
  issueDate: z.string().min(1, { message: "Issue date is required" }),
  expiryDate: z.string().optional(),
  certificationType: z.string().min(1, { message: "Certification type is required" }),
  linkedProducts: z.array(z.string()).optional(),
  documentFile: z.any().optional(),
});

// Mock certifications data
const mockCertifications = [
  {
    id: "1",
    name: "ISO 9001:2015 - Quality Management System",
    organization: "Bureau Veritas",
    issueDate: "2021-06-10",
    expiryDate: "2024-06-09",
    type: "Company",
    status: "Verified",
    document: "ISO9001_Certificate.pdf",
    linkedProducts: [],
  },
  {
    id: "2",
    name: "CE Marking - Electromagnetic Compatibility",
    organization: "TÜV SÜD",
    issueDate: "2022-03-15",
    expiryDate: "2027-03-14",
    type: "Product",
    status: "Verified",
    document: "CE_EMC_Certificate.pdf",
    linkedProducts: ["Industrial Bearing Kit", "Electronic Motor Controller"],
  },
  {
    id: "3",
    name: "RoHS Compliance",
    organization: "Intertek",
    issueDate: "2022-08-22",
    expiryDate: "2025-08-21",
    type: "Product",
    status: "Pending Verification",
    document: "RoHS_Compliance_Certificate.pdf",
    linkedProducts: ["Pressure Sensor Array"],
  },
];

// Product options for linking to certifications
const productOptions = [
  { label: "Industrial Bearing Kit", value: "bearing_kit" },
  { label: "Electronic Motor Controller", value: "motor_controller" },
  { label: "Pressure Sensor Array", value: "pressure_sensor" },
  { label: "Stainless Steel Pipe Fittings", value: "pipe_fittings" },
  { label: "Safety Harness Kit", value: "safety_harness" },
];

const CertificationsSection = () => {
  const [isAddCertDialogOpen, setIsAddCertDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [certifications, setCertifications] = useState(mockCertifications);
  const [certTab, setCertTab] = useState("all");
  const [documentFile, setDocumentFile] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const form = useForm<z.infer<typeof certificationSchema>>({
    resolver: zodResolver(certificationSchema),
    defaultValues: {
      certificateName: "",
      issuingOrganization: "",
      issueDate: "",
      expiryDate: "",
      certificationType: "",
      linkedProducts: [],
      documentFile: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof certificationSchema>) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Certification values:", values);
      
      // Generate a new certification object
      const newCertification = {
        id: (certifications.length + 1).toString(),
        name: values.certificateName,
        organization: values.issuingOrganization,
        issueDate: values.issueDate,
        expiryDate: values.expiryDate || "No Expiry",
        type: values.certificationType,
        status: "Pending Verification",
        document: documentFile || "Certificate.pdf",
        linkedProducts: values.linkedProducts 
          ? values.linkedProducts.map(p => 
              productOptions.find(po => po.value === p)?.label || p
            ) 
          : [],
      };
      
      // Add the new certification to the list
      setCertifications([...certifications, newCertification]);
      
      setIsLoading(false);
      setIsAddCertDialogOpen(false);
      form.reset();
      setDocumentFile(null);
      
      toast.success("Certification added successfully!");
    }, 1500);
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Simulate document upload
    if (e.target.files && e.target.files[0]) {
      // In a real application, you would upload the file to a server
      // Here we're just using the filename for demonstration
      setDocumentFile(e.target.files[0].name);
      toast.success("Document uploaded successfully!");
    }
  };

  const handleDeleteCertification = (id: string) => {
    setCertifications(certifications.filter(cert => cert.id !== id));
    toast.success("Certification deleted successfully!");
  };

  const filteredCertifications = certifications.filter(cert => {
    // Filter by search query
    const matchesSearch = 
      cert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.organization.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by certification type tab
    const matchesTab = 
      certTab === "all" || 
      (certTab === "company" && cert.type === "Company") || 
      (certTab === "product" && cert.type === "Product");
    
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-gray-800">Certifications</CardTitle>
              <CardDescription>
                Manage your company and product certifications.
              </CardDescription>
            </div>
            
            <Dialog open={isAddCertDialogOpen} onOpenChange={setIsAddCertDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-yellow-600 hover:bg-yellow-700">
                  <Plus size={16} />
                  <span>Upload Certification</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Certification</DialogTitle>
                  <DialogDescription>
                    Add details about your certification and upload the certificate document.
                  </DialogDescription>
                </DialogHeader>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                      control={form.control}
                      name="certificateName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Certificate Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., ISO 9001:2015 - Quality Management System" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="issuingOrganization"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Issuing Organization</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="e.g., Bureau Veritas" className="pl-10" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="certificationType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Certification Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Company">Company Certificate</SelectItem>
                                <SelectItem value="Product">Product Certificate</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="issueDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Issue Date</FormLabel>
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
                      
                      <FormField
                        control={form.control}
                        name="expiryDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Expiry Date (Optional)</FormLabel>
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
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="linkedProducts"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Link to Products (for product certifications)</FormLabel>
                          <FormControl>
                            <MultiSelect
                              options={productOptions}
                              selected={field.value || []}
                              onChange={field.onChange}
                              placeholder="Select products to link with this certification"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="space-y-3">
                      <FormLabel>Certificate Document</FormLabel>
                      <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground text-center mb-2">
                          Upload your certification document
                        </p>
                        <p className="text-xs text-muted-foreground mb-4">
                          PDF, JPG or PNG up to 10MB
                        </p>
                        <Input
                          id="certificationDocument"
                          type="file"
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleDocumentUpload}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById("certificationDocument")?.click()}
                        >
                          Browse Files
                        </Button>
                        
                        {documentFile && (
                          <div className="w-full mt-4 p-3 border rounded-md bg-muted/30 flex items-center justify-between">
                            <span className="text-sm font-medium">{documentFile}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => setDocumentFile(null)}
                            >
                              <Trash size={14} />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button 
                        variant="outline" 
                        type="button" 
                        onClick={() => setIsAddCertDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit" 
                        className="bg-yellow-600 hover:bg-yellow-700" 
                        disabled={isLoading}
                      >
                        {isLoading ? "Adding..." : "Add Certification"}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <Tabs defaultValue="all" className="w-full sm:w-auto" onValueChange={setCertTab}>
                <TabsList>
                  <TabsTrigger value="all">All Certifications</TabsTrigger>
                  <TabsTrigger value="company">Company</TabsTrigger>
                  <TabsTrigger value="product">Product</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search certifications..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {filteredCertifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No certifications found</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {searchQuery 
                    ? "Try a different search term" 
                    : "Upload your first certification to enhance your vendor profile"
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredCertifications.map((cert) => (
                  <Card key={cert.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] border-b">
                        <div className="p-4 md:p-6 space-y-4">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-lg">{cert.name}</h3>
                                <Badge 
                                  className={
                                    cert.status === "Verified" 
                                      ? "bg-green-100 text-green-800 border-green-200" 
                                      : "bg-orange-100 text-orange-800 border-orange-200"
                                  }
                                >
                                  {cert.status === "Verified" ? (
                                    <div className="flex items-center">
                                      <Check size={12} className="mr-1" />
                                      <span>Verified</span>
                                    </div>
                                  ) : (
                                    <div className="flex items-center">
                                      <AlertTriangle size={12} className="mr-1" />
                                      <span>Pending</span>
                                    </div>
                                  )}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Issued by <span className="font-medium">{cert.organization}</span>
                              </p>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="bg-gray-100">
                                {cert.type} Certificate
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Issue Date</p>
                              <p className="font-medium">
                                {new Date(cert.issueDate).toLocaleDateString()}
                              </p>
                            </div>
                            
                            <div>
                              <p className="text-muted-foreground">Expiry Date</p>
                              <p className="font-medium">
                                {cert.expiryDate === "No Expiry" 
                                  ? "No Expiry" 
                                  : new Date(cert.expiryDate).toLocaleDateString()
                                }
                              </p>
                            </div>
                            
                            <div>
                              <p className="text-muted-foreground">Document</p>
                              <p className="font-medium text-blue-600 underline cursor-pointer">
                                {cert.document}
                              </p>
                            </div>
                          </div>
                          
                          {cert.linkedProducts.length > 0 && (
                            <div>
                              <p className="text-sm text-muted-foreground mb-2">Linked Products</p>
                              <div className="flex flex-wrap gap-1">
                                {cert.linkedProducts.map((product, index) => (
                                  <Badge 
                                    key={index}
                                    variant="outline" 
                                    className="bg-yellow-50 text-yellow-800"
                                  >
                                    {product}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex md:flex-col justify-end items-center gap-2 p-4 bg-muted/20 border-l">
                          <Button variant="ghost" size="icon" className="h-9 w-9">
                            <Eye size={16} />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-9 w-9">
                            <Pencil size={16} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-9 w-9 text-destructive hover:text-destructive"
                            onClick={() => handleDeleteCertification(cert.id)}
                          >
                            <Trash size={16} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CertificationsSection;
