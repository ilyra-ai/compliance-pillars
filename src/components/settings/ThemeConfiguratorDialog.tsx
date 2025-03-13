
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import ThemeConfigurator from '@/components/settings/ThemeConfigurator';

interface ThemeConfiguratorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (config: any) => void;
}

const ThemeConfiguratorDialog: React.FC<ThemeConfiguratorDialogProps> = ({ 
  open, 
  onOpenChange, 
  onSave 
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Personalizar UI</DialogTitle>
          <DialogDescription>
            Personalize as cores, fontes e elementos da interface
          </DialogDescription>
        </DialogHeader>
        <ThemeConfigurator onSave={onSave} />
      </DialogContent>
    </Dialog>
  );
};

export default ThemeConfiguratorDialog;
