
export type VendorType = 'service' | 'product' | 'logistics';

export interface VendorData {
  companyName: string;
  specialization: string;
  initials: string;
  isVerified?: boolean;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface VendorSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  vendorData: VendorData;
  profileCompletion: number;
  menuItems: MenuItem[];
  vendorType: VendorType;
}

export interface BaseVendorLayoutProps {
  children: React.ReactNode;
  header: React.ComponentType;
  sidebar: React.ComponentType;
}
