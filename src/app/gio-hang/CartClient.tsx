'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from 'lucide-react'
import { useCartStore } from '@/lib/cart-store'
import { formatPrice } from '@/lib/data'

export default function CartClient() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCartStore()
  const total = totalPrice()
  const count = totalItems()
  const shipping = total >= 150000 ? 0 : 30000
  const finalTotal = total + shipping

  if (count === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <ShoppingBag size={80} className="mx-auto text-gray-200 mb-4" />
        <h2 className="text-xl font-semibold text-gray-600 mb-2">Giỏ hàng của bạn đang trống</h2>
        <p className="text-gray-400 mb-6">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
        <Link
          href="/san-pham"
          className="inline-flex items-center gap-2 bg-red-500 text-white px-8 py-3 rounded hover:bg-red-600 transition-colors"
        >
          <ShoppingBag size={18} /> Mua Sắm Ngay
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Link href="/san-pham" className="text-gray-500 hover:text-red-500 flex items-center gap-1 text-sm">
          <ArrowLeft size={16} /> Tiếp tục mua sắm
        </Link>
        <h1 className="text-lg font-semibold text-gray-800">
          Giỏ Hàng ({count} sản phẩm)
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-3">
          {/* Select all */}
          <div className="bg-white rounded-sm px-4 py-3 flex items-center gap-3 border-b">
            <input type="checkbox" defaultChecked className="accent-red-500 w-4 h-4" />
            <span className="text-sm font-medium text-gray-700">Chọn Tất Cả ({count})</span>
            <button className="ml-auto text-sm text-gray-500 hover:text-red-500 flex items-center gap-1">
              <Trash2 size={14} /> Xóa
            </button>
          </div>

          {items.map((item) => (
            <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
              className="bg-white rounded-sm p-4"
            >
              <div className="flex gap-3">
                <input type="checkbox" defaultChecked className="accent-red-500 w-4 h-4 mt-1 flex-shrink-0" />
                <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/san-pham/${item.product.slug}`}
                    className="text-sm text-gray-800 hover:text-red-500 line-clamp-2 mb-1 block"
                  >
                    {item.product.name}
                  </Link>
                  <div className="flex gap-3 text-xs text-gray-500 mb-2">
                    <span>Size: {item.selectedSize}</span>
                    <span>Màu: {item.selectedColor}</span>
                  </div>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-red-500 font-semibold text-sm">
                        {formatPrice(item.product.price)}
                      </span>
                      {item.product.originalPrice > item.product.price && (
                        <span className="text-gray-400 text-xs line-through">
                          {formatPrice(item.product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center border rounded overflow-hidden">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedSize,
                              item.selectedColor,
                              item.quantity - 1
                            )
                          }
                          className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 text-gray-600"
                          aria-label="Giảm"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedSize,
                              item.selectedColor,
                              item.quantity + 1
                            )
                          }
                          className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 text-gray-600"
                          aria-label="Tăng"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() =>
                          removeItem(item.product.id, item.selectedSize, item.selectedColor)
                        }
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Xóa sản phẩm"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="space-y-3">
          {/* Voucher */}
          <div className="bg-white rounded-sm p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Mã Giảm Giá</h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nhập mã voucher..."
                className="flex-1 border rounded px-3 py-2 text-sm focus:outline-none focus:border-red-400"
              />
              <button className="px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors">
                Áp dụng
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-sm p-4 sticky top-24">
            <h3 className="text-sm font-semibold text-gray-800 mb-4">Tóm Tắt Đơn Hàng</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Tạm tính ({count} sản phẩm)</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Phí vận chuyển</span>
                {shipping === 0 ? (
                  <span className="text-green-500">Miễn phí</span>
                ) : (
                  <span>{formatPrice(shipping)}</span>
                )}
              </div>
              {total < 150000 && (
                <p className="text-xs text-gray-400">
                  Mua thêm {formatPrice(150000 - total)} để được miễn phí ship
                </p>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Giảm giá voucher</span>
                <span className="text-green-500">-{formatPrice(0)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-semibold text-base">
                <span>Tổng cộng</span>
                <span style={{ color: '#ee4d2d' }}>{formatPrice(finalTotal)}</span>
              </div>
              <p className="text-xs text-gray-400">(Đã bao gồm VAT nếu có)</p>
            </div>

            <button className="w-full mt-4 py-3 text-white font-semibold rounded transition-colors hover:opacity-90"
              style={{ backgroundColor: '#ee4d2d' }}
            >
              Đặt Hàng ({count})
            </button>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {['VISA', 'MoMo', 'VNPay'].map((method) => (
                <div key={method} className="border rounded text-center py-1 text-xs text-gray-500">
                  {method}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
