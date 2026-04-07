import { NormalizeImageUrl } from '@/utils/normalize-image-url'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

type PostImageCoverProps = {
  href: string
  src: string
  alt: string
  className?: string
}

export function PostImageCover({
  href,
  src,
  alt,
  className,
}: PostImageCoverProps) {
  return (
    <Link
      href={href}
      className={clsx(
        'relative',
        'w-full',
        'aspect-square',
        'overflow-hidden',
        'rounded-xl',
        'max-w-[720px]',
        'group',
        className,
      )}
    >
      <Image
        fill
        src={NormalizeImageUrl(src)}
        alt={alt}
        priority
        className={clsx(
          'object-cover',
          'object-center',
          'transition-transform',
          'duration-200',
          'group-hover:scale-104',
        )}
      />
    </Link>
  )
}
