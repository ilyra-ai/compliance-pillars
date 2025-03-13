
import React from 'react';
import { Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLocation } from 'react-router-dom';

interface FloatingThemeButtonProps {
  onClick: () => void;
}

const FloatingThemeButton: React.FC<FloatingThemeButtonProps> = ({ onClick }) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Hide button on theme configurator pages
  const isThemeConfiguratorPage = 
    location.pathname === '/ui/customize' || 
    location.pathname === '/settings/theme';
  
  if (isThemeConfiguratorPage) {
    return null;
  }
  
  return (
    <Button 
      className="fixed bottom-6 right-6 rounded-full shadow-lg z-50 w-12 h-12 p-0 flex items-center justify-center"
      onClick={onClick}
      size="icon"
      variant="default"
    >
      <Palette className="h-6 w-6" />
      <span className="sr-only">Personalizar UI</span>
    </Button>
  );
};

export default FloatingThemeButton;
