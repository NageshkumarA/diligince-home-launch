// Role Management API Routes

export const rolesRoutes = {
  // Get all roles with optional filters
  getRoles: '/auth/company/roles',
  
  // Get single role by ID
  getRoleById: (roleId: string) => `/auth/company/roles/${roleId}`,
  
  // Get permission template for creating new roles
  getPermissionTemplate: '/auth/company/roles/template',
  
  // Create new role
  createRole: '/auth/company/roles',
  
  // Update existing role
  updateRole: (roleId: string) => `/auth/company/roles/${roleId}`,
  
  // Delete role
  deleteRole: (roleId: string) => `/auth/company/roles/${roleId}`,
  
  // Duplicate role
  duplicateRole: (roleId: string) => `/auth/company/roles/${roleId}/duplicate`,
  
  // Toggle role active status
  toggleRoleStatus: (roleId: string) => `/auth/company/roles/${roleId}/status`,
} as const;
