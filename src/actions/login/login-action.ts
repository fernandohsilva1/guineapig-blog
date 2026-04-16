'use server'

import { verifyPassword } from '@/lib/login/manage-login'
import { createLoginSession } from '@/lib/login/manage-login-server'
import { asyncDelay } from '@/utils/async-delay'
import { redirect } from 'next/navigation'

type LoginActionState = {
  username: string
  error: string
}

export async function loginAction(state: LoginActionState, formData: FormData) {
  const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN))
  const users: { username: string; password: string }[] = JSON.parse(
    process.env.LOGIN_USERS || '[]',
  )

  if (!allowLogin) {
    return {
      username: '',
      error: 'Login não permitido',
    }
  }

  await asyncDelay(2000)

  if (!(formData instanceof FormData)) {
    return {
      username: '',
      error: 'Dados incorretos',
    }
  }

  const username = formData.get('username')?.toString().trim() || ''
  const password = formData.get('password')?.toString().trim() || ''

  if (!username || !password) {
    return {
      username,
      error: 'Digite o usuário e a senha',
    }
  }

  const isUsernameCorrect = users.find(user => user.username === username)
  const isPasswordCorrect =
    !!isUsernameCorrect &&
    (await verifyPassword(password, isUsernameCorrect.password))

  if (!isUsernameCorrect || !isPasswordCorrect) {
    return {
      username,
      error: 'Usuário ou senha incorretos',
    }
  }

  await createLoginSession(username)
  redirect('/admin/post')
}
