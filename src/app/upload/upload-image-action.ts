'use server'

import { verifyLoginSession } from '@/lib/login/manage-login'
import { writeFile, mkdir } from 'fs/promises'
import { extname, resolve } from 'path'

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

  const imageExtension = extname(file.name)
  const uniqueImageName = `${Date.now()}${imageExtension}`
  const imageUploadLocation = process.env.IMAGE_UPLOAD_DIRECTORY || 'uploads'

  const uploadFullPath = resolve(process.cwd(), 'public', imageUploadLocation)

  await mkdir(uploadFullPath, { recursive: true })

  const fileArrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(fileArrayBuffer)

  const fileFullPath = resolve(uploadFullPath, uniqueImageName)

  await writeFile(fileFullPath, buffer)

  const imgServerUrl =
    process.env.IMAGE_SERVER_URL || 'http://localhost:3000/uploads'
  const url = `${imgServerUrl}/${uniqueImageName}`

  return makeResult({ url })
}
