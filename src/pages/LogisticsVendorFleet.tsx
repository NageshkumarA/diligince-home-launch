
import React, { useState } from "react";
import { LogisticsVendorHeader } from "@/components/vendor/LogisticsVendorHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Truck, Wrench, Users, MapPin, Calendar, Fuel, Search, Plus, AlertCircle } from "lucide-react";

const LogisticsVendorFleet = () => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const fleet = [
    {
      id: "TRK-001",
      type: "Heavy Duty Truck",
      model: "Tata Prima 4940.S",
      capacity: "40 tons",
      status: "available",
      driver: "Rajesh Kumar",
      location: "Mumbai Depot",
      mileage: "1,25,000 km",
      nextMaintenance: "2025-01-20",
      fuelLevel: 85,
      lastUpdated: "2 hours ago"
    },
    {
      id: "CRN-002",
      type: "Mobile Crane",
      model: "Tadano GR-1000XL",
      capacity: "100 tons",
      status: "in-use",
      driver: "Suresh Patel",
      location: "Pune Construction Site",
      mileage: "75,000 km",
      nextMaintenance: "2025-01-15",
      fuelLevel: 62,
      lastUpdated: "30 minutes ago"
    },
    {
      id: "TRL-003",
      type: "Low Bed Trailer",
      model: "Ashok Leyland 6x4",
      capacity: "60 tons",
      status: "maintenance",
      driver: "Unassigned",
      location: "Service Center - Delhi",
      mileage: "2,10,000 km",
      nextMaintenance: "In Progress",
      fuelLevel: 45,
      lastUpdated: "1 day ago"
    },
    {
      id: "TRK-004",
      type: "Container Truck",
      model: "Volvo FH16",
      capacity: "35 tons",
      status: "available",
      driver: "Amit Singh",
      location: "Chennai Port",
      mileage: "95,000 km",
      nextMaintenance: "2025-02-01",
      fuelLevel: 92,
      lastUpdated: "1 hour ago"
    },
    {
      id: "SPL-005",
      type: "Specialized Transport",
      model: "Multi-Axle Hydraulic",
      capacity: "150 tons",
      status: "in-use",
      driver: "Vikram Sharma",
      location: "Bangalore - Mysore Highway",
      mileage: "45,000 km",
      nextMaintenance: "2025-01-25",
      fuelLevel: 78,
      lastUpdated: "15 minutes ago"
    }
  ];

  const drivers = [
    { name: "Rajesh Kumar", experience: "12 years", rating: 4.8, status: "available" },
    { name: "Suresh Patel", experience: "8 years", rating: 4.6, status: "on-duty" },
    { name: "Amit Singh", experience: "15 years", rating: 4.9, status: "available" },
    { name: "Vikram Sharma", experience: "10 years", rating: 4.7, status: "on-duty" },
    { name: "Deepak Yadav", experience: "6 years", rating: 4.5, status: "off-duty" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-100 text-green-800";
      case "in-use": return "bg-blue-100 text-blue-800";
      case "maintenance": return "bg-red-100 text-red-800";
      case "off-duty": return "bg-gray-100 text-gray-800";
      default: return "bg-yellow-100 text-yellow-800";
    }
  };

  const getFuelColor = (level: number) => {
    if (level > 70) return "text-green-600";
    if (level > 30) return "text-yellow-600";
    return "text-red-600";
  };

  const filteredFleet = fleet.filter(vehicle => {
    const matchesSearch = vehicle.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || vehicle.status === filterStatus;
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Fleet Management</h1>
              <p className="text-gray-600">Monitor and manage your logistics fleet, equipment, and drivers.</p>
            </div>
            <Button className="bg-[#eb2f96] hover:bg-[#eb2f96]/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Vehicle
            </Button>
          </div>

          {/* Fleet Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Truck className="h-8 w-8 text-[#eb2f96]" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Fleet</p>
                    <p className="text-2xl font-bold text-gray-900">24</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Truck className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Available</p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Truck className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">In Use</p>
                    <p className="text-2xl font-bold text-gray-900">8</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Wrench className="h-8 w-8 text-orange-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Maintenance</p>
                    <p className="text-2xl font-bold text-gray-900">4</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Drivers</p>
                    <p className="text-2xl font-bold text-gray-900">18</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search vehicles by ID, type, or driver..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="in-use">In Use</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Fleet List */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Fleet Overview</h2>
              {filteredFleet.map((vehicle) => (
                <Card key={vehicle.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{vehicle.id}</h3>
                          <Badge className={getStatusColor(vehicle.status)}>
                            {vehicle.status}
                          </Badge>
                          {vehicle.fuelLevel < 30 && (
                            <Badge className="bg-red-100 text-red-800">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Low Fuel
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{vehicle.type} - {vehicle.model}</p>
                        <p className="text-sm text-gray-600 mb-3">Capacity: {vehicle.capacity}</p>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">Driver: {vehicle.driver}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">{vehicle.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Wrench className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">Next Service: {vehicle.nextMaintenance}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Fuel className={`h-4 w-4 ${getFuelColor(vehicle.fuelLevel)}`} />
                            <span className={getFuelColor(vehicle.fuelLevel)}>Fuel: {vehicle.fuelLevel}%</span>
                          </div>
                        </div>
                        
                        <div className="text-xs text-gray-500">
                          Mileage: {vehicle.mileage} | Last updated: {vehicle.lastUpdated}
                        </div>
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        <Button variant="outline" size="sm">
                          <MapPin className="h-4 w-4 mr-1" />
                          Track
                        </Button>
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Driver Management */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Driver Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {drivers.map((driver, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{driver.name}</p>
                          <p className="text-sm text-gray-600">{driver.experience}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-sm text-gray-600">Rating:</span>
                            <span className="text-sm font-medium text-orange-600">{driver.rating}★</span>
                          </div>
                        </div>
                        <Badge className={getStatusColor(driver.status)}>
                          {driver.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4 bg-[#eb2f96] hover:bg-[#eb2f96]/90" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Driver
                  </Button>
                </CardContent>
              </Card>

              {/* Maintenance Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Maintenance Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                      <div>
                        <p className="font-medium text-red-900">TRK-001 Service Due</p>
                        <p className="text-sm text-red-700">Due in 3 days</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-yellow-600" />
                      <div>
                        <p className="font-medium text-yellow-900">CRN-002 Inspection</p>
                        <p className="text-sm text-yellow-700">Due in 1 week</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LogisticsVendorFleet;
