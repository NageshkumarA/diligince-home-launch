
import React, { useState } from "react";
import { FormModal } from "@/components/shared/modals/FormModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, DollarSign, Clock } from "lucide-react";

interface Job {
  id: number;
  title: string;
  company: string;
  budget: string;
  duration: string;
  location: string;
  skillsMatch: number;
  description: string;
  requirements: string[];
}

interface JobApplicationModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (applicationData: any) => void;
}

export const JobApplicationModal = ({ job, isOpen, onClose, onSubmit }: JobApplicationModalProps) => {
  const [applicationData, setApplicationData] = useState({
    coverLetter: "",
    rateQuotation: "",
    timeline: "",
    availability: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(applicationData);
  };

  const handleChange = (field: string, value: string) => {
    setApplicationData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={job.title}
      onSubmit={handleSubmit}
      submitText="Submit Application"
      maxWidth="max-w-2xl"
    >
      {/* Job Header */}
      <div className="mb-4">
        <p className="text-base text-gray-600 mb-3">{job.company}</p>
        
        {/* Job Details */}
        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-gray-500" />
            <span>{job.budget}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span>{job.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <Badge className="bg-green-100 text-green-800">
              {job.skillsMatch}% Skills Match
            </Badge>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Job Description</h3>
          <p className="text-sm text-gray-600 mb-3">{job.description}</p>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Required Skills</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {job.requirements.map((req, index) => (
              <Badge key={index} variant="secondary">
                {req}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Application Form */}
      <div>
        <Label htmlFor="coverLetter">Cover Letter</Label>
        <Textarea
          id="coverLetter"
          placeholder="Explain why you're the perfect fit for this project..."
          value={applicationData.coverLetter}
          onChange={(e) => handleChange("coverLetter", e.target.value)}
          className="mt-1 min-h-[100px]"
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="rateQuotation">Your Rate Quotation</Label>
          <Input
            id="rateQuotation"
            placeholder="₹2,50,000"
            value={applicationData.rateQuotation}
            onChange={(e) => handleChange("rateQuotation", e.target.value)}
            className="mt-1"
            required
          />
        </div>
        <div>
          <Label htmlFor="timeline">Proposed Timeline</Label>
          <Input
            id="timeline"
            placeholder="3 weeks"
            value={applicationData.timeline}
            onChange={(e) => handleChange("timeline", e.target.value)}
            className="mt-1"
            required
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="availability">Availability Confirmation</Label>
        <Textarea
          id="availability"
          placeholder="I am available to start immediately and can dedicate full time to this project..."
          value={applicationData.availability}
          onChange={(e) => handleChange("availability", e.target.value)}
          className="mt-1"
          required
        />
      </div>
    </FormModal>
  );
};
