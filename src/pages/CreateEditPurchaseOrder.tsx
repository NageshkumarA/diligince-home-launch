import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Card } from '@/components/ui/card';
import { useAsyncOperation } from '@/hooks/useAsyncOperation';
import { purchaseOrdersService } from '@/services/modules/purchase-orders';
import { purchaseOrderFormSchema, PurchaseOrderFormData } from '@/schemas/purchase-order-form.schema';
import { POFormBasicInfo } from '@/components/purchase-order/forms/POFormBasicInfo';
import { POFormDeliverables } from '@/components/purchase-order/forms/POFormDeliverables';
import { POFormMilestones } from '@/components/purchase-order/forms/POFormMilestones';
import { POFormAcceptanceCriteria } from '@/components/purchase-order/forms/POFormAcceptanceCriteria';

const CreateEditPurchaseOrder: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;

  // Fetch existing PO data if in edit mode
  const { data: poDetail, isLoading: isLoadingPO } = useQuery({
    queryKey: ['purchase-order', id],
    queryFn: () => purchaseOrdersService.getById(id!),
    enabled: isEditMode,
  });

  const form = useForm<PurchaseOrderFormData>({
    resolver: zodResolver(purchaseOrderFormSchema),
    defaultValues: {
      projectTitle: '',
      scopeOfWork: '',
      specialInstructions: '',
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 30)),
      paymentTerms: '',
      deliverables: [],
      paymentMilestones: [],
      acceptanceCriteria: [],
    },
  });

  // Populate form with existing data in edit mode
  useEffect(() => {
    if (poDetail?.data && isEditMode) {
      const po = poDetail.data;
      form.reset({
        quotationId: po.quotationId,
        projectTitle: po.projectTitle,
        scopeOfWork: po.scopeOfWork,
        specialInstructions: po.specialInstructions || '',
        startDate: new Date(po.startDate),
        endDate: new Date(po.endDate),
        paymentTerms: po.paymentTerms,
        deliverables: po.deliverables.map(d => ({
          id: d.id,
          description: d.description,
          quantity: d.quantity,
          unit: d.unit,
          unitPrice: d.unitPrice,
        })),
        paymentMilestones: po.paymentMilestones.map(m => ({
          id: m.id,
          description: m.description,
          percentage: m.percentage,
          dueDate: m.dueDate,
        })),
        acceptanceCriteria: po.acceptanceCriteria.map(a => ({
          id: a.id,
          criteria: a.criteria,
        })),
      });
    }
  }, [poDetail, isEditMode, form]);

  const { loading, execute } = useAsyncOperation({
    showSuccessToast: true,
    showErrorToast: true,
    successMessage: isEditMode ? 'Purchase order updated successfully' : 'Purchase order created successfully',
    onSuccess: (data) => {
      if (data?.data?.id) {
        navigate(`/dashboard/purchase-orders/${data.data.id}`);
      } else {
        navigate('/dashboard/industry-purchase-orders');
      }
    },
  });

  const onSubmit = async (data: PurchaseOrderFormData) => {
    await execute(async () => {
      // Transform form data to API format
      const apiData = {
        quotationId: data.quotationId || 'temp-quotation-id',
        projectTitle: data.projectTitle,
        scopeOfWork: data.scopeOfWork,
        specialInstructions: data.specialInstructions,
        startDate: data.startDate.toISOString().split('T')[0],
        endDate: data.endDate.toISOString().split('T')[0],
        paymentTerms: data.paymentTerms,
        deliverables: data.deliverables.map(d => ({
          description: d.description,
          quantity: d.quantity,
          unit: d.unit,
          unitPrice: d.unitPrice,
        })),
        paymentMilestones: data.paymentMilestones.map(m => ({
          description: m.description,
          percentage: m.percentage,
          dueDate: m.dueDate,
        })),
        acceptanceCriteria: data.acceptanceCriteria.map(a => ({
          criteria: a.criteria,
        })),
      };

      if (isEditMode) {
        return await purchaseOrdersService.update(id!, apiData);
      } else {
        return await purchaseOrdersService.create(apiData);
      }
    });
  };

  if (isEditMode && isLoadingPO) {
    return (
      <div className="min-h-screen bg-muted/30 p-6">
        <div className="container mx-auto max-w-4xl">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto max-w-4xl p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <h1 className="text-3xl font-bold">
              {isEditMode ? 'Edit Purchase Order' : 'Create Purchase Order'}
            </h1>
          </div>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <POFormBasicInfo form={form} />
            <POFormDeliverables form={form} />
            <POFormMilestones form={form} />
            <POFormAcceptanceCriteria form={form} />

            {/* Actions */}
            <Card className="p-6">
              <div className="flex gap-3 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="gap-2"
                >
                  <Save className="h-4 w-4" />
                  {loading ? 'Saving...' : (isEditMode ? 'Update Purchase Order' : 'Create Purchase Order')}
                </Button>
              </div>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateEditPurchaseOrder;
