import { useState, useEffect } from 'react';
import { useTypewriter } from '@/app/(public)/about/hooks/useTypewriter';

const typewriterWords = ['Delivered', 'Accelerated', 'Engineered', 'Mastered'];

const heroPhrases = [
  'Explore our comprehensive suite of high-performance design and system architecture.',
  'Scaling growing businesses with cutting-edge technology and automation.',
  'Delivering robust security, lightning speed, and data-driven insights.',
  'Your dedicated engineering partner for enterprise-grade digital solutions.',
];

export function useServicesHeroLogic() {
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
