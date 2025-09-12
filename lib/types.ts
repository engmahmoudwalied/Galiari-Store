export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  brand: string
  colors: string[]
  sizes: string[]
  tags: string[]
  featured: boolean
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
}

export interface FilterOptions {
  categories: string[]
  brands: string[]
  colors: string[]
  sizes: string[]
  priceRange: [number, number]
}
