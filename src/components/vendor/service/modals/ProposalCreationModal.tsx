
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Plus, Minus, Send } from "lucide-react";

interface ProposalCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  rfqTitle: string;
}

interface Milestone {
  title: string;
  description: string;
  duration: string;
  cost: string;
}

export const ProposalCreationModal = ({ isOpen, onClose, rfqTitle }: ProposalCreationModalProps) => {
  const [proposalData, setProposalData] = useState({
    title: "",
    overview: "",
    totalBudget: "",
    timeline: "",
    approach: ""
  });

  const [milestones, setMilestones] = useState<Milestone[]>([
    { title: "", description: "", duration: "", cost: "" }
  ]);

  const addMilestone = () => {
    setMilestones([...milestones, { title: "", description: "", duration: "", cost: "" }]);
  };

  const removeMilestone = (index: number) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  const updateMilestone = (index: number, field: keyof Milestone, value: string) => {
    const updated = [...milestones];
    updated[index][field] = value;
    setMilestones(updated);
  };

  const handleSubmit = () => {
    console.log("Submitting proposal:", { proposalData, milestones });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Create Proposal</DialogTitle>
          <p className="text-gray-600">For: {rfqTitle}</p>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Proposal Title</Label>
              <Input
                id="title"
                value={proposalData.title}
                onChange={(e) => setProposalData({...proposalData, title: e.target.value})}
                placeholder="Enter proposal title"
              />
            </div>
            <div>
              <Label htmlFor="budget">Total Budget</Label>
              <Input
                id="budget"
                value={proposalData.totalBudget}
                onChange={(e) => setProposalData({...proposalData, totalBudget: e.target.value})}
                placeholder="$0"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="overview">Project Overview</Label>
            <Textarea
              id="overview"
              value={proposalData.overview}
              onChange={(e) => setProposalData({...proposalData, overview: e.target.value})}
              placeholder="Provide a comprehensive overview of your approach..."
              className="min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="timeline">Project Timeline</Label>
              <Select onValueChange={(value) => setProposalData({...proposalData, timeline: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-2 weeks">1-2 weeks</SelectItem>
                  <SelectItem value="3-4 weeks">3-4 weeks</SelectItem>
                  <SelectItem value="1-2 months">1-2 months</SelectItem>
                  <SelectItem value="3-6 months">3-6 months</SelectItem>
                  <SelectItem value="6+ months">6+ months</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="approach">Methodology</Label>
              <Select onValueChange={(value) => setProposalData({...proposalData, approach: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select approach" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="agile">Agile Development</SelectItem>
                  <SelectItem value="waterfall">Waterfall</SelectItem>
                  <SelectItem value="hybrid">Hybrid Approach</SelectItem>
                  <SelectItem value="custom">Custom Methodology</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Project Milestones</h3>
              <Button type="button" variant="outline" onClick={addMilestone}>
                <Plus className="mr-2 h-4 w-4" />
                Add Milestone
              </Button>
            </div>

            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Milestone {index + 1}</h4>
                    {milestones.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMilestone(index)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                      placeholder="Milestone title"
                      value={milestone.title}
                      onChange={(e) => updateMilestone(index, 'title', e.target.value)}
                    />
                    <Input
                      placeholder="Duration (e.g., 2 weeks)"
                      value={milestone.duration}
                      onChange={(e) => updateMilestone(index, 'duration', e.target.value)}
                    />
                  </div>
                  
                  <Textarea
                    placeholder="Milestone description and deliverables"
                    value={milestone.description}
                    onChange={(e) => updateMilestone(index, 'description', e.target.value)}
                    className="min-h-[80px]"
                  />
                  
                  <Input
                    placeholder="Cost ($)"
                    value={milestone.cost}
                    onChange={(e) => updateMilestone(index, 'cost', e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleSubmit} className="bg-yellow-600 hover:bg-yellow-700">
              <Send className="mr-2 h-4 w-4" />
              Submit Proposal
            </Button>
            <Button variant="outline">
              Save Draft
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
