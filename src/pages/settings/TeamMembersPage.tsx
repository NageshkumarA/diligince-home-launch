import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserPlus, Search } from 'lucide-react';
import {
  InviteMemberModal,
  EditMemberRoleModal,
  StatisticsCards,
  TeamMembersTable,
} from '@/components/settings/team-members';
import { useTeamMembers } from '@/hooks/useTeamMembers';
import { TeamMember } from '@/services/modules/team-members';
import { LoadingSpinner } from '@/components/shared/loading';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function TeamMembersPage() {
  const {
    members,
    roles,
    loading,
    rolesLoading,
    statistics,
    actions,
  } = useTeamMembers();

  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<TeamMember | null>(null);
  
  const [filters, setFilters] = useState({
    search: '',
    role: 'all',
    status: 'all',
  });

  const handleSearch = (search: string) => {
    setFilters({ ...filters, search });
    actions.fetchMembers({ ...filters, search });
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    actions.fetchMembers(newFilters);
  };

  const handleCreateMember = async (data: any) => {
    await actions.createMember(data);
  };

  const handleChangeRole = (member: TeamMember) => {
    setSelectedMember(member);
    setRoleModalOpen(true);
  };

  const handleUpdateRole = async (roleId: string, reason?: string) => {
    if (selectedMember) {
      await actions.updateMemberRole(selectedMember.id, { roleId, reason });
    }
  };

  const handleSuspend = async (member: TeamMember) => {
    const newStatus = member.status === 'suspended' ? 'active' : 'suspended';
    await actions.updateMemberStatus(member.id, newStatus);
  };

  const handleRemoveClick = (member: TeamMember) => {
    setMemberToRemove(member);
    setRemoveDialogOpen(true);
  };

  const handleRemoveConfirm = async () => {
    if (memberToRemove) {
      await actions.removeMember(memberToRemove.id);
      setRemoveDialogOpen(false);
      setMemberToRemove(null);
    }
  };

  const handleResendVerification = async (member: TeamMember) => {
    await actions.resendVerification(member.id, 'both');
  };

  if (loading && members.length === 0) {
    return (
      <div className="container mx-auto py-6">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Team Members</h1>
          <p className="text-muted-foreground mt-1">
            Manage your organization's team and their roles
          </p>
        </div>
        <Button onClick={() => setInviteModalOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Invite Member
        </Button>
      </div>

      {/* Statistics */}
      <StatisticsCards statistics={statistics} />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or phone..."
            value={filters.search}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filters.role} onValueChange={(value) => handleFilterChange('role', value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            {roles.map((role) => (
              <SelectItem key={role.id} value={role.id}>
                {role.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
            <SelectItem value="pending_verification">Pending Verification</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Members Table */}
      <TeamMembersTable
        members={members}
        onEdit={() => {}}
        onChangeRole={handleChangeRole}
        onSuspend={handleSuspend}
        onRemove={handleRemoveClick}
        onResendVerification={handleResendVerification}
      />

      {/* Modals */}
      <InviteMemberModal
        isOpen={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
        onSubmit={handleCreateMember}
        roles={roles}
      />

      <EditMemberRoleModal
        isOpen={roleModalOpen}
        onClose={() => {
          setRoleModalOpen(false);
          setSelectedMember(null);
        }}
        onSubmit={handleUpdateRole}
        member={selectedMember}
        roles={roles}
      />

      {/* Remove Confirmation Dialog */}
      <AlertDialog open={removeDialogOpen} onOpenChange={setRemoveDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Team Member?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove {memberToRemove?.fullName}? This action can be
              undone, but the member will lose access immediately.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemoveConfirm}>
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
