
import React from 'react';

interface LogoProps {
  variant?: 'header' | 'footer';
}

const Logo: React.FC<LogoProps> = ({ variant = 'header' }) => {
  return (
    <div className="flex items-center">
      <div className="flex items-center">
        <img 
          src="https://i.ibb.co/27MsdB5r/suf-logo.png" 
          alt="Shape Up Fitness Logo" 
          className="h-10"
        />
      </div>
      {variant === 'footer' && (
        <div className="text-xs ml-2 text-muted-foreground">
          BN: 6982554
        </div>
      )}
    </div>
  );
};

export default Logo;
