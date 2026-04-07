type ContainerProps = {
  children: React.ReactNode
}

export function Container({ children }: ContainerProps) {
  return (
    <div className='min-h-screen'>
      <div className='max-x-screen-lg mx-auto px-8'>{children}</div>
    </div>
  )
}
