import { api } from '@/services/core/api.service';
import {
    WorkflowListResponse,
    WorkflowDetailResponse,
    WorkflowStatus,
    InitiatePaymentResponse,
    VerifyPaymentRequest,
    VerifyPaymentResponse,
    UploadReceiptResponse,
    MarkMilestoneCompleteRequest,
    MarkMilestoneCompleteResponse
} from './workflow.types';

// ============= Industry Workflow Service =============

/**
 * Get list of active project workflows for industry
 */
export async function getIndustryWorkflows(params?: {
    status?: string;
    page?: number;
    limit?: number;
}): Promise<WorkflowListResponse> {
    const response = await api.get('/api/v1/industry/project-workflows', { params });
    return response.data;
}

/**
 * Get workflow dashboard statistics
 */
export async function getWorkflowDashboardStats(): Promise<{
    success: boolean;
    data: {
        overview: {
            totalWorkflows: number;
            activeWorkflows: number;
            completedWorkflows: number;
            pausedWorkflows: number;
            cancelledWorkflows: number;
            totalValue: number;
            completedValue: number;
            currency: string;
        };
        milestones: {
            total: number;
            pending: number;
            paymentPending: number;
            paid: number;
            completed: number;
        };
        upcomingMilestones: Array<{
            workflowId: string;
            projectTitle: string;
            milestoneName: string;
            dueDate: string;
            amount: number;
            status: string;
            currency: string;
        }>;
        recentActivity: Array<{
            workflowId: string;
            projectTitle: string;
            type: string;
            description: string;
            timestamp: string;
            performedBy: string;
        }>;
        progressDistribution: {
            '0-25%': number;
            '26-50%': number;
            '51-75%': number;
            '76-100%': number;
        };
    };
}> {
    const response = await api.get('/api/v1/industry/workflows/dashboard/stats');
    return response.data;
}

/**
 * Search workflows with advanced filters
 */
export async function searchWorkflows(params?: {
    q?: string;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
    minProgress?: number;
    maxProgress?: number;
    stakeholderType?: string;
    page?: number;
    limit?: number;
}): Promise<{
    success: boolean;
    data: {
        workflows: Array<{
            id: string;
            workflowId: string;
            projectTitle: string;
            poNumber?: string;
            vendor: {
                id: string;
                name: string;
            };
            status: WorkflowStatus;
            progress: number;
            totalValue: number;
            currency: string;
            startDate: string;
            endDate: string;
            createdAt: string;
        }>;
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
        filters: any;
    };
}> {
    const response = await api.get('/api/v1/industry/workflows/search', { params });
    return response.data;
}

/**
 * Get requirement to workflow tracking
 */
export async function getRequirementTracking(requirementId: string): Promise<{
    success: boolean;
    data: {
        requirement: {
            id: string;
            requirementNumber: string;
            title: string;
            status: string;
            createdAt: string;
            publishedAt: string;
        };
        quotations: Array<any>;
        purchaseOrder: any;
        workflow: any;
        trackingStatus: {
            requirementCreated: boolean;
            quotationsReceived: boolean;
            quotationApproved: boolean;
            poCreated: boolean;
            poSent: boolean;
            poAccepted: boolean;
            workflowCreated: boolean;
            workflowActive: boolean;
        };
    };
}> {
    const response = await api.get(`/api/v1/industry/requirements/${requirementId}/workflow-tracking`);
    return response.data;
}


/**
 * Get workflow details for industry
 */
export async function getIndustryWorkflowDetails(workflowId: string): Promise<WorkflowDetailResponse> {
    const response = await api.get(`/api/v1/industry/project-workflows/${workflowId}`);
    return response.data;
}

/**
 * Initiate milestone payment (creates Razorpay order)
 */
export async function initiateMilestonePayment(
    workflowId: string,
    milestoneId: string
): Promise<InitiatePaymentResponse> {
    const response = await api.post(
        `/api/v1/industry/project-workflows/${workflowId}/milestones/${milestoneId}/pay`,
        {}
    );
    return response.data;
}

/**
 * Verify milestone payment after Razorpay checkout
 */
export async function verifyMilestonePayment(
    data: VerifyPaymentRequest
): Promise<VerifyPaymentResponse> {
    const response = await api.post('/api/v1/industry/milestone-payments/verify', data);
    return response.data;
}

/**
 * Upload payment receipt for vendor verification
 */
export async function uploadPaymentReceipt(
    paymentId: string,
    file: File
): Promise<UploadReceiptResponse> {
    const formData = new FormData();
    formData.append('receipt', file);

    const token = localStorage.getItem('authToken');
    const response = await fetch(`http://localhost:5001/api/v1/industry/milestone-payments/${paymentId}/upload-receipt`, {
        method: 'POST',
        headers: {
            ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: formData
    });
    return response.json();
}

/**
 * Download payment receipt PDF
 */
export async function downloadPaymentReceipt(paymentId: string): Promise<Blob> {
    const response = await api.get(
        `/api/v1/industry/milestone-payments/${paymentId}/receipt`,
        { responseType: 'blob' }
    );
    return response.data;
}

// ============= Vendor Workflow Service =============

/**
 * Get list of project workflows for vendor
 */
export async function getVendorWorkflows(params?: {
    status?: string;
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    order?: string;
}): Promise<WorkflowListResponse> {
    const response = await api.get('/api/v1/vendors/workflows', { params });
    return response.data;
}

/**
 * Get workflow details for vendor
 */
export async function getVendorWorkflowDetails(workflowId: string): Promise<WorkflowDetailResponse> {
    const response = await api.get(`/api/v1/vendors/workflows/${workflowId}`);
    return response.data;
}

/**
 * Mark milestone as complete (vendor action)
 */
export async function markMilestoneComplete(
    workflowId: string,
    milestoneId: string,
    data?: MarkMilestoneCompleteRequest
): Promise<MarkMilestoneCompleteResponse> {
    const response = await api.post(
        `/api/v1/vendors/workflows/${workflowId}/milestones/${milestoneId}/complete`,
        { party: 'vendor', ...(data || {}) }
    );
    return response.data;
}

// ============= Utility Functions =============

/**
 * Open Razorpay checkout for milestone payment
 */
export function openRazorpayCheckout(
    paymentData: InitiatePaymentResponse['data'],
    onSuccess: (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => void,
    onError: (error: any) => void
): void {
    const options = {
        key: paymentData.razorpayKeyId,
        amount: paymentData.amount,
        currency: paymentData.currency,
        name: 'Diligence AI',
        description: `Payment for ${paymentData.milestone.name || paymentData.milestone.description}`,
        order_id: paymentData.razorpayOrderId,
        prefill: paymentData.prefill || {},
        handler: function (response: any) {
            onSuccess({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
            });
        },
        modal: {
            ondismiss: function () {
                onError(new Error('Payment was cancelled'));
            }
        },
        theme: {
            color: '#1E3A5F'
        }
    };

    // @ts-ignore - Razorpay is loaded via script
    const razorpay = new window.Razorpay(options);
    razorpay.open();
}

/**
 * Format currency amount
 */
export function formatCurrency(amount: number, currency: string = 'INR'): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(amount);
}

/**
 * Get milestone status badge color
 */
export function getMilestoneStatusColor(status: string): string {
    switch (status) {
        case 'pending':
            return 'bg-gray-100 text-gray-700';
        case 'payment_pending':
            return 'bg-yellow-100 text-yellow-700';
        case 'paid':
            return 'bg-blue-100 text-blue-700';
        case 'completed':
            return 'bg-green-100 text-green-700';
        default:
            return 'bg-gray-100 text-gray-600';
    }
}
