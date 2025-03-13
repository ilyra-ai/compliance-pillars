
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
    console.warn('Navigator not available in this context, using fallback');
    navigate = (path: string) => {
      console.warn('Navigation attempted outside Router context to:', path);
      // Use a more compatible approach for navigation
      if (typeof window !== 'undefined') {
        window.location.href = path;
      }
    };
  }
  
  const handleOpenUITheme = useCallback(() => {
    setThemeDialogOpen(true);
    console.log('Opening theme dialog');
  }, []);
  
  const handleCloseUITheme = useCallback(() => {
    setThemeDialogOpen(false);
    console.log('Closing theme dialog');
  }, []);
  
  const handleSaveTheme = useCallback((config: ThemeConfig) => {
    // Save theme configuration using theme service
    try {
      console.log('Saving theme configuration:', config);
      themeService.saveTheme(config);
      toast.success('Tema personalizado salvo com sucesso!');
      setThemeDialogOpen(false);
    } catch (error) {
      console.error('Error saving theme:', error);
      toast.error('Erro ao salvar o tema: ' + (error instanceof Error ? error.message : 'Erro desconhecido'));
    }
  }, []);
  
  const handleGoToThemeEditor = useCallback(() => {
    // Navigate to theme editor page via router
    try {
      console.log('Navigating to theme editor page');
      navigate('/settings/theme');
      toast.info('Redirecionando para o editor de temas...');
    } catch (error) {
      console.error('Error navigating to theme editor:', error);
      toast.error('Não foi possível navegar para o editor de temas.');
      
      // Fallback to direct navigation if router navigation fails
      if (typeof window !== 'undefined') {
        window.location.href = '/settings/theme';
      }
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
