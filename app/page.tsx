'use client'

import BookingCalendar from './components/BookingCalendar'
import { useState } from 'react'

export default function Home() {
  const [showCalendar, setShowCalendar] = useState(false)

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6 leading-relaxed">
            Master Cryptocurrency with Personal Guidance
          </h1>
          <p className="text-2xl text-gray-200 mb-12 leading-relaxed">
            One-on-one sessions to help you understand and navigate the crypto world
          </p>
        </div>

        {/* First Row of Information Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* First Bubble */}
          <div className="relative bubble-gradient-1 backdrop-blur-sm rounded-3xl p-8 shadow-[0_0_15px_rgba(74,144,226,0.3)] border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="text-6xl mb-6 text-center glow-text-blue">₿</div>
            <h2 className="text-xl font-semibold mb-4 text-center text-white">Your First Step into Crypto</h2>
            <p className="text-gray-200 text-center">
              Embracing Bitcoin is a great way to dip your toes into the broader cryptocurrency landscape. Once you grasp the basics of buying, selling, and securing your Bitcoin, you'll find yourself better prepared to explore other digital assets and decentralized applications.
            </p>
          </div>

          {/* Second Bubble */}
          <div className="relative bubble-gradient-2 backdrop-blur-sm rounded-3xl p-8 shadow-[0_0_15px_rgba(156,39,176,0.3)] border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="text-6xl mb-6 text-center glow-text-purple">₿</div>
            <h2 className="text-xl font-semibold mb-4 text-center text-white">Why It's Not as Scary as It Sounds</h2>
            <p className="text-gray-200 text-center">
              I know "crypto" can sound confusing—like one of those gizmos on your smartphone. But don't worry! Just like how you learned to use a television remote, I can teach you to handle Bitcoin step-by-step. We start with simple lessons so you never feel lost.
            </p>
          </div>

          {/* Third Bubble */}
          <div className="relative bubble-gradient-3 backdrop-blur-sm rounded-3xl p-8 shadow-[0_0_15px_rgba(76,175,80,0.3)] border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="text-6xl mb-6 text-center glow-text-green">₿</div>
            <h2 className="text-xl font-semibold mb-4 text-center text-white">From Controversy to Currency of the Future</h2>
            <p className="text-gray-200 text-center">
              Debates under the Trump administration made headlines, but Elon's faith in crypto solidified it as tomorrow's money. Dive in now and embrace the currency that's far from reaching its peak.
            </p>
          </div>
        </div>

        {/* Second Row of Information Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Fourth Bubble */}
          <div className="relative bubble-gradient-1 bubble-shimmer backdrop-blur-sm rounded-3xl p-8 shadow-[0_0_15px_rgba(74,144,226,0.3)] border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="text-6xl mb-6 text-center glow-text-blue">₿</div>
            <p className="text-gray-200 text-center">
              I have 6 years in the Crypto Space, It's changed my life and many people I know. The one thing that cryptocurrency is missing is EDUCATION.
            </p>
          </div>

          {/* Fifth Bubble */}
          <div className="relative bubble-gradient-2 bubble-shimmer backdrop-blur-sm rounded-3xl p-8 shadow-[0_0_15px_rgba(156,39,176,0.3)] border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="text-6xl mb-6 text-center glow-text-purple">₿</div>
            <p className="text-gray-200 text-center">
              I charge $100 for 2 45-minute sessions. When those 2 sessions are done you will understand the "Future of Finance, and it's still early."
            </p>
          </div>

          {/* Sixth Bubble */}
          <div className="relative bubble-gradient-3 bubble-shimmer backdrop-blur-sm rounded-3xl p-8 shadow-[0_0_15px_rgba(76,175,80,0.3)] border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="text-6xl mb-6 text-center glow-text-green">₿</div>
            <p className="text-gray-200 text-center">
              I can do phone call, zoom, screenshare, in person or whatever fits your needs. I have a 100% guaranteed money back if you are not satisfied when our session is over.
            </p>
          </div>
        </div>

        {/* Book a Session Button */}
        <div className="text-center mb-16">
          <button
            onClick={() => setShowCalendar(true)}
            className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105"
          >
            BOOK A SESSION NOW
          </button>
        </div>

        {/* Booking Calendar */}
        {showCalendar && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-center text-white mb-6">
              Book Your Crypto Education Session
            </h2>
            <BookingCalendar selectedPlan="Crypto Education Session" />
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-16 text-center text-sm text-gray-300 max-w-2xl mx-auto">
          <p className="border-t border-white/20 pt-8">
            DISCLAIMER: I am not a financial advisor. The information provided through our consultation services is for educational and informational purposes only. Any investment decisions you make are solely your responsibility. Past performance is not indicative of future results. Please consult with a qualified financial advisor before making any investment decisions.
          </p>
        </div>
      </div>
    </main>
  )
}