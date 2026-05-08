'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ShoppingCart, Search, Menu, X, User, Heart, ChevronDown } from 'lucide-react'
import { useCartStore } from '@/lib/cart-store'
import { categories } from '@/lib/data'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const totalItems = useCartStore((s) => s.totalItems)()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/san-pham?q=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow ${isScrolled ? 'shadow-md' : ''}`}
      style={{ backgroundColor: '#ee4d2d' }}
    >
      {/* Top bar */}
      <div className="hidden md:block text-white text-xs py-1 border-b border-red-600">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-4">
            <Link href="#" className="hover:opacity-80">Kênh Người Bán</Link>
            <Link href="#" className="hover:opacity-80">Tải Ứng Dụng</Link>
            <Link href="#" className="hover:opacity-80">Kết Nối</Link>
          </div>
          <div className="flex gap-4 items-center">
            <Link href="#" className="hover:opacity-80 flex items-center gap-1">
              <Bell size={14} /> Thông Báo
            </Link>
            <Link href="#" className="hover:opacity-80 flex items-center gap-1">
              <HelpCircle size={14} /> Hỗ Trợ
            </Link>
            <Link href="#" className="hover:opacity-80 flex items-center gap-1">
              🌐 Tiếng Việt <ChevronDown size={12} />
            </Link>
            <Link href="/tai-khoan" className="hover:opacity-80 flex items-center gap-1">
              <User size={14} /> Đăng Nhập
            </Link>
            <Link href="/dang-ky" className="hover:opacity-80">Đăng Ký</Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="text-white font-bold text-2xl tracking-tight">
              Shop<span className="text-yellow-300">Fashion</span>
            </div>
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex-1 flex">
            <div className="flex w-full max-w-2xl">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm sản phẩm, thương hiệu..."
                className="flex-1 px-4 py-2.5 text-sm text-gray-800 bg-white rounded-l-sm outline-none"
                aria-label="Tìm kiếm sản phẩm"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-orange-400 hover:bg-orange-500 text-white rounded-r-sm transition-colors"
                aria-label="Tìm kiếm"
              >
                <Search size={18} />
              </button>
            </div>
          </form>

          {/* Icons */}
          <div className="flex items-center gap-4 text-white flex-shrink-0">
            <Link href="/yeu-thich" className="hidden md:flex flex-col items-center hover:opacity-80" aria-label="Yêu thích">
              <Heart size={22} />
              <span className="text-xs mt-0.5">Yêu Thích</span>
            </Link>
            <Link href="/gio-hang" className="flex flex-col items-center hover:opacity-80 relative" aria-label={`Giỏ hàng (${totalItems} sản phẩm)`}>
              <div className="relative">
                <ShoppingCart size={22} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-300 text-red-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </div>
              <span className="text-xs mt-0.5 hidden md:block">Giỏ Hàng</span>
            </Link>
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Category nav */}
      <nav className="hidden md:block bg-red-600" aria-label="Danh mục sản phẩm">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex gap-1 overflow-x-auto scrollbar-hide">
            <li>
              <Link
                href="/san-pham"
                className="block px-3 py-2 text-white text-sm hover:bg-red-700 whitespace-nowrap rounded"
              >
                Tất Cả
              </Link>
            </li>
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/san-pham?danh-muc=${cat.slug}`}
                  className="flex items-center gap-1 px-3 py-2 text-white text-sm hover:bg-red-700 whitespace-nowrap rounded"
                >
                  <span aria-hidden="true">{cat.icon}</span> {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white text-gray-800 shadow-lg">
          <div className="px-4 py-2 border-b">
            <div className="flex gap-4 text-sm">
              <Link href="/tai-khoan" className="py-2">Đăng Nhập</Link>
              <Link href="/dang-ky" className="py-2">Đăng Ký</Link>
            </div>
          </div>
          <nav>
            <ul>
              <li>
                <Link
                  href="/san-pham"
                  className="block px-4 py-3 border-b hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tất Cả Sản Phẩm
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/san-pham?danh-muc=${cat.slug}`}
                    className="flex items-center gap-2 px-4 py-3 border-b hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>{cat.icon}</span> {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}

function Bell({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}

function HelpCircle({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
}
