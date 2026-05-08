import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/lib/types'
import { formatPrice } from '@/lib/data'

interface ProductCardProps {
  product: Product
  showMall?: boolean
}

export default function ProductCard({ product, showMall = false }: ProductCardProps) {
  return (
    <Link
      href={`/san-pham/${product.slug}`}
      className="product-card group block rounded-lg border overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-md flex flex-col"
      style={{
        backgroundColor: '#ffffff',
        borderColor: '#e8e8e8',
        boxShadow: '0px 2px 12px rgba(0,0,0,0.03)',
      }}
      aria-label={`${product.name} - ${formatPrice(product.price)}`}
    >
      {/* Image */}
      <div className="relative w-full overflow-hidden rounded-t-lg" style={{ paddingTop: '100%' }}>
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
          className="product-card-img absolute inset-0 w-full h-full object-cover transition-transform duration-300"
          loading="lazy"
        />
        {/* MALL badge */}
        {(showMall || product.isBestseller) && (
          <div
            className="absolute top-0 left-0 text-white px-1 py-0.5 rounded-br-sm z-10"
            style={{ backgroundColor: '#D0011B', fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em', lineHeight: 1 }}
          >
            MALL
          </div>
        )}
        {/* Discount badge */}
        {product.discount > 0 && (
          <div
            className="absolute top-0 right-0 px-1 py-0.5 rounded-bl-sm z-10"
            style={{ backgroundColor: '#fceecf', color: '#b22204', fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em', lineHeight: 1 }}
          >
            -{product.discount}%
          </div>
        )}
        {/* NEW badge */}
        {product.isNew && !product.discount && (
          <div
            className="absolute top-0 right-0 px-1 py-0.5 rounded-bl-sm z-10 text-white"
            style={{ backgroundColor: '#b22204', fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em', lineHeight: 1 }}
          >
            MỚI
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 flex-1 flex flex-col justify-between">
        <h3
          className="line-clamp-2 mb-2 leading-tight"
          style={{ fontSize: '14px', lineHeight: '1.5', color: '#1a1c1c' }}
        >
          {product.name}
        </h3>

        <div>
          <div className="font-bold mb-1" style={{ fontSize: '20px', lineHeight: 1, color: '#b22204' }}>
            {formatPrice(product.price)}
          </div>
          <div className="flex items-center justify-between" style={{ fontSize: '12px', color: '#5f5e5e' }}>
            {/* Stars */}
            <div className="flex items-center gap-0.5" style={{ color: '#ffba3f', fontSize: '10px' }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <span
                  key={s}
                  className="material-symbols-outlined"
                  style={{
                    fontSize: '12px',
                    fontVariationSettings: s <= Math.round(product.rating) ? "'FILL' 1" : "'FILL' 0",
                  }}
                >
                  star
                </span>
              ))}
            </div>
            <span>
              Đã bán{' '}
              {product.soldCount >= 1000
                ? `${(product.soldCount / 1000).toFixed(1)}k`
                : product.soldCount}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
