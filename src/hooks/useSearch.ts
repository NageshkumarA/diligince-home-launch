
import { useState, useMemo, useCallback } from 'react';

interface UseSearchOptions {
  searchFields?: string[];
  caseSensitive?: boolean;
  debounceMs?: number;
}

interface UseSearchReturn<T> {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredData: T[];
  clearSearch: () => void;
}

export const useSearch = <T extends Record<string, any>>(
  data: T[],
  options: UseSearchOptions = {}
): UseSearchReturn<T> => {
  const {
    searchFields = ['name', 'title', 'description'],
    caseSensitive = false,
  } = options;

  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) {
      return data;
    }

    const term = caseSensitive ? searchTerm : searchTerm.toLowerCase();

    return data.filter(item => {
      return searchFields.some(field => {
        const value = item[field];
        if (typeof value === 'string') {
          const searchValue = caseSensitive ? value : value.toLowerCase();
          return searchValue.includes(term);
        }
        return false;
      });
    });
  }, [data, searchTerm, searchFields, caseSensitive]);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    filteredData,
    clearSearch,
  };
};
