
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
  Plus
} from "lucide-react";

// Mock message data
const messageThreads = [
  {
    id: 1,
    sender: "TechValve Solutions",
    initials: "TV",
    subject: "Valve Procurement - Quote Update",
    preview: "We've updated our quote for the industrial valve set. Please review the new specifications and pricing...",
    time: "10 min ago",
    unread: true,
    priority: "high",
    category: "Product Vendor"
  },
  {
    id: 2,
    sender: "EngiConsult Group",
    initials: "EG",
    subject: "Pipeline Inspection Schedule",
    preview: "Our engineer is available for the inspection on Friday. We'll need access to the facility from 9 AM...",
    time: "2 hours ago",
    unread: true,
    priority: "medium",
    category: "Professional"
  },
  {
    id: 3,
    sender: "Service Pro Maintenance",
    initials: "SP",
    subject: "Safety Audit Completion",
    preview: "The safety audit has been completed successfully. Please find the detailed report attached...",
    time: "1 day ago",
    unread: false,
    priority: "low",
    category: "Service Vendor"
  },
  {
    id: 4,
    sender: "FastTrack Logistics",
    initials: "FL",
    subject: "Delivery Schedule Confirmation",
    preview: "Your equipment shipment is scheduled for delivery next Tuesday. Please confirm the receiving time...",
    time: "2 days ago",
    unread: false,
    priority: "medium",
    category: "Logistics"
  }
];

const IndustryMessages = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [replyText, setReplyText] = useState("");

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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>Messages | Industry Dashboard</title>
      </Helmet>
      
      <PurchaseOrderHeader />
      
      <main className="flex-1 container mx-auto px-4 py-8 pt-20">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Messages</h1>
          <p className="text-gray-600">Manage communications with vendors and professionals</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Messages</SelectItem>
              <SelectItem value="unread">Unread</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
            </SelectContent>
          </Select>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Message
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

        {/* Messages List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Message Threads ({filteredMessages.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                    message.unread ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedMessage(message)}
                >
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{message.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <h3 className={`font-medium ${message.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                            {message.sender}
                          </h3>
                          <Badge variant="outline" className="text-xs">
                            {message.category}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getPriorityColor(message.priority)}>
                            {getPriorityIcon(message.priority)}
                            <span className="ml-1 capitalize">{message.priority}</span>
                          </Badge>
                          <span className="text-xs text-gray-500">{message.time}</span>
                        </div>
                      </div>
                      <h4 className={`text-sm mb-1 ${message.unread ? 'font-medium text-gray-900' : 'text-gray-700'}`}>
                        {message.subject}
                      </h4>
                      <p className="text-sm text-gray-500 truncate">{message.preview}</p>
                    </div>
                    {message.unread && (
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Message Detail Modal */}
        {selectedMessage && (
          <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
            <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>{selectedMessage.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle>{selectedMessage.subject}</DialogTitle>
                    <p className="text-sm text-gray-500">From: {selectedMessage.sender}</p>
                  </div>
                </div>
              </DialogHeader>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">{selectedMessage.preview}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Reply</label>
                  <Textarea
                    placeholder="Type your reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows={4}
                    className="mt-1"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setSelectedMessage(null)}>
                    Close
                  </Button>
                  <Button>
                    <Send className="w-4 h-4 mr-2" />
                    Send Reply
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </main>
    </div>
  );
};

export default IndustryMessages;
