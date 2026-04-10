import { findPublicPostsBySlugCached } from '@/lib/post/queries/public'
import { PostImageCover } from '../PostImageCover'
import { notFound } from 'next/navigation'
import { PostHeading } from '../PostHeading'
import PostDate from '../PostDate'

export const dynamic = 'force-dynamic'

type SinglePostPageProps = {
  slug: string
}

export default async function SinglePostPage({ slug }: SinglePostPageProps) {
  const post = await findPublicPostsBySlugCached(slug).catch(() => undefined)

  if (!post) notFound()

  return (
    <article>
      <header className='group mb-4 flex flex-col gap-4'>
        <PostImageCover
          href={`/post/${post.slug}`}
          src={post.coverImageUrl}
          alt={post.title}
          className='max-h-[720px]'
        />
        <PostHeading url={`/post/${post.slug}`} as='h2'>
          {post.title}
        </PostHeading>
        <p>
          {post.author} | <PostDate dateTime={post.createdAt} />
        </p>
      </header>
      <p className='mb-4 text-xl'>{post.excerpt}</p>

      <div>{post.content}</div>
    </article>
  )
}
