'use client'

import clsx from 'clsx'
import { useId } from 'react'

type InputTextProps = {
  labelText?: string
} & React.ComponentProps<'input'>

export function InputText({ labelText = '', ...props }: InputTextProps) {
  const id = useId()

  return (
    <div className='flex flex-col gap-2'>
      {labelText && (
        <label className='text-sm' htmlFor={id}>
          {labelText}
        </label>
      )}
      <input
        className={clsx(
          'bg-white text-base/tight outline-0',
          'rounded ring-2 ring-slate-400',
          'p-2 py-2 transition focus:ring-blue-600',
          'placeholder-slate-300',
          'disabled:bg-slate-200',
          'disabled:text-slate-400',
          'disabled:placeholder-slate-300',
          'read-only:bg-slate-100',
          props.className,
        )}
        {...props}
        id={id}
      />
    </div>
  )
}
