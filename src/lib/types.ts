export interface Product {
  id: string
  name: string
  slug: string
  price: number
  originalPrice: number
  discount: number
  rating: number
  reviewCount: number
  soldCount: number
  images: string[]
  category: string
  categorySlug: string
  brand: string
  description: string
  sizes: string[]
  colors: string[]
  inStock: boolean
  isNew?: boolean
  isBestseller?: boolean
  tags: string[]
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  productCount: number
}

export interface CartItem {
  product: Product
  quantity: number
  selectedSize: string
  selectedColor: string
}
