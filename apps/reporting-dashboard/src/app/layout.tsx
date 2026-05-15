import type { Metadata } from 'next'
import { DM_Sans, DM_Mono } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' })
const dmMono = DM_Mono({ weight: ['400'], subsets: ['latin'], variable: '--font-dm-mono' })

export const metadata: Metadata = {
  title: 'Clickflow — AI Ad Platform',
  description: 'Self-serve ad platform for DTC brands and agencies. Generate ad copy, create images, and track performance.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${dmMono.variable} font-sans antialiased bg-[#FAFAF8] text-[#1A1A18]`}>
        {children}
      </body>
    </html>
  )
}
