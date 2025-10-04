import React from 'react';
import { Calendar, MapPin, DollarSign, Users, MessageCircle, FileText, MessageSquareText } from 'lucide-react';

interface RequirementCardProps {
  id: string;
  title: string;
  description: string;
  budget: string;
  location: string;
  postedDate: string;
  category: string;
  urgency: 'Low' | 'Medium' | 'High';
  proposalsCount?: number;
  userRole: 'industry' | 'professional' | 'vendor';
  onShowInterest?: () => void;
  onSendQuotation?: () => void;
  onViewChats?: () => void;
}

const RequirementCard: React.FC<RequirementCardProps> = ({
  title,
  description,
  budget,
  location,
  postedDate,
  category,
  urgency,
  proposalsCount = 0,
  userRole,
  onShowInterest,
  onSendQuotation,
  onViewChats
}) => {
  const urgencyColors = {
    Low: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    High: 'bg-red-100 text-red-800'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#E0E0E0] p-6 hover:shadow-md transition-shadow ">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-[#333333] mb-2">{title}</h3>
          <p className="text-[#828282] text-sm mb-3 line-clamp-1">{description}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${urgencyColors[urgency]}`}>
          {urgency}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-2">
        <div className="flex items-center text-sm text-[#828282]">
          <DollarSign className="w-4 h-4 mr-2" />
          {budget}
        </div>
        <div className="flex items-center text-sm text-[#828282]">
          <MapPin className="w-4 h-4 mr-2" />
          {location}
        </div>
        <div className="flex items-center text-sm text-[#828282]">
          <Calendar className="w-4 h-4 mr-2" />
          {postedDate}
        </div>
        <div className="flex items-center text-sm text-[#828282]">
          <FileText className="w-4 h-4 mr-2" />
          {category}
        </div>
      </div>

      {userRole === 'industry' && (
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm text-[#828282]">
            <Users className="w-4 h-4 mr-2" />
            {proposalsCount} proposals
          </div>
          <button
            onClick={onViewChats}
            className="flex items-center space-x-2 text-[#999] px-4 py-2 rounded-lg transition-colors hover:text-[#2F80ED]"
          >
            <MessageSquareText className="w-4 h-4 " />
            {/* <span>View Chats</span> */}
          </button>
        </div>
      )}

      {userRole === 'professional' && (
        <div className="flex justify-end">
          <button
            onClick={onShowInterest}
            className="flex items-center space-x-2 bg-[#27AE60] text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            <Users className="w-4 h-4" />
            <span>Show Interest</span>
          </button>
        </div>
      )}

      {userRole === 'vendor' && (
        <div className="flex justify-end">
          <button
            onClick={onSendQuotation}
            className="flex items-center space-x-2 bg-[#F2994A] text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>Send Quotation</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default RequirementCard;