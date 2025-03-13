
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { themeService, ThemeConfig } from '@/services/theme-service';
import { useNavigate } from 'react-router-dom';

export const useThemeDialog = () => {
  const [themeDialogOpen, setThemeDialogOpen] = useState(false);
  
  // Initialize navigate, but handle the case when we're outside Router context
  let navigate;
  try {
    navigate = useNavigate();
  } catch (error) {
    // If useNavigate throws an error, provide a fallback function
    navigate = (path: string) => {
      console.warn('Navigation attempted outside Router context to:', path);
      // You could handle this differently, perhaps setting a state that
      // a parent component could use to navigate once in Router context
    };
  }
  
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
    // Navigate to theme editor page via router
    try {
      navigate('/ui/customize');
      toast.info('Redirecionando para o editor de temas...');
    } catch (error) {
      console.error('Error navigating to theme editor:', error);
      toast.error('Não foi possível navegar para o editor de temas.');
    }
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
