import React from 'react';
import { motion } from 'framer-motion';

export function AnimatedSection({ 
  children, 
  className = "", 
  delay = 0, 
  direction = "up" 
}) {
  const yOffset = direction === "up" ? 30 : direction === "down" ? -30 : 0;
  const xOffset = direction === "left" ? 30 : direction === "right" ? -30 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, x: xOffset }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.7, 
        delay, 
        ease: [0.21, 0.47, 0.32, 0.98] // Apple-like spring easing
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
