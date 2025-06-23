
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import VendorHeader from "@/components/vendor/VendorHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Search, Filter, FileText, Clock, CheckCircle, AlertCircle, Eye, Send, Package } from "lucide-react";
import { toast } from "sonner";

// Mock RFQ data for product vendors
const mockRFQs = [
  {
    id: 1,
    title: "Industrial Valves Procurement",
    company: "Chem Industries",
    budget: "₹5,50,000",
    quantity: "25 units",
    deadline: "2024-05-20",
    status: "open",
    priority: "high",
    category: "Industrial Equipment",
    description: "We need high-quality industrial valves for our chemical processing plant. Must comply with API 6D standards.",
    specifications: ["Size: 4-inch to 12-inch", "Material: Stainless Steel 316", "Pressure Rating: 150 PSI", "API 6D Certified"],
    submittedDate: "2024-05-05",
    responseDeadline: "2024-05-18"
  },
  {
    id: 2,
    title: "Electrical Components Bulk Order",
    company: "Power Gen Co.",
    budget: "₹8,75,000",
    quantity: "200 units",
    deadline: "2024-05-25",
    status: "responded",
    priority: "medium",
    category: "Electrical Components",
    description: "Bulk procurement of electrical components including switches, circuit breakers, and control panels.",
    specifications: ["Voltage Rating: 415V", "Current Rating: 100A", "IP65 Protection", "CE Certified"],
    submittedDate: "2024-05-03",
    responseDeadline: "2024-05-20"
  },
  {
    id: 3,
    title: "Safety Equipment Package",
    company: "Steel Plant Ltd.",
    budget: "₹3,25,000",
    quantity: "50 sets",
    deadline: "2024-05-30",
    status: "awarded",
    priority: "low",
    category: "Safety Equipment",
    description: "Complete safety equipment package for steel plant workers including helmets, gloves, and protective gear.",
    specifications: ["ISI Marked", "Heat Resistant", "Anti-slip soles", "High visibility"],
    submittedDate: "2024-04-28",
    responseDeadline: "2024-05-15"
  }
];

