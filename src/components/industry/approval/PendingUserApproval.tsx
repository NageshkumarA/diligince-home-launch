
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useEnhancedApproval } from '@/contexts/EnhancedApprovalContext';
import { PendingUser } from '@/types/pendingUser';
import { 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  User,
  Mail,
  Building,
  Calendar,
  AlertTriangle
} from 'lucide-react';

const PendingUserApproval = () => {
  const { 
    pendingUsers, 
    approvePendingUser, 
    rejectPendingUser,
    isCompanyAdmin 
  } = useEnhancedApproval();
  
  const [selectedRole, setSelectedRole] = useState<{[key: string]: 'admin' | 'approver' | 'reviewer' | 'initiator'}>({});
  const [rejectionReason, setRejectionReason] = useState('');
  const [rejectionDialogOpen, setRejectionDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string>('');

  const handleApprove = (userId: string) => {
    const role = selectedRole[userId] || 'initiator';
    approvePendingUser(userId, role);
  };

  const handleReject = (userId: string) => {
    setSelectedUserId(userId);
    setRejectionDialogOpen(true);
  };

  const confirmReject = () => {
    if (selectedUserId) {
      rejectPendingUser(selectedUserId, rejectionReason);
      setRejectionDialogOpen(false);
      setRejectionReason('');
      setSelectedUserId('');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const pendingOnlyUsers = pendingUsers.filter(user => user.status === 'pending');

  if (!isCompanyAdmin) {
    return (
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <AlertTriangle className="h-8 w-8 text-orange-600" />
            <div>
              <h3 className="font-semibold text-orange-900">Access Restricted</h3>
              <p className="text-orange-700">
                Only company administrators can manage user approvals.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Pending User Approvals
            {pendingOnlyUsers.length > 0 && (
              <Badge variant="destructive" className="ml-2">
                {pendingOnlyUsers.length}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pendingOnlyUsers.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No pending user approvals</p>
              <p className="text-sm text-gray-400">New user requests will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingOnlyUsers.map((user) => (
                <div key={user.id} className="border rounded-lg p-6 bg-white">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{user.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {user.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Building className="h-4 w-4" />
                            {user.companyName}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className={getStatusColor(user.status)}>
                      <Clock className="h-3 w-3 mr-1" />
                      {user.status.toUpperCase()}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Industry Type</p>
                      <p className="text-sm text-gray-600">{user.profile?.industryType || 'Not specified'}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Phone</p>
                      <p className="text-sm text-gray-600">{user.profile?.phone || 'Not specified'}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Signup Date</p>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        {formatDate(user.signupDate)}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Requested Role</p>
                      <Badge variant="outline" className="capitalize">
                        {user.requestedRole}
                      </Badge>
                    </div>
                  </div>

                  {user.status === 'pending' && (
                    <div className="flex items-center gap-4 pt-4 border-t">
                      <div className="flex-1">
                        <Select
                          value={selectedRole[user.id] || 'initiator'}
                          onValueChange={(role: 'admin' | 'approver' | 'reviewer' | 'initiator') => 
                            setSelectedRole(prev => ({ ...prev, [user.id]: role }))
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Assign Role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="initiator">Initiator</SelectItem>
                            <SelectItem value="reviewer">Reviewer</SelectItem>
                            <SelectItem value="approver">Approver</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Button
                        onClick={() => handleApprove(user.id)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      
                      <Button
                        variant="outline"
                        onClick={() => handleReject(user.id)}
                        className="border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* All Users History */}
      {pendingUsers.length > pendingOnlyUsers.length && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              User Approval History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingUsers.filter(user => user.status !== 'pending').map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={`capitalize ${getStatusColor(user.status)}`}>
                      {user.status === 'approved' ? (
                        <CheckCircle className="h-3 w-3 mr-1" />
                      ) : (
                        <XCircle className="h-3 w-3 mr-1" />
                      )}
                      {user.status}
                    </Badge>
                    {user.status === 'approved' && (
                      <Badge variant="secondary" className="capitalize">
                        {user.requestedRole}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Rejection Dialog */}
      <Dialog open={rejectionDialogOpen} onOpenChange={setRejectionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject User Request</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600">
              Are you sure you want to reject this user's request to join your company?
            </p>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Reason for rejection (optional)
              </label>
              <Textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Provide a reason for rejection..."
                className="min-h-[80px]"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setRejectionDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={confirmReject}
              >
                Reject User
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PendingUserApproval;
