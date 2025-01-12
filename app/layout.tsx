import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import SparkAnimation from './components/SparkAnimation'

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
        {/* Spark Animation */}
        <SparkAnimation />
        
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
        <header className="fixed top-0 left-0 right-0 z-40">
          <div className="w-full">
            <div className="container mx-auto text-center py-4">
              <h1 className="text-4xl font-bold glow-text animate-gradient tracking-[0.5em] bg-gradient-to-r from-blue-500 via-yellow-500 to-blue-500 text-transparent bg-clip-text">
                MIDWEST CRYPTO SERVICES
              </h1>
              <p className="text-lg glow-text animate-gradient-reverse tracking-[0.3em] mt-2 bg-gradient-to-r from-yellow-500 via-blue-500 to-yellow-500 text-transparent bg-clip-text">
                "I will turn 'where do I start?' into 'look how far I've come!'"
              </p>
            </div>
          </div>
        </header>

        <div className="min-h-screen flex flex-col items-center justify-between pt-48">
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