import { hashPassword } from '@/lib/login/manage-login'
;(async () => {
  const myPassword = 'jessicalinda'
  const hashedPassword = await hashPassword(myPassword)

  console.log({ hashedPassword })
})()
