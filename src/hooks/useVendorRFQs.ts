import { useState, useCallback } from 'react';
import { 
  RFQBrowseFilters, 
  RFQBrowseItem, 
  RFQDetailItem,
  RFQStats,
  RFQBrowseFiltersResponse,
  RFQBrowsePagination
} from '@/types/rfq-browse';

// Mock data for development
const mockRFQs: RFQBrowseItem[] = [
  {
    id: 'req-2025-001',
    title: 'Industrial Automation Services for Manufacturing Plant',
    description: 'Looking for experienced automation service provider for our manufacturing unit. The project involves PLC programming, SCADA implementation, and integration with existing systems.',
    category: 'service',
    priority: 'high',
    status: 'open',
    company: {
      id: 'company-123',
      name: 'TechCorp Industries',
      logo: null,
      location: 'Mumbai, Maharashtra',
      rating: 4.5,
      verified: true
    },
    budget: {
      min: 500000,
      max: 750000,
      currency: 'INR',
      display: '₹5,00,000 - ₹7,50,000'
    },
    deadline: '2025-01-20T23:59:59Z',
    postedDate: '2025-01-05T10:30:00Z',
    location: {
      state: 'Maharashtra',
      city: 'Mumbai'
    },
    requirements: ['ISO Certification', '5+ years experience'],
    skills: ['PLC Programming', 'SCADA', 'Industrial IoT', 'HMI Design'],
    responses: 12,
    daysLeft: 15,
    isClosingSoon: false,
    isSaved: false,
    hasApplied: false,
    aiRecommendation: {
      score: 92,
      reasoning: 'Strong match with your service portfolio',
      matchFactors: ['Location match', 'Category expertise', 'Budget range']
    }
  },
  {
    id: 'req-2025-002',
    title: 'Electrical Panel Manufacturing - 50 Units',
    description: 'Require vendor for manufacturing 50 industrial electrical panels with custom specifications for our new plant expansion.',
    category: 'product',
    priority: 'medium',
    status: 'open',
    company: {
      id: 'company-456',
      name: 'PowerGrid Solutions',
      logo: null,
      location: 'Pune, Maharashtra',
      rating: 4.2,
      verified: true
    },
    budget: {
      min: 200000,
      max: 350000,
      currency: 'INR',
      display: '₹2,00,000 - ₹3,50,000'
    },
    deadline: '2025-01-25T23:59:59Z',
    postedDate: '2025-01-03T14:00:00Z',
    location: {
      state: 'Maharashtra',
      city: 'Pune'
    },
    requirements: ['BIS Certification', '3+ years in panel manufacturing'],
    skills: ['Electrical Panels', 'Industrial Manufacturing'],
    responses: 8,
    daysLeft: 20,
    isClosingSoon: false,
    isSaved: true,
    hasApplied: false,
    aiRecommendation: null
  },
  {
    id: 'req-2025-003',
    title: 'Logistics Support for Heavy Machinery Transport',
    description: 'Need reliable logistics partner for transporting heavy industrial machinery from Chennai port to our Bangalore facility.',
    category: 'logistics',
    priority: 'critical',
    status: 'closing_soon',
    company: {
      id: 'company-789',
      name: 'Bharat Manufacturing Ltd',
      logo: null,
      location: 'Bangalore, Karnataka',
      rating: 4.8,
      verified: true
    },
    budget: {
      min: 150000,
      max: 250000,
      currency: 'INR',
      display: '₹1,50,000 - ₹2,50,000'
    },
    deadline: '2025-01-08T23:59:59Z',
    postedDate: '2025-01-02T09:00:00Z',
    location: {
      state: 'Karnataka',
      city: 'Bangalore'
    },
    requirements: ['Heavy equipment license', 'Insurance coverage'],
    skills: ['Heavy Machinery', 'ODC Transport', 'Route Planning'],
    responses: 5,
    daysLeft: 3,
    isClosingSoon: true,
    isSaved: false,
    hasApplied: false,
    aiRecommendation: {
      score: 78,
      reasoning: 'Good match for logistics expertise',
      matchFactors: ['Route familiarity', 'Equipment capability']
    }
  },
  {
    id: 'req-2025-004',
    title: 'IT Consulting for ERP Implementation',
    description: 'Seeking professional IT consultants for SAP ERP implementation project. Looking for certified professionals with manufacturing domain expertise.',
    category: 'professional',
    priority: 'high',
    status: 'open',
    company: {
      id: 'company-012',
      name: 'AutoParts Global',
      logo: null,
      location: 'Chennai, Tamil Nadu',
      rating: 4.3,
      verified: true
    },
    budget: {
      min: 800000,
      max: 1200000,
      currency: 'INR',
      display: '₹8,00,000 - ₹12,00,000'
    },
    deadline: '2025-02-10T23:59:59Z',
    postedDate: '2025-01-04T11:00:00Z',
    location: {
      state: 'Tamil Nadu',
      city: 'Chennai'
    },
    requirements: ['SAP Certified', 'Manufacturing domain knowledge'],
    skills: ['SAP ERP', 'Business Analysis', 'Project Management'],
    responses: 15,
    daysLeft: 36,
    isClosingSoon: false,
    isSaved: false,
    hasApplied: true,
    aiRecommendation: null
  },
  {
    id: 'req-2025-005',
    title: 'HVAC System Installation and Maintenance',
    description: 'Complete HVAC solution required for new pharmaceutical manufacturing facility. Includes design, installation, and 2-year AMC.',
    category: 'service',
    priority: 'medium',
    status: 'open',
    company: {
      id: 'company-345',
      name: 'PharmaCare Industries',
      logo: null,
      location: 'Hyderabad, Telangana',
      rating: 4.6,
      verified: true
    },
    budget: {
      min: 2500000,
      max: 4000000,
      currency: 'INR',
      display: '₹25,00,000 - ₹40,00,000'
    },
    deadline: '2025-02-15T23:59:59Z',
    postedDate: '2025-01-05T08:00:00Z',
    location: {
      state: 'Telangana',
      city: 'Hyderabad'
    },
    requirements: ['Pharma cleanroom experience', 'ISO 14644 compliance'],
    skills: ['HVAC', 'Cleanroom Design', 'Pharma Manufacturing'],
    responses: 6,
    daysLeft: 41,
    isClosingSoon: false,
    isSaved: false,
    hasApplied: false,
    aiRecommendation: {
      score: 85,
      reasoning: 'Matches your HVAC specialization',
      matchFactors: ['Service category', 'Technical expertise']
    }
  },
  {
    id: 'req-2025-006',
    title: 'Raw Material Supply - Steel Components',
    description: 'Regular supply contract for MS and SS steel components. Monthly requirement of 10-15 tons with specific grade specifications.',
    category: 'product',
    priority: 'low',
    status: 'open',
    company: {
      id: 'company-678',
      name: 'Precision Engineering Works',
      logo: null,
      location: 'Ahmedabad, Gujarat',
      rating: 4.0,
      verified: false
    },
    budget: {
      min: 500000,
      max: 800000,
      currency: 'INR',
      display: '₹5,00,000 - ₹8,00,000 /month'
    },
    deadline: '2025-01-30T23:59:59Z',
    postedDate: '2025-01-01T10:00:00Z',
    location: {
      state: 'Gujarat',
      city: 'Ahmedabad'
    },
    requirements: ['Mill test certificates', 'Consistent quality'],
    skills: ['Steel Supply', 'Raw Materials', 'B2B Supply Chain'],
    responses: 22,
    daysLeft: 25,
    isClosingSoon: false,
    isSaved: true,
    hasApplied: false,
    aiRecommendation: null
  }
];

