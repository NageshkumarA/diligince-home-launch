
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { Check, Download, FileText, Star, X, ArrowLeft } from "lucide-react";

import IndustryHeader from "@/components/industry/IndustryHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { useUser } from "@/contexts/UserContext";

type DeliverableItem = {
  id: string;
  description: string;
  isCompleted: boolean;
};

type AcceptanceCriteria = {
  id: string;
  description: string;
  isVerified: boolean;
};

type RequiredDocument = {
  id: string;
  name: string;
  isUploaded: boolean;
  isVerified: boolean;
  uploadedDate?: string;
  verifiedDate?: string;
}

const WorkCompletionPayment = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useUser();
  
  const [viewingDocument, setViewingDocument] = useState<RequiredDocument | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [poData, setPoData] = useState<any>(null);
  
  // Form handling
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    defaultValues: {
      qualityRating: 0,
      timelinessRating: 0,
      communicationRating: 0,
      feedback: "",
    }
  });

  // Authentication check
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
      return;
    }
    
    if (user?.role !== 'industry') {
      toast({
        title: "Access Denied",
        description: "This page is only accessible to industry users.",
        variant: "destructive",
      });
      navigate('/');
      return;
    }
  }, [isAuthenticated, user, navigate, toast]);

  // Load PO data based on ID
  useEffect(() => {
    if (!id) {
      toast({
        title: "Error",
        description: "Purchase Order ID is required.",
        variant: "destructive",
      });
      navigate('/industry-dashboard');
      return;
    }

    // Simulate data loading
    const loadPoData = async () => {
      setIsLoading(true);
      
      // Mock data - in real app, this would be fetched from API
      const mockData = {
        poNumber: `PO-2302-${id}`,
        projectTitle: "Industrial Equipment Procurement",
        vendor: "Acme Industrial Supplies",
        vendorType: "Product Vendor",
        startDate: "2023-03-15",
        completionDate: "2023-04-20",
        totalValue: 28600,
        preTaxValue: 26000,
        taxPercentage: 10,
        taxAmount: 2600,
        paidAmount: 13000,
        balanceDue: 15600,
        paymentTerms: "50% advance, 50% upon completion",
        deliverables: [
          { id: "del-1", description: "Supply of industrial metal frames (10 units)", isCompleted: true },
          { id: "del-2", description: "Delivery to manufacturing facility", isCompleted: true },
          { id: "del-3", description: "Installation and configuration", isCompleted: false },
          { id: "del-4", description: "Technical training for staff", isCompleted: false }
        ] as DeliverableItem[],
        acceptanceCriteria: [
          { id: "ac-1", description: "All units meet ISO 9001 quality standards", isVerified: true },
          { id: "ac-2", description: "Installation completed within 7 working days", isVerified: true },
          { id: "ac-3", description: "Training materials provided in digital format", isVerified: false }
        ] as AcceptanceCriteria[],
        requiredDocuments: [
          { id: "doc-1", name: "Quality Certification", isUploaded: true, isVerified: true, uploadedDate: "2023-04-15", verifiedDate: "2023-04-17" },
          { id: "doc-2", name: "Installation Report", isUploaded: true, isVerified: false, uploadedDate: "2023-04-18" },
          { id: "doc-3", name: "Training Completion Report", isUploaded: false, isVerified: false }
        ] as RequiredDocument[]
      };

      // Simulate loading delay
      setTimeout(() => {
        setPoData(mockData);
        setDeliverables(mockData.deliverables);
        setCriteria(mockData.acceptanceCriteria);
        setDocuments(mockData.requiredDocuments);
        setIsLoading(false);
      }, 1000);
    };

    loadPoData();
  }, [id, navigate, toast]);

  // State for checkboxes
  const [deliverables, setDeliverables] = useState<DeliverableItem[]>([]);
  const [criteria, setCriteria] = useState<AcceptanceCriteria[]>([]);
  const [documents, setDocuments] = useState<RequiredDocument[]>([]);

  // Calculate if all deliverables and criteria are checked
  const allDeliverablesComplete = deliverables.every(item => item.isCompleted);
  const allCriteriaVerified = criteria.every(item => item.isVerified);
  const allDocumentsVerified = documents.every(doc => doc.isUploaded && doc.isVerified);
  const canProcessPayment = allDeliverablesComplete && allCriteriaVerified && allDocumentsVerified;

  // Handle checkbox changes
  const toggleDeliverable = (id: string) => {
    setDeliverables(prev => 
      prev.map(item => 
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  const toggleCriteria = (id: string) => {
    setCriteria(prev => 
      prev.map(item => 
        item.id === id ? { ...item, isVerified: !item.isVerified } : item
      )
    );
  };

  const verifyDocument = (id: string) => {
    setDocuments(prev => 
      prev.map(doc => 
        doc.id === id ? { ...doc, isVerified: true, verifiedDate: new Date().toISOString().split('T')[0] } : doc
      )
    );
    toast({
      title: "Document Verified",
      description: "The document has been successfully verified.",
    });
  };

  // Handle rating submission
  const onSubmitRating = (data: any) => {
    console.log("Rating submitted:", data);
    toast({
      title: "Rating Submitted",
      description: "Thank you for providing your feedback.",
    });
  };

  // Handle payment processing
  const processPayment = () => {
    console.log("Processing payment");
    setShowPaymentModal(false);
    toast({
      title: "Payment Processed",
      description: "The payment has been successfully processed.",
    });
    
    // Navigate back to dashboard after successful payment
    setTimeout(() => {
      navigate('/industry-dashboard');
    }, 2000);
  };

  // Star rating component
  const StarRating = ({ name, value, onChange }: { name: string, value: number, onChange: (val: number) => void }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`text-xl ${value >= star ? 'text-yellow-400' : 'text-gray-300'}`}
            onClick={() => onChange(star)}
          >
            <Star className="h-6 w-6" />
          </button>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Helmet>
          <title>Work Completion & Payment | Diligince.ai</title>
        </Helmet>
        
        <IndustryHeader />
        
        <main className="flex-1 container mx-auto px-4 py-8 pt-20">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading purchase order details...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!poData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Helmet>
          <title>Work Completion & Payment | Diligince.ai</title>
        </Helmet>
        
        <IndustryHeader />
        
        <main className="flex-1 container mx-auto px-4 py-8 pt-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Purchase Order Not Found</h1>
            <p className="text-gray-600 mb-6">The requested purchase order could not be found.</p>
            <Button onClick={() => navigate('/industry-dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Work Completion & Payment | Diligince.ai</title>
      </Helmet>
      
      <IndustryHeader />
      
      <main className="flex-1 container mx-auto px-4 py-8 pt-20">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/industry-dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/industry-dashboard">Purchase Orders</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Work Completion</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Work Completion & Payment</h1>
            <p className="text-gray-600">PO: {poData.poNumber} - {poData.projectTitle}</p>
          </div>
          <Button variant="outline" onClick={() => navigate('/industry-dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
        
        {/* Status Box */}
        <div className="bg-[#f6ffed] border border-[#b7eb8f] rounded-md p-4 flex items-center mb-8">
          <div className="bg-green-500 rounded-full p-1 mr-3">
            <Check className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-green-700">Work Completed - Pending Final Payment</h2>
            <p className="text-sm text-green-600">
              All work has been completed and is ready for your final review and payment.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Project Details & Completion Status */}
          <div className="space-y-8">
            {/* Project Details */}
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Project Title</TableCell>
                      <TableCell>{poData.projectTitle}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Vendor</TableCell>
                      <TableCell>{poData.vendor} ({poData.vendorType})</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Start Date</TableCell>
                      <TableCell>{poData.startDate}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Completion Date</TableCell>
                      <TableCell>{poData.completionDate}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Total Value</TableCell>
                      <TableCell>${poData.totalValue.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Payment Terms</TableCell>
                      <TableCell>{poData.paymentTerms}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            {/* Deliverables */}
            <Card>
              <CardHeader>
                <CardTitle>Deliverables Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deliverables.map((item) => (
                    <div key={item.id} className="flex items-start space-x-3">
                      <Checkbox
                        id={`deliverable-${item.id}`}
                        checked={item.isCompleted}
                        onCheckedChange={() => toggleDeliverable(item.id)}
                      />
                      <label 
                        htmlFor={`deliverable-${item.id}`}
                        className="text-sm leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {item.description}
                      </label>
                    </div>
                  ))}
                  
                  {!allDeliverablesComplete && (
                    <div className="mt-4 text-sm text-amber-600">
                      Please verify all deliverables are complete before processing payment.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Acceptance Criteria */}
            <Card>
              <CardHeader>
                <CardTitle>Acceptance Criteria Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {criteria.map((item) => (
                    <div key={item.id} className="flex items-start space-x-3">
                      <Checkbox
                        id={`criteria-${item.id}`}
                        checked={item.isVerified}
                        onCheckedChange={() => toggleCriteria(item.id)}
                      />
                      <label
                        htmlFor={`criteria-${item.id}`}
                        className="text-sm leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {item.description}
                      </label>
                    </div>
                  ))}
                  
                  {!allCriteriaVerified && (
                    <div className="mt-4 text-sm text-amber-600">
                      All acceptance criteria must be verified before final payment.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Required Documents */}
            <Card>
              <CardHeader>
                <CardTitle>Required Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documents.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium">{doc.name}</TableCell>
                        <TableCell>
                          {doc.isUploaded ? (
                            doc.isVerified ? (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <Check className="h-3 w-3 mr-1" /> Verified
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                Pending Verification
                              </span>
                            )
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              <X className="h-3 w-3 mr-1" /> Missing
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-sm">
                          {doc.isUploaded ? `Uploaded ${doc.uploadedDate}` : "Not Uploaded"}
                          {doc.isVerified && doc.verifiedDate && <div>Verified {doc.verifiedDate}</div>}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {doc.isUploaded && (
                              <>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => setViewingDocument(doc)}
                                >
                                  <FileText className="h-4 w-4 mr-1" /> View
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                >
                                  <Download className="h-4 w-4 mr-1" /> Download
                                </Button>
                              </>
                            )}
                            {doc.isUploaded && !doc.isVerified && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => verifyDocument(doc.id)}
                              >
                                <Check className="h-4 w-4 mr-1" /> Verify
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {!allDocumentsVerified && (
                  <div className="mt-4 text-sm text-amber-600">
                    All required documents must be uploaded and verified before final payment.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Right Side - Payment & Rating */}
          <div className="space-y-8">
            {/* Payment Summary */}
            <Card className="border-blue-200">
              <CardHeader className="bg-blue-50 border-b border-blue-200">
                <CardTitle>Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Project Value</TableCell>
                      <TableCell className="text-right">${poData.preTaxValue.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Tax ({poData.taxPercentage}%)</TableCell>
                      <TableCell className="text-right">${poData.taxAmount.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Total Amount</TableCell>
                      <TableCell className="text-right font-semibold">${poData.totalValue.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Previously Paid</TableCell>
                      <TableCell className="text-right">${poData.paidAmount.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-lg">Balance Due</TableCell>
                      <TableCell className="text-right font-bold text-lg text-blue-600">${poData.balanceDue.toLocaleString()}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                
                <div className="mt-8 flex items-start space-x-3 py-4 border-t border-dashed border-gray-200">
                  <Checkbox id="invoice-received" />
                  <label
                    htmlFor="invoice-received"
                    className="text-sm leading-tight"
                  >
                    I confirm that I have received the invoice for this order and the details match the payment summary above.
                  </label>
                </div>
                
                <Button 
                  className="w-full mt-6" 
                  size="lg"
                  disabled={!canProcessPayment}
                  onClick={() => setShowPaymentModal(true)}
                >
                  Process Final Payment (${poData.balanceDue.toLocaleString()})
                </Button>
                
                {!canProcessPayment && (
                  <p className="mt-2 text-sm text-center text-red-500">
                    Please complete all verification steps before processing payment
                  </p>
                )}
              </CardContent>
            </Card>
            
            {/* Rating & Feedback */}
            <Card>
              <CardHeader>
                <CardTitle>Rate Vendor Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmitRating)} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium block mb-2">Quality of Work</label>
                      <StarRating
                        name="qualityRating"
                        value={watch("qualityRating")}
                        onChange={(val) => setValue("qualityRating", val)}
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium block mb-2">Timeliness</label>
                      <StarRating
                        name="timelinessRating"
                        value={watch("timelinessRating")}
                        onChange={(val) => setValue("timelinessRating", val)}
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium block mb-2">Communication</label>
                      <StarRating
                        name="communicationRating"
                        value={watch("communicationRating")}
                        onChange={(val) => setValue("communicationRating", val)}
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium block mb-2">
                        Additional Feedback (Optional)
                      </label>
                      <Textarea
                        placeholder="Please provide any additional feedback about your experience with this vendor..."
                        className="min-h-[120px]"
                        {...register("feedback")}
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" variant="outline" className="w-full">
                    Submit Rating & Feedback
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      {/* Document Preview Dialog */}
      <Dialog open={!!viewingDocument} onOpenChange={(open) => !open && setViewingDocument(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{viewingDocument?.name}</DialogTitle>
          </DialogHeader>
          <div className="min-h-[400px] bg-gray-50 border rounded-md flex items-center justify-center p-8">
            <div className="text-center">
              <FileText className="h-12 w-12 mx-auto text-gray-400 mb-2" />
              <p className="text-gray-500">Document preview would be displayed here</p>
              <p className="text-xs text-gray-400 mt-2">Uploaded on {viewingDocument?.uploadedDate}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Payment Confirmation Dialog */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Payment</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-4">You are about to process the final payment of:</p>
            <p className="text-2xl font-bold text-center mb-6">${poData.balanceDue.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mb-6">
              This action will mark the purchase order as complete and release the final payment to the vendor.
            </p>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowPaymentModal(false)}>
                Cancel
              </Button>
              <Button onClick={processPayment}>
                Confirm Payment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorkCompletionPayment;
