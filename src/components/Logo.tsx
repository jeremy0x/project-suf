
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <div className="flex items-center">
        <img 
          src="https://i.ibb.co/svHjJR5M/suf-logo.png" 
          alt="Shape Up Fitness Logo" 
          className="h-10"
        />
      </div>
      <div className="text-xs ml-2 text-muted-foreground">
        BN: 6982554
      </div>
    </div>
  );
};

export default Logo;
