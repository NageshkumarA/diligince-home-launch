import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const IndustryReports = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const monthlyData = [
    { month: 'Jan', requirements: 45, orders: 32, spent: 125000 },
    { month: 'Feb', requirements: 52, orders: 38, spent: 145000 },
    { month: 'Mar', requirements: 48, orders: 35, spent: 135000 },
    { month: 'Apr', requirements: 61, orders: 42, spent: 165000 },
    { month: 'May', requirements: 55, orders: 40, spent: 155000 },
    { month: 'Jun', requirements: 67, orders: 48, spent: 185000 }
  ];

  const categoryData = [
    { name: 'Equipment', value: 35, color: '#1a365d' },
    { name: 'Services', value: 28, color: '#2563eb' },
    { name: 'Software', value: 20, color: '#7c3aed' },
    { name: 'Logistics', value: 17, color: '#059669' }
  ];

  const vendorPerformance = [
    { vendor: 'Tech Solutions', orders: 15, rating: 4.8, onTime: 95 },
    { vendor: 'Industrial Corp', orders: 12, rating: 4.6, onTime: 88 },
    { vendor: 'Equipment Ltd', orders: 18, rating: 4.5, onTime: 92 },
    { vendor: 'Service Pro', orders: 10, rating: 4.7, onTime: 90 }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'procurement', label: 'Procurement' },
    { id: 'vendors', label: 'Vendors' },
    { id: 'analytics', label: 'Analytics' }
  ];

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">328</div>
          <p className="text-xs text-green-600">+12% from last month</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Active Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">235</div>
          <p className="text-xs text-green-600">+8% from last month</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Spend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">$1.2M</div>
          <p className="text-xs text-red-600">-3% from last month</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Active Vendors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">84</div>
          <p className="text-xs text-green-600">+5 new vendors</p>
        </CardContent>
      </Card>
    </div>
  );

  const renderProcurement = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Monthly Procurement Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="requirements" stroke="#1a365d" name="Requirements" />
              <Line type="monotone" dataKey="orders" stroke="#2563eb" name="Orders" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Category Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  const renderVendors = () => (
    <Card>
      <CardHeader>
        <CardTitle>Vendor Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Vendor</th>
                <th className="text-center p-3">Orders</th>
                <th className="text-center p-3">Rating</th>
                <th className="text-center p-3">On-Time %</th>
              </tr>
            </thead>
            <tbody>
              {vendorPerformance.map((vendor, index) => (
                <tr key={index} className="border-b hover:bg-muted/50">
                  <td className="p-3 font-medium">{vendor.vendor}</td>
                  <td className="p-3 text-center">{vendor.orders}</td>
                  <td className="p-3 text-center">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      ⭐ {vendor.rating}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                      vendor.onTime >= 90 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {vendor.onTime}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );

  const renderAnalytics = () => (
    <Card>
      <CardHeader>
        <CardTitle>Spending Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Spending']} />
            <Bar dataKey="spent" fill="#1a365d" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'procurement': return renderProcurement();
      case 'vendors': return renderVendors();
      case 'analytics': return renderAnalytics();
      default: return renderOverview();
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Reports & Analytics</h1>
          <p className="text-muted-foreground">Comprehensive insights into your procurement activities</p>
        </div>
      </div>

      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-background text-primary shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {renderContent()}
    </div>
  );
};

export default IndustryReports;