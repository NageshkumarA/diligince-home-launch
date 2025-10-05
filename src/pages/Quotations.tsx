import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Search, Filter, FileText, DollarSign, Calendar, Building2 } from 'lucide-react';
import { isIndustryRole } from '@/utils/roleUtils';

const Quotations: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock quotations data
  const mockQuotations = [
    {
      id: '1',
      title: 'Mobile App Development Project',
      company: 'Tech Solutions Inc.',
      amount: '$18,500',
      status: 'pending',
      submittedDate: '2 days ago',
      deadline: '5 days left',
      description: 'Cross-platform mobile application with payment integration'
    },
    {
      id: '2',
      title: 'Cloud Infrastructure Setup',
      company: 'StartupHub Inc.',
      amount: '$12,000',
      status: 'accepted',
      submittedDate: '1 week ago',
      deadline: 'Accepted',
      description: 'AWS cloud infrastructure with monitoring and security'
    },
    {
      id: '3',
      title: 'Digital Marketing Campaign',
      company: 'Innovation Corp.',
      amount: '$8,500',
      status: 'rejected',
      submittedDate: '3 days ago',
      deadline: 'Rejected',
      description: 'Comprehensive digital marketing strategy and execution'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#333333] mb-2">Quotations</h1>
        <p className="text-[#828282]">
          {isIndustryRole(user?.role)
            ? 'Review quotations received from vendors for your requirements.'
            : 'Manage your submitted quotations and track their status.'
          }
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#828282] w-4 h-4" />
          <input
            type="text"
            placeholder="Search quotations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F80ED] focus:border-transparent"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#828282] w-4 h-4" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="pl-10 pr-8 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F80ED] focus:border-transparent bg-white"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Quotations Grid */}
      <div className="grid gap-6">
        {mockQuotations.map((quotation) => (
          <div key={quotation.id} className="bg-white rounded-xl shadow-sm border border-[#E0E0E0] p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#333333] mb-2">{quotation.title}</h3>
                <p className="text-[#828282] text-sm mb-3">{quotation.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(quotation.status)}`}>
                {quotation.status}
              </span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center text-sm text-[#828282]">
                <Building2 className="w-4 h-4 mr-2" />
                {quotation.company}
              </div>
              <div className="flex items-center text-sm text-[#828282]">
                <DollarSign className="w-4 h-4 mr-2" />
                {quotation.amount}
              </div>
              <div className="flex items-center text-sm text-[#828282]">
                <Calendar className="w-4 h-4 mr-2" />
                {quotation.submittedDate}
              </div>
              <div className="flex items-center text-sm text-[#828282]">
                <FileText className="w-4 h-4 mr-2" />
                {quotation.deadline}
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button className="px-4 py-2 border border-[#E0E0E0] text-[#333333] rounded-lg hover:bg-[#FAFAFA] transition-colors">
                View Details
              </button>
              {quotation.status === 'pending' && (
                <button className="px-4 py-2 bg-[#2F80ED] text-white rounded-lg hover:bg-[#1A2A4F] transition-colors">
                  Edit Quotation
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quotations;