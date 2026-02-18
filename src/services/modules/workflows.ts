import { api } from '@/services/core/api.service';

export interface WorkflowListParams {
    page?: number;
    limit?: number;
    status?: 'active' | 'paused' | 'completed' | 'cancelled';
    sortBy?: string;
    order?: 'asc' | 'desc';
    search?: string;
}

export interface Workflow {
    id: string;
    workflowId: string;
    projectTitle: string;
    poNumber?: string;
    quotationNumber?: string;
    status: 'active' | 'paused' | 'completed' | 'cancelled';
    progress: number;
    totalValue: number;
    currency: string;
    startDate: string;
    endDate: string;
    daysRemaining: number;
    isOverdue: boolean;
    milestones: {
        total: number;
        completed: number;
        pending: number;
    };
    createdAt: string;
}

export interface WorkflowsResponse {
    success: boolean;
    data: {
        workflows: Workflow[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
        metadata?: {
            searchMode?: string;
            searchMessage?: string;
        };
    };
}

export interface WorkflowDetailsResponse {
    success: boolean;
    data: {
        workflow: any; // Will be typed more specifically when implementing details page
        linkedEntities: any;
        stakeholder: any;
        milestones: any[];
        stats: any;
        events?: any[];
    };
}

class WorkflowService {
    /**
     * Get list of workflows with optional filtering, search, and pagination
     */
    async getWorkflows(params: WorkflowListParams): Promise<WorkflowsResponse> {
        const response = await api.get<WorkflowsResponse>('/api/v1/industry/workflows', { params });
        return response.data;
    }

    /**
     * Get detailed workflow information including milestones and payment status
     */
    async getWorkflowDetails(id: string): Promise<WorkflowDetailsResponse> {
        const response = await api.get<WorkflowDetailsResponse>(`/api/v1/industry/workflows/${id}`);
        return response.data;
    }

    /**
     * Initiate milestone payment with Razorpay
     */
    async initiateMilestonePayment(workflowId: string, milestoneId: string) {
        const response = await api.post(`/api/v1/industry/project-workflows/${workflowId}/milestones/${milestoneId}/pay`);
        return response.data;
    }

    /**
     * Verify milestone payment after Razorpay checkout
     */
    async verifyMilestonePayment(paymentData: any) {
        const response = await api.post('/api/v1/industry/milestone-payments/verify', paymentData);
        return response.data;
    }

    /**
     * Upload document to milestone
     */
    async uploadMilestoneDocument(workflowId: string, milestoneId: string, formData: FormData) {
        const response = await api.post(
            `/api/v1/industry/workflows/${workflowId}/milestones/${milestoneId}/documents`,
            formData,
            {
                headers: { 'Content-Type': 'multipart/form-data' }
            }
        );
        return response.data;
    }

    /**
     * Delete milestone document
     */
    async deleteMilestoneDocument(workflowId: string, milestoneId: string, documentId: string) {
        const response = await api.delete(
            `/api/v1/industry/workflows/${workflowId}/milestones/${milestoneId}/documents/${documentId}`
        );
        return response.data;
    }

    /**
     * Mark milestone as complete (industry or vendor)
     */
    async markMilestoneComplete(workflowId: string, milestoneId: string, notes?: string) {
        const response = await api.post(
            `/api/v1/industry/workflows/${workflowId}/milestones/${milestoneId}/complete`,
            { party: 'industry', notes }
        );
        return response.data;
    }
}

export const workflowService = new WorkflowService();
export default workflowService;
