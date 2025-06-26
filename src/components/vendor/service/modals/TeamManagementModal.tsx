
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Users, Plus, Edit, Trash2, Phone, Mail, Calendar } from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  experience: string;
  status: string;
  skills: string[];
  nextAssignment: string;
  phone: string;
  email: string;
}

interface TeamManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  teamMembers: TeamMember[];
}

export const TeamManagementModal = ({ isOpen, onClose, teamMembers }: TeamManagementModalProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [members, setMembers] = useState(teamMembers);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-700';
      case 'busy':
        return 'bg-red-100 text-red-700';
      case 'on-leave':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddMember = () => {
    console.log("Add new team member");
    // This would typically open another modal or form
  };

  const handleEditMember = (memberId: number) => {
    console.log(`Edit member ${memberId}`);
    // This would typically open an edit form
  };

  const handleDeleteMember = (memberId: number) => {
    console.log(`Delete member ${memberId}`);
    setMembers(members.filter(member => member.id !== memberId));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Users className="h-6 w-6 text-purple-600" />
            Team Management
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Header Actions */}
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex-1">
              <Input
                placeholder="Search team members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
            </div>
            <Button 
              onClick={handleAddMember}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Team Member
            </Button>
          </div>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredMembers.map(member => (
              <div key={member.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{member.name}</h3>
                    <p className="text-gray-700 font-medium">{member.role}</p>
                    <p className="text-sm text-gray-600">{member.experience}</p>
                  </div>
                  <Badge className={`${getStatusColor(member.status)} font-medium`}>
                    {member.status}
                  </Badge>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span>{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>Next: {member.nextAssignment}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-blue-50 text-blue-700">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleEditMember(member.id)}
                    className="flex-1"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDeleteMember(member.id)}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No team members found</p>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
