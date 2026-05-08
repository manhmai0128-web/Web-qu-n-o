import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/gio-hang', '/tai-khoan', '/dang-ky', '/api/'],
      },
    ],
    sitemap: 'https://shopfashion.vn/sitemap.xml',
    host: 'https://shopfashion.vn',
  }
}
