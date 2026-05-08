import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://shopfashion.vn'),
  title: {
    default: 'ShopFashion - Mua Sắm Thời Trang Online Giá Tốt',
    template: '%s | ShopFashion',
  },
  description:
    'ShopFashion - Nền tảng mua sắm thời trang trực tuyến hàng đầu Việt Nam. Hàng ngàn sản phẩm quần áo, giày dép, phụ kiện chính hãng, giao hàng nhanh, giá tốt nhất.',
  keywords: [
    'mua quần áo online',
    'thời trang nữ',
    'thời trang nam',
    'quần áo giá rẻ',
    'shopfashion',
    'mua sắm online',
    'thời trang việt nam',
  ],
  authors: [{ name: 'ShopFashion' }],
  creator: 'ShopFashion',
  publisher: 'ShopFashion',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://shopfashion.vn',
    siteName: 'ShopFashion',
    title: 'ShopFashion - Mua Sắm Thời Trang Online Giá Tốt',
    description:
      'Nền tảng mua sắm thời trang trực tuyến hàng đầu Việt Nam với hàng ngàn sản phẩm chính hãng.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'ShopFashion' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ShopFashion - Mua Sắm Thời Trang Online',
    description: 'Nền tảng mua sắm thời trang trực tuyến hàng đầu Việt Nam.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://shopfashion.vn',
    languages: { 'vi-VN': 'https://shopfashion.vn' },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
