import { useState, DragEvent, ChangeEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MoreVertical, PlusCircle, Upload, FileText, Download, Trash, Check, Edit, Loader2, X, ArrowUpDown, ChevronRight, ChevronLeft } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

const certificationSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, { message: "Certification name is required" }),
  issuingOrganization: z.string().min(2, { message: "Issuing organization is required" }),
  issueDate: z.string().min(1, { message: "Issue date is required" }),
  expiryDate: z.string().optional(),
  documentName: z.string().optional(),
  isVerified: z.boolean().default(false),
}).refine((data) => {
    if (data.issueDate && data.expiryDate) {
      return new Date(data.expiryDate) > new Date(data.issueDate);
    }
    return true;
  }, {
    message: "Expiry date must be after the issue date.",
    path: ["expiryDate"],
});

type CertificationFormValues = z.infer<typeof certificationSchema>;
type CertificationState = Omit<CertificationFormValues, "issueDate" | "expiryDate"> & {
  issueDate: Date;
  expiryDate?: Date;
  documentUrl?: string;
  isMandatory?: boolean;
};

type SortField = "name" | "issuingOrganization" | "issueDate" | "expiryDate";
type SortDirection = "asc" | "desc";

const ALLOWED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png"];
const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const LOCAL_STORAGE_KEY = "companyCertifications";
const ITEMS_PER_PAGE = 6;

const MANDATORY_CERTIFICATIONS: CertificationState[] = [
  {
    id: "1",
    name: "Company Registration",
    issuingOrganization: "Ministry of Corporate Affairs",
    issueDate: new Date(),
    documentName: "company_registration.pdf",
    isVerified: true,
    documentUrl: "/docs/company_registration.pdf",
    isMandatory: true,
  },
  {
    id: "2",
    name: "ISO 9001 Certificate",
    issuingOrganization: "International Organization for Standardization",
    issueDate: new Date(),
    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 3)),
    documentName: "iso_9001_certificate.pdf",
    isVerified: true,
    documentUrl: "/docs/iso_9001_certificate.pdf",
    isMandatory: true,
  },
  {
    id: "3",
    name: "GST Certificate",
    issuingOrganization: "Goods and Services Tax Network",
    issueDate: new Date(),
    documentName: "gst_certificate.pdf",
    isVerified: true,
    documentUrl: "/docs/gst_certificate.pdf",
    isMandatory: true,
  },
];

