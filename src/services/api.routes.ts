// API Routes - Complete Industry Dashboard API Configuration
// Documentation: 
//   - Industry Dashboard: See docs/api/industry/industry-dashboard-api.md
//   - Create Requirement: See docs/api/industry/create-requirement-api.md

/**
 * Generates URL query parameters from an object
 * @param queryParams - Object containing query parameters
 * @returns Formatted query string
 */
export function generateQueryParams(queryParams: any): string {
    const params = new URLSearchParams();
    for (const key in queryParams) {
        const value = queryParams[key as keyof typeof queryParams];
        if (value !== null && value !== undefined && value !== '') {
            params.append(key, String(value));
        }
    }
    return params.toString();
}

// Base API path
const basePath = '/api/v1';

/**
 * Complete API Routes Configuration
 * Organized by module and user type
 */
export const apiRoutes = {
    // ==========================================
    // INDUSTRY MODULE
    // ==========================================
    industry: {
        // Dashboard Statistics
        dashboard: {
            // Get dashboard statistics (procurement spend, active POs, budget utilization, cost savings)
            getStats: (queryParams?: { period?: string; startDate?: string; endDate?: string }) =>
                `${basePath}/industry/dashboard/stats${queryParams ? '?' + generateQueryParams(queryParams) : ''}`,
            
            // Legacy endpoints (kept for backward compatibility)
            getAll: (queryParams: any) => {
                const queryString = generateQueryParams(queryParams);
                return `${basePath}/get_service_requests?${queryString}`;
            },
            getById: (id: any) => `${basePath}/request/details/${id}`,
            create: `${basePath}/request/create`
        },

        // Approval Management
        approvals: {
            // Get pending approvals for current user
            getPending: (queryParams?: { 
                userId?: string; 
                role?: string; 
                priority?: string;
                category?: string;
                page?: number; 
                limit?: number 
            }) =>
                `${basePath}/industry/approvals/pending${queryParams ? '?' + generateQueryParams(queryParams) : ''}`,
            
            // Approve a requirement
            approve: (approvalId: string) => `${basePath}/industry/approvals/${approvalId}/approve`,
            
            // Reject a requirement
            reject: (approvalId: string) => `${basePath}/industry/approvals/${approvalId}/reject`,
            
            // Get approval history
            getHistory: (approvalId: string) => `${basePath}/industry/approvals/${approvalId}/history`,
            
            // Get approval details
            getById: (approvalId: string) => `${basePath}/industry/approvals/${approvalId}`,
        },

        // Analytics & Reporting
        analytics: {
            // Get comprehensive procurement analytics
            getProcurement: (queryParams?: { 
                startDate?: string; 
                endDate?: string; 
                groupBy?: string 
            }) =>
                `${basePath}/industry/analytics/procurement${queryParams ? '?' + generateQueryParams(queryParams) : ''}`,
            
            // Get spend breakdown by category
            getSpendByCategory: (queryParams?: { 
                period?: string;
                startDate?: string;
                endDate?: string;
            }) =>
                `${basePath}/industry/analytics/spend-by-category${queryParams ? '?' + generateQueryParams(queryParams) : ''}`,
            
            // Get monthly spend trend
            getMonthlyTrend: (queryParams?: { 
                months?: number;
                category?: string;
            }) =>
                `${basePath}/industry/analytics/monthly-trend${queryParams ? '?' + generateQueryParams(queryParams) : ''}`,
            
            // Get cost savings analytics
            getCostSavings: (queryParams?: { period?: string }) =>
                `${basePath}/industry/analytics/cost-savings${queryParams ? '?' + generateQueryParams(queryParams) : ''}`,
        },

        // Budget Management
        budget: {
            // Get overall budget overview
            getOverview: (queryParams?: { fiscalYear?: string }) =>
                `${basePath}/industry/budget/overview${queryParams ? '?' + generateQueryParams(queryParams) : ''}`,
            
            // Get budget breakdown by categories
            getCategories: (queryParams?: { fiscalYear?: string }) =>
                `${basePath}/industry/budget/categories${queryParams ? '?' + generateQueryParams(queryParams) : ''}`,
            
            // Get budget utilization details
            getUtilization: (categoryId?: string) =>
                categoryId 
                    ? `${basePath}/industry/budget/utilization/${categoryId}`
                    : `${basePath}/industry/budget/utilization`,
            
            // Update budget allocation
            updateAllocation: (categoryId: string) => `${basePath}/industry/budget/categories/${categoryId}`,
        },

        // Vendor Management
        vendors: {
            // Get top performing vendors
            getTopPerformers: (queryParams?: { 
                limit?: number; 
                sortBy?: string;
                category?: string;
            }) =>
                `${basePath}/industry/vendors/top-performers${queryParams ? '?' + generateQueryParams(queryParams) : ''}`,
            
            // Get vendor performance details
            getPerformance: (vendorId: string) => `${basePath}/industry/vendors/${vendorId}/performance`,
            
            // Get all vendors
            getAll: (queryParams?: {
                category?: string;
                rating?: number;
                page?: number;
                limit?: number;
            }) =>
                `${basePath}/industry/vendors${queryParams ? '?' + generateQueryParams(queryParams) : ''}`,
            
            // Get vendor details
            getById: (vendorId: string) => `${basePath}/industry/vendors/${vendorId}`,
            
            // Rate a vendor
            rateVendor: (vendorId: string) => `${basePath}/industry/vendors/${vendorId}/rate`,
        },

        // Requirements Management
        requirements: {
            // Create a new requirement note
            create: `${basePath}/create_request_note`,
            
            // Get requirements by request ID
            getByRequestId: (requestId: number) => `${basePath}/get_request_notes/${requestId}`,
            
            // Get active requirements
            getActive: (queryParams?: { 
                status?: string; 
                category?: string; 
                page?: number; 
                limit?: number;
                sortBy?: string;
                order?: string;
            }) =>
                `${basePath}/industry/requirements/active${queryParams ? '?' + generateQueryParams(queryParams) : ''}`,
            
            // Get all requirements
            getAll: (queryParams?: {
                status?: string;
                category?: string;
                dateFrom?: string;
                dateTo?: string;
                page?: number;
                limit?: number;
            }) =>
                `${basePath}/industry/requirements${queryParams ? '?' + generateQueryParams(queryParams) : ''}`,
            
            // Get requirement by ID
            getById: (requirementId: string) => `${basePath}/industry/requirements/${requirementId}`,
            
            // Update requirement
            update: (requirementId: string) => `${basePath}/industry/requirements/${requirementId}`,
            
            // Delete requirement
            delete: (requirementId: string) => `${basePath}/industry/requirements/${requirementId}`,
            
            // Publish requirement (final step)
            publish: `${basePath}/industry/requirements/publish`,
            
            // Archive requirement
            archive: (requirementId: string) => `${basePath}/industry/requirements/${requirementId}/archive`,
            
            /**
             * Create Requirement Workflow - Draft Management
             * 
             * 6-step process for creating procurement requirements:
             * 1. Basic Information (title, category, priority, budget)
             * 2. Details (category-specific fields: Expert/Product/Service/Logistics)
             * 3. Documents (optional file uploads - max 5 files, 10MB each)
             * 4. Approval Workflow (conditional based on budget thresholds)
             * 5. Preview (read-only review of all information)
             * 6. Publish (set deadline, evaluation criteria, and publish)
             * 
             * Features:
             * - Auto-save drafts after each step
             * - Step validation before proceeding
             * - Emergency publish for critical requirements (requires permission)
             * - Multi-level approval workflows based on budget thresholds:
             *   * < $5,000: No approval required
             *   * $5,000 - $25,000: Department Head
             *   * $25,000 - $100,000: Department Head + Finance Manager
             *   * > $100,000: Department Head + Finance Manager + CFO
             * 
             * Documentation: See docs/api/industry/create-requirement-api.md
             * 
             * @see {@link https://docs/api/industry/create-requirement-api.md}
             */
            draft: {
                // Create new draft
                create: `${basePath}/industry/requirements/draft`,
                
                // Update draft (auto-save)
                update: (draftId: string) => `${basePath}/industry/requirements/draft/${draftId}`,
                
                // Get draft by ID
                getById: (draftId: string) => `${basePath}/industry/requirements/draft/${draftId}`,
                
                // Get all user drafts
                getAll: (queryParams?: {
                    page?: number;
                    limit?: number;
                    sortBy?: string;
                    order?: string;
                }) =>
                    `${basePath}/industry/requirements/drafts${queryParams ? '?' + generateQueryParams(queryParams) : ''}`,
                
                // Delete draft
                delete: (draftId: string) => `${basePath}/industry/requirements/draft/${draftId}`,
                
                // Validate specific step
                validate: (draftId: string) => `${basePath}/industry/requirements/draft/${draftId}/validate`,
                
                // Upload documents
                uploadDocuments: (draftId: string) => `${basePath}/industry/requirements/draft/${draftId}/documents`,
                
                // Delete document
                deleteDocument: (draftId: string, documentId: string) => 
                    `${basePath}/industry/requirements/draft/${draftId}/documents/${documentId}`,
                
                // Configure approval workflow
                approvalWorkflow: (draftId: string) => `${basePath}/industry/requirements/draft/${draftId}/approval-workflow`,
            },
        },

        // Purchase Orders Management
        purchaseOrders: {
            // Get active purchase orders
            getActive: (queryParams?: { 
                status?: string; 
                vendorId?: string;
                page?: number; 
                limit?: number;
                sortBy?: string;
                order?: string;
            }) =>
                `${basePath}/industry/purchase-orders/active${queryParams ? '?' + generateQueryParams(queryParams) : ''}`,
            
            // Get purchase order by ID
            getById: (orderId: string) => `${basePath}/industry/purchase-orders/${orderId}`,
            
            // Get all purchase orders
            getAll: (queryParams?: {
                status?: string;
                dateFrom?: string;
                dateTo?: string;
                page?: number;
                limit?: number;
            }) =>
                `${basePath}/industry/purchase-orders${queryParams ? '?' + generateQueryParams(queryParams) : ''}`,
            
            // Create purchase order
            create: `${basePath}/industry/purchase-orders`,
            
            // Update purchase order
            update: (orderId: string) => `${basePath}/industry/purchase-orders/${orderId}`,
            
            // Cancel purchase order
            cancel: (orderId: string) => `${basePath}/industry/purchase-orders/${orderId}/cancel`,
            
            // Update milestone
            updateMilestone: (orderId: string, milestoneId: string) => 
                `${basePath}/industry/purchase-orders/${orderId}/milestones/${milestoneId}`,
        },

        // Quotes Management
        quotes: {
            // Get all quotes
            getAll: (queryParams?: {
                requirementId?: string;
                vendorId?: string;
                status?: string;
                page?: number;
                limit?: number;
            }) =>
                `${basePath}/industry/quotes${queryParams ? '?' + generateQueryParams(queryParams) : ''}`,
            
            // Get quote by ID
            getById: (quoteId: string) => `${basePath}/industry/quotes/${quoteId}`,
            
            // Compare quotes
            compare: (queryParams: { quoteIds: string[] }) =>
                `${basePath}/industry/quotes/compare?${generateQueryParams(queryParams)}`,
            
            // Accept quote
            accept: (quoteId: string) => `${basePath}/industry/quotes/${quoteId}/accept`,
            
            // Reject quote
            reject: (quoteId: string) => `${basePath}/industry/quotes/${quoteId}/reject`,
        },

        // Workflows Management
        workflows: {
            // Get all workflows
            getAll: (queryParams?: {
                status?: string;
                type?: string;
                page?: number;
                limit?: number;
            }) =>
                `${basePath}/industry/workflows${queryParams ? '?' + generateQueryParams(queryParams) : ''}`,
            
            // Get workflow by ID
            getById: (workflowId: string) => `${basePath}/industry/workflows/${workflowId}`,
            
            // Create workflow
            create: `${basePath}/industry/workflows`,
            
            // Update workflow
            update: (workflowId: string) => `${basePath}/industry/workflows/${workflowId}`,
            
            // Delete workflow
            delete: (workflowId: string) => `${basePath}/industry/workflows/${workflowId}`,
        },

        // Stakeholders Management
        stakeholders: {
            // Get all stakeholders
            getAll: (queryParams?: {
                type?: string;
                status?: string;
                page?: number;
                limit?: number;
            }) =>
                `${basePath}/industry/stakeholders${queryParams ? '?' + generateQueryParams(queryParams) : ''}`,
            
            // Get stakeholder by ID
            getById: (stakeholderId: string) => `${basePath}/industry/stakeholders/${stakeholderId}`,
            
            // Invite stakeholder
            invite: `${basePath}/industry/stakeholders/invite`,
            
            // Update stakeholder
            update: (stakeholderId: string) => `${basePath}/industry/stakeholders/${stakeholderId}`,
            
            // Remove stakeholder
            remove: (stakeholderId: string) => `${basePath}/industry/stakeholders/${stakeholderId}`,
        },

        // Team Management
        team: {
            // Get all team members
            getAll: (queryParams?: {
                department?: string;
                role?: string;
                page?: number;
                limit?: number;
            }) =>
                `${basePath}/industry/team${queryParams ? '?' + generateQueryParams(queryParams) : ''}`,
            
            // Get team member by ID
            getById: (memberId: string) => `${basePath}/industry/team/${memberId}`,
            
            // Add team member
            add: `${basePath}/industry/team`,
            
            // Update team member
            update: (memberId: string) => `${basePath}/industry/team/${memberId}`,
            
            // Remove team member
            remove: (memberId: string) => `${basePath}/industry/team/${memberId}`,
        },

        // Messages
        messages: {
            // Get all conversations
            getConversations: (queryParams?: { page?: number; limit?: number }) =>
                `${basePath}/industry/messages/conversations${queryParams ? '?' + generateQueryParams(queryParams) : ''}`,
            
            // Get messages by conversation ID
            getByConversationId: (conversationId: string, queryParams?: { page?: number; limit?: number }) =>
                `${basePath}/industry/messages/conversations/${conversationId}${queryParams ? '?' + generateQueryParams(queryParams) : ''}`,
            
            // Send message
            send: `${basePath}/industry/messages`,
            
            // Mark as read
            markAsRead: (messageId: string) => `${basePath}/industry/messages/${messageId}/read`,
        },

        // Notifications
        notifications: {
            // Get all notifications
            getAll: (queryParams?: { 
                type?: string;
                read?: boolean;
                page?: number; 
                limit?: number 
            }) =>
                `${basePath}/industry/notifications${queryParams ? '?' + generateQueryParams(queryParams) : ''}`,
            
            // Mark notification as read
            markAsRead: (notificationId: string) => `${basePath}/industry/notifications/${notificationId}/read`,
            
            // Mark all as read
            markAllAsRead: `${basePath}/industry/notifications/read-all`,
            
            // Delete notification
            delete: (notificationId: string) => `${basePath}/industry/notifications/${notificationId}`,
        },
    },

    // ==========================================
    // VENDOR MODULE (Placeholder for future expansion)
    // ==========================================
    vendor: {
        // Service Vendor routes will be added here
        service: {},
        
        // Product Vendor routes will be added here
        product: {},
        
        // Logistics Vendor routes will be added here
        logistics: {},
        
        // Common vendor routes will be added here
        common: {},
    },

    // ==========================================
    // PROFESSIONAL MODULE (Placeholder for future expansion)
    // ==========================================
    professional: {
        // Professional routes will be added here
        profile: {},
        opportunities: {},
        calendar: {},
        projects: {},
    },

    // ==========================================
    // SHARED MODULE (Placeholder for future expansion)
    // ==========================================
    shared: {
        // Authentication routes will be added here
        auth: {},
        
        // Document management routes will be added here
        documents: {},
        
        // User management routes will be added here
        users: {},
        
        // Role management routes will be added here
        roles: {},
    },
};







