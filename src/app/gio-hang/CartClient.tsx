'use client'

import Image from 'next/image'
import Link from 'next/link'
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
      <div className="mx-auto px-4 py-16 text-center" style={{ maxWidth: '1200px' }}>
        <span className="material-symbols-outlined block mx-auto mb-4" style={{ fontSize: '80px', color: '#eeeeee' }}>
          shopping_cart
        </span>
        <h2 className="font-semibold mb-2" style={{ fontSize: '24px', color: '#5f5e5e' }}>
          Giỏ hàng của bạn đang trống
        </h2>
        <p className="mb-6" style={{ fontSize: '14px', color: '#5b403b' }}>
          Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm
        </p>
        <Link
          href="/san-pham"
          className="inline-flex items-center gap-2 text-white px-8 py-3 rounded transition-colors active:scale-95"
          style={{ backgroundColor: '#b22204', fontSize: '18px' }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>shopping_bag</span>
          Mua Sắm Ngay
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto px-4 py-4 mb-24 md:mb-0" style={{ maxWidth: '1200px' }}>
      <h1 className="font-semibold mb-4" style={{ fontSize: '24px', color: '#1a1c1c' }}>
        Giỏ Hàng
      </h1>

      <div className="flex flex-col lg:flex-row gap-3">
        {/* Cart items */}
        <div className="flex-1 flex flex-col gap-3">
          {/* Table header (desktop) */}
          <div
            className="hidden md:flex items-center px-4 py-3 rounded shadow-sm"
            style={{ backgroundColor: '#ffffff', fontSize: '12px', color: '#5b403b', boxShadow: '0px 2px 12px rgba(0,0,0,0.05)' }}
          >
            <div className="flex items-center gap-3 w-2/5">
              <input type="checkbox" defaultChecked style={{ accentColor: '#b22204', width: '16px', height: '16px' }} />
              <span>Sản Phẩm</span>
            </div>
            <div className="w-1/5 text-center">Đơn Giá</div>
            <div className="w-1/5 text-center">Số Lượng</div>
            <div className="w-1/5 text-center">Số Tiền</div>
            <div className="w-12 text-center">Xóa</div>
          </div>

          {items.map((item) => (
            <div
              key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
              className="rounded shadow-sm p-4"
              style={{ backgroundColor: '#ffffff', boxShadow: '0px 2px 12px rgba(0,0,0,0.05)' }}
            >
              <div className="flex items-start gap-3">
                <input type="checkbox" defaultChecked style={{ accentColor: '#b22204', width: '16px', height: '16px', marginTop: '4px', flexShrink: 0 }} />
                <div className="relative flex-shrink-0 rounded overflow-hidden" style={{ width: '80px', height: '80px', backgroundColor: '#f3f3f3' }}>
                  <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" sizes="80px" />
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/san-pham/${item.product.slug}`}
                    className="line-clamp-2 block mb-1 hover:opacity-70 transition-colors"
                    style={{ fontSize: '14px', color: '#1a1c1c', lineHeight: '1.5' }}
                  >
                    {item.product.name}
                  </Link>
                  <div className="flex gap-3 mb-2" style={{ fontSize: '12px', color: '#5f5e5e' }}>
                    <span>Size: {item.selectedSize}</span>
                    <span>Màu: {item.selectedColor}</span>
                  </div>

                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold" style={{ fontSize: '20px', lineHeight: 1, color: '#b22204' }}>
                        {formatPrice(item.product.price)}
                      </span>
                      {item.product.originalPrice > item.product.price && (
                        <span className="line-through" style={{ fontSize: '12px', color: '#5f5e5e' }}>
                          {formatPrice(item.product.originalPrice)}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Quantity control */}
                      <div className="flex items-center border rounded overflow-hidden" style={{ borderColor: '#e3beb6' }}>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center transition-colors hover:opacity-70"
                          style={{ color: '#1a1c1c' }}
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>remove</span>
                        </button>
                        <span className="w-9 text-center" style={{ fontSize: '14px', fontWeight: 600 }}>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center transition-colors hover:opacity-70"
                          style={{ color: '#1a1c1c' }}
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>add</span>
                        </button>
                      </div>

                      {/* Total */}
                      <span className="hidden md:block font-bold" style={{ fontSize: '14px', color: '#b22204', minWidth: '80px', textAlign: 'right' }}>
                        {formatPrice(item.product.price * item.quantity)}
                      </span>

                      {/* Delete */}
                      <button
                        onClick={() => removeItem(item.product.id, item.selectedSize, item.selectedColor)}
                        className="transition-colors hover:opacity-70"
                        style={{ color: '#8f7069' }}
                        aria-label="Xóa sản phẩm"
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="w-full lg:w-72 flex flex-col gap-3 flex-shrink-0">
          {/* Voucher */}
          <div className="rounded shadow-sm p-4" style={{ backgroundColor: '#ffffff', boxShadow: '0px 2px 12px rgba(0,0,0,0.05)' }}>
            <h3 className="font-semibold mb-3" style={{ fontSize: '18px', color: '#1a1c1c' }}>Mã Giảm Giá</h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nhập mã voucher..."
                className="flex-1 border rounded px-3 py-2 outline-none focus:border-primary"
                style={{ fontSize: '14px', borderColor: '#e3beb6', color: '#1a1c1c' }}
              />
              <button
                className="px-4 py-2 text-white rounded transition-colors hover:opacity-90 active:scale-95"
                style={{ backgroundColor: '#b22204', fontSize: '14px' }}
              >
                Áp dụng
              </button>
            </div>
          </div>

          {/* Summary (sticky) */}
          <div className="rounded shadow-sm p-4 sticky top-24" style={{ backgroundColor: '#ffffff', boxShadow: '0px 2px 12px rgba(0,0,0,0.05)' }}>
            <h3 className="font-semibold mb-4" style={{ fontSize: '18px', color: '#1a1c1c' }}>Tóm Tắt Đơn Hàng</h3>
            <div className="space-y-3" style={{ fontSize: '14px' }}>
              <div className="flex justify-between" style={{ color: '#5f5e5e' }}>
                <span>Tạm tính ({count})</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between" style={{ color: '#5f5e5e' }}>
                <span>Phí vận chuyển</span>
                {shipping === 0
                  ? <span style={{ color: '#22c55e' }}>Miễn phí</span>
                  : <span>{formatPrice(shipping)}</span>}
              </div>
              {total < 150000 && (
                <p style={{ fontSize: '12px', color: '#5b403b' }}>
                  Mua thêm {formatPrice(150000 - total)} để miễn phí ship
                </p>
              )}
              <div className="flex justify-between" style={{ color: '#5f5e5e' }}>
                <span>Giảm giá</span>
                <span style={{ color: '#22c55e' }}>-{formatPrice(0)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold" style={{ borderColor: '#e8e8e8', fontSize: '18px' }}>
                <span style={{ color: '#1a1c1c' }}>Tổng cộng</span>
                <span style={{ color: '#b22204' }}>{formatPrice(finalTotal)}</span>
              </div>
              <p style={{ fontSize: '11px', color: '#5f5e5e' }}>(Đã bao gồm VAT nếu có)</p>
            </div>

            <button
              className="w-full mt-4 py-3 text-white font-semibold rounded transition-colors hover:opacity-90 active:scale-95"
              style={{ backgroundColor: '#b22204', fontSize: '18px' }}
            >
              Đặt Hàng ({count})
            </button>

            <div className="mt-3 grid grid-cols-3 gap-2">
              {['VISA', 'MoMo', 'VNPay'].map((m) => (
                <div key={m} className="border rounded text-center py-1" style={{ borderColor: '#e3beb6', fontSize: '12px', color: '#5f5e5e' }}>
                  {m}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile fixed bottom bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-3 z-50 flex items-center justify-between" style={{ borderColor: '#e3beb6' }}>
        <div>
          <span style={{ fontSize: '12px', color: '#5f5e5e' }}>Tổng tiền:</span>
          <span className="font-bold block" style={{ fontSize: '20px', color: '#b22204' }}>{formatPrice(finalTotal)}</span>
        </div>
        <button
          className="text-white px-8 py-3 rounded font-semibold active:scale-95"
          style={{ backgroundColor: '#b22204', fontSize: '18px' }}
        >
          Đặt Hàng ({count})
        </button>
      </div>
    </div>
  )
}
