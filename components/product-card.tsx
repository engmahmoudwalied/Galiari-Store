import type { Product } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.05]">
      <div className="relative aspect-square">
        <div 
          className="relative overflow-hidden cursor-pointer aspect-square group"
          onClick={() => window.open(product.image || "/placeholder.svg", '_blank')}
        >
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-125"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* طبقة شفافة عند التمرير */}
          <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700">
              اضغط لفتح الصورة
            </div>
          </div>
        </div>
        {product.featured && (
          <Badge className="absolute top-2 left-2 bg-secondary text-secondary-foreground z-10">Featured</Badge>
        )}
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-lg leading-tight text-balance">{product.name}</h3>
            <a
              href={`https://wa.me/201128734187?text=مرحباً، أريد الاستفسار عن ${product.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold text-green-500 hover:text-green-400 transition-colors duration-200 cursor-pointer"
            >
              السعر واتساب
            </a>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 text-pretty">{product.description}</p>
          <div className="flex items-center justify-between pt-2">
            <Badge variant="outline" className="text-xs">
              {product.brand}
            </Badge>
            <span className="text-xs text-muted-foreground">{product.category}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
