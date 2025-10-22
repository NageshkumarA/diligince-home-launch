import apiService from '../../core/api.service';
import { purchaseOrdersRoutes } from './purchase-orders.routes';
import type {
  PurchaseOrder,
  PurchaseOrderDetail,
  POListResponse,
  PODetailResponse,
  POListParams,
  CreatePORequest,
  UpdatePORequest,
  CancelPORequest,
  ApprovePORequest,
  RejectPORequest,
  PaymentMilestone,
  MilestoneListResponse,
  MilestoneUpdateRequest,
  Invoice,
  InvoiceListResponse,
  InvoiceCreateRequest,
  InvoiceUpdateRequest,
  MarkInvoicePaidRequest,
  DeliveryTracking,
  DeliveryTrackingResponse,
  DeliveryUpdateRequest,
  ActivityLog,
  ActivityLogResponse,
  ExportXLSXRequest,
} from './purchase-orders.types';

class PurchaseOrdersService {
  // ============= List Operations =============
  
  /**
   * Get active purchase orders
   */
  async getActive(params?: POListParams): Promise<POListResponse> {
    return apiService.get<POListResponse>(purchaseOrdersRoutes.getActive(params));
  }

  /**
   * Get pending purchase orders (awaiting approval)
   */
  async getPending(params?: POListParams): Promise<POListResponse> {
    return apiService.get<POListResponse>(purchaseOrdersRoutes.getPending(params));
  }

  /**
   * Get in-progress purchase orders
   */
  async getInProgress(params?: POListParams): Promise<POListResponse> {
    return apiService.get<POListResponse>(purchaseOrdersRoutes.getInProgress(params));
  }

  /**
   * Get completed purchase orders
   */
  async getCompleted(params?: POListParams): Promise<POListResponse> {
    return apiService.get<POListResponse>(purchaseOrdersRoutes.getCompleted(params));
  }

  /**
   * Get all purchase orders with optional filtering
   */
  async getAll(params?: POListParams): Promise<POListResponse> {
    return apiService.get<POListResponse>(purchaseOrdersRoutes.getAll(params));
  }

  // ============= Single PO Operations =============
  
  /**
   * Get purchase order by ID with full details
   */
  async getById(orderId: string): Promise<PODetailResponse> {
    return apiService.get<PODetailResponse>(purchaseOrdersRoutes.getById(orderId));
  }

  /**
   * Create new purchase order from quotation
   */
  async create(data: CreatePORequest): Promise<PODetailResponse> {
    return apiService.post<PODetailResponse, CreatePORequest>(purchaseOrdersRoutes.create, data);
  }

  /**
   * Update existing purchase order (draft or pending_approval only)
   */
  async update(orderId: string, data: UpdatePORequest): Promise<PODetailResponse> {
    return apiService.put<PODetailResponse, UpdatePORequest>(purchaseOrdersRoutes.update(orderId), data);
  }

  /**
   * Cancel a purchase order
   */
  async cancel(orderId: string, reason: string): Promise<PODetailResponse> {
    const payload: CancelPORequest = { reason, cancelledBy: 'current_user' };
    return apiService.post<PODetailResponse, CancelPORequest>(purchaseOrdersRoutes.cancel(orderId), payload);
  }

  /**
   * Approve a pending purchase order
   */
  async approve(orderId: string, comments?: string): Promise<PODetailResponse> {
    const payload: ApprovePORequest = { comments };
    return apiService.post<PODetailResponse, ApprovePORequest>(purchaseOrdersRoutes.approve(orderId), payload);
  }

  /**
   * Reject a pending purchase order
   */
  async reject(orderId: string, reason: string): Promise<PODetailResponse> {
    const payload: RejectPORequest = { reason };
    return apiService.post<PODetailResponse, RejectPORequest>(purchaseOrdersRoutes.reject(orderId), payload);
  }

  // ============= Milestone Operations =============
  
  /**
   * Get all milestones for a purchase order
   */
  async getMilestones(orderId: string): Promise<MilestoneListResponse> {
    return apiService.get<MilestoneListResponse>(purchaseOrdersRoutes.getMilestones(orderId));
  }

  /**
   * Get specific milestone details
   */
  async getMilestoneById(orderId: string, milestoneId: string): Promise<{ success: boolean; data: PaymentMilestone }> {
    return apiService.get<{ success: boolean; data: PaymentMilestone }>(
      purchaseOrdersRoutes.getMilestoneById(orderId, milestoneId)
    );
  }

  /**
   * Update milestone details
   */
  async updateMilestone(
    orderId: string, 
    milestoneId: string, 
    data: MilestoneUpdateRequest
  ): Promise<{ success: boolean; data: PaymentMilestone }> {
    return apiService.put<{ success: boolean; data: PaymentMilestone }, MilestoneUpdateRequest>(
      purchaseOrdersRoutes.updateMilestone(orderId, milestoneId),
      data
    );
  }

  /**
   * Mark milestone as complete
   */
  async markMilestoneComplete(
    orderId: string, 
    milestoneId: string, 
    notes?: string
  ): Promise<{ success: boolean; data: PaymentMilestone }> {
    return apiService.post<{ success: boolean; data: PaymentMilestone }, { notes?: string }>(
      purchaseOrdersRoutes.markMilestoneComplete(orderId, milestoneId),
      { notes }
    );
  }

