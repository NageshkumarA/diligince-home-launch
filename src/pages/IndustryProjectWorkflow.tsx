import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import IndustryHeader from '@/components/industry/IndustryHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FileText, CheckCircle, Clock, MapPin, Star, Users, Briefcase, RefreshCw } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

// Import workflow components
import { QuoteReviewTable } from '@/components/industry/workflow/QuoteReviewTable';
import { POTriggerCard } from '@/components/industry/workflow/POTriggerCard';
import { WorkTimeline } from '@/components/industry/workflow/WorkTimeline';
import { PaymentMilestoneTracker } from '@/components/industry/workflow/PaymentMilestoneTracker';
import { RetentionPaymentCard } from '@/components/industry/workflow/RetentionPaymentCard';
import { SendRFQModal } from '@/components/industry/SendRFQModal';
import { AIEvaluationPanel } from '@/components/industry/workflow/AIEvaluationPanel';
import { QuoteComparisonCard } from '@/components/industry/workflow/QuoteComparisonCard';
import { QuoteStatusTracker } from '@/components/industry/workflow/QuoteStatusTracker';

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

  // RFQ Modal State
  const [isRFQModalOpen, setIsRFQModalOpen] = useState(false);
  const [selectedStakeholder, setSelectedStakeholder] = useState<any>(null);
  const [sentRFQs, setSentRFQs] = useState<Set<string>>(new Set());

  // New state for AI evaluation and quote tracking
  const [rfqStatuses, setRfqStatuses] = useState<any[]>([]);
  const [quotesReceived, setQuotesReceived] = useState(false);
  const [aiEvaluations, setAiEvaluations] = useState<Map<string, any>>(new Map());

  // Mock project workflow data
  const [projectWorkflow, setProjectWorkflow] = useState<ProjectWorkflow>({
    id: projectId || '1',
    requirementId: 'REQ-2024-001',
    projectTitle: 'Industrial Equipment Procurement',
    totalProjectValue: 150000,
    workStatus: 'not_started',
    quotes: [], // Start with empty quotes
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
    timeline: []
  });

  // Generate mock AI evaluations for quotes
  const generateAIEvaluation = (quote: VendorQuote) => {
    const priceScore = Math.max(1, 10 - (quote.quoteAmount - 140000) / 5000);
    const deliveryScore = Math.max(1, 10 - (quote.deliveryTimeWeeks - 6) * 0.5);
    const ratingScore = quote.vendorRating * 2;
    const specializationScore = 7 + Math.random() * 2;
    const performanceScore = 6 + Math.random() * 3;
    
    const overallScore = (
      priceScore * 0.3 + 
      deliveryScore * 0.25 + 
      ratingScore * 0.2 + 
      specializationScore * 0.15 + 
      performanceScore * 0.1
    );

    let recommendation = null;
    let reasoning = '';
    
    if (overallScore >= 8.5) {
      recommendation = 'top_pick';
      reasoning = 'Excellent overall balance of price, delivery speed, and vendor reliability. Highly recommended choice.';
    } else if (priceScore >= 8) {
      recommendation = 'best_value';
      reasoning = 'Offers competitive pricing while maintaining good quality standards and reasonable delivery timeline.';
    } else if (deliveryScore >= 9) {
      recommendation = 'fastest_delivery';
      reasoning = 'Fastest delivery option available while maintaining acceptable quality and pricing standards.';
    } else if (ratingScore >= 9) {
      recommendation = 'highest_rated';
      reasoning = 'Top-rated vendor with excellent track record and customer satisfaction scores.';
    }

    return {
      overallScore: Math.round(overallScore * 10) / 10,
      priceScore: Math.round(priceScore * 10) / 10,
      deliveryScore: Math.round(deliveryScore * 10) / 10,
      ratingScore: Math.round(ratingScore * 10) / 10,
      specializationScore: Math.round(specializationScore * 10) / 10,
      performanceScore: Math.round(performanceScore * 10) / 10,
      recommendation,
      reasoning,
      riskLevel: overallScore >= 8 ? 'low' : overallScore >= 6 ? 'medium' : 'high'
    };
  };

  // Simulate quote receiving process
  const simulateQuoteReceiving = () => {
    setTimeout(() => {
      const mockQuotes = [
        {
          id: 'q1',
          vendorId: 'stakeholder-1',
          vendorName: 'TechValve Solutions',
          vendorRating: 4.8,
          quoteAmount: 145000,
          deliveryTimeWeeks: 6,
          proposalSummary: 'Complete industrial valve system with premium quality components and 2-year warranty',
          submittedDate: new Date().toISOString().split('T')[0],
          status: 'pending' as const,
          documents: ['proposal.pdf', 'technical-specs.pdf']
        },
        {
          id: 'q2',
          vendorId: 'stakeholder-2',
          vendorName: 'Pipeline Inspection Experts',
          vendorRating: 4.9,
          quoteAmount: 155000,
          deliveryTimeWeeks: 8,
          proposalSummary: 'Comprehensive pipeline inspection and valve installation with certification',
          submittedDate: new Date().toISOString().split('T')[0],
          status: 'pending' as const,
          documents: ['proposal.pdf']
        }
      ];

      // Generate AI evaluations
      const evaluations = new Map();
      mockQuotes.forEach(quote => {
        evaluations.set(quote.id, generateAIEvaluation(quote));
      });

      setProjectWorkflow(prev => ({
        ...prev,
        quotes: mockQuotes,
        timeline: [...prev.timeline, {
          id: `t${Date.now()}`,
          type: 'quote_submitted',
          title: 'Quotes Received & AI Analyzed',
          description: `${mockQuotes.length} vendor quotes received and analyzed by AI`,
          timestamp: new Date().toISOString(),
          status: 'completed'
        }]
      }));

      setAiEvaluations(evaluations);
      setQuotesReceived(true);
      showSuccess(`${mockQuotes.length} quotes received and analyzed by AI!`);
    }, 3000); // 3 second delay
  };

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

  const handleSendRFQ = (stakeholder: any) => {
    setSelectedStakeholder(stakeholder);
    setIsRFQModalOpen(true);
  };

  const handleRFQSent = (stakeholderId: string) => {
    setSentRFQs(prev => new Set([...prev, stakeholderId]));
    
    const stakeholder = mockMatchedStakeholders.find(s => s.id === stakeholderId);
    if (stakeholder) {
      setRfqStatuses(prev => [...prev, {
        stakeholderName: stakeholder.name,
        stakeholderType: stakeholder.type,
        rfqSentDate: new Date().toLocaleDateString(),
        quoteStatus: 'sent',
        expectedDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString()
      }]);

      // Simulate quote receiving after delay
      if (!quotesReceived && rfqStatuses.length === 0) {
        showSuccess('RFQ sent! Quotes expected in 2-3 days...');
        simulateQuoteReceiving();
      } else {
        showSuccess('RFQ Sent (Mock) — Functionality Not Yet Connected');
      }
    }
  };

  const handleCheckForQuotes = () => {
    simulateQuoteReceiving();
  };

  const isQuoteAccepted = projectWorkflow.acceptedQuote !== undefined;
  const isPOGenerated = projectWorkflow.purchaseOrder !== undefined;
  const isWorkCompleted = projectWorkflow.workStatus === 'completed' || projectWorkflow.workStatus === 'approved';

  const hasReceivedQuotes = projectWorkflow.quotes.length > 0;

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
                    {sentRFQs.has(stakeholder.id) ? (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full" 
                        disabled
                      >
                        RFQ Sent
                      </Button>
                    ) : (
                      <Button 
                        size="sm" 
                        className="w-full bg-blue-600 hover:bg-blue-700" 
                        onClick={() => handleSendRFQ(stakeholder)}
                      >
                        Send RFQ
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quote Status Tracker - Show after RFQs are sent */}
        {rfqStatuses.length > 0 && (
          <div className="mb-8">
            <QuoteStatusTracker 
              rfqStatuses={rfqStatuses}
              totalRFQsSent={sentRFQs.size}
              quotesReceived={projectWorkflow.quotes.length}
            />
          </div>
        )}

        {/* Manual Quote Check Button - Show when RFQs sent but no quotes received */}
        {sentRFQs.size > 0 && !quotesReceived && (
          <div className="mb-8 p-6 rounded-xl shadow-sm border bg-white text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Waiting for Vendor Responses</h3>
            <p className="text-gray-600 mb-4">Quotes are expected within 2-3 business days</p>
            <Button onClick={handleCheckForQuotes} className="bg-blue-600 hover:bg-blue-700">
              <RefreshCw className="h-4 w-4 mr-2" />
              Check for New Quotes
            </Button>
          </div>
        )}

        {/* AI Evaluation Panel - Show when quotes are received */}
        {hasReceivedQuotes && !isQuoteAccepted && (
          <div className="mb-8">
            <AIEvaluationPanel />
          </div>
        )}

        {/* Enhanced Quote Comparison - Show AI-evaluated quotes in cards */}
        {hasReceivedQuotes && !isQuoteAccepted && (
          <div className="mb-8">
            <div className="mb-6">
              <h2 className="font-semibold text-gray-900 text-xl mb-2">AI-Analyzed Quote Comparison</h2>
              <p className="text-sm text-gray-600">
                Our AI has analyzed {projectWorkflow.quotes.length} quotes based on multiple criteria. 
                Review the recommendations below and choose the quote that best fits your needs.
              </p>
            </div>
            
            {/* Enhanced Quote Review Table with AI Features */}
            <QuoteReviewTable 
              quotes={projectWorkflow.quotes} 
              onAcceptQuote={handleAcceptQuote}
              aiEvaluations={aiEvaluations}
            />
            
            {/* Optional: Card View Toggle (for future enhancement) */}
            <div className="mt-4 text-center">
              <Button 
                variant="outline" 
                size="sm"
                className="text-gray-600 hover:text-gray-700 border-gray-300"
                disabled
              >
                Switch to Card View (Coming Soon)
              </Button>
            </div>
          </div>
        )}

        {/* Conditional Component Rendering */}
        <div className="space-y-8">
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

      {/* RFQ Modal */}
      {selectedStakeholder && (
        <SendRFQModal
          isOpen={isRFQModalOpen}
          onClose={() => setIsRFQModalOpen(false)}
          stakeholder={selectedStakeholder}
          requirementTitle={projectWorkflow.projectTitle}
          onSendRFQ={handleRFQSent}
        />
      )}
    </div>
  );
};

export default IndustryProjectWorkflow;
