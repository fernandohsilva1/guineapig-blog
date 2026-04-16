export const dynamic = 'force-dynamic'

import { findAllPublicPostsCached } from '@/lib/post/queries/public'
import ErrorMessage from '../ErrorMessage'
import { PostFeaturedSlider } from './PostFeaturedSlider'

export async function PostFeatured() {
  const posts = await findAllPublicPostsCached()
  if (posts.length <= 0)
    return (
      <ErrorMessage
        message='Ops!'
        pageContent='Ainda não publicamos nenhum post'
      />
    )

  return <PostFeaturedSlider posts={posts} />
}
