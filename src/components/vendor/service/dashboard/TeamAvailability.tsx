
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Settings, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const mockTeamMembers = [
  {
    id: 1,
    name: "Rajiv Sharma",
    specialization: "PLC Programming",
    experience: "12 years",
    status: "available",
    currentProject: null,
    skills: ["Siemens PLC", "Allen Bradley", "Schneider"],
    hourlyRate: 2500,
    certifications: ["TIA Portal Certified", "Rockwell Certified"]
  },
  {
    id: 2,
    name: "Sandeep Kumar",
    specialization: "SCADA Systems",
    experience: "8 years",
    status: "on-project",
    currentProject: "SCADA System Implementation",
    skills: ["WinCC", "InTouch", "FactoryTalk"],
    hourlyRate: 2200,
    certifications: ["SCADA Professional"]
  },
  {
    id: 3,
    name: "Priya Mehta",
    specialization: "Control Systems",
    experience: "15 years",
    status: "available",
    currentProject: null,
    skills: ["DCS", "PLC", "Safety Systems"],
    hourlyRate: 3000,
    certifications: ["Control Systems Expert", "Safety Certified"]
  },
  {
    id: 4,
    name: "Vijay Reddy",
    specialization: "Electrical Systems",
    experience: "10 years",
    status: "available",
    currentProject: null,
    skills: ["Panel Design", "Motor Control", "Power Systems"],
    hourlyRate: 2300,
    certifications: ["Electrical Professional"]
  },
  {
    id: 5,
    name: "Amit Singh",
    specialization: "Instrumentation",
    experience: "7 years",
    status: "on-project",
    currentProject: "SCADA System Implementation",
    skills: ["Flow Meters", "Pressure Transmitters", "Temperature Sensors"],
    hourlyRate: 2000,
    certifications: ["Instrumentation Specialist"]
  }
];

export const TeamAvailability = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "on-project":
        return "bg-orange-100 text-orange-800";
      case "on-leave":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredTeam = mockTeamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || member.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <Card className="h-fit">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5" />
            Team Availability
          </CardTitle>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Manage Team
          </Button>
        </div>
        
        <div className="flex gap-2 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search team members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm"
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="on-project">On Project</option>
            <option value="on-leave">On Leave</option>
          </select>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredTeam.map((member) => (
            <div key={member.id} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-medium text-gray-900">{member.name}</h4>
                  <p className="text-sm text-gray-600">{member.specialization}</p>
                </div>
                <Badge className={getStatusColor(member.status)}>
                  {member.status.replace("-", " ")}
                </Badge>
              </div>
              
              <div className="text-xs text-gray-500 mb-2">
                {member.experience} • ₹{member.hourlyRate}/hr
              </div>
              
              {member.currentProject && (
                <div className="text-xs text-orange-600 mb-2">
                  Current: {member.currentProject}
                </div>
              )}
              
              <div className="flex flex-wrap gap-1">
                {member.skills.slice(0, 2).map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {member.skills.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{member.skills.length - 2} more
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <Button className="w-full mt-4 bg-[#fa8c16] hover:bg-[#fa8c16]/90">
          View All Team Members
        </Button>
      </CardContent>
    </Card>
  );
};
