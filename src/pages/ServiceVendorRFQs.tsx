
import React, { useState } from "react";
import VendorHeader from "@/components/vendor/VendorHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Calendar, DollarSign, Clock, Eye, Send, FileText } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RFQDetailsModal } from "@/components/vendor/service/modals/RFQDetailsModal";
import { ProposalCreationModal } from "@/components/vendor/service/modals/ProposalCreationModal";

const ServiceVendorRFQs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRFQ, setSelectedRFQ] = useState<any>(null);
  const [showRFQDetails, setShowRFQDetails] = useState(false);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [proposalRFQTitle, setProposalRFQTitle] = useState("");

  // Industrial RFQ data
  const rfqs = [
    {
      id: "RFQ-001",
      title: "Industrial Equipment Maintenance Contract",
      company: "SteelWorks Manufacturing",
      budget: "$45,000 - $65,000",
      deadline: "2024-01-25",
      status: "open",
      priority: "high",
      description: "Seeking comprehensive maintenance services for steel production equipment including preventive maintenance, emergency repairs, and equipment calibration.",
      skills: ["Equipment Maintenance", "Hydraulic Systems", "PLC Programming"],
      submittedDate: "2024-01-08",
      responses: 8
    },
    {
      id: "RFQ-002",
      title: "Safety Audit & Compliance Assessment",
      company: "ChemProcess Industries",
      budget: "$25,000 - $35,000",
      deadline: "2024-02-05",
      status: "pending",
      priority: "medium",
      description: "Complete safety audit for chemical processing facility including OSHA compliance assessment and safety management system implementation.",
      skills: ["Safety Auditing", "OSHA Standards", "Risk Assessment"],
      submittedDate: "2024-01-10",
      responses: 12
    },
    {
      id: "RFQ-003",
      title: "Automation System Upgrade",
      company: "AutoMfg Corporation",
      budget: "$85,000 - $120,000",
      deadline: "2024-02-15",
      status: "submitted",
      priority: "high",
      description: "Upgrade existing manufacturing line with modern PLC systems and SCADA implementation for automotive parts production facility.",
      skills: ["Industrial Automation", "SCADA Systems", "PLC Programming"],
      submittedDate: "2024-01-05",
      responses: 6
    },
    {
      id: "RFQ-004",
      title: "Quality Control System Implementation",
      company: "Pharmaceutical Corp",
      budget: "$55,000 - $75,000",
      deadline: "2024-01-30",
      status: "open",
      priority: "high",
      description: "Implementation of comprehensive quality control and testing systems for pharmaceutical manufacturing facility to meet FDA regulations.",
      skills: ["Quality Control", "FDA Compliance", "Testing Systems"],
      submittedDate: "2024-01-12",
      responses: 4
    },
    {
      id: "RFQ-005",
      title: "Production Line Optimization",
      company: "FoodTech Processing",
      budget: "$35,000 - $50,000",
      deadline: "2024-02-20",
      status: "open",
      priority: "medium",
      description: "Lean manufacturing implementation and process optimization for food processing production lines to improve efficiency and reduce waste.",
      skills: ["Lean Manufacturing", "Process Optimization", "Production Planning"],
      submittedDate: "2024-01-14",
      responses: 9
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-green-50 text-green-700 border-green-200";
      case "pending": return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "submitted": return "bg-blue-50 text-blue-700 border-blue-200";
      case "closed": return "bg-gray-50 text-gray-700 border-gray-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-50 text-red-700 border-red-200";
      case "medium": return "bg-orange-50 text-orange-700 border-orange-200";
      case "low": return "bg-green-50 text-green-700 border-green-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const handleViewDetails = (rfq: any) => {
    setSelectedRFQ(rfq);
    setShowRFQDetails(true);
  };

  const handleCreateProposal = (rfq: any) => {
    setProposalRFQTitle(rfq.title);
    setShowProposalModal(true);
  };

  const filteredRFQs = rfqs.filter(rfq => {
    const matchesSearch = rfq.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rfq.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = statusFilter === "all" || rfq.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <VendorHeader />
      
      <main className="pt-32 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6 mt-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Industrial RFQ Management</h1>
              <p className="text-gray-600 mt-1">Manage and respond to industrial service Request for Quotes</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
              <Send className="mr-2 h-4 w-4" />
              Submit Proposal
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total RFQs</p>
                    <p className="text-2xl font-bold text-gray-900">47</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
                    <Eye className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Open RFQs</p>
                    <p className="text-2xl font-bold text-gray-900">15</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-yellow-50 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-gray-900">8</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Win Rate</p>
                    <p className="text-2xl font-bold text-gray-900">74%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card className="bg-white border border-gray-100 shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Search industrial RFQs..." 
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="submitted">Submitted</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50">
                  <Filter className="mr-2 h-4 w-4" />
                  More Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* RFQ List */}
          <div className="space-y-4">
            {filteredRFQs.map((rfq) => (
              <Card key={rfq.id} className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{rfq.title}</h3>
                        <Badge className={`${getStatusColor(rfq.status)} font-semibold text-sm px-3 py-1`}>
                          {rfq.status}
                        </Badge>
                        <Badge className={`${getPriorityColor(rfq.priority)} font-semibold text-sm px-3 py-1`}>
                          {rfq.priority}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <DollarSign className="h-4 w-4 text-blue-600" />
                          <span className="font-semibold">{rfq.budget}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Calendar className="h-4 w-4 text-blue-600" />
                          <span>Due: <span className="font-semibold text-gray-900">{rfq.deadline}</span></span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Eye className="h-4 w-4 text-blue-600" />
                          <span><span className="font-semibold text-gray-900">{rfq.responses}</span> responses</span>
                        </div>
                        <div className="text-sm text-gray-700">
                          Company: <span className="font-semibold text-gray-900">{rfq.company}</span>
                        </div>
                      </div>

                      <p className="text-base text-gray-700 mb-3 leading-relaxed">{rfq.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {rfq.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200 text-sm px-3 py-1">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewDetails(rfq)} className="border-gray-200 text-gray-700 hover:bg-gray-50">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                      {rfq.status === "open" && (
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-medium" onClick={() => handleCreateProposal(rfq)}>
                          <Send className="mr-2 h-4 w-4" />
                          Submit Proposal
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Modals */}
      {selectedRFQ && (
        <RFQDetailsModal
          isOpen={showRFQDetails}
          onClose={() => setShowRFQDetails(false)}
          rfq={selectedRFQ}
        />
      )}

      <ProposalCreationModal
        isOpen={showProposalModal}
        onClose={() => setShowProposalModal(false)}
        rfqTitle={proposalRFQTitle}
      />
    </div>
  );
};

export default ServiceVendorRFQs;
