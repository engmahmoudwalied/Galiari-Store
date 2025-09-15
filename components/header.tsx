"use client"

import { Heart } from "lucide-react"
import { SearchSuggestions } from "./search-suggestions"
import { MobileMenu } from "./mobile-menu"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  onCategorySelect: (category: string) => void
  activeCategory?: string
}

export function Header({ searchQuery, onSearchChange, onCategorySelect, activeCategory }: HeaderProps) {
  const handleSuggestionSelect = (suggestion: string) => {
    onSearchChange(suggestion)
  }

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60 border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-4">
          {/* Top row (mobile): logo + centered compact search + menu */}
          <div className="flex items-center justify-between order-1">
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-rose-400" />
              <h1 className="text-lg sm:text-2xl font-bold text-rose-400">جاليرى العربى</h1>
            </div>
            <div className="flex-1 flex justify-center px-2 md:hidden">
              <div className="w-full max-w-[220px]">
                <SearchSuggestions
                  searchQuery={searchQuery}
                  onSearchChange={onSearchChange}
                  onSuggestionSelect={handleSuggestionSelect}
                />
              </div>
            </div>
            <div className="md:hidden">
              <MobileMenu onCategorySelect={onCategorySelect} activeCategory={activeCategory} />
            </div>
          </div>

          {/* Search (desktop): centered */}
          <div className="hidden md:block md:flex-1 md:max-w-md order-2">
            <SearchSuggestions
              searchQuery={searchQuery}
              onSearchChange={onSearchChange}
              onSuggestionSelect={handleSuggestionSelect}
            />
          </div>

          {/* Desktop nav */}
          <div className="flex items-center gap-2 order-3">
            <nav className="hidden md:flex items-center gap-4 lg:gap-6">
              <Button
                variant="ghost"
                className={`text-sm font-medium transition-colors ${
                  activeCategory === "كوشة العروس"
                    ? "text-rose-400 bg-gray-800"
                    : "text-white hover:text-rose-400 hover:bg-gray-800"
                }`}
                onClick={() => onCategorySelect("كوشة العروس")}
              >
                كوشة العروس
              </Button>
              <Button
                variant="ghost"
                className={`text-sm font-medium transition-colors ${
                  activeCategory === "تنسيق الحفلات"
                    ? "text-rose-400 bg-gray-800"
                    : "text-white hover:text-rose-400 hover:bg-gray-800"
                }`}
                onClick={() => onCategorySelect("تنسيق الحفلات")}
              >
                تنسيق الحفلات
              </Button>
              <Button
                variant="ghost"
                className={`text-sm font-medium transition-colors ${
                  activeCategory === "الهدايا والتذكارات"
                    ? "text-rose-400 bg-gray-800"
                    : "text-white hover:text-rose-400 hover:bg-gray-800"
                }`}
                onClick={() => onCategorySelect("الهدايا والتذكارات")}
              >
                الهدايا
              </Button>
              <Button
                variant="ghost"
                className={`text-sm font-medium transition-colors ${
                  activeCategory === "الإكسسوارات"
                    ? "text-rose-400 bg-gray-800"
                    : "text-white hover:text-rose-400 hover:bg-gray-800"
                }`}
                onClick={() => onCategorySelect("الإكسسوارات")}
              >
                الإكسسوارات
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
