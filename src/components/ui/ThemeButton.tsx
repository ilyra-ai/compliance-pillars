
import React from 'react';
import { Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ThemeButtonProps {
  onClick: () => void;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const ThemeButton: React.FC<ThemeButtonProps> = ({ 
  onClick, 
  variant = "outline", 
  size = "sm" 
}) => {
  return (
    <Button onClick={onClick} variant={variant} size={size}>
      <Palette className="mr-2 h-4 w-4" />
      <span>Personalizar UI</span>
    </Button>
  );
};

export default ThemeButton;
