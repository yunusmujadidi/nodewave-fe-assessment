"use client";

import { LogOut, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";

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
  const { user, logout } = useAuth();
  const router = useRouter();

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

  const handleLogout = () => {
    logout();
    router.push("/login");
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
        <div className="flex items-center gap-3">
          <span className="text-gray-700 font-medium">
            {user?.name || "Ahmad Akbar"}
          </span>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center cursor-pointer">
                <User className="w-4 h-4 text-white" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
