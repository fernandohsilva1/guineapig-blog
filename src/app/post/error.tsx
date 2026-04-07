'use client'

import ErrorMessage from '@/components/ErrorMessage'

type RootErrorPage = {
  error: Error
  reset: () => void
}

export default function RootErrorPage({ error }: RootErrorPage) {
  return (
    <ErrorMessage
      message='Internal Server Error'
      pageContent='Ocorreu um erro na aplicação.'
    />
  )
}
