'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const banners = [
  {
    id: 1,
    title: 'Sale Mùa Hè Lớn Nhất Năm',
    subtitle: 'Giảm đến 70% toàn bộ sản phẩm',
    cta: 'Mua Ngay',
    href: '/san-pham',
    bg: 'from-red-500 to-orange-400',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=400&fit=crop',
  },
  {
    id: 2,
    title: 'Bộ Sưu Tập Hè 2024',
    subtitle: 'Phong cách trẻ trung, năng động',
    cta: 'Khám Phá',
    href: '/san-pham?danh-muc=vay-dam',
    bg: 'from-pink-500 to-rose-400',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&h=400&fit=crop',
  },
  {
    id: 3,
    title: 'Thời Trang Công Sở',
    subtitle: 'Chuyên nghiệp - Thanh lịch - Hiện đại',
    cta: 'Xem Ngay',
    href: '/san-pham?danh-muc=ao-thun',
    bg: 'from-blue-600 to-indigo-500',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=400&fit=crop',
  },
]

export default function HomeBanner() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const prev = () => setCurrent((c) => (c - 1 + banners.length) % banners.length)
  const next = () => setCurrent((c) => (c + 1) % banners.length)

  return (
    <div className="relative overflow-hidden rounded-sm" style={{ aspectRatio: '16/5' }}>
      {banners.map((banner, i) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <Image
            src={banner.image}
            alt={banner.title}
            fill
            priority={i === 0}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1200px"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${banner.bg} opacity-60`} />
          <div className="absolute inset-0 flex items-center px-8 md:px-16">
            <div className="text-white">
              <h2 className="text-xl md:text-4xl font-bold mb-2 drop-shadow">{banner.title}</h2>
              <p className="text-sm md:text-lg mb-4 opacity-90 drop-shadow">{banner.subtitle}</p>
              <Link
                href={banner.href}
                className="inline-block bg-white text-red-500 font-semibold px-6 py-2 rounded hover:bg-red-50 transition-colors text-sm md:text-base"
              >
                {banner.cta}
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Controls */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-1 transition-colors"
        aria-label="Banner trước"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-1 transition-colors"
        aria-label="Banner tiếp theo"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all ${i === current ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/60'}`}
            aria-label={`Banner ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
