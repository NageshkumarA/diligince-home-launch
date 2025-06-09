
import React, { useState } from "react";
import { BaseModal } from "@/components/shared/modals/BaseModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, DollarSign, Calendar } from "lucide-react";

interface Job {
  id: number;
  title: string;
  company: string;
  budget: string;
  duration: string;
  location: string;
  skillsMatch: number;
  postedDate: string;
  deadline: string;
  status: string;
  description: string;
  requirements: string[];
}

interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job | null;
  onSubmit: (jobId: number, applicationData: any) => void;
}

export const JobApplicationModal = ({
  isOpen,
  onClose,
  job,
  onSubmit
}: JobApplicationModalProps) => {
  const [coverLetter, setCoverLetter] = useState("");

  if (!job) return null;

  const handleSubmit = () => {
    onSubmit(job.id, {
      coverLetter,
      appliedDate: new Date().toISOString()
    });
    setCoverLetter("");
    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Job Application"
      maxWidth="2xl"
    >
      <div className="space-y-6">
        {/* Job Header */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
          <p className="text-gray-600 mb-3">{job.company}</p>
          <Badge variant="outline" className="text-green-600 border-green-200">
            {job.skillsMatch}% skills match
          </Badge>
        </div>

        {/* Job Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
              <DollarSign size={14} />
              Budget
            </div>
            <p className="font-medium text-gray-900">{job.budget}</p>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
              <Clock size={14} />
              Duration
            </div>
            <p className="font-medium text-gray-900">{job.duration}</p>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
              <MapPin size={14} />
              Location
            </div>
            <p className="font-medium text-gray-900">{job.location}</p>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
              <Calendar size={14} />
              Deadline
            </div>
            <p className="font-medium text-gray-900">{job.deadline}</p>
          </div>
        </div>

        {/* Description */}
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Description</h4>
          <p className="text-gray-600 text-sm">{job.description}</p>
        </div>

        {/* Requirements */}
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Requirements</h4>
          <div className="flex flex-wrap gap-2">
            {job.requirements.map((req, index) => (
              <Badge key={index} variant="secondary">
                {req}
              </Badge>
            ))}
          </div>
        </div>

        {/* Cover Letter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cover Letter
          </label>
          <textarea
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            rows={4}
            placeholder="Write a brief cover letter explaining why you're the perfect fit for this role..."
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button 
            onClick={handleSubmit}
            className="flex-1 bg-purple-600 hover:bg-purple-700"
          >
            Submit Application
          </Button>
          <Button 
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};
