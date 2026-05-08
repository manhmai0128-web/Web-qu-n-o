import type { MetadataRoute } from 'next'
import { products, categories } from '@/lib/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://shopfashion.vn'
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${base}/san-pham`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/gio-hang`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
  ]

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${base}/san-pham?danh-muc=${cat.slug}`,
    lastModified: now,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/san-pham/${p.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
    images: p.images,
  }))

  return [...staticRoutes, ...categoryRoutes, ...productRoutes]
}
