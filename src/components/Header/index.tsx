import clsx from 'clsx'
import Link from 'next/link'

export function Header() {
  return (
    <header>
      <h1
        className={clsx(
          'py-8 text-4xl font-extrabold',
          'sm:py-10 sm:text-5xl/normal',
          'md:py-11 md:text-6xl/normal',
          'lg:py-12 lg:text-7xl/normal',
        )}
      >
        <Link href='#' className='text-[#996633]'>
          Porquinho da índia blog
        </Link>
      </h1>
    </header>
  )
}
