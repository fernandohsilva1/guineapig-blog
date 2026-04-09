'use server'

import { verifyLoginSession } from '@/lib/login/manage-login'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

type UploadImageActionResult = {
  url: string
  error: string
}

export async function uploadImageAction(
  formData: FormData,
): Promise<UploadImageActionResult> {
  const makeResult = ({ url = '', error = '' }) => ({ url, error })
  const imageUploadSize = Number(process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SIZE) || 0
  const isAuthenticated = await verifyLoginSession()

  if (!isAuthenticated) {
    return makeResult({ error: 'Faça login novamente na página' })
  }

  if (!(formData instanceof FormData)) {
    return makeResult({ error: 'Dados inválidos' })
  }

  const file = formData.get('file')

  if (!(file instanceof File)) {
    return makeResult({ error: 'Arquivo inválido' })
  }

  if (file.size > imageUploadSize) {
    return makeResult({
      error: 'Tamanho da imagem muito poderosa! Diminua o tamanho da imagem',
    })
  }

  if (!file.type.startsWith('image/')) {
    return makeResult({ error: 'A imagem deve ser JPEG/PNG' })
  }

  const fileArrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(fileArrayBuffer)

  const result = await new Promise<{ secure_url: string }>(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: 'blog' }, (error, result) => {
          if (error || !result) return reject(error)
          resolve(result)
        })
        .end(buffer)
    },
  )

  return makeResult({ url: result.secure_url })
}
