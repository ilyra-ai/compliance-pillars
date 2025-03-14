
import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { ThemeConfig, themeService } from '@/services/theme-service';
import { useLocation } from 'react-router-dom';

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
  const [currentPath, setCurrentPath] = useState('');
  
  // Use React Router's useLocation hook safely with error handling
  let location;
  try {
    location = useLocation();
  } catch (error) {
    // Silent fail if used outside Router context
    console.debug('ThemeDialogProvider used outside Router context');
  }

  // Update current path whenever location changes or on initial render
  useEffect(() => {
    try {
      if (location) {
        setCurrentPath(location.pathname);
      } else if (typeof window !== 'undefined') {
        setCurrentPath(window.location.pathname);
      }
    } catch (error) {
      console.debug('Error updating path:', error);
    }
  }, [location]);

  // Check if we're on a theme configurator page without using Router
  const isThemeConfiguratorPage = useMemo(() => {
    try {
      const path = currentPath || (typeof window !== 'undefined' ? window.location.pathname : '');
      return path === '/ui/customize' || path === '/settings/theme';
    } catch (error) {
      console.debug('Error checking path:', error);
      return false;
    }
  }, [currentPath]);

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

  // Provide silent fallback values if used outside of context
  if (context === undefined) {
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
