import Link from 'next/link'

export default function Footer() {
  return (
    <footer
      className="w-full rounded-t-lg mt-auto"
      style={{ backgroundColor: '#e8e8e8', color: '#1a1c1c' }}
    >
      <div className="mx-auto px-4 py-6" style={{ maxWidth: '1200px' }}>
        {/* Links */}
        <div className="flex flex-wrap justify-center gap-4 mb-4" style={{ fontSize: '12px', color: '#5f5e5e' }}>
          {[
            'Về Chúng Tôi',
            'Điều Khoản Dịch Vụ',
            'Chính Sách Bảo Mật',
            'Trung Tâm Hỗ Trợ',
            'Vận Chuyển & Giao Hàng',
            'Liên Hệ',
          ].map((item) => (
            <Link
              key={item}
              href="#"
              className="underline transition-colors hover:opacity-70"
              style={{ color: '#5f5e5e' }}
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Brand */}
        <div
          className="text-center font-semibold mb-2"
          style={{ fontSize: '18px', color: '#1a1c1c' }}
        >
          SwiftShop
        </div>

        {/* Copyright */}
        <div className="text-center" style={{ fontSize: '12px', color: '#5f5e5e' }}>
          © 2024 SwiftShop Clothing. Tất cả quyền được bảo lưu.
        </div>
      </div>
    </footer>
  )
}
