import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, MessageSquare, Send, Plus, Phone, Video, Archive, Star, MoreHorizontal, Paperclip, Mail, Loader2, Check, CheckCheck, Eye } from "lucide-react";
import { toast } from "sonner";
import { conversationsService } from "@/services/modules/conversations/conversations.service";
import type { Conversation, Message } from "@/services/modules/conversations/conversations.types";
import { useUser } from "@/contexts/UserContext";

const IndustryMessages = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch conversations
  const { data: conversationsData, isLoading: conversationsLoading } = useQuery({
    queryKey: ['industry-conversations'],
    queryFn: () => conversationsService.getConversations(),
  });

  // Fetch messages for selected conversation
  const { data: messagesData, isLoading: messagesLoading } = useQuery({
    queryKey: ['conversation-messages', selectedConversationId],
    queryFn: () => conversationsService.getMessages(selectedConversationId!),
    enabled: !!selectedConversationId,
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: (content: string) =>
      conversationsService.sendMessage({
        conversationId: selectedConversationId!,
        content,
        type: 'text',
      }),
    onSuccess: () => {
      setMessageText("");
      queryClient.invalidateQueries({ queryKey: ['conversation-messages', selectedConversationId] });
      queryClient.invalidateQueries({ queryKey: ['industry-conversations'] });
    },
    onError: () => {
      toast.error("Failed to send message");
    },
  });

  // Mark as read mutation
  const markAsReadMutation = useMutation({
    mutationFn: (conversationId: string) =>
      conversationsService.markAsRead(conversationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['industry-conversations'] });
    },
  });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesData?.messages]);

  // Mark messages as read when conversation is selected
  useEffect(() => {
    if (selectedConversationId) {
      markAsReadMutation.mutate(selectedConversationId);
    }
  }, [selectedConversationId]);

  const conversations = conversationsData?.conversations || [];
  const messages = messagesData?.messages || [];

  // Filter conversations
  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch =
      conv.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.lastMessage?.content?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterType === "all" ||
      (filterType === "unread" && (conv.unreadCount || 0) > 0) ||
      conv.relatedType === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleSendMessage = () => {
    if (messageText.trim() && selectedConversationId) {
      sendMessageMutation.mutate(messageText.trim());
    }
  };

  const handleConversationSelect = (conversation: Conversation) => {
    setSelectedConversationId(conversation._id);
  };

  const getInitials = (email: string) => {
    return email?.slice(0, 2).toUpperCase() || "??";
  };

  const getParticipantName = (conversation: Conversation) => {
    const otherParticipant = conversation.participants.find(
      p => p.userId._id !== user?.id
    );
    return otherParticipant?.userId.email || conversation.title || "Unknown";
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  const renderReadReceipt = (message: Message) => {
    if (message.senderId._id !== user?.id) return null;

    if (message.readBy && message.readBy.length > 0) {
      return <Eye className="h-3 w-3 text-blue-500" />;
    }
    if (message.deliveredTo && message.deliveredTo.length > 0) {
      return <CheckCheck className="h-3 w-3 text-blue-500" />;
    }
    if (message.status === 'sent') {
      return <Check className="h-3 w-3 text-gray-400" />;
    }
    return null;
  };

  const handleSendEmail = () => {
    if (emailSubject.trim() && emailContent.trim() && selectedConv) {
      toast.success(`Email sent to ${getParticipantName(selectedConv)}`);
      setEmailSubject("");
      setEmailContent("");
      setShowEmailModal(false);
    }
  };

  const selectedConv = conversations.find((c) => c._id === selectedConversationId);
  const unreadCount = conversations.reduce((sum, c) => sum + (c.unreadCount || 0), 0);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>Messages | Industry Dashboard</title>
      </Helmet>

      <div className="pt-16 flex-1 flex">
        {/* Conversations Sidebar */}
        <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col shadow-sm">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-xl font-bold text-gray-900">Messages</h1>
              {unreadCount > 0 && (
                <Badge className="bg-red-100 text-red-800 border-red-200 font-medium">
                  {unreadCount} unread
                </Badge>
              )}
            </div>

            {/* Search and Filter */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-200 bg-gray-50"
                />
              </div>

              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="border-gray-200">
                  <SelectValue placeholder="Filter messages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Messages</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="vendor-company">Vendors</SelectItem>
                  <SelectItem value="quote">Quotations</SelectItem>
                  <SelectItem value="rfq">Requirements</SelectItem>
                  <SelectItem value="purchaseOrder">Purchase Orders</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {conversationsLoading ? (
              <div className="flex items-center justify-center h-32">
                <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
              </div>
            ) : filteredConversations.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-gray-500">
                <MessageSquare className="h-8 w-8 mb-2" />
                <p>No conversations found</p>
              </div>
            ) : (
              filteredConversations.map((conversation) => (
                <div
                  key={conversation._id}
                  onClick={() => handleConversationSelect(conversation)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${selectedConversationId === conversation._id
                    ? "bg-blue-50 border-l-4 border-l-blue-600"
                    : ""
                    } ${(conversation.unreadCount || 0) > 0 ? "bg-blue-50/50" : ""}`}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10 bg-blue-100">
                      <AvatarFallback className="text-blue-700 text-base font-semibold">
                        {getInitials(getParticipantName(conversation))}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`text-base font-medium text-gray-900 truncate ${(conversation.unreadCount || 0) > 0 ? "font-semibold" : ""
                          }`}>
                          {getParticipantName(conversation)}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {conversation.lastMessage?.timestamp
                            ? formatTimestamp(conversation.lastMessage.timestamp)
                            : formatTimestamp(conversation.updatedAt)}
                        </span>
                      </div>

                      {conversation.relatedType && (
                        <Badge variant="outline" className="text-xs mb-2 bg-blue-100 text-blue-800 border-blue-200">
                          {conversation.relatedType}
                        </Badge>
                      )}

                      <p className="text-sm text-gray-600 line-clamp-2">
                        {conversation.lastMessage?.content || "No messages yet"}
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        {(conversation.unreadCount || 0) > 0 && (
                          <Badge className="bg-blue-600 text-white text-xs">
                            {conversation.unreadCount} new
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          {selectedConv ? (
            <>
              {/* Chat Header */}
              <div className="p-6 border-b border-gray-200 bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 bg-blue-100">
                      <AvatarFallback className="text-blue-700 text-base font-semibold">
                        {getInitials(getParticipantName(selectedConv))}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-base font-bold text-gray-900">
                        {getParticipantName(selectedConv)}
                      </h2>
                      {selectedConv.relatedType && (
                        <p className="text-sm text-gray-600">{selectedConv.relatedType}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toast.success("Calling...")}
                      className="border-gray-200 bg-blue-700 hover:bg-blue-600 text-gray-50"
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toast.success("Starting video call...")}
                      className="border-gray-200 text-gray-50 bg-blue-700 hover:bg-blue-600"
                    >
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowEmailModal(true)}
                      className="border-gray-200 text-gray-50 bg-blue-700 hover:bg-blue-600"
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toast.success("Starred!")}
                      className="border-gray-200 text-gray-50 bg-blue-700 hover:bg-blue-600"
                    >
                      <Star className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toast.success("Archived!")}
                      className="border-gray-200 text-gray-50 bg-blue-700 hover:bg-blue-600"
                    >
                      <Archive className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toast.info("More actions...")}
                      className="border-gray-200 text-gray-50 bg-blue-700 hover:bg-blue-600"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 pb-20">
                {messagesLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <MessageSquare className="h-12 w-12 mb-4" />
                    <p>No messages yet. Start the conversation!</p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message._id}
                      className={`flex ${message.senderId._id === user?.id ? "justify-end" : "justify-start"
                        }`}
                    >
                      {message.senderId._id !== user?.id && (
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarFallback className="bg-blue-100 text-blue-700 text-sm">
                            {getInitials(message.senderId.email)}
                          </AvatarFallback>
                        </Avatar>
                      )}

                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${message.senderId._id === user?.id
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-900"
                          }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <div className="flex items-center justify-end gap-1 mt-1">
                          <p
                            className={`text-xs ${message.senderId._id === user?.id
                              ? "text-blue-200"
                              : "text-gray-500"
                              }`}
                          >
                            {new Date(message.createdAt).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                          {renderReadReceipt(message)}
                        </div>
                      </div>

                      {message.senderId._id === user?.id && (
                        <Avatar className="h-8 w-8 ml-2">
                          <AvatarFallback className="bg-blue-600 text-white text-sm">
                            {getInitials(user?.email || "")}
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input - with right margin for chatbot */}
              <div className="p-6 border-t border-gray-200 bg-white mr-16">
                <div className="flex items-end gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-200 text-gray-50 bg-indigo-700 hover:bg-indigo-600"
                  >
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Textarea
                    placeholder="Type your message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="flex-1 min-h-[40px] max-h-32 resize-none border-gray-200 bg-gray-50"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!messageText.trim() || sendMessageMutation.isPending}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
                  >
                    {sendMessageMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Select a conversation
                </h3>
                <p className="text-gray-600">
                  Choose a conversation from the sidebar to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Email Modal */}
      <Dialog open={showEmailModal} onOpenChange={setShowEmailModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Send Email to {selectedConv ? getParticipantName(selectedConv) : ""}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Subject</label>
              <Input
                placeholder="Email subject..."
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                className="mt-1 border-gray-200"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Message</label>
              <Textarea
                placeholder="Type your email message..."
                rows={8}
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                className="mt-1 border-gray-200"
              />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowEmailModal(false)}
                className="border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSendEmail}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
              >
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