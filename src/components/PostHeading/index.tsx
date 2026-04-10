import Link from 'next/link'

type PostHeadingProps = {
  children: React.ReactNode
  url: string
  as: 'h1' | 'h2'
}

export function PostHeading({ children, url, as: Tag }: PostHeadingProps) {
  const HeadingStyle = {
    h1: 'text-2xl/tight font-extrabold sm:text-4xl',
    h2: 'text-2xl/tight font-bold',
  }

  return (
    <Tag className={HeadingStyle[Tag]}>
      <Link
        className='text-slate-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400'
        href={url}
      >
        {children}
      </Link>
    </Tag>
  )
}
