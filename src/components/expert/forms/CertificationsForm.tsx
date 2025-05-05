
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  certificationName: z.string().min(1, { message: "Certification name is required" }),
  issuingOrganization: z.string().min(1, { message: "Issuing organization is required" }),
  credentialID: z.string().optional(),
});

const CertificationsForm = () => {
  const [certifications, setCertifications] = useState<Array<{
    name: string;
    organization: string;
    id?: string;
    issueDate: Date;
    expiryDate?: Date;
  }>>([
    {
      name: "Certified Welding Inspector",
      organization: "American Welding Society",
      id: "AWS-123456",
      issueDate: new Date(2022, 5, 15),
      expiryDate: new Date(2025, 5, 14),
    },
    {
      name: "Certified Maintenance & Reliability Professional",
      organization: "Society for Maintenance & Reliability Professionals",
      id: "CMRP-789012",
      issueDate: new Date(2021, 8, 22),
    },
  ]);

  const [issueDate, setIssueDate] = useState<Date | undefined>(undefined);
  const [expiryDate, setExpiryDate] = useState<Date | undefined>(undefined);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      certificationName: "",
      issuingOrganization: "",
      credentialID: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!issueDate) {
      return; // Issue date is required
    }

    const newCertification = {
      name: values.certificationName,
      organization: values.issuingOrganization,
      id: values.credentialID,
      issueDate: issueDate,
      expiryDate: expiryDate,
    };
    
    setCertifications([...certifications, newCertification]);
    
    form.reset({
      certificationName: "",
      issuingOrganization: "",
      credentialID: "",
    });
    setIssueDate(undefined);
    setExpiryDate(undefined);
  }

  function removeCertification(index: number) {
    const updatedCertifications = [...certifications];
    updatedCertifications.splice(index, 1);
    setCertifications(updatedCertifications);
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Certifications</CardTitle>
        <CardDescription>
          Add your professional certifications and credentials to showcase your qualifications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-8">
          <h3 className="text-base font-medium text-gray-800 mb-4">Your Certifications</h3>
          
          {certifications.length === 0 ? (
            <div className="text-center p-6 border border-dashed rounded-md">
              <p className="text-gray-500">No certifications added yet. Add your first certification below.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div 
                  key={index} 
                  className="flex items-start justify-between bg-gray-50 rounded-md p-4 border"
                >
                  <div>
                    <h4 className="font-medium">{cert.name}</h4>
                    <p className="text-sm text-gray-600">{cert.organization}</p>
                    {cert.id && <p className="text-xs text-gray-500 mt-1">ID: {cert.id}</p>}
                    <div className="flex gap-3 mt-2 text-xs text-gray-500">
                      <span>Issued: {format(cert.issueDate, "MMM yyyy")}</span>
                      {cert.expiryDate && (
                        <span>Expires: {format(cert.expiryDate, "MMM yyyy")}</span>
                      )}
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={() => removeCertification(index)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t pt-6">
          <h3 className="text-base font-medium text-gray-800 mb-4">Add New Certification</h3>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="certificationName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Certification Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Certified Welding Inspector" {...field} />
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
                        <Input placeholder="e.g. American Welding Society" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="credentialID"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Credential ID (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. AWS-123456" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormItem className="flex flex-col">
                  <FormLabel>Issue Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "justify-start text-left font-normal",
                          !issueDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {issueDate ? format(issueDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={issueDate}
                        onSelect={setIssueDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>

                <FormItem className="flex flex-col">
                  <FormLabel>Expiry Date (Optional)</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "justify-start text-left font-normal",
                          !expiryDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {expiryDate ? format(expiryDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={expiryDate}
                        onSelect={setExpiryDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              </div>

              <div className="flex justify-end">
                <Button type="submit">Add Certification</Button>
              </div>
            </form>
          </Form>
        </div>
      </CardContent>
    </>
  );
};

export default CertificationsForm;
