
import React from 'react';
import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';
import { useThemeDialog } from '@/hooks/use-theme-dialog';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

interface FloatingThemeButtonProps {
  onClick?: () => void;
}

const FloatingThemeButton: React.FC<FloatingThemeButtonProps> = ({ onClick }) => {
  const { handleOpenUITheme } = useThemeDialog();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleButtonClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    
    try {
      console.log("Attempting to open theme dialog");
      handleOpenUITheme();
      toast.success("Configurador de tema aberto");
    } catch (error) {
      console.error("Error opening theme dialog:", error);
      toast.error("Erro ao abrir configurador de tema");
      
      // Fallback: navigate to theme settings page
      navigate('/settings/theme');
    }
  };
  
  // Don't show on login page
  if (location.pathname === '/login') {
    return null;
  }
  
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
