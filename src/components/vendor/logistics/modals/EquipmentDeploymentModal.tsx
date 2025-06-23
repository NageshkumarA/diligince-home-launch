
import React, { useState } from "react";
import { FormModal } from "@/components/shared/modals/FormModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Truck, MapPin, Calendar as CalendarIcon, Clock, Settings } from "lucide-react";
import { format } from "date-fns";

interface EquipmentDeploymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EquipmentDeploymentModal = ({ isOpen, onClose }: EquipmentDeploymentModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedEquipment, setSelectedEquipment] = useState("");
  const [siteLocation, setSiteLocation] = useState("");

  const availableEquipment = [
    { id: "CRN-001", name: "Mobile Crane 100T", status: "available", location: "Mumbai Depot" },
    { id: "CRN-002", name: "Hydraulic Crane 150T", status: "available", location: "Pune Depot" },
    { id: "EXC-001", name: "Heavy Excavator", status: "in-use", location: "Construction Site A" },
    { id: "TRL-001", name: "Heavy Transport Trailer", status: "available", location: "Delhi Depot" }
  ];

  const activeDeployments = [
    { equipment: "CRN-003", site: "High-rise Construction, Mumbai", startDate: "2025-01-10", endDate: "2025-01-25", status: "active" },
    { equipment: "TRL-002", site: "Industrial Relocation, Pune", startDate: "2025-01-08", endDate: "2025-01-20", status: "active" },
    { equipment: "EXC-002", site: "Infrastructure Project, Delhi", startDate: "2025-01-05", endDate: "2025-01-30", status: "active" }
  ];

  const handleDeployEquipment = () => {
    console.log("Deploying equipment:", { selectedEquipment, siteLocation, selectedDate });
    // Equipment deployment logic would go here
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-100 text-green-800";
      case "in-use": return "bg-blue-100 text-blue-800";
      case "maintenance": return "bg-orange-100 text-orange-800";
      case "active": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Equipment Deployment Manager"
      onSubmit={(e) => e.preventDefault()}
      submitText="Schedule Deployment"
      submitVariant="default"
      maxWidth="max-w-5xl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Deployment Planning */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Schedule New Deployment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="equipment">Select Equipment</Label>
                <Select value={selectedEquipment} onValueChange={setSelectedEquipment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose equipment" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableEquipment.filter(eq => eq.status === 'available').map((equipment) => (
                      <SelectItem key={equipment.id} value={equipment.id}>
                        {equipment.name} - {equipment.location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="site">Deployment Site</Label>
                <Input
                  id="site"
                  placeholder="Enter site address or project name"
                  value={siteLocation}
                  onChange={(e) => setSiteLocation(e.target.value)}
                />
              </div>

              <div>
                <Label>Deployment Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <Button onClick={handleDeployEquipment} className="w-full">
                <Settings className="h-4 w-4 mr-2" />
                Schedule Deployment
              </Button>
            </CardContent>
          </Card>

          {/* Available Equipment */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Equipment Fleet Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {availableEquipment.map((equipment) => (
                  <div key={equipment.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Truck className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">{equipment.name}</p>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <MapPin className="h-3 w-3" />
                          {equipment.location}
                        </div>
                      </div>
                    </div>
                    <Badge className={getStatusColor(equipment.status)}>
                      {equipment.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Deployments */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Active Deployments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeDeployments.map((deployment, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{deployment.equipment}</h4>
                      <Badge className={getStatusColor(deployment.status)}>
                        {deployment.status}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{deployment.site}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-3 w-3" />
                        <span>{deployment.startDate} - {deployment.endDate}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm">
                        <MapPin className="h-3 w-3 mr-1" />
                        Track
                      </Button>
                      <Button variant="outline" size="sm">
                        <Clock className="h-3 w-3 mr-1" />
                        Update
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Deployment Calendar */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Deployment Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <CalendarIcon className="h-8 w-8 mx-auto mb-2" />
                  <p>Equipment Schedule</p>
                  <p className="text-sm">Visual calendar showing equipment deployments</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </FormModal>
  );
};
