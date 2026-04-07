'use client'

import { uploadImageAction } from '@/app/upload/upload-image-action'
import { Button } from '@/components/Button'
import { NormalizeImageUrl } from '@/utils/normalize-image-url'
import { ImageUpIcon } from 'lucide-react'
import { useRef, useState, useTransition } from 'react'
import { toast } from 'react-toastify'

type ImageUploaderProps = {
  onUpload?: (url: string) => void
  disabled?: boolean
}

export function ImageUploader({
  disabled = false,
  onUpload,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, startTransition] = useTransition()
  const [imgUrl, setImgUrl] = useState<string>('')
  const imageUploadSize = Number(process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SIZE) || 0

  function handleChooseFile() {
    if (!fileInputRef.current) return

    fileInputRef.current.click()
  }

  function handleChange() {
    if (!fileInputRef.current) {
      setImgUrl('')
      return
    }

    const fileInput = fileInputRef.current
    const file = fileInput?.files?.[0]

    if (!file) {
      setImgUrl('')
      return
    }

    if (file.size > imageUploadSize) {
      const readableMaxSizeKB = (imageUploadSize / 1024).toFixed(2)
      toast.error(
        `Imagem muito poderosa! O valor máximo permitido para imagens é de ${readableMaxSizeKB}`,
      )

      setImgUrl('')
      fileInput.value = ''
      return
    }

    const formData = new FormData()

    formData.append('file', file)

    startTransition(async () => {
      const result = await uploadImageAction(formData)

      if (result.error) {
        toast.error(result.error)
        fileInput.value = ''
        setImgUrl('')
        return
      }

      setImgUrl(result.url)
      onUpload?.(result.url)
      toast.success('Imagem enviada com sucesso!')
    })

    fileInput.value = ''
  }

  return (
    <div className='flex flex-col gap-2 py-4'>
      <Button
        onClick={handleChooseFile}
        type='button'
        className='self-start'
        disabled={isUploading || disabled}
      >
        <ImageUpIcon />
        Enviar uma imagem
      </Button>
      {imgUrl && (
        <div className='flex flex-col gap-4'>
          <p>
            <b>URL: </b>
            {NormalizeImageUrl(imgUrl)}
          </p>
          <img className='rounded-lg' src={imgUrl} />
        </div>
      )}
      <input
        ref={fileInputRef}
        className='hidden'
        name='file'
        type='file'
        accept='image/*'
        onChange={handleChange}
      />
    </div>
  )
}
