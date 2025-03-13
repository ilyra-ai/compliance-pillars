
import React from 'react';
import { Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useThemeDialog } from '@/hooks/use-theme-dialog';

interface FloatingThemeButtonProps {
  onClick?: () => void;
}

const FloatingThemeButton: React.FC<FloatingThemeButtonProps> = ({ onClick }) => {
  const isMobile = useIsMobile();
  const { handleOpenUITheme, isThemeConfiguratorPage } = useThemeDialog();
  
  // Hide button on theme configurator pages
  if (isThemeConfiguratorPage) {
    return null;
  }
  
  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent any default behavior
    
    if (onClick) {
      onClick();
    } else {
      handleOpenUITheme();
    }
  };
  
  return (
    <Button 
      className="fixed bottom-6 right-6 rounded-full shadow-lg z-50 w-12 h-12 p-0 flex items-center justify-center"
      onClick={handleButtonClick}
      size="icon"
      variant="default"
    >
      <Palette className="h-6 w-6" />
      <span className="sr-only">Personalizar UI</span>
    </Button>
  );
};

export default FloatingThemeButton;
