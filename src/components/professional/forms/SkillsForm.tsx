
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";

const SkillsForm = () => {
  const skills = ["PLC Programming", "Control Systems", "Industrial Automation", "Electrical Systems"];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Skills & Expertise</h2>
        <p className="text-gray-600 mt-1">Manage your professional skills and areas of expertise.</p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Current Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {skill}
                <X size={14} className="cursor-pointer hover:text-red-500" />
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus size={16} className="mr-2" />
            Add New Skill
          </Button>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
            Save Changes
          </Button>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SkillsForm;
