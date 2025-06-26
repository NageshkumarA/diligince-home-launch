
import React from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import IndustryHeader from "@/components/industry/IndustryHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ProfessionalDetails = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Professional Details | Diligince.ai</title>
      </Helmet>
      
      <IndustryHeader />
      
      <main className="flex-1 container mx-auto px-4 py-8 pt-20">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Professional Details</CardTitle>
            <CardDescription>Professional ID: {id}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Professional Information</h3>
              <p className="text-gray-600">Detailed professional information would be displayed here.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Expertise</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Project Management</Badge>
                <Badge variant="outline">Engineering</Badge>
                <Badge variant="outline">Quality Assurance</Badge>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Experience</h3>
              <p className="text-gray-600">10+ years in industrial manufacturing</p>
            </div>
            
            <div className="flex gap-4">
              <Button>Hire Professional</Button>
              <Button variant="outline">View Portfolio</Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ProfessionalDetails;
