import { DeletePostButton } from '@/components/admin/DeletePostButton'
import ErrorMessage from '@/components/ErrorMessage'
import { findAllPostsAdmin } from '@/lib/post/queries/admin'
import clsx from 'clsx'
import Link from 'next/link'

export default async function PostsPageList() {
  const posts = await findAllPostsAdmin()

  if (posts.length <= 0)
    return <ErrorMessage message='Ei!' pageContent='Bora criar algum post?' />

  return (
    <div className='mb-16'>
      {posts.map(post => (
        <div
          className={clsx(
            'px-2 py-2',
            !post.published && 'bg-slate-300',
            'flex items-center justify-between gap-2',
          )}
          key={post.id}
        >
          <Link href={`/admin/post/${post.id}`}>{post.title}</Link>

          {!post.published && (
            <span className='text-xs text-slate-600 italic'>
              (Não publicado)
            </span>
          )}

          <DeletePostButton id={post.id} title={post.title} />
        </div>
      ))}
    </div>
  )
}
