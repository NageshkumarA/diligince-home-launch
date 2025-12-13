import React from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

export interface Creator {
    id: string; // The user ID
    name: string;
    email: string;
    count: number;
}

export interface CreatorFilterDropdownProps {
    creators: Creator[];
    selectedCreatorId: string | null;
    currentUserId: string;
    onSelect: (creatorId: string | null) => void;
    isLoading?: boolean;
    disabled?: boolean;
}

export const CreatorFilterDropdown: React.FC<CreatorFilterDropdownProps> = ({
    creators,
    selectedCreatorId,
    currentUserId,
    onSelect,
    isLoading = false,
    disabled = false
}) => {

    // Calculate display value
    // If selectedCreatorId is 'me', showing "Me"
    // If null or 'all', showing "All"
    // If finding a matching creator, showing their name
    const getValue = () => {
        if (selectedCreatorId === 'me' || selectedCreatorId === currentUserId) return 'me';
        if (!selectedCreatorId || selectedCreatorId === 'all') return 'all';
        return selectedCreatorId;
    };

    const handleValueChange = (value: string) => {
        if (value === 'all') {
            onSelect(null);
        } else if (value === 'me') {
            onSelect('me'); // API supports 'me' shortcut
        } else {
            onSelect(value);
        }
    };

    return (
        <div className="w-[200px]">
            <label className="text-sm font-medium mb-1 block">Created By</label>
            <Select
                value={getValue()}
                onValueChange={handleValueChange}
                disabled={isLoading || disabled}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Filter by creator" />
                    {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin opacity-50" />}
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="me">Me</SelectItem>

                    {creators && creators.length > 0 && (
                        <>
                            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground bg-muted/50 mt-1">
                                Team Members
                            </div>
                            {creators.map((creator) => {
                                // Skip current user in the list to avoid duplicate intent (covered by "Me")
                                if (creator.id === currentUserId) return null;

                                return (
                                    <SelectItem key={creator.id} value={creator.id}>
                                        <div className="flex justify-between w-full gap-2 items-center">
                                            <span>{creator.name || creator.email}</span>
                                            <span className="text-xs text-muted-foreground bg-muted px-1.5 rounded-full">
                                                {creator.count}
                                            </span>
                                        </div>
                                    </SelectItem>
                                );
                            })}
                        </>
                    )}
                </SelectContent>
            </Select>
        </div>
    );
};
