import clsx from 'clsx'
import ReactMarkdown from 'react-markdown'
import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'

type SafeMarkDownProps = {
  markdown: string
}

export default function SafeMarkDown({ markdown }: SafeMarkDownProps) {
  return (
    <div
      className={clsx(
        'prose',
        'prose-slate',
        'prose-a:text-blue-500',
        'prose-a:hover:text-blue-700',
        'prose-a:transition',
        'prose-a:no-underline',
        'prose-img:mx-auto',
        'w-full',
        'max-w-none',
        'overflow-hidden',
        'lg:prose-lg',
      )}
    >
      <ReactMarkdown
        rehypePlugins={[rehypeSanitize]}
        remarkPlugins={[remarkGfm]}
        components={{
          table: ({ node, ...props }) => {
            if (!node?.children) return ''

            return (
              <div className='overflow-x-auto'>
                <table {...props} />
              </div>
            )
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}
