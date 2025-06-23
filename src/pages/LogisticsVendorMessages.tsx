
import React, { useState } from "react";
import { LogisticsVendorHeader } from "@/components/vendor/LogisticsVendorHeader";
import { Button } from "@/components/ui/button";
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
  Mail,
  Truck
} from "lucide-react";
import { toast } from "sonner";

// Mock conversation threads for logistics vendor
const conversationThreads = [
  {
    id: 1,
    sender: "Steel Industries Ltd.",
    initials: "SI",
    subject: "Crane Transport - Urgent Request",
    preview: "We need to confirm the crane availability for our plant expansion project. The equipment must be delivered by January 20th...",
    lastMessage: "We need to confirm the crane availability for our plant expansion project. The equipment must be delivered by January 20th for the installation schedule.",
    time: "10 min ago",
    timestamp: "2:30 PM",
    unread: true,
    priority: "high",
    category: "Transport Request",
    avatar: "bg-green-100 text-green-600",
    messageType: "transport-request"
  },
  {
    id: 2,
    sender: "Chemical Corp",
    initials: "CC",
    subject: "Chemical Tank Delivery Update",
    preview: "Please provide an update on the chemical tank delivery. Our production team needs to know the exact ETA...",
    lastMessage: "Please provide an update on the chemical tank delivery. Our production team needs to know the exact ETA for coordination with safety protocols.",
    time: "2 hours ago",
    timestamp: "12:30 PM",
    unread: true,
    priority: "urgent",
    category: "Delivery Update",
    avatar: "bg-blue-100 text-blue-600",
    messageType: "delivery-update"
  },
  {
    id: 3,
    sender: "Power Generation Co.",
    initials: "PG",
    subject: "Turbine Components - Delivery Complete",
    preview: "Thank you for the successful delivery of turbine components. The quality of transport and handling was excellent...",
    lastMessage: "Thank you for the successful delivery of turbine components. The quality of transport and handling was excellent. We'll have more projects coming up.",
    time: "1 day ago",
    timestamp: "Yesterday",
    unread: false,
    priority: "low",
    category: "Delivery Feedback",
    avatar: "bg-orange-100 text-orange-600",
    messageType: "delivery-update"
  },
  {
    id: 4,
    sender: "Auto Manufacturing",
    initials: "AM",
    subject: "Factory Relocation Quote Request",
    preview: "We're planning a complete factory relocation next quarter. Could you provide a detailed quote for moving...",
    lastMessage: "We're planning a complete factory relocation next quarter. Could you provide a detailed quote for moving our production equipment?",
    time: "2 days ago",
    timestamp: "2 days ago",
    unread: false,
    priority: "medium",
    category: "Quote Request",
    avatar: "bg-pink-100 text-pink-600",
    messageType: "transport-request"
  },
  {
    id: 5,
    sender: "Mining Operations Ltd.",
    initials: "MO",
    subject: "Heavy Equipment Transport",
    preview: "We need specialized transport for our excavator and bulldozers from our closed site to the new mining location...",
    lastMessage: "We need specialized transport for our excavator and bulldozers from our closed site to the new mining location. Heavy equipment transport required.",
    time: "3 days ago",
    timestamp: "3 days ago",
    unread: false,
    priority: "medium",
    category: "Transport Request",
    avatar: "bg-purple-100 text-purple-600",
    messageType: "transport-request"
  },
  {
    id: 6,
    sender: "Cement Industries",
    initials: "CI",
    subject: "Route Optimization Suggestion",
    preview: "Could we use the new highway bypass for faster delivery of raw materials? It might reduce transit time...",
    lastMessage: "Route optimization suggestion: Could we use the new highway bypass for faster delivery of raw materials? It might reduce transit time by 3 hours.",
    time: "4 days ago",
    timestamp: "4 days ago",
    unread: false,
    priority: "low",
    category: "Route Planning",
    avatar: "bg-indigo-100 text-indigo-600",
    messageType: "delivery-update"
  }
];

