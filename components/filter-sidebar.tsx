"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { X, Filter } from "lucide-react"
import { categories, products } from "@/lib/data"
import type { FilterOptions } from "@/lib/types"

interface FilterSidebarProps {
  filters: FilterOptions
  onFiltersChange: (filters: FilterOptions) => void
  onClearFilters: () => void
}

export function FilterSidebar({ filters, onFiltersChange, onClearFilters }: FilterSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const allBrands = [...new Set(products.map((p) => p.brand))].sort()
  const allColors = [...new Set(products.flatMap((p) => p.colors))].sort()
  const allSizes = [...new Set(products.flatMap((p) => p.sizes))].sort()

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked ? [...filters.categories, category] : filters.categories.filter((c) => c !== category)

    onFiltersChange({ ...filters, categories: newCategories })
  }

  const handleBrandChange = (brand: string, checked: boolean) => {
    const newBrands = checked ? [...filters.brands, brand] : filters.brands.filter((b) => b !== brand)

    onFiltersChange({ ...filters, brands: newBrands })
  }

  const handleColorChange = (color: string, checked: boolean) => {
    const newColors = checked ? [...filters.colors, color] : filters.colors.filter((c) => c !== color)

    onFiltersChange({ ...filters, colors: newColors })
  }

  const handleSizeChange = (size: string, checked: boolean) => {
    const newSizes = checked ? [...filters.sizes, size] : filters.sizes.filter((s) => s !== size)

    onFiltersChange({ ...filters, sizes: newSizes })
  }

  const handlePriceRangeChange = (value: number[]) => {
    onFiltersChange({ ...filters, priceRange: [value[0], value[1]] })
  }

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.brands.length > 0 ||
    filters.colors.length > 0 ||
    filters.sizes.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 500

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold flex items-center gap-2">
          <Filter className="h-4 w-4" />
          المرشحات
        </h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            مسح الكل
          </Button>
        )}
      </div>

      <Separator />

      {/* Categories */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">الفئات</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id={`category-${category.id}`}
                checked={filters.categories.includes(category.name)}
                onCheckedChange={(checked) => handleCategoryChange(category.name, checked as boolean)}
              />
              <label htmlFor={`category-${category.id}`} className="text-sm cursor-pointer">
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">نطاق السعر</h4>
        <div className="px-2">
          <Slider
            value={filters.priceRange}
            onValueChange={handlePriceRangeChange}
            max={500}
            min={0}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Brands */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">العلامات التجارية</h4>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {allBrands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id={`brand-${brand}`}
                checked={filters.brands.includes(brand)}
                onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
              />
              <label htmlFor={`brand-${brand}`} className="text-sm cursor-pointer">
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Colors */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">الألوان</h4>
        <div className="flex flex-wrap gap-2">
          {allColors.map((color) => (
            <Badge
              key={color}
              variant={filters.colors.includes(color) ? "default" : "outline"}
              className="cursor-pointer text-xs"
              onClick={() => handleColorChange(color, !filters.colors.includes(color))}
            >
              {color}
              {filters.colors.includes(color) && <X className="mr-1 h-3 w-3" />}
            </Badge>
          ))}
        </div>
      </div>

      <Separator />

      {/* Sizes */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">المقاسات</h4>
        <div className="flex flex-wrap gap-2">
          {allSizes.map((size) => (
            <Badge
              key={size}
              variant={filters.sizes.includes(size) ? "default" : "outline"}
              className="cursor-pointer text-xs"
              onClick={() => handleSizeChange(size, !filters.sizes.includes(size))}
            >
              {size}
              {filters.sizes.includes(size) && <X className="mr-1 h-3 w-3" />}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <Button variant="outline" onClick={() => setIsOpen(!isOpen)} className="w-full">
          <Filter className="ml-2 h-4 w-4" />
          المرشحات
          {hasActiveFilters && <Badge className="mr-2">نشط</Badge>}
        </Button>
      </div>

      {/* Mobile Filter Panel */}
      {isOpen && (
        <Card className="lg:hidden mb-6">
          <CardContent className="p-4">
            <FilterContent />
          </CardContent>
        </Card>
      )}

      {/* Desktop Filter Sidebar */}
      <Card className="hidden lg:block">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">المرشحات</CardTitle>
        </CardHeader>
        <CardContent>
          <FilterContent />
        </CardContent>
      </Card>
    </>
  )
}
