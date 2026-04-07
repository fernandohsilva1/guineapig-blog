import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { signJwt, verifyJwt } from './manage-login'

const loginExpSeconds = Number(process.env.LOGIN_EXPIRATION_SECONDS) || 90000
const loginCookieName = process.env.LOGIN_COOKIE_NAME || 'loginSession'

export async function deleteLoginSession() {
  const cookieStore = await cookies()
  cookieStore.set(loginCookieName, '', { expires: new Date(0) })
  cookieStore.delete(loginCookieName)

  redirect('/')
}

export async function getLoginSession() {
  const cookieStore = await cookies()
  const jwt = cookieStore.get(loginCookieName)?.value

  if (!jwt) return false

  return verifyJwt(jwt)
}

export async function requireLoginSessionOrDirect() {
  const isAuthenticated = await getLoginSession()

  if (!isAuthenticated) redirect('/admin/login')
}

export async function createLoginSession(username: string) {
  const expiresAt = new Date(Date.now() + loginExpSeconds * 1000)
  const loginSession = await signJwt({ username, expiresAt })
  const cookieStore = await cookies()

  cookieStore.set(loginCookieName, loginSession, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    expires: expiresAt,
  })
}
