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
    <div className="rounded-full bg-white shadow-lg p-6 flex flex-col items-center justify-between h-[400px] w-[300px] transition-transform hover:scale-105">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-4xl font-bold text-blue-600 mb-4">{price}</p>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="text-gray-600 flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={onSelect}
        className="mt-6 w-full bg-yellow-400 text-gray-900 py-2 px-4 rounded-full font-semibold hover:bg-yellow-500 transition-colors"
      >
        {ctaText}
      </button>
    </div>
  );
}