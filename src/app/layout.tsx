import type { Metadata } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import './globals.css'
import { TRPCProvider } from '@/components/layout/trpc-provider'
import { SessionProvider } from '@/components/layout/session-provider'
import { cn } from '@/lib/utils'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'PathWise — AI Career & Education Advisor',
  description:
    'Get personalized career guidance powered by AI. Discover career paths, skill gaps, and freelancing opportunities tailored to your background and goals.',
  openGraph: {
    title: 'PathWise — AI Career & Education Advisor',
    description: 'Your AI-powered personal career counsellor.',
    siteName: 'PathWise',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn('h-full antialiased', syne.variable, dmSans.variable)}
    >
      <body className="min-h-full flex flex-col font-dm bg-linen text-ink">
        <TRPCProvider>
          <SessionProvider>{children}</SessionProvider>
        </TRPCProvider>
      </body>
    </html>
  )
}
