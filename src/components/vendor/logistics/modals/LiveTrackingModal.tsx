
import React from "react";
import { DetailsModal } from "@/components/shared/modals/DetailsModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Clock, Fuel, Phone, AlertCircle } from "lucide-react";

interface LiveTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  delivery: any;
}

export const LiveTrackingModal = ({ isOpen, onClose, delivery }: LiveTrackingModalProps) => {
  if (!delivery) return null;

  const trackingData = {
    currentLocation: "NH 48, Near Pune Bypass",
    coordinates: { lat: 18.5204, lng: 73.8567 },
    speed: "65 km/h",
    lastUpdate: "2 minutes ago",
    nextCheckpoint: "Solapur Junction",
    eta: "14:30 PM",
    distanceRemaining: "468 km",
    fuelLevel: "72%",
    driverStatus: "on-time"
  };

  return (
    <DetailsModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Live Tracking - ${delivery.id}`}
      maxWidth="max-w-4xl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map View */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Live Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-80 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="h-8 w-8 mx-auto mb-2" />
                  <p>Live GPS Tracking</p>
                  <p className="text-sm">Real-time vehicle location</p>
                  <div className="mt-2 text-xs">
                    Current: {trackingData.currentLocation}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tracking Details */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Vehicle Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Current Speed</span>
                <span className="font-medium">{trackingData.speed}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Last Update</span>
                <span className="font-medium">{trackingData.lastUpdate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Distance Remaining</span>
                <span className="font-medium">{trackingData.distanceRemaining}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Fuel Level</span>
                <span className="font-medium">{trackingData.fuelLevel}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Delivery Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm mb-2">
                <span>Progress</span>
                <span>{delivery.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${delivery.progress}%` }}
                ></div>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <Navigation className="h-4 w-4 text-blue-500" />
                <span className="text-sm">Next: {trackingData.nextCheckpoint}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-green-500" />
                <span className="text-sm">ETA: {trackingData.eta}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full">
                <Phone className="h-4 w-4 mr-2" />
                Call Driver
              </Button>
              <Button variant="outline" className="w-full">
                <AlertCircle className="h-4 w-4 mr-2" />
                Report Issue
              </Button>
              <Button className="w-full">
                Send Alert to Customer
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DetailsModal>
  );
};
