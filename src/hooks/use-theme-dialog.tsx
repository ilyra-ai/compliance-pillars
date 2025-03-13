
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { themeService, ThemeConfig } from '@/services/theme-service';

export const useThemeDialog = () => {
  const [themeDialogOpen, setThemeDialogOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleOpenUITheme = useCallback(() => {
    setThemeDialogOpen(true);
  }, []);
  
  const handleCloseUITheme = useCallback(() => {
    setThemeDialogOpen(false);
  }, []);
  
  const handleSaveTheme = useCallback((config: ThemeConfig) => {
    // Save theme configuration using theme service
    try {
      themeService.saveTheme(config);
      toast.success('Tema personalizado salvo com sucesso!');
      setThemeDialogOpen(false);
    } catch (error) {
      toast.error('Erro ao salvar o tema: ' + (error instanceof Error ? error.message : 'Erro desconhecido'));
    }
  }, []);
  
  const handleGoToThemeEditor = useCallback(() => {
    navigate('/settings/ui');
  }, [navigate]);
  
  return {
    themeDialogOpen,
    setThemeDialogOpen,
    handleOpenUITheme,
    handleCloseUITheme,
    handleSaveTheme,
    handleGoToThemeEditor
  };
};
