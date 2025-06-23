
import React, { useState } from "react";
import VendorHeader from "@/components/vendor/VendorHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Calendar, DollarSign, Clock, Eye, Send, FileText } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ServiceVendorRFQs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock RFQ data
  const rfqs = [
    {
      id: "RFQ-001",
      title: "Digital Marketing Campaign for Tech Startup",
      company: "TechFlow Inc.",
      budget: "$15,000 - $25,000",
      deadline: "2024-01-15",
      status: "open",
      priority: "high",
      description: "Looking for comprehensive digital marketing services including SEO, content marketing, and social media management.",
      skills: ["Digital Marketing", "SEO", "Content Creation"],
      submittedDate: "2024-01-08",
      responses: 12
    },
    {
      id: "RFQ-002", 
      title: "Custom Software Development",
      company: "InnovateCore",
      budget: "$50,000 - $80,000",
      deadline: "2024-02-01",
      status: "pending",
      priority: "medium",
      description: "Need a team to develop a custom CRM solution with advanced reporting capabilities.",
      skills: ["Software Development", "Database Design", "API Integration"],
      submittedDate: "2024-01-10",
      responses: 8
    },
    {
      id: "RFQ-003",
      title: "Brand Identity & Website Design",
      company: "StartupXYZ",
      budget: "$8,000 - $12,000",
      deadline: "2024-01-20",
      status: "submitted",
      priority: "low",
      description: "Complete brand identity package including logo design, brand guidelines, and responsive website.",
      skills: ["Graphic Design", "Web Development", "Branding"],
      submittedDate: "2024-01-05",
      responses: 15
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-green-100 text-green-700";
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "submitted": return "bg-blue-100 text-blue-700";
      case "closed": return "bg-gray-100 text-gray-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-700";
      case "medium": return "bg-orange-100 text-orange-700";
      case "low": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <VendorHeader />
      
      <main className="pt-16 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">RFQ Management</h1>
              <p className="text-gray-600 mt-1">Manage and respond to Request for Quotes</p>
            </div>
            <Button className="bg-yellow-600 hover:bg-yellow-700">
              <Send className="mr-2 h-4 w-4" />
              Submit Proposal
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total RFQs</p>
                    <p className="text-2xl font-bold text-gray-900">24</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Eye className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Open RFQs</p>
                    <p className="text-2xl font-bold text-gray-900">8</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-gray-900">5</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <DollarSign className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Win Rate</p>
                    <p className="text-2xl font-bold text-gray-900">68%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Search RFQs..." 
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
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  More Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* RFQ List */}
          <div className="space-y-4">
            {rfqs.map((rfq) => (
              <Card key={rfq.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{rfq.title}</h3>
                        <Badge className={getStatusColor(rfq.status)}>
                          {rfq.status}
                        </Badge>
                        <Badge className={getPriorityColor(rfq.priority)}>
                          {rfq.priority}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <DollarSign className="h-4 w-4" />
                          <span>{rfq.budget}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>Due: {rfq.deadline}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Eye className="h-4 w-4" />
                          <span>{rfq.responses} responses</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Company: {rfq.company}
                        </div>
                      </div>

                      <p className="text-gray-600 mb-3">{rfq.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {rfq.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="bg-yellow-50 text-yellow-700">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                      {rfq.status === "open" && (
                        <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
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
    </div>
  );
};

export default ServiceVendorRFQs;
