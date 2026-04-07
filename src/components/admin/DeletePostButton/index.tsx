'use client'

import { deletePostAction } from '@/actions/post/delete-post-action'
import { Dialog } from '@/components/Dialog'
import clsx from 'clsx'
import { Trash2Icon } from 'lucide-react'
import { useState, useTransition } from 'react'
import { toast } from 'react-toastify'

type DeletePostButtonProps = {
  id: string
  title: string
}

export function DeletePostButton({ id, title }: DeletePostButtonProps) {
  const [isPending, startTransition] = useTransition()
  const [showDialog, setShowDialog] = useState(false)

  function handleClick() {
    setShowDialog(true)
  }

  function handleConfirm() {
    toast.dismiss()

    startTransition(async () => {
      const result = await deletePostAction(id)
      setShowDialog(false)

      if (result.error) {
        toast.error(result.error)
        return
      }

      toast.success('Post excluido com sucesso!')
    })
  }

  return (
    <div>
      <button
        className={clsx(
          'cursor-pointer text-red-500 transition',
          '[&_svg]:h-4 [&_svg]:w-4',
          'hover:scale-120 hover:text-red-700',
          'disabled:cursor-not-allowed disabled:text-slate-600',
        )}
        aria-label={`Apagar post: ${title}`}
        title={`Apagar post: ${title}`}
        onClick={handleClick}
        disabled={isPending}
      >
        <Trash2Icon />
      </button>
      {showDialog && (
        <Dialog
          isVisible={showDialog}
          title='Apagar post'
          content={`Deseja apagar o post: "${title}"?`}
          onConfirm={handleConfirm}
          onCancel={() => setShowDialog(false)}
          disabled={isPending}
        />
      )}
    </div>
  )
}
