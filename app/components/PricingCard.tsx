'use client'

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  ctaText: string;
  onSelect: () => void;
}

export default function PricingCard({ title, price, features, ctaText, onSelect }: PricingCardProps) {
  return (
    <div className="rounded-2xl bg-white shadow-lg p-4 md:p-6 flex flex-col items-center justify-between min-h-[400px] w-full max-w-[300px] mx-auto transition-transform hover:scale-105">
      <div className="text-center w-full">
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">{price}</p>
        <ul className="space-y-2 text-left">
          {features.map((feature, index) => (
            <li key={index} className="text-sm md:text-base text-gray-600 flex items-start gap-2">
              <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="flex-1">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={onSelect}
        className="mt-6 w-full bg-yellow-400 text-gray-900 py-2.5 px-4 rounded-full font-semibold hover:bg-yellow-500 transition-colors text-sm md:text-base"
      >
        {ctaText}
      </button>
    </div>
  );
}