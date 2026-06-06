'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function MouseSpotlight() {
  const [mounted, setMounted] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Add spring physics for smooth, trailing movement
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20, mass: 0.5 });

  useEffect(() => {
    setMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-50 rounded-full mix-blend-screen"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(14,165,233,0.06) 0%, rgba(139,92,246,0.03) 30%, transparent 70%)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  );
}
