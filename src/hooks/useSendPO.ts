import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { purchaseOrdersService } from '@/services/modules/purchase-orders';
import type { SendPORequest } from '@/services/modules/purchase-orders';

/**
 * Hook to send an approved PO to vendor/professional
 */
export const useSendPO = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ poId, data }: { poId: string; data?: SendPORequest }) =>
      purchaseOrdersService.send(poId, data),
    onSuccess: (response) => {
      toast.success('Purchase order sent successfully', {
        description: `PO ${response.data.poNumber} has been sent to ${response.data.recipient.name}`,
      });
      queryClient.invalidateQueries({ queryKey: ['purchase-order'] });
      queryClient.invalidateQueries({ queryKey: ['purchase-orders'] });
    },
    onError: (error: any) => {
      const errorCode = error?.response?.data?.error?.code;

      if (errorCode === 'PO_NOT_EDITABLE') {
        toast.error('Cannot submit PO', {
          description: 'Only draft or cancelled purchase orders can be submitted.',
        });
      } else if (errorCode === 'PO_NOT_FOUND') {
        toast.error('PO not found', {
          description: 'The purchase order could not be found.',
        });
      } else {
        toast.error('Failed to submit purchase order', {
          description: error?.response?.data?.error?.message || error?.message || 'An unexpected error occurred.',
        });
      }
    },
  });
};

export default useSendPO;
