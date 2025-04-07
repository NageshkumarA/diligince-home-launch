
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const formSchema = z.object({
  industryType: z.string().min(1, { message: "Please select an industry type" }),
  companyName: z.string().min(2, { message: "Company name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

export const IndustryForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      industryType: "",
      companyName: "",
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
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="industryType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industry Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="power">Power & Energy</SelectItem>
                  <SelectItem value="oil">Oil & Gas</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="construction">Construction</SelectItem>
                  <SelectItem value="mining">Mining</SelectItem>
                  <SelectItem value="steel">Steel & Metals</SelectItem>
                  <SelectItem value="chemical">Chemical & Petrochemical</SelectItem>
                  <SelectItem value="pharmaceutical">Pharmaceutical</SelectItem>
                  <SelectItem value="automotive">Automotive</SelectItem>
                  <SelectItem value="aerospace">Aerospace & Defense</SelectItem>
                  <SelectItem value="semiconductor">Semiconductor & Electronics</SelectItem>
                  <SelectItem value="food">Food & Beverage</SelectItem>
                  <SelectItem value="textile">Textile & Apparel</SelectItem>
                  <SelectItem value="paper">Paper & Pulp</SelectItem>
                  <SelectItem value="cement">Cement & Building Materials</SelectItem>
                  <SelectItem value="water">Water & Wastewater</SelectItem>
                  <SelectItem value="renewable">Renewable Energy</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@company.com" {...field} />
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
