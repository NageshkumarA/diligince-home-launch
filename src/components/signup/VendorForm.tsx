
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  companyName: z.string().min(2, { message: "Company name is required" }),
  serviceType: z.string().min(1, { message: "Service type is required" }),
  vendorCategory: z.string().min(1, { message: "Vendor category is required" }),
  contactEmail: z.string().email({ message: "Please enter a valid email address" }),
  contactPhone: z.string().min(10, { message: "Please enter a valid phone number" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  website: z.string().optional(),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

export function VendorForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      serviceType: "",
      vendorCategory: "",
      contactEmail: "",
      contactPhone: "",
      description: "",
      website: "",
      termsAccepted: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast.success("Vendor account created successfully!", {
      description: "Welcome to diligince.ai",
    });
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your company name" {...field} />
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
                  <SelectTrigger>
                    <SelectValue placeholder="Select vendor category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="service">Service Vendor</SelectItem>
                  <SelectItem value="product">Product Vendor</SelectItem>
                  <SelectItem value="logistics">Logistics Vendor</SelectItem>
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
              <FormLabel>Specialization</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your primary specialization" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-80">
                  {/* Service Vendors */}
                  <SelectItem value="maintenance">Plant Maintenance Services</SelectItem>
                  <SelectItem value="repair">Equipment Repair & Overhaul</SelectItem>
                  <SelectItem value="installation">Installation & Commissioning</SelectItem>
                  <SelectItem value="engineering">Engineering & Design</SelectItem>
                  <SelectItem value="automation">Automation & Control Systems</SelectItem>
                  <SelectItem value="testing">Testing & Quality Assurance</SelectItem>
                  <SelectItem value="calibration">Calibration Services</SelectItem>
                  <SelectItem value="inspection">Industrial Inspection</SelectItem>
                  <SelectItem value="consulting">Technical Consulting</SelectItem>
                  <SelectItem value="training">Technical Training</SelectItem>
                  
                  {/* Product Vendors */}
                  <SelectItem value="machinery">Industrial Machinery</SelectItem>
                  <SelectItem value="equipment">Processing Equipment</SelectItem>
                  <SelectItem value="parts">Spare Parts & Components</SelectItem>
                  <SelectItem value="tools">Specialized Tools</SelectItem>
                  <SelectItem value="consumables">Industrial Consumables</SelectItem>
                  <SelectItem value="electrical">Electrical Equipment</SelectItem>
                  <SelectItem value="instruments">Instrumentation & Controls</SelectItem>
                  <SelectItem value="safety">Safety Equipment</SelectItem>
                  <SelectItem value="chemicals">Industrial Chemicals</SelectItem>
                  <SelectItem value="materials">Raw Materials</SelectItem>
                  
                  {/* Logistics Vendors */}
                  <SelectItem value="transport">Industrial Transport</SelectItem>
                  <SelectItem value="heavyLifting">Heavy Lifting & Crane Services</SelectItem>
                  <SelectItem value="warehouse">Warehousing & Storage</SelectItem>
                  <SelectItem value="distribution">Distribution Services</SelectItem>
                  <SelectItem value="supplyChain">Supply Chain Management</SelectItem>
                  <SelectItem value="heavyEquipment">Heavy Equipment Rentals</SelectItem>
                  <SelectItem value="projectLogistics">Project Logistics</SelectItem>
                  <SelectItem value="freight">Freight Forwarding</SelectItem>
                  <SelectItem value="customs">Customs Clearance</SelectItem>
                  <SelectItem value="fleetManagement">Fleet Management</SelectItem>
                  
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="contact@company.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Phone</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="+91 98765 43210" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Briefly describe your services and expertise..." 
                  {...field} 
                  className="resize-none min-h-[100px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://yourcompany.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

        <Button type="submit" className="w-full hover:scale-105 transition-transform duration-200">Register as Vendor</Button>
      </form>
    </Form>
  );
}
