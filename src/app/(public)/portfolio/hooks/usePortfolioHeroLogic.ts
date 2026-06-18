import { useState, useEffect } from 'react';
import { useTypewriter } from '@/app/(public)/about/hooks/useTypewriter';

const typewriterWords = [
  'Engineered for Growth',
  'Designed for Scale',
  'Built for Performance',
  'Optimized for Impact',
];

const heroPhrases = [
  'A detailed look at challenging problems we solved and technical architectures we deployed.',
  'Showcasing direct business metrics achieved through premium engineering.',
  'Real-world case studies of digital transformation for ambitious Indian SMBs.',
  'Deep dives into our custom solutions, robust systems, and stunning designs.',
];

export function usePortfolioHeroLogic() {
  const { text: typewrittenText, currentFullWord } = useTypewriter(typewriterWords, 100, 50, 2500);
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
    heroPhrases,
  };
}
