import React, { useState } from "react";
import VendorHeader from "@/components/vendor/VendorHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Send, Paperclip, Phone, Video, MoreHorizontal, Star, Archive, Filter, MessageSquare, Plus, Mail } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
const ServiceVendorMessages = () => {
  const [selectedConversation, setSelectedConversation] = useState("1");
  const [messageText, setMessageText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Mock conversations data - Industrial focused
  const conversations = [{
    id: "1",
    name: "Steel Manufacturing Ltd.",
    avatar: "SM",
    lastMessage: "We need the weekly progress report for the control system upgrade. Please send updated milestones and timeline.",
    timestamp: "2 min ago",
    unread: 2,
    online: true,
    type: "project-update",
    priority: "high",
    project: "PLC Control System Upgrade",
    avatarColor: "bg-blue-100 text-blue-600"
  }, {
    id: "2",
    name: "Chemical Processing Corp.",
    avatar: "CP",
    lastMessage: "The safety audit report looks comprehensive. When can we schedule the follow-up inspection?",
    timestamp: "1 hour ago",
    unread: 1,
    online: false,
    type: "safety-audit",
    priority: "high",
    project: "Safety Compliance Audit",
    avatarColor: "bg-green-100 text-green-600"
  }, {
    id: "3",
    name: "Automotive Manufacturing",
    avatar: "AM",
    lastMessage: "The equipment calibration is complete. All machinery is now within acceptable tolerance levels.",
    timestamp: "3 hours ago",
    unread: 0,
    online: true,
    type: "equipment-maintenance",
    priority: "medium",
    project: "Equipment Calibration",
    avatarColor: "bg-purple-100 text-purple-600"
  }, {
    id: "4",
    name: "Food Processing Industries",
    avatar: "FP",
    lastMessage: "We're reviewing your proposal for the HACCP implementation. The approach looks solid.",
    timestamp: "1 day ago",
    unread: 0,
    online: false,
    type: "consulting",
    priority: "medium",
    project: "HACCP Implementation",
    avatarColor: "bg-orange-100 text-orange-600"
  }, {
    id: "5",
    name: "Pharmaceutical Company",
    avatar: "PC",
    lastMessage: "The GMP validation documentation has been approved. Ready for the next phase.",
    timestamp: "2 days ago",
    unread: 0,
    online: false,
    type: "validation",
    priority: "low",
    project: "GMP Validation",
    avatarColor: "bg-indigo-100 text-indigo-600"
  }];

  // Mock messages for selected conversation - Industrial focused
  const messages = [{
    id: "1",
    sender: "Steel Manufacturing Ltd.",
    senderAvatar: "SM",
    content: "Hi, we need an update on the PLC control system upgrade project. How's the progress with the Siemens S7-1500 integration?",
    timestamp: "10:30 AM",
    type: "received"
  }, {
    id: "2",
    sender: "You",
    senderAvatar: "TS",
    content: "Good morning! The PLC integration is progressing well. We've completed 80% of the I/O configuration and are now working on the HMI interface. The system should be ready for testing by Friday.",
    timestamp: "10:45 AM",
    type: "sent"
  }, {
    id: "3",
    sender: "Steel Manufacturing Ltd.",
    senderAvatar: "SM",
    content: "That's excellent progress! Can you send us the latest SCADA screenshots and the updated project timeline?",
    timestamp: "11:00 AM",
    type: "received"
  }, {
    id: "4",
    sender: "You",
    senderAvatar: "TS",
    content: "Absolutely! I'll have our automation engineer prepare the SCADA screenshots and send them along with the detailed timeline by end of day.",
    timestamp: "11:15 AM",
    type: "sent"
  }, {
    id: "5",
    sender: "Steel Manufacturing Ltd.",
    senderAvatar: "SM",
    content: "We need the weekly progress report for the control system upgrade. Please send updated milestones and timeline.",
    timestamp: "Just now",
    type: "received"
  }];
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-orange-100 text-orange-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const getTypeLabel = (type: string) => {
    const typeMap = {
      "project-update": "Project Update",
      "safety-audit": "Safety Audit",
      "equipment-maintenance": "Equipment Maintenance",
      "consulting": "Consulting",
      "validation": "Validation",
      "installation": "Installation"
    };
    return typeMap[type] || type;
  };
  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.name.toLowerCase().includes(searchTerm.toLowerCase()) || conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || filterType === "unread" && conv.unread > 0 || filterType === "urgent" && conv.priority === "high" || conv.type === filterType;
    return matchesSearch && matchesFilter;
  });
  const handleSendMessage = () => {
    if (messageText.trim()) {
      toast.success("Message sent successfully");
      setMessageText("");
    }
  };
  const handleConversationSelect = conversation => {
    setSelectedConversation(conversation.id);
  };
  const handlePhoneCall = () => {
    if (selectedConv) {
      toast.success(`Calling ${selectedConv.name}...`);
    }
  };
  const handleVideoCall = () => {
    if (selectedConv) {
      toast.success(`Starting video call with ${selectedConv.name}...`);
    }
  };
  const handleSendEmail = () => {
    if (selectedConv) {
      toast.success(`Opening email to ${selectedConv.name}...`);
    }
  };
  const handleStarConversation = () => {
    if (selectedConv) {
      toast.success(`Starred conversation with ${selectedConv.name}`);
    }
  };
  const handleArchiveConversation = () => {
    if (selectedConv) {
      toast.success(`Archived conversation with ${selectedConv.name}`);
    }
  };
  const handleMoreActions = () => {
    toast.info("More actions menu");
  };
  const selectedConv = conversations.find(c => c.id === selectedConversation);
  const unreadCount = conversations.filter(c => c.unread > 0).reduce((sum, c) => sum + c.unread, 0);
  return <div className="min-h-screen flex flex-col bg-gray-50">
      <VendorHeader />
      
      <div className="pt-16 flex-1 flex">
        {/* Conversations Sidebar */}
        <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-semibold text-gray-900">Messages</h1>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && <Badge className="bg-red-100 text-red-800">
                    {unreadCount} unread
                  </Badge>}
                <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                  <Plus className="h-4 w-4 mr-2" />
                  New
                </Button>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search conversations..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
              </div>
              
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter messages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Messages</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="project-update">Project Updates</SelectItem>
                  <SelectItem value="safety-audit">Safety Audits</SelectItem>
                  <SelectItem value="equipment-maintenance">Equipment Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map(conversation => <div key={conversation.id} onClick={() => handleConversationSelect(conversation)} className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${selectedConversation === conversation.id ? 'bg-yellow-50 border-l-4 border-l-yellow-600' : ''} ${conversation.unread > 0 ? "bg-blue-50" : ""}`}>
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar className={`h-10 w-10 ${conversation.avatarColor}`}>
                      <AvatarFallback>{conversation.avatar}</AvatarFallback>
                    </Avatar>
                    {conversation.online && <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`text-base font-medium text-gray-900 truncate ${conversation.unread > 0 ? "font-semibold" : ""}`}>
                        {conversation.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        {conversation.unread > 0 && <Badge className="bg-yellow-600 hover:bg-yellow-700 text-xs px-2">
                            {conversation.unread}
                          </Badge>}
                        <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs bg-yellow-600">
                        {getTypeLabel(conversation.type)}
                      </Badge>
                      <Badge className={getPriorityColor(conversation.priority)}>
                        {conversation.priority}
                      </Badge>
                      <span className="text-xs text-gray-500">• {conversation.project}</span>
                    </div>
                    
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                      {conversation.lastMessage}
                    </p>
                    
                    {conversation.unread > 0 && <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>}
                  </div>
                </div>
              </div>)}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          {selectedConv ? <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className={`h-10 w-10 ${selectedConv.avatarColor}`}>
                      <AvatarFallback>{selectedConv.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-base font-semibold text-gray-900">{selectedConv.name}</h2>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {getTypeLabel(selectedConv.type)}
                        </Badge>
                        <span className="text-sm text-gray-500">• {selectedConv.project}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={handlePhoneCall} className="bg-yellow-600 hover:bg-yellow-500 text-gray-950">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleVideoCall} className="bg-yellow-600 hover:bg-yellow-500 text-gray-950">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleSendEmail} className="bg-yellow-600 hover:bg-yellow-500 text-gray-950">
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleStarConversation} className="bg-yellow-600 hover:bg-yellow-500 text-gray-950">
                      <Star className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleArchiveConversation} className="bg-yellow-600 hover:bg-yellow-500 text-gray-950">
                      <Archive className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleMoreActions} className="bg-yellow-600 hover:bg-yellow-500 text-gray-950">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(message => <div key={message.id} className={`flex ${message.type === 'sent' ? 'justify-end' : 'justify-start'}`}>
                    {message.type === 'received' && <Avatar className="h-8 w-8 mr-2">
                        <AvatarFallback className="bg-yellow-100 text-yellow-700 text-sm">
                          {message.senderAvatar}
                        </AvatarFallback>
                      </Avatar>}
                    
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.type === 'sent' ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-900'}`}>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${message.type === 'sent' ? 'text-yellow-100' : 'text-gray-500'}`}>
                        {message.timestamp}
                      </p>
                    </div>

                    {message.type === 'sent' && <Avatar className="h-8 w-8 ml-2">
                        <AvatarFallback className="bg-yellow-600 text-white text-sm">
                          {message.senderAvatar}
                        </AvatarFallback>
                      </Avatar>}
                  </div>)}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-end gap-2">
                  <Button variant="outline" size="sm" className="text-base font-normal bg-yellow-600 hover:bg-yellow-500 text-gray-950">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Textarea placeholder="Type your message..." value={messageText} onChange={e => setMessageText(e.target.value)} onKeyPress={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }} className="flex-1 min-h-[40px] max-h-32 resize-none bg-slate-50" />
                  <Button onClick={handleSendMessage} disabled={!messageText.trim()} className="bg-yellow-600 hover:bg-yellow-700">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </> : <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="mb-4">
                  <div className="h-16 w-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
                    <MessageSquare className="h-8 w-8 text-yellow-600" />
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-gray-500">Choose a conversation from the sidebar to start messaging</p>
              </div>
            </div>}
        </div>
      </div>
    </div>;
};
export default ServiceVendorMessages;