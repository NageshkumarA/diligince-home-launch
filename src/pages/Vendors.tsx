
import React from "react";
import { Helmet } from "react-helmet";
import PurchaseOrderHeader from "@/components/purchase-order/PurchaseOrderHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Vendors = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Vendors | Diligince.ai</title>
      </Helmet>
      
      <PurchaseOrderHeader />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Vendors</h1>
          <Button asChild>
            <Link to="/vendor-profile">Add Vendor</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sample vendor cards */}
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-2">
                <CardTitle>Vendor Company {index}</CardTitle>
                <CardDescription>
                  {index % 2 === 0 ? "Product Vendor" : "Service Vendor"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-500 space-y-2">
                  <p>Location: City {index}, Country</p>
                  <p>Rating: {(Math.random() * 2 + 3).toFixed(1)} / 5</p>
                  <p>Projects Completed: {Math.floor(Math.random() * 20) + 5}</p>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/vendor-details/${index}`}>View Details</Link>
                  </Button>
                  {index === 1 && (
                    <Button size="sm" asChild>
                      <Link to="/work-completion-payment">Review & Pay</Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Vendors;