const CertificationsSection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [editingCertification, setEditingCertification] = useState<CertificationState | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [sortField, setSortField] = useState<SortField>("issueDate");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [customCertifications, setCustomCertifications] = useState<CertificationState[]>([]);
  const [showCertInfo, setShowCertInfo] = useState(false);
  const [showCertDialogInfo, setShowCertDialogInfo] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const form = useForm<CertificationFormValues>({
    resolver: zodResolver(certificationSchema),
    defaultValues: { name: "", issuingOrganization: "", issueDate: "", expiryDate: "" },
    mode: 'onTouched',
  });

  const issueDateValue = form.watch("issueDate");
  
  const [mandatoryCertifications, setMandatoryCertifications] = useState<CertificationState[]>(MANDATORY_CERTIFICATIONS);
  const allCertifications = [...mandatoryCertifications, ...customCertifications];
  
  const sortedCertifications = [...allCertifications].sort((a, b) => {
    let comparison = 0;
    
    switch (sortField) {
      case "name":
        comparison = a.name.localeCompare(b.name);
        break;
      case "issuingOrganization":
        comparison = a.issuingOrganization.localeCompare(b.issuingOrganization);
        break;
      case "issueDate":
        comparison = a.issueDate.getTime() - b.issueDate.getTime();
        break;
      case "expiryDate":
        const aExpiry = a.expiryDate?.getTime() || Infinity;
        const bExpiry = b.expiryDate?.getTime() || Infinity;
        comparison = aExpiry - bExpiry;
        break;
    }
    
    return sortDirection === "asc" ? comparison : -comparison;
  });

  // Pagination calculations
  const totalPages = Math.ceil(sortedCertifications.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = sortedCertifications.slice(indexOfFirstItem, indexOfLastItem);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  useEffect(() => {
    try {
      const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        const formatted = parsedData.map((cert: any) => ({
          ...cert,
          issueDate: new Date(cert.issueDate),
          expiryDate: cert.expiryDate ? new Date(cert.expiryDate) : undefined,
          isMandatory: false,
        }));
        setCustomCertifications(formatted);
      }
    } catch {
      toast.error("Failed to load certifications");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(customCertifications));
    }
  }, [customCertifications, isLoading]);

  function handleDragOver(event: DragEvent<HTMLDivElement>): void {
    event.preventDefault();
    setIsDragging(true);
  }

  function resetAndCloseDialog(): void {
    form.reset();
    setSelectedFile(null);
    setEditingCertification(null);
    setIsDialogOpen(false);
    setCurrentPage(1); // Reset to first page after dialog closes
  }

  function handleDrop(event: DragEvent<HTMLDivElement>): void {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];
    if (!file) return;

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      toast.error("Unsupported file type");
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      toast.error(`File size exceeds ${MAX_FILE_SIZE_MB}MB`);
      return;
    }

    setSelectedFile(file);
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>): void {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      toast.error("Unsupported file type");
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      toast.error(`File size exceeds ${MAX_FILE_SIZE_MB}MB`);
      return;
    }

    setSelectedFile(file);
  }

  function handleDeleteCertification(id: string): void {
    if (MANDATORY_CERTIFICATIONS.some(cert => cert.id === id)) {
      toast.error("Mandatory certifications cannot be deleted");
      return;
    }

    const updated = customCertifications.filter(cert => cert.id !== id);
    setCustomCertifications(updated);
    toast.success("Certification deleted");
    // Reset to first page if last item on current page is deleted
    if (currentItems.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function openEditCertificationDialog(certification?: CertificationState): void {
    setIsDialogOpen(true);

    if (certification) {
      setEditingCertification(certification);
      form.setValue("name", certification.name);
      form.setValue("issuingOrganization", certification.issuingOrganization);
      form.setValue("issueDate", format(certification.issueDate, "yyyy-MM-dd"));
      form.setValue("expiryDate", certification.expiryDate ? format(certification.expiryDate, "yyyy-MM-dd") : "");
    } else {
      form.reset();
      setSelectedFile(null);
      setEditingCertification(null);
    }
  }

  function handleDownload(certification: CertificationState): void {
    if (!certification.documentUrl) {
      toast.error("No document available for download");
      return;
    }

    const link = document.createElement("a");
    link.href = certification.documentUrl;
    link.download = certification.documentName || "document";
    link.click();
  }

  async function onSubmit(values: CertificationFormValues) {
    setIsSubmitting(true);

    try {
      const newCertification: CertificationState = {
        ...values,
        id: editingCertification?.id || Date.now().toString(),
        issueDate: new Date(values.issueDate),
        expiryDate: values.expiryDate ? new Date(values.expiryDate) : undefined,
        documentName: selectedFile?.name || editingCertification?.documentName,
        documentUrl: selectedFile
          ? URL.createObjectURL(selectedFile)
          : editingCertification?.documentUrl,
        isVerified: editingCertification?.isVerified || false,
        isMandatory: editingCertification?.isMandatory || false,
      };

      if (!editingCertification || 
          (editingCertification.name !== newCertification.name) || 
          (editingCertification.documentName !== newCertification.documentName)) {
        
        const nameExists = allCertifications.some(
          cert => 
            cert.id !== editingCertification?.id &&
            cert.name.toLowerCase() === newCertification.name.toLowerCase()
        );
        
        const fileExists = selectedFile && allCertifications.some(
          cert => 
            cert.id !== editingCertification?.id &&
            cert.documentName === newCertification.documentName
        );

        if (nameExists && fileExists) {
          toast.error("A certificate with the same name and file already exists");
          setIsSubmitting(false);
          return;
        } else if (nameExists) {
          toast.error("A certificate with this name already exists");
          setIsSubmitting(false);
          return;
        } else if (fileExists) {
          toast.error("This certificate file has already been uploaded");
          setIsSubmitting(false);
          return;
        }
      }

      if (editingCertification) {
        if (editingCertification.isMandatory) {
          const updatedMandatory = mandatoryCertifications.map(cert => 
            cert.id === editingCertification.id ? newCertification : cert
          );
          setMandatoryCertifications(updatedMandatory);
          toast.success("Mandatory certification updated");
        } else {
          const updated = customCertifications.map((cert) =>
            cert.id === editingCertification.id ? newCertification : cert
          );
          setCustomCertifications(updated);
          toast.success("Certification updated");
        }
      } else {
        setCustomCertifications([...customCertifications, newCertification]);
        toast.success("Certification uploaded");
      }

      resetAndCloseDialog();
    } catch (error) {
      toast.error("Failed to save certification");
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    return () => {
      if (selectedFile) {
        URL.revokeObjectURL(selectedFile.name);
      }
    };
  }, [selectedFile]);

  return (
    <>
      <CardHeader className="flex flex-row items-start justify-between">
        <div className="flex flex-col">
          <div className="flex items-center">
            <CardTitle className="mr-2 text-2xl text-gray-800">Certifications</CardTitle>
            <button
              type="button"
              onClick={() => setShowCertInfo((prev) => !prev)}
              className="text-muted-foreground hover:text-blue-600 transition"
            >
              <Info className="h-5 w-5" />
            </button>
          </div>

          <div className="min-h-[20px]">
            {showCertInfo && (
              <CardDescription className="text-sm text-muted-foreground">
                Manage your company certifications and licenses
              </CardDescription>
            )}
          </div>
        </div>

        <Button
          onClick={() => openEditCertificationDialog()}
          className="bg-[#1890ff] hover:bg-[#005A9E] mt-[10px]"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Upload Certification
        </Button>
      </CardHeader>
      
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
          </div>
        ) : sortedCertifications.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground border rounded-lg">
            <Upload className="h-10 w-10 mx-auto text-gray-400" />
            <p className="mt-2">No certifications added yet</p>
            <p className="text-sm text-gray-500">Upload your company certifications</p>
            <Button 
              onClick={() => openEditCertificationDialog()}
              variant="ghost"
              className="mt-4 text-[#1890ff]"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Upload Certification
            </Button>
          </div>
        ) : (
          <>
            <div className="flex gap-2 mb-4 flex-wrap">
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => handleSort("name")}
              >
                <span>Name</span>
                <ArrowUpDown className="h-4 w-4" />
                {sortField === "name" && (
                  <span className="text-xs">{sortDirection === "asc" ? "↑" : "↓"}</span>
                )}
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => handleSort("issuingOrganization")}
              >
                <span>Organization</span>
                <ArrowUpDown className="h-4 w-4" />
                {sortField === "issuingOrganization" && (
                  <span className="text-xs">{sortDirection === "asc" ? "↑" : "↓"}</span>
                )}
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => handleSort("issueDate")}
              >
                <span>Issue Date</span>
                <ArrowUpDown className="h-4 w-4" />
                {sortField === "issueDate" && (
                  <span className="text-xs">{sortDirection === "asc" ? "↑" : "↓"}</span>
                )}
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => handleSort("expiryDate")}
              >
                <span>Expiry Date</span>
                <ArrowUpDown className="h-4 w-4" />
                {sortField === "expiryDate" && (
                  <span className="text-xs">{sortDirection === "asc" ? "↑" : "↓"}</span>
                )}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {currentItems.map((certification) => (
                <Card 
                  key={certification.id} 
                  className={cn(
                    "overflow-hidden flex flex-col",
                    certification.isMandatory ? "border-blue-100 bg-blue-50" : ""
                  )}
                >
                  <CardContent className="p-4 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-3 gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 truncate">
                          <h3 className="font-semibold text-lg truncate">{certification.name}</h3>
                          {certification.isMandatory && (
                            <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-200 flex-shrink-0">
                              Mandatory
                            </Badge>
                          )}
                          {certification.isVerified && (
                            <Badge className="bg-green-100 text-green-600 hover:bg-green-200 flex-shrink-0">
                              <Check className="mr-1 h-3 w-3" /> Verified
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleDownload(certification)}>
                            <Download className="mr-2 h-4 w-4" />
                            <span>Download</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openEditCertificationDialog(certification)}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          {!certification.isMandatory && (
                            <DropdownMenuItem 
                              onClick={() => handleDeleteCertification(certification.id!)}
                              className="text-red-500 focus:text-red-500"
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="flex-grow space-y-2 mb-2">
                      <p className="text-sm text-gray-600">
                        Issued by: <span className="font-medium">{certification.issuingOrganization}</span>
                      </p>
                    </div>

                    {certification.documentName && (
                      <div className="flex items-center gap-2 pb-2">
                        <FileText className="h-4 w-4 text-blue-600 flex-shrink-0" />
                        <span className="text-sm text-blue-600 truncate">{certification.documentName}</span>
                      </div>
                    )}

                    <div className="mt-auto pt-3 border-t flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
                      <span>
                        Issued: <span className="font-medium">
                          {format(certification.issueDate, "dd-MM-yyyy")}
                        </span>
                      </span>
                      <span>
                        Expiry: <span className="font-medium">
                          {certification.expiryDate ? format(certification.expiryDate, "dd-MM-yyyy") : "NA"}
                        </span>
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination controls */}
          {totalPages > 1 && (
  <div className="flex justify-center items-center gap-1 mt-6">
    {/* Left Arrow */}
    <Button
      variant="outline"
      size="sm"
      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
      className="h-8 w-8"
    >
      <ChevronLeft className="h-4 w-4" />
    </Button>

    {/* Page Numbers */}
    {Array.from({ length: totalPages }, (_, i) => i + 1)
      .filter(page => {
        // Always show first, last, current, and neighbors of current
        return (
          page === 1 ||
          page === totalPages ||
          Math.abs(page - currentPage) <= 1
        );
      })
      .reduce((acc: (number | string)[], page, index, array) => {
        if (
          index > 0 &&
          typeof page === 'number' &&
          typeof array[index - 1] === 'number' &&
          (page as number) - (array[index - 1] as number) > 1
        ) {
          acc.push("...");
        }
        acc.push(page);
        return acc;
      }, [])
      .map((page, idx) =>
        typeof page === "number" ? (
          <Button
            key={idx}
            variant={currentPage === page ? "default" : "outline"}
            size="sm"
            onClick={() => setCurrentPage(page)}
            className={`h-8 w-8 ${
              currentPage === page
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : ""
            }`}
          >
            {page}
          </Button>
        ) : (
          <span key={idx} className="px-1">
            ...
          </span>
        )
      )}

    {/* Right Arrow */}
    <Button
      variant="outline"
      size="sm"
      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
      disabled={currentPage === totalPages}
      className="h-8 w-8"
    >
      <ChevronRight className="h-4 w-4" />
    </Button>
  </div>
)}

          </>
        )}
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={(isOpen) => { if (!isOpen) resetAndCloseDialog(); else setIsDialogOpen(true); }}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <DialogTitle>
                  {editingCertification 
                    ? editingCertification.isMandatory 
                      ? 'Edit Mandatory Certification' 
                      : 'Edit Certification'
                    : 'Upload Certification'}
                </DialogTitle>
                <button
                  type="button"
                  onClick={() => setShowCertDialogInfo(prev => !prev)}
                  className="text-muted-foreground hover:text-blue-600 transition"
                >
                  <Info className="h-5 w-5" />
                </button>
              </div>
              
              <div className="min-h-[20px] mt-1">
                {showCertDialogInfo && (
                  <DialogDescription>
                    {editingCertification
                      ? "Update the details of this certification"
                      : "Add a new certification to showcase your company's credentials"}
                  </DialogDescription>
                )}
              </div>
            </div>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Certification Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g ISO 9001:2015" 
                        {...field} 
                        disabled={editingCertification?.isMandatory}
                        readOnly={editingCertification?.isMandatory}
                      />
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
                    <FormLabel className="text-foreground">Issuing Organization</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g Quality Council of India" 
                        {...field} 
                      />
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
                    <FormItem>
                      <FormLabel className="text-foreground">Issue Date</FormLabel>
                      <FormControl>
                        <Input 
                          type="date" 
                          max={format(new Date(), 'yyyy-MM-dd')}
                          {...field}
                        />
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
                      <FormLabel className="text-foreground">Expiry Date (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          type="date"
                          min={issueDateValue}
                          disabled={!issueDateValue}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormItem>
                <FormLabel className="text-foreground">Certification Document</FormLabel>
                {!selectedFile && editingCertification?.documentName && (
                  <div className="flex items-center gap-2 p-2 mt-2 rounded-md border text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span className="truncate">Current file: {editingCertification.documentName}</span>
                  </div>
                )}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById("certificationDocument")?.click()}
                  className={cn(
                    "border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors",
                    isDragging ? "border-[#005A9E] bg-[#005A9E]" : "border-border hover:border-[#005A9E]"
                  )}
                >
                  <Upload className="h-10 w-10 text-blue-500 mb-2" />

                  <p className="text-sm text-muted-foreground mb-2">
  Drag and drop document or <span className="font-bold text-blue-600">click to browse</span>
</p>
                  <p className="text-xs text-muted-foreground">Supports PDF, JPG, PNG up to {MAX_FILE_SIZE_MB}MB</p>
                  <Input 
                    id="certificationDocument" 
                    type="file" 
                    className="hidden" 
                    accept=".pdf,.jpg,.jpeg,.png" 
                    onChange={handleFileChange}
                  />
                </div>
                
                {selectedFile && (
                  <div className="flex items-center justify-between p-2 mt-2 rounded-md border text-sm">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <span className="truncate">{selectedFile.name}</span>
                      <span className="text-gray-500 text-xs flex-shrink-0">({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                    </div>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 text-red-500" 
                      onClick={() => setSelectedFile(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </FormItem>
              
              <DialogFooter className="pt-4">
                <Button type="submit" disabled={isSubmitting} className="bg-[#1890ff] hover:bg-[#005A9E]">
                  {isSubmitting ? "Saving..." : (editingCertification ? "Update" : "Upload")}
                </Button>
                <Button type="button" variant="outline" onClick={resetAndCloseDialog}>Cancel</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CertificationsSection;