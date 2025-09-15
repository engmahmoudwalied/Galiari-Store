import type { Product } from "@/lib/types"
import { ProductCard } from "./product-card"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

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
  showPagination = true,
}: ProductGridProps) {
  const [visibleCount, setVisibleCount] = useState(itemsPerPage)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-muted-foreground">No products found</h3>
        <p className="text-sm text-muted-foreground mt-2">Try adjusting your search or filters</p>
      </div>
    )
  }

  const currentProducts = products.slice(0, visibleCount)

  const handleShowMore = () => {
    if (isLoadingMore || visibleCount >= products.length) return
    setIsLoadingMore(true)
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + itemsPerPage, products.length))
      setIsLoadingMore(false)
    }, 600)
  }

  return (
    <div className="space-y-6">
      {title && <h2 className="text-2xl font-bold text-balance">{title}</h2>}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {showPagination && visibleCount < products.length && (
        <div className="flex justify-center mt-6">
          <Button
            onClick={handleShowMore}
            variant="default"
            size="lg"
            disabled={isLoadingMore}
            aria-busy={isLoadingMore}
            className="transition-all duration-200 hover:scale-105 active:scale-95 hover:-translate-y-0.5 hover:shadow-lg px-6 py-3 text-base sm:text-lg bg-rose-600 hover:bg-rose-500 text-white rounded-xl"
          >
            {isLoadingMore ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                جاري التحميل...
              </>
            ) : (
              <>اظهار المزيد</>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
