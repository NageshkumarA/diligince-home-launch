
import React from "react";
import { Helmet } from "react-helmet";
import { PurchaseOrderHeader } from "@/components/purchase-order/PurchaseOrderHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Experts = () => {
  // Sample skills for the experts
  const skillsList = [
    ["Manufacturing", "Quality Control", "Six Sigma"],
    ["Supply Chain", "Logistics", "Procurement"],
    ["Engineering", "Product Design", "CAD"],
    ["Project Management", "Lean", "Automation"],
    ["Regulations", "Compliance", "Safety"],
    ["Materials Science", "Testing", "R&D"]
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Industry Experts | Diligince.ai</title>
      </Helmet>
      
      <PurchaseOrderHeader />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Industry Experts</h1>
          <Button asChild>
            <Link to="/professional-profile">Become an Expert</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sample expert cards */}
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-2">
                <CardTitle>Expert Name {index}</CardTitle>
                <CardDescription>
                  {index % 3 === 0 
                    ? "Manufacturing Specialist" 
                    : index % 3 === 1 
                      ? "Supply Chain Consultant" 
                      : "Quality Assurance Expert"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-500 space-y-2">
                  <p>Experience: {Math.floor(Math.random() * 15) + 5} years</p>
                  <p>Rating: {(Math.random() * 2 + 3).toFixed(1)} / 5</p>
                  <div className="mt-2">
                    <p className="mb-1">Expertise:</p>
                    <div className="flex flex-wrap gap-1">
                      {skillsList[index % skillsList.length].map((skill, i) => (
                        <Badge key={i} variant="outline" className="bg-blue-50">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/expert-details/${index}`}>View Profile</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Experts;
