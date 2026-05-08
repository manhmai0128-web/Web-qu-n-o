import Link from 'next/link'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { Product } from '@/lib/types'
import { formatPrice } from '@/lib/data'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/san-pham/${product.slug}`}
      className="product-card group bg-white rounded-sm shadow-sm hover:shadow-md transition-shadow overflow-hidden block"
      aria-label={`${product.name} - ${formatPrice(product.price)}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-square bg-gray-100">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
          className="product-card-img object-cover transition-transform duration-300"
          loading="lazy"
        />
        {product.discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">
            -{product.discount}%
          </span>
        )}
        {product.isNew && (
          <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">
            MỚI
          </span>
        )}
        {product.isBestseller && !product.isNew && (
          <span className="absolute top-2 right-2 bg-orange-400 text-white text-xs font-bold px-1.5 py-0.5 rounded">
            BÁN CHẠY
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-2">
        <h3 className="text-sm text-gray-800 line-clamp-2 mb-1 leading-snug">{product.name}</h3>

        <div className="flex items-center gap-1 mb-1">
          <span className="text-red-500 font-semibold text-sm">{formatPrice(product.price)}</span>
          {product.originalPrice > product.price && (
            <span className="text-gray-400 text-xs line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-0.5">
            <Star size={11} className="text-yellow-400 fill-yellow-400" />
            <span className="text-xs text-gray-500">{product.rating}</span>
          </div>
          <span className="text-xs text-gray-400">
            Đã bán {product.soldCount >= 1000 ? `${(product.soldCount / 1000).toFixed(1)}k` : product.soldCount}
          </span>
        </div>
      </div>
    </Link>
  )
}
