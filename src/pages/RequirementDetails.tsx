
import React from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import IndustryHeader from "@/components/industry/IndustryHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const RequirementDetails = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Requirement Details | Diligince.ai</title>
      </Helmet>
      
      <IndustryHeader />
      
      <main className="flex-1 container mx-auto px-4 py-8 pt-20">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Requirement Details</CardTitle>
            <CardDescription>Requirement ID: {id}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Requirement Information</h3>
              <p className="text-gray-600">Detailed requirement information would be displayed here.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Status</h3>
              <Badge variant="outline">Active</Badge>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600">
                This requirement involves industrial equipment maintenance and quality assurance processes.
              </p>
            </div>
            
            <div className="flex gap-4">
              <Button>Submit Proposal</Button>
              <Button variant="outline">Contact Requester</Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default RequirementDetails;
