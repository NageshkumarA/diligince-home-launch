import React, { useState } from "react";
import { LogisticsVendorHeader } from "@/components/vendor/LogisticsVendorHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Truck, MapPin, Clock, Package, CheckCircle, AlertCircle, Search, Navigation, Phone } from "lucide-react";
import { RouteOptimizerModal } from "@/components/vendor/logistics/modals/RouteOptimizerModal";
import { EquipmentDeploymentModal } from "@/components/vendor/logistics/modals/EquipmentDeploymentModal";
import { LiveTrackingModal } from "@/components/vendor/logistics/modals/LiveTrackingModal";
import { ContactDriverModal } from "@/components/vendor/logistics/modals/ContactDriverModal";
import { UpdateDeliveryStatusModal } from "@/components/vendor/logistics/modals/UpdateDeliveryStatusModal";
import { useVendorSpecialization } from "@/contexts/VendorSpecializationContext";
const LogisticsVendorDeliveries = () => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const {
    needsRouteOptimizer,
    specialization
  } = useVendorSpecialization();

  // Modal states
  const [isRouteOptimizerModalOpen, setIsRouteOptimizerModalOpen] = useState(false);
  const [isEquipmentDeploymentModalOpen, setIsEquipmentDeploymentModalOpen] = useState(false);
  const [isLiveTrackingModalOpen, setIsLiveTrackingModalOpen] = useState(false);
  const [isContactDriverModalOpen, setIsContactDriverModalOpen] = useState(false);
  const [isUpdateStatusModalOpen, setIsUpdateStatusModalOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState<any>(null);
  const deliveries = [{
    id: "DEL-001",
    orderId: "REQ-001",
    client: "Steel Industries Ltd.",
    description: "50-ton industrial press transport",
    pickup: "Mumbai, Maharashtra",
    delivery: "Chennai, Tamil Nadu",
    driver: "Rajesh Kumar",
    vehicle: "TRK-001",
    status: "in-transit",
    progress: 65,
    estimatedArrival: "2025-01-15 14:30",
    currentLocation: "Pune Bypass",
    distance: {
      total: "1,340 km",
      remaining: "468 km"
    },
    milestones: [{
      location: "Mumbai Depot",
      time: "Jan 12, 08:00",
      status: "completed"
    }, {
      location: "Pune Checkpoint",
      time: "Jan 12, 14:30",
      status: "completed"
    }, {
      location: "Solapur Junction",
      time: "Jan 13, 09:15",
      status: "completed"
    }, {
      location: "Bangalore Outskirts",
      time: "Jan 14, 18:00",
      status: "current"
    }, {
      location: "Chennai Destination",
      time: "Jan 15, 14:30",
      status: "pending"
    }]
  }, {
    id: "DEL-002",
    orderId: "REQ-002",
    client: "Chemical Corp",
    description: "Chemical tanks with safety protocols",
    pickup: "Gujarat Industrial Estate",
    delivery: "Bangalore Tech Park",
    driver: "Suresh Patel",
    vehicle: "CRN-002",
    status: "loading",
    progress: 5,
    estimatedArrival: "2025-01-20 10:00",
    currentLocation: "Gujarat Industrial Estate",
    distance: {
      total: "920 km",
      remaining: "920 km"
    },
    milestones: [{
      location: "Gujarat Depot",
      time: "Jan 14, 06:00",
      status: "current"
    }, {
      location: "Mumbai Highway",
      time: "Jan 14, 14:00",
      status: "pending"
    }, {
      location: "Pune Junction",
      time: "Jan 15, 08:00",
      status: "pending"
    }, {
      location: "Bangalore Destination",
      time: "Jan 20, 10:00",
      status: "pending"
    }]
  }, {
    id: "DEL-003",
    orderId: "REQ-004",
    client: "Auto Manufacturing",
    description: "Factory equipment relocation - Phase 1",
    pickup: "Delhi Manufacturing Hub",
    delivery: "Haryana Industrial Zone",
    driver: "Vikram Sharma",
    vehicle: "SPL-005",
    status: "delivered",
    progress: 100,
    estimatedArrival: "2025-01-12 16:00",
    currentLocation: "Haryana Industrial Zone",
    distance: {
      total: "85 km",
      remaining: "0 km"
    },
    milestones: [{
      location: "Delhi Depot",
      time: "Jan 12, 08:00",
      status: "completed"
    }, {
      location: "Gurgaon Checkpoint",
      time: "Jan 12, 11:30",
      status: "completed"
    }, {
      location: "Haryana Destination",
      time: "Jan 12, 16:00",
      status: "completed"
    }]
  }];
  const getStatusColor = (status: string) => {
    switch (status) {
      case "loading":
        return "bg-blue-100 text-blue-800";
      case "in-transit":
        return "bg-yellow-100 text-yellow-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "delayed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const getMilestoneStatus = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600";
      case "current":
        return "text-blue-600";
      default:
        return "text-gray-400";
    }
  };
  const filteredDeliveries = deliveries.filter(delivery => {
    const matchesSearch = delivery.client.toLowerCase().includes(searchTerm.toLowerCase()) || delivery.id.toLowerCase().includes(searchTerm.toLowerCase()) || delivery.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || delivery.status === filterStatus;
    return matchesSearch && matchesFilter;
  });
  const handleLiveTrack = (delivery: any) => {
    setSelectedDelivery(delivery);
    setIsLiveTrackingModalOpen(true);
  };
  const handleCallDriver = (delivery: any) => {
    setSelectedDelivery(delivery);
    setIsContactDriverModalOpen(true);
  };
  const handleUpdateStatus = (delivery: any) => {
    setSelectedDelivery(delivery);
    setIsUpdateStatusModalOpen(true);
  };
  const getHeaderButtonText = () => {
    if (needsRouteOptimizer) return "Route Optimizer";
    if (specialization === 'heavy-equipment' || specialization === 'crane-services') return "Equipment Deployment";
    return "Fleet Manager";
  };
  const handleHeaderButtonClick = () => {
    if (needsRouteOptimizer) {
      setIsRouteOptimizerModalOpen(true);
    } else {
      setIsEquipmentDeploymentModalOpen(true);
    }
  };
  return <div className="min-h-screen bg-gray-50">
      {/* <LogisticsVendorHeader /> */}
      
      <main className="pt-32 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6 mt-8">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Active Deliveries</h1>
              <p className="text-gray-600">Track and manage ongoing transport and delivery operations.</p>
            </div>
            <Button onClick={handleHeaderButtonClick} className="text-white bg-pink-700 hover:bg-pink-600">
              <Navigation className="h-4 w-4 mr-2" />
              {getHeaderButtonText()}
            </Button>
          </div>

          {/* Delivery Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Truck className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Deliveries</p>
                    <p className="text-2xl font-bold text-gray-900">8</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Completed Today</p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Clock className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">On Time Rate</p>
                    <p className="text-2xl font-bold text-gray-900">94%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <AlertCircle className="h-8 w-8 text-orange-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Delayed</p>
                    <p className="text-2xl font-bold text-gray-900">2</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search deliveries by client, ID, or description..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 bg-white border-gray-200 focus:border-blue-300 focus:ring-blue-200" />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48 bg-white border-gray-200 focus:border-blue-300 focus:ring-blue-200">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="loading">Loading</SelectItem>
                <SelectItem value="in-transit">In Transit</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="delayed">Delayed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Deliveries List */}
          <div className="space-y-6">
            {filteredDeliveries.map(delivery => <Card key={delivery.id} className="bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{delivery.id}</h3>
                        <Badge className={getStatusColor(delivery.status)}>
                          {delivery.status}
                        </Badge>
                        <span className="text-sm text-gray-500">Order: {delivery.orderId}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{delivery.client}</p>
                      <p className="text-gray-800 mb-3">{delivery.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">From: {delivery.pickup}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">To: {delivery.delivery}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Truck className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">Vehicle: {delivery.vehicle}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">ETA: {delivery.estimatedArrival}</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Progress</span>
                          <span className="text-gray-900 font-medium">{delivery.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{
                        width: `${delivery.progress}%`
                      }}></div>
                        </div>
                      </div>

                      {/* Milestones */}
                      <div className="border-t pt-4">
                        <h4 className="font-medium text-gray-900 mb-3">Delivery Milestones</h4>
                        <div className="space-y-2">
                          {delivery.milestones.map((milestone, index) => <div key={index} className="flex items-center gap-3">
                              <div className={`w-3 h-3 rounded-full ${milestone.status === 'completed' ? 'bg-green-500' : milestone.status === 'current' ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                              <div className="flex-1 flex justify-between items-center">
                                <span className={`text-sm ${getMilestoneStatus(milestone.status)}`}>
                                  {milestone.location}
                                </span>
                                <span className={`text-xs ${getMilestoneStatus(milestone.status)}`}>
                                  {milestone.time}
                                </span>
                              </div>
                            </div>)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 ml-4">
                      <Button variant="outline" size="sm" onClick={() => handleLiveTrack(delivery)} className="border-blue-200 text-gray-50 bg-pink-700 hover:bg-pink-600">
                        <Navigation className="h-4 w-4 mr-1" />
                        Live Track
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleCallDriver(delivery)} className="border-blue-200 text-gray-50 bg-pink-700 hover:bg-pink-600">
                        <Phone className="h-4 w-4 mr-1" />
                        Call Driver
                      </Button>
                      <Button size="sm" onClick={() => handleUpdateStatus(delivery)} className="text-white bg-pink-700 hover:bg-pink-600">
                        Update Status
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </main>

      {/* Modals */}
      {needsRouteOptimizer && <RouteOptimizerModal isOpen={isRouteOptimizerModalOpen} onClose={() => setIsRouteOptimizerModalOpen(false)} />}
      
      {!needsRouteOptimizer && <EquipmentDeploymentModal isOpen={isEquipmentDeploymentModalOpen} onClose={() => setIsEquipmentDeploymentModalOpen(false)} />}
      
      <LiveTrackingModal isOpen={isLiveTrackingModalOpen} onClose={() => setIsLiveTrackingModalOpen(false)} delivery={selectedDelivery} />
      
      <ContactDriverModal isOpen={isContactDriverModalOpen} onClose={() => setIsContactDriverModalOpen(false)} delivery={selectedDelivery} />
      
      <UpdateDeliveryStatusModal isOpen={isUpdateStatusModalOpen} onClose={() => setIsUpdateStatusModalOpen(false)} delivery={selectedDelivery} />
    </div>;
};
export default LogisticsVendorDeliveries;