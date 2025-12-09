import React, { useState } from 'react';
import { MessageSquare, Send, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownPanel } from '@/components/ui/dropdown-panel';
import { formatDistanceToNow } from 'date-fns';

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userRole?: string;
  content: string;
  type: 'general' | 'approval' | 'clarification' | 'feedback';
  createdAt: Date;
}

interface CommentsDropdownPanelProps {
  requirementId: string;
  comments?: Comment[];
  onAddComment?: (content: string, type: string) => Promise<void>;
  isLoading?: boolean;
}

// Mock comments for demo
const mockComments: Comment[] = [
  {
    id: '1',
    userId: 'u1',
    userName: 'Sarah Johnson',
    userRole: 'Procurement Manager',
    content: 'This requirement looks good. I have reviewed the specifications and everything seems aligned with our procurement standards.',
    type: 'approval',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: '2',
    userId: 'u2',
    userName: 'Michael Chen',
    userRole: 'Finance Lead',
    content: 'Budget allocation approved. Please proceed with the approval workflow.',
    type: 'approval',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: '3',
    userId: 'u3',
    userName: 'Emma Wilson',
    userRole: 'Department Head',
    content: 'Can we get more details on the delivery timeline?',
    type: 'clarification',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
];

const getTypeColor = (type: string) => {
  switch (type) {
    case 'approval':
      return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400';
    case 'clarification':
      return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400';
    case 'feedback':
      return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400';
    default:
      return 'bg-muted text-muted-foreground border-border';
  }
};

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};

export const CommentsDropdownPanel: React.FC<CommentsDropdownPanelProps> = ({
  requirementId,
  comments = mockComments,
  onAddComment,
  isLoading = false,
}) => {
  const [open, setOpen] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSendComment = async () => {
    if (!newComment.trim() || isSending) return;
    
    setIsSending(true);
    try {
      if (onAddComment) {
        await onAddComment(newComment, 'general');
      }
      setNewComment('');
    } catch (error) {
      console.error('Failed to send comment:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendComment();
    }
  };

  return (
    <DropdownPanel
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-border/60 hover:bg-muted/50"
        >
          <MessageSquare className="h-4 w-4" />
          <span className="hidden sm:inline">Comments</span>
          {comments.length > 0 && (
            <Badge variant="secondary" className="h-5 px-1.5 text-xs">
              {comments.length}
            </Badge>
          )}
        </Button>
      }
      title="Comments & Feedback"
      titleIcon={<MessageSquare className="h-4 w-4" />}
      headerExtra={
        comments.length > 0 && (
          <Badge variant="secondary" className="h-5 px-1.5 text-xs ml-2">
            {comments.length}
          </Badge>
        )
      }
      footer={
        <div className="p-3">
          <div className="relative">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add a comment..."
              className={cn(
                "min-h-[60px] max-h-[120px] pr-12 resize-none",
                "bg-background/50 border-border/60",
                "focus:ring-1 focus:ring-primary/30"
              )}
            />
            <Button
              size="icon"
              className={cn(
                "absolute bottom-2 right-2 h-8 w-8 rounded-full",
                "bg-primary hover:bg-primary/90",
                "transition-transform hover:scale-105"
              )}
              disabled={!newComment.trim() || isSending}
              onClick={handleSendComment}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground mt-1.5">
            Press Enter to send, Shift + Enter for new line
          </p>
        </div>
      }
    >
      {comments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
          <MessageSquare className="h-10 w-10 mb-3 opacity-40" />
          <p className="text-sm font-medium">No comments yet</p>
          <p className="text-xs mt-1">Be the first to add a comment</p>
        </div>
      ) : (
        <div className="py-2">
          {comments.map((comment, index) => (
            <div
              key={comment.id}
              className={cn(
                "px-4 py-3 hover:bg-muted/40 transition-colors",
                index !== comments.length - 1 && "border-b border-border/30"
              )}
            >
              <div className="flex gap-3">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                    {getInitials(comment.userName)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-sm text-foreground">
                      {comment.userName}
                    </span>
                    {comment.userRole && (
                      <span className="text-xs text-muted-foreground">
                        {comment.userRole}
                      </span>
                    )}
                    <Badge 
                      variant="outline" 
                      className={cn("text-[10px] px-1.5 py-0 h-4 capitalize", getTypeColor(comment.type))}
                    >
                      {comment.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-foreground/90 mt-1 leading-relaxed">
                    {comment.content}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-1.5">
                    {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DropdownPanel>
  );
};

export default CommentsDropdownPanel;
