'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, ShoppingCart, Heart, Share2, Shield, Truck, RotateCcw, Minus, Plus, ChevronRight } from 'lucide-react'
import { Product } from '@/lib/types'
import { formatPrice } from '@/lib/data'
import { useCartStore } from '@/lib/cart-store'

export default function ProductDetailClient({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '')
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || '')
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const addItem = useCartStore((s) => s.addItem)

  const handleAddToCart = () => {
    addItem(product, selectedSize, selectedColor, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-gray-500 mb-4 flex-wrap">
        <Link href="/" className="hover:text-red-500">Trang chủ</Link>
        <ChevronRight size={14} />
        <Link href="/san-pham" className="hover:text-red-500">Sản phẩm</Link>
        <ChevronRight size={14} />
        <Link href={`/san-pham?danh-muc=${product.categorySlug}`} className="hover:text-red-500">
          {product.category}
        </Link>
        <ChevronRight size={14} />
        <span className="text-gray-800 truncate max-w-xs">{product.name}</span>
      </nav>

      <div className="bg-white rounded-sm p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {/* Images */}
          <div>
            <div className="relative aspect-square bg-gray-100 rounded-sm overflow-hidden mb-3">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {product.discount > 0 && (
                <span className="absolute top-3 left-3 bg-red-500 text-white font-bold text-sm px-2 py-1 rounded">
                  -{product.discount}%
                </span>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-16 h-16 rounded border-2 overflow-hidden transition-all ${selectedImage === i ? 'border-red-500' : 'border-transparent hover:border-gray-300'}`}
                    aria-label={`Ảnh sản phẩm ${i + 1}`}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="64px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <h1 className="text-xl font-semibold text-gray-800 mb-2 leading-snug">
              {product.name}
            </h1>

            {/* Rating & stats */}
            <div className="flex items-center gap-4 text-sm mb-3 flex-wrap">
              <div className="flex items-center gap-1">
                <span className="text-red-500 font-semibold border-b border-red-500">
                  {product.rating}
                </span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={14}
                      className={s <= Math.round(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}
                    />
                  ))}
                </div>
              </div>
              <span className="text-gray-500 border-l pl-4">
                {product.reviewCount.toLocaleString()} Đánh giá
              </span>
              <span className="text-gray-500 border-l pl-4">
                {product.soldCount.toLocaleString()} Đã bán
              </span>
            </div>

            {/* Price */}
            <div className="bg-gray-50 rounded-sm px-4 py-3 mb-4">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold" style={{ color: '#ee4d2d' }}>
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-gray-400 text-lg line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="bg-red-100 text-red-500 text-sm font-semibold px-2 py-0.5 rounded">
                      -{product.discount}%
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Color */}
            <div className="mb-4">
              <div className="text-sm text-gray-600 mb-2">
                Màu sắc: <span className="font-medium text-gray-800">{selectedColor}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1.5 text-sm border rounded transition-all ${selectedColor === color ? 'border-red-500 text-red-500 bg-red-50' : 'border-gray-200 text-gray-600 hover:border-red-300'}`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-gray-600">
                  Kích cỡ: <span className="font-medium text-gray-800">{selectedSize}</span>
                </div>
                <button className="text-sm text-red-500 hover:text-red-600">
                  Hướng dẫn chọn size →
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-10 text-sm border rounded transition-all ${selectedSize === size ? 'border-red-500 text-red-500 bg-red-50 font-medium' : 'border-gray-200 text-gray-600 hover:border-red-300'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-5">
              <span className="text-sm text-gray-600">Số lượng:</span>
              <div className="flex items-center border rounded overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  aria-label="Giảm số lượng"
                >
                  <Minus size={14} />
                </button>
                <span className="w-12 text-center text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  aria-label="Tăng số lượng"
                >
                  <Plus size={14} />
                </button>
              </div>
              <span className="text-sm text-gray-400">Còn hàng</span>
            </div>

            {/* CTA buttons */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded border-2 border-red-500 font-semibold transition-all ${added ? 'bg-red-500 text-white' : 'text-red-500 hover:bg-red-50'}`}
              >
                <ShoppingCart size={18} />
                {added ? 'Đã Thêm!' : 'Thêm Vào Giỏ Hàng'}
              </button>
              <Link
                href="/gio-hang"
                onClick={() => addItem(product, selectedSize, selectedColor, quantity)}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded font-semibold text-white transition-colors"
                style={{ backgroundColor: '#ee4d2d' }}
              >
                Mua Ngay
              </Link>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-3 border-t pt-4">
              {[
                { icon: <Truck size={18} className="text-green-500" />, text: 'Miễn phí vận chuyển' },
                { icon: <RotateCcw size={18} className="text-blue-500" />, text: 'Đổi trả 30 ngày' },
                { icon: <Shield size={18} className="text-orange-500" />, text: 'Hàng chính hãng 100%' },
              ].map((item) => (
                <div key={item.text} className="flex flex-col items-center text-center gap-1">
                  {item.icon}
                  <span className="text-xs text-gray-500">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-8 border-t pt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Mô Tả Sản Phẩm</h2>
          <div className="prose max-w-none text-sm text-gray-600 leading-relaxed">
            <p>{product.description}</p>
            <ul className="mt-3 space-y-1 list-disc list-inside">
              <li>Thương hiệu: {product.brand}</li>
              <li>Danh mục: {product.category}</li>
              <li>Kích cỡ có sẵn: {product.sizes.join(', ')}</li>
              <li>Màu sắc có sẵn: {product.colors.join(', ')}</li>
            </ul>
          </div>
        </div>

        {/* Reviews section */}
        <div className="mt-8 border-t pt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Đánh Giá Sản Phẩm ({product.reviewCount.toLocaleString()})
          </h2>
          <div className="flex items-center gap-6 mb-6 bg-red-50 rounded-lg p-4">
            <div className="text-center">
              <div className="text-5xl font-bold text-red-500">{product.rating}</div>
              <div className="flex justify-center mt-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={16}
                    className={s <= Math.round(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              <div className="text-sm text-gray-500 mt-1">trên 5</div>
            </div>
            <div className="flex-1 space-y-1">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-2 text-sm">
                  <span className="w-4 text-right">{star}</span>
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: `${star === 5 ? 70 : star === 4 ? 20 : 5}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sample reviews */}
          <div className="space-y-4">
            {[
              { user: 'Nguyễn T.H', rating: 5, date: '10/05/2024', text: 'Sản phẩm chất lượng tốt, đúng mô tả. Giao hàng nhanh, đóng gói cẩn thận. Sẽ mua thêm!', size: product.sizes[0], color: product.colors[0] },
              { user: 'Trần M.L', rating: 4, date: '08/05/2024', text: 'Chất liệu đẹp, form chuẩn. Màu sắc y như ảnh. Tuy nhiên giao hơi chậm một chút.', size: product.sizes[1] || product.sizes[0], color: product.colors[1] || product.colors[0] },
            ].map((review, i) => (
              <div key={i} className="border-b pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-sm font-semibold text-red-500">
                    {review.user[0]}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-800">{review.user}</div>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} size={12} className={s <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'} />
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-1">{review.text}</p>
                <div className="flex gap-3 text-xs text-gray-400">
                  <span>Size: {review.size}</span>
                  <span>Màu: {review.color}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
