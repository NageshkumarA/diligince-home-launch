import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import IndustryHeader from '@/components/industry/IndustryHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FileText, CheckCircle, Clock, MapPin, Star, Users, Briefcase } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

// Import workflow components
import { QuoteReviewTable } from '@/components/industry/workflow/QuoteReviewTable';
import { POTriggerCard } from '@/components/industry/workflow/POTriggerCard';
import { WorkTimeline } from '@/components/industry/workflow/WorkTimeline';
import { PaymentMilestoneTracker } from '@/components/industry/workflow/PaymentMilestoneTracker';
import { RetentionPaymentCard } from '@/components/industry/workflow/RetentionPaymentCard';

// Import types
import { ProjectWorkflow, VendorQuote, PaymentMilestone, WorkflowEvent, RetentionPayment } from '@/types/workflow';

// Static mock data for matched stakeholders
const mockMatchedStakeholders = [
  {
    id: 'stakeholder-1',
    name: 'TechValve Solutions',
    type: 'Product Vendor',
    location: 'Hyderabad, Telangana',
    specializations: ['Industrial Valves', 'Pressure Systems', 'Quality Control'],
    rating: 4.8,
    totalProjects: 156,
    description: 'Leading manufacturer of industrial valves and pressure control systems'
  },
  {
    id: 'stakeholder-2',
    name: 'Pipeline Inspection Experts',
    type: 'Service Vendor',
    location: 'Mumbai, Maharashtra',
    specializations: ['Pipeline Inspection', 'NDT Testing', 'Safety Compliance'],
    rating: 4.9,
    totalProjects: 89,
    description: 'Specialized pipeline inspection and non-destructive testing services'
  },
  {
    id: 'stakeholder-3',
    name: 'Dr. Rajesh Kumar',
    type: 'Professional Expert',
    location: 'Bangalore, Karnataka',
    specializations: ['Chemical Engineering', 'Process Optimization', 'ISO Compliance'],
    rating: 4.7,
    totalProjects: 67,
    description: 'Senior Chemical Engineer with 15+ years in industrial process optimization'
  },
  {
    id: 'stakeholder-4',
    name: 'SwiftMove Logistics',
    type: 'Logistics Vendor',
    location: 'Chennai, Tamil Nadu',
    specializations: ['Heavy Equipment Transport', 'Industrial Logistics', 'Warehousing'],
    rating: 4.6,
    totalProjects: 234,
    description: 'Comprehensive logistics solutions for industrial equipment and materials'
  }
];

