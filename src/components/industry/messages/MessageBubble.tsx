// src/components/MessageBubble.tsx

import React, { useState } from 'react';
import { useMessages } from './MessagesContext';
import { Message } from '@/data/MockMessages';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Check, CheckCheck, MoreHorizontal, CornerUpLeft, Trash2,
  Pencil, Smile, FileText, Image, Users, User,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// Emoji picker temporarily disabled - needs emoji-picker-react package
// import Picker from 'emoji-picker-react';


interface MessageBubbleProps {
  message: Message;
}

// Helper to find and link URLs in message text
const linkify = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part, i) =>
    urlRegex.test(part) ? (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-300 underline break-words"
      >
        {part}
      </a>
    ) : (
      <span key={i}>{part}</span>
    )
  );
};

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const {
    handleEditMessage,
    handleDeleteMessage,
    handleAddReaction,
    setReplyTo,
    findMessageById
  } = useMessages();

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(message.content);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const repliedToMessage = message.replyTo ? findMessageById(message.replyTo) : null;
  const isFromYou = message.sender === 'You';

  const readReceipt = isFromYou
    ? (message.read
      ? <CheckCheck className="h-4 w-4 text-blue-400" />
      : <Check className="h-4 w-4 text-gray-400" />)
    : null;

  const handleSaveEdit = () => {
    handleEditMessage(message.id, editText);
    setIsEditing(false);
  };

  const onEmojiClick = (emojiObject: { emoji: string }) => {
    handleAddReaction(message.id, emojiObject.emoji);
    setIsPickerOpen(false); // Close the picker after selection
  };

  return (
    <AlertDialog>
      <div className={`flex items-end gap-2 group ${isFromYou ? "justify-end" : "justify-start"}`}>
        
        {/* Action Buttons (Popover for Emojis + Dropdown for other actions) */}
        <div className={`flex items-center ${isFromYou ? "order-1" : "order-2"}`}>
          {/* Popover for Emoji Picker */}
          <Popover open={isPickerOpen} onOpenChange={setIsPickerOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100">
                <Smile className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 border-0">
              <Picker onEmojiClick={onEmojiClick} />
            </PopoverContent>
          </Popover>

          {/* Dropdown for other actions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => setReplyTo(message)}>
                <CornerUpLeft className="mr-2 h-4 w-4" /> Reply
              </DropdownMenuItem>
              
              {isFromYou && (
                <DropdownMenuItem onSelect={() => setIsEditing(true)}>
                  <Pencil className="mr-2 h-4 w-4" /> Edit
                </DropdownMenuItem>
              )}
              
              <AlertDialogTrigger asChild>
                <DropdownMenuItem className="text-red-600 focus:text-red-600" onSelect={(e) => e.preventDefault()}>
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Message bubble + reactions wrapper */}
        <div className={`relative ${isFromYou ? 'order-2' : 'order-1'}`}>
          <div className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg ${isFromYou ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"}`}>
            
            {repliedToMessage && (
              <div className="border-l-2 border-blue-300 pl-2 text-xs opacity-80 mb-1">
                <p className="font-semibold">{repliedToMessage.sender}</p>
                <p className="line-clamp-1 italic">{repliedToMessage.content}</p>
              </div>
            )}

            {message.attachment && (
              <a href={message.attachment.url} target="_blank" rel="noopener noreferrer" className="bg-gray-200/20 p-2 rounded-md flex items-center gap-2 mb-1 hover:bg-gray-200/30">
                {message.attachment.type === 'image' ? <Image className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                <span className="text-sm font-medium underline">{message.attachment.name}</span>
              </a>
            )}

            {isEditing ? (
              <div className="flex flex-col gap-2">
                <Textarea value={editText} onChange={(e) => setEditText(e.target.value)} className="text-gray-900" />
                <div className="flex justify-end gap-2">
                  <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
                  <Button size="sm" onClick={handleSaveEdit}>Save</Button>
                </div>
              </div>
            ) : (
              <p className="text-sm whitespace-pre-wrap break-words">{linkify(message.content)}</p>
            )}

            <div className="flex items-center gap-2 text-xs mt-1 justify-end">
              {message.isEdited && !isEditing && (
                <span className={isFromYou ? "text-blue-200" : "text-gray-500"}>(edited)</span>
              )}
              <span className={isFromYou ? "text-blue-200" : "text-gray-500"}>
                {message.timestamp ? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
              </span>
              {readReceipt}
            </div>
          </div>

          {message.reactions && Object.keys(message.reactions).length > 0 && (
            <div className="absolute right-2 -bottom-2 translate-y-1/2 flex gap-1 z-10">
              {Object.entries(message.reactions).map(([emoji, count]) => (
                <div
                  key={emoji}
                  title={`React with ${emoji}`}
                  className="bg-white/30 dark:bg-gray-800/80 text-xs px-2 py-0.5 rounded-full cursor-pointer shadow hover:bg-white/50 dark:hover:bg-gray-700"
                  onClick={() => handleAddReaction(message.id, emoji)}
                >
                  {emoji} {count}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Message?</AlertDialogTitle>
          <AlertDialogDescription>
            {isFromYou
              ? "This action cannot be undone. Choosing 'Delete for everyone' will permanently remove this message from the conversation for all participants."
              : "This will only remove the message from your view. Other participants in the conversation will still be able to see it."
            }
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col sm:flex-row sm:justify-end sm:space-x-2 gap-2">
          <AlertDialogCancel className="bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors">
            Cancel
          </AlertDialogCancel>
          {isFromYou ? (
            <>
              <AlertDialogAction
                onClick={() => handleDeleteMessage(message.id)}
                className="bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
              >
                <User className="mr-2 h-4 w-4" /> Delete for Me
              </AlertDialogAction>
              <AlertDialogAction
                onClick={() => handleDeleteMessage(message.id)}
                className="bg-red-100 text-red-800 hover:bg-red-200 transition-colors"
              >
                <Users className="mr-2 h-4 w-4" /> Delete for Everyone
              </AlertDialogAction>
            </>
          ) : (
            <AlertDialogAction
              onClick={() => handleDeleteMessage(message.id)}
              className="bg-red-100 text-red-800 hover:bg-red-200 transition-colors"
            >
              <Trash2 className="mr-2 h-4 w-4" /> Delete for Me
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};