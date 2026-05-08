'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import Link from 'next/link'
import { SlidersHorizontal, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import ProductCard from '@/components/ProductCard'
import { Category, Product } from '@/lib/types'

interface Props {
  products: Product[]
  categories: Category[]
  activeCategory?: Category
  searchQuery: string
  sortValue: string
}

const SORTS = [
  { value: 'popular', label: 'Phổ biến' },
  { value: 'newest', label: 'Mới nhất' },
  { value: 'price-asc', label: 'Giá thấp → cao' },
  { value: 'price-desc', label: 'Giá cao → thấp' },
]

export default function ProductsClient({
  products,
  categories,
  activeCategory,
  searchQuery,
  sortValue,
}: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set(key, value)
    else params.delete(key)
    if (key !== 'sort') params.delete('sort')
    router.push(`${pathname}?${params.toString()}`)
  }

  const updateSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', value)
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-red-500">Trang chủ</Link>
        <span>/</span>
        <Link href="/san-pham" className="hover:text-red-500">Sản phẩm</Link>
        {activeCategory && (
          <>
            <span>/</span>
            <span className="text-gray-800">{activeCategory.name}</span>
          </>
        )}
        {searchQuery && (
          <>
            <span>/</span>
            <span className="text-gray-800">Tìm: "{searchQuery}"</span>
          </>
        )}
      </nav>

      <div className="flex gap-4">
        {/* Sidebar filters */}
        <aside
          className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-56 flex-shrink-0`}
          aria-label="Bộ lọc sản phẩm"
        >
          <div className="bg-white rounded-sm p-4 sticky top-24">
            <h2 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <SlidersHorizontal size={16} /> Bộ Lọc
            </h2>

            {/* Category filter */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Danh Mục</h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/san-pham"
                    className={`block text-sm py-1 px-2 rounded hover:text-red-500 ${!activeCategory ? 'text-red-500 font-medium bg-red-50' : 'text-gray-600'}`}
                  >
                    Tất Cả
                  </Link>
                </li>
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/san-pham?danh-muc=${cat.slug}`}
                      className={`block text-sm py-1 px-2 rounded hover:text-red-500 ${activeCategory?.slug === cat.slug ? 'text-red-500 font-medium bg-red-50' : 'text-gray-600'}`}
                    >
                      {cat.icon} {cat.name}
                      <span className="text-gray-400 text-xs ml-1">({cat.productCount.toLocaleString()})</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price filter */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Khoảng Giá</h3>
              <div className="space-y-1">
                {[
                  { label: 'Dưới 100.000đ', value: '0-100000' },
                  { label: '100.000đ - 300.000đ', value: '100000-300000' },
                  { label: '300.000đ - 500.000đ', value: '300000-500000' },
                  { label: 'Trên 500.000đ', value: '500000-999999999' },
                ].map((range) => (
                  <label key={range.value} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-red-500 py-0.5">
                    <input type="checkbox" className="accent-red-500" />
                    {range.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Rating filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Đánh Giá</h3>
              <div className="space-y-1">
                {[5, 4, 3].map((star) => (
                  <label key={star} className="flex items-center gap-2 text-sm cursor-pointer hover:text-red-500 py-0.5">
                    <input type="checkbox" className="accent-red-500" />
                    <span className="text-yellow-400">{'★'.repeat(star)}{'☆'.repeat(5 - star)}</span>
                    <span className="text-gray-500">trở lên</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="bg-white rounded-sm px-4 py-3 flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <button
                className="md:hidden flex items-center gap-1 text-sm border rounded px-3 py-1.5 hover:bg-gray-50"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal size={14} /> Bộ lọc
              </button>
              <span className="text-sm text-gray-500">
                {searchQuery
                  ? `${products.length} kết quả cho "${searchQuery}"`
                  : `${products.length} sản phẩm${activeCategory ? ` trong ${activeCategory.name}` : ''}`}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 hidden sm:block">Sắp xếp theo:</span>
              <div className="flex gap-1 flex-wrap">
                {SORTS.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => updateSort(s.value)}
                    className={`text-xs px-3 py-1.5 rounded border transition-colors ${sortValue === s.value ? 'bg-red-500 text-white border-red-500' : 'text-gray-600 border-gray-200 hover:border-red-400 hover:text-red-500'}`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products grid */}
          {products.length === 0 ? (
            <div className="bg-white rounded-sm p-12 text-center">
              <p className="text-4xl mb-4">🔍</p>
              <p className="text-gray-500 text-lg mb-2">Không tìm thấy sản phẩm</p>
              <p className="text-gray-400 text-sm mb-4">Thử tìm kiếm với từ khóa khác</p>
              <Link
                href="/san-pham"
                className="inline-block bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors"
              >
                Xem tất cả sản phẩm
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
