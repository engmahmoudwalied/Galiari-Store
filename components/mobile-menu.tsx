"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Heart } from "lucide-react"
import { categories } from "@/lib/data"

interface MobileMenuProps {
  onCategorySelect: (category: string) => void
  activeCategory?: string
}

export function MobileMenu({ onCategorySelect, activeCategory }: MobileMenuProps) {
  const [open, setOpen] = useState(false)

  const handleCategoryClick = (category: string) => {
    onCategorySelect(category)
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden text-white hover:text-rose-400 hover:bg-gray-800">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-black border-gray-800">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-white">
            <Heart className="h-6 w-6 text-rose-400" />
            جاليرى العربى
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          <div>
            <h3 className="font-semibold mb-3 text-white">الفئات</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant="ghost"
                  className={`w-full justify-start transition-colors ${
                    activeCategory === category.name
                      ? "text-rose-400 bg-gray-800"
                      : "text-white hover:text-rose-400 hover:bg-gray-800"
                  }`}
                  onClick={() => handleCategoryClick(category.name)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
