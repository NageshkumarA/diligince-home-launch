import React, { useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { Search, Filter, Play, Pause, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const Workflows: React.FC = () => {
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock workflows data
  const mockWorkflows = [
    {
      id: '1',
      title: 'Mobile App Development Workflow',
      project: 'E-commerce Mobile App',
      status: 'in_progress',
      progress: 65,
      startDate: '2024-01-15',
      dueDate: '2024-03-15',
      assignee: 'John Smith',
      tasks: 12,
      completedTasks: 8
    },
    {
      id: '2',
      title: 'Cloud Migration Workflow',
      project: 'Infrastructure Upgrade',
      status: 'completed',
      progress: 100,
      startDate: '2024-01-01',
      dueDate: '2024-02-01',
      assignee: 'Global Services Ltd.',
      tasks: 8,
      completedTasks: 8
    },
    {
      id: '3',
      title: 'Marketing Campaign Workflow',
      project: 'Product Launch Campaign',
      status: 'pending',
      progress: 0,
      startDate: '2024-02-01',
      dueDate: '2024-04-01',
      assignee: 'Marketing Pro Agency',
      tasks: 15,
      completedTasks: 0
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in_progress': return <Play className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'paused': return <Pause className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'paused': return 'text-gray-600 bg-gray-100';
      default: return 'text-red-600 bg-red-100';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-yellow-500';
    return 'bg-gray-300';
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#333333] mb-2">Workflows</h1>
        <p className="text-[#828282]">
          Track and manage project workflows and their progress.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#828282] w-4 h-4" />
          <input
            type="text"
            placeholder="Search workflows..."
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
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="paused">Paused</option>
          </select>
        </div>
      </div>

      {/* Workflows Grid */}
      <div className="grid gap-6">
        {mockWorkflows.map((workflow) => (
          <div key={workflow.id} className="bg-white rounded-xl shadow-sm border border-[#E0E0E0] p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#333333] mb-1">{workflow.title}</h3>
                <p className="text-[#828282] text-sm mb-3">{workflow.project}</p>
              </div>
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(workflow.status)}`}>
                {getStatusIcon(workflow.status)}
                <span className="capitalize">{workflow.status.replace('_', ' ')}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-[#333333]">Progress</span>
                <span className="text-sm text-[#828282]">{workflow.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(workflow.progress)}`}
                  style={{ width: `${workflow.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-xs text-[#828282] mb-1">Assignee</p>
                <p className="text-sm font-medium text-[#333333]">{workflow.assignee}</p>
              </div>
              <div>
                <p className="text-xs text-[#828282] mb-1">Tasks</p>
                <p className="text-sm font-medium text-[#333333]">{workflow.completedTasks}/{workflow.tasks}</p>
              </div>
              <div>
                <p className="text-xs text-[#828282] mb-1">Start Date</p>
                <p className="text-sm font-medium text-[#333333]">{new Date(workflow.startDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-xs text-[#828282] mb-1">Due Date</p>
                <p className="text-sm font-medium text-[#333333]">{new Date(workflow.dueDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button className="px-4 py-2 border border-[#E0E0E0] text-[#333333] rounded-lg hover:bg-[#FAFAFA] transition-colors">
                View Details
              </button>
              {workflow.status === 'in_progress' && (
                <button className="px-4 py-2 bg-[#2F80ED] text-white rounded-lg hover:bg-[#1A2A4F] transition-colors">
                  Manage Tasks
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workflows;