const mockStats: RFQStats = {
  totalAvailable: 156,
  aiRecommended: 24,
  closingSoon: 8,
  newThisWeek: 32,
  appliedCount: 5,
  savedCount: 12,
  categoryBreakdown: {
    service: 45,
    product: 67,
    logistics: 28,
    professional: 16
  }
};

const mockFilterOptions: RFQBrowseFiltersResponse = {
  categories: [
    { key: 'service', label: 'Service', count: 45 },
    { key: 'product', label: 'Product', count: 67 },
    { key: 'logistics', label: 'Logistics', count: 28 },
    { key: 'professional', label: 'Professional', count: 16 }
  ],
  priorities: [
    { key: 'critical', label: 'Critical', count: 12 },
    { key: 'high', label: 'High', count: 45 },
    { key: 'medium', label: 'Medium', count: 78 },
    { key: 'low', label: 'Low', count: 21 }
  ],
  locations: [
    { key: 'Maharashtra', count: 35 },
    { key: 'Karnataka', count: 28 },
    { key: 'Gujarat', count: 22 },
    { key: 'Tamil Nadu', count: 18 },
    { key: 'Telangana', count: 15 }
  ],
  budgetRange: {
    min: 10000,
    max: 10000000
  }
};

interface UseVendorRFQsReturn {
  rfqs: RFQBrowseItem[];
  stats: RFQStats | null;
  filterOptions: RFQBrowseFiltersResponse | null;
  pagination: RFQBrowsePagination | null;
  isLoading: boolean;
  error: string | null;
  filters: RFQBrowseFilters;
  setFilters: (filters: RFQBrowseFilters) => void;
  clearFilters: () => void;
  toggleSaveRFQ: (rfqId: string) => void;
  refreshRFQs: () => void;
}

const defaultFilters: RFQBrowseFilters = {
  page: 1,
  limit: 12,
  sortBy: 'postedDate',
  sortOrder: 'desc'
};

