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
    // Auth MODULE
    // ==========================================
    auth: {
        register: `${basePath}/auth/register`,
        login: `${basePath}/auth/login`,
        refreshToken: `${basePath}/auth/refresh-token`,
        forgotPassword: `${basePath}/auth/forgot-password`,
        resetPassword: `${basePath}/auth/reset-password`,
        verifyEmail: `${basePath}/auth/verify-email`,
        resendVerification: `${basePath}/auth/resend-verification`,
        mfaVerify: `${basePath}/auth/mfa/verify`,
        getRoles: `${basePath}/auth/roles`,
        googleLogin: `${basePath}/auth/google`,
        linkedinLogin: `${basePath}/auth/linkedin`,
        microsoftLogin: `${basePath}/auth/microsoft`,
        socialCallback: `${basePath}/auth/social/callback`,
        logout: `${basePath}/auth/logout`,
        changePassword: `${basePath}/auth/change-password`,
        me: `${basePath}/auth/me`,
        updateProfile: `${basePath}/auth/profile`,
        enableMfa: `${basePath}/auth/mfa/enable`,
        disableMfa: `${basePath}/auth/mfa/disable`,
        generateBackupCodes: `${basePath}/auth/mfa/backup-codes`,
        updateRole: `${basePath}/auth/role`,
        requestRole: `${basePath}/auth/role-request`,
        getPermissions: `${basePath}/auth/permissions`,
        getCompanyMembers: `${basePath}/auth/company/members`,
        addCompanyMember: `${basePath}/auth/company/members`,
        removeCompanyMember: (memberId: string) => `${basePath}/auth/company/members/${memberId}`,
        updateMemberRole: (memberId: string) => `${basePath}/auth/company/members/${memberId}/role`,
        getPendingApprovals: `${basePath}/auth/approvals/pending`,
        approveUser: (userId: string) => `${basePath}/auth/approvals/${userId}/approve`,
        rejectUser: (userId: string) => `${basePath}/auth/approvals/${userId}/reject`,
        getApprovalStatus: `${basePath}/auth/approval-status`,
        uploadApprovalDocument: `${basePath}/auth/documents/upload`,
    },
    // ==========================================
    // INDUSTRY MODULE
    // ==========================================
    industry: {
        // Dashboard Statistics
        dashboard: {
            // Get dashboard statistics (procurement spend, active POs, budget utilization, cost savings)
            stats: `${basePath}/industry/dashboard/stats`,
            
            // Get procurement analytics
            analytics: `${basePath}/industry/dashboard/analytics`,
            
            // Get budget overview
            budget: `${basePath}/industry/dashboard/budget`,
            
            // Get vendor performance rankings
            vendorPerformance: `${basePath}/industry/dashboard/vendors/performance`,
            
            // Get pending approvals for current user
            pendingApprovals: `${basePath}/industry/approvals/pending`,
            
            // Get active requirements
            activeRequirements: `${basePath}/industry/requirements?status=active`,
            
            // Get active purchase orders
            activePurchaseOrders: `${basePath}/industry/purchase-orders?status=active,in_progress`,
            
            // Legacy endpoint function
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
            
            // Delegate approval
            delegate: (approvalId: string) => `${basePath}/industry/approvals/${approvalId}/delegate`,
            
            // Escalate approval
            escalate: (approvalId: string) => `${basePath}/industry/approvals/${approvalId}/escalate`,
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
            
            // Requirements List Endpoints
            drafts: {
                list: (params?: any) => `${basePath}/industry/requirements/drafts${params ? '?' + generateQueryParams(params) : ''}`,
                bulkDelete: `${basePath}/industry/requirements/drafts/bulk-delete`,
                export: (format: 'xlsx' | 'csv', params?: any) => 
                    `${basePath}/industry/requirements/drafts/export/${format}${params ? '?' + generateQueryParams(params) : ''}`,
            },
            
            pending: {
                list: (params?: any) => `${basePath}/industry/requirements/pending${params ? '?' + generateQueryParams(params) : ''}`,
                export: (format: 'xlsx' | 'csv', params?: any) => 
                    `${basePath}/industry/requirements/pending/export/${format}${params ? '?' + generateQueryParams(params) : ''}`,
            },
            
            approved: {
                list: (params?: any) => `${basePath}/industry/requirements/approved${params ? '?' + generateQueryParams(params) : ''}`,
                bulkPublish: `${basePath}/industry/requirements/approved/bulk-publish`,
                export: (format: 'xlsx' | 'csv', params?: any) => 
                    `${basePath}/industry/requirements/approved/export/${format}${params ? '?' + generateQueryParams(params) : ''}`,
            },
            
            published: {
                list: (params?: any) => `${basePath}/industry/requirements/published${params ? '?' + generateQueryParams(params) : ''}`,
                export: (format: 'xlsx' | 'csv', params?: any) => 
                    `${basePath}/industry/requirements/published/export/${format}${params ? '?' + generateQueryParams(params) : ''}`,
            },
            
            archived: {
                list: (params?: any) => `${basePath}/industry/requirements/archived${params ? '?' + generateQueryParams(params) : ''}`,
                bulkArchive: `${basePath}/industry/requirements/archived/bulk-archive`,
                export: (format: 'xlsx' | 'csv', params?: any) => 
                    `${basePath}/industry/requirements/archived/export/${format}${params ? '?' + generateQueryParams(params) : ''}`,
            },

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
                
                // Resume draft with conflict detection
                resume: (draftId: string) => `${basePath}/industry/requirements/draft/${draftId}/resume`,
                
                // Validate all steps
                validateAll: (draftId: string) => `${basePath}/industry/requirements/draft/${draftId}/validate/all`,
                
                // Validate specific step
                validate: (draftId: string) => `${basePath}/industry/requirements/draft/${draftId}/validate`,
                
                // Step-specific validation
                validateStep: (draftId: string, stepNumber: number) => 
                    `${basePath}/industry/requirements/draft/${draftId}/validate/step/${stepNumber}`,
                
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
        // ==========================================
        // QUOTATIONS MODULE
        // ==========================================
        quotations: {
            pending: (queryParams?: any) => `${basePath}/industry/quotations/pending${queryParams ? '?' + generateQueryParams(queryParams) : ''}`,
            approved: (queryParams?: any) => `${basePath}/industry/quotations/approved${queryParams ? '?' + generateQueryParams(queryParams) : ''}`,
            all: (queryParams?: any) => `${basePath}/industry/quotations/all${queryParams ? '?' + generateQueryParams(queryParams) : ''}`,
            getById: (id: string) => `${basePath}/industry/quotations/${id}`,
            approve: (id: string) => `${basePath}/industry/quotations/${id}/approve`,
            reject: (id: string) => `${basePath}/industry/quotations/${id}/reject`,
            clarification: (id: string) => `${basePath}/industry/quotations/${id}/request-clarification`,
            compare: `${basePath}/industry/quotations/compare`,
            analyze: `${basePath}/industry/quotations/analyze`,
            bulkApprove: `${basePath}/industry/quotations/bulk-approve`,
            bulkReject: `${basePath}/industry/quotations/bulk-reject`,
            export: {
                xlsx: (queryParams?: any) => `${basePath}/industry/quotations/export/xlsx${queryParams ? '?' + generateQueryParams(queryParams) : ''}`,
                csv: (queryParams?: any) => `${basePath}/industry/quotations/export/csv${queryParams ? '?' + generateQueryParams(queryParams) : ''}`,
            },
        },

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







