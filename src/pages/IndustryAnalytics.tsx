import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const IndustryAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const requirementsTrend = [
    { month: 'Jan', created: 12, approved: 8, completed: 5 },
    { month: 'Feb', created: 15, approved: 12, completed: 8 },
    { month: 'Mar', created: 18, approved: 15, completed: 12 },
    { month: 'Apr', created: 22, approved: 18, completed: 15 },
    { month: 'May', created: 25, approved: 22, completed: 18 },
    { month: 'Jun', created: 28, approved: 25, completed: 22 }
  ];

  const vendorPerformance = [
    { name: 'TechSolutions Inc.', score: 95, projects: 12 },
    { name: 'LogiFlow Systems', score: 92, projects: 8 },
    { name: 'DigitalPro Agency', score: 89, projects: 15 },
    { name: 'SystemWorks Ltd.', score: 87, projects: 10 },
    { name: 'InnovateCore', score: 85, projects: 6 }
  ];

  const budgetDistribution = [
    { name: 'Software Development', value: 450000, color: '#1a365d' },
    { name: 'Operations', value: 320000, color: '#2d4a6b' },
    { name: 'Marketing', value: 180000, color: '#4a6b8a' },
    { name: 'Infrastructure', value: 150000, color: '#6b8aa9' }
  ];

  const metrics = [
    { title: 'Total Spend', value: '$1.2M', change: '+12%', trend: 'up' },
    { title: 'Active Projects', value: '34', change: '+5%', trend: 'up' },
    { title: 'Avg. Response Time', value: '2.3 days', change: '-8%', trend: 'down' },
    { title: 'Vendor Satisfaction', value: '4.8/5', change: '+3%', trend: 'up' }
  ];

  return (
    <div className="p-6 bg-background min-h-screen space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Analytics & Reports</h1>
        <p className="text-muted-foreground">
          Comprehensive insights into your procurement and project performance
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{metric.value}</div>
              <div className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {metric.change} from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
          <TabsTrigger value="budget">Budget Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Requirements Trend</CardTitle>
                <CardDescription>Monthly requirements creation and completion</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={requirementsTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="created" stroke="#1a365d" strokeWidth={2} />
                    <Line type="monotone" dataKey="approved" stroke="#4a6b8a" strokeWidth={2} />
                    <Line type="monotone" dataKey="completed" stroke="#6b8aa9" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Budget Distribution</CardTitle>
                <CardDescription>Spending by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={budgetDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {budgetDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${(value as number).toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="requirements">
          <Card>
            <CardHeader>
              <CardTitle>Requirements Performance</CardTitle>
              <CardDescription>Monthly requirements processing metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={requirementsTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="created" fill="#1a365d" />
                  <Bar dataKey="approved" fill="#4a6b8a" />
                  <Bar dataKey="completed" fill="#6b8aa9" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vendors">
          <Card>
            <CardHeader>
              <CardTitle>Vendor Performance Scores</CardTitle>
              <CardDescription>Performance metrics for top vendors</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={vendorPerformance} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" width={120} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#1a365d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budget">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Budget Utilization</CardTitle>
                <CardDescription>Current vs allocated budget</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {budgetDistribution.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm font-medium">{item.name}</span>
                      <span className="text-sm text-muted-foreground">
                        ${item.value.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Savings</CardTitle>
                <CardDescription>Monthly savings through optimization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600 mb-2">$45,200</div>
                <div className="text-sm text-muted-foreground">
                  Total savings this month through competitive bidding
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IndustryAnalytics;