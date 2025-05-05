
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Building, IndianRupee } from "lucide-react";

const paymentSchema = z.object({
  hourlyRate: z.string().min(1, { message: "Hourly rate is required" }),
  dailyRate: z.string().min(1, { message: "Daily rate is required" }),
  currency: z.string().min(1, { message: "Currency is required" }),
  invoicingPreference: z.string().min(1, { message: "Invoicing preference is required" }),
  taxInformation: z.string().optional(),
  bankName: z.string().min(1, { message: "Bank name is required" }),
  accountNumber: z.string().min(1, { message: "Account number is required" }),
  ifscCode: z.string().min(1, { message: "IFSC code is required" }),
  paymentNotes: z.string().optional(),
});

const PaymentSettingsForm = () => {
  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      hourlyRate: "625",
      dailyRate: "5000",
      currency: "INR",
      invoicingPreference: "project-completion",
      taxInformation: "GST: 29AADCK9687N1ZX",
      bankName: "HDFC Bank",
      accountNumber: "12345678901234",
      ifscCode: "HDFC0001234",
      paymentNotes: "Please include project reference number in payment description",
    },
  });

  function onSubmit(values: z.infer<typeof paymentSchema>) {
    console.log(values);
    // In a real application, you would save this data to a database
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Payment Settings</CardTitle>
        <CardDescription>
          Configure your payment rates and banking details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="rates">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="rates" className="flex items-center gap-2">
              <IndianRupee size={14} /> Rates & Invoicing
            </TabsTrigger>
            <TabsTrigger value="banking" className="flex items-center gap-2">
              <Building size={14} /> Banking Details
            </TabsTrigger>
          </TabsList>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <TabsContent value="rates">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="hourlyRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hourly Rate</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <IndianRupee size={16} className="text-gray-500" />
                              </div>
                              <Input className="pl-8" placeholder="0" {...field} />
                            </div>
                          </FormControl>
                          <FormDescription>Your rate per hour of work</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dailyRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Daily Rate</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <IndianRupee size={16} className="text-gray-500" />
                              </div>
                              <Input className="pl-8" placeholder="0" {...field} />
                            </div>
                          </FormControl>
                          <FormDescription>Your rate per day of work</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="currency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Currency</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select currency" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                              <SelectItem value="USD">US Dollar ($)</SelectItem>
                              <SelectItem value="EUR">Euro (€)</SelectItem>
                              <SelectItem value="GBP">British Pound (£)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="invoicingPreference"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Invoicing Preference</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="weekly" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Weekly invoicing
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="biweekly" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Bi-weekly invoicing
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="monthly" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Monthly invoicing
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="project-completion" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Upon project completion
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="taxInformation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tax Information (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. GST Number" {...field} />
                        </FormControl>
                        <FormDescription>
                          Provide your GST/PAN/other tax identification details
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value="banking">
                <div className="space-y-6">
                  <div className="bg-gray-50 border rounded-md p-4 mb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <CreditCard className="text-purple-600" />
                      <h3 className="text-base font-medium text-gray-800">Banking Information</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      This information will be used to process payments for your completed projects. 
                      Please ensure all details are accurate and up-to-date.
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="bankName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="accountNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Number</FormLabel>
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="ifscCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>IFSC Code</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="paymentNotes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Notes (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Any special instructions for payment processing"
                            className="min-h-24"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <div className="flex justify-end space-x-4 pt-4">
                <Button variant="outline" type="button">Cancel</Button>
                <Button type="submit">Save Payment Settings</Button>
              </div>
            </form>
          </Form>
        </Tabs>
      </CardContent>
    </>
  );
};

export default PaymentSettingsForm;
