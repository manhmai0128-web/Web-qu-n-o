import Link from 'next/link'
import { ShieldCheck, Truck, RotateCcw, Headphones } from 'lucide-react'
import MainLayout from '@/components/MainLayout'
import HomeBanner from '@/components/HomeBanner'
import ProductCard from '@/components/ProductCard'
import { categories, getFeaturedProducts, getNewProducts } from '@/lib/data'

export default function HomePage() {
  const featuredProducts = getFeaturedProducts()
  const newProducts = getNewProducts()

  return (
    <MainLayout>
      {/* Trust badges */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Truck size={20} className="text-red-500" />, text: 'Giao Hàng Nhanh', sub: 'Toàn quốc 2-5 ngày' },
              { icon: <ShieldCheck size={20} className="text-red-500" />, text: 'Hàng Chính Hãng', sub: '100% authentic' },
              { icon: <RotateCcw size={20} className="text-red-500" />, text: 'Đổi Trả Dễ Dàng', sub: '30 ngày miễn phí' },
              { icon: <Headphones size={20} className="text-red-500" />, text: 'Hỗ Trợ 24/7', sub: 'Luôn sẵn sàng giúp' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2">
                {item.icon}
                <div>
                  <p className="text-xs font-semibold text-gray-800">{item.text}</p>
                  <p className="text-xs text-gray-500">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4 space-y-6">
        {/* Banner */}
        <section aria-label="Khuyến mãi nổi bật">
          <HomeBanner />
        </section>

        {/* Categories */}
        <section aria-labelledby="categories-title">
          <div className="bg-white rounded-sm p-4">
            <h2 id="categories-title" className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span style={{ color: '#ee4d2d' }}>●</span> DANH MỤC SẢN PHẨM
            </h2>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/san-pham?danh-muc=${cat.slug}`}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-red-50 transition-colors group"
                >
                  <span className="text-3xl group-hover:scale-110 transition-transform" aria-hidden="true">
                    {cat.icon}
                  </span>
                  <span className="text-xs text-center text-gray-700 group-hover:text-red-500 leading-tight">
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Flash Sale */}
        <section aria-labelledby="flash-sale-title">
          <div className="bg-white rounded-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 id="flash-sale-title" className="text-lg font-bold flex items-center gap-2">
                <span className="text-red-500">⚡</span>
                <span style={{ color: '#ee4d2d' }}>FLASH SALE</span>
                <FlashSaleTimer />
              </h2>
              <Link
                href="/san-pham"
                className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1"
              >
                Xem tất cả →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {featuredProducts.slice(0, 6).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Promo banner row */}
        <section aria-label="Banner khuyến mãi" className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { text: 'Free Ship Đơn Từ 150K', sub: 'Áp dụng toàn quốc', bg: 'from-blue-500 to-blue-600', emoji: '🚚' },
            { text: 'Voucher Giảm 50K', sub: 'Cho đơn hàng đầu tiên', bg: 'from-green-500 to-emerald-600', emoji: '🎁' },
            { text: 'Tích Điểm Đổi Quà', sub: 'Mỗi đơn tích 1% giá trị', bg: 'from-purple-500 to-violet-600', emoji: '⭐' },
          ].map((promo) => (
            <div
              key={promo.text}
              className={`bg-gradient-to-r ${promo.bg} rounded-sm p-4 text-white flex items-center gap-3`}
            >
              <span className="text-3xl" aria-hidden="true">{promo.emoji}</span>
              <div>
                <p className="font-bold">{promo.text}</p>
                <p className="text-sm opacity-90">{promo.sub}</p>
              </div>
            </div>
          ))}
        </section>

        {/* New Arrivals */}
        <section aria-labelledby="new-arrivals-title">
          <div className="bg-white rounded-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 id="new-arrivals-title" className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <span style={{ color: '#ee4d2d' }}>●</span> HÀNG MỚI VỀ
              </h2>
              <Link href="/san-pham" className="text-sm text-red-500 hover:text-red-600">
                Xem tất cả →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {newProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* All Products */}
        <section aria-labelledby="all-products-title">
          <div className="bg-white rounded-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 id="all-products-title" className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <span style={{ color: '#ee4d2d' }}>●</span> GỢI Ý HÔM NAY
              </h2>
              <Link href="/san-pham" className="text-sm text-red-500 hover:text-red-600">
                Xem tất cả →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-6">
              <Link
                href="/san-pham"
                className="inline-block border border-red-400 text-red-500 hover:bg-red-50 px-8 py-2 rounded transition-colors text-sm"
              >
                Xem Thêm
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}

function FlashSaleTimer() {
  return (
    <div className="flex items-center gap-1 ml-2">
      {['02', '45', '30'].map((num, i) => (
        <span key={i} className="flex items-center">
          <span className="bg-gray-900 text-white text-sm font-bold px-1.5 py-0.5 rounded">
            {num}
          </span>
          {i < 2 && <span className="text-gray-800 font-bold mx-0.5">:</span>}
        </span>
      ))}
    </div>
  )
}
