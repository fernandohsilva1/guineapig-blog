'use server'

import { deleteLoginSession } from '@/lib/login/manage-login-server'

export async function logoutAction() {
  await deleteLoginSession()
}
