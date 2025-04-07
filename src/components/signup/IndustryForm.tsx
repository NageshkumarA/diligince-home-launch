
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
  industryType: z.string().min(1, { message: "Industry type is required" }),
  location: z.string().min(2, { message: "Location is required" }),
  contactEmail: z.string().email({ message: "Please enter a valid email address" }),
  contactPhone: z.string().min(10, { message: "Please enter a valid phone number" }),
  description: z.string().optional(),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

export function IndustryForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      industryType: "",
      location: "",
      contactEmail: "",
      contactPhone: "",
      description: "",
      termsAccepted: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast.success("Industry account created successfully!", {
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
          name="industryType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industry Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your industry type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="sugar">Sugar Mill</SelectItem>
                  <SelectItem value="cement">Cement Plant</SelectItem>
                  <SelectItem value="steel">Steel Plant</SelectItem>
                  <SelectItem value="paper">Paper Mill</SelectItem>
                  <SelectItem value="power">Power Plant</SelectItem>
                  <SelectItem value="oil-gas">Oil & Gas</SelectItem>
                  <SelectItem value="chemical">Chemical</SelectItem>
                  <SelectItem value="pharmaceutical">Pharmaceutical</SelectItem>
                  <SelectItem value="textile">Textile</SelectItem>
                  <SelectItem value="food-processing">Food Processing</SelectItem>
                  <SelectItem value="automotive">Automotive</SelectItem>
                  <SelectItem value="mining">Mining</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="plastics">Plastics & Polymers</SelectItem>
                  <SelectItem value="water-treatment">Water Treatment</SelectItem>
                  <SelectItem value="renewable-energy">Renewable Energy</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="City, State, Country" {...field} />
              </FormControl>
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
              <FormLabel>Company Description (Optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Tell us about your company..." 
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

        <Button type="submit" className="w-full hover:scale-105 transition-transform duration-200">Register as Industry</Button>
      </form>
    </Form>
  );
}
