import React from "react";
import { Helmet } from "react-helmet";
import IndustryHeader from "@/components/industry/IndustryHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const Vendors = () => {
  // Sample skills for the professionals
  const skillsList = [["Manufacturing", "Quality Control", "Six Sigma"], ["Supply Chain", "Logistics", "Procurement"], ["Engineering", "Product Design", "CAD"], ["Project Management", "Lean", "Automation"], ["Regulations", "Compliance", "Safety"], ["Materials Science", "Testing", "R&D"]];
  return <div className="min-h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>Stakeholders | Diligince.ai</title>
      </Helmet>
      
      <IndustryHeader />
      
      <main className="flex-1 container mx-auto px-4 py-8 pt-20">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Stakeholders</h1>
            <p className="text-gray-700 text-lg mt-2">Manage your vendors and expert professionals</p>
          </div>
        </div>
        
        <Tabs defaultValue="vendors" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white border border-gray-100">
            <TabsTrigger value="vendors" className="data-[state=active]:text-blue-600 bg-gray-100">Vendors</TabsTrigger>
            <TabsTrigger value="experts" className="data-[state=active]:text-blue-600 bg-gray-100">Experts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="vendors" className="space-y-6 mt-8">
            <div className="flex justify-end">
              <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
                <Link to="/vendor-profile">Add Vendor</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Sample vendor cards */}
              {[1, 2, 3, 4, 5, 6].map(index => <Card key={index} className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold text-gray-900">Vendor Company {index}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {index % 2 === 0 ? "Product Vendor" : "Service Vendor"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-600 space-y-2">
                      <p><span className="font-medium">Location:</span> City {index}, Country</p>
                      <p><span className="font-medium">Rating:</span> {(Math.random() * 2 + 3).toFixed(1)} / 5</p>
                      <p><span className="font-medium">Projects Completed:</span> {Math.floor(Math.random() * 20) + 5}</p>
                    </div>
                    <div className="mt-6 flex justify-end space-x-2">
                      <Button variant="outline" size="sm" asChild className="border-gray-200 text-gray-700 hover:bg-gray-50">
                        <Link to={`/vendor-details/${index}`}>View Details</Link>
                      </Button>
                      {index === 1 && <Button size="sm" asChild className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
                          <Link to="/work-completion-payment">Review & Pay</Link>
                        </Button>}
                    </div>
                  </CardContent>
                </Card>)}
            </div>
          </TabsContent>
          
          <TabsContent value="experts" className="space-y-6 mt-8">
            <div className="flex justify-end">
              <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
                <Link to="/professional-profile">Add Expert</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Sample expert cards */}
              {[1, 2, 3, 4, 5, 6].map(index => <Card key={index} className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold text-gray-900">Expert Professional {index}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {index % 3 === 0 ? "Manufacturing Specialist" : index % 3 === 1 ? "Supply Chain Consultant" : "Quality Assurance Professional"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-600 space-y-2">
                      <p><span className="font-medium">Experience:</span> {Math.floor(Math.random() * 15) + 5} years</p>
                      <p><span className="font-medium">Rating:</span> {(Math.random() * 2 + 3).toFixed(1)} / 5</p>
                      <div className="mt-3">
                        <p className="mb-2 font-medium text-gray-700">Expertise:</p>
                        <div className="flex flex-wrap gap-1">
                          {skillsList[index % skillsList.length].map((skill, i) => <Badge key={i} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                              {skill}
                            </Badge>)}
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                      <Button variant="outline" size="sm" asChild className="border-gray-200 text-gray-700 hover:bg-gray-50">
                        <Link to={`/professional-details/${index}`}>View Profile</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>)}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>;
};
export default Vendors;