import { postRepository } from '@/repositories/post'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { unstable_cache } from 'next/cache'

export const findAllPublicPostsCached = cache(
  unstable_cache(
    async () => {
      return await postRepository.findAllPublic()
    },
    ['posts'],
    {
      tags: ['posts'],
    },
  ),
)

export const findPublicPostsBySlugCached = cache((slug: string) => {
  return unstable_cache(
    async (slug: string) => {
      const decoded = decodeURIComponent(slug)
      const post = await postRepository.findBySlug(decoded)

      if (!post) notFound()

      return post
    },
    [`post-${slug}`],
    {
      tags: [`post-${slug}`],
    },
  )(slug)
})
