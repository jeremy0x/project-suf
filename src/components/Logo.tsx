
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <div className="flex items-center">
        <div className="bg-brand-gold px-2 py-1">
          <span className="text-brand-dark font-bold text-xl">Shape Up</span>
        </div>
        <div className="bg-brand-blue px-2 py-1">
          <span className="text-white font-bold text-xl">Fitness</span>
        </div>
      </div>
      <div className="text-xs ml-2 text-muted-foreground">
        BN: 6982554
      </div>
    </div>
  );
};

export default Logo;
