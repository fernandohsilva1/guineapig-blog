import { hashPassword } from '@/lib/login/manage-login'
;(async () => {
  const myPassword = ''
  const hashedPassword = await hashPassword(myPassword)

  console.log({ hashedPassword })
})()
