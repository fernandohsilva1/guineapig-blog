'use client'
import clsx from 'clsx'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={clsx(
        'fixed',
        'z-40',
        'right-4',
        'top-2',
        'flex',
        'h-10',
        'w-10',
        'items-center',
        'justify-center',
        'rounded-full',
        'border',
        'border-slate-800',
        'bg-slate-800',
        'transition-all',
        'hover:bg-slate-800',
        'dark:border-slate-700',
        'dark:bg-slate-800',
        'dark:hover:bg-slate-700',
      )}
      aria-label='Alternar Tema'
    >
      <AnimatePresence mode='wait' initial={false}>
        {isDark ? (
          <motion.div
            key='sun'
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun size={20} className='text-yellow-400' />
          </motion.div>
        ) : (
          <motion.div
            key='moon'
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon size={20} className='text-slate-200 dark:text-slate-200' />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}
