
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MultiSelect } from "@/components/vendor/ui/MultiSelect";

const companyFormSchema = z.object({
  companyName: z.string().min(2, { message: "Company name must be at least 2 characters" }),
  industryFocus: z.array(z.string()).min(1, { message: "Select at least one industry" }),
  companyDescription: z.string().min(10, { message: "Description must be at least 10 characters" }),
  gstNumber: z.string().optional(),
  registrationNumber: z.string().min(1, { message: "Registration number is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
  address: z.string().min(5, { message: "Address must be at least 5 characters" }),
  yearEstablished: z.string().regex(/^\d{4}$/, { message: "Please enter a valid year (e.g., 2010)" }),
});

const industryOptions = [
  { label: "Manufacturing", value: "manufacturing" },
  { label: "Oil & Gas", value: "oil-gas" },
  { label: "Construction", value: "construction" },
  { label: "Mining", value: "mining" },
  { label: "Pharmaceuticals", value: "pharmaceuticals" },
  { label: "Automotive", value: "automotive" },
  { label: "Chemical", value: "chemical" },
  { label: "Food Processing", value: "food-processing" },
  { label: "Aerospace", value: "aerospace" },
  { label: "Energy", value: "energy" },
  { label: "Textile", value: "textile" },
  { label: "Logistics", value: "logistics" },
];

export const CompanyInfoForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Mock default values (in a real app, these would come from an API)
  const defaultValues = {
    companyName: "TransLog India Pvt Ltd",
    industryFocus: ["manufacturing", "oil-gas", "construction"],
    companyDescription: "TransLog India provides specialized logistics and transportation services for heavy machinery, industrial equipment, and oversized cargo across India. With over a decade of experience, we excel in moving complex industrial shipments safely and efficiently.",
    gstNumber: "29ABCDE1234F1Z5",
    registrationNumber: "U12345AB2010PTC123456",
    email: "contact@translogindia.com",
    phone: "9876543210",
    address: "123 Industrial Transport Hub, MIDC Area, Mumbai - 400072, Maharashtra, India",
    yearEstablished: "2010",
  };

  const form = useForm<z.infer<typeof companyFormSchema>>({
    resolver: zodResolver(companyFormSchema),
    defaultValues,
  });

  const onSubmit = (values: z.infer<typeof companyFormSchema>) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Form values:", values);
      setIsSubmitting(false);
      toast.success("Company information updated successfully!");
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">Company Information</CardTitle>
        <CardDescription>
          Update your company details visible to industrial clients
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter company name" {...field} />
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
                      <Input placeholder="YYYY" {...field} />
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
                      placeholder="Select industries you serve"
                      options={industryOptions}
                      selected={field.value}
                      onChange={field.onChange}
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
                      placeholder="Describe your transport/logistics services, expertise and capabilities..." 
                      className="h-32 resize-none"
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
                    <FormLabel>GST Number</FormLabel>
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
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email address" type="email" {...field} />
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
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter phone number" {...field} />
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
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter company address" 
                      className="resize-none"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4 pt-4">
              <Button variant="outline" type="button">
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-[#eb2f96] hover:bg-[#c4257d]"
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
