
import React, { useState } from "react";
import { FormModal } from "@/components/shared/modals/FormModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Clock, Fuel, Route, Download } from "lucide-react";

interface RouteOptimizerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RouteOptimizerModal = ({ isOpen, onClose }: RouteOptimizerModalProps) => {
  const [optimizationCriteria, setOptimizationCriteria] = useState("time");
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");

  const sampleDeliveries = [
    { id: "DEL-001", address: "123 Industrial Ave, Mumbai", priority: "high", timeWindow: "9:00-12:00" },
    { id: "DEL-002", address: "456 Factory Rd, Pune", priority: "medium", timeWindow: "13:00-17:00" },
    { id: "DEL-003", address: "789 Warehouse St, Nashik", priority: "low", timeWindow: "10:00-15:00" }
  ];

  const optimizedRoute = {
    totalDistance: "245 km",
    estimatedTime: "4h 30min",
    fuelCost: "₹2,450",
    tollCost: "₹180",
    sequence: ["Start: Mumbai Depot", "DEL-001: Mumbai", "DEL-002: Pune", "DEL-003: Nashik", "Return: Mumbai Depot"]
  };

  const handleOptimizeRoute = () => {
    console.log("Optimizing route with criteria:", optimizationCriteria);
    // Route optimization logic would go here
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Route Optimizer"
      onSubmit={(e) => e.preventDefault()}
      submitText="Export Route"
      submitVariant="default"
      maxWidth="max-w-5xl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Route Configuration */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Route Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="criteria">Optimization Criteria</Label>
                <Select value={optimizationCriteria} onValueChange={setOptimizationCriteria}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="time">Minimize Time</SelectItem>
                    <SelectItem value="distance">Minimize Distance</SelectItem>
                    <SelectItem value="fuel">Minimize Fuel Cost</SelectItem>
                    <SelectItem value="balanced">Balanced Optimization</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="start">Start Location</Label>
                <Input
                  id="start"
                  placeholder="Enter depot/start location"
                  value={startLocation}
                  onChange={(e) => setStartLocation(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="end">End Location (Optional)</Label>
                <Input
                  id="end"
                  placeholder="Return location or leave blank"
                  value={endLocation}
                  onChange={(e) => setEndLocation(e.target.value)}
                />
              </div>

              <Button onClick={handleOptimizeRoute} className="w-full">
                <Route className="h-4 w-4 mr-2" />
                Optimize Route
              </Button>
            </CardContent>
          </Card>

          {/* Deliveries List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pending Deliveries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sampleDeliveries.map((delivery) => (
                  <div key={delivery.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{delivery.id}</span>
                        <Badge variant={delivery.priority === 'high' ? 'destructive' : delivery.priority === 'medium' ? 'secondary' : 'outline'}>
                          {delivery.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{delivery.address}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{delivery.timeWindow}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Optimized Route Results */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Optimized Route</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-600">Distance</p>
                    <p className="font-semibold">{optimizedRoute.totalDistance}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-600">Est. Time</p>
                    <p className="font-semibold">{optimizedRoute.estimatedTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Fuel className="h-4 w-4 text-orange-500" />
                  <div>
                    <p className="text-sm text-gray-600">Fuel Cost</p>
                    <p className="font-semibold">{optimizedRoute.fuelCost}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Route className="h-4 w-4 text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-600">Toll Cost</p>
                    <p className="font-semibold">{optimizedRoute.tollCost}</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Route Sequence</h4>
                <div className="space-y-2">
                  {optimizedRoute.sequence.map((stop, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-medium flex items-center justify-center">
                        {index + 1}
                      </div>
                      <span className="text-sm">{stop}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button variant="outline" className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Export GPX
                </Button>
                <Button className="flex-1">
                  Send to Driver
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Map Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Route Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="h-8 w-8 mx-auto mb-2" />
                  <p>Interactive route map</p>
                  <p className="text-sm">Map integration will show optimized route</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </FormModal>
  );
};
