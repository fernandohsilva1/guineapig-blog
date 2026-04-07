import { MenuAdmin } from '@/components/MenuAdmin'
import { requireLoginSessionOrDirect } from '@/lib/login/manage-login-server'

type AdminPostLayoutProps = {
  children: React.ReactNode
}

export default async function AdminPostLayout({
  children,
}: Readonly<AdminPostLayoutProps>) {
  await requireLoginSessionOrDirect()

  return (
    <>
      <MenuAdmin />
      {children}
    </>
  )
}
