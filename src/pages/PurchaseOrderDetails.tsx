import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { ArrowLeft, Download, FileText, CheckCircle, XCircle, Edit, Send } from 'lucide-react';
import { purchaseOrdersService } from '@/services/modules/purchase-orders';
import VendorPurchaseOrderDetails from './VendorPurchaseOrderDetails';
import { DetailPageSkeleton } from '@/components/shared/loading';
import { POOverviewTab } from '@/components/purchase-order/POOverviewTab';
import { POLineItemsTab } from '@/components/purchase-order/POLineItemsTab';
import { POMilestonesTab } from '@/components/purchase-order/POMilestonesTab';
import { PODeliveryTab } from '@/components/purchase-order/PODeliveryTab';
import { POInvoicesTab } from '@/components/purchase-order/POInvoicesTab';
import { POAcceptanceCriteriaTab } from '@/components/purchase-order/POAcceptanceCriteriaTab';
import { POActivityTab } from '@/components/purchase-order/POActivityTab';
import { PODocumentsTab } from '@/components/purchase-order/PODocumentsTab';
import { exportPOToPDF } from '@/services/pdf-generator';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/contexts/UserContext';
import { useSendPO } from '@/hooks/useSendPO';

const PurchaseOrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useUser();
  const { mutate: sendPO, isPending: isSendingPO } = useSendPO();
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);

  // Check user type for vendor detection (userType is more reliable than role)
  const isVendorUser = user?.userType === 'Vendor';

  // If user is a vendor, use the vendor-specific component
  if (isVendorUser) {
    return <VendorPurchaseOrderDetails />;
  }

  // Otherwise, continue with industry PO details

  const { data: poDetail, isLoading, error } = useQuery({
    queryKey: ['purchase-order', id],
    queryFn: async () => {
      const response = await purchaseOrdersService.getById(id!);
      return response.data;
    },
    enabled: !!id,
  });

  const getStatusColor = (status: string) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      pending_approval: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-blue-100 text-blue-800',
      in_progress: 'bg-purple-100 text-purple-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const handleApprove = async () => {
    if (!id) return;
    await purchaseOrdersService.approve(id, 'Approved');
  };

  const handleReject = async () => {
    if (!id) return;
    await purchaseOrdersService.reject(id, 'Rejected');
  };

  const handleExportPDF = async () => {
    if (!poDetail) return;

    try {
      // Use client-side PDF generation
      await exportPOToPDF(poDetail);
      toast({
        title: 'Success',
        description: 'PDF exported successfully',
      });
    } catch (error) {
      console.error('PDF export failed:', error);
      toast({
        title: 'Error',
        description: 'Failed to export PDF',
        variant: 'destructive',
      });
    }
  };

  const handleSubmitPO = () => {
    setShowSubmitDialog(true);
  };

  const confirmSubmit = () => {
    if (!id) return;
    sendPO({ poId: id });
    setShowSubmitDialog(false);
  };

  // Comprehensive PO validation for submission
  // IMPORTANT: This must be before any early returns to comply with Rules of Hooks
  const validatePOForSubmission = useMemo(() => {
    const errors: string[] = [];

    // Handle loading or error states
    if (!poDetail) {
      return {
        isValid: false,
        errors: ['Loading purchase order...'],
        totalMilestonePercentage: 0
      };
    }

    const po = poDetail;

    // Basic info validation
    if (!po.projectTitle || po.projectTitle.trim().length < 3) {
      errors.push('Project title is required (minimum 3 characters)');
    }

    if (!po.scopeOfWork || po.scopeOfWork.trim().length < 10) {
      errors.push('Scope of work is required (minimum 10 characters)');
    }

    if (!po.startDate) {
      errors.push('Start date is required');
    }

    if (!po.endDate) {
      errors.push('End date is required');
    }

    if (!po.paymentTerms || (typeof po.paymentTerms === 'string' && po.paymentTerms.trim().length === 0)) {
      errors.push('Payment terms are required');
    }

    // Deliverables validation
    if (!po.deliverables || po.deliverables.length === 0) {
      errors.push('At least one deliverable is required');
    } else {
      const invalidDeliverables = po.deliverables.some(d =>
        !d.description || !d.quantity || !d.unit || !d.unitPrice
      );
      if (invalidDeliverables) {
        errors.push('All deliverables must have complete information');
      }
    }

    // Milestones validation
    if (!po.paymentMilestones || po.paymentMilestones.length === 0) {
      errors.push('At least one payment milestone is required');
    } else {
      const totalPercentage = po.paymentMilestones.reduce((sum, m) => sum + (m.percentage || 0), 0);
      if (totalPercentage !== 100) {
        errors.push(`Milestone percentages must total 100% (currently ${totalPercentage}%)`);
      }

      const invalidMilestones = po.paymentMilestones.some(m =>
        !m.description || !m.percentage || !m.dueDate
      );
      if (invalidMilestones) {
        errors.push('All milestones must have complete information');
      }
    }

    // Acceptance criteria validation
    if (!po.acceptanceCriteria || po.acceptanceCriteria.length === 0) {
      errors.push('At least one acceptance criteria is required');
    } else {
      const invalidCriteria = po.acceptanceCriteria.some(c => !c.criteria || c.criteria.trim().length === 0);
      if (invalidCriteria) {
        errors.push('All acceptance criteria must have descriptions');
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      totalMilestonePercentage: po.paymentMilestones?.reduce((sum, m) => sum + (m.percentage || 0), 0) || 0
    };
  }, [poDetail]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/30">
        <div className="container mx-auto p-6 space-y-6">
          <DetailPageSkeleton showTabs tabCount={7} sections={2} />
        </div>
      </div>
    );
  }

  if (error || !poDetail) {
    return (
      <div className="p-6">
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Purchase order not found</p>
          <Button onClick={() => navigate('/dashboard/industry-purchase-orders')} className="mt-4">
            Go to Purchase Orders
          </Button>
        </Card>
      </div>
    );
  }

  const po = poDetail;

  // Role-based access control - use userType for reliable vendor/industry detection
  const isVendor = user?.userType === 'Vendor';
  const isIndustry = user?.userType === 'Industry' || user?.role === 'industry';

  // Only vendors can approve/reject POs sent to them
  const showApprovalActions = po.status === 'pending_approval' && isVendor;

  const isPOComplete = validatePOForSubmission.isValid;
  const totalMilestonePercentage = validatePOForSubmission.totalMilestonePercentage;

  // Only industry users can edit (not vendors)
  const canEdit = (po.status === 'draft' || po.status === 'cancelled') && isIndustry;

  // Use permissions from API if available, otherwise fallback to status check
  // Can only submit if editable AND form is complete
  const canSubmit = (po.permissions?.canSubmit ?? ((po.status === 'draft' || po.status === 'cancelled') && isIndustry)) && isPOComplete;

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto p-6 space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(
              isVendor
                ? '/dashboard/service-vendor'  // Vendor dashboard
                : '/dashboard/industry-purchase-orders'  // Industry PO list
            )}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {isVendor ? 'Dashboard' : 'Purchase Orders'}
          </Button>
        </div>

        {/* Header */}
        <Card className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{po.orderNumber}</h1>
                <Badge className={getStatusColor(po.status)}>
                  {po.status ? po.status.replace(/_/g, ' ').toUpperCase() : 'UNKNOWN'}
                </Badge>
              </div>
              <p className="text-muted-foreground">{po.projectTitle}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Vendor: {po.vendor?.name || po.vendorName || 'N/A'}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {showApprovalActions && (
                <>
                  <Button onClick={handleApprove} className="gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Approve
                  </Button>
                  <Button onClick={handleReject} variant="destructive" className="gap-2">
                    <XCircle className="h-4 w-4" />
                    Reject
                  </Button>
                </>
              )}
              <Button onClick={handleExportPDF} variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export PDF
              </Button>
              {canEdit && (
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => navigate(`/dashboard/purchase-orders/${id}/edit`)}
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              )}
              {canSubmit && (
                <Button
                  onClick={handleSubmitPO}
                  disabled={isSendingPO}
                  className="gap-2"
                >
                  <Send className="h-4 w-4" />
                  {isSendingPO ? 'Submitting...' : 'Submit PO'}
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="items">Line Items</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="acceptance">Acceptance Criteria</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="delivery">Delivery</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="activity">Activity Log</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <POOverviewTab po={po} />
          </TabsContent>

          <TabsContent value="items">
            <POLineItemsTab deliverables={po.deliverables} />
          </TabsContent>

          <TabsContent value="milestones">
            <POMilestonesTab orderId={po.id} milestones={po.paymentMilestones} />
          </TabsContent>

          <TabsContent value="acceptance">
            <POAcceptanceCriteriaTab criteria={po.acceptanceCriteria || []} />
          </TabsContent>

          <TabsContent value="documents">
            <PODocumentsTab orderId={po.id} documents={po.documents || []} />
          </TabsContent>

          <TabsContent value="delivery">
            <PODeliveryTab orderId={po.id} delivery={po.deliveryTracking} />
          </TabsContent>

          <TabsContent value="invoices">
            <POInvoicesTab orderId={po.id} invoices={po.invoices || []} />
          </TabsContent>

          <TabsContent value="activity">
            <POActivityTab orderId={po.id} activities={po.activityLog} />
          </TabsContent>
        </Tabs>

        {/* Submit Confirmation Dialog */}
        <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Submit Purchase Order?</AlertDialogTitle>
              <AlertDialogDescription>
                {isPOComplete ? (
                  <>
                    This will submit the purchase order for approval and notify the vendor.

                    <div className="mt-4 space-y-2 border-t pt-4">
                      <p className="font-semibold text-foreground">Order Summary:</p>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">PO Number:</span>
                          <span className="font-medium text-foreground">{po.orderNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Vendor:</span>
                          <span className="font-medium text-foreground">{po.vendor?.name || po.vendorName || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Value:</span>
                          <span className="font-medium text-foreground">{po.currency} {po.totalValue?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Deliverables:</span>
                          <span className="font-medium text-foreground">{po.deliverables?.length || 0} items</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Payment Milestones:</span>
                          <span className="font-medium text-foreground">{po.paymentMilestones?.length || 0} milestones ({totalMilestonePercentage}%)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Acceptance Criteria:</span>
                          <span className="font-medium text-foreground">{po.acceptanceCriteria?.length || 0} criteria</span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="mt-4 space-y-3">
                    <p className="font-semibold text-destructive">⚠️ Cannot submit - Please complete the following:</p>
                    <ul className="text-sm space-y-1.5 pl-4">
                      {validatePOForSubmission.errors.map((error, idx) => (
                        <li key={idx} className="text-destructive flex items-start gap-2">
                          <span className="text-destructive mt-0.5">•</span>
                          <span>{error}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm text-muted-foreground mt-3 pt-3 border-t">
                      Please click "Edit" to complete the required fields before submitting.
                    </p>
                  </div>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmSubmit} disabled={isSendingPO}>
                {isSendingPO ? 'Submitting...' : 'Submit PO'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default PurchaseOrderDetails;
