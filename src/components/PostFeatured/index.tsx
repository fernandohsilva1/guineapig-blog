import clsx from 'clsx'
import { PostImageCover } from '../PostImageCover'
import { PostSummary } from '../PostSummary'
import { findAllPublicPostsCached } from '@/lib/post/queries/public'
import ErrorMessage from '../ErrorMessage'

export async function PostFeatured() {
  const posts = await findAllPublicPostsCached()
  if (posts.length <= 0)
    return (
      <ErrorMessage
        message='Ops!'
        pageContent='Ainda não publicamos nenhum post'
      />
    )

  const post = posts[0]
  const postLink = `/post/${post.slug}`

  return (
    <section
      className={clsx('group mb-16 grid grid-cols-1 gap-8', 'sm:grid-cols-2')}
    >
      <PostImageCover
        href={postLink}
        src={post.coverImageUrl}
        alt={post.title}
      />
      <PostSummary
        postHeading='h1'
        postLink={postLink}
        title={post.title}
        createdAt={post.createdAt}
        excerpt={post.excerpt}
      />
    </section>
  )
}
