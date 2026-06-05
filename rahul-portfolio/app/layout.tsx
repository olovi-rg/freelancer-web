import './globals.css'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Rahul - Full-Stack Developer | Next.js | Sanity',
  description: 'Healthcare, real estate & e-commerce web apps built with Next.js, Sanity CMS, and Tailwind CSS.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
