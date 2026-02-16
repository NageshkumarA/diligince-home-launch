import { purchaseOrdersService } from '@/services/modules/purchase-orders';

/**
 * Handle Create PO navigation with draft PO checking
 * If a draft PO exists for the quotation, navigate to edit it
 * Otherwise, navigate to create a new PO
 */
export async function handleCreatePO(quotationId: string, navigate: (path: string) => void): Promise<void> {
    try {
        // Check for existing POs for this quotation
        const response = await purchaseOrdersService.getByQuotationId(quotationId);

        // Check if there's a draft PO
        const draftPO = response.data?.find((po: any) => po.status === 'draft');

        if (draftPO) {
            // Navigate to edit the existing draft
            navigate(`/dashboard/purchase-orders/${draftPO.id}`);
        } else {
            // Navigate to create new PO
            navigate(`/dashboard/purchase-orders/create?quotationId=${quotationId}`);
        }
    } catch (error) {
        // If there's an error checking for existing POs, just navigate to create new
        console.error('Error checking for existing POs:', error);
        navigate(`/dashboard/purchase-orders/create?quotationId=${quotationId}`);
    }
}
