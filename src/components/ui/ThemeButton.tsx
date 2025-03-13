
import React from 'react';
import { Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface ThemeButtonProps {
  onClick: () => void;
  className?: string;
}

const ThemeButton: React.FC<ThemeButtonProps> = ({ onClick, className }) => {
  const isMobile = useIsMobile();
  
  return (
    <Button 
      variant="outline" 
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
