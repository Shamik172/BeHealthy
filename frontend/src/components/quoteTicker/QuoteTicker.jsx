import React, { useEffect, useState } from 'react';

const quotes = [
  "🧘 Yoga is the journey of the self, through the self, to the self.",
  "🌿 Inhale the future, exhale the past.",
  "💫 Yoga is the perfect opportunity to be curious about who you are.",
  "🌞 A few minutes of yoga every day can change your life.",
  "🙏 Let your breath guide your body.",
  "🕉️ Peace comes from within. Do not seek it without.",
  "🌸 The body benefits from movement, and the mind benefits from stillness.",
  "🔥 Yoga teaches us to cure what need not be endured and endure what cannot be cured.",
  "🌈 Yoga is not about touching your toes. It is what you learn on the way down.",
  "🧘‍♀️ Through yoga, we discover the strength within us.",
  "☀️ Your soul is your best teacher.",
  "🌿 Yoga begins right where I am – not where I was yesterday or where I long to be.",
  "💖 Self-care is how you take your power back."
];

function QuoteMarquee() {

  const [now, setNow] = useState(new Date());

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Format date & time in a detailed way
  const formattedDate = now.toLocaleDateString(undefined, {
    weekday: "long", // Full day name
    month: "long",   // Full month name
    day: "numeric",
    year: "numeric"
  });
  const formattedTime = now.toLocaleTimeString(undefined, {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "long" // Full time zone name
  });
  const displayString = `${formattedDate}, ${formattedTime}`;

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-green-600 to-green-500 text-white py-3 px-4 shadow-md group hover:bg-green-700 transition-colors duration-500">
      <div className="animate-marquee whitespace-nowrap inline-block group-hover:[animation-play-state:paused]">
        {quotes.concat(quotes).map((quote, index) => (
          <span
            key={index}
            className="mx-8 text-sm sm:text-base font-medium inline-block transform transition-transform duration-300 hover:scale-110 hover:text-yellow-300"
          >
            {quote}{" "}
            <span className="text-yellow-400 text-opacity-0">
              {"⏰ "} {displayString}
            </span>
          </span>
        ))}
      </div>

      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            width: max-content;
            animation: marquee 200s linear infinite;
          }
        `}
      </style>
    </div>
  );
}

export default QuoteMarquee;
