'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
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
    <div className="mx-auto px-4 py-6" style={{ maxWidth: '1200px' }}>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 mb-4 flex-wrap" style={{ fontSize: '14px', color: '#5f5e5e' }}>
        <Link href="/" className="hover:opacity-70" style={{ color: '#5f5e5e' }}>Trang chủ</Link>
        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>chevron_right</span>
        <Link href="/san-pham" className="hover:opacity-70" style={{ color: '#5f5e5e' }}>Sản phẩm</Link>
        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>chevron_right</span>
        <Link href={`/san-pham?danh-muc=${product.categorySlug}`} className="hover:opacity-70" style={{ color: '#5f5e5e' }}>
          {product.category}
        </Link>
        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>chevron_right</span>
        <span className="truncate max-w-xs" style={{ color: '#1a1c1c' }}>{product.name}</span>
      </nav>

      <div
        className="rounded-xl p-4 md:p-6 shadow-sm"
        style={{ backgroundColor: '#ffffff', boxShadow: '0px 2px 12px rgba(0,0,0,0.05)' }}
      >
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Images */}
          <div className="lg:w-1/2 flex flex-col gap-3">
            <div
              className="relative w-full rounded-xl overflow-hidden shadow-sm"
              style={{ aspectRatio: '1/1', backgroundColor: '#eeeeee', boxShadow: '0px 2px 12px rgba(0,0,0,0.05)' }}
            >
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div
                className="absolute top-4 left-4 text-white px-2 py-1 rounded"
                style={{ backgroundColor: '#D0011B', fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em' }}
              >
                Mall
              </div>
              {product.discount > 0 && (
                <div
                  className="absolute top-4 right-4 px-2 py-1 rounded"
                  style={{ backgroundColor: '#ffdad3', color: '#3e0500', fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em' }}
                >
                  -{product.discount}% GIẢM
                </div>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1 hide-scrollbar">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className="flex-shrink-0 rounded-lg overflow-hidden transition-all"
                    style={{
                      width: '80px',
                      height: '80px',
                      border: i === selectedImage ? '2px solid #b22204' : '1px solid #e3beb6',
                      opacity: i === selectedImage ? 1 : 0.7,
                    }}
                  >
                    <Image src={img} alt="" width={80} height={80} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="lg:w-1/2 flex flex-col gap-4">
            <div>
              <h1 className="font-semibold mb-2" style={{ fontSize: '24px', lineHeight: '1.3', color: '#1a1c1c' }}>
                {product.name}
              </h1>
              <div className="flex items-center gap-3 flex-wrap" style={{ fontSize: '12px' }}>
                {/* Rating */}
                <div className="flex items-center gap-1">
                  <span className="border-b font-semibold" style={{ color: '#b22204', borderColor: '#b22204' }}>
                    {product.rating}
                  </span>
                  <div className="flex" style={{ color: '#ffba3f' }}>
                    {[1,2,3,4,5].map((s) => (
                      <span
                        key={s}
                        className="material-symbols-outlined"
                        style={{ fontSize: '14px', fontVariationSettings: s <= Math.round(product.rating) ? "'FILL' 1" : "'FILL' 0" }}
                      >star</span>
                    ))}
                  </div>
                </div>
                <span className="border-l pl-3" style={{ color: '#5f5e5e', borderColor: '#e3beb6' }}>
                  {product.reviewCount.toLocaleString()} Đánh giá
                </span>
                <span className="border-l pl-3" style={{ color: '#5f5e5e', borderColor: '#e3beb6' }}>
                  {product.soldCount.toLocaleString()} Đã bán
                </span>
              </div>
            </div>

            {/* Price box */}
            <div className="flex items-end gap-3 p-4 rounded-lg" style={{ backgroundColor: '#f3f3f3' }}>
              {product.originalPrice > product.price && (
                <span className="line-through mb-1" style={{ fontSize: '14px', color: '#5f5e5e' }}>
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <span className="font-bold" style={{ fontSize: '20px', lineHeight: 1, color: '#b22204' }}>
                {formatPrice(product.price)}
              </span>
              {product.discount > 0 && (
                <span className="px-2 py-1 rounded-sm mb-1 ml-2" style={{ backgroundColor: '#ffdad3', color: '#3e0500', fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em' }}>
                  -{product.discount}% GIẢM
                </span>
              )}
            </div>

            {/* Color */}
            <div className="flex flex-col gap-2">
              <span className="font-semibold" style={{ fontSize: '14px', color: '#5b403b' }}>Màu sắc</span>
              <div className="flex gap-3 flex-wrap">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className="px-4 py-2 rounded-sm border transition-all hover:-translate-y-0.5"
                    style={{
                      fontSize: '12px',
                      border: selectedColor === color ? '2px solid #b22204' : '1px solid #e3beb6',
                      color: selectedColor === color ? '#b22204' : '#636262',
                      backgroundColor: '#ffffff',
                      boxShadow: selectedColor === color ? '0px 2px 12px rgba(0,0,0,0.05)' : 'none',
                    }}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold" style={{ fontSize: '14px', color: '#5b403b' }}>Kích thước</span>
                <Link href="#" className="hover:underline" style={{ fontSize: '12px', color: '#b22204' }}>
                  Hướng dẫn chọn size
                </Link>
              </div>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className="rounded-sm border transition-all hover:-translate-y-0.5"
                    style={{
                      width: '48px',
                      height: '40px',
                      fontSize: '12px',
                      border: selectedSize === size ? '2px solid #b22204' : '1px solid #e3beb6',
                      color: selectedSize === size ? '#b22204' : '#636262',
                      backgroundColor: '#ffffff',
                      fontWeight: selectedSize === size ? 600 : 400,
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span style={{ fontSize: '14px', color: '#5b403b' }}>Số lượng:</span>
              <div className="flex items-center border rounded overflow-hidden" style={{ borderColor: '#e3beb6' }}>
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 flex items-center justify-center transition-colors hover:opacity-70"
                  style={{ color: '#1a1c1c' }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>remove</span>
                </button>
                <span className="w-12 text-center" style={{ fontSize: '14px', fontWeight: 600 }}>{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-9 h-9 flex items-center justify-center transition-colors hover:opacity-70"
                  style={{ color: '#1a1c1c' }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>add</span>
                </button>
              </div>
              <span style={{ fontSize: '14px', color: '#5f5e5e' }}>Còn hàng</span>
            </div>

            {/* CTA */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-sm border-2 font-semibold transition-all active:scale-95"
                style={{
                  fontSize: '18px',
                  borderColor: '#b22204',
                  color: added ? '#ffffff' : '#b22204',
                  backgroundColor: added ? '#b22204' : '#ffffff',
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>shopping_cart</span>
                {added ? 'Đã Thêm!' : 'Thêm Vào Giỏ'}
              </button>
              <Link
                href="/gio-hang"
                onClick={() => addItem(product, selectedSize, selectedColor, quantity)}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-sm font-semibold text-white transition-colors active:scale-95 hover:opacity-90"
                style={{ fontSize: '18px', backgroundColor: '#b22204' }}
              >
                Mua Ngay
              </Link>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 border-t pt-4" style={{ borderColor: '#e8e8e8' }}>
              {[
                { icon: 'local_shipping', text: 'Miễn phí vận chuyển', color: '#22c55e' },
                { icon: 'autorenew', text: 'Đổi trả 30 ngày', color: '#3b82f6' },
                { icon: 'verified', text: 'Hàng chính hãng', color: '#f97316' },
              ].map((item) => (
                <div key={item.text} className="flex flex-col items-center text-center gap-1">
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', color: item.color }}>
                    {item.icon}
                  </span>
                  <span style={{ fontSize: '11px', color: '#5f5e5e', lineHeight: '1.3' }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Description & Reviews */}
        <div className="mt-8 border-t pt-6" style={{ borderColor: '#e8e8e8' }}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Description (left 2/3) */}
            <div className="lg:col-span-2">
              <h2 className="font-semibold mb-3" style={{ fontSize: '24px', color: '#1a1c1c' }}>Mô Tả Sản Phẩm</h2>
              <p style={{ fontSize: '14px', lineHeight: '1.5', color: '#1a1c1c' }}>{product.description}</p>
              <ul className="mt-3 space-y-1" style={{ fontSize: '14px', color: '#1a1c1c' }}>
                <li>• Thương hiệu: <strong>{product.brand}</strong></li>
                <li>• Danh mục: {product.category}</li>
                <li>• Sizes: {product.sizes.join(', ')}</li>
                <li>• Màu sắc: {product.colors.join(', ')}</li>
              </ul>
            </div>

            {/* Specs (right 1/3) */}
            <div>
              <h2 className="font-semibold mb-3" style={{ fontSize: '24px', color: '#1a1c1c' }}>Thông Số</h2>
              <div className="rounded-lg overflow-hidden border" style={{ borderColor: '#e8e8e8' }}>
                {[
                  { label: 'Thương hiệu', value: product.brand },
                  { label: 'Xuất xứ', value: 'Việt Nam' },
                  { label: 'Chất liệu', value: 'Cotton / Polyester' },
                  { label: 'Tình trạng', value: product.inStock ? 'Còn hàng' : 'Hết hàng' },
                ].map((spec, i) => (
                  <div
                    key={spec.label}
                    className="flex"
                    style={{ backgroundColor: i % 2 === 0 ? '#f3f3f3' : '#ffffff', borderBottom: '1px solid #e8e8e8' }}
                  >
                    <div className="w-1/2 px-3 py-2 font-medium" style={{ fontSize: '12px', color: '#5b403b' }}>{spec.label}</div>
                    <div className="w-1/2 px-3 py-2" style={{ fontSize: '12px', color: '#1a1c1c' }}>{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-8 border-t pt-6" style={{ borderColor: '#e8e8e8' }}>
          <h2 className="font-semibold mb-4" style={{ fontSize: '24px', color: '#1a1c1c' }}>
            Đánh Giá ({product.reviewCount.toLocaleString()})
          </h2>
          <div className="flex items-center gap-6 mb-6 rounded-lg p-4" style={{ backgroundColor: '#ffdad3' }}>
            <div className="text-center">
              <div className="font-bold" style={{ fontSize: '48px', color: '#b22204' }}>{product.rating}</div>
              <div className="flex justify-center my-1" style={{ color: '#ffba3f' }}>
                {[1,2,3,4,5].map((s) => (
                  <span key={s} className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: s <= Math.round(product.rating) ? "'FILL' 1" : "'FILL' 0" }}>star</span>
                ))}
              </div>
              <div style={{ fontSize: '12px', color: '#5f5e5e' }}>trên 5</div>
            </div>
            <div className="flex-1 space-y-1">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-2" style={{ fontSize: '12px' }}>
                  <span className="w-3 text-right">{star}</span>
                  <span className="material-symbols-outlined" style={{ fontSize: '12px', color: '#ffba3f', fontVariationSettings: "'FILL' 1" }}>star</span>
                  <div className="flex-1 rounded-full h-2 relative overflow-hidden" style={{ backgroundColor: '#e5e2e1' }}>
                    <div className="h-2 rounded-full absolute left-0 top-0" style={{ backgroundColor: '#ffba3f', width: `${star === 5 ? 70 : star === 4 ? 20 : 5}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {[
              { user: 'Nguyễn T.H', rating: 5, date: '10/05/2024', text: 'Sản phẩm chất lượng tốt, đúng mô tả. Giao hàng nhanh, đóng gói cẩn thận!' },
              { user: 'Trần M.L', rating: 4, date: '08/05/2024', text: 'Chất liệu đẹp, form chuẩn. Màu sắc y như ảnh. Sẽ mua thêm lần sau.' },
            ].map((review, i) => (
              <div key={i} className="border-b pb-4" style={{ borderColor: '#e8e8e8' }}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ backgroundColor: '#b22204' }}>
                    {review.user[0]}
                  </div>
                  <div>
                    <div className="font-medium" style={{ fontSize: '14px', color: '#1a1c1c' }}>{review.user}</div>
                    <div className="flex items-center gap-2">
                      <div className="flex" style={{ color: '#ffba3f' }}>
                        {[1,2,3,4,5].map((s) => (
                          <span key={s} className="material-symbols-outlined" style={{ fontSize: '12px', fontVariationSettings: s <= review.rating ? "'FILL' 1" : "'FILL' 0" }}>star</span>
                        ))}
                      </div>
                      <span style={{ fontSize: '12px', color: '#5f5e5e' }}>{review.date}</span>
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: '14px', color: '#1a1c1c' }}>{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
