import React, { useState } from "react";
import { Helmet } from "react-helmet";
import IndustryHeader from "@/components/industry/IndustryHeader";
import { MessageCenter } from "@/components/industry/dashboard/MessageCenter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, MessageSquare, Send, Plus, Phone, Video, Archive, Star, MoreHorizontal, Paperclip, Mail } from "lucide-react";
import { toast } from "sonner";

// Mock message data for industry
const messageThreads = [{
  id: 1,
  sender: "Steel Industries Ltd.",
  initials: "SI",
  subject: "Control System Upgrade Proposal",
  preview: "We've reviewed your control system upgrade requirement. Our team can provide a comprehensive solution including SCADA implementation.",
  lastMessage: "We can schedule a site visit next week to discuss the technical requirements in detail.",
  time: "2 hours ago",
  timestamp: "2:45 PM",
  unread: true,
  priority: "high",
  category: "Vendor Inquiry",
  avatar: "bg-blue-100 text-blue-600"
}, {
  id: 2,
  sender: "AutoParts Manufacturing",
  initials: "AM",
  subject: "Purchase Order Confirmation",
  preview: "Thank you for the purchase order. We'll begin production immediately and deliver within the specified timeline.",
  lastMessage: "Expected delivery date is confirmed for next Friday. All items will be quality tested before shipment.",
  time: "5 hours ago",
  timestamp: "11:45 AM",
  unread: true,
  priority: "medium",
  category: "Purchase Order",
  orderNumber: "PO-15789",
  avatar: "bg-green-100 text-green-600"
}, {
  id: 3,
  sender: "Power Grid Solutions",
  initials: "PG",
  subject: "SCADA Project Update",
  preview: "The SCADA project is progressing as planned. We've completed phase 1 testing and are ready to move to phase 2.",
  lastMessage: "Phase 1 testing completed successfully. All systems are operational and ready for phase 2 implementation.",
  time: "1 day ago",
  timestamp: "Yesterday",
  unread: false,
  priority: "medium",
  category: "Project Update",
  projectId: "PROJ-2023-15",
  avatar: "bg-orange-100 text-orange-600"
}, {
  id: 4,
  sender: "Industrial Automation Co.",
  initials: "IA",
  subject: "Factory Automation Proposal",
  preview: "We'd like to submit a proposal for your factory automation project. Our team has extensive experience in similar implementations.",
  lastMessage: "We'd like to submit a proposal for your factory automation project. Our team has extensive experience in similar implementations.",
  time: "2 days ago",
  timestamp: "2 days ago",
  unread: false,
  priority: "low",
  category: "Proposal Response",
  avatar: "bg-purple-100 text-purple-600"
}];

