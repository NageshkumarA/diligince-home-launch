import React, { createContext, useContext, useState, useCallback } from 'react';
import { StakeholderApplication, StakeholderMatch, StakeholderProfile, StakeholderInvitation } from '@/types/stakeholder';
import { RequirementFormData } from './RequirementContext';

interface StakeholderContextType {
  applications: StakeholderApplication[];
  matches: StakeholderMatch[];
  stakeholderProfiles: StakeholderProfile[];
  invitations: StakeholderInvitation[];
  submitApplication: (application: Omit<StakeholderApplication, 'id' | 'submittedDate' | 'status'>) => void;
  reviewApplication: (applicationId: string, status: 'accepted' | 'rejected', comments?: string) => void;
  getApplicationsForRequirement: (requirementId: string) => StakeholderApplication[];
  getMatchedStakeholders: (requirementId: string) => StakeholderProfile[];
  notifyStakeholders: (requirement: RequirementFormData) => void;
  addStakeholderProfile: (profile: Omit<StakeholderProfile, 'id'>) => string;
  sendInvitation: (invitation: Omit<StakeholderInvitation, 'id' | 'sentDate' | 'status'>) => Promise<void>;
  getInvitationStatus: (stakeholderId: string) => StakeholderInvitation | null;
}

const StakeholderContext = createContext<StakeholderContextType | undefined>(undefined);

// Mock stakeholder profiles
const mockStakeholderProfiles: StakeholderProfile[] = [
  {
    id: 'v1',
    name: 'TechValve Solutions',
    type: 'product_vendor',
    email: 'contact@techvalve.com',
    phone: '+1-555-0101',
    location: 'Houston, TX',
    rating: 4.8,
    completedProjects: 45,
    specializations: ['Industrial Valves', 'Pipeline Equipment', 'Pressure Systems'],
    certifications: ['ISO 9001', 'API 6D', 'ASME B16.34'],
    description: 'Leading supplier of industrial valves and pipeline equipment',
    established: '2010',
    teamSize: '25-50'
  },
  {
    id: 'v2',
    name: 'EngiConsult Group',
    type: 'expert',
    email: 'experts@engiconsult.com',
    phone: '+1-555-0102',
    location: 'Dallas, TX',
    rating: 4.7,
    completedProjects: 38,
    specializations: ['Chemical Engineering', 'Process Optimization', 'Safety Consulting'],
    certifications: ['PE License', 'Six Sigma Black Belt', 'HAZOP Leader'],
    description: 'Expert chemical engineering consultancy with 15+ years experience',
    established: '2008',
    teamSize: '10-25'
  },
  {
    id: 'v3',
    name: 'Service Pro Maintenance',
    type: 'service_vendor',
    email: 'service@servicepro.com',
    phone: '+1-555-0103',
    location: 'Austin, TX',
    rating: 4.5,
    completedProjects: 62,
    specializations: ['Equipment Maintenance', 'Predictive Maintenance', 'Shutdown Services'],
    certifications: ['NACE Certified', 'OSHA 30', 'Millwright Certified'],
    description: 'Comprehensive industrial maintenance and repair services',
    established: '2012',
    teamSize: '50-100'
  },
  {
    id: 'v4',
    name: 'FastTrack Logistics',
    type: 'logistics_vendor',
    email: 'logistics@fasttrack.com',
    phone: '+1-555-0104',
    location: 'San Antonio, TX',
    rating: 4.6,
    completedProjects: 128,
    specializations: ['Heavy Equipment Transport', 'Project Logistics', 'Crane Services'],
    certifications: ['DOT Certified', 'TWIC Card', 'Specialized Transport License'],
    description: 'Specialized logistics for industrial equipment and project cargo',
    established: '2005',
    teamSize: '100+'
  }
];

