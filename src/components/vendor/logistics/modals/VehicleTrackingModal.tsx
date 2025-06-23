
import React from "react";
import { BaseModal } from "@/components/shared/modals/BaseModal";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Navigation, Clock, Fuel, Route, AlertTriangle } from "lucide-react";

interface VehicleTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: any;
}

export const VehicleTrackingModal = ({ 
  isOpen, 
  onClose, 
  vehicle 
}: VehicleTrackingModalProps) => {
  if (!vehicle) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-100 text-green-800";
      case "in-use": return "bg-blue-100 text-blue-800";
      case "maintenance": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Vehicle Tracking - ${vehicle.id}`}
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{vehicle.type}</h3>
            <p className="text-lg text-gray-700 mt-1">{vehicle.model}</p>
          </div>
          <div className="flex gap-2">
            <Badge className={getStatusColor(vehicle.status)}>
              {vehicle.status}
            </Badge>
            <Badge className="bg-green-100 text-green-800">
              GPS Active
            </Badge>
          </div>
        </div>

        <Separator />

        {/* Live Tracking Map Placeholder */}
        <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 font-medium">Live GPS Tracking Map</p>
            <p className="text-sm text-gray-500">Real-time vehicle location would be displayed here</p>
          </div>
        </div>

        {/* Tracking Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Current Status</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-500" />
                <div>
                  <span className="text-sm font-medium text-gray-600">Current Location:</span>
                  <p className="text-gray-900">{vehicle.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Navigation className="h-4 w-4 text-green-500" />
                <div>
                  <span className="text-sm font-medium text-gray-600">Speed:</span>
                  <p className="text-gray-900">65 km/h</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-500" />
                <div>
                  <span className="text-sm font-medium text-gray-600">Last Update:</span>
                  <p className="text-gray-900">{vehicle.lastUpdated}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Route Information</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Route className="h-4 w-4 text-purple-500" />
                <div>
                  <span className="text-sm font-medium text-gray-600">Destination:</span>
                  <p className="text-gray-900">Pune Construction Site</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-500" />
                <div>
                  <span className="text-sm font-medium text-gray-600">ETA:</span>
                  <p className="text-gray-900">2 hours 30 minutes</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Fuel className="h-4 w-4 text-green-500" />
                <div>
                  <span className="text-sm font-medium text-gray-600">Fuel Level:</span>
                  <p className="text-gray-900">{vehicle.fuelLevel}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Route History */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Recent Route History</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Mumbai Depot → Pune Construction Site</p>
                <p className="text-xs text-gray-600">Started: 08:30 AM | Distance: 165 km</p>
              </div>
              <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Nashik → Mumbai Depot</p>
                <p className="text-xs text-gray-600">Completed: Yesterday | Distance: 180 km</p>
              </div>
              <Badge className="bg-green-100 text-green-800">Completed</Badge>
            </div>
          </div>
        </div>

        {/* Alerts */}
        {vehicle.fuelLevel < 30 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="font-medium text-red-900">Low Fuel Alert</p>
                <p className="text-sm text-red-700">Vehicle fuel level is below 30%. Consider refueling soon.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </BaseModal>
  );
};
