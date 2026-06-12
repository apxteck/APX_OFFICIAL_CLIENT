import { useState, useEffect } from 'react';
import { useTypewriter } from '@/app/(public)/about/hooks/useTypewriter';

const typewriterWords = [
  "Industry Insights",
  "Tech Trends & Updates",
  "Deep Dive Articles",
  "Digital Strategies"
];

const heroPhrases = [
  "Articles and guidelines to help you build modern designs and scale system architectures.",
  "Learn how to rank high on global search engines and dominate your niche.",
  "Deep dives into Next.js, backend scaling, and clean code principles.",
  "Stay updated with industry tech trends and what they mean for your business."
];

export function useInsightsHeroLogic() {
  const { text: typewrittenText, currentFullWord } = useTypewriter(typewriterWords);
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % heroPhrases.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return {
    typewrittenText,
    currentFullWord,
    phraseIndex,
    heroPhrases
  };
}
