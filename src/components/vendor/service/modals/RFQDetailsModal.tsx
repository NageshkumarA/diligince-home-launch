
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, DollarSign, Building, Clock, User, FileText } from "lucide-react";

interface RFQDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  rfq: {
    id: string;
    title: string;
    company: string;
    budget: string;
    deadline: string;
    status: string;
    priority: string;
    description: string;
    skills: string[];
    submittedDate: string;
    responses: number;
  };
}

export const RFQDetailsModal = ({ isOpen, onClose, rfq }: RFQDetailsModalProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-green-100 text-green-700";
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "submitted": return "bg-blue-100 text-blue-700";
      case "closed": return "bg-gray-100 text-gray-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-700";
      case "medium": return "bg-orange-100 text-orange-700";
      case "low": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Industrial RFQ Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">{rfq.title}</h2>
            <div className="flex gap-2 mb-4">
              <Badge className={getStatusColor(rfq.status)}>{rfq.status}</Badge>
              <Badge className={getPriorityColor(rfq.priority)}>{rfq.priority}</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Company:</span>
                <span>{rfq.company}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Budget:</span>
                <span>{rfq.budget}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Deadline:</span>
                <span>{rfq.deadline}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Submitted:</span>
                <span>{rfq.submittedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Responses:</span>
                <span>{rfq.responses}</span>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">Project Description</h3>
            <p className="text-gray-600">{rfq.description}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Required Industrial Skills</h3>
            <div className="flex flex-wrap gap-2">
              {rfq.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="bg-yellow-50 text-yellow-700">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button className="bg-yellow-600 hover:bg-yellow-700">
              <FileText className="mr-2 h-4 w-4" />
              Create Proposal
            </Button>
            <Button variant="outline">
              Download RFQ
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
