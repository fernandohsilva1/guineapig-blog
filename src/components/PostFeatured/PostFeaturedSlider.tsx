'use client'

import { PostModel } from '@/models/post/post-model'
import { NormalizeImageUrl } from '@/utils/normalize-image-url'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type PostFeaturedSliderProps = {
  posts: PostModel[]
}

function getNormalizedOffset(index: number, current: number, total: number) {
  let offset = index - current
  if (offset > total / 2) offset -= total
  if (offset < -total / 2) offset += total
  return offset
}

export function PostFeaturedSlider({ posts }: PostFeaturedSliderProps) {
  const [current, setCurrent] = useState(0)
  const [resetSlide, setResetSlide] = useState(0)

  useEffect(() => {
    if (posts.length <= 1) return
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % posts.length)
    }, 3900)
    return () => clearInterval(interval)
  }, [posts.length, resetSlide])

  const prev = () => {
    setCurrent(p => (p - 1 + posts.length) % posts.length)
    setResetSlide(k => k + 1)
  }
  const next = () => {
    setCurrent(p => (p + 1) % posts.length)
    setResetSlide(k => k + 1)
  }

  return (
    <section className='relative mb-16 w-full'>
      <div
        className='relative flex h-[520px] w-full overflow-hidden sm:h-[420px] md:h-[520px]'
        style={{ perspective: '1200px', perspectiveOrigin: '50% 50%' }}
      >
        {posts.map((post: PostModel, index: number) => {
          const offset = getNormalizedOffset(index, current, posts.length)
          const abs = Math.abs(offset)

          if (abs > 2) return null

          const xShift = offset * 200
          const rotateY = offset * 0
          const scale = abs === 0 ? 1 : abs === 1 ? 0.88 : 0.79
          const zIndex = abs === 0 ? 20 : abs === 1 ? 10 : 2
          const opacity = abs === 0 ? 1 : abs === 1 ? 0.9 : 0.6
          const isCenter = abs === 0

          const transform = `translateX(calc(-50% + ${xShift}px)) translateY(-50%) rotateY(${rotateY}deg) scale(${scale})`

          return (
            <div
              key={post.slug}
              onClick={() => !isCenter && setCurrent(index)}
              className={clsx(
                'absolute top-1/2 left-1/2 aspect-[2/3] w-[60%] max-w-[300px] min-w-[140px] overflow-hidden rounded-2xl transition-all duration-700 sm:w-[40%] md:w-[26%]',
              )}
              style={{
                transform,
                zIndex,
                opacity,
                cursor: isCenter ? 'default' : 'pointer',
              }}
            >
              {isCenter ? (
                <Link
                  href={`/post/${post.slug}`}
                  className='block h-full w-full'
                >
                  <Image
                    fill
                    sizes='300px'
                    src={NormalizeImageUrl(post.coverImageUrl)}
                    alt={post.title}
                    priority={index === 0}
                    className='object-cover object-center'
                  />
                </Link>
              ) : (
                <Image
                  fill
                  sizes='230px'
                  src={NormalizeImageUrl(post.coverImageUrl)}
                  alt={post.title}
                  className='object-cover object-center'
                />
              )}
            </div>
          )
        })}
      </div>

      {posts.length > 1 && (
        <>
          <div className='mt-4 flex justify-center gap-4 sm:hidden'>
            <button
              onClick={prev}
              aria-label='Slide anterior'
              className='hover:bg-black-90 flex h-10 w-10 items-center justify-center rounded-full bg-black text-2xl text-white'
            >
              &lt;
            </button>
            <button
              onClick={next}
              aria-label='Próximo slide'
              className='hover:bg-black-90 flex h-10 w-10 items-center justify-center rounded-full bg-black text-2xl text-white'
            >
              &gt;
            </button>
          </div>
          <button
            onClick={prev}
            aria-label='Slide anterior'
            className='absolute top-1/2 left-2 z-30 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-2xl text-white transition-colors hover:bg-black/90 sm:left-6 sm:flex md:left-10'
          >
            &lt;
          </button>
          <button
            onClick={next}
            aria-label='Próximo slide'
            className='absolute top-1/2 right-2 z-30 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-2xl text-white transition-colors hover:bg-black/90 sm:right-6 sm:flex md:right-10'
          >
            &gt;
          </button>
        </>
      )}
    </section>
  )
}
