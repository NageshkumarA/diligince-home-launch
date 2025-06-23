
import React from "react";
import { DetailsModal } from "@/components/shared/modals/DetailsModal";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Calendar, DollarSign, Package, Truck, Clock } from "lucide-react";

interface RequestDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: any;
  onSubmitQuote?: () => void;
}

export const RequestDetailsModal = ({ 
  isOpen, 
  onClose, 
  request,
  onSubmitQuote 
}: RequestDetailsModalProps) => {
  if (!request) return null;

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

  const actions = onSubmitQuote ? [
    {
      label: "Submit Quote",
      onClick: onSubmitQuote,
      variant: "default" as const,
      icon: <DollarSign className="h-4 w-4" />
    }
  ] : [];

  return (
    <DetailsModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Request Details - ${request.id}`}
      actions={actions}
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{request.type}</h3>
            <p className="text-lg text-gray-700 mt-1">{request.client}</p>
          </div>
          <div className="flex gap-2">
            <Badge className={getPriorityColor(request.priority)}>
              {request.priority}
            </Badge>
            <Badge className={getStatusColor(request.status)}>
              {request.status}
            </Badge>
          </div>
        </div>

        <Separator />

        {/* Description */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
          <p className="text-gray-700">{request.description}</p>
        </div>

        {/* Transport Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Transport Information</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <div>
                  <span className="text-sm font-medium text-gray-600">Pickup:</span>
                  <p className="text-gray-900">{request.pickup}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <div>
                  <span className="text-sm font-medium text-gray-600">Delivery:</span>
                  <p className="text-gray-900">{request.delivery}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div>
                  <span className="text-sm font-medium text-gray-600">Deadline:</span>
                  <p className="text-gray-900">{request.deadline}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Cargo Specifications</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-gray-500" />
                <div>
                  <span className="text-sm font-medium text-gray-600">Weight:</span>
                  <p className="text-gray-900">{request.weight}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-gray-500" />
                <div>
                  <span className="text-sm font-medium text-gray-600">Dimensions:</span>
                  <p className="text-gray-900">{request.dimensions}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <div>
                  <span className="text-sm font-medium text-gray-600">Budget:</span>
                  <p className="text-gray-900">{request.budget}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DetailsModal>
  );
};
