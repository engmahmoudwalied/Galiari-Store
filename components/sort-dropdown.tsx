"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpDown } from "lucide-react"

export type SortOption = "name-asc" | "name-desc" | "price-asc" | "price-desc" | "featured"

interface SortDropdownProps {
  sortBy: SortOption
  onSortChange: (sort: SortOption) => void
}

export function SortDropdown({ sortBy, onSortChange }: SortDropdownProps) {
  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="ترتيب حسب" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="featured">المميزة أولاً</SelectItem>
          <SelectItem value="name-asc">الاسم (أ-ي)</SelectItem>
          <SelectItem value="name-desc">الاسم (ي-أ)</SelectItem>
          <SelectItem value="price-asc">السعر (من الأقل للأعلى)</SelectItem>
          <SelectItem value="price-desc">السعر (من الأعلى للأقل)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
