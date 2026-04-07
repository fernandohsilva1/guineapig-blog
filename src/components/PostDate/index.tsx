import { formatDateRelative, formatDatetime } from '@/utils/format-datetime'

type PostDateProps = {
  dateTime: string
}

export default function PostDate({ dateTime }: PostDateProps) {
  return (
    <time
      className='text-sm/tight'
      dateTime={dateTime}
      title={formatDateRelative(dateTime)}
    >
      {formatDatetime(dateTime)}
    </time>
  )
}
