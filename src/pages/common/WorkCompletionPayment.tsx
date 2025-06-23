
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, Star } from "lucide-react";

const WorkCompletionPayment = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <div className="text-center mb-12">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Work Completed Successfully!</h1>
              <p className="text-gray-600">
                Your project has been completed and payment has been processed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Project ID</p>
                      <p className="text-lg font-semibold">#PRJ-2024-001</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Service Provider</p>
                      <p className="text-lg font-semibold">TechServe Solutions</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Completion Date</p>
                      <p className="text-lg font-semibold">January 15, 2025</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Amount</p>
                      <p className="text-lg font-semibold">₹45,000</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Payment Method</p>
                      <p className="text-lg font-semibold">Bank Transfer</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Transaction ID</p>
                      <p className="text-lg font-semibold">TXN-202501150001</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 text-center space-y-4">
              <Button className="mr-4">
                <Download className="mr-2 h-4 w-4" />
                Download Receipt
              </Button>
              <Button variant="outline">
                <Star className="mr-2 h-4 w-4" />
                Rate Service Provider
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default WorkCompletionPayment;
