
import React from 'react';
import { Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ThemeButtonProps {
  onClick: () => void;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const ThemeButton: React.FC<ThemeButtonProps> = ({ 
  onClick, 
  variant = "outline", 
  size = "sm",
  className = "" 
}) => {
  return (
    <Button 
      onClick={onClick} 
      variant={variant} 
      size={size}
      className={`relative overflow-hidden group ${className}`}
    >
      <Palette className="mr-2 h-4 w-4" />
      <span>Personalizar UI</span>
      <span className="absolute right-0 top-0 h-full w-2 bg-primary/20 animate-pulse hidden group-hover:block"></span>
    </Button>
  );
};

export default ThemeButton;
