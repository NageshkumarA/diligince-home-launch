
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import PurchaseOrderHeader from "@/components/purchase-order/PurchaseOrderHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Search,
  Filter,
  MessageSquare,
  Send,
  AlertCircle,
  Clock,
  CheckCircle2,
  Plus,
  Phone,
  Video,
  Archive,
  Star,
  MoreHorizontal,
  Paperclip,
  Mail
} from "lucide-react";
import { toast } from "sonner";

// Mock message data with enhanced structure
const messageThreads = [
  {
    id: 1,
    sender: "TechValve Solutions",
    initials: "TV",
    subject: "Valve Procurement - Quote Update",
    preview: "We've updated our quote for the industrial valve set. Please review the new specifications and pricing...",
    lastMessage: "The updated quote includes the new safety specifications you requested. Please review and let us know if you need any modifications.",
    time: "10 min ago",
    timestamp: "2:30 PM",
    unread: true,
    priority: "high",
    category: "Product Vendor",
    avatar: "bg-blue-100 text-blue-600"
  },
  {
    id: 2,
    sender: "EngiConsult Group",
    initials: "EG",
    subject: "Pipeline Inspection Schedule",
    preview: "Our engineer is available for the inspection on Friday. We'll need access to the facility from 9 AM...",
    lastMessage: "Our engineer is available for the inspection on Friday. We'll need access to the facility from 9 AM. Please confirm the arrangements.",
    time: "2 hours ago",
    timestamp: "12:30 PM",
    unread: true,
    priority: "medium",
    category: "Professional",
    avatar: "bg-green-100 text-green-600"
  },
  {
    id: 3,
    sender: "Service Pro Maintenance",
    initials: "SP",
    subject: "Safety Audit Completion",
    preview: "The safety audit has been completed successfully. Please find the detailed report attached...",
    lastMessage: "The safety audit has been completed successfully. All systems are operating within safety parameters. Report attached.",
    time: "1 day ago",
    timestamp: "Yesterday",
    unread: false,
    priority: "low",
    category: "Service Vendor",
    avatar: "bg-purple-100 text-purple-600"
  },
  {
    id: 4,
    sender: "FastTrack Logistics",
    initials: "FL",
    subject: "Delivery Schedule Confirmation",
    preview: "Your equipment shipment is scheduled for delivery next Tuesday. Please confirm the receiving time...",
    lastMessage: "Your equipment shipment is scheduled for delivery next Tuesday. Please confirm the receiving time and ensure someone is available.",
    time: "2 days ago",
    timestamp: "2 days ago",
    unread: false,
    priority: "medium",
    category: "Logistics",
    avatar: "bg-orange-100 text-orange-600"
  }
];

// Mock detailed messages for conversations
const detailedMessages = {
  1: [
    {
      id: 1,
      sender: "TechValve Solutions",
      content: "Hello, we've prepared the updated quote for your industrial valve procurement request. The specifications have been modified based on your feedback.",
      timestamp: "10:30 AM",
      isFromContact: true
    },
    {
      id: 2,
      sender: "You",
      content: "Thank you for the quick turnaround. Can you provide more details about the safety certifications for these valves?",
      timestamp: "11:00 AM",
      isFromContact: false
    },
    {
      id: 3,
      sender: "TechValve Solutions",
      content: "Absolutely! All valves come with ISO 9001 and API 6D certifications. We can also provide additional safety documentation if needed.",
      timestamp: "11:15 AM",
      isFromContact: true
    },
    {
      id: 4,
      sender: "TechValve Solutions",
      content: "The updated quote includes the new safety specifications you requested. Please review and let us know if you need any modifications.",
      timestamp: "2:30 PM",
      isFromContact: true
    }
  ],
  2: [
    {
      id: 1,
      sender: "EngiConsult Group",
      content: "Good morning! We're ready to schedule the pipeline inspection for your facility. Our senior engineer is available this week.",
      timestamp: "9:00 AM",
      isFromContact: true
    },
    {
      id: 2,
      sender: "You",
      content: "That sounds great. What preparation do we need to do on our end before the inspection?",
      timestamp: "9:30 AM",
      isFromContact: false
    },
    {
      id: 3,
      sender: "EngiConsult Group",
      content: "Our engineer is available for the inspection on Friday. We'll need access to the facility from 9 AM. Please confirm the arrangements.",
      timestamp: "12:30 PM",
      isFromContact: true
    }
  ]
};

