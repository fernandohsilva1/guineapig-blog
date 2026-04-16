'use client'

import { Button } from '@/components/Button'
import { InputCheckBox } from '@/components/Input/InputCheckBox'
import { InputText } from '@/components/Input/InputText'
import { MarkdownEditor } from '@/components/MarkdownEditor'
import clsx from 'clsx'
import { useActionState, useEffect, useState } from 'react'
import { ImageUploader } from '../ImageUploader'
import { makePartialPublicPost, PublicPost } from '@/dto/post/dto'
import { createPostAction } from '@/actions/post/create-post-action'
import { toast } from 'react-toastify'
import { updatePostAction } from '@/actions/post/update-post-action'
import { useRouter, useSearchParams } from 'next/navigation'
import { NormalizeImageUrl } from '@/utils/normalize-image-url'

type ManagePostFormUpdateProps = {
  mode: 'update'
  publicPost: PublicPost
}

type ManagePostFormCreateProps = {
  mode: 'create'
}

type ManagePostFormProps = ManagePostFormCreateProps | ManagePostFormUpdateProps

export function ManagePostForm(props: ManagePostFormProps) {
  const { mode } = props
  let publicPost
  const searchParams = useSearchParams()
  const created = searchParams.get('created')
  const router = useRouter()

  if (mode === 'update') {
    publicPost = props.publicPost
  }

  const actionsMap = {
    update: updatePostAction,
    create: createPostAction,
  }

  const initialState = {
    formState: makePartialPublicPost(publicPost),
    errors: [],
  }
  const [state, action, isPending] = useActionState(
    actionsMap[mode],
    initialState,
  )

  const { formState } = state
  const [imgUrl, setImgUrl] = useState<string>(formState.coverImageUrl || '')

  const [contentValue, setContentValue] = useState<string>(
    publicPost?.content || '',
  )

  useEffect(() => {
    if (state.errors.length > 0) {
      toast.dismiss()
      state.errors.forEach(error => toast.error(error))
    }
  }, [state.errors])

  useEffect(() => {
    if (state.success) {
      toast.dismiss()
      toast.success('Post atualizado com sucesso!')
    }
  }, [state.success])

  useEffect(() => {
    if (created === '1') {
      toast.dismiss()
      toast.success('Post criado com sucesso!')
      const url = new URL(window.location.href)
      url.searchParams.delete('created')
      router.replace(url.toString())
    }
  }, [created, router])

  return (
    <form action={action} className={clsx('mb-16', 'flex flex-col gap-4')}>
      <div className='flex flex-col gap-6 text-gray-900'>
        <InputText
          labelText='ID'
          name='id'
          placeholder='ID gerado automaticamente'
          type='text'
          defaultValue={formState.id}
          readOnly
        />
        <InputText
          labelText='Slug'
          name='slug'
          placeholder='Slug gerada automaticamente'
          type='text'
          defaultValue={formState.slug}
          readOnly
        />
        <InputText
          labelText='Autor'
          name='author'
          placeholder='Digite o nome do autor'
          type='text'
          defaultValue={formState.author}
          disabled={isPending}
        />
        <InputText
          labelText='Título'
          name='title'
          placeholder='Digite o título'
          type='text'
          defaultValue={formState.title}
          disabled={isPending}
        />
        <InputText
          labelText='Resumo'
          name='excerpt'
          placeholder='Digite o resumo'
          type='text'
          defaultValue={formState.excerpt}
          disabled={isPending}
        />
        <MarkdownEditor
          labelText='Conteúdo'
          value={contentValue}
          setValue={setContentValue}
          textAreaName='content'
          disabled={isPending}
        />

        <ImageUploader onUpload={setImgUrl} disabled={isPending} />
        <InputText
          labelText='URL da imagem de capa'
          name='coverImageUrl'
          placeholder='Digite a url da imagem'
          type='text'
          defaultValue={NormalizeImageUrl(imgUrl)}
          disabled={isPending}
        />

        <InputCheckBox
          labelText='Publicar?'
          name='published'
          type='checkbox'
          defaultChecked={formState.published}
          disabled={isPending}
        />
        <div>
          <Button type='submit'>Enviar</Button>
        </div>
      </div>
    </form>
  )
}
