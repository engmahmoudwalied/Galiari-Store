import type { Product } from "@/lib/types"
import { ProductCard } from "./product-card"
import { Pagination } from "./pagination"
import { useState } from "react"

interface ProductGridProps {
  products: Product[]
  title?: string
  itemsPerPage?: number
  showPagination?: boolean
}

export function ProductGrid({ 
  products, 
  title, 
  itemsPerPage = 10, 
  showPagination = true 
}: ProductGridProps) {
  const [currentPage, setCurrentPage] = useState(1)
  
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-muted-foreground">No products found</h3>
        <p className="text-sm text-muted-foreground mt-2">Try adjusting your search or filters</p>
      </div>
    )
  }

  const totalPages = Math.ceil(products.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProducts = products.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="space-y-6">
      {title && <h2 className="text-2xl font-bold text-balance">{title}</h2>}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {showPagination && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          totalItems={products.length}
        />
      )}
    </div>
  )
}
