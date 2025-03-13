
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import ThemeConfigurator from '@/components/settings/ThemeConfigurator';
import { themeService, ThemeConfig } from '@/services/theme-service';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Palette, Save } from 'lucide-react';
import { toast } from 'sonner';

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
  const [isChanged, setIsChanged] = useState(false);
  const navigate = useNavigate();
  
  // Update the current theme when the dialog opens
  useEffect(() => {
    if (open) {
      const theme = themeService.getTheme();
      setCurrentTheme(theme);
      setIsChanged(false);
    }
  }, [open]);
  
  const handleSave = (config: ThemeConfig) => {
    try {
      onSave(config);
      toast.success('Configurações de UI salvas com sucesso!');
      setIsChanged(false);
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving theme:', error);
      toast.error('Erro ao salvar configurações de UI');
    }
  };

  const handleThemeChange = (updatedTheme: ThemeConfig) => {
    setCurrentTheme(updatedTheme);
    setIsChanged(true);
  };

  const handleGoToFullEditor = () => {
    if (isChanged) {
      const confirmNavigation = window.confirm('Você tem alterações não salvas. Deseja continuar sem salvar?');
      if (!confirmNavigation) return;
    }
    onOpenChange(false);
    navigate('/ui/customize');
  };
  
  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      if (!newOpen && isChanged) {
        const confirmClose = window.confirm('Você tem alterações não salvas. Deseja sair sem salvar?');
        if (!confirmClose) return;
      }
      onOpenChange(newOpen);
    }}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Personalizar UI</DialogTitle>
          <DialogDescription>
            Personalize as cores, fontes e elementos da interface
          </DialogDescription>
        </DialogHeader>
        <ThemeConfigurator 
          onSave={handleSave} 
          onChange={handleThemeChange}
          initialValues={currentTheme}
        />
        <DialogFooter className="mt-4 flex justify-between">
          <Button variant="default" onClick={() => handleSave(currentTheme)} disabled={!isChanged}>
            <Save className="mr-2 h-4 w-4" />
            Salvar Alterações
          </Button>
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
