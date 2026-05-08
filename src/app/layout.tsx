import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://shopfashion.vn'),
  title: {
    default: 'SwiftShop - Mua Sắm Thời Trang Online Giá Tốt',
    template: '%s | SwiftShop',
  },
  description:
    'SwiftShop - Nền tảng mua sắm thời trang trực tuyến hàng đầu Việt Nam. Hàng ngàn sản phẩm quần áo, giày dép, phụ kiện chính hãng, giao hàng nhanh, giá tốt nhất.',
  keywords: ['mua quần áo online', 'thời trang nữ', 'thời trang nam', 'quần áo giá rẻ', 'swiftshop', 'mua sắm online'],
  authors: [{ name: 'SwiftShop' }],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://shopfashion.vn',
    siteName: 'SwiftShop',
    title: 'SwiftShop - Mua Sắm Thời Trang Online Giá Tốt',
    description: 'Nền tảng mua sắm thời trang trực tuyến hàng đầu Việt Nam với hàng ngàn sản phẩm chính hãng.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'SwiftShop' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SwiftShop - Mua Sắm Thời Trang Online',
    description: 'Nền tảng mua sắm thời trang trực tuyến hàng đầu Việt Nam.',
    images: ['/og-image.jpg'],
  },
  alternates: { canonical: 'https://shopfashion.vn' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
