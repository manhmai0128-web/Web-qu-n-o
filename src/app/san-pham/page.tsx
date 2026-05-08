import type { Metadata } from 'next'
import MainLayout from '@/components/MainLayout'
import ProductsClient from './ProductsClient'
import { categories, products } from '@/lib/data'

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams
  const categorySlug = typeof params['danh-muc'] === 'string' ? params['danh-muc'] : undefined
  const query = typeof params.q === 'string' ? params.q : undefined

  const category = categories.find((c) => c.slug === categorySlug)
  const title = category
    ? `${category.name} - Mua ${category.name} Online`
    : query
    ? `Kết quả tìm kiếm: "${query}"`
    : 'Tất Cả Sản Phẩm - Thời Trang Online'

  return {
    title,
    description: `Mua sắm ${category?.name ?? 'quần áo, thời trang'} online giá tốt nhất tại ShopFashion. Giao hàng nhanh, đổi trả dễ dàng.`,
    openGraph: { title, type: 'website' },
    alternates: {
      canonical: categorySlug
        ? `https://shopfashion.vn/san-pham?danh-muc=${categorySlug}`
        : 'https://shopfashion.vn/san-pham',
    },
  }
}

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams
  const categorySlug = typeof params['danh-muc'] === 'string' ? params['danh-muc'] : ''
  const query = typeof params.q === 'string' ? params.q : ''
  const sort = typeof params.sort === 'string' ? params.sort : 'popular'

  let filtered = [...products]
  if (categorySlug) {
    filtered = filtered.filter((p) => p.categorySlug === categorySlug)
  }
  if (query) {
    const q = query.toLowerCase()
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q))
    )
  }

  switch (sort) {
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price)
      break
    case 'newest':
      filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
      break
    default:
      filtered.sort((a, b) => b.soldCount - a.soldCount)
  }

  const activeCategory = categories.find((c) => c.slug === categorySlug)

  return (
    <MainLayout>
      <ProductsClient
        products={filtered}
        categories={categories}
        activeCategory={activeCategory}
        searchQuery={query}
        sortValue={sort}
      />
    </MainLayout>
  )
}
