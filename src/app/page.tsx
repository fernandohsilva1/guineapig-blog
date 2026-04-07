import { PostFeatured } from '@/components/PostFeatured'
import { Posts } from '@/components/Posts'
import { SpinLoader } from '@/components/SpinLoader'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Suspense } from 'react'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  return (
    <div>
      <ThemeToggle />
      <Suspense fallback={<SpinLoader className='mb-16 min-h-20' />}>
        <PostFeatured />
        <Posts />
      </Suspense>
    </div>
  )
}
