'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ScrollAnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
}

const ScrollAnimatedSection: React.FC<ScrollAnimatedSectionProps> = ({ children, className }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }} // Start hidden and slightly down
      whileInView={{ opacity: 1, y: 0 }} // Animate to visible and original position
      viewport={{ once: true, amount: 0.2 }} // Trigger once, when 20% is visible
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

export default ScrollAnimatedSection; 