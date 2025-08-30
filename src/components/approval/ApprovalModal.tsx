
import React, { useState } from "react";
import { BaseModal } from "@/components/shared/modals/BaseModal";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Clock, DollarSign, FileText } from "lucide-react";
import { toast } from "sonner";

interface ApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  requirement: {
    id: string;
    title: string;
    budget: number;
    priority: string;
    description: string;
    category: string;
    deadline: string;
    isUrgent?: boolean;
  };
  approvalLevel: number;
  onApprove: (comments: string) => void;
  onReject: (comments: string) => void;
}

export const ApprovalModal = ({
  isOpen,
  onClose,
  requirement,
  approvalLevel,
  onApprove,
  onReject
}: ApprovalModalProps) => {
  const [comments, setComments] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApprove = async () => {
    if (!comments.trim()) {
      toast.error("Comments are required for approval");
      return;
    }
    
    setIsSubmitting(true);
    try {
      onApprove(comments);
      toast.success("Requirement approved successfully");
      setComments("");
      onClose();
    } catch (error) {
      toast.error("Failed to approve requirement");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!comments.trim()) {
      toast.error("Comments are required for rejection");
      return;
    }
    
    setIsSubmitting(true);
    try {
      onReject(comments);
      toast.error("Requirement rejected");
      setComments("");
      onClose();
    } catch (error) {
      toast.error("Failed to reject requirement");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-100 text-red-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "medium": return "bg-primary/10 text-primary";
      case "low": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Review Requirement Approval"
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        {/* Urgent Alert Banner */}
        {requirement.priority === "critical" && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <h3 className="font-medium text-red-800">URGENT REQUIREMENT</h3>
            </div>
            <p className="text-sm text-red-700">
              This is an URGENT requirement. Fast approval is required as per ISO 9001 guidelines.
            </p>
          </div>
        )}

        {/* Requirement Summary */}
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{requirement.title}</h3>
              <p className="text-sm text-gray-500">REQ-{requirement.id}</p>
            </div>
            <Badge className={getPriorityColor(requirement.priority)}>
              {requirement.priority}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Budget</p>
                <p className="font-medium">${requirement.budget.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Deadline</p>
                <p className="font-medium">{new Date(requirement.deadline).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="font-medium">{requirement.category}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Approval Level</p>
              <p className="font-medium">Level {approvalLevel}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">Description</p>
            <p className="text-gray-700">{requirement.description}</p>
          </div>
        </div>

        {/* Comments Section */}
        <div className="space-y-2">
          <Label htmlFor="approval-comments">Comments (Required)</Label>
          <Textarea
            id="approval-comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Please provide your comments for this approval decision..."
            rows={4}
            className="resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            variant="outline"
            onClick={handleReject}
            disabled={isSubmitting}
            className="text-red-600 border-red-300 hover:bg-red-50"
          >
            Reject
          </Button>
          <Button
            onClick={handleApprove}
            disabled={isSubmitting}
            className="bg-green-600 hover:bg-green-700"
          >
            Approve
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};
