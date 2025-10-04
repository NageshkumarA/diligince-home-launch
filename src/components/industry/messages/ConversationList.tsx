import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Plus, Send, Trash2, MoreVertical } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ConversationThread } from '@/data/MockMessages';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useMessages } from './MessagesContext';

// Helper function to format timestamps with relative dates (Today, Yesterday, dd/mm/yyyy)
const formatConversationTimestamp = (timestamp: string | number | Date): string => {
  if (!timestamp) return '';
  const messageDate = new Date(timestamp);
  if (isNaN(messageDate.getTime())) return ''; // Invalid date check

  const now = new Date();
  const diffInSeconds = (now.getTime() - messageDate.getTime()) / 1000;

  if (diffInSeconds < 60) {
    return "Just now";
  }

  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfYesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);

  if (messageDate >= startOfToday) {
    return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (messageDate >= startOfYesterday) {
    return "Yesterday";
  } else {
    const day = String(messageDate.getDate()).padStart(2, '0');
    const month = String(messageDate.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const year = messageDate.getFullYear();
    return `${day}/${month}/${year}`;
  }
};


export const ConversationList = () => {
  const {
    threads,
    setThreads,
    selectedConversation,
    setSelectedConversation,
    handleCreateConversation,
  } = useMessages();

  // Component UI state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState("all");
  const [isNewMessageDialogOpen, setIsNewMessageDialogOpen] = useState(false);
  
  // State for single and multi-delete
  const [threadToDelete, setThreadToDelete] = useState<ConversationThread | null>(null);
  const [selectedThreadIds, setSelectedThreadIds] = useState<Set<number>>(new Set());
  const [isMultiDeleteDialogOpen, setIsMultiDeleteDialogOpen] = useState(false);

  // Form state
  const [newMsgEmail, setNewMsgEmail] = useState('');
  const [newMsgSubject, setNewMsgSubject] = useState('');
  const [newMsgBody, setNewMsgBody] = useState('');
  const [newMsgEmailError, setNewMsgEmailError] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isSelectionMode = selectedThreadIds.size > 0;

  const validateEmail = (email: string) => {
    if (email && !emailRegex.test(email)) {
      setNewMsgEmailError('Invalid email address.');
      return false;
    }
    setNewMsgEmailError('');
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setNewMsgEmail(email);
    validateEmail(email);
  };

  const resetForm = () => {
    setNewMsgEmail('');
    setNewMsgSubject('');
    setNewMsgBody('');
    setNewMsgEmailError('');
  };

  const handleSendNewMessage = () => {
    if (!validateEmail(newMsgEmail)) {
      toast.error("Please correct the invalid email address.");
      return;
    }
    if (!newMsgEmail || !newMsgSubject || !newMsgBody) {
      toast.error("Please fill out email, subject, and message.");
      return;
    }
    handleCreateConversation(newMsgEmail, newMsgSubject, newMsgBody);
    setIsNewMessageDialogOpen(false);
    resetForm();
    toast.success("Message sent successfully!");
  };

  const handleConfirmSingleDelete = () => {
    if (!threadToDelete) return;
    setThreads(prev => prev.filter(t => t.id !== threadToDelete.id));
    if (selectedConversation?.id === threadToDelete.id) {
      setSelectedConversation(null);
    }
    toast.success("Conversation deleted");
    setThreadToDelete(null);
  };
  
  const handleConfirmMultiDelete = () => {
    setThreads(prev => prev.filter(t => !selectedThreadIds.has(t.id)));
    if (selectedConversation && selectedThreadIds.has(selectedConversation.id)) {
      setSelectedConversation(null);
    }
    toast.success(`${selectedThreadIds.size} conversation(s) deleted.`);
    setSelectedThreadIds(new Set());
    setIsMultiDeleteDialogOpen(false);
  };

  const getWordCount = (text: string) => {
  return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
};
  
  const processedThreads = threads
    .filter(thread => {
      if (filterBy === "unread" && !thread.unread) return false;
      if (filterBy === "archive" && !thread.archive) return false;
      if (filterBy === "starred" && !thread.starred) return false;
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          thread.subject.toLowerCase().includes(searchLower) ||
          thread.sender.toLowerCase().includes(searchLower) ||
          thread.email.toLowerCase().includes(searchLower) ||
          thread.preview.toLowerCase().includes(searchLower)
        );
      }
      return true;
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const handleToggleSelection = (threadId: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const newSelection = new Set(selectedThreadIds);
    if (newSelection.has(threadId)) {
      newSelection.delete(threadId);
    } else {
      newSelection.add(threadId);
    }
    setSelectedThreadIds(newSelection);
  };

  const handleThreadClick = (thread: ConversationThread) => {
    if (isSelectionMode) {
      handleToggleSelection(thread.id);
    } else {
      setSelectedConversation(thread);
    }
  };

  const handleSelectAll = () => {
    if (processedThreads.length > 0 && selectedThreadIds.size === processedThreads.length) {
      setSelectedThreadIds(new Set()); // Deselect all
    } else {
      const allVisibleIds = new Set(processedThreads.map(t => t.id));
      setSelectedThreadIds(allVisibleIds); // Select all visible
    }
  };
  
  return (
    <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col shadow-sm">
      <div className="p-6 border-b border-gray-200 space-y-4">
        {/* --- HEADER --- */}
        <div className="flex items-center justify-between min-h-[40px]">
          <div className="flex items-center gap-4">
            <Checkbox
              checked={processedThreads.length > 0 && selectedThreadIds.size === processedThreads.length}
              onCheckedChange={handleSelectAll}
              aria-label="Select all conversations"
            />
            {isSelectionMode ? (
              <span className="font-semibold text-gray-700">{selectedThreadIds.size} selected</span>
            ) : (
              <h1 className="text-xl font-bold text-gray-900">Messages</h1>
            )}
          </div>
          {isSelectionMode && (
              <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={() => setIsMultiDeleteDialogOpen(true)}>
                <Trash2 className="h-5 w-5" />
              </Button>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 pr-8" />
            </div>
            {!isSelectionMode && (
              <Dialog open={isNewMessageDialogOpen} onOpenChange={(open) => { setIsNewMessageDialogOpen(open); if (!open) resetForm(); }}>
                <DialogTrigger asChild>
                  <Button size="sm" className="h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium flex-shrink-0">
                    <Plus className="h-4 w-4 mr-1" /> New
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader><DialogTitle>Compose New Message</DialogTitle></DialogHeader>
                    <div className="space-y-4 py-4">
                        <div>
                            <label htmlFor="to-email" className="block text-sm font-medium text-gray-700 mb-1">To (Email)</label>
                            <Input id="to-email" type="email" placeholder="recipient@example.com" value={newMsgEmail} onChange={handleEmailChange} />
                            {newMsgEmailError && <p className="mt-1 text-sm text-red-600">{newMsgEmailError}</p>}
                        </div>
                       <div>
  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
    Subject
  </label>
  <Input
    id="subject"
    placeholder="Message subject..."
    value={newMsgSubject}
    onChange={(e) => {
      const words = getWordCount(e.target.value);
      if (words <= 200) {
        setNewMsgSubject(e.target.value);
      }
    }}
  />
  <div className="flex justify-end">
    <p className="text-xs text-gray-500 mt-1">
      {getWordCount(newMsgSubject)}/200
    </p>
  </div>
</div>

<div>
  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
    Message
  </label>
  <Textarea
    id="message"
    placeholder="Type your message..."
    rows={5}
    value={newMsgBody}
    onChange={(e) => {
      const words = getWordCount(e.target.value);
      if (words <= 1000) {
        setNewMsgBody(e.target.value);
      }
    }}
  />
  <div className="flex justify-end">
    <p className="text-xs text-gray-500 mt-1">
      {getWordCount(newMsgBody)}/1000
    </p>
  </div>
</div>
                        <div className="flex justify-end space-x-2 pt-2">
                            <Button variant="outline" onClick={() => setIsNewMessageDialogOpen(false)}>Cancel</Button>
                            <Button onClick={handleSendNewMessage}><Send className="w-4 h-4 mr-2" />Send</Button>
                        </div>
                    </div>
                </DialogContent>
              </Dialog>
            )}
        </div>

        <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-full"><SelectValue placeholder="Filter messages" /></SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Messages</SelectItem>
                <SelectItem value="unread">Unread</SelectItem>
                <SelectItem value="archive">Archive</SelectItem>
                <SelectItem value="starred">Starred</SelectItem>
            </SelectContent>
        </Select>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {processedThreads.length > 0 ? (
          processedThreads.map(thread => {
            const isMultiSelected = selectedThreadIds.has(thread.id);
            const isActiveConversation = selectedConversation?.id === thread.id;

            return (
              <div
                key={thread.id}
                data-state={isMultiSelected ? 'selected' : 'unselected'}
                className={`
                  group flex items-start p-4 border-b border-gray-100 cursor-pointer 
                  transition-colors hover:bg-gray-100 data-[state=selected]:bg-blue-50
                  ${isActiveConversation && !isSelectionMode ? 'bg-slate-100' : 'bg-white'}
                `}
                onClick={() => handleThreadClick(thread)}
              >
                <div className="flex items-center h-10 pr-4">
                  <Checkbox
                    checked={isMultiSelected}
                    onClick={(e) => handleToggleSelection(thread.id, e)}
                    className={`transition-opacity ${isSelectionMode ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                  />
                </div>
                
                <Avatar className={`h-10 w-10 ${thread.avatar}`}><AvatarFallback>{thread.initials}</AvatarFallback></Avatar>
                
                <div className="flex-1 min-w-0 pl-3">
                    <div className="flex items-center justify-between mb-1">
                        <h3 className={`text-base truncate ${thread.unread ? "font-semibold text-gray-900" : "font-medium text-gray-900"}`}>{thread.sender}</h3>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 whitespace-nowrap">{formatConversationTimestamp(thread.timestamp)}</span>
                            {!isSelectionMode && (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 transition-opacity focus:outline-none" onClick={(e) => e.stopPropagation()}>
                                            <MoreVertical className="h-4 w-4" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-40">
                                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); setThreadToDelete(thread); }} className="text-red-500 focus:text-red-500 flex items-center gap-2 focus:bg-red-50">
                                            <Trash2 className="h-4 w-4" /> Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                        </div>
                    </div>
                  
                    <h4 className={`text-sm mb-1 truncate ${thread.unread ? 'font-medium text-gray-900' : 'text-gray-700'}`}>{thread.subject}</h4>
                  
                    <div className="flex items-end justify-between">
                        <p className="text-sm text-gray-600 line-clamp-2 pr-2">{thread.preview}</p>
                        {thread.unread && thread.unreadCount > 0 && (
                            <div className="min-w-[20px] h-5 px-1.5 rounded-full bg-blue-600 text-white text-xs font-semibold flex items-center justify-center flex-shrink-0">
                                {thread.unreadCount}
                            </div>
                        )}
                    </div>
                </div>
              </div>
            );
        })
        ) : (
          <div className="p-4 text-center text-gray-500">No conversations found</div>
        )}
      </div>

      <AlertDialog open={!!threadToDelete} onOpenChange={(isOpen) => !isOpen && setThreadToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone. This will permanently delete the conversation with "{threadToDelete?.sender}".</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setThreadToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmSingleDelete} className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isMultiDeleteDialogOpen} onOpenChange={setIsMultiDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone. This will permanently delete the {selectedThreadIds.size} selected conversation(s).</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmMultiDelete} className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};