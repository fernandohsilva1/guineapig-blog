import clsx from 'clsx'

type SpinLoaderProps = {
  className?: string
}

export function SpinLoader({ className = '' }: SpinLoaderProps) {
  return (
    <div className={clsx('flex', 'items-center', 'justify-center', className)}>
      <div
        className={clsx(
          'w-10',
          'h-10',
          'border-4',
          'border-t-amber-400',
          'border-slate-200',
          'rounded-full',
          'animate-spin',
        )}
      />
    </div>
  )
}
