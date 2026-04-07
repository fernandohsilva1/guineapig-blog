'use client'

import MDEditor from '@uiw/react-md-editor'
import React, { useId } from 'react'

type MarkdownEditorProps = {
  labelText?: string
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  textAreaName: string
  disabled?: boolean
}

export function MarkdownEditor({
  labelText = '',
  value,
  setValue,
  textAreaName,
  disabled = false,
}: MarkdownEditorProps) {
  const id = useId()

  return (
    <div className='flex flex-col gap-2'>
      {labelText && (
        <label className='text-sm' htmlFor={id}>
          {labelText}
        </label>
      )}

      <MDEditor
        className='whitespace-pre-wrap'
        value={value}
        onChange={value => {
          if (value === undefined) return
          setValue(value)
        }}
        height={400}
        extraCommands={[]}
        preview='edit'
        hideToolbar={disabled}
        textareaProps={{ id, name: textAreaName, disabled: disabled }}
      />
    </div>
  )
}
