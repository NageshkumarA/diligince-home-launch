
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar } from "lucide-react";

const CertificationsForm = () => {
  const certifications = [
    {
      name: "Certified Control Systems Technician",
      issuer: "ISA",
      date: "2023",
      status: "Active"
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Certifications</h2>
        <p className="text-gray-600 mt-1">Manage your professional certifications and licenses.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          {certifications.map((cert, index) => (
            <Card key={index} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{cert.name}</h3>
                  <p className="text-sm text-gray-600">{cert.issuer}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <Calendar size={12} />
                    {cert.date}
                  </p>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {cert.status}
                </Badge>
              </div>
            </Card>
          ))}
        </div>

        <div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus size={16} className="mr-2" />
            Add Certification
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

export default CertificationsForm;
