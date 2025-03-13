
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import ThemeConfigurator from '@/components/settings/ThemeConfigurator';
import { themeService, ThemeConfig } from '@/services/theme-service';

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
  
  const handleSave = (config: ThemeConfig) => {
    onSave(config);
    onOpenChange(false);
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
      </DialogContent>
    </Dialog>
  );
};

export default ThemeConfiguratorDialog;
