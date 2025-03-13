
import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { ThemeConfig, themeService } from '@/services/theme-service';

// Create a context for the theme dialog
interface ThemeDialogContextType {
  themeDialogOpen: boolean;
  setThemeDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpenUITheme: () => void;
  handleSaveTheme: (theme: ThemeConfig) => void;
  isThemeConfiguratorPage: boolean;
}

const ThemeDialogContext = createContext<ThemeDialogContextType | undefined>(undefined);

export const ThemeDialogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeDialogOpen, setThemeDialogOpen] = useState(false);

  // Check if we're on a theme configurator page without using Router
  const isThemeConfiguratorPage = useMemo(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      return path === '/ui/customize' || path === '/settings/theme';
    }
    return false;
  }, []);

  // Handler for opening the theme UI
  const handleOpenUITheme = useCallback(() => {
    setThemeDialogOpen(true);
  }, []);

  // Handler for saving theme changes
  const handleSaveTheme = useCallback((theme: ThemeConfig) => {
    try {
      themeService.saveTheme(theme);
      setThemeDialogOpen(false);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  }, []);

  const value = {
    themeDialogOpen,
    setThemeDialogOpen,
    handleOpenUITheme,
    handleSaveTheme,
    isThemeConfiguratorPage
  };

  return <ThemeDialogContext.Provider value={value}>{children}</ThemeDialogContext.Provider>;
};

export const useThemeDialog = (): ThemeDialogContextType => {
  const context = useContext(ThemeDialogContext);

  // Provide fallback values if used outside of context
  if (context === undefined) {
    // Instead of warning, just provide defaults
    return {
      themeDialogOpen: false,
      setThemeDialogOpen: () => {},
      handleOpenUITheme: () => {},
      handleSaveTheme: () => {},
      isThemeConfiguratorPage: false
    };
  }

  return context;
};
