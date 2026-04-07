'use client'

import clsx from 'clsx'
import {
  CircleXIcon,
  FileTextIcon,
  Hourglass,
  HouseIcon,
  LogOut,
  MenuIcon,
  PlusIcon,
} from 'lucide-react'
import Link from 'next/link'
import { useState, useTransition } from 'react'
import { logoutAction } from '@/actions/logout/logout-action'

export function MenuAdmin() {
  const [isOpen, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const navClasses = clsx(
    'bg-slate-900 text-slate-100 rounded-lg',
    'flex flex-col mb-8',
    'sm:flex-row sm:flex-wrap',
    !isOpen && 'h-10',
    !isOpen && 'overflow-hidden',
    'sm:overflow-visible sm:h-auto',
  )
  const linkClasses = clsx(
    '[&>svg]:w-[16px] [&>svg]:h-[16px] px-4',
    'flex items-center justify-start gap-2 cursor-pointer',
    'transition hover:bg-slate-800 rounded-lg',
    'h-10',
    'shrink-0',
  )

  const toggleMenuOpen = () => {
    setOpen(prevState => !prevState)
  }

  const openCloseBtnClasses = clsx(
    linkClasses,
    'text-blue-200 italic',
    'sm:hidden',
    'font-medium',
    'text-blue-300',
    'hover:text-white',
    'hover:bg-slate-900',
  )

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()

    startTransition(async () => {
      await logoutAction()
    })
  }

  return (
    <nav className={navClasses}>
      <button onClick={toggleMenuOpen} className={openCloseBtnClasses}>
        {isOpen ? <CircleXIcon /> : <MenuIcon />}
        {isOpen ? 'Fechar' : 'Menu'}
      </button>

      <a className={linkClasses} href='/' target='_blank'>
        <HouseIcon />
        Home
      </a>

      <Link className={linkClasses} href='/admin/post'>
        <FileTextIcon />
        Posts
      </Link>

      <Link className={linkClasses} href='/admin/post/new'>
        <PlusIcon />
        Criar post
      </Link>

      <a onClick={handleLogout} href='#' className={linkClasses}>
        {!isPending && (
          <div className='flex items-center gap-2'>
            <LogOut />
            Sair
          </div>
        )}
      </a>
    </nav>
  )
}
