// src/components/industry/messages/MessageInput.tsx
import React, { useState, useRef, useCallback } from 'react';
import { useMessages } from './MessagesContext';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Paperclip, X, Image, File, Camera, UploadCloud } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { toast } from 'sonner';

const attachmentOptions = [
  { id: 'file', label: 'Documents', icon: File, color: 'text-blue-500', accept: '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt' },
  { id: 'image', label: 'Photos & Videos', icon: Image, color: 'text-green-500', accept: 'image/*,video/*' },
  { id: 'camera', label: 'Camera', icon: Camera, color: 'text-purple-500', accept: '' },
];

const MAX_FILE_SIZE_MB = 20;

export const MessageInput = () => {
  const { handleSendMessage, replyTo, setReplyTo } = useMessages();
  const [newMessage, setNewMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false); // 1. State to control popover

  const fileInputRefs = {
    file: useRef<HTMLInputElement>(null),
    image: useRef<HTMLInputElement>(null),
  };
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Unified function to process and validate files from any source (input, drop)
  const processFiles = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newFiles = Array.from(files);
    const validFiles: File[] = [];
    const invalidFiles: { name: string; reason: string }[] = [];

    newFiles.forEach(file => {
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > MAX_FILE_SIZE_MB) {
        invalidFiles.push({ name: file.name, reason: `Exceeds ${MAX_FILE_SIZE_MB}MB` });
      } else {
        validFiles.push(file);
      }
    });

    if (invalidFiles.length > 0) {
      toast.error(
        <div>
          <p className="font-bold">Some files were not added:</p>
          <ul className="list-disc pl-5">
            {invalidFiles.map(f => <li key={f.name}>{f.name} ({f.reason})</li>)}
          </ul>
        </div>
      );
    }

    if (validFiles.length > 0) {
      setAttachments(prev => [...prev, ...validFiles]);
    }
  }, []);

  const removeAttachment = (indexToRemove: number) => {
    setAttachments(prev => prev.filter((_, index) => index !== indexToRemove));
  };
  
  const handleSend = () => {
    const hasText = newMessage.trim().length > 0;
    const hasAttachments = attachments.length > 0;

    if (!hasText && !hasAttachments) return;

    // Send text message with the first attachment, if both exist
    if (hasText && hasAttachments) {
      const firstFile = attachments[0];
      const attachmentType = firstFile.type.split('/')[0];
      handleSendMessage(newMessage.trim(), {
        name: firstFile.name,
        type: attachmentType === 'application' ? 'doc' : attachmentType,
        url: URL.createObjectURL(firstFile),
      });
      // Send remaining attachments as separate messages
      attachments.slice(1).forEach(file => {
        const remainingAttachmentType = file.type.split('/')[0];
        handleSendMessage(`Attached: ${file.name}`, {
          name: file.name,
          type: remainingAttachmentType === 'application' ? 'doc' : remainingAttachmentType,
          url: URL.createObjectURL(file),
        });
      });
    } else if (hasAttachments) { // Only attachments
      attachments.forEach(file => {
        const attachmentType = file.type.split('/')[0];
        handleSendMessage(`Attached: ${file.name}`, {
          name: file.name,
          type: attachmentType === 'application' ? 'doc' : attachmentType,
          url: URL.createObjectURL(file),
        });
      });
    } else if (hasText) { // Only text
      handleSendMessage(newMessage.trim());
    }

    // Cleanup state
    setNewMessage('');
    setAttachments([]);
    if (replyTo) setReplyTo(null);
  };
  
  // Drag and Drop handlers
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false); // Closes the drop overlay
    processFiles(e.dataTransfer.files);
  };

  const handleAttachmentClick = (type: string) => {
    if (type === 'camera') {
      setIsPopoverOpen(false); // 3. Close popover immediately for camera
      startCamera();
    } else {
      // For file inputs, we let the `onChange` handler close the popover
      fileInputRefs[type as 'file' | 'image']?.current?.click();
    }
  };

  // New handler for file inputs to centralize closing the popover
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(event.target.files);
    setIsPopoverOpen(false); // 3. Close popover after files are selected
    if (event.target) {
      event.target.value = ''; // Allow selecting same file again
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setShowCamera(true);
      }
    } catch (err) {
      toast.error("Unable to access camera.");
      console.error(err);
    }
  };

  const stopCamera = () => {
    setShowCamera(false);
    const video = videoRef.current;
    if (video?.srcObject) {
      const tracks = (video.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      video.srcObject = null;
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context?.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob(blob => {
        if (blob) {
          const file = new window.File([blob], "camera-capture.png", { type: "image/png" });
          setAttachments(prev => [...prev, file]);
        }
      }, 'image/png');

      stopCamera();
    }
  };


  return (
    <div
      className={`relative border-t pt-4 px-4 pb-2 transition-colors duration-300 ${isDragging ? 'bg-blue-50 border-blue-300' : 'bg-white'}`}
      onDragEnter={handleDragEnter}
      onDragOver={e => e.preventDefault()}
    >
      {/* --- DRAG & DROP OVERLAY --- */}
      {isDragging && (
        <div 
          className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-blue-100 bg-opacity-80 border-2 border-dashed border-blue-500 rounded-lg"
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <UploadCloud className="h-12 w-12 text-blue-600" />
          <p className="mt-2 text-lg font-semibold text-blue-600">Drop files to attach</p>
        </div>
      )}

      {/* --- ATTACHMENT PREVIEWS --- */}
      {attachments.length > 0 && (
        <div className="mb-2 p-2 bg-gray-100 rounded-lg">
          <p className="text-sm font-medium text-gray-600 mb-2">Attachments ({attachments.length})</p>
          <div className="flex flex-wrap gap-3">
            {attachments.map((file, index) => (
              <div key={index} className="relative w-20 h-20">
                {file.type.startsWith('image/') ? (
                  <img src={URL.createObjectURL(file)} alt={file.name} className="w-full h-full object-cover rounded-md" />
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded-md flex flex-col items-center justify-center p-1">
                    <File className="h-8 w-8 text-gray-500" />
                    <span className="text-xs text-center text-gray-600 line-clamp-2">{file.name}</span>
                  </div>
                )}
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full z-10"
                  onClick={() => removeAttachment(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* --- REPLYING TO --- */}
      {replyTo && (
        <div className="bg-gray-100 p-2 rounded-t-md text-sm text-gray-600 flex justify-between items-center mb-2">
          <div>
            Replying to <strong>{replyTo.sender}</strong>
            <p className="line-clamp-1 italic">"{replyTo.content}"</p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setReplyTo(null)} className="h-6 w-6 rounded-full">
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}

      {/* --- MAIN INPUT AREA --- */}
      <div className="flex items-end gap-2">
        {attachmentOptions.filter(o => o.id !== 'camera').map(opt => (
          <input
            key={opt.id}
            type="file"
            accept={opt.accept}
            ref={fileInputRefs[opt.id as 'file' | 'image']}
            onChange={handleFileSelect} // Use the new handler
            className="hidden"
            multiple
          />
        ))}
        
        {/* 2. Control the Popover component */}
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full flex-shrink-0 text-gray-500 hover:bg-gray-100">
              <Paperclip className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-60 p-2 mb-2" side="top" align="start">
            <div className="grid grid-cols-1 gap-1">
              {attachmentOptions.map((option) => (
                <Button key={option.id} variant="ghost" className="w-full justify-start font-normal text-gray-700" onClick={() => handleAttachmentClick(option.id)}>
                  <option.icon className={`mr-3 h-5 w-5 ${option.color}`} />
                  {option.label}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

         <Textarea
      placeholder="Type a message or paste a link..."
      value={newMessage}
      onChange={e => setNewMessage(e.target.value)}
      onKeyPress={e => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSend();
        }
      }}
      className="flex-1 h-10 min-h-[40px] max-h-32 resize-none border-gray-300 bg-gray-100 rounded-2xl px-4 py-2 focus-visible:ring-1 focus-visible:ring-blue-500"
    />

        <Button
          onClick={handleSend}
          disabled={!newMessage.trim() && attachments.length === 0}
          size="icon"
          className="h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex-shrink-0 disabled:bg-gray-300"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>

      {/* --- CAMERA PREVIEW --- */}
      {showCamera && (
        <div className="absolute bottom-full left-0 right-0 z-10 mb-2 bg-black p-2 rounded-md shadow-lg">
          <video ref={videoRef} className="w-full max-h-[300px] rounded-md" autoPlay />
          <canvas ref={canvasRef} className="hidden" />
          <div className="flex justify-end gap-2 mt-2">
            <Button onClick={capturePhoto} className="bg-green-600 hover:bg-green-700 text-white">Capture</Button>
            <Button onClick={stopCamera} variant="outline" className='text-white border-white hover:bg-white hover:text-black'>Cancel</Button>
          </div>
        </div>
      )}
    </div>
  );
};