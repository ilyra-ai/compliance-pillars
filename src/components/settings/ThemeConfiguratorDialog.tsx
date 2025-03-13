
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import ThemeConfigurator from '@/components/settings/ThemeConfigurator';
import { themeService, ThemeConfig } from '@/services/theme-service';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Palette } from 'lucide-react';

interface ThemeConfiguratorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (config: ThemeConfig) => void;
}

const ThemeConfiguratorDialog: React.FC<ThemeConfiguratorDialogProps> = ({ 
  open, 
  onOpenChange, 
  onSave 
}) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(themeService.getTheme());
  const navigate = useNavigate();
  
  // Update the current theme when the dialog opens
  useEffect(() => {
    if (open) {
      setCurrentTheme(themeService.getTheme());
    }
  }, [open]);
  
  const handleSave = (config: ThemeConfig) => {
    onSave(config);
    onOpenChange(false);
  };

  const handleGoToFullEditor = () => {
    onOpenChange(false);
    navigate('/ui/customize');
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Personalizar UI</DialogTitle>
          <DialogDescription>
            Personalize as cores, fontes e elementos da interface
          </DialogDescription>
        </DialogHeader>
        <ThemeConfigurator 
          onSave={handleSave} 
          onChange={setCurrentTheme}
          initialValues={currentTheme}
        />
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={handleGoToFullEditor}>
            <Palette className="mr-2 h-4 w-4" />
            Ir para Editor Completo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ThemeConfiguratorDialog;
