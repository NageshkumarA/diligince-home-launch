
// Professional-specific type definitions

export interface ProfessionalProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  expertise: string;
  experience: number;
  location: string;
  rating: number;
  hourlyRate?: string;
  availability: ProfessionalAvailability;
  skills: string[];
  certifications: Certification[];
  projects: ProfessionalProject[];
  status: ProfessionalStatus;
  createdAt: string;
  updatedAt: string;
}

export type ProfessionalStatus = 'active' | 'inactive' | 'busy' | 'available';

export type ProfessionalAvailability = 'available' | 'busy' | 'unavailable';

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issuedDate: string;
  expiryDate?: string;
  credentialId?: string;
}

export interface ProfessionalProject {
  id: string;
  title: string;
  description: string;
  client: string;
  duration: string;
  status: ProjectStatus;
  skills: string[];
  startDate: string;
  endDate?: string;
}

export type ProjectStatus = 'ongoing' | 'completed' | 'paused' | 'cancelled';
