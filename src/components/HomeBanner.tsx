'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const banners = [
  {
    id: 1,
    title: 'Summer Collection Sale',
    subtitle: 'Up to 50% Off Top Brands',
    cta: 'Shop Now',
    href: '/san-pham',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=400&fit=crop',
  },
  {
    id: 2,
    title: 'Bộ Sưu Tập Hè 2024',
    subtitle: 'Phong cách trẻ trung, năng động',
    cta: 'Khám Phá',
    href: '/san-pham?danh-muc=vay-dam',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&h=400&fit=crop',
  },
  {
    id: 3,
    title: 'Flash Sale Cuối Tuần',
    subtitle: 'Giảm sốc đến 70% — Số lượng có hạn',
    cta: 'Mua Ngay',
    href: '/san-pham',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=400&fit=crop',
  },
]

export default function HomeBanner() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % banners.length), 4500)
    return () => clearInterval(timer)
  }, [])

  const banner = banners[current]

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl shadow-sm"
      style={{ height: 'clamp(160px, 30vw, 400px)' }}
    >
      {banners.map((b, i) => (
        <div
          key={b.id}
          className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <Image
            src={b.image}
            alt={b.title}
            fill
            priority={i === 0}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
            <h2 className="text-white font-bold mb-2 drop-shadow" style={{ fontSize: 'clamp(20px, 4vw, 32px)', lineHeight: '1.2', letterSpacing: '-0.02em' }}>
              {b.title}
            </h2>
            <p className="text-white mb-4 opacity-90 drop-shadow" style={{ fontSize: 'clamp(14px, 2vw, 24px)', lineHeight: '1.3' }}>
              {b.subtitle}
            </p>
            <Link
              href={b.href}
              className="text-white font-semibold px-6 py-2 rounded transition-colors w-max active:scale-95"
              style={{ backgroundColor: '#b22204', fontSize: '18px', lineHeight: '1.4' }}
            >
              {b.cta}
            </Link>
          </div>
        </div>
      ))}

      {/* Controls */}
      <button
        onClick={() => setCurrent((c) => (c - 1 + banners.length) % banners.length)}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-1 transition-colors"
        aria-label="Banner trước"
      >
        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>chevron_left</span>
      </button>
      <button
        onClick={() => setCurrent((c) => (c + 1) % banners.length)}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-1 transition-colors"
        aria-label="Banner tiếp theo"
      >
        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>chevron_right</span>
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="rounded-full transition-all"
            style={{ width: i === current ? '24px' : '8px', height: '8px', backgroundColor: i === current ? 'white' : 'rgba(255,255,255,0.6)' }}
            aria-label={`Banner ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
