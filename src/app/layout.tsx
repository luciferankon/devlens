import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'DevLens — Stack Overflow Developer Survey 2024 Visualized',
  description:
    'Interactive visualization of the Stack Overflow Developer Survey 2024 — languages, frameworks, salaries, AI tools, and work trends from 65,437 developers.',
  openGraph: {
    title: 'DevLens',
    description: 'The dev ecosystem, visualized. Stack Overflow 2024 survey data.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
