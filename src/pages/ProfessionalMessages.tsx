
import React from "react";
import { Helmet } from "react-helmet";
import ProfessionalHeader from "@/components/professional/ProfessionalHeader";
import { MessageCenter } from "@/components/professional/dashboard/MessageCenter";
import { useToast } from "@/hooks/use-toast";
import { Home, MessageSquare, User, Briefcase, Calendar } from "lucide-react";

const mockMessages = [
  {
    id: 1,
    sender: "Steel Plant Ltd.",
    initials: "SP",
    message: "The control system upgrade project timeline looks good. When can we schedule the site visit?",
    timestamp: "2 hours ago",
    priority: "high",
    color: "blue",
    unread: true,
    type: "project-update",
    projectId: 1,
    attachments: []
  },
  {
    id: 2,
    sender: "AutoParts Manufacturing",
    initials: "AM",
    message: "Thank you for your application. We'd like to schedule an interview for next week.",
    timestamp: "1 day ago",
    priority: "high",
    color: "green",
    unread: true,
    type: "job-response",
    attachments: []
  },
  {
    id: 3,
    sender: "Power Grid Corp",
    initials: "PG",
    message: "The SCADA implementation proposal has been approved. Let's discuss the next steps.",
    timestamp: "2 days ago",
    priority: "medium",
    color: "purple",
    unread: false,
    type: "project-update",
    projectId: 2,
    attachments: []
  },
  {
    id: 4,
    sender: "Textile Mills Inc",
    initials: "TM",
    message: "We've received your automation consulting proposal. The budget looks reasonable.",
    timestamp: "3 days ago",
    priority: "medium",
    color: "orange",
    unread: false,
    type: "job-inquiry",
    attachments: []
  },
  {
    id: 5,
    sender: "Diligince.ai",
    initials: "DL",
    message: "Your profile has been updated successfully. You have 5 new job matches.",
    timestamp: "1 week ago",
    priority: "low",
    color: "indigo",
    unread: false,
    type: "system-notification",
    attachments: []
  }
];

const ProfessionalMessages = () => {
  const { toast } = useToast();

  const headerNavItems = [
    { label: "Dashboard", icon: <Home size={18} />, href: "/professional-dashboard" },
    { label: "Opportunities", icon: <Briefcase size={18} />, href: "/professional-opportunities" },
    { label: "Calendar", icon: <Calendar size={18} />, href: "/professional-calendar" },
    { label: "Messages", icon: <MessageSquare size={18} />, href: "/professional-messages", active: true },
    { label: "Profile", icon: <User size={18} />, href: "/professional-profile" },
  ];

  const handleReply = (messageId: number, reply: string) => {
    const message = mockMessages.find(m => m.id === messageId);
    toast({
      title: "Message Sent",
      description: `Your reply to ${message?.sender} has been sent.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>Messages | Professional Dashboard</title>
      </Helmet>
      
      <ProfessionalHeader navItems={headerNavItems} />
      
      <div className="pt-16 flex-1 p-6">
        <MessageCenter 
          messages={mockMessages}
          onReply={handleReply}
        />
      </div>
    </div>
  );
};

export default ProfessionalMessages;
