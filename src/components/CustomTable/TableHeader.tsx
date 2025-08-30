import React, { useState, useRef, useEffect } from 'react';
import { Search, Download, Plus, ChevronDown } from 'lucide-react';
import { ColumnConfig } from '../../types/table';

interface TableHeaderProps {
  globalSearch: string;
  onGlobalSearchChange: (value: string) => void;
  onSearch: (searchTerm: string, selectedColumns: string[]) => void;
  columns: ColumnConfig[];
  onExport?: {
    xlsx?: () => void;
    csv?: () => void;
  };
  onAdd?: () => void;
  globalSearchPlaceholder?: string;
  selectedCount?: number;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  globalSearch,
  onGlobalSearchChange,
  onSearch,
  columns,
  onExport,
  onAdd,
  globalSearchPlaceholder = "Search...",
  selectedCount = 0,
}) => {
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const exportDropdownRef = useRef<HTMLDivElement>(null);

  const searchableColumns = columns.filter(col => col.isSearchable !== false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (exportDropdownRef.current && !exportDropdownRef.current.contains(event.target as Node)) {
        setIsExportDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleColumnToggle = (columnName: string) => {
    setSelectedColumns(prev =>
      prev.includes(columnName)
        ? prev.filter(col => col !== columnName)
        : [...prev, columnName]
    );
  };

  const handleSelectAll = () => {
    if (selectedColumns.length === searchableColumns.length) {
      setSelectedColumns([]);
    } else {
      setSelectedColumns(searchableColumns.map(col => col.name));
    }
  };

  const handleSearch = () => {
    const columnsToSearch = selectedColumns.length > 0 ? selectedColumns : searchableColumns.map(col => col.name);
    onSearch(globalSearch, columnsToSearch);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-wrap justify-between items-center mb-6">
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <div className="relative flex items-center">
            {/* Search Input */}
            <input
              type="text"
              placeholder={globalSearchPlaceholder}
              value={globalSearch}
              onChange={(e) => onGlobalSearchChange(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-4 pr-4 py-2 h-10 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200 w-80"
            />

            {/* Column Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="h-10 px-3 border-y border-gray-300 bg-white hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-1"
              >
                <span className="text-sm text-gray-600">
                  {selectedColumns.length > 0 ? `${selectedColumns.length} columns` : 'All columns'}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-48">
                  <div className="p-3 border-b border-gray-200">
                    <button
                      onClick={handleSelectAll}
                      className="text-sm text-primary hover:text-primary-dark font-medium"
                    >
                      {selectedColumns.length === searchableColumns.length ? 'Deselect All' : 'Select All'}
                    </button>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {searchableColumns.map((column) => (
                      <label
                        key={column.name}
                        className="flex items-center space-x-2 p-2 hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedColumns.includes(column.name)}
                          onChange={() => handleColumnToggle(column.name)}
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-gray-700">{column.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="h-10 px-4 bg-primary text-white rounded-r-lg hover:bg-primary-dark transition-colors duration-200 flex items-center space-x-1 border border-gray-300 border-l-0"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className='flex items-center space-x-3'>
        {(onExport?.xlsx || onExport?.csv) && (
          <div className="relative" ref={exportDropdownRef}>
            <button
              onClick={() => setIsExportDropdownOpen(!isExportDropdownOpen)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {isExportDropdownOpen && (
              <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-32">
                {onExport.xlsx && (
                  <button
                    onClick={() => {
                      onExport.xlsx?.();
                      setIsExportDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export XLSX</span>
                  </button>
                )}
                {onExport.csv && (
                  <button
                    onClick={() => {
                      onExport.csv?.();
                      setIsExportDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export CSV</span>
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {onAdd && (
          <button
            onClick={onAdd}
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200"
          >
            <Plus className="w-4 w-4" />
            <span>Create</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default TableHeader;