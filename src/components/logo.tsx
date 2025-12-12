import { cn } from '@/lib/utils';
import React from 'react';

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center justify-center font-bold text-2xl tracking-tighter", className)}>
      <span className="bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
        DE
      </span>
      <span className="text-foreground">-Bridge</span>
    </div>
  );
};

export default Logo;
