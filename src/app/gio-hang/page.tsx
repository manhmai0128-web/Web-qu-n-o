import type { Metadata } from 'next'
import MainLayout from '@/components/MainLayout'
import CartClient from './CartClient'

export const metadata: Metadata = {
  title: 'Giỏ Hàng',
  description: 'Xem và quản lý giỏ hàng của bạn tại ShopFashion.',
  robots: { index: false, follow: false },
}

export default function CartPage() {
  return (
    <MainLayout>
      <CartClient />
    </MainLayout>
  )
}
