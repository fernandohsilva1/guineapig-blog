'use client'

import clsx from 'clsx'
import { Button } from '../Button'

type DialogProps = {
  isVisible?: boolean
  title: string
  content: React.ReactNode
  onConfirm: () => void
  onCancel: () => void
  disabled: boolean
}

export function Dialog({
  isVisible = false,
  title,
  content,
  onConfirm,
  onCancel,
  disabled,
}: DialogProps) {
  if (!isVisible) return null

  function handleCancel() {
    if (disabled) return

    onCancel()
  }

  return (
    <div
      className={clsx(
        'fixed inset-0 top-0 right-0 bottom-0 left-0 z-40 bg-black/40 backdrop-blur-xs',
        'flex items-center justify-center',
      )}
      onClick={handleCancel}
    >
      <div
        className={clsx(
          'mx-6 max-w-2xl rounded-lg bg-slate-900 p-6',
          'flex flex-col gap-2',
          'text-center shadow-lg shadow-black/40',
        )}
        role='dialog'
        aria-modal={true}
        aria-labelledby='dialog-title'
        aria-describedby='dialog-description'
        onClick={e => e.stopPropagation()}
      >
        <h3 id='dialog-title' className='text-xl font-extrabold'>
          {title}
        </h3>
        <p id='dialog-description' className='mb-4'>
          {content}
        </p>
        <div className='flex items-center justify-around'>
          <Button onClick={onConfirm} disabled={disabled}>
            Ok
          </Button>
          <Button
            variant='ghost'
            autoFocus
            onClick={onCancel}
            disabled={disabled}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  )
}
