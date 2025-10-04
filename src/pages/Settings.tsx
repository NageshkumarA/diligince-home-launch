import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Building2, Users, CreditCard, Save, Edit } from 'lucide-react';

const Settings: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('company');

  const tabs = [
    { id: 'company', label: 'Company Profile', icon: Building2 },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'payments', label: 'Payments', icon: CreditCard }
  ];

  const renderCompanyProfile = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[#333333] mb-2">Company Name</label>
          <input
            type="text"
            defaultValue="Tech Solutions Inc."
            className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F80ED] focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#333333] mb-2">Industry</label>
          <select className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F80ED] focus:border-transparent">
            <option>Technology</option>
            <option>Healthcare</option>
            <option>Finance</option>
            <option>Manufacturing</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#333333] mb-2">Email</label>
          <input
            type="email"
            defaultValue="contact@techsolutions.com"
            className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F80ED] focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#333333] mb-2">Phone</label>
          <input
            type="tel"
            defaultValue="+1 (555) 123-4567"
            className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F80ED] focus:border-transparent"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-[#333333] mb-2">Address</label>
        <textarea
          rows={3}
          defaultValue="123 Business Street, Suite 100, New York, NY 10001"
          className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F80ED] focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#333333] mb-2">Company Description</label>
        <textarea
          rows={4}
          defaultValue="Leading technology solutions provider specializing in digital transformation and innovative software development."
          className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F80ED] focus:border-transparent"
        />
      </div>
    </div>
  );

  const renderMembers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-[#333333]">Team Members</h3>
        <button className="bg-[#2F80ED] text-white px-4 py-2 rounded-lg hover:bg-[#1A2A4F] transition-colors">
          Invite Member
        </button>
      </div>
      
      <div className="space-y-4">
        {[
          { name: 'John Smith', email: 'john@techsolutions.com', role: 'Admin', status: 'Active' },
          { name: 'Sarah Johnson', email: 'sarah@techsolutions.com', role: 'Manager', status: 'Active' },
          { name: 'Mike Wilson', email: 'mike@techsolutions.com', role: 'Member', status: 'Pending' }
        ].map((member, index) => (
          <div key={index} className="bg-[#FAFAFA] rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-[#2F80ED] rounded-full flex items-center justify-center text-white font-medium">
                {member.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-medium text-[#333333]">{member.name}</h4>
                <p className="text-sm text-[#828282]">{member.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-[#828282]">{member.role}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                member.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {member.status}
              </span>
              <button className="text-[#828282] hover:text-[#333333]">
                <Edit className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPayments = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#FAFAFA] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-[#333333] mb-4">Current Plan</h3>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-[#2F80ED]">Professional</p>
            <p className="text-[#828282]">$99/month</p>
            <p className="text-sm text-[#828282]">Next billing: March 15, 2024</p>
          </div>
          <button className="mt-4 bg-[#2F80ED] text-white px-4 py-2 rounded-lg hover:bg-[#1A2A4F] transition-colors">
            Upgrade Plan
          </button>
        </div>
        
        <div className="bg-[#FAFAFA] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-[#333333] mb-4">Payment Method</h3>
          <div className="space-y-2">
            <p className="text-[#333333]">**** **** **** 4567</p>
            <p className="text-[#828282]">Expires 12/26</p>
            <p className="text-sm text-[#828282]">Visa</p>
          </div>
          <button className="mt-4 border border-[#E0E0E0] text-[#333333] px-4 py-2 rounded-lg hover:bg-white transition-colors">
            Update Card
          </button>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-[#333333] mb-4">Billing History</h3>
        <div className="space-y-3">
          {[
            { date: 'Feb 15, 2024', amount: '$99.00', status: 'Paid' },
            { date: 'Jan 15, 2024', amount: '$99.00', status: 'Paid' },
            { date: 'Dec 15, 2023', amount: '$99.00', status: 'Paid' }
          ].map((invoice, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-[#E0E0E0] rounded-lg">
              <div>
                <p className="font-medium text-[#333333]">{invoice.date}</p>
                <p className="text-sm text-[#828282]">Professional Plan</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-[#333333]">{invoice.amount}</p>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  {invoice.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#333333] mb-2">Settings</h1>
        <p className="text-[#828282]">Manage your company profile, team members, and billing information.</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#E0E0E0] mb-8">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#2F80ED] text-[#2F80ED]'
                    : 'border-transparent text-[#828282] hover:text-[#333333]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E0E0E0] p-6">
        {activeTab === 'company' && renderCompanyProfile()}
        {activeTab === 'members' && renderMembers()}
        {activeTab === 'payments' && renderPayments()}
        
        {activeTab === 'company' && (
          <div className="flex justify-end mt-8 pt-6 border-t border-[#E0E0E0]">
            <button className="flex items-center space-x-2 bg-[#27AE60] text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors">
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;