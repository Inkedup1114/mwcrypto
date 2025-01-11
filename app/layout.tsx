import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Midwest Crypto Services',
  description: 'Professional cryptocurrency mining pool services',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        {/* Floating Particles */}
        <div aria-hidden="true">
          <div className="floating-particle"></div>
          <div className="floating-particle"></div>
          <div className="floating-particle"></div>
          <div className="floating-particle"></div>
          <div className="floating-particle"></div>
          <div className="floating-particle"></div>
          <div className="floating-particle"></div>
          <div className="floating-particle"></div>
        </div>
        
        {/* Title */}
        <div className="w-full fixed top-0 z-40">
          <div className="container mx-auto text-center py-4">
            <h1 className="text-4xl font-bold glow-text tracking-[0.5em]">MIDWEST CRYPTO SERVICES</h1>
            <p className="text-lg glow-text tracking-[0.3em] mt-2 text-yellow-500">"I will turn 'where do I start?' into 'look how far I've come!'"</p>
          </div>
        </div>

        <div className="min-h-screen flex flex-col items-center justify-between py-16">
          <div className="flex-grow flex flex-col items-center justify-center w-full px-4 mt-16">
            {children}
          </div>
          <footer className="w-full flex justify-center mt-auto pt-16">
            <div className="text-center">
              <p className="text-lg tracking-widest opacity-40 font-light">MIDWEST CRYPTO</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}