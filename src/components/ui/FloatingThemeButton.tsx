
import React from 'react';
import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';
import { useThemeDialog } from '@/hooks/use-theme-dialog';

interface FloatingThemeButtonProps {
  onClick?: () => void;
}

const FloatingThemeButton: React.FC<FloatingThemeButtonProps> = ({ onClick }) => {
  const { handleOpenUITheme } = useThemeDialog();
  
  const handleButtonClick = () => {
    if (onClick) {
      onClick();
    } else {
      handleOpenUITheme();
    }
  };
  
  return (
    <Button
      onClick={handleButtonClick}
      className="fixed bottom-4 right-4 z-50 rounded-full shadow-lg p-0 w-12 h-12 flex items-center justify-center"
      size="icon"
    >
      <Palette className="h-5 w-5" />
      <span className="sr-only">Personalizar UI</span>
    </Button>
  );
};

export default FloatingThemeButton;
