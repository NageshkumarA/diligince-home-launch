import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { format, differenceInDays } from 'date-fns';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PurchaseOrderStepIndicator from '@/components/purchase-order/PurchaseOrderStepIndicator';
import IndustryHeader from '@/components/industry/IndustryHeader';
import { ISO9001TermsSection } from '@/components/industry/workflow/ISO9001TermsSection';

// Define step type
export type POStepType = 1 | 2 | 3 | 4 | 5;

// Define the form schema
const formSchema = z.object({
  poNumber: z.string(),
  vendor: z.string().min(1, "Vendor is required"),
  projectTitle: z.string().min(3, "Project title must be at least 3 characters"),
  orderValue: z.coerce.number().min(1, "Order value is required"),
  taxPercentage: z.coerce.number().min(0, "Tax percentage cannot be negative"),
  totalValue: z.coerce.number(),
  startDate: z.date({
    required_error: "Start date is required"
  }),
  endDate: z.date({
    required_error: "End date is required"
  }).refine(data => data, {
    message: "End date is required"
  }),
  paymentTerms: z.string().min(1, "Payment terms are required"),
  specialInstructions: z.string().optional(),
  scopeOfWork: z.string().min(1, "Scope of work is required"),
  deliverables: z.array(z.object({
    id: z.string(),
    description: z.string().min(1, "Deliverable description is required")
  })),
  acceptanceCriteria: z.array(z.object({
    id: z.string(),
    description: z.string().min(1, "Acceptance criteria is required")
  }))
}).refine(data => data.endDate >= data.startDate, {
  message: "End date must be after start date",
  path: ["endDate"]
});
type FormValues = z.infer<typeof formSchema>;
const CreatePurchaseOrder: React.FC = () => {
  const {
    toast
  } = useToast();
  const [currentStep, setCurrentStep] = useState<POStepType>(3); // Start at step 3 (PO Details)
  const [selectedISOTerms, setSelectedISOTerms] = useState<string[]>([]);
  const [customISOTerms, setCustomISOTerms] = useState('');

  // Generate unique PO number
  const generatePONumber = () => {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `PO-${year}${month}-${random}`;
  };

  // Vendors list - in a real app this would come from API
  const vendors = [{
    id: "1",
    name: "Acme Industrial Supplies"
  }, {
    id: "2",
    name: "Tech Manufacturing Co."
  }, {
    id: "3",
    name: "Global Equipment Ltd."
  }];

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      poNumber: generatePONumber(),
      vendor: "",
      projectTitle: "Industrial Equipment Procurement",
      orderValue: 0,
      taxPercentage: 10,
      totalValue: 0,
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 30)),
      paymentTerms: "",
      specialInstructions: "",
      scopeOfWork: "",
      deliverables: [],
      acceptanceCriteria: []
    }
  });

  // Extract form values
  const orderValue = form.watch("orderValue");
  const taxPercentage = form.watch("taxPercentage");
  const startDate = form.watch("startDate");
  const endDate = form.watch("endDate");

  // Calculate total value and duration
  React.useEffect(() => {
    if (orderValue && taxPercentage) {
      const taxAmount = orderValue * (taxPercentage / 100);
      const total = orderValue + taxAmount;
      form.setValue("totalValue", total);
    }
  }, [orderValue, taxPercentage, form]);

  // Handle step navigation
  const handleStepClick = (step: POStepType) => {
    // In a real app, you might want to validate before allowing navigation
    setCurrentStep(step);
  };

  // Handle previous step
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1 as POStepType);
    }
  };

  // Handle next step
  const handleNext = () => {
    form.trigger();
    if (form.formState.isValid) {
      if (currentStep < 5) {
        setCurrentStep(prev => prev + 1 as POStepType);
      }
    } else {
      toast({
        title: "Validation Error",
        description: "Please check the form for errors.",
        variant: "destructive"
      });
    }
  };

  // Handle save as draft
  const handleSaveAsDraft = () => {
    toast({
      title: "Progress Saved",
      description: "Your purchase order has been saved as draft."
    });
  };

  // Handle adding a deliverable
  const handleAddDeliverable = () => {
    const deliverables = form.getValues("deliverables");
    form.setValue("deliverables", [...deliverables, {
      id: `del-${Date.now()}`,
      description: ""
    }]);
  };

  // Handle removing a deliverable
  const handleRemoveDeliverable = (id: string) => {
    const deliverables = form.getValues("deliverables");
    form.setValue("deliverables", deliverables.filter(del => del.id !== id));
  };

  // Handle adding acceptance criteria
  const handleAddCriteria = () => {
    const criteria = form.getValues("acceptanceCriteria");
    form.setValue("acceptanceCriteria", [...criteria, {
      id: `ac-${Date.now()}`,
      description: ""
    }]);
  };

  // Handle removing acceptance criteria
  const handleRemoveCriteria = (id: string) => {
    const criteria = form.getValues("acceptanceCriteria");
    form.setValue("acceptanceCriteria", criteria.filter(crit => crit.id !== id));
  };

  // Handle form submission
  const onSubmit = (data: FormValues) => {
    console.log("Form data:", data);
    console.log("ISO Terms:", selectedISOTerms);
    console.log("Custom Terms:", customISOTerms);
    handleNext();
  };

  // Calculate duration between dates
  const getDuration = () => {
    if (startDate && endDate) {
      return differenceInDays(endDate, startDate);
    }
    return 0;
  };
  return <div className="flex flex-col min-h-screen bg-gray-50">
      <IndustryHeader />
      
      <main className="flex-1 container max-w-7xl mx-auto px-4 py-8 pt-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Purchase Order</h1>
          <p className="text-gray-700 text-lg">Enterprise-grade purchase order management</p>
        </div>
        
        <div className="mb-10">
          <PurchaseOrderStepIndicator currentStep={currentStep} onStepClick={handleStepClick} />
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Panel - Purchase Order Details */}
              <div className="space-y-8">
                <Card className="bg-white border border-gray-100 shadow-sm">
                  <CardHeader className="border-b border-gray-100">
                    <CardTitle className="text-lg font-semibold text-gray-900">Purchase Order Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 p-6">
                    <FormField control={form.control} name="poNumber" render={({
                    field
                  }) => <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">PO Number*</FormLabel>
                        <FormControl>
                          <Input {...field} readOnly className="bg-gray-50 border-gray-200" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />
                    
                    <FormField control={form.control} name="vendor" render={({
                    field
                  }) => <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">Vendor*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="border-gray-200">
                              <SelectValue placeholder="Select vendor" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {vendors.map(vendor => <SelectItem key={vendor.id} value={vendor.id}>
                                {vendor.name}
                              </SelectItem>)}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>} />
                    
                    <FormField control={form.control} name="projectTitle" render={({
                    field
                  }) => <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">Project Title*</FormLabel>
                        <FormControl>
                          <Input {...field} className="border-gray-200" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField control={form.control} name="orderValue" render={({
                      field
                    }) => <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Order Value*</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                              <Input type="number" onChange={e => field.onChange(parseFloat(e.target.value) || 0)} className="pl-7 border-gray-200 bg-gray-50" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>} />
                      
                      <FormField control={form.control} name="taxPercentage" render={({
                      field
                    }) => <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Tax Percentage</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input type="number" onChange={e => field.onChange(parseFloat(e.target.value) || 0)} className="pr-7 border-gray-200 bg-gray-50" />
                              <span className="absolute right-3 top-2.5 text-gray-500">%</span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>} />
                    </div>
                    
                    <FormField control={form.control} name="totalValue" render={({
                    field
                  }) => <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">Total Value</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                            <Input readOnly value={field.value.toFixed(2)} className="pl-7 font-semibold border-blue-200 bg-gray-50" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField control={form.control} name="startDate" render={({
                      field
                    }) => <FormItem className="flex flex-col">
                          <FormLabel className="text-sm font-medium text-gray-700">Start Date*</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button variant={"outline"} className={cn("pl-3 text-left font-normal border-gray-200", !field.value && "text-gray-500")}>
                                  {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus className="pointer-events-auto p-3" />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>} />
                      
                      <FormField control={form.control} name="endDate" render={({
                      field
                    }) => <FormItem className="flex flex-col">
                          <FormLabel className="text-sm font-medium text-gray-700">End Date*</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button variant={"outline"} className={cn("pl-3 text-left font-normal border-gray-200", !field.value && "text-gray-500")}>
                                  {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus disabled={date => date < startDate} className="pointer-events-auto p-3" />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                          {startDate && endDate && <p className="text-sm text-gray-500 mt-1">
                              Duration: {getDuration()} day(s)
                            </p>}
                        </FormItem>} />
                    </div>
                    
                    <FormField control={form.control} name="paymentTerms" render={({
                    field
                  }) => <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">Payment Terms*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="border-gray-200">
                              <SelectValue placeholder="Select payment terms" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="100_advance">100% advance</SelectItem>
                            <SelectItem value="50_advance_50_completion">50% advance, 50% upon completion</SelectItem>
                            <SelectItem value="30_advance_70_completion">30% advance, 70% upon completion</SelectItem>
                            <SelectItem value="net_15">Net 15 days</SelectItem>
                            <SelectItem value="net_30">Net 30 days</SelectItem>
                            <SelectItem value="net_60">Net 60 days</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>} />
                    
                    <FormField control={form.control} name="specialInstructions" render={({
                    field
                  }) => <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">Special Instructions</FormLabel>
                        <FormControl>
                          <Textarea className="min-h-[100px] border-gray-200 bg-gray-50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />
                  </CardContent>
                </Card>
                
                <Card className="bg-white border border-gray-100 shadow-sm">
                  <CardHeader className="border-b border-gray-100">
                    <CardTitle className="text-lg font-semibold text-gray-900">Scope of Work</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 p-6">
                    <FormField control={form.control} name="scopeOfWork" render={({
                    field
                  }) => <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">Scope of Work*</FormLabel>
                        <FormControl>
                          <Textarea className="min-h-[200px] border-gray-200 bg-gray-50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />
                    
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium text-gray-900 text-lg">Deliverables</h3>
                        <Button type="button" size="sm" variant="outline" onClick={handleAddDeliverable} className="border-gray-200 bg-blue-700 hover:bg-blue-600 text-gray-50">
                          <Plus className="h-4 w-4 mr-1" /> Add Deliverable
                        </Button>
                      </div>
                      
                      <div className="space-y-3">
                        {form.getValues("deliverables").map((deliverable, index) => <div key={deliverable.id} className="flex gap-2">
                            <FormField control={form.control} name={`deliverables.${index}.description`} render={({
                          field
                        }) => <FormItem className="flex-1">
                                <FormControl>
                                  <Input {...field} placeholder="Enter deliverable description..." className="border-gray-200" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>} />
                            <Button type="button" size="sm" variant="outline" onClick={() => handleRemoveDeliverable(deliverable.id)} className="border-red-200 text-red-600 hover:bg-red-50">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>)}
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium text-gray-900 text-lg">Acceptance Criteria</h3>
                        <Button type="button" size="sm" variant="outline" onClick={handleAddCriteria} className="border-gray-200 text-gray-50 bg-blue-700 hover:bg-blue-600">
                          <Plus className="h-4 w-4 mr-1" /> Add Criteria
                        </Button>
                      </div>
                      
                      <div className="space-y-3">
                        {form.getValues("acceptanceCriteria").map((criteria, index) => <div key={criteria.id} className="flex gap-2">
                            <FormField control={form.control} name={`acceptanceCriteria.${index}.description`} render={({
                          field
                        }) => <FormItem className="flex-1">
                                <FormControl>
                                  <Input {...field} placeholder="Enter acceptance criteria..." className="border-gray-200" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>} />
                            <Button type="button" size="sm" variant="outline" onClick={() => handleRemoveCriteria(criteria.id)} className="border-red-200 text-red-600 hover:bg-red-50">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Right Panel - ISO 9001 Terms */}
              <div>
                <ISO9001TermsSection selectedTerms={selectedISOTerms} onTermsChange={setSelectedISOTerms} customTerms={customISOTerms} onCustomTermsChange={setCustomISOTerms} />
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-between items-center">
              <Button type="button" variant="outline" onClick={handleSaveAsDraft} className="border-gray-200 bg-blue-700 hover:bg-blue-600 text-gray-50">
                Save as Draft
              </Button>
              
              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={handlePrevious} disabled={currentStep === 1} className="border-gray-200 text-gray-50 bg-blue-700 hover:bg-blue-600">
                  Previous
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
                  {currentStep === 5 ? "Create Purchase Order" : "Next"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </main>
    </div>;
};
export default CreatePurchaseOrder;