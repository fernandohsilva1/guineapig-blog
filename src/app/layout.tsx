import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import { Container } from '@/components/Container'
import { Header } from '@/components/Header'
import Footer from '@/components/Footer'
import { ToastifyContainer } from '@/components/ToastifyContainer'
import { ThemeToggle } from '@/components/ThemeToggle'

export const metadata: Metadata = {
  title: {
    default: 'Porquinho da índia blog',
    template: '%s | Porquinho da índia blog',
  },
  description: 'Página principal do Blog',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='pt-BR' suppressHydrationWarning>
      <body>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <Container>
            <ThemeToggle />
            <Header />
            {children}
            <Footer />
          </Container>
          <ToastifyContainer />
        </ThemeProvider>
      </body>
    </html>
  )
}
