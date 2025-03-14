
import React from 'react';
import { Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useThemeDialog } from '@/hooks/use-theme-dialog';

interface ThemeButtonProps {
  onClick?: () => void;
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
  const { handleOpenUITheme } = useThemeDialog();
  
  const handleClick = (e: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (onClick) {
      onClick();
    } else {
      handleOpenUITheme();
    }
  };
  
  return (
    <Button 
      onClick={handleClick} 
      variant={variant} 
      size={size}
      className={`relative overflow-hidden group ${className}`}
      type="button"
    >
      <Palette className="mr-2 h-4 w-4" />
      <span>Personalizar UI</span>
      <span className="absolute right-0 top-0 h-full w-2 bg-primary/20 animate-pulse hidden group-hover:block"></span>
    </Button>
  );
};

export default ThemeButton;
