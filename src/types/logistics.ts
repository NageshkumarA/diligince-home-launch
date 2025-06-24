
// Logistics-specific type definitions

export interface LogisticsVendorProfile {
  id: string;
  companyName: string;
  email: string;
  phone: string;
  specialization: LogisticsSpecialization[];
  serviceAreas: string[];
  fleetSize: number;
  driverCount: number;
  rating: number;
  completedDeliveries: number;
  status: LogisticsStatus;
  licenses: License[];
  equipment: Equipment[];
  createdAt: string;
  updatedAt: string;
}

export type LogisticsSpecialization = 
  | 'transportation' 
  | 'heavy-equipment' 
  | 'crane-services' 
  | 'warehouse' 
  | 'freight-forwarding'
  | 'specialized-transport';

export type LogisticsStatus = 'active' | 'inactive' | 'maintenance' | 'suspended';

export interface License {
  id: string;
  type: string;
  number: string;
  issuer: string;
  issuedDate: string;
  expiryDate: string;
  status: 'valid' | 'expired' | 'pending';
}

export interface Equipment {
  id: string;
  type: string;
  model: string;
  capacity: string;
  status: EquipmentStatus;
  lastMaintenance?: string;
  nextMaintenance?: string;
  location?: string;
}

export type EquipmentStatus = 'available' | 'in-use' | 'maintenance' | 'out-of-service';

export interface TransportRequest {
  id: string;
  clientName: string;
  pickup: Location;
  delivery: Location;
  cargo: CargoDetails;
  requestedDate: string;
  urgency: 'low' | 'medium' | 'high' | 'urgent';
  status: RequestStatus;
  estimatedCost?: string;
}

export interface Location {
  address: string;
  city: string;
  state: string;
  pincode: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface CargoDetails {
  type: string;
  weight: string;
  dimensions?: string;
  specialRequirements?: string[];
}

export type RequestStatus = 'pending' | 'quoted' | 'accepted' | 'in-transit' | 'delivered' | 'cancelled';
