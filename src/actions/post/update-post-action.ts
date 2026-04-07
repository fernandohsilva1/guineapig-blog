'use server'

import {
  makePartialPublicPost,
  makePublicPostFromDb,
  PublicPost,
} from '@/dto/post/dto'
import { verifyLoginSession } from '@/lib/login/manage-login'
import { PostUpdateSchema } from '@/lib/post/validation'
import { PostModel } from '@/models/post/post-model'
import { postRepository } from '@/repositories/post'
import { getZodErrorMessages } from '@/utils/get-zod-error-messages'
import { makeRandomString } from '@/utils/make-random-string'
import { makeSlugFromText } from '@/utils/make-slug-from-text'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { v4 as generateID } from 'uuid'

type UpdatePostActionState = {
  formState: PublicPost
  errors: string[]
  success?: string
}

export async function updatePostAction(
  prevState: UpdatePostActionState,
  formData: FormData,
): Promise<UpdatePostActionState> {
  const isAuthenticated = await verifyLoginSession()

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ['Formato de dados incorreto!'],
    }
  }

  const id = formData.get('id')?.toString() || ''

  if (!id || typeof id !== 'string') {
    return {
      formState: prevState.formState,
      errors: ['ID incorreto!'],
    }
  }
  const formDataToObj = Object.fromEntries(formData.entries())
  const zodParsedObj = PostUpdateSchema.safeParse(formDataToObj)

  if (!isAuthenticated) {
    return {
      formState: makePartialPublicPost(formDataToObj),
      errors: ['Faça login em outra aba antes de salvar'],
    }
  }

  if (!zodParsedObj.success) {
    const errors = getZodErrorMessages(zodParsedObj.error.format())
    return {
      errors,
      formState: makePartialPublicPost(formDataToObj),
    }
  }

  const validPostData = zodParsedObj.data
  const newPost = {
    ...validPostData,
  }

  let post
  try {
    post = await postRepository.update(id, newPost)
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        formState: makePartialPublicPost(formDataToObj),
        errors: [e.message],
      }
    }

    return {
      formState: makePartialPublicPost(formDataToObj),
      errors: ['Erro!'],
    }
  }

  revalidateTag('posts')
  revalidateTag(`post-${post.slug}`)

  return {
    formState: makePublicPostFromDb(post),
    errors: [],
    success: makeRandomString(),
  }
}
