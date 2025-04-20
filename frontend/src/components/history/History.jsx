import { useState } from "react";

function CollapsibleSection({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 border border-green-300 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-6 py-4 bg-green-600 text-white font-semibold hover:bg-green-700 transition"
      >
        {title}
      </button>
      {isOpen && <div className="p-6 bg-green-50 text-green-900">{children}</div>}
    </div>
  );
}

export default function HistoryOfYoga() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">
        🧘‍♂️ The Rich History of Yoga
      </h1>

      <blockquote className="text-center italic text-green-700 mb-10">
        "Yoga is the journey of the self, through the self, to the self." — Bhagavad Gita
      </blockquote>

      <CollapsibleSection title="📜 Origins in Ancient India">
        <p>
          Yoga finds its roots over 5,000 years ago in the Indus Valley civilization. Early references
          appear in the Rigveda, one of the oldest known scriptures. It was initially developed as a
          spiritual discipline, combining physical, mental, and spiritual practices.
        </p>
        <p className="mt-2">
          The word "Yoga" derives from the Sanskrit root "yuj," meaning "to yoke" or "to unite,"
          symbolizing the union of body, mind, and spirit.
        </p>
      </CollapsibleSection>

      <CollapsibleSection title="🧘 Classical Yoga (Patanjali's Era)">
        <p>
          Around the 2nd century BCE, Maharishi Patanjali compiled the Yoga Sutras, a foundational text
          on classical yoga. He outlined the Eight Limbs of Yoga (Ashtanga Yoga), a structured path to
          enlightenment.
        </p>
        <ul className="list-disc pl-6 mt-3">
          <li>Yama (ethical restraints)</li>
          <li>Niyama (personal observances)</li>
          <li>Asana (postures)</li>
          <li>Pranayama (breath control)</li>
          <li>Pratyahara (withdrawal of senses)</li>
          <li>Dharana (concentration)</li>
          <li>Dhyana (meditation)</li>
          <li>Samadhi (absorption/enlightenment)</li>
        </ul>
      </CollapsibleSection>

      <CollapsibleSection title="🌍 Global Expansion of Yoga">
        <p>
          In the late 19th and early 20th centuries, Indian gurus such as Swami Vivekananda and
          Paramahansa Yogananda introduced yoga to the Western world. Swami Vivekananda's speech at
          the 1893 Parliament of the World's Religions in Chicago was a turning point.
        </p>
        <p className="mt-2">
          Hatha Yoga was later popularized by T. Krishnamacharya, whose students—B.K.S. Iyengar,
          Pattabhi Jois, and Indra Devi—brought modern asana-based practices to the global stage.
        </p>
      </CollapsibleSection>

      <CollapsibleSection title="🌟 Contributions of Famous Personalities">
        <ul className="list-disc pl-6">
          <li><strong>Swami Vivekananda</strong>: Brought yoga philosophy to the West.</li>
          <li><strong>Paramahansa Yogananda</strong>: Authored "Autobiography of a Yogi."</li>
          <li><strong>B.K.S. Iyengar</strong>: Developed Iyengar Yoga, emphasizing alignment.</li>
          <li><strong>Pattabhi Jois</strong>: Founded Ashtanga Yoga.</li>
          <li><strong>Indra Devi</strong>: One of the first women to teach yoga globally.</li>
        </ul>
      </CollapsibleSection>

      <CollapsibleSection title="🧠 Philosophical Depth of Yoga">
        <p>
          Beyond physical postures, yoga offers deep insights into consciousness, detachment,
          mindfulness, and universal connection. Texts like the Upanishads, Bhagavad Gita, and
          Hatha Yoga Pradipika provide rich philosophical grounding.
        </p>
      </CollapsibleSection>

      <CollapsibleSection title="🧑‍💼 Yoga in the Modern World">
        <p>
          Yoga today is practiced worldwide, from studios to corporate offices. It helps combat stress,
          anxiety, and chronic pain while improving flexibility, focus, and inner peace.
        </p>
        <p className="mt-2">
          <strong>June 21st </strong>is celebrated as <strong>International Yoga Day</strong>, initiated by the UN
          following India's proposal. Yoga apps, online classes, and community groups have made it
          more accessible than ever.
        </p>
      </CollapsibleSection>

      <CollapsibleSection title="💬 More Inspirational Quotes">
        <ul className="list-disc pl-6">
          <li>"Yoga takes you into the present moment, the only place where life exists."</li>
          <li>"Yoga is not about touching your toes, it’s about what you learn on the way down."</li>
          <li>"Inhale the future, exhale the past."</li>
          <li>"The body benefits from movement, and the mind benefits from stillness."</li>
        </ul>
      </CollapsibleSection>

      <div className="mt-10 text-center text-green-700 font-semibold">
        🙏 Discover peace. Discover balance. Discover yourself through Yoga.
      </div>
    </div>
  );
}
