// src/components/ChatHeader.tsx

import React from 'react';
import { useMessages } from './MessagesContext';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
    Phone, 
    Video, 
    Mail, 
    Star, 
    Archive, 
    ArchiveX 
} from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// --- 1. Import Tooltip components ---
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


import { MdArchive, MdUnarchive } from "react-icons/md";

const callProviders = [
    {
        id: 'google-meet',
        name: 'Google Meet',
        url: 'https://meet.google.com/new',
    },
    {
        id: 'zoom',
        name: 'Zoom',
        url: 'https://zoom.us/start/meeting',
    },
    {
        id: 'microsoft-teams',
        name: 'Microsoft Teams',
        url: 'https://teams.microsoft.com/start', // opens Microsoft Teams new meeting
    },
];

const generateEmailFromName = (name: string): string => {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '.').replace(/\.+/g, '.') + '@example.com';
};

export const ChatHeader = () => {
    const { selectedConversation, threads, setThreads } = useMessages();

    if (!selectedConversation) return null;

    const handleStartCall = (providerName: string, providerUrl: string, callType: 'audio' | 'video') => {
        window.open(providerUrl, '_blank', 'noopener,noreferrer');
        toast.info(`Starting a new ${callType} call via ${providerName}...`);
    };

    const handleComposeInGmail = () => {
        const recipientEmail = selectedConversation.email || generateEmailFromName(selectedConversation.sender);
        const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipientEmail)}`;
        window.open(gmailComposeUrl, '_blank', 'noopener,noreferrer');
        toast.info("Opening Gmail in a new tab...");
    };

    const toggleStarred = () => {
        const updatedThreads = threads.map(thread =>
            thread.id === selectedConversation.id ? { ...thread, starred: !thread.starred } : thread
        );
        setThreads(updatedThreads);
        toast.success(`Conversation ${!selectedConversation.starred ? 'starred' : 'unstarred'}`);
    };

    const toggleArchive = () => {
         const updatedThreads = threads.map(thread =>
            thread.id === selectedConversation.id ? { ...thread, archive: !thread.archive } : thread
         );
        setThreads(updatedThreads);
        toast.success(`Conversation ${!selectedConversation.archive ? 'archived' : 'unarchived'}`);
    };
    
    const isStarred = threads.find(t => t.id === selectedConversation.id)?.starred ?? false;
    const isArchived = threads.find(t => t.id === selectedConversation.id)?.archive ?? false;
    const displayEmail = selectedConversation.email || generateEmailFromName(selectedConversation.sender);

    return (
        // --- 2. Wrap everything in a TooltipProvider ---
        <TooltipProvider>
            <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Avatar className={`h-10 w-10 ${selectedConversation.avatar}`}>
                        <AvatarFallback className="text-base font-semibold">{selectedConversation.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="text-base font-bold text-gray-900">{selectedConversation.sender}</h2>
                        <p className="text-sm text-gray-500">{displayEmail}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="icon" className="border-gray-200 text-gray-600">
                                        <Phone className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {callProviders.map((provider) => (
                                        <DropdownMenuItem key={provider.id} onSelect={() => handleStartCall(provider.name, provider.url, 'audio')}>
                                            <span>{provider.name}</span>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Start audio call</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="icon" className="border-gray-200 text-gray-600">
                                        <Video className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {callProviders.map((provider) => (
                                        <DropdownMenuItem key={provider.id} onSelect={() => handleStartCall(provider.name, provider.url, 'video')}>
                                            <span>{provider.name}</span>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Start video call</p>
                        </TooltipContent>
                    </Tooltip>
                    
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" className="border-gray-200 text-gray-600" onClick={handleComposeInGmail}>
                                <Mail className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Reply in Gmail</p>
                        </TooltipContent>
                    </Tooltip>

                    {/* --- 3. Wrap the Star button with a Tooltip --- */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" className="border-gray-200 text-gray-600" onClick={toggleStarred}>
                                {isStarred ? (
                                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                                ) : (
                                    <Star className="h-4 w-4" />
                                )}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{isStarred ? 'Unstar conversation' : 'Star conversation'}</p>
                        </TooltipContent>
                    </Tooltip>

                    {/* --- 3. Wrap the Archive button with a Tooltip --- */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" className="border-gray-200 text-gray-600" onClick={toggleArchive}>
                                {isArchived ? (
                                    <MdUnarchive className="h-6 w-6" />
                                ) : (
                                    <MdArchive className="h-6 w-6" />
                                )}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{isArchived ? 'Unarchive conversation' : 'Archive conversation'}</p>
                        </TooltipContent>
                    </Tooltip>

                </div>
            </div>
        </TooltipProvider>
    );
};