export const StakeholderProvider = ({ children }: { children: React.ReactNode }) => {
  console.log("StakeholderProvider mounting...");
  
  try {
    const [applications, setApplications] = useState<StakeholderApplication[]>([]);
    const [matches, setMatches] = useState<StakeholderMatch[]>([]);
    const [stakeholderProfiles, setStakeholderProfiles] = useState<StakeholderProfile[]>(mockStakeholderProfiles);
    const [invitations, setInvitations] = useState<StakeholderInvitation[]>([]);

    const submitApplication = useCallback((applicationData: Omit<StakeholderApplication, 'id' | 'submittedDate' | 'status'>) => {
      const newApplication: StakeholderApplication = {
        ...applicationData,
        id: `app-${Date.now()}`,
        submittedDate: new Date().toISOString(),
        status: 'pending'
      };
      setApplications(prev => [...prev, newApplication]);
    }, []);

    const reviewApplication = useCallback((applicationId: string, status: 'accepted' | 'rejected', comments?: string) => {
      setApplications(prev => prev.map(app => 
        app.id === applicationId 
          ? { ...app, status, reviewedDate: new Date().toISOString(), reviewComments: comments }
          : app
      ));
    }, []);

    const getApplicationsForRequirement = useCallback((requirementId: string) => {
      return applications.filter(app => app.requirementId === requirementId);
    }, [applications]);

    const getMatchedStakeholders = useCallback((requirementId: string) => {
      const requirementMatches = matches.filter(match => match.requirementId === requirementId);
      return stakeholderProfiles.filter(profile => 
        requirementMatches.some(match => match.stakeholderId === profile.id)
      );
    }, [matches, stakeholderProfiles]);

    const notifyStakeholders = useCallback((requirement: RequirementFormData) => {
      // Match stakeholders based on requirement category and specializations
      const relevantStakeholders = stakeholderProfiles.filter(profile => {
        if (requirement.category === 'product' && profile.type === 'product_vendor') return true;
        if (requirement.category === 'service' && profile.type === 'service_vendor') return true;
        if (requirement.category === 'logistics' && profile.type === 'logistics_vendor') return true;
        if (requirement.category === 'expert' && profile.type === 'expert') return true;
        return false;
      });

      const newMatches = relevantStakeholders.map(stakeholder => ({
        requirementId: requirement.title, // Using title as ID for demo
        stakeholderId: stakeholder.id,
        matchScore: Math.random() * 0.3 + 0.7, // Random score between 0.7-1.0
        matchCriteria: stakeholder.specializations.slice(0, 2),
        notified: true,
        notifiedDate: new Date().toISOString()
      }));

      setMatches(prev => [...prev, ...newMatches]);
    }, [stakeholderProfiles]);

    const addStakeholderProfile = useCallback((profileData: Omit<StakeholderProfile, 'id'>) => {
      const newProfile: StakeholderProfile = {
        ...profileData,
        id: `stakeholder-${Date.now()}`
      };
      setStakeholderProfiles(prev => [...prev, newProfile]);
      return newProfile.id;
    }, []);

    const sendInvitation = useCallback(async (invitationData: Omit<StakeholderInvitation, 'id' | 'sentDate' | 'status'>) => {
      const newInvitation: StakeholderInvitation = {
        ...invitationData,
        id: `inv-${Date.now()}`,
        sentDate: new Date().toISOString(),
        status: 'sent'
      };
      
      setInvitations(prev => [...prev, newInvitation]);
      
      // Simulate sending email invitation
      console.log(`Sending invitation email to ${invitationData.email} for ${invitationData.name}`);
      
      // In a real application, this would send an actual email
      // For now, we'll simulate a successful send
      return Promise.resolve();
    }, []);

    const getInvitationStatus = useCallback((stakeholderId: string) => {
      return invitations.find(inv => inv.stakeholderId === stakeholderId) || null;
    }, [invitations]);

    const contextValue = {
      applications,
      matches,
      stakeholderProfiles,
      invitations,
      submitApplication,
      reviewApplication,
      getApplicationsForRequirement,
      getMatchedStakeholders,
      notifyStakeholders,
      addStakeholderProfile,
      sendInvitation,
      getInvitationStatus
    };

    console.log("StakeholderProvider context value created:", contextValue);

    return (
      <StakeholderContext.Provider value={contextValue}>
        {children}
      </StakeholderContext.Provider>
    );
  } catch (error) {
    console.error("Error in StakeholderProvider:", error);
    // Provide a fallback context to prevent crashes
    const fallbackContext: StakeholderContextType = {
      applications: [],
      matches: [],
      stakeholderProfiles: [],
      invitations: [],
      submitApplication: () => console.warn("StakeholderProvider not available"),
      reviewApplication: () => console.warn("StakeholderProvider not available"),
      getApplicationsForRequirement: () => [],
      getMatchedStakeholders: () => [],
      notifyStakeholders: () => console.warn("StakeholderProvider not available"),
      addStakeholderProfile: () => "",
      sendInvitation: () => Promise.resolve(),
      getInvitationStatus: () => null
    };

    return (
      <StakeholderContext.Provider value={fallbackContext}>
        {children}
      </StakeholderContext.Provider>
    );
  }
};

export const useStakeholder = () => {
  const context = useContext(StakeholderContext);
  if (context === undefined) {
    console.error('useStakeholder must be used within a StakeholderProvider');
    // Return a safe fallback instead of throwing
    return {
      applications: [],
      matches: [],
      stakeholderProfiles: [],
      invitations: [],
      submitApplication: () => console.warn("StakeholderProvider not available"),
      reviewApplication: () => console.warn("StakeholderProvider not available"),
      getApplicationsForRequirement: () => [],
      getMatchedStakeholders: () => [],
      notifyStakeholders: () => console.warn("StakeholderProvider not available"),
      addStakeholderProfile: () => "",
      sendInvitation: () => Promise.resolve(),
      getInvitationStatus: () => null
    } as StakeholderContextType;
  }
  return context;
};
