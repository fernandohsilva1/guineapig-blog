export const dyamic = 'force-dynamic'

import ErrorMessage from '@/components/ErrorMessage'
import { findAllPublicPostsCached } from '@/lib/post/queries/public'

export default async function NotFound() {
  const posts = await findAllPublicPostsCached()
  const post = posts[0]

  return (
    <ErrorMessage
      post={post}
      message='Erro 404'
      pageContent='Página não encontrada'
    />
  )
}
