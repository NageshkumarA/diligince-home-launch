
import React, { useState } from "react";
import { FormModal } from "@/components/shared/modals/FormModal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X, FileText, Users, Calendar, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface ProposalCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  rfq: any;
}

export const ProposalCreationModal: React.FC<ProposalCreationModalProps> = ({
  isOpen,
  onClose,
  rfq
}) => {
  const { toast } = useToast();
  const [proposalData, setProposalData] = useState({
    scope: "",
    teamMembers: [] as string[],
    timeline: "",
    totalCost: "",
    laborCost: "",
    materialCost: "",
    overheadCost: "",
    terms: "",
    milestones: [] as { name: string; duration: string; cost: string }[]
  });

  const mockTeamMembers = [
    "Rajiv Sharma - PLC Programming",
    "Sandeep Kumar - SCADA Systems", 
    "Priya Mehta - Control Systems",
    "Vijay Reddy - Electrical Systems",
    "Amit Singh - Instrumentation"
  ];

  const addTeamMember = (member: string) => {
    if (!proposalData.teamMembers.includes(member)) {
      setProposalData({
        ...proposalData,
        teamMembers: [...proposalData.teamMembers, member]
      });
    }
  };

  const removeTeamMember = (member: string) => {
    setProposalData({
      ...proposalData,
      teamMembers: proposalData.teamMembers.filter(m => m !== member)
    });
  };

  const addMilestone = () => {
    setProposalData({
      ...proposalData,
      milestones: [...proposalData.milestones, { name: "", duration: "", cost: "" }]
    });
  };

  const updateMilestone = (index: number, field: string, value: string) => {
    const updatedMilestones = proposalData.milestones.map((milestone, i) => 
      i === index ? { ...milestone, [field]: value } : milestone
    );
    setProposalData({ ...proposalData, milestones: updatedMilestones });
  };

  const removeMilestone = (index: number) => {
    setProposalData({
      ...proposalData,
      milestones: proposalData.milestones.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Proposal Submitted",
      description: `Your proposal for "${rfq?.title}" has been submitted successfully.`,
    });
    onClose();
  };

  if (!rfq) return null;

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Create Proposal - ${rfq.title}`}
      onSubmit={handleSubmit}
      submitText="Submit Proposal"
      maxWidth="max-w-4xl"
    >
      {/* RFQ Summary */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium mb-2">RFQ Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>Company: {rfq.company}</div>
          <div>Budget: {rfq.budget}</div>
          <div>Duration: {rfq.duration}</div>
          <div>Engineers Required: {rfq.engineersRequired}</div>
        </div>
      </div>

      {/* Service Scope */}
      <div>
        <label className="block text-sm font-medium mb-2">Service Scope & Description</label>
        <Textarea
          placeholder="Describe the services you will provide..."
          value={proposalData.scope}
          onChange={(e) => setProposalData({ ...proposalData, scope: e.target.value })}
          rows={4}
        />
      </div>

      {/* Team Assignment */}
      <div>
        <label className="block text-sm font-medium mb-2 flex items-center gap-2">
          <Users className="h-4 w-4" />
          Team Assignment
        </label>
        <Select onValueChange={addTeamMember}>
          <SelectTrigger>
            <SelectValue placeholder="Select team members" />
          </SelectTrigger>
          <SelectContent>
            {mockTeamMembers.map((member) => (
              <SelectItem key={member} value={member}>
                {member}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <div className="flex flex-wrap gap-2 mt-2">
          {proposalData.teamMembers.map((member) => (
            <Badge key={member} variant="secondary" className="flex items-center gap-1">
              {member.split(" - ")[0]}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => removeTeamMember(member)}
              />
            </Badge>
          ))}
        </div>
      </div>

      {/* Timeline & Cost */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Project Timeline
          </label>
          <Input
            placeholder="e.g., 4 weeks"
            value={proposalData.timeline}
            onChange={(e) => setProposalData({ ...proposalData, timeline: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Total Cost
          </label>
          <Input
            placeholder="₹ 350,000"
            value={proposalData.totalCost}
            onChange={(e) => setProposalData({ ...proposalData, totalCost: e.target.value })}
          />
        </div>
      </div>

      {/* Cost Breakdown */}
      <div>
        <h3 className="font-medium mb-2">Cost Breakdown</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Labor Cost</label>
            <Input
              placeholder="₹ 200,000"
              value={proposalData.laborCost}
              onChange={(e) => setProposalData({ ...proposalData, laborCost: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Material Cost</label>
            <Input
              placeholder="₹ 100,000"
              value={proposalData.materialCost}
              onChange={(e) => setProposalData({ ...proposalData, materialCost: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Overhead & Profit</label>
            <Input
              placeholder="₹ 50,000"
              value={proposalData.overheadCost}
              onChange={(e) => setProposalData({ ...proposalData, overheadCost: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Project Milestones</h3>
          <Button variant="outline" size="sm" onClick={addMilestone} type="button">
            <Plus className="h-4 w-4 mr-1" />
            Add Milestone
          </Button>
        </div>
        {proposalData.milestones.map((milestone, index) => (
          <div key={index} className="grid grid-cols-12 gap-2 mb-2">
            <div className="col-span-5">
              <Input
                placeholder="Milestone name"
                value={milestone.name}
                onChange={(e) => updateMilestone(index, "name", e.target.value)}
              />
            </div>
            <div className="col-span-3">
              <Input
                placeholder="Duration"
                value={milestone.duration}
                onChange={(e) => updateMilestone(index, "duration", e.target.value)}
              />
            </div>
            <div className="col-span-3">
              <Input
                placeholder="Cost"
                value={milestone.cost}
                onChange={(e) => updateMilestone(index, "cost", e.target.value)}
              />
            </div>
            <div className="col-span-1">
              <Button variant="ghost" size="sm" onClick={() => removeMilestone(index)} type="button">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Terms & Conditions */}
      <div>
        <label className="block text-sm font-medium mb-2">Terms & Conditions</label>
        <Textarea
          placeholder="Payment terms, delivery conditions, warranties..."
          value={proposalData.terms}
          onChange={(e) => setProposalData({ ...proposalData, terms: e.target.value })}
          rows={3}
        />
      </div>
    </FormModal>
  );
};
