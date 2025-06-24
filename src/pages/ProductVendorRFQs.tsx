
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
import { Search, FileText, MapPin, Calendar, Package, Clock, Send, Eye } from "lucide-react";
import { toast } from "sonner";

// Mock RFQ data
const mockRFQs = [
  {
    id: 1,
    title: "Boiler Spare Parts Package",
    company: "Steel Plant Ltd.",
    description: "Complete spare parts package for boiler maintenance including valves, gaskets, and control components",
    budget: "₹450,000",
    deadline: "2024-05-15",
    postedDate: "2024-05-01",
    items: 12,
    priority: "urgent",
    status: "open",
    location: "Mumbai, Maharashtra",
    requirements: "API 6D certified components required",
    delivery: "Urgent (7 days)"
  },
  {
    id: 2,
    title: "Control Panel Components",
    company: "Power Gen Co.",
    description: "Various components for control panel assembly including circuit breakers, contactors, and PLCs",
    budget: "₹320,000",
    deadline: "2024-05-20",
    postedDate: "2024-04-28",
    items: 8,
    priority: "medium",
    status: "open",
    location: "Pune, Maharashtra",
    requirements: "CE certified components preferred",
    delivery: "Standard (15 days)"
  },
  {
    id: 3,
    title: "Safety Equipment Bulk Order",
    company: "Chemical Industries",
    description: "Bulk order for safety equipment including helmets, gloves, goggles, and safety shoes",
    budget: "₹180,000",
    deadline: "2024-05-25",
    postedDate: "2024-05-05",
    items: 500,
    priority: "low",
    status: "open",
    location: "Chennai, Tamil Nadu",
    requirements: "ISI marked products only",
    delivery: "Standard (10 days)"
  }
];