const IndustryProjectWorkflow = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { showSuccess, showError } = useNotifications();

  // Mock project workflow data
  const [projectWorkflow, setProjectWorkflow] = useState<ProjectWorkflow>({
    id: projectId || '1',
    requirementId: 'REQ-2024-001',
    projectTitle: 'Industrial Equipment Procurement',
    totalProjectValue: 150000,
    workStatus: 'not_started',
    quotes: [{
      id: 'q1',
      vendorId: 'v1',
      vendorName: 'Acme Industrial Supplies',
      vendorRating: 4.8,
      quoteAmount: 150000,
      deliveryTimeWeeks: 8,
      proposalSummary: 'Complete industrial equipment package including installation and training',
      submittedDate: '2024-01-15',
      status: 'pending',
      documents: ['proposal.pdf', 'technical-specs.pdf']
    }, {
      id: 'q2',
      vendorId: 'v2',
      vendorName: 'Tech Manufacturing Co.',
      vendorRating: 4.5,
      quoteAmount: 165000,
      deliveryTimeWeeks: 6,
      proposalSummary: 'Premium equipment solution with extended warranty and 24/7 support',
      submittedDate: '2024-01-14',
      status: 'pending',
      documents: ['proposal.pdf']
    }, {
      id: 'q3',
      vendorId: 'v3',
      vendorName: 'Global Equipment Ltd.',
      vendorRating: 4.2,
      quoteAmount: 142000,
      deliveryTimeWeeks: 10,
      proposalSummary: 'Cost-effective solution with standard warranty and support package',
      submittedDate: '2024-01-16',
      status: 'pending',
      documents: ['proposal.pdf', 'warranty-terms.pdf']
    }],
    paymentMilestones: [{
      id: 'm1',
      name: 'Advance Payment',
      percentage: 30,
      amount: 45000,
      status: 'pending',
      description: 'Initial payment to commence work'
    }, {
      id: 'm2',
      name: 'Mid-project Payment',
      percentage: 40,
      amount: 60000,
      status: 'pending',
      description: 'Payment upon 50% project completion'
    }, {
      id: 'm3',
      name: 'Completion Payment',
      percentage: 20,
      amount: 30000,
      status: 'pending',
      description: 'Payment upon project completion'
    }],
    retentionPayment: {
      amount: 15000,
      percentage: 10,
      releaseDate: '2024-03-15',
      status: 'locked',
      delayPeriodDays: 30
    },
    timeline: [{
      id: 't1',
      type: 'quote_submitted',
      title: 'Quotes Received',
      description: '3 vendor quotes received for review',
      timestamp: '2024-01-16T10:00:00Z',
      status: 'completed'
    }]
  });

  const handleAcceptQuote = (quoteId: string) => {
    const acceptedQuote = projectWorkflow.quotes.find(q => q.id === quoteId);
    if (acceptedQuote) {
      setProjectWorkflow(prev => ({
        ...prev,
        acceptedQuote,
        quotes: prev.quotes.map(q => q.id === quoteId ? {
          ...q,
          status: 'accepted'
        } : {
          ...q,
          status: 'rejected'
        }),
        timeline: [...prev.timeline, {
          id: `t${Date.now()}`,
          type: 'quote_accepted',
          title: 'Quote Accepted',
          description: `Quote from ${acceptedQuote.vendorName} accepted`,
          timestamp: new Date().toISOString(),
          status: 'completed'
        }]
      }));
      showSuccess(`Quote from ${acceptedQuote.vendorName} accepted successfully!`);
    }
  };

  const handleGeneratePO = () => {
    // Navigate to CreatePurchaseOrder page with pre-populated data
    const acceptedQuote = projectWorkflow.acceptedQuote;
    if (acceptedQuote) {
      const queryParams = new URLSearchParams({
        vendorId: acceptedQuote.vendorId,
        vendorName: acceptedQuote.vendorName,
        amount: acceptedQuote.quoteAmount.toString(),
        projectTitle: projectWorkflow.projectTitle,
        requirementId: projectWorkflow.requirementId
      });
      navigate(`/create-purchase-order?${queryParams.toString()}`);
    }
  };

  const handleUploadPO = (file: File, poNumber: string) => {
    // Handle manual PO upload
    const acceptedQuote = projectWorkflow.acceptedQuote;
    if (acceptedQuote) {
      setProjectWorkflow(prev => ({
        ...prev,
        purchaseOrder: {
          id: `po${Date.now()}`,
          poNumber,
          vendorId: acceptedQuote.vendorId,
          amount: acceptedQuote.quoteAmount,
          status: 'sent',
          createdDate: new Date().toISOString(),
          terms: 'Manual upload - terms as per uploaded document',
          poType: 'uploaded',
          uploadedDocument: file.name,
          iso9001Compliance: true
        },
        timeline: [...prev.timeline, {
          id: `t${Date.now()}`,
          type: 'po_generated',
          title: 'Manual Purchase Order Uploaded',
          description: `PO ${poNumber} uploaded and sent to vendor`,
          timestamp: new Date().toISOString(),
          status: 'completed'
        }]
      }));
      showSuccess(`Purchase Order ${poNumber} uploaded and sent to vendor successfully!`);
    }
  };

  const handleReleasePayment = (milestoneId: string) => {
    setProjectWorkflow(prev => ({
      ...prev,
      paymentMilestones: prev.paymentMilestones.map(m => m.id === milestoneId ? {
        ...m,
        status: 'released',
        releasedDate: new Date().toISOString()
      } : m),
      timeline: [...prev.timeline, {
        id: `t${Date.now()}`,
        type: 'payment_released',
        title: 'Payment Released',
        description: `Milestone payment released`,
        timestamp: new Date().toISOString(),
        status: 'completed'
      }]
    }));
    showSuccess('Payment released successfully!');
  };

  const handleReleaseRetention = () => {
    setProjectWorkflow(prev => ({
      ...prev,
      retentionPayment: {
        ...prev.retentionPayment,
        status: 'released'
      }
    }));
    showSuccess('Retention payment released successfully!');
  };

  const handleDownloadCertificate = () => {
    showSuccess('Completion certificate downloaded!');
  };

  const handleBackToDashboard = () => {
    navigate('/');
  };

  const isQuoteAccepted = projectWorkflow.acceptedQuote !== undefined;
  const isPOGenerated = projectWorkflow.purchaseOrder !== undefined;
  const isWorkCompleted = projectWorkflow.workStatus === 'completed' || projectWorkflow.workStatus === 'approved';

  const getStakeholderTypeColor = (type: string) => {
    switch (type) {
      case 'Product Vendor':
        return 'bg-purple-100 text-purple-800';
      case 'Service Vendor':
        return 'bg-blue-100 text-blue-800';
      case 'Logistics Vendor':
        return 'bg-orange-100 text-orange-800';
      case 'Professional Expert':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStarRating = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">({rating})</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <IndustryHeader />
      
      <main className="flex-1 container max-w-7xl mx-auto px-4 py-8 pt-20">
        {/* Header Section */}
        <div className="mb-8">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink onClick={handleBackToDashboard} className="cursor-pointer text-blue-600 hover:text-blue-700">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/projects" className="cursor-pointer text-blue-600 hover:text-blue-700">
                  Projects
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage className="text-gray-700">Project Workflow</BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {projectWorkflow.projectTitle}
              </h1>
              <p className="text-gray-600 text-lg">
                Requirement ID: <span className="font-medium text-gray-800">{projectWorkflow.requirementId}</span> | 
                Total Value: <span className="font-semibold text-blue-600">${projectWorkflow.totalProjectValue.toLocaleString()}</span>
              </p>
            </div>
            <Button variant="outline" onClick={handleBackToDashboard} className="flex items-center gap-2 border-blue-200 text-blue-700 hover:bg-blue-50">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>
        </div>

        {/* Workflow Progress Indicator */}
        <div className="mb-8 p-6 rounded-xl shadow-sm border bg-white">
          <h2 className="font-semibold mb-6 text-gray-900 text-xl">Workflow Progress</h2>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full ${isQuoteAccepted ? 'bg-green-500' : 'bg-blue-500'}`}></div>
              <span className={`font-medium ${isQuoteAccepted ? 'text-green-600' : 'text-blue-600'}`}>
                {isQuoteAccepted ? 'Quote Accepted' : 'Quote Review'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full ${isPOGenerated ? 'bg-green-500' : isQuoteAccepted ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
              <span className={`font-medium ${isPOGenerated ? 'text-green-600' : isQuoteAccepted ? 'text-blue-600' : 'text-gray-500'}`}>
                Purchase Order
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full ${isWorkCompleted ? 'bg-green-500' : isPOGenerated ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
              <span className={`font-medium ${isWorkCompleted ? 'text-green-600' : isPOGenerated ? 'text-blue-600' : 'text-gray-500'}`}>
                Work & Payments
              </span>
            </div>
          </div>
        </div>

        {/* Top Matched Stakeholders Section */}
        <div className="mb-8 p-6 rounded-xl shadow-sm border bg-white">
          <div className="mb-6">
            <h2 className="font-semibold text-gray-900 text-xl mb-2">Top Matched Stakeholders (AI-Shortlisted)</h2>
            <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-200">
              These stakeholders were shortlisted by our AI based on category match, specialization, and quality rating.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockMatchedStakeholders.map((stakeholder) => (
              <Card key={stakeholder.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-lg font-medium text-gray-900">
                      {stakeholder.name}
                    </CardTitle>
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      AI Matched
                    </Badge>
                  </div>
                  <Badge className={getStakeholderTypeColor(stakeholder.type)}>
                    {stakeholder.type}
                  </Badge>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{stakeholder.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    {renderStarRating(stakeholder.rating)}
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Briefcase className="h-3 w-3" />
                      <span>{stakeholder.totalProjects}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="font-medium text-sm text-gray-700">Specializations:</p>
                    <div className="flex flex-wrap gap-1">
                      {stakeholder.specializations.map((spec, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-3 space-y-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full" 
                      disabled
                    >
                      View Profile
                    </Button>
                    <Button 
                      size="sm" 
                      className="w-full bg-blue-600 hover:bg-blue-700" 
                      disabled
                    >
                      Send RFQ
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Conditional Component Rendering */}
        <div className="space-y-8">
          {/* Quote Review Stage */}
          {!isQuoteAccepted && (
            <QuoteReviewTable 
              quotes={projectWorkflow.quotes} 
              onAcceptQuote={handleAcceptQuote} 
            />
          )}

          {/* PO Generation Stage */}
          {isQuoteAccepted && !isPOGenerated && projectWorkflow.acceptedQuote && (
            <POTriggerCard 
              acceptedQuote={projectWorkflow.acceptedQuote} 
              onGeneratePO={handleGeneratePO}
              onUploadPO={handleUploadPO}
            />
          )}

          {/* Work Tracking Stage */}
          {isPOGenerated && (
            <div className="grid lg:grid-cols-2 gap-8">
              <WorkTimeline 
                timeline={projectWorkflow.timeline} 
                workStatus={projectWorkflow.workStatus} 
              />
              <PaymentMilestoneTracker 
                milestones={projectWorkflow.paymentMilestones} 
                onReleasePayment={handleReleasePayment} 
                totalProjectValue={projectWorkflow.totalProjectValue} 
              />
            </div>
          )}

          {/* Retention Payment Stage */}
          {isWorkCompleted && (
            <RetentionPaymentCard 
              retentionPayment={projectWorkflow.retentionPayment} 
              onReleaseRetention={handleReleaseRetention} 
              onDownloadCertificate={handleDownloadCertificate} 
              projectCompleted={isWorkCompleted} 
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default IndustryProjectWorkflow;
