"use client"

import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"

interface SearchSuggestionsProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  onSuggestionSelect: (suggestion: string) => void
}

export function SearchSuggestions({ searchQuery, onSearchChange }: SearchSuggestionsProps) {
  return (
    <div className="relative w-full">
      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <input
        type="text"
        placeholder="اكتب للبحث..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pr-10 pl-10 py-2 border border-gray-700 bg-transparent text-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent placeholder:text-gray-400"
        aria-label="بحث"
      />
      {searchQuery && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute left-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-gray-400 hover:text-white"
          onClick={() => onSearchChange("")}
          type="button"
          aria-label="مسح البحث"
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  )
}
