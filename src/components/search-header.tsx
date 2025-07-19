"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { UserNavbar } from "./user-navbar";

interface SearchHeaderProps {
  onSearch?: (value: string) => void;
  searchValue?: string;
  placeholder?: string;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  onSearch,
  searchValue = "",
  placeholder = "Search (Ctrl+/)",
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle Ctrl+/ shortcut
    if ((e.ctrlKey || e.metaKey) && e.key === "/") {
      e.preventDefault();
      const input = document.getElementById("search-input");
      if (input) {
        input.focus();
      }
    }
  };

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "/") {
        e.preventDefault();
        const searchInput = document.getElementById("search-input");
        if (searchInput) {
          searchInput.focus();
        }
      }
    };

    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  return (
    <div className="relative z-50 w-full bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* search section */}
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <Search className="w-5 h-5 text-gray-400" />
          <Input
            id="search-input"
            type="text"
            placeholder={placeholder}
            value={searchValue}
            onChange={(e) => onSearch?.(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border-0 shadow-none focus-visible:ring-0 focus-visible:border-transparent bg-transparent text-gray-700 placeholder:text-gray-400 h-8 px-0"
          />
        </div>

        {/* user navbar */}
        <UserNavbar />
      </div>
    </div>
  );
};
