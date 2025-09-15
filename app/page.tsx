"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { ProductGrid } from "@/components/product-grid"
import { FilterSidebar } from "@/components/filter-sidebar"
import { SortDropdown, type SortOption } from "@/components/sort-dropdown"
import { LoadingScreen } from "@/components/loading-screen"
import { Footer } from "@/components/footer"
import { Heart } from "lucide-react"
import {
  products,
  searchProducts,
  sortProducts,
  filterProducts,
  getInitialFilters,
} from "@/lib/data"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<SortOption>("featured")
  const [filters, setFilters] = useState(getInitialFilters())
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)

  const handleCategorySelect = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category) ? [] : [category],
    }))
    setActiveCategory(prev => prev === category ? undefined : category)
  }

  const handleClearFilters = () => {
    setFilters(getInitialFilters())
    setActiveCategory(undefined)
  }

  const filteredAndSortedProducts = useMemo(() => {
    let result = searchQuery.trim() ? searchProducts(searchQuery) : products
    result = filterProducts(result, filters)
    return sortProducts(result, sortBy)
  }, [searchQuery, filters, sortBy])

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.brands.length > 0 ||
    filters.colors.length > 0 ||
    filters.sizes.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 5000

  return (
    <div className="min-h-screen bg-black">
      <LoadingScreen onComplete={() => setIsLoading(false)} />
      
      {!isLoading && (
        <>
          <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} onCategorySelect={handleCategorySelect} activeCategory={activeCategory} />

      {!searchQuery && !hasActiveFilters && (
        <section className="relative bg-black py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Heart className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-rose-400" />
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance text-rose-400">
                جاليرى العربى 
              </h1>
            </div>
            <p className="text-lg sm:text-xl text-gray-300 text-balance mb-8 max-w-2xl mx-auto">
              نحول أحلامكم إلى حقيقة مع أجمل تصاميم الكوشة وتنسيق الأفراح والمناسبات الخاصة
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-gray-800 text-rose-300 px-3 py-1 rounded-full border border-gray-700">
                كوشة العروس الفاخرة
              </span>
              <span className="bg-gray-800 text-rose-300 px-3 py-1 rounded-full border border-gray-700">
                تنسيق الحفلات
              </span>
              <span className="bg-gray-800 text-rose-300 px-3 py-1 rounded-full border border-gray-700">
                الهدايا والتذكارات
              </span>
              <span className="bg-gray-800 text-rose-300 px-3 py-1 rounded-full border border-gray-700">
                الإكسسوارات المميزة
              </span>
            </div>
          </div>
        </section>
      )}

      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row-reverse gap-6 lg:gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <FilterSidebar filters={filters} onFiltersChange={setFilters} onClearFilters={handleClearFilters} />
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-6 sm:space-y-8">
            {/* تم إزالة قسم المنتجات المميزة */}

            <section>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-balance text-white">
                  {searchQuery
                    ? `نتائج البحث عن "${searchQuery}"`
                    : hasActiveFilters
                      ? "المنتجات المفلترة"
                      : "جميع المنتجات"}
                  <span className="block sm:inline text-sm font-normal text-gray-400 sm:mr-2">
                    ({filteredAndSortedProducts.length} منتج)
                  </span>
                </h2>
                <div className="flex-shrink-0">
                  <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
                </div>
              </div>
              <ProductGrid products={filteredAndSortedProducts} />
            </section>
          </div>
        </div>
      </main>

      <Footer />
        </>
      )}
    </div>
  )
}