// Mock detailed messages for conversations
const detailedMessages = {
  1: [{
    id: 1,
    sender: "Steel Industries Ltd.",
    content: "Good morning! We've reviewed your control system upgrade requirement posted on your platform.",
    timestamp: "9:30 AM",
    isFromContact: true
  }, {
    id: 2,
    sender: "You",
    content: "Thank you for your interest. Can you provide more details about your proposed solution and timeline?",
    timestamp: "10:00 AM",
    isFromContact: false
  }, {
    id: 3,
    sender: "Steel Industries Ltd.",
    content: "Absolutely! Our solution includes complete SCADA implementation, PLC programming, and HMI development. Timeline is 8-12 weeks.",
    timestamp: "10:30 AM",
    isFromContact: true
  }, {
    id: 4,
    sender: "Steel Industries Ltd.",
    content: "We can schedule a site visit next week to discuss the technical requirements in detail.",
    timestamp: "2:45 PM",
    isFromContact: true
  }]
};
const IndustryMessages = () => {
  const [messages, setMessages] = useState(messageThreads);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [conversationMessages, setConversationMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [showEmailModal, setShowEmailModal] = useState(false);
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Vendor Inquiry":
        return "bg-blue-100 text-blue-800";
      case "Purchase Order":
        return "bg-green-100 text-green-800";
      case "Project Update":
        return "bg-orange-100 text-orange-800";
      case "Proposal Response":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const filteredMessages = messages.filter(message => {
    if (filterBy === "unread" && !message.unread) return false;
    if (filterBy === "urgent" && message.priority !== "urgent" && message.priority !== "high") return false;
    if (filterBy === "projects" && !message.projectId) return false;
    if (searchTerm && !message.subject.toLowerCase().includes(searchTerm.toLowerCase()) && !message.sender.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });
  const handleConversationSelect = (conversation: any) => {
    setSelectedConversation(conversation);
    setConversationMessages(detailedMessages[conversation.id] || []);
    // Mark as read
    const messageIndex = messages.findIndex(msg => msg.id === conversation.id);
    if (messageIndex !== -1) {
      const updatedMessages = [...messages];
      updatedMessages[messageIndex].unread = false;
      setMessages(updatedMessages);
    }
  };
  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      const message = {
        id: conversationMessages.length + 1,
        sender: "You",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        }),
        isFromContact: false
      };
      setConversationMessages([...conversationMessages, message]);
      setNewMessage("");

      // Update the last message in the thread
      const messageIndex = messages.findIndex(msg => msg.id === selectedConversation.id);
      if (messageIndex !== -1) {
        const updatedMessages = [...messages];
        updatedMessages[messageIndex].lastMessage = newMessage;
        updatedMessages[messageIndex].time = "Just now";
        setMessages(updatedMessages);
      }
      toast.success("Message sent successfully");
    }
  };
  const handleSendEmail = () => {
    if (emailSubject.trim() && emailContent.trim() && selectedConversation) {
      toast.success(`Email sent to ${selectedConversation.sender}`);
      setEmailSubject("");
      setEmailContent("");
      setShowEmailModal(false);
    }
  };
  const unreadCount = messages.filter(msg => msg.unread).length;
  const urgentCount = messages.filter(msg => msg.priority === "urgent" || msg.priority === "high").length;
  return <div className="min-h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>Messages | Industry Dashboard</title>
      </Helmet>
      
      <IndustryHeader />
      
      <div className="pt-16 flex-1 flex">
        {/* Conversations Sidebar */}
        <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col shadow-sm">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-xl font-bold text-gray-900">Messages</h1>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && <Badge className="bg-red-100 text-red-800 border-red-200 font-medium">
                    {unreadCount} unread
                  </Badge>}
                {urgentCount > 0 && <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 font-medium">
                    {urgentCount} urgent
                  </Badge>}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
                      <Plus className="h-4 w-4 mr-2" />
                      New
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle className="text-lg font-semibold text-gray-900">Compose New Message</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">To</label>
                        <Input placeholder="Select vendor..." className="mt-1" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Subject</label>
                        <Input placeholder="Message subject..." className="mt-1" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Message</label>
                        <Textarea placeholder="Type your message..." rows={6} className="mt-1" />
                      </div>
                      <div className="flex justify-end space-x-3 pt-4">
                        <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50">Save Draft</Button>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
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
                <Input placeholder="Search conversations..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 border-gray-200 bg-gray-50" />
              </div>
              
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="border-gray-200">
                  <SelectValue placeholder="Filter messages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Messages</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="projects">Project Related</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {filteredMessages.map(conversation => <div key={conversation.id} className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${selectedConversation?.id === conversation.id ? "bg-blue-50 border-l-4 border-l-blue-600" : ""} ${conversation.unread ? "bg-blue-25" : ""}`} onClick={() => handleConversationSelect(conversation)}>
                <div className="flex items-start gap-3">
                  <Avatar className={`h-10 w-10 ${conversation.avatar}`}>
                    <AvatarFallback className="text-base font-semibold">{conversation.initials}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`text-base font-medium text-gray-900 truncate ${conversation.unread ? "font-semibold" : ""}`}>
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
                    
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={getCategoryColor(conversation.category)} variant="outline">
                        {conversation.category}
                      </Badge>
                      <Badge className={getPriorityColor(conversation.priority)}>
                        {conversation.priority}
                      </Badge>
                      {(conversation.orderNumber || conversation.projectId) && <Badge variant="outline" className="text-xs border-gray-200 text-gray-600">
                          {conversation.orderNumber || conversation.projectId}
                        </Badge>}
                      {conversation.unread && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                    </div>
                  </div>
                </div>
              </div>)}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          {selectedConversation ? <>
              {/* Chat Header */}
              <div className="p-6 border-b border-gray-200 bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className={`h-10 w-10 ${selectedConversation.avatar}`}>
                      <AvatarFallback className="text-base font-semibold">{selectedConversation.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-base font-bold text-gray-900">{selectedConversation.sender}</h2>
                      <p className="text-sm text-gray-600">{selectedConversation.category}</p>
                      {(selectedConversation.orderNumber || selectedConversation.projectId) && <p className="text-xs text-blue-600 font-medium">{selectedConversation.orderNumber || selectedConversation.projectId}</p>}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="border-gray-200 bg-blue-700 hover:bg-blue-600 text-gray-50">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-200 text-gray-50 bg-blue-700 hover:bg-blue-600">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setShowEmailModal(true)} className="border-gray-200 text-gray-50 bg-blue-700 hover:bg-blue-600">
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-200 text-gray-50 bg-blue-700 hover:bg-blue-600">
                      <Star className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-200 text-gray-50 bg-blue-700 hover:bg-blue-600">
                      <Archive className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-200 text-gray-50 bg-blue-700 hover:bg-blue-600">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {conversationMessages.map(message => <div key={message.id} className={`flex ${message.isFromContact ? "justify-start" : "justify-end"}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${message.isFromContact ? "bg-gray-100 text-gray-900" : "bg-blue-600 text-white"}`}>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${message.isFromContact ? "text-gray-500" : "text-blue-200"}`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>)}
              </div>

              {/* Message Input */}
              <div className="p-6 border-t border-gray-200 bg-white">
                <div className="flex items-end gap-3">
                  <Button variant="outline" size="sm" className="border-gray-200 text-gray-50 bg-indigo-700 hover:bg-indigo-600">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Textarea placeholder="Type your message..." value={newMessage} onChange={e => setNewMessage(e.target.value)} onKeyPress={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }} className="flex-1 min-h-[40px] max-h-32 resize-none border-gray-200 bg-gray-50" />
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()} className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </> : <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-gray-600">Choose a conversation from the sidebar to start messaging</p>
              </div>
            </div>}
        </div>
      </div>

      {/* Email Modal */}
      <Dialog open={showEmailModal} onOpenChange={setShowEmailModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-900">Send Email to {selectedConversation?.sender}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Subject</label>
              <Input placeholder="Email subject..." value={emailSubject} onChange={e => setEmailSubject(e.target.value)} className="mt-1 border-gray-200" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Message</label>
              <Textarea placeholder="Type your email message..." rows={8} value={emailContent} onChange={e => setEmailContent(e.target.value)} className="mt-1 border-gray-200" />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="outline" onClick={() => setShowEmailModal(false)} className="border-gray-200 text-gray-700 hover:bg-gray-50">
                Cancel
              </Button>
              <Button onClick={handleSendEmail} className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>;
};
export default IndustryMessages;