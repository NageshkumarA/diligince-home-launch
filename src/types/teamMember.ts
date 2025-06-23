
export interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: IndustrialRole;
  department: Department;
  status: MemberStatus;
  joinDate: string;
  managerId?: string;
  permissions: Permission[];
  lastLogin?: string;
  invitationStatus: InvitationStatus;
}

export type IndustrialRole = 
  | 'Engineer'
  | 'Manager' 
  | 'Procurement Head'
  | 'Finance Head'
  | 'Project Head'
  | 'Material Head'
  | 'Stores Head'
  | 'AGM'
  | 'DGM'
  | 'GM'
  | 'CEO'
  | 'Admin';

export type Department = 
  | 'Engineering'
  | 'Procurement'
  | 'Finance'
  | 'Operations'
  | 'Materials'
  | 'Quality'
  | 'Safety'
  | 'HR'
  | 'IT'
  | 'Management';

export type MemberStatus = 'active' | 'inactive' | 'pending';

export type InvitationStatus = 'sent' | 'accepted' | 'pending' | 'expired';

export interface Permission {
  module: ModuleName;
  actions: Action[];
  dataScope: DataScope;
}

export type ModuleName = 
  | 'Dashboard'
  | 'Requirements'
  | 'Documents'
  | 'Payment Settings'
  | 'Team Management'
  | 'Vendors'
  | 'Messages';

export type Action = 'create' | 'read' | 'update' | 'delete' | 'approve';

export type DataScope = 'own' | 'department' | 'company';

export interface RoleTemplate {
  role: IndustrialRole;
  permissions: Permission[];
  description: string;
  level: number; // For hierarchy
}

export interface TeamMemberFilters {
  search: string;
  role: IndustrialRole | 'all';
  department: Department | 'all';
  status: MemberStatus | 'all';
}