  /**
   * Upload proof document for milestone completion
   */
  async uploadMilestoneProof(
    orderId: string, 
    milestoneId: string, 
    document: File
  ): Promise<{ success: boolean; data: PaymentMilestone }> {
    const formData = new FormData();
    formData.append('document', document);
    return apiService.post<{ success: boolean; data: PaymentMilestone }, FormData>(
      purchaseOrdersRoutes.uploadMilestoneProof(orderId, milestoneId),
      formData
    );
  }

  // ============= Invoice Operations =============
  
  /**
   * Get all invoices for a purchase order
   */
  async getInvoices(orderId: string): Promise<InvoiceListResponse> {
    return apiService.get<InvoiceListResponse>(purchaseOrdersRoutes.getInvoices(orderId));
  }

  /**
   * Get specific invoice details
   */
  async getInvoiceById(orderId: string, invoiceId: string): Promise<{ success: boolean; data: Invoice }> {
    return apiService.get<{ success: boolean; data: Invoice }>(
      purchaseOrdersRoutes.getInvoiceById(orderId, invoiceId)
    );
  }

  /**
   * Create new invoice for a milestone
   */
  async createInvoice(orderId: string, data: InvoiceCreateRequest): Promise<{ success: boolean; data: Invoice }> {
    return apiService.post<{ success: boolean; data: Invoice }, InvoiceCreateRequest>(
      purchaseOrdersRoutes.createInvoice(orderId),
      data
    );
  }

  /**
   * Update invoice details
   */
  async updateInvoice(
    orderId: string, 
    invoiceId: string, 
    data: InvoiceUpdateRequest
  ): Promise<{ success: boolean; data: Invoice }> {
    return apiService.put<{ success: boolean; data: Invoice }, InvoiceUpdateRequest>(
      purchaseOrdersRoutes.updateInvoice(orderId, invoiceId),
      data
    );
  }

  /**
   * Mark invoice as paid
   */
  async markInvoicePaid(
    orderId: string, 
    invoiceId: string, 
    paymentData: MarkInvoicePaidRequest
  ): Promise<{ success: boolean; data: Invoice }> {
    return apiService.post<{ success: boolean; data: Invoice }, MarkInvoicePaidRequest>(
      purchaseOrdersRoutes.markInvoicePaid(orderId, invoiceId),
      paymentData
    );
  }

  /**
   * Export invoice as PDF
   */
  async exportInvoicePDF(orderId: string, invoiceId: string): Promise<Blob> {
    return apiService.get<Blob>(
      purchaseOrdersRoutes.exportInvoicePDF(orderId, invoiceId),
      { responseType: 'blob' }
    );
  }

  // ============= Delivery Operations =============
  
  /**
   * Get delivery tracking information
   */
  async getDeliveryTracking(orderId: string): Promise<DeliveryTrackingResponse> {
    return apiService.get<DeliveryTrackingResponse>(purchaseOrdersRoutes.getDeliveryTracking(orderId));
  }

  /**
   * Get delivery timeline/events
   */
  async getDeliveryTimeline(orderId: string): Promise<DeliveryTrackingResponse> {
    return apiService.get<DeliveryTrackingResponse>(purchaseOrdersRoutes.getDeliveryTimeline(orderId));
  }

  /**
   * Update delivery status
   */
  async updateDeliveryStatus(orderId: string, data: DeliveryUpdateRequest): Promise<DeliveryTrackingResponse> {
    return apiService.post<DeliveryTrackingResponse, DeliveryUpdateRequest>(
      purchaseOrdersRoutes.updateDeliveryStatus(orderId),
      data
    );
  }

  /**
   * Upload proof of delivery document
   */
  async uploadProofOfDelivery(orderId: string, document: File): Promise<DeliveryTrackingResponse> {
    const formData = new FormData();
    formData.append('document', document);
    return apiService.post<DeliveryTrackingResponse, FormData>(
      purchaseOrdersRoutes.uploadProofOfDelivery(orderId),
      formData
    );
  }

  // ============= Activity Log =============
  
  /**
   * Get activity log for a purchase order
   */
  async getActivityLog(orderId: string): Promise<ActivityLogResponse> {
    return apiService.get<ActivityLogResponse>(purchaseOrdersRoutes.getActivityLog(orderId));
  }

  // ============= Export Operations =============
  
  /**
   * Export single purchase order as PDF
   */
  async exportToPDF(orderId: string): Promise<Blob> {
    return apiService.get<Blob>(
      purchaseOrdersRoutes.exportToPDF(orderId),
      { responseType: 'blob' }
    );
  }

  /**
   * Export multiple purchase orders to Excel
   */
  async exportToXLSX(params: ExportXLSXRequest): Promise<Blob> {
    return apiService.post<Blob, ExportXLSXRequest>(
      purchaseOrdersRoutes.exportToXLSX,
      params,
      { responseType: 'blob' }
    );
  }
}

export const purchaseOrdersService = new PurchaseOrdersService();
