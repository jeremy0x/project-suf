
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AnimationContextType {
  reduceMotion: boolean;
  toggleReduceMotion: () => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  // Initialize with a default value first, then update it on the client side
  const [reduceMotion, setReduceMotion] = useState<boolean>(false);
  
  // Use React's useEffect hook to update the preference check after mount
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery.matches);
    
    // Optional: Listen for changes to the user's preference
    const handleChange = (event: MediaQueryListEvent) => {
      setReduceMotion(event.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);
  
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
