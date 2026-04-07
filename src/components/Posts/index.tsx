import { PostImageCover } from '../PostImageCover'
import { PostSummary } from '../PostSummary'
import { findAllPublicPostsCached } from '@/lib/post/queries/public'

export const dynamic = 'force-dynamic'

export async function Posts() {
  const posts = await findAllPublicPostsCached()

  if (posts.length <= 0) return null

  return (
    <div className='mb-16 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3'>
      {posts.map(post => {
        const postLink = `/post/${post.slug}`
        return (
          <div className='group flex flex-col gap-4' key={post.id}>
            <PostImageCover
              href={postLink}
              src={post.coverImageUrl}
              alt={post.title}
            />
            <PostSummary
              postHeading='h2'
              postLink={postLink}
              title={post.title}
              createdAt={post.createdAt}
              excerpt={post.excerpt}
            />
          </div>
        )
      })}
    </div>
  )
}
