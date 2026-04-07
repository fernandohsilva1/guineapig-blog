import { PostModel } from '@/models/post/post-model'
import { PostImageCover } from '../PostImageCover'

type ErrorMessageProps = {
  post?: PostModel
  message?: string
  pageContent: string
}

export default function ErrorMessage({
  post,
  message,
  pageContent,
}: ErrorMessageProps) {
  return (
    <div className='m-10 flex flex-col items-center justify-center gap-10'>
      {post && (
        <PostImageCover
          className='max-w-[800px]'
          href='/'
          src={post.coverImageUrl}
          alt={post.title}
        />
      )}
      <div>
        <h1 className='mb-4 text-3xl/tight font-extrabold'>{message}</h1>
        <div>{pageContent}</div>
      </div>
    </div>
  )
}
