
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ColorSwatch } from "@/components/ui/color-swatch";
import { themeService, ThemeConfig } from "@/services/theme-service";
import { useThemeDialog } from '@/hooks/use-theme-dialog';

interface ThemeConfiguratorDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSave?: (theme: ThemeConfig) => void;
}

const ThemeConfiguratorDialog: React.FC<ThemeConfiguratorDialogProps> = ({
  open: propOpen,
  onOpenChange: propOnOpenChange,
  onSave: propOnSave
}) => {
  const { 
    themeDialogOpen, 
    setThemeDialogOpen, 
    handleSaveTheme 
  } = useThemeDialog();
  
  // Use either props or context values
  const dialogOpen = propOpen !== undefined ? propOpen : themeDialogOpen;
  const setDialogOpen = propOnOpenChange || setThemeDialogOpen;
  const saveTheme = propOnSave || handleSaveTheme;
  
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>(themeService.getTheme());
  const [hasChanges, setHasChanges] = useState(false);
  
  // Reset theme config when dialog opens
  useEffect(() => {
    if (dialogOpen) {
      setThemeConfig(themeService.getTheme());
      setHasChanges(false);
    }
  }, [dialogOpen]);
  
  // Apply theme changes in real-time
  useEffect(() => {
    if (dialogOpen && hasChanges) {
      themeService.applyThemeTemporarily(themeConfig);
    }
  }, [themeConfig, dialogOpen, hasChanges]);
  
  const handleColorChange = (colorKey: keyof ThemeConfig['colors'], color: string) => {
    setThemeConfig((prev) => ({
      ...prev,
      colors: {
        ...prev.colors,
        [colorKey]: color
      }
    }));
    setHasChanges(true);
  };
  
  const handleFontChange = (fontFamily: string) => {
    setThemeConfig((prev) => ({
      ...prev,
      fonts: {
        ...prev.fonts,
        family: fontFamily
      }
    }));
    setHasChanges(true);
  };
  
  const handleSaveChanges = () => {
    try {
      saveTheme(themeConfig);
      setHasChanges(false);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };
  
  const handleResetTheme = () => {
    try {
      themeService.resetTheme();
      setThemeConfig(themeService.getTheme());
      setHasChanges(true);
    } catch (error) {
      console.error('Error resetting theme:', error);
    }
  };
  
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Personalizar UI</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div>
            <h3 className="text-lg font-medium mb-3">Cores</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ColorSwatch 
                color={themeConfig.colors.primary} 
                onChange={(color) => handleColorChange('primary', color)} 
                label="Cor Primária" 
              />
              <ColorSwatch 
                color={themeConfig.colors.secondary} 
                onChange={(color) => handleColorChange('secondary', color)} 
                label="Cor Secundária" 
              />
              <ColorSwatch 
                color={themeConfig.colors.accent} 
                onChange={(color) => handleColorChange('accent', color)} 
                label="Cor de Destaque" 
              />
              <ColorSwatch 
                color={themeConfig.colors.background} 
                onChange={(color) => handleColorChange('background', color)} 
                label="Fundo" 
              />
              <ColorSwatch 
                color={themeConfig.colors.text} 
                onChange={(color) => handleColorChange('text', color)} 
                label="Texto" 
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">Tipografia</h3>
            <div className="grid gap-4">
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs">Fonte</label>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={themeConfig.fonts.family}
                  onChange={(e) => handleFontChange(e.target.value)}
                >
                  <option value="Imprima">Imprima</option>
                  <option value="Poppins">Poppins</option>
                  <option value="Inter">Inter</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Lato">Lato</option>
                  <option value="Open Sans">Open Sans</option>
                  <option value="Montserrat">Montserrat</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleResetTheme}>Restaurar Padrão</Button>
          <Button onClick={handleSaveChanges} disabled={!hasChanges}>Salvar Alterações</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ThemeConfiguratorDialog;
