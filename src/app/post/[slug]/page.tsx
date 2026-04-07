export const dynamic = 'force-dynamic'

import SinglePostPage from '@/components/SinglePostPage'
import { findPublicPostsBySlugCached } from '@/lib/post/queries/public'
import { Metadata } from 'next'

type PostSlugProps = {
  params: { slug: string }
}

export async function generateMetadata({
  params,
}: PostSlugProps): Promise<Metadata> {
  const { slug } = await params
  const post = await findPublicPostsBySlugCached(slug)

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function PostSlugPage({ params }: PostSlugProps) {
  const { slug } = await params

  return (
    <div>
      <SinglePostPage slug={slug} />
    </div>
  )
}