const ProductVendorRFQs = () => {
  const [rfqs, setRfqs] = useState(mockRFQs);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRFQ, setSelectedRFQ] = useState<any>(null);
  const [quotationData, setQuotationData] = useState({
    unitPrice: "",
    totalPrice: "",
    deliveryTime: "",
    specifications: "",
    terms: ""
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-green-100 text-green-800";
      case "responded": return "bg-blue-100 text-blue-800";
      case "awarded": return "bg-yellow-100 text-yellow-800";
      case "closed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open": return <Clock className="w-4 h-4" />;
      case "responded": return <CheckCircle className="w-4 h-4" />;
      case "awarded": return <AlertCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const filteredRFQs = rfqs.filter(rfq => {
    if (statusFilter !== "all" && rfq.status !== statusFilter) return false;
    if (searchTerm && !rfq.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !rfq.company.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const handleSubmitQuotation = () => {
    if (selectedRFQ && quotationData.unitPrice && quotationData.totalPrice) {
      // Update RFQ status
      setRfqs(prev => prev.map(rfq => 
        rfq.id === selectedRFQ.id 
          ? { ...rfq, status: "responded" }
          : rfq
      ));
      
      // Reset form
      setQuotationData({
        unitPrice: "",
        totalPrice: "",
        deliveryTime: "",
        specifications: "",
        terms: ""
      });
      
      toast.success("Quotation submitted successfully!");
      setSelectedRFQ(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>RFQs | Product Vendor Dashboard</title>
      </Helmet>
      
      <VendorHeader />
      
      <main className="pt-32 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6 mt-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Request for Quotations</h1>
              <p className="text-gray-600">Manage product procurement requests and submit quotations</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800">
                {filteredRFQs.filter(rfq => rfq.status === "open").length} Open RFQs
              </Badge>
            </div>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search RFQs by title or company..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="responded">Responded</SelectItem>
                    <SelectItem value="awarded">Awarded</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* RFQs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRFQs.map((rfq) => (
              <Card key={rfq.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg text-gray-900 mb-2">{rfq.title}</CardTitle>
                      <p className="text-sm text-gray-600 mb-2">{rfq.company}</p>
                    </div>
                    <Badge className={getPriorityColor(rfq.priority)}>
                      {rfq.priority}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(rfq.status)}>
                      {getStatusIcon(rfq.status)}
                      <span className="ml-1 capitalize">{rfq.status}</span>
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {rfq.category}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Budget:</span>
                      <p className="font-medium text-yellow-600">{rfq.budget}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Quantity:</span>
                      <p className="font-medium">{rfq.quantity}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Deadline:</span>
                      <p className="font-medium">{rfq.deadline}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Response by:</span>
                      <p className="font-medium text-red-600">{rfq.responseDeadline}</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-2">{rfq.description}</p>
                  
                  <div className="flex gap-2 pt-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{rfq.title}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium text-gray-500">Company</label>
                              <p>{rfq.company}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-500">Budget</label>
                              <p className="text-yellow-600 font-medium">{rfq.budget}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-500">Quantity</label>
                              <p>{rfq.quantity}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-500">Deadline</label>
                              <p>{rfq.deadline}</p>
                            </div>
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium text-gray-500">Description</label>
                            <p className="mt-1">{rfq.description}</p>
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium text-gray-500">Specifications</label>
                            <ul className="mt-1 list-disc list-inside space-y-1">
                              {rfq.specifications.map((spec, index) => (
                                <li key={index} className="text-sm">{spec}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    {rfq.status === "open" && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            className="flex-1 bg-yellow-600 hover:bg-yellow-700"
                            onClick={() => setSelectedRFQ(rfq)}
                          >
                            <Send className="w-4 h-4 mr-2" />
                            Submit Quote
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Submit Quotation - {rfq.title}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">Unit Price (₹)</label>
                                <Input
                                  placeholder="Enter unit price"
                                  value={quotationData.unitPrice}
                                  onChange={(e) => setQuotationData(prev => ({...prev, unitPrice: e.target.value}))}
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium">Total Price (₹)</label>
                                <Input
                                  placeholder="Enter total price"
                                  value={quotationData.totalPrice}
                                  onChange={(e) => setQuotationData(prev => ({...prev, totalPrice: e.target.value}))}
                                />
                              </div>
                            </div>
                            
                            <div>
                              <label className="text-sm font-medium">Delivery Time</label>
                              <Input
                                placeholder="e.g., 2-3 weeks"
                                value={quotationData.deliveryTime}
                                onChange={(e) => setQuotationData(prev => ({...prev, deliveryTime: e.target.value}))}
                              />
                            </div>
                            
                            <div>
                              <label className="text-sm font-medium">Product Specifications</label>
                              <Textarea
                                placeholder="Describe your product specifications and compliance"
                                value={quotationData.specifications}
                                onChange={(e) => setQuotationData(prev => ({...prev, specifications: e.target.value}))}
                                rows={3}
                              />
                            </div>
                            
                            <div>
                              <label className="text-sm font-medium">Terms & Conditions</label>
                              <Textarea
                                placeholder="Payment terms, warranty, delivery conditions, etc."
                                value={quotationData.terms}
                                onChange={(e) => setQuotationData(prev => ({...prev, terms: e.target.value}))}
                                rows={3}
                              />
                            </div>
                            
                            <div className="flex justify-end space-x-2">
                              <Button variant="outline">Save Draft</Button>
                              <Button 
                                onClick={handleSubmitQuotation}
                                className="bg-yellow-600 hover:bg-yellow-700"
                              >
                                <Package className="w-4 h-4 mr-2" />
                                Submit Quotation
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredRFQs.length === 0 && (
            <Card className="p-8">
              <div className="text-center">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No RFQs Found</h3>
                <p className="text-gray-500">
                  {searchTerm || statusFilter !== "all" 
                    ? "Try adjusting your search or filter criteria" 
                    : "New product procurement requests will appear here"}
                </p>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProductVendorRFQs;
