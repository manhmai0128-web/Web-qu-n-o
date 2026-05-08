'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useCartStore } from '@/lib/cart-store'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const totalItems = useCartStore((s) => s.totalItems)()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/san-pham?q=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  return (
    <>
      {/* Main header */}
      <header
        className="sticky top-0 z-50 w-full border-b"
        style={{ backgroundColor: '#f9f9f9', borderColor: '#e3beb6' }}
      >
        <div
          className="flex justify-between items-center px-4 h-16 mx-auto"
          style={{ maxWidth: '1200px' }}
        >
          {/* Logo */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="font-bold tracking-tight"
              style={{ fontSize: '32px', lineHeight: '1.2', color: '#b22204' }}
            >
              SwiftShop
            </Link>

            {/* Desktop search */}
            <form onSubmit={handleSearch} className="hidden md:flex relative w-96">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full h-10 pl-4 pr-12 rounded-lg border-2 bg-white text-sm outline-none focus:ring-0"
                style={{ borderColor: '#b22204', color: '#1a1c1c' }}
                aria-label="Tìm kiếm sản phẩm"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-10 w-12 flex items-center justify-center text-white transition-colors"
                style={{ backgroundColor: '#b22204', borderRadius: '0 0.5rem 0.5rem 0' }}
                aria-label="Tìm kiếm"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>search</span>
              </button>
            </form>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6" style={{ fontSize: '14px' }}>
            <Link href="/san-pham" className="transition-colors hover:opacity-70" style={{ color: '#1a1c1c' }}>
              Flash Sales
            </Link>
            <Link
              href="/san-pham"
              className="font-bold pb-1 border-b-2 transition-colors hover:opacity-70"
              style={{ color: '#b22204', borderColor: '#b22204' }}
            >
              Mall
            </Link>
            <Link href="/san-pham" className="transition-colors hover:opacity-70" style={{ color: '#1a1c1c' }}>
              Live
            </Link>
            <Link href="/san-pham" className="transition-colors hover:opacity-70" style={{ color: '#1a1c1c' }}>
              Global Hub
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-3" style={{ color: '#b22204' }}>
            <Link
              href="/gio-hang"
              className="relative hover:opacity-70 transition-colors"
              aria-label={`Giỏ hàng (${totalItems})`}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>shopping_cart</span>
              {totalItems > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center"
                  style={{ backgroundColor: '#b22204', fontSize: '10px' }}
                >
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>
            <button className="hover:opacity-70 transition-colors hidden md:block" aria-label="Thông báo">
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>notifications</span>
            </button>
            <button className="hover:opacity-70 transition-colors" aria-label="Tài khoản">
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>person</span>
            </button>
            {/* Mobile menu */}
            <button
              className="md:hidden hover:opacity-70"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
                {isMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden px-4 pb-3">
          <form onSubmit={handleSearch} className="relative w-full">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm sản phẩm..."
              className="w-full h-10 pl-4 pr-12 rounded-lg border-2 bg-white text-sm outline-none"
              style={{ borderColor: '#b22204' }}
            />
            <button
              type="submit"
              className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center text-white"
              style={{ backgroundColor: '#b22204', borderRadius: '0 0.5rem 0.5rem 0' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>search</span>
            </button>
          </form>
        </div>
      </header>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/40"
          onClick={() => setIsMenuOpen(false)}
        >
          <nav
            className="absolute top-0 right-0 w-64 h-full bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b" style={{ borderColor: '#e3beb6' }}>
              <p className="font-semibold" style={{ color: '#b22204' }}>Menu</p>
            </div>
            {[
              { label: 'Flash Sales', href: '/san-pham' },
              { label: 'Mall', href: '/san-pham' },
              { label: 'Live', href: '/san-pham' },
              { label: 'Global Hub', href: '/san-pham' },
              { label: 'Giỏ Hàng', href: '/gio-hang' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center px-4 py-3 border-b hover:bg-gray-50 text-sm transition-colors"
                style={{ borderColor: '#f3f3f3', color: '#1a1c1c' }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
