
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Truck, Package, RotateCcw, Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const shippingSchema = z.object({
  shippingMethods: z.array(z.string()).min(1, { message: "At least one shipping method is required" }),
  deliveryTimeLocal: z.string().min(1, { message: "Local delivery time is required" }),
  deliveryTimeNational: z.string().min(1, { message: "National delivery time is required" }),
  deliveryTimeInternational: z.string().optional(),
  shippingCostModel: z.string().min(1, { message: "Shipping cost model is required" }),
  freeShippingThreshold: z.string().optional(),
  specialHandling: z.string().optional(),
});

const returnsSchema = z.object({
  returnPeriod: z.string().min(1, { message: "Return period is required" }),
  returnConditions: z.string().min(1, { message: "Return conditions are required" }),
  warrantyPeriod: z.string().min(1, { message: "Warranty period is required" }),
  warrantyDescription: z.string().min(1, { message: "Warranty description is required" }),
  replacementProcess: z.string().min(1, { message: "Replacement process is required" }),
  returnShippingResponsibility: z.string().min(1, { message: "Return shipping responsibility is required" }),
});

const ShippingReturnsSection = () => {
  const [activeTab, setActiveTab] = useState("shipping");
  const [isShippingLoading, setIsShippingLoading] = useState(false);
  const [isReturnsLoading, setIsReturnsLoading] = useState(false);
  
  const shippingForm = useForm<z.infer<typeof shippingSchema>>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      shippingMethods: [],
      deliveryTimeLocal: "",
      deliveryTimeNational: "",
      deliveryTimeInternational: "",
      shippingCostModel: "",
      freeShippingThreshold: "",
      specialHandling: "",
    },
  });

  const returnsForm = useForm<z.infer<typeof returnsSchema>>({
    resolver: zodResolver(returnsSchema),
    defaultValues: {
      returnPeriod: "",
      returnConditions: "",
      warrantyPeriod: "",
      warrantyDescription: "",
      replacementProcess: "",
      returnShippingResponsibility: "",
    },
  });

  const onShippingSubmit = (values: z.infer<typeof shippingSchema>) => {
    setIsShippingLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Shipping values:", values);
      setIsShippingLoading(false);
      toast.success("Shipping policy saved successfully!");
    }, 1000);
  };

  const onReturnsSubmit = (values: z.infer<typeof returnsSchema>) => {
    setIsReturnsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Returns values:", values);
      setIsReturnsLoading(false);
      toast.success("Returns policy saved successfully!");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800">Shipping & Returns Policies</CardTitle>
          <CardDescription>
            Define how you handle shipping, returns, warranties and replacements.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 w-full max-w-md mb-6">
              <TabsTrigger value="shipping" className="flex items-center gap-2">
                <Truck size={16} />
                <span>Shipping Policy</span>
              </TabsTrigger>
              <TabsTrigger value="returns" className="flex items-center gap-2">
                <RotateCcw size={16} />
                <span>Returns & Warranty</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="shipping" className="space-y-6">
              <Form {...shippingForm}>
                <form onSubmit={shippingForm.handleSubmit(onShippingSubmit)} className="space-y-6">
                  <FormField
                    control={shippingForm.control}
                    name="shippingMethods"
                    render={({ field }) => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-base">Shipping Methods Offered</FormLabel>
                          <FormDescription>
                            Select all shipping methods your company offers
                          </FormDescription>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes("standard")}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, "standard"])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== "standard"
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Standard Shipping
                            </FormLabel>
                          </FormItem>
                          
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes("express")}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, "express"])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== "express"
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Express Shipping
                            </FormLabel>
                          </FormItem>
                          
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes("sameDay")}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, "sameDay"])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== "sameDay"
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Same-Day Delivery (Select Areas)
                            </FormLabel>
                          </FormItem>
                          
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes("international")}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, "international"])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== "international"
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              International Shipping
                            </FormLabel>
                          </FormItem>
                          
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes("freight")}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, "freight"])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== "freight"
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Freight Shipping (Heavy Items)
                            </FormLabel>
                          </FormItem>
                          
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes("pickup")}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, "pickup"])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== "pickup"
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Store/Warehouse Pickup
                            </FormLabel>
                          </FormItem>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Estimated Delivery Times</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={shippingForm.control}
                        name="deliveryTimeLocal"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Local Delivery (days)</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="e.g., 1-2" className="pl-10" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={shippingForm.control}
                        name="deliveryTimeNational"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>National Delivery (days)</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="e.g., 3-5" className="pl-10" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={shippingForm.control}
                        name="deliveryTimeInternational"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>International Delivery (days)</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="e.g., 7-14" className="pl-10" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <FormField
                    control={shippingForm.control}
                    name="shippingCostModel"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Shipping Cost Calculation Model</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="flat" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Flat Rate - Fixed shipping cost for all orders
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="weight" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Weight-Based - Shipping cost varies by product weight
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="order" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Order Value - Shipping cost based on total order value
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="location" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Location-Based - Shipping cost varies by delivery location
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="custom" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Custom Quote - Shipping cost provided via quote for each order
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={shippingForm.control}
                    name="freeShippingThreshold"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Free Shipping Threshold (₹)</FormLabel>
                        <FormDescription>
                          Set a minimum order value for free shipping (leave blank if not offered)
                        </FormDescription>
                        <FormControl>
                          <Input 
                            placeholder="e.g., 10000" 
                            type="number"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={shippingForm.control}
                    name="specialHandling"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Special Handling Requirements</FormLabel>
                        <FormDescription>
                          Describe any special handling requirements for your products
                        </FormDescription>
                        <FormControl>
                          <Textarea 
                            placeholder="e.g., Temperature-controlled shipping, hazardous materials handling, etc."
                            className="min-h-24"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <CardFooter className="flex justify-end gap-2 pt-2 px-0">
                    <Button variant="outline" type="button">
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-yellow-600 hover:bg-yellow-700" 
                      disabled={isShippingLoading}
                    >
                      {isShippingLoading ? "Saving..." : "Save Shipping Policy"}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </TabsContent>
            
            <TabsContent value="returns" className="space-y-6">
              <Form {...returnsForm}>
                <form onSubmit={returnsForm.handleSubmit(onReturnsSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={returnsForm.control}
                      name="returnPeriod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Return Period (days)</FormLabel>
                          <FormDescription>
                            How many days do customers have to return products?
                          </FormDescription>
                          <FormControl>
                            <Input 
                              placeholder="e.g., 30" 
                              type="number"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={returnsForm.control}
                      name="warrantyPeriod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Warranty Period</FormLabel>
                          <FormDescription>
                            Standard warranty period for your products
                          </FormDescription>
                          <FormControl>
                            <Input 
                              placeholder="e.g., 1 year" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={returnsForm.control}
                    name="returnConditions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Return Conditions</FormLabel>
                        <FormDescription>
                          Specify conditions under which products can be returned
                        </FormDescription>
                        <FormControl>
                          <Textarea 
                            placeholder="e.g., Products must be unused, in original packaging, with all accessories and documentation."
                            className="min-h-24"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={returnsForm.control}
                    name="warrantyDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Warranty Description</FormLabel>
                        <FormDescription>
                          Describe what is covered under your warranty
                        </FormDescription>
                        <FormControl>
                          <Textarea 
                            placeholder="e.g., Our warranty covers manufacturing defects and malfunctions. It does not cover damage from misuse, accidents, or normal wear and tear."
                            className="min-h-24"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={returnsForm.control}
                    name="replacementProcess"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Replacement Process</FormLabel>
                        <FormDescription>
                          Describe your process for handling product replacements
                        </FormDescription>
                        <FormControl>
                          <Textarea 
                            placeholder="e.g., Customer initiates a replacement request through our portal. Once approved, we ship a replacement and provide a return label for the defective item."
                            className="min-h-24"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={returnsForm.control}
                    name="returnShippingResponsibility"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Return Shipping Responsibility</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="customer" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Customer pays for return shipping
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="vendor" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Vendor pays for return shipping
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="conditional" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Vendor pays only if product is defective/warranty claim
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <CardFooter className="flex justify-end gap-2 pt-2 px-0">
                    <Button variant="outline" type="button">
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-yellow-600 hover:bg-yellow-700" 
                      disabled={isReturnsLoading}
                    >
                      {isReturnsLoading ? "Saving..." : "Save Returns Policy"}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShippingReturnsSection;
