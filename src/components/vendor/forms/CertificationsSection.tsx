
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlusCircle, Upload, FileText, Download, Trash, Check, X, CalendarIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

// Define certification schema
const certificationSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, { message: "Certification name is required" }),
  issuingOrganization: z.string().min(2, { message: "Issuing organization is required" }),
  issueDate: z.date({ required_error: "Issue date is required" }),
  expiryDate: z.date().optional(),
  documentName: z.string().optional(),
  isVerified: z.boolean().default(false),
});

type Certification = z.infer<typeof certificationSchema>;

// Mock data for certifications
const initialCertifications: Certification[] = [
  {
    id: "1",
    name: "ISO 9001:2015",
    issuingOrganization: "Quality Council of India",
    issueDate: new Date("2021-05-15"),
    expiryDate: new Date("2024-05-14"),
    documentName: "ISO9001_Certificate.pdf",
    isVerified: true,
  },
  {
    id: "2",
    name: "ISA/IEC 62443 Cybersecurity Expert",
    issuingOrganization: "International Society of Automation",
    issueDate: new Date("2022-08-10"),
    expiryDate: new Date("2025-08-09"),
    documentName: "ISA_Cybersecurity_Cert.pdf",
    isVerified: true,
  },
];

const CertificationsSection = () => {
  const [certifications, setCertifications] = useState<Certification[]>(initialCertifications);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<Certification>({
    resolver: zodResolver(certificationSchema),
    defaultValues: {
      name: "",
      issuingOrganization: "",
      issueDate: undefined,
      expiryDate: undefined,
      documentName: "",
      isVerified: false,
    },
  });

  const openAddCertificationDialog = () => {
    form.reset({
      name: "",
      issuingOrganization: "",
      issueDate: undefined,
      expiryDate: undefined,
      documentName: "",
      isVerified: false,
    });
    setSelectedFile(null);
    setIsDialogOpen(true);
  };

  const onSubmit = (values: Certification) => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      const newCertification = {
        ...values,
        id: `${Date.now()}`,
        documentName: selectedFile ? selectedFile.name : undefined,
      };
      
      setCertifications([...certifications, newCertification]);
      setIsDialogOpen(false);
      setIsSubmitting(false);
      toast.success("Certification added successfully!");
    }, 1000);
  };

  const handleDeleteCertification = (id: string) => {
    if (confirm("Are you sure you want to delete this certification?")) {
      setCertifications(certifications.filter((cert) => cert.id !== id));
      toast.success("Certification deleted successfully!");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <>
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-gray-800">Certifications</CardTitle>
            <CardDescription>
              Manage your company certifications and licenses
            </CardDescription>
          </div>
          <Button onClick={openAddCertificationDialog} className="bg-orange-600 hover:bg-orange-700">
            <PlusCircle className="mr-2 h-4 w-4" />
            Upload Certification
          </Button>
        </CardHeader>
        
        <CardContent>
          {certifications.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              No certifications added yet. Click "Upload Certification" to get started.
            </div>
          ) : (
            <div className="space-y-4">
              {certifications.map((certification) => (
                <Card key={certification.id} className="overflow-hidden border-l-4 border-l-orange-500">
                  <CardContent className="p-6">
                    <div className="flex justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{certification.name}</h3>
                          {certification.isVerified && (
                            <Badge className="bg-green-100 text-green-600 hover:bg-green-200">
                              <Check className="mr-1 h-3 w-3" /> Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          Issued by: <span className="font-medium">{certification.issuingOrganization}</span>
                        </p>
                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
                          <span>
                            Issue Date: <span className="font-medium">
                              {format(new Date(certification.issueDate), "MMM dd, yyyy")}
                            </span>
                          </span>
                          {certification.expiryDate && (
                            <span>
                              Expiry Date: <span className="font-medium">
                                {format(new Date(certification.expiryDate), "MMM dd, yyyy")}
                              </span>
                            </span>
                          )}
                        </div>
                        
                        {certification.documentName && (
                          <div className="flex items-center gap-2 mt-2">
                            <FileText className="h-4 w-4 text-blue-600" />
                            <span className="text-sm text-blue-600">{certification.documentName}</span>
                            <Button variant="ghost" size="sm" className="h-8 ml-2 text-blue-600">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        )}
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDeleteCertification(certification.id!)}
                        className="h-8 w-8 text-red-600"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Upload Certification</DialogTitle>
            <DialogDescription>
              Add a new certification to showcase your company's credentials
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Certification Name</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., ISO 9001:2015" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="issuingOrganization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Issuing Organization</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., Quality Council of India" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="issueDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Issue Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date > new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="expiryDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Expiry Date (Optional)</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => 
                              date < new Date(form.getValues().issueDate || new Date())
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground text-center mb-2">
                  Drag and drop certification document or click to browse
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  PDF, JPG or PNG up to 5MB
                </p>
                <Input
                  id="certificationDocument"
                  type="file"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("certificationDocument")?.click()}
                >
                  Browse Files
                </Button>
                {selectedFile && (
                  <div className="flex items-center gap-2 mt-4">
                    <FileText className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">{selectedFile.name}</span>
                  </div>
                )}
              </div>
              
              <DialogFooter className="pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting} className="bg-orange-600 hover:bg-orange-700">
                  {isSubmitting ? "Uploading..." : "Upload Certification"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CertificationsSection;
