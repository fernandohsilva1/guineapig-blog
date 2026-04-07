import Link from 'next/link'

export default function Footer() {
  return (
    <footer className='pt-9 pb-8 text-center'>
      <span>
        <p>
          Copyright &copy; {new Date().getFullYear()} -&nbsp;
          <Link href='/'>Porquinho da índia blog</Link>
        </p>
      </span>
    </footer>
  )
}
