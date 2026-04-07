import { LoginForm } from '@/components/admin/LoginForm'
import ErrorMessage from '@/components/ErrorMessage'

export const dynamic = 'force-dynamic'

export default async function LoginPage() {
  const allowLogin = Boolean(Number(process.env.ALLOW_lOGIN))

  if (!allowLogin) {
    return (
      <ErrorMessage
        message='403'
        pageContent='Libere o sistema de login usando ALLOW_LOGIN'
      />
    )
  }
  return <LoginForm />
}
