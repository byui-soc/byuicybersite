'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface PageTransitionWrapperProps {
  children: React.ReactNode;
}

const variants = {
  hidden: { opacity: 0, transition: { duration: 0.2 } },
  enter: { opacity: 1, transition: { duration: 0.3, ease: 'easeInOut' } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: 'easeInOut' } },
};

const PageTransitionWrapper: React.FC<PageTransitionWrapperProps> = ({ children }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      <motion.div
        key={pathname} // Crucial: Key changes trigger animations
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
      >
        <div>
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransitionWrapper; 