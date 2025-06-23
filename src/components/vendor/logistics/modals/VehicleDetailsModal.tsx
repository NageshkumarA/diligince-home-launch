
import React from "react";
import { DetailsModal } from "@/components/shared/modals/DetailsModal";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Truck, User, MapPin, Calendar, Fuel, Wrench, FileText, Star } from "lucide-react";

interface VehicleDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: any;
}

export const VehicleDetailsModal = ({ 
  isOpen, 
  onClose, 
  vehicle 
}: VehicleDetailsModalProps) => {
  if (!vehicle) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-100 text-green-800";
      case "in-use": return "bg-blue-100 text-blue-800";
      case "maintenance": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getFuelColor = (level: number) => {
    if (level > 70) return "text-green-600";
    if (level > 30) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <DetailsModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Vehicle Details - ${vehicle.id}`}
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{vehicle.type}</h3>
            <p className="text-lg text-gray-700 mt-1">{vehicle.model}</p>
            <p className="text-sm text-gray-600">Capacity: {vehicle.capacity}</p>
          </div>
          <div className="flex gap-2">
            <Badge className={getStatusColor(vehicle.status)}>
              {vehicle.status}
            </Badge>
            {vehicle.fuelLevel < 30 && (
              <Badge className="bg-red-100 text-red-800">
                Low Fuel
              </Badge>
            )}
          </div>
        </div>

        <Separator />

        {/* Vehicle Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Vehicle Information</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-gray-500" />
                <div>
                  <span className="text-sm font-medium text-gray-600">Vehicle ID:</span>
                  <p className="text-gray-900">{vehicle.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <div>
                  <span className="text-sm font-medium text-gray-600">Current Location:</span>
                  <p className="text-gray-900">{vehicle.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div>
                  <span className="text-sm font-medium text-gray-600">Mileage:</span>
                  <p className="text-gray-900">{vehicle.mileage}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Driver & Operations</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <div>
                  <span className="text-sm font-medium text-gray-600">Assigned Driver:</span>
                  <p className="text-gray-900">{vehicle.driver}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Fuel className={`h-4 w-4 ${getFuelColor(vehicle.fuelLevel)}`} />
                <div>
                  <span className="text-sm font-medium text-gray-600">Fuel Level:</span>
                  <p className={getFuelColor(vehicle.fuelLevel)}>{vehicle.fuelLevel}%</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Wrench className="h-4 w-4 text-gray-500" />
                <div>
                  <span className="text-sm font-medium text-gray-600">Next Maintenance:</span>
                  <p className="text-gray-900">{vehicle.nextMaintenance}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Additional Details */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Recent Activity</h4>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">Last Updated: {vehicle.lastUpdated}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm text-gray-600">Performance Rating: Excellent</span>
            </div>
          </div>
        </div>
      </div>
    </DetailsModal>
  );
};
