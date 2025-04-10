import React from 'react';

const quotes = [
  "🧘 Yoga is the journey of the self, through the self, to the self.",
  "🌿 Inhale the future, exhale the past.",
  "💫 Yoga is the perfect opportunity to be curious about who you are.",
  "🌞 A few minutes of yoga every day can change your life.",
  "🙏 Let your breath guide your body."
];

function QuoteMarquee() {
  return (
    <div className="bg-green-700 text-white overflow-hidden whitespace-nowrap">
      <div className="inline-block animate-marquee">
        {quotes.map((quote, index) => (
          <span key={index} className="mx-10 text-sm sm:text-base font-medium">
            {quote}
          </span>
        ))}
      </div>
    </div>
  );
}

export default QuoteMarquee;
