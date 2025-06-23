
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type VendorSpecialization = 
  | 'transportation' 
  | 'heavy-equipment' 
  | 'crane-services' 
  | 'warehouse' 
  | 'freight-forwarding'
  | 'specialized-transport';

interface VendorSpecializationContextType {
  specialization: VendorSpecialization;
  setSpecialization: (spec: VendorSpecialization) => void;
  needsRouteOptimizer: boolean;
}

const VendorSpecializationContext = createContext<VendorSpecializationContextType | undefined>(undefined);

interface VendorSpecializationProviderProps {
  children: ReactNode;
}

export const VendorSpecializationProvider: React.FC<VendorSpecializationProviderProps> = ({ children }) => {
  const [specialization, setSpecialization] = useState<VendorSpecialization>('transportation');

  // Determine if vendor needs route optimizer based on specialization
  const needsRouteOptimizer = ['transportation', 'freight-forwarding', 'specialized-transport'].includes(specialization);

  const value: VendorSpecializationContextType = {
    specialization,
    setSpecialization,
    needsRouteOptimizer,
  };

  return (
    <VendorSpecializationContext.Provider value={value}>
      {children}
    </VendorSpecializationContext.Provider>
  );
};

export const useVendorSpecialization = (): VendorSpecializationContextType => {
  const context = useContext(VendorSpecializationContext);
  if (context === undefined) {
    throw new Error('useVendorSpecialization must be used within a VendorSpecializationProvider');
  }
  return context;
};
