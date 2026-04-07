import { Metadata } from 'next'
import { Suspense } from 'react'
import PostsPageList from './PostsPageList'
import { SpinLoader } from '@/components/SpinLoader'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Post Admin',
}

export default async function AdminPostPage() {
  return (
    <Suspense fallback={<SpinLoader />}>
      <PostsPageList />
    </Suspense>
  )
}
