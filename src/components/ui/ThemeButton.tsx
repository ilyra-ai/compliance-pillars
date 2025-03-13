
import React from 'react';
import { Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLocation } from 'react-router-dom';

interface ThemeButtonProps {
  onClick: () => void;
  className?: string;
}

const ThemeButton: React.FC<ThemeButtonProps> = ({ onClick, className }) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Active state if we're on a theme-related page
  const isActive = 
    location.pathname === '/ui/customize' || 
    location.pathname === '/settings/theme';
  
  return (
    <Button 
      variant={isActive ? "default" : "outline"}
      size={isMobile ? "icon" : "sm"} 
      onClick={onClick}
      className={className}
    >
      <Palette className={isMobile ? "h-4 w-4" : "mr-2 h-4 w-4"} />
      {!isMobile && <span>Personalizar UI</span>}
    </Button>
  );
};

export default ThemeButton;
