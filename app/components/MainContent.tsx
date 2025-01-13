'use client'

import SparkAnimation from './SparkAnimation'
import Navigation from './navigation'
import { Providers } from '../providers'

export default function MainContent({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SparkAnimation />
      
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
      
      <header className="fixed top-0 left-0 right-0 z-40">
        <div className="w-full">
          <div className="container mx-auto text-center py-2 md:py-4 px-4">
            <h1 className="text-2xl md:text-4xl font-bold glow-text animate-gradient tracking-[0.1em] md:tracking-[0.3em] bg-gradient-to-r from-blue-500 via-yellow-500 to-blue-500 text-transparent bg-clip-text px-2">
              MIDWEST CRYPTO
            </h1>
            <p className="text-sm md:text-lg glow-text animate-gradient-reverse tracking-[0.05em] md:tracking-[0.2em] mt-1 md:mt-2 bg-gradient-to-r from-yellow-500 via-blue-500 to-yellow-500 text-transparent bg-clip-text px-4 mx-auto max-w-[90%] md:max-w-full">
              "I will turn 'where do I start?' into 'look how far I've come!'"
            </p>
          </div>
        </div>
      </header>

      <div className="fixed top-20 md:top-32 left-0 right-0 z-40">
        <Navigation />
      </div>

      <div className="min-h-screen flex flex-col items-center justify-between pt-32 md:pt-48">
        <div className="flex-grow flex flex-col items-center justify-center w-full px-2 md:px-4 mt-4 md:mt-16">
          <Providers>
            {children}
          </Providers>
        </div>
        <footer className="w-full flex justify-center mt-auto pt-8 md:pt-16 pb-4">
          <div className="text-center">
            <p className="text-sm md:text-lg tracking-widest opacity-40 font-light">MIDWEST CRYPTO</p>
          </div>
        </footer>
      </div>
    </>
  )
}