
import React, { useState } from "react";
import { LogisticsVendorHeader } from "@/components/vendor/LogisticsVendorHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Package, Truck, Clock, DollarSign, Filter, Search } from "lucide-react";

const LogisticsVendorRequests = () => {
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const requests = [
    {
      id: "REQ-001",
      client: "Steel Industries Ltd.",
      type: "Heavy Machinery Transport",
      description: "Transport of 50-ton industrial press from Mumbai to Chennai",
      pickup: "Mumbai, Maharashtra",
      delivery: "Chennai, Tamil Nadu",
      deadline: "2025-01-15",
      budget: "₹2,50,000",
      priority: "high",
      status: "open",
      weight: "50 tons",
      dimensions: "6m x 3m x 2.5m"
    },
    {
      id: "REQ-002",
      client: "Chemical Corp",
      type: "Hazardous Materials",
      description: "Transport of chemical tanks with proper safety protocols",
      pickup: "Gujarat Industrial Estate",
      delivery: "Bangalore Tech Park",
      deadline: "2025-01-20",
      budget: "₹1,80,000",
      priority: "urgent",
      status: "open",
      weight: "25 tons",
      dimensions: "4m x 2m x 2m"
    },
    {
      id: "REQ-003",
      client: "Power Generation Co.",
      type: "Turbine Components",
      description: "Transport of wind turbine blades and components",
      pickup: "Pune Manufacturing Unit",
      delivery: "Rajasthan Wind Farm",
      deadline: "2025-01-25",
      budget: "₹3,20,000",
      priority: "medium",
      status: "quoted",
      weight: "35 tons",
      dimensions: "15m x 3m x 2m"
    },
    {
      id: "REQ-004",
      client: "Auto Manufacturing",
      type: "Factory Relocation",
      description: "Complete factory equipment relocation project",
      pickup: "Delhi Manufacturing Hub",
      delivery: "Haryana Industrial Zone",
      deadline: "2025-02-01",
      budget: "₹8,50,000",
      priority: "medium",
      status: "open",
      weight: "200 tons",
      dimensions: "Multiple units"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-red-100 text-red-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      default: return "bg-green-100 text-green-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-blue-100 text-blue-800";
      case "quoted": return "bg-purple-100 text-purple-800";
      case "awarded": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || request.type.toLowerCase().includes(filterType.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <LogisticsVendorHeader />
      
      <main className="pt-32 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6 mt-8">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Transport Requests</h1>
              <p className="text-gray-600">Manage incoming logistics and transport requests from industrial clients.</p>
            </div>
            <Button className="bg-[#eb2f96] hover:bg-[#eb2f96]/90">
              <Package className="h-4 w-4 mr-2" />
              Create Custom Quote
            </Button>
          </div>

          {/* Filters and Search */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search requests by client or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="heavy">Heavy Machinery</SelectItem>
                <SelectItem value="hazardous">Hazardous Materials</SelectItem>
                <SelectItem value="turbine">Turbine Components</SelectItem>
                <SelectItem value="factory">Factory Relocation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Package className="h-8 w-8 text-[#eb2f96]" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Open Requests</p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Quotes Sent</p>
                    <p className="text-2xl font-bold text-gray-900">8</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Truck className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Awarded Jobs</p>
                    <p className="text-2xl font-bold text-gray-900">5</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Clock className="h-8 w-8 text-orange-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Avg Response</p>
                    <p className="text-2xl font-bold text-gray-900">2.5h</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Requests List */}
          <div className="space-y-4">
            {filteredRequests.map((request) => (
              <Card key={request.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{request.id}</h3>
                        <Badge className={getPriorityColor(request.priority)}>
                          {request.priority}
                        </Badge>
                        <Badge className={getStatusColor(request.status)}>
                          {request.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{request.client}</p>
                      <p className="text-gray-800 mb-3">{request.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">From: {request.pickup}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">To: {request.delivery}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">Deadline: {request.deadline}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">Budget: {request.budget}</span>
                        </div>
                      </div>
                      
                      <div className="mt-3 text-sm text-gray-600">
                        <span className="font-medium">Weight:</span> {request.weight} | 
                        <span className="font-medium ml-2">Dimensions:</span> {request.dimensions}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button className="bg-[#eb2f96] hover:bg-[#eb2f96]/90" size="sm">
                        Submit Quote
                      </Button>
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

export default LogisticsVendorRequests;
