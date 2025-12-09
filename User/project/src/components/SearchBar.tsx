import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  onSearch?: () => void;
}

function SearchBar({ value, onChange, onClear, onSearch }: SearchBarProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && onSearch) {
              e.preventDefault();
              onSearch();
            }
          }}
          placeholder="Search by Student ID, Name, or Class..."
          className="w-full pl-12 pr-28 py-4 text-gray-900 placeholder-gray-400 border-2 border-gray-200 rounded-lg focus:border-[#3b82f6] focus:outline-none transition-colors text-lg"
        />
        {value && (
          <button
            onClick={onClear}
            className="absolute right-14 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        )}

        {onSearch && (
          <button
            type="button"
            onClick={onSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#3b82f6] text-white text-sm rounded-lg hover:bg-[#2563eb] transition-colors"
          >
            Search
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
