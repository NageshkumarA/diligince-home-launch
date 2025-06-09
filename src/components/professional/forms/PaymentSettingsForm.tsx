
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

const PaymentSettingsForm = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Payment Settings</h2>
        <p className="text-gray-600 mt-1">Configure your payment preferences and banking details.</p>
      </div>

      <form className="space-y-6">
        <Card className="p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Hourly Rate</h3>
          <div>
            <Label htmlFor="hourlyRate">Rate per Hour (₹)</Label>
            <Input id="hourlyRate" type="number" placeholder="Enter your hourly rate" />
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Banking Details</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="bankName">Bank Name</Label>
              <Input id="bankName" placeholder="Enter bank name" />
            </div>
            <div>
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input id="accountNumber" placeholder="Enter account number" />
            </div>
            <div>
              <Label htmlFor="ifscCode">IFSC Code</Label>
              <Input id="ifscCode" placeholder="Enter IFSC code" />
            </div>
          </div>
        </Card>

        <div className="flex gap-3">
          <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
            Save Changes
          </Button>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PaymentSettingsForm;
