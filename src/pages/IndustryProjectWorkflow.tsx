
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import IndustryHeader from '@/components/industry/IndustryHeader';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, CheckCircle, Clock } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

// Import workflow components
import { QuoteReviewTable } from '@/components/industry/workflow/QuoteReviewTable';
import { POTriggerCard } from '@/components/industry/workflow/POTriggerCard';
import { WorkTimeline } from '@/components/industry/workflow/WorkTimeline';
import { PaymentMilestoneTracker } from '@/components/industry/workflow/PaymentMilestoneTracker';
import { RetentionPaymentCard } from '@/components/industry/workflow/RetentionPaymentCard';

// Import types
import { ProjectWorkflow, VendorQuote, PaymentMilestone, WorkflowEvent, RetentionPayment } from '@/types/workflow';

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
    quotes: [
      {
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
      },
      {
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
      },
      {
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
      }
    ],
    paymentMilestones: [
      {
        id: 'm1',
        name: 'Advance Payment',
        percentage: 30,
        amount: 45000,
        status: 'pending',
        description: 'Initial payment to commence work'
      },
      {
        id: 'm2',
        name: 'Mid-project Payment',
        percentage: 40,
        amount: 60000,
        status: 'pending',
        description: 'Payment upon 50% project completion'
      },
      {
        id: 'm3',
        name: 'Completion Payment',
        percentage: 20,
        amount: 30000,
        status: 'pending',
        description: 'Payment upon project completion'
      }
    ],
    retentionPayment: {
      amount: 15000,
      percentage: 10,
      releaseDate: '2024-03-15',
      status: 'locked',
      delayPeriodDays: 30
    },
    timeline: [
      {
        id: 't1',
        type: 'quote_submitted',
        title: 'Quotes Received',
        description: '3 vendor quotes received for review',
        timestamp: '2024-01-16T10:00:00Z',
        status: 'completed'
      }
    ]
  });

  const handleAcceptQuote = (quoteId: string) => {
    const acceptedQuote = projectWorkflow.quotes.find(q => q.id === quoteId);
    if (acceptedQuote) {
      setProjectWorkflow(prev => ({
        ...prev,
        acceptedQuote,
        quotes: prev.quotes.map(q => 
          q.id === quoteId ? { ...q, status: 'accepted' } : { ...q, status: 'rejected' }
        ),
        timeline: [
          ...prev.timeline,
          {
            id: `t${Date.now()}`,
            type: 'quote_accepted',
            title: 'Quote Accepted',
            description: `Quote from ${acceptedQuote.vendorName} accepted`,
            timestamp: new Date().toISOString(),
            status: 'completed'
          }
        ]
      }));
      showSuccess(`Quote from ${acceptedQuote.vendorName} accepted successfully!`);
    }
  };

  const handleGeneratePO = () => {
    // In real app, this would navigate to CreatePurchaseOrder page or trigger PO generation
    const poNumber = `PO-${Date.now()}`;
    setProjectWorkflow(prev => ({
      ...prev,
      purchaseOrder: {
        id: `po${Date.now()}`,
        poNumber,
        vendorId: prev.acceptedQuote?.vendorId || '',
        amount: prev.acceptedQuote?.quoteAmount || 0,
        status: 'sent',
        createdDate: new Date().toISOString(),
        terms: 'Standard payment terms apply'
      },
      timeline: [
        ...prev.timeline,
        {
          id: `t${Date.now()}`,
          type: 'po_generated',
          title: 'Purchase Order Generated',
          description: `PO ${poNumber} sent to vendor`,
          timestamp: new Date().toISOString(),
          status: 'completed'
        }
      ]
    }));
    showSuccess('Purchase Order generated and sent to vendor!');
  };

  const handleReleasePayment = (milestoneId: string) => {
    setProjectWorkflow(prev => ({
      ...prev,
      paymentMilestones: prev.paymentMilestones.map(m =>
        m.id === milestoneId 
          ? { ...m, status: 'released', releasedDate: new Date().toISOString() }
          : m
      ),
      timeline: [
        ...prev.timeline,
        {
          id: `t${Date.now()}`,
          type: 'payment_released',
          title: 'Payment Released',
          description: `Milestone payment released`,
          timestamp: new Date().toISOString(),
          status: 'completed'
        }
      ]
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <IndustryHeader />
      
      <main className="flex-1 container max-w-7xl mx-auto px-4 py-8 pt-20">
        {/* Header Section */}
        <div className="mb-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink onClick={handleBackToDashboard} className="cursor-pointer">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/projects" className="cursor-pointer">
                  Projects
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage>Project Workflow</BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {projectWorkflow.projectTitle}
              </h1>
              <p className="text-gray-600">
                Requirement ID: {projectWorkflow.requirementId} | 
                Total Value: ${projectWorkflow.totalProjectValue.toLocaleString()}
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={handleBackToDashboard}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>
        </div>

        {/* Workflow Progress Indicator */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="font-semibold mb-4">Workflow Progress</h2>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isQuoteAccepted ? 'bg-green-600' : 'bg-blue-600'}`}></div>
              <span className={isQuoteAccepted ? 'text-green-600 font-medium' : 'text-blue-600 font-medium'}>
                {isQuoteAccepted ? 'Quote Accepted' : 'Quote Review'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isPOGenerated ? 'bg-green-600' : isQuoteAccepted ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
              <span className={isPOGenerated ? 'text-green-600 font-medium' : isQuoteAccepted ? 'text-blue-600 font-medium' : 'text-gray-500'}>
                Purchase Order
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isWorkCompleted ? 'bg-green-600' : isPOGenerated ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
              <span className={isWorkCompleted ? 'text-green-600 font-medium' : isPOGenerated ? 'text-blue-600 font-medium' : 'text-gray-500'}>
                Work & Payments
              </span>
            </div>
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
