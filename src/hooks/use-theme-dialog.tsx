
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const useThemeDialog = () => {
  const [themeDialogOpen, setThemeDialogOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleOpenUITheme = useCallback(() => {
    setThemeDialogOpen(true);
  }, []);
  
  const handleCloseUITheme = useCallback(() => {
    setThemeDialogOpen(false);
  }, []);
  
  const handleSaveTheme = useCallback((config: any) => {
    // Save theme configuration to localStorage or API
    localStorage.setItem('themeConfig', JSON.stringify(config));
    toast.success('Tema personalizado salvo com sucesso!');
    setThemeDialogOpen(false);
  }, []);
  
  const handleGoToThemeEditor = useCallback(() => {
    navigate('/settings/theme');
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
