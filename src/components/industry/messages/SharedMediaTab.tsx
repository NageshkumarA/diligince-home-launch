  // src/components/industry/messages/SharedMediaTab.tsx
  import React, { useState, useMemo } from 'react';
  import { useMessages } from './MessagesContext';
  import { FileText, Image, Download, Link as LinkIcon, ArrowUpDown, Search, X } from 'lucide-react';
  import { Button } from '@/components/ui/button';
  import { Input } from '@/components/ui/input'; // Assuming you have a reusable Input component

  const isUrl = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return urlRegex.test(text);
  };

  // A simple Image Modal component to be used inside SharedMediaTab
  const ImageModal = ({ imageUrl, onClose }: { imageUrl: string; onClose: () => void }) => {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
        onClick={onClose}
      >
        <div className="relative p-4" onClick={(e) => e.stopPropagation()}>
          <img src={imageUrl} alt="Shared media" className="max-w-screen-lg max-h-screen-lg object-contain" />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 p-1 text-white bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full transition"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
      </div>
    );
  };


  export const SharedMediaTab = () => {
    const { conversationMessages } = useMessages();

    // State for tab, sorting, search, and image modal
    const [activeTab, setActiveTab] = useState<'media' | 'documents' | 'links'>('media');
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);


    // Memoize filtering and sorting for performance
    const filteredAndSortedMessages = useMemo(() => {
      // 1. Get base messages for the active tab
      const messagesForTab =
        activeTab === 'media'
          ? conversationMessages.filter(msg => ['image', 'video'].includes(msg.attachment?.type ?? ''))
          : activeTab === 'documents'
          ? conversationMessages.filter(msg => msg.attachment && !['image', 'video'].includes(msg.attachment.type))
          : conversationMessages.filter(msg => isUrl(msg.content));

      // 2. Apply search filter if applicable
      const searchedMessages = messagesForTab.filter(msg => {
        if (!searchQuery) return true;
        const lowerCaseQuery = searchQuery.toLowerCase();

        if (activeTab === 'documents') {
          return msg.attachment?.name?.toLowerCase().includes(lowerCaseQuery);
        }
        if (activeTab === 'links') {
          return msg.content.toLowerCase().includes(lowerCaseQuery);
        }
        return true; // No search on media tab
      });

      // 3. Apply sorting
      return searchedMessages.slice().sort((a, b) => {
        const dateA = new Date(a.timestamp).getTime();
        const dateB = new Date(b.timestamp).getTime();
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
      });
    }, [activeTab, conversationMessages, sortOrder, searchQuery]);

    const handleTabChange = (tab: 'media' | 'documents' | 'links') => {
      setActiveTab(tab);
      setSearchQuery(''); // Reset search when changing tabs
    };

    const noItems = filteredAndSortedMessages.length === 0;
    const formatDate = (timestamp: Date | string) => {
  const dateObj = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
  return dateObj.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};


    return (
      <div>
        {/* Tab headers */}
        <div className="flex border-b border-gray-200">
          {(['media', 'documents', 'links'] as const).map(tab => (
            <button
              key={tab}
              className={`flex-1 text-sm font-medium px-4 py-2 capitalize ${
                activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'
              }`}
              onClick={() => handleTabChange(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        
        {/* Search Input for Docs and Links */}
        {(activeTab === 'documents' || activeTab === 'links') && (
          <div className="relative my-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder={`Search ${activeTab}...`}
              className="w-full pl-9 border-gray-200"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        )}

        {/* No Items Message */}
        {noItems ? (
          <div className="text-center text-gray-500 py-10">
            <FileText className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              {searchQuery ? `No results for "${searchQuery}"` : `No ${activeTab} shared`}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchQuery ? `Try a different search term.` : `Items you share in this chat will appear here.`}
            </p>
          </div>
        ) : (
          <div className="space-y-3 mt-4">
            {/* Header with Title and Sort Button */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900 capitalize">
                Shared {activeTab}
              </h3>
              <Button variant="ghost" size="sm" onClick={() => setSortOrder(p => (p === 'newest' ? 'oldest' : 'newest'))}>
                <ArrowUpDown className="h-4 w-4 mr-2" />
                <span>{sortOrder === 'newest' ? 'Newest' : 'Oldest'}</span>
              </Button>
            </div>

            {/* List of Items */}
            <ul role="list" className="divide-y divide-gray-200">
              {filteredAndSortedMessages.map(msg => (
                <li key={msg.id} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <div
                      className={`${activeTab === 'media' ? 'cursor-pointer' : ''} bg-gray-100 p-2 rounded-full flex-shrink-0`}
                      onClick={() => activeTab === 'media' && setSelectedImage(msg.attachment?.url ?? null)}
                    >
                      {activeTab === 'media' ? <Image className="h-6 w-6 text-gray-600" /> :
                      activeTab === 'documents' ? <FileText className="h-6 w-6 text-gray-600" /> :
                      <LinkIcon className="h-6 w-6 text-gray-600" />}
                    </div>
                    <div 
                      className={`${activeTab === 'media' ? 'cursor-pointer' : ''} flex-1 min-w-0`}
                      onClick={() => activeTab === 'media' && setSelectedImage(msg.attachment?.url ?? null)}
                    >
                      {activeTab === 'links' ? (
                       <>
                         <a href={msg.content.match(/https?:\/\/[^\s]+/)?.[0] ?? '#'} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-600 underline break-all">{msg.content.match(/https?:\/\/[^\s]+/)?.[0]}</a>
                         <p className="text-xs text-gray-500 truncate">Shared by {msg.sender} on {formatDate(msg.timestamp)}</p>
                       </>
                     ) : (
                       <>
                         <p className="text-sm font-medium text-gray-900 truncate">{msg.attachment?.name}</p>
                         <p className="text-xs text-gray-500 truncate">Shared by {msg.sender} on {formatDate(msg.timestamp)}</p>
                       </>
                     )}
                    </div>
                  </div>

                  {(activeTab === 'media' || activeTab === 'documents') && (
                    <a href={msg.attachment?.url} download={msg.attachment?.name} className="ml-4 flex-shrink-0" onClick={e => e.stopPropagation()}>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Render the Image Modal when an image is selected */}
        {selectedImage && <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />}
      </div>
    );
  };