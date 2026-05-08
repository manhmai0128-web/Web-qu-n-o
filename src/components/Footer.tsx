import Link from 'next/link'
import { categories } from '@/lib/data'

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-10">
      {/* App download banner */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-gray-800">Tải Ứng Dụng ShopFashion</p>
            <p className="text-sm text-gray-500">Nhận ưu đãi đặc biệt khi mua sắm qua ứng dụng</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition-colors">
              <span>🍎</span> App Store
            </button>
            <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition-colors">
              <span>🤖</span> Google Play
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <div className="text-2xl font-bold" style={{ color: '#ee4d2d' }}>
                Shop<span className="text-gray-800">Fashion</span>
              </div>
            </Link>
            <p className="text-sm text-gray-500 mb-4">
              Nền tảng mua sắm thời trang trực tuyến hàng đầu Việt Nam.
            </p>
            <div className="flex gap-3">
              {['Facebook', 'Instagram', 'TikTok', 'Youtube'].map((social) => (
                <Link
                  key={social}
                  href="#"
                  aria-label={social}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-red-100 transition-colors text-xs font-bold text-gray-600"
                >
                  {social[0]}
                </Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Danh Mục</h3>
            <ul className="space-y-2">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/san-pham?danh-muc=${cat.slug}`}
                    className="text-sm text-gray-500 hover:text-red-500 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Chăm Sóc Khách Hàng</h3>
            <ul className="space-y-2">
              {[
                'Trung Tâm Trợ Giúp',
                'Hướng Dẫn Mua Hàng',
                'Hướng Dẫn Bán Hàng',
                'Thanh Toán',
                'Vận Chuyển & Giao Hàng',
                'Trả Hàng & Hoàn Tiền',
              ].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-gray-500 hover:text-red-500 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Về ShopFashion</h3>
            <ul className="space-y-2">
              {[
                'Về Chúng Tôi',
                'Tuyển Dụng',
                'Chính Sách Bảo Mật',
                'Điều Khoản',
                'Liên Hệ',
                'Blog Thời Trang',
              ].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-gray-500 hover:text-red-500 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment & Shipping */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Thanh Toán</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {['VISA', 'MasterCard', 'VNPay', 'MoMo', 'ZaloPay', 'COD'].map((method) => (
                <span
                  key={method}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded border"
                >
                  {method}
                </span>
              ))}
            </div>
            <h3 className="font-semibold text-gray-800 mb-3">Vận Chuyển</h3>
            <div className="flex flex-wrap gap-2">
              {['GHN', 'GHTK', 'J&T', 'Viettel Post'].map((ship) => (
                <span
                  key={ship}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded border"
                >
                  {ship}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-gray-400">
          <p>© 2024 ShopFashion. Tất cả quyền được bảo lưu.</p>
          <p>
            CÔNG TY TNHH SHOPFASHION VIỆT NAM | MST: 0314546584 | Địa chỉ: 123 Lê Lợi, Q.1, TP.HCM
          </p>
        </div>
      </div>
    </footer>
  )
}
