
export interface PendingUser {
  id: string;
  email: string;
  name: string;
  companyName: string;
  companyId: string;
  requestedRole: 'admin' | 'approver' | 'reviewer' | 'initiator';
  signupDate: string;
  status: 'pending' | 'approved' | 'rejected';
  profile?: {
    companyName: string;
    industryType?: string;
    phone?: string;
  };
}
