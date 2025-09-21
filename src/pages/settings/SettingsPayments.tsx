import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Plus, Calendar, DollarSign, AlertCircle, CheckCircle } from "lucide-react";

interface PaymentMethod {
  id: string;
  type: 'card' | 'bank';
  last4: string;
  brand: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'card',
    last4: '4242',
    brand: 'Visa',
    expiryMonth: 12,
    expiryYear: 2025,
    isDefault: true
  },
  {
    id: '2',
    type: 'bank',
    last4: '6789',
    brand: 'Chase Bank',
    isDefault: false
  }
];

export default function SettingsPayments() {
  const { toast } = useToast();
  const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods);
  const [billingSettings, setBillingSettings] = useState({
    autoRenewal: true,
    emailReceipts: true,
    billingCycle: 'monthly',
    taxId: '',
    companyName: 'Your Company Inc.',
    billingAddress: {
      street: '123 Business Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'US'
    }
  });

  const handleAddPaymentMethod = () => {
    toast({
      title: "Payment method added",
      description: "Your new payment method has been added successfully.",
    });
  };

  const handleSetDefault = (methodId: string) => {
    setPaymentMethods(prev => 
      prev.map(method => ({
        ...method,
        isDefault: method.id === methodId
      }))
    );
    toast({
      title: "Default payment method updated",
      description: "Your default payment method has been changed.",
    });
  };

  const handleBillingSettingChange = (field: string, value: any) => {
    setBillingSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Manage your payment methods for subscriptions and purchases
              </CardDescription>
            </div>
            <Button onClick={handleAddPaymentMethod}>
              <Plus className="h-4 w-4 mr-2" />
              Add Payment Method
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded">
                  <CreditCard className="h-4 w-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {method.brand} ending in {method.last4}
                    </span>
                    {method.isDefault && (
                      <Badge className="badge-success">Default</Badge>
                    )}
                  </div>
                  {method.type === 'card' && (
                    <p className="text-sm text-muted-foreground">
                      Expires {method.expiryMonth}/{method.expiryYear}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!method.isDefault && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleSetDefault(method.id)}
                  >
                    Set as Default
                  </Button>
                )}
                <Button variant="ghost" size="sm">
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Billing Information */}
      <Card>
        <CardHeader>
          <CardTitle>Billing Information</CardTitle>
          <CardDescription>
            Update your billing details and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-field">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={billingSettings.companyName}
                onChange={(e) => handleBillingSettingChange('companyName', e.target.value)}
              />
            </div>
            <div className="form-field">
              <Label htmlFor="taxId">Tax ID</Label>
              <Input
                id="taxId"
                value={billingSettings.taxId}
                onChange={(e) => handleBillingSettingChange('taxId', e.target.value)}
                placeholder="Enter tax ID"
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Billing Address</h4>
            <div className="grid grid-cols-1 gap-4">
              <div className="form-field">
                <Label htmlFor="street">Street Address</Label>
                <Input
                  id="street"
                  value={billingSettings.billingAddress.street}
                  onChange={(e) => handleBillingSettingChange('billingAddress', {
                    ...billingSettings.billingAddress,
                    street: e.target.value
                  })}
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="form-field">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={billingSettings.billingAddress.city}
                    onChange={(e) => handleBillingSettingChange('billingAddress', {
                      ...billingSettings.billingAddress,
                      city: e.target.value
                    })}
                  />
                </div>
                <div className="form-field">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={billingSettings.billingAddress.state}
                    onChange={(e) => handleBillingSettingChange('billingAddress', {
                      ...billingSettings.billingAddress,
                      state: e.target.value
                    })}
                  />
                </div>
                <div className="form-field">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={billingSettings.billingAddress.zipCode}
                    onChange={(e) => handleBillingSettingChange('billingAddress', {
                      ...billingSettings.billingAddress,
                      zipCode: e.target.value
                    })}
                  />
                </div>
                <div className="form-field">
                  <Label htmlFor="country">Country</Label>
                  <Select value={billingSettings.billingAddress.country}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="US">United States</SelectItem>
                      <SelectItem value="CA">Canada</SelectItem>
                      <SelectItem value="GB">United Kingdom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Billing Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Billing Preferences</CardTitle>
          <CardDescription>
            Configure your billing and renewal settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="autoRenewal">Automatic Renewal</Label>
              <p className="text-sm text-muted-foreground">
                Automatically renew your subscription
              </p>
            </div>
            <Switch
              id="autoRenewal"
              checked={billingSettings.autoRenewal}
              onCheckedChange={(checked) => handleBillingSettingChange('autoRenewal', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="emailReceipts">Email Receipts</Label>
              <p className="text-sm text-muted-foreground">
                Send payment receipts to your email
              </p>
            </div>
            <Switch
              id="emailReceipts"
              checked={billingSettings.emailReceipts}
              onCheckedChange={(checked) => handleBillingSettingChange('emailReceipts', checked)}
            />
          </div>

          <div className="form-field">
            <Label htmlFor="billingCycle">Billing Cycle</Label>
            <Select 
              value={billingSettings.billingCycle}
              onValueChange={(value) => handleBillingSettingChange('billingCycle', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="annually">Annually</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Current Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Professional Plan</h3>
              <p className="text-muted-foreground">
                Billed {billingSettings.billingCycle} • Next billing: March 15, 2024
              </p>
              <div className="flex items-center gap-2 mt-2">
                <DollarSign className="h-4 w-4" />
                <span className="font-medium">$99/month</span>
              </div>
            </div>
            <Button variant="outline">Change Plan</Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}