export const useVendorRFQs = (): UseVendorRFQsReturn => {
  const [rfqs, setRfqs] = useState<RFQBrowseItem[]>(mockRFQs);
  const [stats, setStats] = useState<RFQStats | null>(mockStats);
  const [filterOptions] = useState<RFQBrowseFiltersResponse | null>(mockFilterOptions);
  const [pagination, setPagination] = useState<RFQBrowsePagination | null>({
    page: 1,
    limit: 12,
    total: mockRFQs.length,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error] = useState<string | null>(null);
  const [filters, setFiltersState] = useState<RFQBrowseFilters>(defaultFilters);

  const setFilters = useCallback((newFilters: RFQBrowseFilters) => {
    setFiltersState(newFilters);
    setIsLoading(true);

    // Simulate API call with filtering
    setTimeout(() => {
      let filteredRFQs = [...mockRFQs];

      if (newFilters.search) {
        const searchLower = newFilters.search.toLowerCase();
        filteredRFQs = filteredRFQs.filter(
          rfq =>
            rfq.title.toLowerCase().includes(searchLower) ||
            rfq.description.toLowerCase().includes(searchLower) ||
            rfq.company.name.toLowerCase().includes(searchLower)
        );
      }

      if (newFilters.category) {
        filteredRFQs = filteredRFQs.filter(rfq => rfq.category === newFilters.category);
      }

      if (newFilters.priority) {
        filteredRFQs = filteredRFQs.filter(rfq => rfq.priority === newFilters.priority);
      }

      if (newFilters.state) {
        filteredRFQs = filteredRFQs.filter(rfq => rfq.location.state === newFilters.state);
      }

      if (newFilters.status) {
        filteredRFQs = filteredRFQs.filter(rfq => rfq.status === newFilters.status);
      }

      if (newFilters.minBudget) {
        filteredRFQs = filteredRFQs.filter(rfq => rfq.budget.max >= newFilters.minBudget!);
      }

      if (newFilters.maxBudget) {
        filteredRFQs = filteredRFQs.filter(rfq => rfq.budget.min <= newFilters.maxBudget!);
      }

      // Sorting
      if (newFilters.sortBy) {
        filteredRFQs.sort((a, b) => {
          let comparison = 0;
          switch (newFilters.sortBy) {
            case 'deadline':
              comparison = new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
              break;
            case 'budget':
              comparison = a.budget.max - b.budget.max;
              break;
            case 'postedDate':
              comparison = new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
              break;
            case 'relevance':
              comparison = (b.aiRecommendation?.score || 0) - (a.aiRecommendation?.score || 0);
              break;
          }
          return newFilters.sortOrder === 'asc' ? comparison : -comparison;
        });
      }

      setRfqs(filteredRFQs);
      setPagination({
        page: newFilters.page || 1,
        limit: newFilters.limit || 12,
        total: filteredRFQs.length,
        totalPages: Math.ceil(filteredRFQs.length / (newFilters.limit || 12)),
        hasNextPage: false,
        hasPreviousPage: (newFilters.page || 1) > 1
      });
      setIsLoading(false);
    }, 300);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, [setFilters]);

  const toggleSaveRFQ = useCallback((rfqId: string) => {
    setRfqs(prev =>
      prev.map(rfq =>
        rfq.id === rfqId ? { ...rfq, isSaved: !rfq.isSaved } : rfq
      )
    );
    setStats(prev => {
      if (!prev) return prev;
      const rfq = rfqs.find(r => r.id === rfqId);
      if (!rfq) return prev;
      return {
        ...prev,
        savedCount: rfq.isSaved ? prev.savedCount - 1 : prev.savedCount + 1
      };
    });
  }, [rfqs]);

  const refreshRFQs = useCallback(() => {
    setFilters(filters);
  }, [filters, setFilters]);

  return {
    rfqs,
    stats,
    filterOptions,
    pagination,
    isLoading,
    error,
    filters,
    setFilters,
    clearFilters,
    toggleSaveRFQ,
    refreshRFQs
  };
};

// Hook for single RFQ detail
export const useVendorRFQDetail = (rfqId: string) => {
  const [rfq, setRfq] = useState<RFQDetailItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useState(() => {
    // Simulate API call
    setTimeout(() => {
      const mockRfq = mockRFQs.find(r => r.id === rfqId);
      if (mockRfq) {
        setRfq({
          ...mockRfq,
          timeline: {
            postedDate: mockRfq.postedDate,
            deadline: mockRfq.deadline,
            expectedStartDate: '2025-02-01',
            expectedDuration: '3 months',
            daysLeft: mockRfq.daysLeft
          },
          specifications: {
            requirements: mockRfq.requirements,
            skills: mockRfq.skills,
            deliverables: ['Complete solution', 'Documentation', 'Training'],
            technicalDetails: 'Detailed technical specifications...'
          },
          attachments: [
            {
              id: 'att-001',
              name: 'Technical_Requirements.pdf',
              type: 'application/pdf',
              size: 2456789,
              url: '#'
            }
          ],
          evaluation: {
            criteria: ['Price', 'Quality', 'Timeline', 'Experience'],
            weightage: { Price: 30, Quality: 35, Timeline: 20, Experience: 15 }
          }
        });
      } else {
        setError('RFQ not found');
      }
      setIsLoading(false);
    }, 500);
  });

  return { rfq, isLoading, error };
};
