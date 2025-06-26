import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Clock } from "lucide-react";
const teamMembers = [{
  id: 1,
  name: "Rajesh Kumar",
  role: "Senior Electrical Engineer",
  availability: "available",
  nextAssignment: "May 20, 2024",
  skills: ["PLC Programming", "SCADA", "Panel Design"],
  experience: "8 years"
}, {
  id: 2,
  name: "Priya Sharma",
  role: "Control Systems Engineer",
  availability: "busy",
  currentProject: "Steel Plant SCADA",
  nextAvailable: "May 25, 2024",
  skills: ["Control Systems", "HMI Design"],
  experience: "6 years"
}, {
  id: 3,
  name: "Amit Patel",
  role: "Automation Specialist",
  availability: "available",
  nextAssignment: "May 18, 2024",
  skills: ["Industrial Automation", "Robotics"],
  experience: "10 years"
}];
const getAvailabilityColor = (status: string) => {
  switch (status) {
    case 'available':
      return 'bg-green-50 text-green-700 border-green-200';
    case 'busy':
      return 'bg-red-50 text-red-700 border-red-200';
    case 'partial':
      return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};
export const TeamAvailability = () => {
  return <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="border-b border-gray-50 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            Team Availability
          </CardTitle>
          <Button className="text-white font-medium bg-yellow-600 hover:bg-yellow-500">
            Manage Team
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-5 max-h-96 overflow-y-auto">
          {teamMembers.map(member => <div key={member.id} className="bg-gray-50 border border-gray-100 rounded-xl p-5 hover:bg-gray-100 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-lg">{member.name}</h4>
                  <p className="text-base font-semibold text-gray-700">{member.role}</p>
                  <p className="text-sm text-gray-600 mt-1">{member.experience} experience</p>
                </div>
                <Badge className={`${getAvailabilityColor(member.availability)} font-semibold text-sm px-3 py-1`}>
                  {member.availability.toUpperCase()}
                </Badge>
              </div>
              
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {member.skills.slice(0, 2).map((skill, index) => <Badge key={index} variant="secondary" className="text-sm bg-blue-50 text-blue-700 border-blue-200 px-3 py-1">
                      {skill}
                    </Badge>)}
                  {member.skills.length > 2 && <Badge variant="secondary" className="text-sm bg-gray-100 text-gray-600 px-3 py-1">  
                      +{member.skills.length - 2} more
                    </Badge>}
                </div>
              </div>
              
              <div className="text-base text-gray-700">
                {member.availability === 'available' ? <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-green-600" />
                    <span>Next assignment: <span className="font-semibold text-gray-900">{member.nextAssignment}</span></span>
                  </div> : <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-red-600" />
                      <span>Current: <span className="font-semibold text-gray-900">{member.currentProject}</span></span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-gray-500" />
                      <span>Available: <span className="font-semibold text-gray-900">{member.nextAvailable}</span></span>
                    </div>
                  </div>}
              </div>
            </div>)}
        </div>
        
        <div className="mt-6 p-5 bg-blue-50 border border-blue-100 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-gray-900 text-lg">Team Utilization</p>
              <p className="text-base text-gray-700">7 of 12 engineers currently available</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-blue-600">58%</p>
              <p className="text-sm text-gray-600">Capacity</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>;
};