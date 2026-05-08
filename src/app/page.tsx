import Link from 'next/link'
import MainLayout from '@/components/MainLayout'
import HomeBanner from '@/components/HomeBanner'
import ProductCard from '@/components/ProductCard'
import { categories, getFeaturedProducts, getNewProducts, products } from '@/lib/data'

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

export default function HomePage() {
  const featuredProducts = getFeaturedProducts()
  const newProducts = getNewProducts()
  const allProducts = products.slice(0, 12)

  return (
    <MainLayout>
      <main
        className="flex-1 w-full pb-6"
        style={{ maxWidth: '1200px', margin: '0 auto' }}
      >
        <div className="flex gap-3 mt-4 px-4 xl:px-0">
          {/* Desktop sidebar */}
          <aside
            className="hidden lg:flex flex-col py-6 gap-4 h-fit w-64 rounded-r-xl shadow-sm border-r flex-shrink-0"
            style={{
              backgroundColor: '#ffffff',
              borderColor: '#f3f3f3',
              boxShadow: '0px 2px 12px rgba(0,0,0,0.05)',
            }}
            aria-label="Danh mục"
          >
            <div className="px-4 pb-4 border-b" style={{ borderColor: '#e8e8e8' }}>
              <h2 className="font-semibold" style={{ fontSize: '24px', lineHeight: '1.3', color: '#b22204' }}>
                Categories
              </h2>
              <p style={{ fontSize: '12px', color: '#5b403b', marginTop: '4px' }}>Lọc theo phong cách</p>
            </div>
            <nav className="flex flex-col">
              {categories.map((cat, i) => (
                <Link
                  key={cat.id}
                  href={`/san-pham?danh-muc=${cat.slug}`}
                  className={`flex items-center gap-3 px-4 py-3 transition-all duration-300 ${i !== 0 ? 'hover:bg-[#e5e2e1]' : ''}`}
                  style={{
                    fontSize: '18px',
                    lineHeight: '1.4',
                    fontWeight: i === 0 ? 600 : 400,
                    color: i === 0 ? '#b22204' : '#5b403b',
                    backgroundColor: i === 0 ? '#ffdad3' : undefined,
                    borderRight: i === 0 ? '4px solid #b22204' : '4px solid transparent',
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: '20px', color: i === 0 ? '#b22204' : '#5f5e5e' }}
                  >
                    {categoryIcons[cat.slug] || 'apparel'}
                  </span>
                  {cat.name}
                </Link>
              ))}
            </nav>
          </aside>

          {/* Main content */}
          <div className="flex-1 flex flex-col gap-6 w-full min-w-0">
            {/* Banner */}
            <section aria-label="Banner khuyến mãi">
              <HomeBanner />
            </section>

            {/* Categories grid (mobile horizontal, desktop grid) */}
            <section
              className="w-full rounded-xl p-4 shadow-sm"
              style={{ backgroundColor: '#ffffff' }}
              aria-labelledby="categories-title"
            >
              <h2
                id="categories-title"
                className="font-semibold mb-3"
                style={{ fontSize: '24px', lineHeight: '1.3', color: '#1a1c1c' }}
              >
                Danh Mục
              </h2>
              <div className="flex md:grid md:grid-cols-8 gap-2 overflow-x-auto pb-2 snap-x hide-scrollbar">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/san-pham?danh-muc=${cat.slug}`}
                    className="snap-start flex flex-col items-center group"
                    style={{ minWidth: '80px' }}
                  >
                    <div
                      className="w-14 h-14 rounded-lg flex items-center justify-center transition-all group-hover:border-2"
                      style={{ backgroundColor: '#eeeeee' }}
                    >
                      <span
                        className="material-symbols-outlined transition-colors"
                        style={{ fontSize: '24px', color: '#5f5e5e' }}
                      >
                        {categoryIcons[cat.slug] || 'apparel'}
                      </span>
                    </div>
                    <span
                      className="mt-2 text-center leading-tight"
                      style={{ fontSize: '12px', color: '#1a1c1c' }}
                    >
                      {cat.name}
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            {/* Flash Sale */}
            <section
              className="w-full rounded-xl shadow-sm overflow-hidden"
              style={{ backgroundColor: '#ffffff' }}
              aria-labelledby="flash-sale-title"
            >
              <div
                className="flex justify-between items-center px-4 py-3 border-b"
                style={{ backgroundColor: '#eeeeee', borderColor: '#e8e8e8' }}
              >
                <div className="flex items-center gap-4">
                  <h2
                    id="flash-sale-title"
                    className="flex items-center gap-2 font-semibold"
                    style={{ fontSize: '18px', color: '#b22204' }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>bolt</span>
                    FLASH SALE
                  </h2>
                  <div className="flex gap-1 items-center font-bold text-white">
                    {['02', '45', '12'].map((n, i) => (
                      <span key={i} className="flex items-center">
                        <span className="px-2 py-1 rounded-sm text-white" style={{ backgroundColor: '#1a1c1c', fontSize: '20px', lineHeight: 1 }}>
                          {n}
                        </span>
                        {i < 2 && <span className="mx-0.5 font-bold" style={{ color: '#1a1c1c' }}>:</span>}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  href="/san-pham"
                  className="flex items-center transition-colors hover:opacity-70"
                  style={{ fontSize: '14px', color: '#5f5e5e' }}
                >
                  Xem tất cả
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chevron_right</span>
                </Link>
              </div>
              <div className="flex gap-3 p-4 overflow-x-auto snap-x pb-4 hide-scrollbar">
                {featuredProducts.slice(0, 6).map((product) => (
                  <div key={product.id} className="snap-start flex-shrink-0" style={{ minWidth: '160px', maxWidth: '180px', flex: '1' }}>
                    <Link
                      href={`/san-pham/${product.slug}`}
                      className="block rounded-lg border overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                      style={{ backgroundColor: '#ffffff', borderColor: '#e8e8e8' }}
                    >
                      <div className="relative w-full overflow-hidden rounded-t-lg" style={{ paddingTop: '100%' }}>
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div
                          className="absolute top-0 left-0 text-white px-1 py-0.5 rounded-br-sm"
                          style={{ backgroundColor: '#D0011B', fontSize: '11px', fontWeight: 600 }}
                        >
                          MALL
                        </div>
                        <div
                          className="absolute top-0 right-0 px-1 py-0.5 rounded-bl-sm"
                          style={{ backgroundColor: '#fceecf', color: '#b22204', fontSize: '11px', fontWeight: 600 }}
                        >
                          -{product.discount}%
                        </div>
                      </div>
                      <div className="p-2">
                        <h3 className="line-clamp-2 mb-1" style={{ fontSize: '14px', color: '#1a1c1c', lineHeight: '1.5' }}>
                          {product.name}
                        </h3>
                        <div className="font-bold" style={{ fontSize: '20px', lineHeight: 1, color: '#b22204', marginTop: '8px' }}>
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                        </div>
                        {/* Progress bar */}
                        <div className="w-full rounded-full h-2 mt-2 relative overflow-hidden" style={{ backgroundColor: '#e5e2e1' }}>
                          <div
                            className="h-2 rounded-full absolute left-0 top-0"
                            style={{ backgroundColor: '#b22204', width: `${Math.min(90, (product.soldCount / 200))}%` }}
                          />
                        </div>
                        <div className="text-center uppercase font-bold mt-1" style={{ fontSize: '10px', color: '#1a1c1c' }}>
                          Đã bán {product.soldCount >= 1000 ? `${(product.soldCount / 1000).toFixed(1)}k` : product.soldCount}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </section>

            {/* Today's suggestions */}
            <section className="w-full mt-2" aria-labelledby="discover-title">
              <div
                className="sticky z-40 bg-surface border-b mb-4 py-3"
                style={{ top: '64px', borderColor: '#e8e8e8' }}
              >
                <h2
                  id="discover-title"
                  className="text-center uppercase border-b-4 inline-block pb-2 w-full font-semibold"
                  style={{ fontSize: '24px', color: '#b22204', borderColor: '#b22204' }}
                >
                  Gợi ý hôm nay
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {allProducts.map((product) => (
                  <ProductCard key={product.id} product={product} showMall={product.isBestseller} />
                ))}
              </div>
              <div className="flex justify-center mt-6">
                <Link
                  href="/san-pham"
                  className="border font-semibold px-16 py-3 rounded transition-colors hover:opacity-80"
                  style={{
                    backgroundColor: '#ffffff',
                    borderColor: '#b22204',
                    color: '#b22204',
                    fontSize: '18px',
                    lineHeight: '1.4',
                  }}
                >
                  Xem Thêm
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
    </MainLayout>
  )
}
