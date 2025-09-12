"use client"

import { useState, useEffect, useCallback } from "react"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import { products } from "@/lib/data"

interface SearchSuggestionsProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  onSuggestionSelect: (suggestion: string) => void
}

export function SearchSuggestions({ searchQuery, onSearchChange, onSuggestionSelect }: SearchSuggestionsProps) {
  const [open, setOpen] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])

  const debouncedSearch = useCallback((query: string) => {
    if (query.length > 1) {
      const productNames = products.map((p) => p.name)
      const brands = [...new Set(products.map((p) => p.brand))]
      const categories = [...new Set(products.map((p) => p.category))]
      const tags = [...new Set(products.flatMap((p) => p.tags))]

      const allSuggestions = [...productNames, ...brands, ...categories, ...tags]
      const filtered = allSuggestions.filter((item) => item.toLowerCase().includes(query.toLowerCase())).slice(0, 8)

      setSuggestions(filtered)
      setOpen(filtered.length > 0)
    } else {
      setSuggestions([])
      setOpen(false)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      debouncedSearch(searchQuery)
    }, 150) // Reduced debounce time for faster response

    return () => clearTimeout(timer)
  }, [searchQuery, debouncedSearch])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative w-full">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="البحث عن المنتجات..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pr-10 pl-10 py-2 border border-gray-700 bg-transparent text-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent placeholder:text-gray-400"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-gray-400 hover:text-white"
              onClick={() => onSearchChange("")}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] sm:w-[443px] p-0  border-gray-700" align="start">
        <Command className="bg-transparent backdrop-blur-lg">
          <CommandList>
            <CommandEmpty className="text-gray-400 justify-center text-center">لا توجد اقتراحات</CommandEmpty>
            <CommandGroup heading="" className="text-gray-300">
              {suggestions.map((suggestion, index) => (
                <CommandItem
                  key={index}
                  onSelect={() => {
                    onSuggestionSelect(suggestion)
                    setOpen(false)
                  }}
                  className="cursor-pointer text-white hover:bg-gray-800"
                >
                  <Search className="ml-2 h-4 w-4" />
                  <span className="truncate">{suggestion}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
