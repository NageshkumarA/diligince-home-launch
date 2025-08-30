
import { VendorSpecialization } from '@/contexts/VendorSpecializationContext';

// Mapping from signup form specializations to context specializations
export const mapSignupToSpecialization = (signupSpecialization: string): VendorSpecialization => {
  const mappings: Record<string, VendorSpecialization> = {
    "Transportation Services": "transportation",
    "Supply Chain Solutions": "freight-forwarding", 
    "Bulk Material Transport": "specialized-transport",
    "Hazardous Material Transport": "specialized-transport",
    "Cold Chain Logistics": "freight-forwarding",
    "Heavy Equipment Rental": "heavy-equipment",
    "Crane Services": "crane-services",
    "Forklift Rental": "heavy-equipment",
    "Warehouse Management": "warehouse",
    "Inventory Management": "warehouse"
  };
  
  return mappings[signupSpecialization] || "transportation";
};

// Get display name for specialization
export const getSpecializationDisplayName = (specialization: VendorSpecialization): string => {
  const displayNames: Record<VendorSpecialization, string> = {
    "transportation": "Transportation Services",
    "heavy-equipment": "Heavy Equipment",
    "crane-services": "Crane Services", 
    "warehouse": "Warehouse Management",
    "freight-forwarding": "Freight Forwarding",
    "specialized-transport": "Specialized Transport"
  };
  
  return displayNames[specialization];
};

// Get badge color for specialization
export const getSpecializationBadgeColor = (specialization: VendorSpecialization): string => {
  const colors: Record<VendorSpecialization, string> = {
    "transportation": "bg-primary/10 text-primary",
    "heavy-equipment": "bg-orange-100 text-orange-800",
    "crane-services": "bg-purple-100 text-purple-800",
    "warehouse": "bg-green-100 text-green-800",
    "freight-forwarding": "bg-indigo-100 text-indigo-800",
    "specialized-transport": "bg-red-100 text-red-800"
  };
  
  return colors[specialization];
};
