
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Calendar, MapPin } from "lucide-react";

const ExperienceForm = () => {
  const experiences = [
    {
      title: "Senior Control Systems Engineer",
      company: "Industrial Solutions Ltd.",
      location: "Mumbai, India",
      duration: "2020 - Present",
      description: "Led automation projects for manufacturing plants"
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Work Experience</h2>
        <p className="text-gray-600 mt-1">Document your professional experience and achievements.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <Card key={index} className="p-4">
              <div>
                <h3 className="font-medium text-gray-900">{exp.title}</h3>
                <p className="text-sm text-gray-600">{exp.company}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {exp.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {exp.location}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2">{exp.description}</p>
              </div>
            </Card>
          ))}
        </div>

        <div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus size={16} className="mr-2" />
            Add Experience
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

export default ExperienceForm;
