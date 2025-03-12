
import React from 'react';
import { ShieldCheck } from 'lucide-react';

const AnimatedLogo: React.FC = () => {
  return (
    <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-compliance-500 to-compliance-700 shadow-subtle">
      <div className="animate-pulse-subtle">
        <ShieldCheck size={20} className="text-white animate-float" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-tr from-compliance-400/0 via-white/10 to-compliance-400/0 animate-rotate-clockwise" />
    </div>
  );
};

export default AnimatedLogo;
