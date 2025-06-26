
import React from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import IndustryHeader from "@/components/industry/IndustryHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const VendorDetails = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Vendor Details | Diligince.ai</title>
      </Helmet>
      
      <IndustryHeader />
      
      <main className="flex-1 container mx-auto px-4 py-8 pt-20">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Vendor Details</CardTitle>
            <CardDescription>Vendor ID: {id}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Company Information</h3>
              <p className="text-gray-600">Detailed vendor information would be displayed here.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Services</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Manufacturing</Badge>
                <Badge variant="outline">Quality Control</Badge>
                <Badge variant="outline">Supply Chain</Badge>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button>Contact Vendor</Button>
              <Button variant="outline">View Profile</Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default VendorDetails;
