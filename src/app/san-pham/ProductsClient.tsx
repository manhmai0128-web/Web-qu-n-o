'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import Link from 'next/link'
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
  { value: 'price-asc', label: 'Giá thấp' },
  { value: 'price-desc', label: 'Giá cao' },
]

const categoryIcons: Record<string, string> = {
  'ao-thun': 'apparel',
  'quan-jean': 'styler',
  'vay-dam': 'dry_cleaning',
  'ao-khoac': 'woman',
  'giay-dep': 'footwear',
  'phu-kien': 'shopping_bag',
  'do-the-thao': 'fitness_center',
  'do-lot': 'checkroom',
}

export default function ProductsClient({ products, categories, activeCategory, searchQuery, sortValue }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)

  const updateSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', value)
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="mx-auto px-4 py-4" style={{ maxWidth: '1200px' }}>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 mb-4 flex-wrap" style={{ fontSize: '14px', color: '#5f5e5e' }}>
        <Link href="/" className="hover:opacity-70 transition-colors" style={{ color: '#5f5e5e' }}>Trang chủ</Link>
        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>chevron_right</span>
        <Link href="/san-pham" className="hover:opacity-70" style={{ color: '#5f5e5e' }}>Sản phẩm</Link>
        {activeCategory && (
          <>
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>chevron_right</span>
            <span style={{ color: '#1a1c1c' }}>{activeCategory.name}</span>
          </>
        )}
        {searchQuery && (
          <>
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>chevron_right</span>
            <span style={{ color: '#1a1c1c' }}>"{searchQuery}"</span>
          </>
        )}
      </nav>

      <div className="flex gap-4">
        {/* Sidebar */}
        <aside
          className={`${showFilters ? 'block' : 'hidden'} lg:flex flex-col py-6 gap-4 h-fit w-64 rounded-r-xl shadow-sm border-r flex-shrink-0`}
          style={{ backgroundColor: '#ffffff', borderColor: '#f3f3f3' }}
          aria-label="Bộ lọc"
        >
          <div className="px-4 pb-4 border-b" style={{ borderColor: '#e8e8e8' }}>
            <h2 className="font-semibold" style={{ fontSize: '24px', color: '#b22204' }}>Categories</h2>
            <p style={{ fontSize: '12px', color: '#5b403b', marginTop: '4px' }}>Lọc theo phong cách</p>
          </div>

          <nav className="flex flex-col">
            <Link
              href="/san-pham"
              className="flex items-center gap-3 px-4 py-3 transition-all duration-300"
              style={{
                fontSize: '18px',
                color: !activeCategory ? '#b22204' : '#5b403b',
                backgroundColor: !activeCategory ? '#ffdad3' : 'transparent',
                borderRight: !activeCategory ? '4px solid #b22204' : '4px solid transparent',
                fontWeight: !activeCategory ? 600 : 400,
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>apps</span>
              Tất Cả
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/san-pham?danh-muc=${cat.slug}`}
                className="flex items-center gap-3 px-4 py-3 transition-all duration-300"
                style={{
                  fontSize: '18px',
                  color: activeCategory?.slug === cat.slug ? '#b22204' : '#5b403b',
                  backgroundColor: activeCategory?.slug === cat.slug ? '#ffdad3' : 'transparent',
                  borderRight: activeCategory?.slug === cat.slug ? '4px solid #b22204' : '4px solid transparent',
                  fontWeight: activeCategory?.slug === cat.slug ? 600 : 400,
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                  {categoryIcons[cat.slug] || 'apparel'}
                </span>
                {cat.name}
              </Link>
            ))}
          </nav>

          {/* Price filter */}
          <div className="px-4 pt-2 border-t" style={{ borderColor: '#e8e8e8' }}>
            <h3 className="font-semibold mb-3" style={{ fontSize: '18px', color: '#b22204' }}>Khoảng Giá</h3>
            <div className="space-y-2">
              {['Dưới 100.000đ', '100k - 300k', '300k - 500k', 'Trên 500.000đ'].map((r) => (
                <label key={r} className="flex items-center gap-2 cursor-pointer" style={{ fontSize: '14px', color: '#5b403b' }}>
                  <input type="checkbox" className="rounded" style={{ accentColor: '#b22204' }} />
                  {r}
                </label>
              ))}
            </div>
          </div>

          {/* Rating filter */}
          <div className="px-4 pt-2 border-t" style={{ borderColor: '#e8e8e8' }}>
            <h3 className="font-semibold mb-3" style={{ fontSize: '18px', color: '#b22204' }}>Đánh Giá</h3>
            <div className="space-y-2">
              {[5, 4, 3].map((star) => (
                <label key={star} className="flex items-center gap-2 cursor-pointer" style={{ fontSize: '14px', color: '#5b403b' }}>
                  <input type="checkbox" style={{ accentColor: '#b22204' }} />
                  <span style={{ color: '#ffba3f' }}>{'★'.repeat(star)}{'☆'.repeat(5 - star)}</span>
                  trở lên
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div
            className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded shadow-sm mb-4"
            style={{ backgroundColor: '#ffffff', boxShadow: '0px 2px 12px rgba(0,0,0,0.05)' }}
          >
            <div className="flex items-center gap-2">
              <button
                className="lg:hidden flex items-center gap-1 border rounded px-3 py-1.5 transition-colors hover:opacity-80"
                style={{ fontSize: '14px', borderColor: '#e3beb6', color: '#1a1c1c' }}
                onClick={() => setShowFilters(!showFilters)}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>tune</span>
                Bộ lọc
              </button>
              <span style={{ fontSize: '14px', color: '#5f5e5e' }}>
                {searchQuery
                  ? `${products.length} kết quả cho "${searchQuery}"`
                  : `${products.length} sản phẩm${activeCategory ? ` · ${activeCategory.name}` : ''}`}
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="hidden sm:block" style={{ fontSize: '14px', color: '#5f5e5e' }}>Sắp xếp:</span>
              {SORTS.map((s) => (
                <button
                  key={s.value}
                  onClick={() => updateSort(s.value)}
                  className="px-3 py-1.5 rounded border transition-colors active:scale-95"
                  style={{
                    fontSize: '14px',
                    backgroundColor: sortValue === s.value ? '#b22204' : '#ffffff',
                    color: sortValue === s.value ? '#ffffff' : '#5f5e5e',
                    borderColor: sortValue === s.value ? '#b22204' : '#e3beb6',
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          {products.length === 0 ? (
            <div className="rounded-lg p-12 text-center" style={{ backgroundColor: '#ffffff' }}>
              <span className="material-symbols-outlined block mx-auto mb-4" style={{ fontSize: '64px', color: '#eeeeee' }}>search_off</span>
              <p className="font-semibold mb-2" style={{ fontSize: '18px', color: '#5f5e5e' }}>Không tìm thấy sản phẩm</p>
              <p className="mb-4" style={{ fontSize: '14px', color: '#5b403b' }}>Thử tìm kiếm với từ khóa khác</p>
              <Link
                href="/san-pham"
                className="inline-block text-white px-6 py-2 rounded transition-colors"
                style={{ backgroundColor: '#b22204', fontSize: '14px' }}
              >
                Xem tất cả sản phẩm
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} showMall={product.isBestseller} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
