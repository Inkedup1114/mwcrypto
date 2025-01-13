'use client'

export default function Home() {

  return (
    <main className="min-h-screen py-8 md:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-12 md:mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-yellow-500/30 blur-3xl -z-10 transform rotate-3"></div>
          <p className="text-xl md:text-2xl text-blue-300 mb-6 md:mb-8 relative z-10" style={{
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 20px rgba(147, 197, 253, 0.5)',
            filter: 'drop-shadow(0 0 10px rgba(147, 197, 253, 0.3))'
          }}>
            "I will turn <span className="text-yellow-400" style={{
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 20px rgba(236, 201, 75, 0.6)',
              filter: 'drop-shadow(0 0 10px rgba(236, 201, 75, 0.4))'
            }}>'where do I start?'</span> into <span className="text-yellow-400" style={{
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 20px rgba(236, 201, 75, 0.6)',
              filter: 'drop-shadow(0 0 10px rgba(236, 201, 75, 0.4))'
            }}>'look how far I've come!'</span>"
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 md:mb-8 leading-tight relative z-10">
            <span className="text-yellow-400 inline-block transform hover:scale-105 transition-transform duration-300" style={{
              background: 'linear-gradient(to right, #f6ad55, #fbd38d)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              filter: 'drop-shadow(0 0 30px rgba(255, 140, 0, 0.4))'
            }}>
              Master Cryptocurrency
            </span>
            <br />
            <span className="text-yellow-400 inline-block transform hover:scale-105 transition-transform duration-300" style={{
              background: 'linear-gradient(to right, #fbd38d, #f6ad55)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              filter: 'drop-shadow(0 0 30px rgba(255, 140, 0, 0.4))'
            }}>
              with Personal Guidance
            </span>
          </h1>
          <p className="text-2xl md:text-3xl mb-12 leading-relaxed max-w-3xl mx-auto relative z-10">
            <span className="inline-block transform hover:scale-105 transition-transform duration-300 text-blue-300" style={{
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 20px rgba(147, 197, 253, 0.5)',
              filter: 'drop-shadow(0 0 10px rgba(147, 197, 253, 0.3))'
            }}>
              One-on-one sessions to help you
              <span className="text-yellow-400" style={{
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 20px rgba(236, 201, 75, 0.6)',
                filter: 'drop-shadow(0 0 10px rgba(236, 201, 75, 0.4))'
              }}> unlock the potential </span>
              of the crypto world
            </span>
          </p>
          <div className="flex justify-center space-x-2 text-yellow-400 text-4xl animate-bounce">
            <span>•</span>
            <span className="animate-bounce-delay-1">•</span>
            <span className="animate-bounce-delay-2">•</span>
          </div>
        </div>

        {/* First Row of Information Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-16">
          {/* First Bubble */}
          <div className="relative bubble-gradient-1 backdrop-blur-sm rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-[0_0_15px_rgba(74,144,226,0.3)] border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="text-3xl md:text-6xl mb-3 md:mb-6 text-center glow-text-blue">₿</div>
            <h2 className="text-base md:text-xl font-semibold mb-2 md:mb-4 text-center text-white">Your First Step into Crypto</h2>
            <p className="text-sm md:text-base text-gray-200 text-center leading-relaxed">
              Embracing Bitcoin is a great way to dip your toes into the broader cryptocurrency landscape. Once you grasp the basics of buying, selling, and securing your Bitcoin, you'll find yourself better prepared to explore other digital assets and decentralized applications.
            </p>
          </div>

          {/* Second Bubble */}
          <div className="relative bubble-gradient-2 backdrop-blur-sm rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-[0_0_15px_rgba(156,39,176,0.3)] border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="text-3xl md:text-6xl mb-3 md:mb-6 text-center glow-text-purple">₿</div>
            <h2 className="text-base md:text-xl font-semibold mb-2 md:mb-4 text-center text-white">Why It's Not as Scary as It Sounds</h2>
            <p className="text-sm md:text-base text-gray-200 text-center leading-relaxed">
              I know "crypto" can sound confusing—like one of those gizmos on your smartphone. But don't worry! Just like how you learned to use a television remote, I can teach you to handle Bitcoin step-by-step. We start with simple lessons so you never feel lost.
            </p>
          </div>

          {/* Third Bubble */}
          <div className="relative bubble-gradient-3 backdrop-blur-sm rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-[0_0_15px_rgba(76,175,80,0.3)] border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="text-3xl md:text-6xl mb-3 md:mb-6 text-center glow-text-green">₿</div>
            <h2 className="text-base md:text-xl font-semibold mb-2 md:mb-4 text-center text-white">From Controversy to Currency of the Future</h2>
            <p className="text-sm md:text-base text-gray-200 text-center leading-relaxed">
              Debates under the Trump administration made headlines, but Elon's faith in crypto solidified it as tomorrow's money. Dive in now and embrace the currency that's far from reaching its peak.
            </p>
          </div>
        </div>

        {/* Second Row of Information Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-16">
          {/* Fourth Bubble */}
          <div className="relative bubble-gradient-1 bubble-shimmer backdrop-blur-sm rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-[0_0_15px_rgba(74,144,226,0.3)] border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="text-3xl md:text-6xl mb-3 md:mb-6 text-center glow-text-blue">₿</div>
            <p className="text-sm md:text-base text-gray-200 text-center leading-relaxed">
              I have 6 years in the Crypto Space, It's changed my life and many people I know. The one thing that cryptocurrency is missing is EDUCATION.
            </p>
          </div>

          {/* Fifth Bubble */}
          <div className="relative bubble-gradient-2 bubble-shimmer backdrop-blur-sm rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-[0_0_15px_rgba(156,39,176,0.3)] border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="text-3xl md:text-6xl mb-3 md:mb-6 text-center glow-text-purple">₿</div>
            <p className="text-sm md:text-base text-gray-200 text-center leading-relaxed">
              I charge $100 for 2 45-minute sessions. When those 2 sessions are done you will understand the "Future of Finance, and it's still early."
            </p>
          </div>

          {/* Sixth Bubble */}
          <div className="relative bubble-gradient-3 bubble-shimmer backdrop-blur-sm rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-[0_0_15px_rgba(76,175,80,0.3)] border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="text-3xl md:text-6xl mb-3 md:mb-6 text-center glow-text-green">₿</div>
            <p className="text-sm md:text-base text-gray-200 text-center leading-relaxed">
              I can do phone call, zoom, screenshare, in person or whatever fits your needs. I have a 100% guaranteed money back if you are not satisfied when our session is over.
            </p>
          </div>
        </div>

        {/* Book Sessions Section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="mb-6 md:mb-8 max-w-2xl mx-auto px-4">
            <h3 className="text-xl md:text-2xl text-white mb-3 md:mb-4">Get Started with Both Sessions</h3>
            <p className="text-sm md:text-base text-gray-200 mb-4 md:mb-6">
              Book your complete crypto education package: 2 comprehensive 45-minute sessions for $100.
              Schedule both sessions at times that work best for you.
            </p>
            <div className="text-yellow-400 mb-6 md:mb-8">
              <p className="text-base md:text-lg mb-2">✓ Two 45-minute personal sessions</p>
              <p className="text-base md:text-lg mb-2">✓ Flexible scheduling options</p>
              <p className="text-base md:text-lg">✓ Money-back guarantee</p>
            </div>
          </div>
          <a
            href="https://buy.stripe.com/fZeaGX0tNfeqeIwfYY"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold py-4 px-4 md:px-8 rounded-full text-base md:text-xl shadow-lg hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 w-[95%] max-w-sm md:w-auto whitespace-normal min-h-[60px] flex items-center justify-center"
          >
            BOOK BOTH SESSIONS NOW - $100
          </a>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 md:mt-16 text-center text-[11px] md:text-sm text-gray-300 max-w-2xl mx-auto px-3 md:px-4">
          <p className="border-t border-white/20 pt-4 md:pt-8 leading-relaxed">
            DISCLAIMER: I am not a financial advisor. The information provided through our consultation services is for educational and informational purposes only. Any investment decisions you make are solely your responsibility. Past performance is not indicative of future results. Please consult with a qualified financial advisor before making any investment decisions.
          </p>
        </div>
      </div>
    </main>
  )
}