import clsx from 'clsx'
import { useId } from 'react'

export function InputCheckBox({ labelText = '', type = 'checkbox', ...props }) {
  const id = useId()

  return (
    <div className='flex items-center gap-3'>
      <input
        {...props}
        className={clsx(
          'h-4 w-4 outline-none focus:ring-2 focus:ring-slate-800',
          'appearance-none rounded border border-gray-400 bg-white',
          'checked:border-blue-400 checked:bg-blue-400',
          props.className,
        )}
        id={id}
        type={type}
      />

      {labelText && (
        <label className='text-base' htmlFor={id}>
          {labelText}
        </label>
      )}
    </div>
  )
}
