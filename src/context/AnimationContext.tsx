
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AnimationContextType {
  reduceMotion: boolean;
  toggleReduceMotion: () => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  const preferReducedMotion = 
    typeof window !== 'undefined' 
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
      : false;
  
  const [reduceMotion, setReduceMotion] = useState<boolean>(preferReducedMotion);
  
  const toggleReduceMotion = () => {
    setReduceMotion(prev => !prev);
  };
  
  return (
    <AnimationContext.Provider value={{ reduceMotion, toggleReduceMotion }}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};
