import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import MainLayout from '@/components/MainLayout'
import ProductDetailClient from './ProductDetailClient'
import { getProductBySlug, products, formatPrice } from '@/lib/data'
import ProductCard from '@/components/ProductCard'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return { title: 'Sản phẩm không tồn tại' }

  const title = `${product.name} - Giá chỉ ${formatPrice(product.price)}`
  const description = `Mua ${product.name} chính hãng tại ShopFashion. Giá ${formatPrice(product.price)}, giảm ${product.discount}%. ${product.description.slice(0, 120)}`

  return {
    title,
    description,
    keywords: product.tags,
    openGraph: {
      title,
      description,
      type: 'website',
      images: product.images.map((img) => ({
        url: img,
        width: 400,
        height: 400,
        alt: product.name,
      })),
    },
    twitter: { card: 'summary_large_image', title, description, images: [product.images[0]] },
    alternates: {
      canonical: `https://shopfashion.vn/san-pham/${product.slug}`,
    },
    other: {
      'product:price:amount': String(product.price),
      'product:price:currency': 'VND',
    },
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const related = products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 6)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    brand: { '@type': 'Brand', name: product.brand },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'VND',
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `https://shopfashion.vn/san-pham/${product.slug}`,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  }

  return (
    <MainLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient product={product} />

      {/* Related products */}
      {related.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 pb-8">
          <div className="bg-white rounded-sm p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span style={{ color: '#ee4d2d' }}>●</span> SẢN PHẨM TƯƠNG TỰ
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  )
}