const IndustryMessages = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [showEmailModal, setShowEmailModal] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high": return <AlertCircle className="w-4 h-4" />;
      case "medium": return <Clock className="w-4 h-4" />;
      case "low": return <CheckCircle2 className="w-4 h-4" />;
      default: return null;
    }
  };

  const filteredMessages = messageThreads.filter(message => {
    if (filterBy === "unread" && !message.unread) return false;
    if (filterBy === "urgent" && message.priority !== "high") return false;
    if (searchTerm && !message.subject.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !message.sender.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const handleConversationSelect = (conversation: any) => {
    setSelectedConversation(conversation);
    setMessages(detailedMessages[conversation.id] || []);
    // Mark as read
    const threadIndex = messageThreads.findIndex(thread => thread.id === conversation.id);
    if (threadIndex !== -1) {
      messageThreads[threadIndex].unread = false;
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      const message = {
        id: messages.length + 1,
        sender: "You",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isFromContact: false
      };
      setMessages([...messages, message]);
      setNewMessage("");
      
      // Update the last message in the thread
      const threadIndex = messageThreads.findIndex(thread => thread.id === selectedConversation.id);
      if (threadIndex !== -1) {
        messageThreads[threadIndex].lastMessage = newMessage;
        messageThreads[threadIndex].time = "Just now";
      }
      
      toast.success("Message sent successfully");
    }
  };

  const handleSendEmail = () => {
    if (emailSubject.trim() && emailContent.trim() && selectedConversation) {
      // In a real app, this would integrate with an email service
      toast.success(`Email sent to ${selectedConversation.sender}`);
      setEmailSubject("");
      setEmailContent("");
      setShowEmailModal(false);
    }
  };

  const unreadCount = messageThreads.filter(thread => thread.unread).length;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>Messages | Industry Dashboard</title>
      </Helmet>
      
      <PurchaseOrderHeader />
      
      <div className="pt-16 flex-1 flex">
        {/* Conversations Sidebar */}
        <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-semibold text-gray-900">Messages</h1>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <Badge className="bg-red-100 text-red-800">
                    {unreadCount} unread
                  </Badge>
                )}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      New
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Compose New Message</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">To</label>
                        <Input placeholder="Select recipient..." />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Subject</label>
                        <Input placeholder="Message subject..." />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Message</label>
                        <Textarea placeholder="Type your message..." rows={6} />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline">Save Draft</Button>
                        <Button>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter messages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Messages</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {filteredMessages.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedConversation?.id === conversation.id ? "bg-blue-50 border-l-4 border-l-blue-600" : ""
                } ${conversation.unread ? "bg-blue-25" : ""}`}
                onClick={() => handleConversationSelect(conversation)}
              >
                <div className="flex items-start gap-3">
                  <Avatar className={`h-10 w-10 ${conversation.avatar}`}>
                    <AvatarFallback>{conversation.initials}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`font-medium text-gray-900 truncate ${conversation.unread ? "font-semibold" : ""}`}>
                        {conversation.sender}
                      </h3>
                      <span className="text-xs text-gray-500">{conversation.time}</span>
                    </div>
                    
                    <h4 className={`text-sm mb-1 ${conversation.unread ? 'font-medium text-gray-900' : 'text-gray-700'}`}>
                      {conversation.subject}
                    </h4>
                    
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                      {conversation.preview}
                    </p>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {conversation.category}
                      </Badge>
                      <Badge className={getPriorityColor(conversation.priority)}>
                        {getPriorityIcon(conversation.priority)}
                        <span className="ml-1 capitalize">{conversation.priority}</span>
                      </Badge>
                      {conversation.unread && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className={`h-10 w-10 ${selectedConversation.avatar}`}>
                      <AvatarFallback>{selectedConversation.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="font-semibold text-gray-900">{selectedConversation.sender}</h2>
                      <p className="text-sm text-gray-500">{selectedConversation.category}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowEmailModal(true)}
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Star className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Archive className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isFromContact ? "justify-start" : "justify-end"}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.isFromContact
                        ? "bg-gray-100 text-gray-900"
                        : "bg-blue-600 text-white"
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.isFromContact ? "text-gray-500" : "text-blue-200"
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-end gap-2">
                  <Button variant="outline" size="sm">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Textarea
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 min-h-[40px] max-h-32 resize-none"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-gray-500">Choose a conversation from the sidebar to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Email Modal */}
      <Dialog open={showEmailModal} onOpenChange={setShowEmailModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Send Email to {selectedConversation?.sender}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Subject</label>
              <Input 
                placeholder="Email subject..."
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Message</label>
              <Textarea 
                placeholder="Type your email message..."
                rows={8}
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowEmailModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleSendEmail}>
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IndustryMessages;
