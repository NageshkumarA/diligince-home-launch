
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, Clock, Phone, Mail } from "lucide-react";
import { TeamManagementModal } from "../modals/TeamManagementModal";

const teamData = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Senior Electrical Engineer",
    experience: "8 years experience",
    status: "available",
    skills: ["PLC Programming", "SCADA"],
    nextAssignment: "May 20, 2024",
    phone: "+91 98765 43210",
    email: "rajesh@company.com"
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Automation Specialist",
    experience: "5 years experience",
    status: "busy",
    skills: ["Industrial Automation", "HMI"],
    nextAssignment: "June 15, 2024",
    phone: "+91 87654 32109",
    email: "priya@company.com"
  },
  {
    id: 3,
    name: "Amit Patel",
    role: "Safety Engineer",
    experience: "6 years experience",
    status: "available",
    skills: ["Safety Auditing", "Risk Assessment"],
    nextAssignment: "May 25, 2024",
    phone: "+91 76543 21098",
    email: "amit@company.com"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'available':
      return 'bg-green-50 text-green-700 border-green-200';
    case 'busy':
      return 'bg-red-50 text-red-700 border-red-200';
    case 'on-leave':
      return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

export const TeamAvailability = () => {
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);

  const handleManageTeam = () => {
    setIsTeamModalOpen(true);
  };

  const handleCloseTeamModal = () => {
    setIsTeamModalOpen(false);
  };

  return (
    <>
      <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="border-b border-gray-50 pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              Team Availability
            </CardTitle>
            <Button 
              className="text-white font-medium bg-yellow-600 hover:bg-yellow-500"
              onClick={handleManageTeam}
            >
              Manage Team
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {teamData.map(member => (
              <div key={member.id} className="bg-gray-50 border border-gray-100 rounded-xl p-5 hover:bg-gray-100 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-lg mb-1">{member.name}</h4>
                    <p className="text-base font-semibold text-gray-700">{member.role}</p>
                    <p className="text-sm text-gray-600">{member.experience}</p>
                  </div>
                  <Badge className={`${getStatusColor(member.status)} font-semibold text-sm px-3 py-1`}>
                    {member.status.toUpperCase()}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span>Next assignment: <span className="font-semibold text-gray-900">{member.nextAssignment}</span></span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-sm text-purple-700 border-purple-200 bg-purple-50 px-3 py-1">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-gray-200 text-gray-700 hover:bg-gray-50">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-200 text-gray-700 hover:bg-gray-50">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Button 
            className="w-full mt-6 text-white font-semibold py-3 bg-yellow-600 hover:bg-yellow-500"
            onClick={handleManageTeam}
          >
            Manage Team
          </Button>
        </CardContent>
      </Card>

      <TeamManagementModal 
        isOpen={isTeamModalOpen}
        onClose={handleCloseTeamModal}
        teamMembers={teamData}
      />
    </>
  );
};