const ProductVendorRFQs = () => {
  const [rfqs, setRfqs] = useState(mockRFQs);
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedRFQ, setSelectedRFQ] = useState<any>(null);
  const [quotationText, setQuotationText] = useState("");
  const [quotedPrice, setQuotedPrice] = useState("");

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredRFQs = rfqs.filter(rfq => {
    if (priorityFilter !== "all" && rfq.priority !== priorityFilter) return false;
    if (searchTerm && !rfq.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !rfq.company.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const submitQuotation = () => {
    if (!quotedPrice || !quotationText) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("Quotation submitted successfully!");
    setQuotationText("");
    setQuotedPrice("");
    setSelectedRFQ(null);
  };

  const rfqStats = {
    total: rfqs.length,
    urgent: rfqs.filter(r => r.priority === "urgent").length,
    medium: rfqs.filter(r => r.priority === "medium").length,
    low: rfqs.filter(r => r.priority === "low").length
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
              <h1 className="text-2xl font-bold text-gray-900">Request for Quotations</h1>
              <p className="text-gray-600">Browse and respond to RFQs from potential clients</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-red-100 text-red-800">
                {rfqStats.urgent} Urgent
              </Badge>
              <Badge className="bg-yellow-100 text-yellow-800">
                {rfqStats.medium} Medium
              </Badge>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{rfqStats.total}</p>
                  <p className="text-sm text-gray-600">Total RFQs</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">{rfqStats.urgent}</p>
                  <p className="text-sm text-gray-600">Urgent</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-600">{rfqStats.medium}</p>
                  <p className="text-sm text-gray-600">Medium</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{rfqStats.low}</p>
                  <p className="text-sm text-gray-600">Low Priority</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="bg-white border border-gray-100 shadow-sm">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search RFQs by title or company..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-gray-200 focus:border-orange-300 focus:ring-orange-200"
                  />
                </div>
                
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-full md:w-[200px] border-gray-200 focus:border-orange-300 focus:ring-orange-200">
                    <SelectValue placeholder="Filter by priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* RFQs List */}
          <div className="space-y-4">
            {filteredRFQs.map((rfq) => (
              <Card key={rfq.id} className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-semibold text-gray-900">{rfq.title}</h3>
                        <Badge className={getPriorityColor(rfq.priority)}>
                          {rfq.priority}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Company:</span>
                          <p className="font-medium text-gray-900">{rfq.company}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Posted:</span>
                          <p className="font-medium text-gray-900">{rfq.postedDate}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Deadline:</span>
                          <p className="font-medium text-gray-900">{rfq.deadline}</p>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-700">{rfq.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {rfq.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Package className="w-3 h-3" />
                          {rfq.items} items
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {rfq.delivery}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {getDaysRemaining(rfq.deadline)} days left
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-gray-500 text-sm">Budget:</span>
                          <p className="text-xl font-bold text-orange-600">{rfq.budget}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 lg:w-auto w-full">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" onClick={() => setSelectedRFQ(rfq)} className="border-gray-200 hover:bg-gray-50">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>RFQ Details - {rfq.title}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-6">
                            <div>
                              <h4 className="font-semibold mb-2">Company Information</h4>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-500">Company:</span>
                                  <p className="font-medium">{rfq.company}</p>
                                </div>
                                <div>
                                  <span className="text-gray-500">Location:</span>
                                  <p className="font-medium">{rfq.location}</p>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold mb-2">Requirements</h4>
                              <p className="text-sm bg-blue-50 p-3 rounded">{rfq.description}</p>
                              <p className="text-sm text-gray-600 mt-2">{rfq.requirements}</p>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold mb-2">Submit Quotation</h4>
                              <div className="space-y-4">
                                <div>
                                  <label className="text-sm font-medium">Quoted Price *</label>
                                  <Input
                                    placeholder="Enter your quoted price"
                                    value={quotedPrice}
                                    onChange={(e) => setQuotedPrice(e.target.value)}
                                    className="border-gray-200 focus:border-orange-300 focus:ring-orange-200"
                                  />
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Additional Details *</label>
                                  <Textarea
                                    placeholder="Include delivery timeline, terms, and any additional information..."
                                    value={quotationText}
                                    onChange={(e) => setQuotationText(e.target.value)}
                                    rows={4}
                                    className="border-gray-200 focus:border-orange-300 focus:ring-orange-200"
                                  />
                                </div>
                                <div className="flex justify-end space-x-2">
                                  <Button variant="outline" className="border-gray-200 hover:bg-gray-50">Cancel</Button>
                                  <Button onClick={submitQuotation} className="bg-orange-600 hover:bg-orange-700 text-white">
                                    <Send className="w-4 h-4 mr-2" />
                                    Submit Quotation
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button onClick={() => setSelectedRFQ(rfq)} className="bg-orange-600 hover:bg-orange-700 text-white">
                            <Send className="w-4 h-4 mr-2" />
                            Quote Now
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Submit Quotation - {rfq.title}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium">Quoted Price *</label>
                              <Input
                                placeholder="Enter your quoted price"
                                value={quotedPrice}
                                onChange={(e) => setQuotedPrice(e.target.value)}
                                className="border-gray-200 focus:border-orange-300 focus:ring-orange-200"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Proposal Details *</label>
                              <Textarea
                                placeholder="Include delivery timeline, terms, specifications, and any additional information..."
                                value={quotationText}
                                onChange={(e) => setQuotationText(e.target.value)}
                                rows={6}
                                className="border-gray-200 focus:border-orange-300 focus:ring-orange-200"
                              />
                            </div>
                            <div className="flex justify-end space-x-2">
                              <Button variant="outline" className="border-gray-200 hover:bg-gray-50">Cancel</Button>
                              <Button onClick={submitQuotation} className="bg-orange-600 hover:bg-orange-700 text-white">
                                Submit Quotation
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredRFQs.length === 0 && (
            <Card className="bg-white border border-gray-100 shadow-sm p-8">
              <div className="text-center">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No RFQs Found</h3>
                <p className="text-gray-500">
                  {searchTerm || priorityFilter !== "all"
                    ? "Try adjusting your search or filter criteria"
                    : "New RFQs will appear here when clients post them"}
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