// Mock detailed messages for conversations
const detailedMessages = {
  1: [
    {
      id: 1,
      sender: "Steel Industries Ltd.",
      content: "Hello, we have an urgent requirement for crane transport for our plant expansion project. We need a 200-ton mobile crane delivered to our facility.",
      timestamp: "10:30 AM",
      isFromContact: true
    },
    {
      id: 2,
      sender: "You",
      content: "Thank you for reaching out. I can confirm we have a 200-ton Liebherr mobile crane available. What's your delivery timeline and location?",
      timestamp: "11:00 AM",
      isFromContact: false
    },
    {
      id: 3,
      sender: "Steel Industries Ltd.",
      content: "Perfect! We need it delivered to our Pune facility by January 20th. The crane will be used for installing heavy structural components.",
      timestamp: "11:15 AM",
      isFromContact: true
    },
    {
      id: 4,
      sender: "Steel Industries Ltd.",
      content: "We need to confirm the crane availability for our plant expansion project. The equipment must be delivered by January 20th for the installation schedule.",
      timestamp: "2:30 PM",
      isFromContact: true
    }
  ],
  2: [
    {
      id: 1,
      sender: "Chemical Corp",
      content: "Good morning! We have a chemical tank that needs to be transported from Mumbai to our Chennai facility. It's a specialized transport requirement.",
      timestamp: "9:00 AM",
      isFromContact: true
    },
    {
      id: 2,
      sender: "You",
      content: "We specialize in chemical transport with all necessary safety certifications. Can you provide the tank specifications and hazmat details?",
      timestamp: "9:30 AM",
      isFromContact: false
    },
    {
      id: 3,
      sender: "Chemical Corp",
      content: "Please provide an update on the chemical tank delivery. Our production team needs to know the exact ETA for coordination with safety protocols.",
      timestamp: "12:30 PM",
      isFromContact: true
    }
  ]
};

const LogisticsVendorMessages = () => {
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
      case "urgent": return "bg-red-200 text-red-900";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
      case "urgent": return <AlertCircle className="w-4 h-4" />;
      case "medium": return <Clock className="w-4 h-4" />;
      case "low": return <CheckCircle2 className="w-4 h-4" />;
      default: return null;
    }
  };

  const filteredConversations = conversationThreads.filter(conversation => {
    if (filterBy === "unread" && !conversation.unread) return false;
    if (filterBy === "urgent" && !["high", "urgent"].includes(conversation.priority)) return false;
    if (filterBy === "transport-request" && conversation.messageType !== "transport-request") return false;
    if (filterBy === "delivery-update" && conversation.messageType !== "delivery-update") return false;
    if (searchTerm && !conversation.subject.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !conversation.sender.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const handleConversationSelect = (conversation: any) => {
    setSelectedConversation(conversation);
    setMessages(detailedMessages[conversation.id] || []);
    // Mark as read
    const threadIndex = conversationThreads.findIndex(thread => thread.id === conversation.id);
    if (threadIndex !== -1) {
      conversationThreads[threadIndex].unread = false;
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
      const threadIndex = conversationThreads.findIndex(thread => thread.id === selectedConversation.id);
      if (threadIndex !== -1) {
        conversationThreads[threadIndex].lastMessage = newMessage;
        conversationThreads[threadIndex].time = "Just now";
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

  const unreadCount = conversationThreads.filter(thread => thread.unread).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <LogisticsVendorHeader />
      
      <div className="pt-16 flex-1 flex">
        {/* Conversations Sidebar */}
        <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-semibold text-gray-900">Messages Hub</h1>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <Badge className="bg-red-100 text-red-800">
                    {unreadCount} unread
                  </Badge>
                )}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-pink-600 hover:bg-pink-700">
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
                        <Input placeholder="Select client..." />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Subject</label>
                        <Input placeholder="Transport request, delivery update..." />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Message</label>
                        <Textarea placeholder="Type your message..." rows={6} />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline">Save Draft</Button>
                        <Button className="bg-pink-600 hover:bg-pink-700">
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
                  <SelectItem value="transport-request">Transport Requests</SelectItem>
                  <SelectItem value="delivery-update">Delivery Updates</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedConversation?.id === conversation.id ? "bg-pink-50 border-l-4 border-l-pink-600" : ""
                } ${conversation.unread ? "bg-pink-25" : ""}`}
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
                        <Truck className="w-3 h-3 mr-1" />
                        {conversation.category}
                      </Badge>
                      <Badge className={getPriorityColor(conversation.priority)}>
                        {getPriorityIcon(conversation.priority)}
                        <span className="ml-1 capitalize">{conversation.priority}</span>
                      </Badge>
                      {conversation.unread && (
                        <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
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
                        : "bg-pink-600 text-white"
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.isFromContact ? "text-gray-500" : "text-pink-200"
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
                    className="bg-pink-600 hover:bg-pink-700"
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
                <p className="text-gray-500">Choose a conversation from the sidebar to start messaging with your logistics clients</p>
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
                placeholder="Transport quote, delivery confirmation..."
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
              <Button onClick={handleSendEmail} className="bg-pink-600 hover:bg-pink-700">
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

export default LogisticsVendorMessages;
